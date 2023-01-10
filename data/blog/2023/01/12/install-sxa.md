---
title: SXA のモジュールを追加する
date: '2023-01-12'
tags: ['Docker', 'Next.js', 'XM']
draft: true
summary: 前回の記事でまずはテンプレートとなるプロジェクトを作成しました。今回は、一番シンプルな XM1 を実行するためのプロジェクトにするために、不要なものを削除、調整の手順を進めていきます。
images: ['/static/images/2023/01/sxa01.png']
---

前回は XM1 のインスタンスを起動することができました。今回は、Next.js のプロジェクトを追加するにあたって必要となる Sitecore Experience Accelerator のモジュールをコンテナで利用できる様に追加の設定をしていきます。

## Docker の設定、イメージの変更

まず最初に、モジュールをインストールするために以下の設定を追加します。まずは `.env` のファイルに以下の３つの項目を設定します。

```.env
SITECORE_MODULE_REGISTRY=scr.sitecore.com/sxp/modules/
SPE_VERSION=6.4-1809
SXA_VERSION=10.3-1809
```

続いて `docker-compose.override.yml` に対して、SXA や SPE のモジュールをインストールするため、`mssql-init` 、 `solr-init` 、 `cd` および `cm` に以下のイメージの値を渡してください（実際に追加するのは args の下の行となります）。

```yaml:docker-compose.override.yml
  mssql-init:
    build:
      args:
        SPE_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-spe-assets:${SPE_VERSION}

  solr-init:
    build:
      args:
        SXA_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-sxa-xm1-assets:${SXA_VERSION}

  cd:
    build:
      args:
        SXA_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-sxa-xm1-assets:${SXA_VERSION}

  cm:
    build:
      args:
        SPE_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-spe-assets:${SPE_VERSION}
        SXA_IMAGE: ${SITECORE_MODULE_REGISTRY}sitecore-sxa-xm1-assets:${SXA_VERSION}
```

これで各 Dockerfile を build する時に、必要なファイルを利用することが可能となります。まずは `cd` の dockerfile には以下の項目を追加してください。

```docker:docker\build\cd\Dockerfile
ARG SXA_IMAGE

FROM ${SXA_IMAGE} as sxa

# Add SXA module
COPY --from=sxa \module\cd\content .\
COPY --from=sxa \module\tools \module\tools
RUN C:\module\tools\Initialize-Content.ps1 -TargetPath .\; `
    Remove-Item -Path C:\module -Recurse -Force;
```

続いて `cm` の dockerfile を編集します。

```docker:docker\build\cm\Dockerfile
ARG SXA_IMAGE
ARG SPE_IMAGE

FROM ${SPE_IMAGE} as spe
FROM ${SXA_IMAGE} as sxa

# Add SPE module
COPY --from=spe \module\cm\content .\

# Add SXA module
COPY --from=sxa \module\cm\content .\
COPY --from=sxa \module\tools \module\tools
RUN C:\module\tools\Initialize-Content.ps1 -TargetPath .\; `
    Remove-Item -Path C:\module -Recurse -Force;
```

続いて `mssql-init` の dockerfile の作業です。

```docker:docker\build\mssql-init\Dockerfile
ARG SPE_IMAGE
FROM ${SPE_IMAGE} as spe

# copy pse
COPY --from=spe C:\module\db C:\resources\spe
```

最後に `solr-init` の dockerfile を更新します。

```docker\build\solr-init\Dockerfile
ARG SXA_IMAGE

FROM ${SXA_IMAGE} as sxa

# Add SXA module
COPY --from=sxa C:\module\solr\cores-sxa.json C:\data\cores-sxa.json
```

これでモジュールのインストールの準備が完了しました。

## 起動する

まず以前に起動していたデータを一度削除します。docker フォルダにある clean.ps1 ファイルを利用して全て削除してください。なお、すでに起動している場合は一度落としてください。

```
cd docker
.\clean.ps1
cd ..
```

今回はイメージをビルド改めてして起動するだけですので、以下のコマンドを実行して改めてコンテナを起動します。

```
docker-compose build
docker-compose up -d
```

コンテナが起動したあと、起動している Sitecore のサーバーにアクセスをします。ログイン後、コンテンツエディターでテナントの作成ができることを確認してください。

![clean](/static/images/2023/01/sxa01.png)

Solr のインデックスに対しても、sxa の項目があるかどうか確認をしてください。

![clean](/static/images/2023/01/sxa02.png)

正しく動作している場合は、一度インデックスを rebuild をして今回の準備を完了とします。

## まとめ

これで Sitecore XM の環境で SXA を利用できる様になりました。次回は、Sitecore の Next.js のプロジェクトを作成して Sitecore と連携できるようにします。
