---
title: XM1 のプロジェクトを準備する
date: '2023-01-11'
tags: ['Docker', 'Next.js', 'XM']
draft: true
summary: 前回の記事でまずはテンプレートとなるプロジェクトを作成しました。今回は、一番シンプルな XM1 を実行するためのプロジェクトにするために、不要なものを削除、調整の手順を進めていきます。
images: ['/static/images/2023/01/clean09.png']
---

前回の記事でまずはテンプレートとなるプロジェクトを作成しました。今回は、一番シンプルな XM1 を実行するためのプロジェクトにするために、不要なものを削除、調整の手順を進めていきます。

## XM1 の docker-compose ファイルの配置

run\sitecore-xm1 のフォルダにある以下の 3 つのファイルをトップレベルに移動をします。

- run\sitecore-xm1\.env
- run\sitecore-xm1\docker-compose.override.yml
- run\sitecore-xm1\docker-compose.yml

他の構成は今回不要なため、run フォルダを削除します。ファイルの変更は以下の様な形となります。

![clean](/static/images/2023/01/clean01.png)

## 不要な Docker のイメージを削除する

XP1 の構成が可能なイメージが多くありますが、XM1 では不要なファイルが docker の配下に多くあります。どれが必要かの確認としては、 docker-compose.override.yml のファイルで利用している dockerfile をまずは残すこととします。必要なファイルは以下の通りです。

- docker/build/cd
- docker/build/cm
- docker/build/id
- docker/build/mssql-init
- docker/build/nodejs
- docker/build/redis
- docker/build/rendering
- docker/build/solr-init

## ドメイン名の微調整

ローカルで動かすドメイン名に関して、 .env ファイルや init.ps1 に対して記載されていますが、このドメインを今回は変更したいと思います。この作業は気にしない方は大丈夫ですが、これまでブログで紹介していたドメインと異なるので、ブログ上で一貫性を持たせるために今回は変更するだけです。

すでに設定されているドメイン名は以下の通りです。

- dockerstarter.localhost

これを以下のドメイン名に変更します

- sitecoredemo.localhost

修正漏れがないように、一括で変更をしました。

![clean](/static/images/2023/01/clean02.png)

## プロジェクトの初期化

上記で一通り設定が完了したため、これまでと同じように以下のように .env ファイルなどを更新していきます。まず、プロジェクトの名前を変更します。

```.env
COMPOSE_PROJECT_NAME=sitecoredemo-docker
```

SQL や Solr のデータは違うパスに保存をする形となるため、以下の様に書き換えます。

```.env
LOCAL_DEPLOY_PATH=.\docker\deploy\
LOCAL_DATA_PATH=.\docker\data\
```

続いて init.ps1 のファイルを変更します。今回は関連ファイルをトップレベルに移動しているため、`workinDirectoryPath` のパスを変更します。

```powershell:init.ps1
$workinDirectoryPath = ".\"
```

これで準備が完了しました。コマンドは管理者権限のあるターミナルで実行してください。

```
.\init.ps1 -InitEnv -LicenseXmlPath "C:\projects\license\license.xml" -AdminPassword "DesiredAdminPassword" -Topology xm1
```

![clean](/static/images/2023/01/clean03.png)

## Docker-compose 関連の更新

続いて `docker-compose.override.yml` のファイルが移動しているため、docker ファイルへのパスを書き換えます。相対パスが `../../docker/build/` となっているところを `docker/build/` に変更をします。

![clean](/static/images/2023/01/clean04.png)

また solution のファイルは同じフォルダにあるため、パスを以下のように変更してください。

```yaml
build:
  context: .
```

rendering の volumes のパスも以下のように書き換えます。

```yaml
rendering:
  volumes:
    - .\src\rendering:C:\app
```

最後に traefik が利用する証明書のパスを書き換えます。

```yaml
traefik:
  volumes:
    - ./docker/traefik:C:/etc/traefik
```

これで XM1 を起動する準備ができました。

## 実行する

コンテナを起動する前に、以下のフォルダの状況を確認します。まず、シリアライズする予定のデータはあまり準備されていません。

![clean](/static/images/2023/01/clean05.png)

Rendering で利用するコンテナが src\rendering のフォルダを必要とするため、フォルダを作成してください（このフォルダは後ほど Next.js のプロジェクトを作成します。

![clean](/static/images/2023/01/clean06.png)

それでは早速、最初の初期設定を実行していきます。コマンドはシンプルで以下の通りです。

```
docker-compose up -d
```

必要に応じてコンテナのイメージをダウンロードして、最終的に XM1 が起動します。以下の URL にアクセスをすると管理画面にログインが可能です。

- https://cm.sitecoredemo.localhost/sitecore

以下のようにログインができれば、コンテナで XM1 を起動することができました。

![clean](/static/images/2023/01/clean07.png)

## まとめ

プロジェクトのテンプレートから XM1 のイメージを立ち上げる手順を紹介しました。特に XP などで利用するデータを削除をして、 `docker-compose.override.yml` に定義しているパスなども変更することで、シンプルな XM1 のイメージの作成ができました。
