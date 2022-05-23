---
title: Sitecore Docker カスタムイメージの利用 - Sitecore Headless Services のイメージ作成
date: '2022-05-31'
tags: ['Docker', 'Headless']
draft: true
summary: 前回は Sitecore Management Services のインストールを実施しました。今回はモジュールのインストールとして、Sitecore Headless Services のモジュールをインストールしたいとおもいます。また、標準で SXA のモジュールも入っているため、この後利用することはないため削除してい行きます。前回の Sitecore Management Services と違って、CM サーバー以外にも設定をする必要があるため、同様のモジュールでも同じような手順で進めることが可能です。
images: ['/static/images/2022/05/customimage23.png']
---

前回は Sitecore Management Services のインストールを実施しました。今回はモジュールのインストールとして、Sitecore Headless Services のモジュールをインストールしたいとおもいます。また、標準で SXA のモジュールも入っているため、この後利用することはないため削除してい行きます。前回の Sitecore Management Services と違って、CM サーバー以外にも設定をする必要があるため、同様のモジュールでも同じような手順で進めることが可能です。

## Sitecore Experience Accelerator モジュールの削除

標準でセットアップされている Sitecore Experience Accelerator のモジュールの定義を先に削除していきます。

```yaml:docker-compose.override.yml
  solr-init:
        SXA_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-sxa-xm1-assets:${SXA_VERSION}

  cd:
    build:
      args:
        SXA_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-sxa-xm1-assets:${SXA_VERSION}

  cm:
    build:
      args:
        SXA_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-sxa-xm1-assets:${SXA_VERSION}
```

上記の定義と連携している dockerfile も編集していきます。以下は削除していく項目です。

```yaml:docker\build\solr-init\Dockerfile
ARG SXA_IMAGE

FROM ${SXA_IMAGE} as sxa

# Add SXA module
COPY --from=sxa C:\module\solr\cores-sxa.json C:\data\cores-sxa.json
```

```yaml:docker\build\cd\Dockerfile
ARG SXA_IMAGE

FROM ${SXA_IMAGE} as sxa

# Add SXA module
COPY --from=sxa \module\cd\content .\
COPY --from=sxa \module\tools \module\tools
RUN C:\module\tools\Initialize-Content.ps1 -TargetPath .\; `
    Remove-Item -Path C:\module -Recurse -Force;
```

```yaml:docker\build\cm\Dockerfile
ARG SXA_IMAGE

FROM ${SXA_IMAGE} as sxa

# Add SXA module
COPY --from=sxa \module\cm\content .\
COPY --from=sxa \module\tools \module\tools
RUN C:\module\tools\Initialize-Content.ps1 -TargetPath .\; `
    Remove-Item -Path C:\module -Recurse -Force;
```

## Sitecore Headless Services の追加

ヘッドレスサービスのインストールのリファレンスは、前回紹介をしたページと同じところに記載されており、右側に表示されているページ内リンクをクリックすると表示されます。10.1 と 10.2 で手順が異なるため、今回は英語のページをリファレンスにしています。

- [JavaScript Services (JSS) / Sitecore Headless Services](https://doc.sitecore.com/xp/en/developers/102/developer-tools/sitecore-module-reference.html)

この定義を、前回と同じようにプロジェクトに反映させていきます。最初に、`.env` ファイルにイメージリポジトリを追加します。

```yml:.env
HEADLESS_SERVICES_VERSION=19.0-1809
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

続いて、CM に関する記述です。CD と似ているコピペでと考えてしまいそうですが、パスが異なるので注意してください。

```yml:docker\build\cm\Dockerfile
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

これでモジュール追加の設定が完了しました。

## コンテナを起動する

上記の設定が完了したところで、docker\data\mssql にあるファイルおよび docker\data\solr にあるファイルを削除します。SXA のモジュールを削除しているので、この機会に一度作り直すためです。完了したところで、以下のように手順を進めていきます。

```
docker-comopse build
docker-compose up -d
```

起動後、管理画面にログインをして SXA のモジュールが削除されているため、テナント作成の機能がなくなりました。

![customimage](/static/images/2022/05/customimage22.png)

Headless Services のインストールを確認するために、GraphQL の UI にアクセスします。`/sitecore/api/graph/edge/ui` をサイト名に追加してアクセスをすると表示されます。

![customimage](/static/images/2022/05/customimage23.png)

API キーを作成して publish を実行、キーを利用してアクセスをすると有効になることがわかります。

![customimage](/static/images/2022/05/customimage24.png)

## まとめ

ヘッドレスの環境として利用するコンテナのセットが出来ました。本ブログではこれをベースに、以前に動かした[デモ環境](/blog/2022/05/20/basic-company-nextjs-part2)と同じサンプルと同じような環境を整備する方法を、次回以降紹介していきます。

## 参考情報

- [Sitecore Docker シリーズ](/blog/sitecore-docker)
- [Test your queries](https://doc.sitecore.com/xp/en/developers/101/developer-tools/test-your-queries.html)
