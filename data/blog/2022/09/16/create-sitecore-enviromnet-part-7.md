---
title: Sitecore Headless 開発、テスト環境の構築 Part 7 - プロジェクトの整理（ CD サーバーの削除 ）
date: '2022-09-16'
tags: ['Headless', 'Next.js']
draft: false
summary: すでにプロジェクトとしてはヘッドレスの検証環境を用意した形となりますが、今回と次回で不要な部分を削除、整理していきたいと思います。今回はヘッドレスで起動することになったので、CD サーバーの構成を削除したいと思います。
images: ['/static/images/2022/09/rendering02.png']
---

すでにプロジェクトとしてはヘッドレスの検証環境を用意した形となりますが、今回と次回で不要な部分を削除、整理していきたいと思います。今回はヘッドレスで起動することになったので、CD サーバーの構成を削除したいと思います。

## CD サーバーの削除

すでにコンテナで Node.js で動いているサーバーが用意されており、CD サーバー自体は不要となりました。そこで、プロジェクトから不要な部分を削除していきます。まず、docker-compose.xml ファイルから、以下の部分を削除していきます。

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

続いて、`docker-compose.override.yml` からも同様に CD に関連する部分を削除します。

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

続いて `docker\build\cd` のフォルダを削除してください。これで CD サーバーに関する定義を削除しました。

最後に、`RENDERING_HOST` ではなく `CD_HOST` で Node.js のコンテナを動かすようにします。変更点としては、.env ファイルの以下の行を削除します。

```
RENDERING_HOST=www.sitecoredemo.localhost
```

続いて、 `docker-compose.override.yml` において `RENDERING_HOST` を指し示している部分が２箇所あります。これを `CD_HOST` に変更します。これで CD サーバーとして Node.js のコンテナが動くようになります。コンテナを build し直した後に起動すると、CD サーバーが削除されて Node.js のコンテナが CD サーバーになっていることを確認できます。

```
docker-compose up -d
```

![rendering](/static/images/2022/09/rendering02.png)


## まとめ

プロジェクトで利用することのない CD サーバーのコンテナを削除しました。次回は、各種パラメーターを .env に定義することで動作するように、コンテナや設定を見直していきます。