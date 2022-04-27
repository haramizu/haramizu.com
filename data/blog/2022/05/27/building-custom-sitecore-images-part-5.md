---
title: Sitecore Docker カスタムイメージの利用 - Sitecore Headless Services のインストール
date: '2022-05-27'
tags: ['Docker', 'Headless']
draft: true
summary: 前回は Sitecore Management Services のインストールを実施しました。今回はモジュールのインストールとして、Sitecore Headless Services のモジュールをインストールしたいとおもいます。前回の Sitecore Management Services と違って、CM サーバー以外にも設定をする必要があるため、同様のモジュールでも同じような手順で進めることが可能です。
images: ['/static/images/2022/05/customimage14.png']
---

前回は Sitecore Management Services のインストールを実施しました。今回はモジュールのインストールとして、Sitecore Headless Services のモジュールをインストールしたいとおもいます。前回の Sitecore Management Services と違って、CM サーバー以外にも設定をする必要があるため、同様のモジュールでも同じような手順で進めることが可能です。

## Sitecore Headless Services のインストール

ヘッドレスサービスのインストールのリファレンスは、前回紹介をしたページと同じところに記載されており、右側に表示されているページ内リンクをクリックすると表示されます。10.1 と 10.2 で手順が異なるため、今回は英語のページをリファレンスにしています。

- [JavaScript Services (JSS) / Sitecore Headless Services](https://doc.sitecore.com/xp/en/developers/102/developer-tools/sitecore-module-reference.html)

この定義を、前回と同じようにプロジェクトに反映させていきます。最初に、`.env` ファイルにイメージリポジトリを追加します。

```yml:.env
HEADLESS_SERVICES_IMAGE=scr.sitecore.com/sxp/modules/sitecore-headless-services-xm1-assets:19.0-1809
```

この HEADLESS_SERVICES_IMAGE を `.env` に記載することで、docker-compose を実行する際に設定を反映させることができます。今回も `docker-compose.override.yml` のファイルを編集していきますが、設定対象は cm および cd の２を進めていきます。

```yml:docker-compose.override.yml
  cd:
    image: ${REGISTRY}${COMPOSE_PROJECT_NAME}-xm1-cd:${VERSION:-latest}
    build:
      context: ./docker/build/cd
      args:
        BASE_IMAGE: ${SITECORE_DOCKER_REGISTRY}sitecore-xm1-cd:${SITECORE_VERSION}
        SXA_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-sxa-xm1-assets:${SXA_VERSION}
        TOOLING_IMAGE: ${SITECORE_TOOLS_REGISTRY}sitecore-docker-tools-assets:${TOOLS_VERSION}
        SOLUTION_IMAGE: ${REGISTRY}${COMPOSE_PROJECT_NAME}-solution:${VERSION:-latest}
        HEADLESS_SERVICES_IMAGE: ${HEADLESS_SERVICES_IMAGE}

  cm:
    image: ${REGISTRY}${COMPOSE_PROJECT_NAME}-xm1-cm:${VERSION:-latest}
    build:
      context: ./docker/build/cm
      args:
        BASE_IMAGE: ${SITECORE_DOCKER_REGISTRY}sitecore-xm1-cm:${SITECORE_VERSION}
        SPE_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-spe-assets:${SPE_VERSION}
        SXA_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-sxa-xm1-assets:${SXA_VERSION}
        TOOLING_IMAGE: ${SITECORE_TOOLS_REGISTRY}sitecore-docker-tools-assets:${TOOLS_VERSION}
        HORIZON_RESOURCES_IMAGE: ${SITECORE_MODULE_REGISTRY}horizon-integration-xm1-assets:${HORIZON_ASSET_VERSION}
        SOLUTION_IMAGE: ${REGISTRY}${COMPOSE_PROJECT_NAME}-solution:${VERSION:-latest}
        MANAGEMENT_SERVICES_IMAGE: ${MANAGEMENT_SERVICES_IMAGE}
        HEADLESS_SERVICES_IMAGE: ${HEADLESS_SERVICES_IMAGE}
```

cd および cm に関してのコピーの処理を記載していきます。まずは CD に関する記述です。

```yml:docker\build\cd\Dockerfile
ARG HEADLESS_SERVICES_IMAGE
FROM ${HEADLESS_SERVICES_IMAGE} AS headless_services

# Add headless module
COPY --from=headless_services C:\module\cd\content C:\inetpub\wwwroot
COPY --from=headless_services C:\module\tools C:\module\tools
RUN C:\module\tools\Initialize-Content.ps1 -TargetPath C:\inetpub\wwwroot; `
  Remove-Item -Path C:\module -Recurse -Force;
```

続いて、CM に関する記述です。CD とにているのでコピペでと考えてしまいそうですが、パスが異なるので注意してください。

```yml:docker\build\cd\Dockerfile
ARG HEADLESS_SERVICES_IMAGE
FROM ${HEADLESS_SERVICES_IMAGE} AS headless_services

# Add headless module
COPY --from=headless_services C:\module\cm\content C:\inetpub\wwwroot
COPY --from=headless_services C:\module\tools C:\module\tools
RUN C:\module\tools\Initialize-Content.ps1 -TargetPath C:\inetpub\wwwroot; `
    Remove-Item -Path C:\module -Recurse -Force;
```

続いて mssql に関する docker ファイルですが、元々のサンプルにこの記述がありません。SQL Server に関する定義は以下のようになっています。

```yml:docker-compose.override.yml
  mssql:
    mem_limit: 2GB
    volumes:
      - ${LOCAL_DATA_PATH}\mssql:c:\data
```

以前までは標準のイメージで問題なく動作していたのですが、カスタムイメージを作成することになります。そこで、以下のように build するための docker ファイルを指定しつつ、パラメーターを追加する形で更新をします。

```yml:docker-compose.override.yml
  mssql:
    image: ${REGISTRY}${COMPOSE_PROJECT_NAME}-xm1-mssql:${VERSION:-latest}
    mem_limit: 2GB
    volumes:
      - ${LOCAL_DATA_PATH}\mssql:c:\data
    build:
      context: ./docker/build/mssql
      args:
        BASE_IMAGE: ${SITECORE_DOCKER_REGISTRY}sitecore-xm1-mssql:10.1-ltsc2019
        HEADLESS_SERVICES_IMAGE: ${HEADLESS_SERVICES_IMAGE}
```

build するための docker ファイルを作成します。今回は以下のようにファイルを作成しました。

```yml:docker\build\mssql\Dockerfile
# escape=`

ARG BASE_IMAGE
ARG HEADLESS_SERVICES_IMAGE

FROM ${HEADLESS_SERVICES_IMAGE} AS headless_services
FROM ${BASE_IMAGE}

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

# Copy and init the JSS / Headless Services Module
COPY --from=headless_services C:\module\db C:\jss_data
RUN C:\DeployDatabases.ps1 -ResourcesDirectory C:\jss_data; `
  Remove-Item -Path C:\jss_data -Recurse -Force;
```

これで準備が完了です。

## コンテナを起動する

今回、SQL Server のイメージを作成し直すこともあり、`docker\data\mssql` にあるデータベースファイルを削除します。その後、コンテナの build を実行します。

```
docker-compose build mssql
docker-compose build cm
docker-compose build cd
```

![customimage](/static/images/2022/05/customimage22.png)
