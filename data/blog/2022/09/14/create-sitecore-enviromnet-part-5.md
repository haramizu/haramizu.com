---
title: Sitecore Headless 開発、テスト環境の構築 Part 5 - Node.js コンテナの追加
date: '2022-09-14'
tags: ['Headless', 'Next.js']
draft: false
summary: これまで紹介してきた内容は、 Sitecore をコンテナで起動、その後テンプレートを追加、サーバーでの動作というところまで進めてきました。サーバーの環境では、Vercel を利用してページの編集、確認ができるようにしましたが、ローカルのコンテナの環境では Vercel の部分が不足している形となります。そこで今回は、この部分を Node.js のコンテナを追加して同じように動作する設定を作成します。
images: ['/static/images/2022/09/node01.png']
---

これまで紹介してきた内容は、 Sitecore をコンテナで起動、その後テンプレートを追加、サーバーでの動作というところまで進めてきました。サーバーの環境では、Vercel を利用してページの編集、確認ができるようにしましたが、ローカルのコンテナの環境では Vercel の部分が不足している形となります。そこで今回は、この部分を Node.js のコンテナを追加して同じように動作する設定を作成します。

## コンテナの追加

まず、コンテナを追加していきます。今回は Node.js が動くコンテナのイメージを作成し、そのコンテナで Next.js のプロジェクトが動くようにします。まず、docker-compose.override.yml のファイルに以下の記述を追加します。

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
```

```.env
# Windows and Node.js version for JSS
NODEJS_PARENT_IMAGE=mcr.microsoft.com/windows/nanoserver:1809
NODEJS_VERSION=16.15.1

RENDERING_HOST=www.sitecoredemo.localhost
RENDERING_HOST_INTERNAL_URI=http://rendering:3000
JSS_EDITING_SECRET=rundomkeywordsitecore101010
SITECORE_API_KEY={guid}
```

![node.js](/static/images/2022/09/node01.png)

上記の設定では、２つの docker ファイルがまだ準備されていません。まず最初に、`docker\build\nodejs\Dockerfile` のファイルを準備します。

```
# escape=`

#
# Basic Windows node.js image for use as a parent image in the solution.
#

ARG PARENT_IMAGE
FROM $PARENT_IMAGE

ARG NODEJS_VERSION

USER ContainerAdministrator
WORKDIR c:\build
RUN curl.exe -sS -L -o node.zip https://nodejs.org/dist/v%NODEJS_VERSION%/node-v%NODEJS_VERSION%-win-x64.zip
RUN tar.exe -xf node.zip -C C:\
RUN move C:\node-v%NODEJS_VERSION%-win-x64 c:\node
RUN del node.zip

RUN SETX /M PATH "%PATH%;C:\node\"
RUN icacls.exe C:\node\ /grant "Authenticated Users":(F) /t
USER ContainerUser
```

続いて `docker\build\rendering\Dockerfile` を作成します。

```
# escape=`

#
# Development-only image for running Next.js in a containerized environment.
# Assumes that the Next.js rendering host source is mounted to c:\app.
#

ARG PARENT_IMAGE
FROM ${PARENT_IMAGE} as debug

WORKDIR /app

EXPOSE 3000
#ENTRYPOINT "npm install && npm install next@canary && npm run start:connected"
ENTRYPOINT "npm install && npm run start:connected"
```

上記の準備が完了したところで、コンテナを起動します。

```
docker-compose up -d
```

## サイトにアクセスをする

上記に設定している .env のパラメーターと合わせて hosts ファイルを更新してください。

```
127.0.0.1       www.sitecoredemo.localhost
```

これでサーバーにアクセスすることができます。ブラウザでアクセスをすると以下のようになります。

![node.js](/static/images/2022/09/node02.png)

これでローカルの Next.js のコードを利用した Node.js のコンテナを起動することができました。

## まとめ

この段階では、サーバー環境としては Vercel に展開したところまでと同じ形であり、エクスペリエンスエディターとの連携は完了していません。次回は、エクスペリエンスエディターを利用できるように、調整をします。