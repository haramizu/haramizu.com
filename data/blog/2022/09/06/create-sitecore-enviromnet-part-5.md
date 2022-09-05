---
title: Sitecore Headless 開発、テスト環境の構築 Part 5 - Node.js コンテナの追加
date: '2022-09-06'
tags: ['Headless', 'Next.js', 'Vercel']
draft: true
summary: 前々回に Next.js のテンプレートの準備を、前回はそれを利用するための Sitecore にアイテムをインポートする手順を紹介しました。今回は Next.js の設定を変更して、Sitecore のアイテムを参照してページが表示されるところまで紹介をします。
images: ['/static/images/2022/09/vercel06.png']
---

これまで紹介してきた内容は、 Sitecore をコンテナで起動、その後テンプレートを追加、サーバーでの動作という形で進めてきました。サーバーの環境では、Vercel を利用してページの編集、確認ができるようにしましたが、ローカルのコンテナの環境では Vercel の部分が不足している形となります。そこで今回は、この部分を Node.js のコンテナを追加して同じように動作する設定を作成します。

## CD サーバーの削除

今回はプレビュー用のサーバーを追加するため、CD サーバーが不要となりますので、まず Docker の定義ファイルから削除していきます。２つのファイルから下記の項目を削除してください。

```docker-compose.yml
services:
  traefik:
    depends_on:
      cd:
        condition: service_healthy
  cd:
    isolation: ${ISOLATION}
    image: ${SITECORE_DOCKER_REGISTRY}sitecore-xm1-cd:${SITECORE_VERSION}
    depends_on:
      mssql-init:
        condition: service_healthy
      solr-init:
        condition: service_started
      redis:
        condition: service_started
    environment:
      Sitecore_AppSettings_instanceNameMode:define: default
      Sitecore_ConnectionStrings_Security: Data Source=${SQL_SERVER};Initial Catalog=Sitecore.Core;User ID=${SQL_SA_LOGIN};Password=${SQL_SA_PASSWORD}
      Sitecore_ConnectionStrings_Web: Data Source=${SQL_SERVER};Initial Catalog=Sitecore.Web;User ID=${SQL_SA_LOGIN};Password=${SQL_SA_PASSWORD}
      Sitecore_ConnectionStrings_ExperienceForms: Data Source=${SQL_SERVER};Initial Catalog=Sitecore.ExperienceForms;User ID=${SQL_SA_LOGIN};Password=${SQL_SA_PASSWORD}
      Sitecore_ConnectionStrings_Solr.Search: http://solr:8983/solr;solrCloud=true
      Sitecore_ConnectionStrings_Redis.Sessions: redis:6379,ssl=False,abortConnect=False
      Sitecore_License: ${SITECORE_LICENSE}
      SOLR_CORE_PREFIX_NAME: ${SOLR_CORE_PREFIX_NAME}
      MEDIA_REQUEST_PROTECTION_SHARED_SECRET: ${MEDIA_REQUEST_PROTECTION_SHARED_SECRET}
    healthcheck:
      test: ["CMD", "powershell", "-command", "C:/Healthchecks/Healthcheck.ps1"]
      timeout: 300s
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.cd-secure.entrypoints=websecure"
      - "traefik.http.routers.cd-secure.rule=Host(`${CD_HOST}`)"
      - "traefik.http.routers.cd-secure.tls=true"
      - "traefik.http.middlewares.stripForwardedHostHeader.headers.customrequestheaders.X-Forwarded-Host="
      - "traefik.http.routers.cd-secure.middlewares=stripForwardedHostHeader"
```

２つ目のファイルは以下の通りです。

```docker-compose.override.yml
  cd:
    image: ${REGISTRY}${COMPOSE_PROJECT_NAME}-xm1-cd:${VERSION:-latest}
    build:
      context: ./docker/build/cd
      args:
        BASE_IMAGE: ${SITECORE_DOCKER_REGISTRY}sitecore-xm1-cd:${SITECORE_VERSION}
        SXA_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-sxa-xm1-assets:${SXA_VERSION}
        TOOLING_IMAGE: ${SITECORE_TOOLS_REGISTRY}sitecore-docker-tools-assets:${TOOLS_VERSION}
        SOLUTION_IMAGE: ${REGISTRY}${COMPOSE_PROJECT_NAME}-solution:${VERSION:-latest}
        CONTENTHUB_ASSETS_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-chub-assets:${CONTENTHUB_VERSION}
        HEADLESS_SERVICES_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-headless-services-xm1-assets:${HEADLESS_SERVICES_VERSION}
    depends_on:
      - solution
    volumes:
      - ${LOCAL_DEPLOY_PATH}\website:C:\deploy
      - ${LOCAL_DATA_PATH}\cd:C:\inetpub\wwwroot\App_Data\logs
    environment:
      SITECORE_DEVELOPMENT_PATCHES: CustomErrorsOff
      Sitecore_ConnectionStrings_DAM.ContentHub: ${DAM_ContentHub}
      Sitecore_ConnectionStrings_DAM.SearchPage: ${DAM_SearchPage}
      Sitecore_ConnectionStrings_DAM.ExternalRedirectKey: ${DAM_ExternalRedirectKey}
    entrypoint: powershell -Command "& C:\tools\entrypoints\iis\Development.ps1"
```

CD サーバーが削除されたかどうか、一度起動して確認します。

```
docker-compose up -d
```

![rendering](/static/images/2022/09/rendering01.png)

## コンテナの追加

続いてコンテナの情報を追加していく。

```dockerfile:docker-compose.override.yml
  # A Windows-based nodejs base image
  nodejs:
    image: ${REGISTRY}${COMPOSE_PROJECT_NAME}-nodejs:${VERSION:-latest}
    build:
      context: ./docker/build/nodejs
      args:
        PARENT_IMAGE: ${NODEJS_PARENT_IMAGE}
        NODEJS_VERSION: ${NODEJS_VERSION}
    scale: 0

  rendering:
    image: ${REGISTRY}${COMPOSE_PROJECT_NAME}-rendering:${VERSION:-latest}
    build:
      context: ./docker/build/rendering
      target: ${BUILD_CONFIGURATION}
      args:
        PARENT_IMAGE: ${REGISTRY}${COMPOSE_PROJECT_NAME}-nodejs:${VERSION:-latest}
    volumes:
      - .\src\rendering:C:\app
    environment:
      SITECORE_API_HOST: "http://cm"
      NEXTJS_DIST_DIR: ".next-container"
      PUBLIC_URL: "https://${RENDERING_HOST}"
      JSS_EDITING_SECRET: ${JSS_EDITING_SECRET}
      SITECORE_API_KEY: "${SITECORE_API_KEY}"
    depends_on:
      - cm
      - nodejs
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.rendering-secure.entrypoints=websecure"
      - "traefik.http.routers.rendering-secure.rule=Host(`${RENDERING_HOST}`)"
      - "traefik.http.routers.rendering-secure.tls=true"
  cm:
    environment:
      RENDERING_HOST_INTERNAL_URI: "http://rendering:3000"    
```

```.env
# Windows and Node.js version for JSS
NODEJS_PARENT_IMAGE=mcr.microsoft.com/windows/nanoserver:1809
NODEJS_VERSION=16.15.1

RENDERING_HOST=www.sitecoredemo.localhost
RENDERING_HOST_INTERNAL_URI=http://rendering:3000
JSS_EDITING_SECRET
SITECORE_API_KEY
```


![vercel](/static/images/2022/09/vercel06.png)

ここでエラーが発生する際は、Vercel の環境変数の追加を忘れていないか、設定後 ReDeploy を忘れていないかを確認してください。

## まとめ

これまで準備してきた環境をサーバーとして動かすことができるようになりました。次回はコンテナの環境でもエクスペリエンスエディターが動作するようにします。