---
title: Sitecore Headless 開発、テスト環境を起動する
date: '2022-09-16'
tags: ['Headless', 'Next.js']
draft: true
summary: 前々回に Next.js のテンプレートの準備を、前回はそれを利用するための Sitecore にアイテムをインポートする手順を紹介しました。今回は Next.js の設定を変更して、Sitecore のアイテムを参照してページが表示されるところまで紹介をします。
images: ['/static/images/2022/09/project09.png']
---

これまで複数回に分けてプロジェクトを作成してきましたが、毎回同じことを実施するのは面倒です。そこで、これまでの手順を省略して環境を起動する手順を紹介します。

## GitHub のリポジトリの作成

以下のリポジトリにアクセスをして、`Use this template` のボタンをクリックして、新しいリポジトリを作成します。

- https://github.com/SitecoreJapan/Sitecoredemo.Docker

![project](/static/images/2022/09/project01.png)

リポジトリを作成する際には、Private リポジトリを選択することも可能です。名前などは利用したい形で変更をしてください。

![project](/static/images/2022/09/project02.png)

作成したリポジトリをローカルに展開して準備完了です。

## プロジェクトの設定

まず最初に、`.env.example` のファイルをコピーして `.env` ファイルを作成します。

続いて管理者のパスワードに関しては、`init.ps1` の中に記載されている `SitecoreAdminPassword` を変更してください。

上記の設定が完了したところで、管理者権限のある環境で以下のコマンドを実行してください。ライセンスファイルの場所は、手元の環境に合わせて変更をしてください。

```ps1
.\init.ps1 -LicenseXmlPath "C:\projects\license\license.xml"
```

![project](/static/images/2022/09/project03.png)

上記のスクリプトを実行すると、ローカルで利用できる証明書の作成、localhost のアップデートなどの手順を自動化させていきます。

最後に、Node.js のバージョンを `.env` ファイルに記載するために、`node -v` のコマンドを実行して、表示されたバージョンを `NODEJS_VERSION` に設定をして準備が完了となります。

![project](/static/images/2022/09/project04.png)

## 起動までの処理を実行する

上記の準備が出来たところで、以下のコマンドでコンテナのビルド、Sitecore の起動、インポートなどすべて自動的に実行していきます。このスクリプトを実行するにあたって、管理者権限は必要ありません。

```
.\up.ps1
```

初回起動の場合は、コンテナイメージのダウンロードなども含めて時間がかかります。Sitecore が起動したあとすぐに、ログインを求めてきます。このログインは Sitecore CLI から環境にアクセスするために必要なものですので、ログインをしてください。

![project](/static/images/2022/09/project05.png)

## 動作確認

スクリプトの動作が完了すると以下のように管理画面が表示されます。

![project](/static/images/2022/09/project06.png)

日本語のリソースもインポートをしているため、管理画面の言語を切り替えると日本語の表記に切り替わります。

![project](/static/images/2022/09/project07.png)


コンテンツエディターを起動して、`/sitecore/content/sitecoredemo-jp/home` のアイテムを選択、エクスペリエンスエディターを起動するとページ編集の画面が表示されるようになります。

![project](/static/images/2022/09/project08.png)

## 追加の手順

このプロジェクトでは API キーを発行していません。このため API キーを作成して公開をしてください。`/sitecore/system/Settings/Services/API Keys` のパスに移動をして、API キーを作成します。アイテムの CORS Origins および 認められたコントローラー には * を設定します。

![project](/static/images/2022/09/project09.png)

、アイテムの公開（パブリッシュ）を実行してください。

公開後、以下の URL で GraphQL の画面にアクセスをします（ホスト名を変更している場合は、ホスト名を変更してください）。

- https://cm.sitecoredemo.localhost/sitecore/api/graph/edge/ui

左下の HTTP HEADERS には以下のように API キーを設定してください。

```json
{
    "sc_apikey": "your api key"
}
```

以下のような画面が表示されれば、GraphQL を利用できるようになった形です。

![project](/static/images/2022/09/project10.png)

作成をした API キーは .env ファイルに設定をします。ローカルの Next.js のプロジェクトでもキーを利用できるように `src\rendering\.env` にも記載してください。

## 停止、再開

一度データのインポートを実行していれば、以下の手順でコンテナの起動を制御できます。コンテナを停止させるコマンドは以下の通りです。

```
docker-compose stop
```

またコンテナを終了させる場合は以下のコマンドです。

```
docker-compose down
```

起動する場合は、以下のコマンドで起動します。

```
docker-compose up -d
```

設定の変更をした際に、上記のコマンドを状況に合わせて実行してください。

## データの削除

作成していた環境を一度初期状態に戻す際には、 docker\clean.ps1 を実行してください。データベースファイルなどすべて削除されます。その後、以下のようにアイテムのインポートなどを実行していきます。

```
docker-compose up -d
dotnet sitecore login --cm https://cm.sitecoredemo.localhost --auth https://id.sitecoredemo.localhost --allow-write true -n default
dotnet sitecore index schema-populate
dotnet sitecore ser push
```

これでプロジェクトの初期の状態に戻ります。

## まとめ

ブログの記事として多くの Tips を入れておけると思い、プロジェクトの作成までの手順をこれまで紹介してきましたが、毎回同じ作業をするのは大変です。このようなベースのプロジェクトを作成しておくことで、素早く開発環境を準備することが出来ます。手順を理解しておくことで、何らかの変更をしたい場合の変更点を素早く特定することが可能となります。