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
HEADLESS_SERVICES_VERSION=19.0-20H2
```

この HEADLESS_SERVICES_IMAGE を `.env` に記載することで、docker-compose を実行する際に設定を反映させることができます。今回も `docker-compose.override.yml` のファイルを編集していきますが、設定対象は cm および cd を進めていきます。以下は差分のみ紹介をしている形です。

```yml:docker-compose.override.yml
  cd:
    build:
      args:
        HEADLESS_SERVICES_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-headless-services-xm1-assets:${HEADLESS_SERVICES_VERSION}

  cm:
    build:
      args:
        HEADLESS_SERVICES_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-headless-services-xm1-assets:${HEADLESS_SERVICES_VERSION}

  mssql-init:
    build:
      args:
        HEADLESS_SERVICES_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-headless-services-xm1-assets:${HEADLESS_SERVICES_VERSION}
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

続いて mssql-init のファイルを編集します。

```yml:docker\build\mssql-init\Dockerfile
ARG HEADLESS_SERVICES_IMAGE

FROM ${HEADLESS_SERVICES_IMAGE} AS headless_services

COPY --from=headless_services C:\module\db C:\jss_data
```

これでほぼ完了ですが、もう少し手順を進めていきます。

## 新しいバージョンを利用する

`.env` で定義している各種バージョンは以下のようになっています。

```
SITECORE_VERSION=10.2-ltsc2019
TOOLS_VERSION=10.2-1809
SPE_VERSION=6.3-1809
SXA_VERSION=10.2-1809
HORIZON_VERSION=3.0-ltsc2019
HORIZON_ASSET_VERSION=3.0-1809
MANAGEMENT_SERVICES_VERSION=4.1-1809
```

今回はこれを、以下のように新しいコンテナのバージョンで動くものを選択するようにしました。

```
SITECORE_VERSION=10.2-20H2
TOOLS_VERSION=10.2-1809
SPE_VERSION=6.3-20H2
SXA_VERSION=10.2-20H2
HORIZON_VERSION=3.0.0-20H2
HORIZON_ASSET_VERSION=3.0-20H2
MANAGEMENT_SERVICES_VERSION=4.1-20H2
HEADLESS_SERVICES_VERSION=19.0-20H2
```

## コンテナを起動する

今回、SQL Server のイメージを作成し直すこともあり、`docker\data\mssql` にあるデータベースファイルを削除します。その後、設定をしたイメージを起動します。

```
docker-compose up -d
```

![customimage](/static/images/2022/05/customimage22.png)
