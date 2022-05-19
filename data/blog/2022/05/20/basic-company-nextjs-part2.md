---
title: Sitecore Helix の Next.js サンプルを動かす - コンテナを起動する
date: '2022-05-20'
tags: ['デモ', 'Next.js', 'Docker']
draft: false
summary: 前回は環境を準備するところまでとして、コンテナを起動することはありませんでした。今回は、サンプルを実行するためのスクリプト up.ps1 を参考にしながらどういう形でコンテナを起動することになるのかを確認していきます。
images: ['/static/images/2022/05/sample20.png']
---

前回は環境を準備するところまでとして、コンテナを起動することはありませんでした。今回は、サンプルを実行するためのスクリプト up.ps1 を参考にしながらどういう形でコンテナを起動することになるのかを確認していきます。

## コンテナイメージのダウンロードとビルド

手軽に起動するのであれば、以下のコマンドを実行すると問題ありません。

```ps1
.\up.ps1
```

が、今回はこの中身を見ながら進めていきたいとおもいます。まず最初に、このスクリプトでは全てのイメージのビルドを実行しています。

```ps1
docker-compose build
```

これを実行すると、必要なイメージのダウンロードが開始されます。

![sample](/static/images/2022/05/sample06.png)

このコマンドは、`docker-compose.yml` および `docker-compose.override.yml` に定義されている内容をもとに、イメージを作成していく形です。build は非常に時間がかかるので、コーヒーを飲みながら見守っておきましょう。

## コンテナの起動

ビルドが完了したら、今度はコンテナを起動します。コマンドは以下の通り。

```ps1
docker-compose up -d
```

![sample](/static/images/2022/05/sample07.png)

コンテナが起動したのを確認したあと、以下のサイトにアクセスをしてください。

https://cm-basic-company-nextjs.sitecoredemo.jp/

![sample](/static/images/2022/05/sample08.png)

標準のページが表示されています。管理画面にアクセスをするために、 /sitecore を追加してアクセスをします。するとログイン画面が表示されます。事前に設定した管理者のパスワードでログインをすると、以下のように管理画面に入ることができました。

![sample](/static/images/2022/05/sample09.png)

`up.ps1` のファイルはまだ処理が残っています。続けて確認をしていきます。

## データのインポート

すでに Sitecore のインスタンスが起動しているため、ここから先はデモ用のコンテンツをインポートしていきます。ここから先日紹介をした Sitecore CLI の出番となります。

- [Sitecore CLI のインストール](/blog/2022/05/17/install-sitecore-cli)

まず、コマンドラインツールを使えるように以下のコマンドを実行します。

```
dotnet tool restore
```

この環境では、Sitecore CLI 4.0.0 が復元されます。

![sample](/static/images/2022/05/sample10.png)

続いてコマンドラインで Sitecore にアクセスできるようにログインを実行します。まず、PowerShell で以下のコマンドを実行します。

```
dotnet sitecore login --cm https://cm-basic-company-nextjs.sitecoredemo.jp/ --auth https://id-basic-company-nextjs.sitecoredemo.jp/ --allow-write true
```

![sample](/static/images/2022/05/sample11.png)

ブラウザが起動して、ログインおよび API へのアクセスに関しての確認画面が表示されます。

![sample](/static/images/2022/05/sample12.png)

承認をすると画面が切り替わります。

![sample](/static/images/2022/05/sample13.png)

コマンドラインがログインをすることができました。

![sample](/static/images/2022/05/sample14.png)

続いて以下の処理を実行しています。まず最初に Solr と連携している Schema に関する処理です。

```
dotnet sitecore index schema-populate
```

続いてインデックスのリビルドを実行します。

```
dotnet sitecore index rebuild
```

![sample](/static/images/2022/05/sample15.png)

CD サーバーをリスタートします

```
docker-compose restart cd
```

この段階で、管理画面のコンテンツエディターでアクセスをすると、以下のようにまだ何も入ってないデフォルトの設定のままとなっています。

![sample](/static/images/2022/05/sample16.png)

インポートを実行する際には、以下のコマンドを実行します。

```
dotnet sitecore ser push --publish
```

![sample](/static/images/2022/05/sample17.png)

インポートが完了したあと、コンテンツエディタを見にいくとアイテムが生成されているのがわかります。

![sample](/static/images/2022/05/sample18.png)

publish も完了しているため、web データベースにもアイテムが展開されている状況です。

ここで１点、レンダリングで設定しているサーバーに関して実行が不足しています。これは `up.ps1` にも記載されていないため、追加の手順となります。まず、 **C:\projects\helix-basic-nextjs\src\Project\BasicCompany\nextjs** のパスまで移動してください。移動後、`npm install` を実行します。

![sample](/static/images/2022/05/sample19.png)

レンダリングホストに関してこの処理が抜けているため、この作業を抜きの場合はエラーになります。コマンドを実行後は正しく動作するようになります。

エクスペリエンスエディターを起動すると、フィールドで定義されている項目の変更が可能です。

![sample](/static/images/2022/05/sample20.png)

またレンダリングホストにアクセスしてもページが表示されているのを確認できます。

![sample](/static/images/2022/05/sample21.png)

## まとめ

前回は環境の設定、今回は実際に Sitecore が起動するところまでの紹介となりました。`up.ps1` を実行するだけではわかりにくい部分がありましすが、順を追って動作を確認、個別に実行することで、どういう形でデモサイトをセットアップしているのかを確認することができました。インポートが終われば、あとは `docker-compose stop` で停止、`docker-compose up -d` で起動すれば良いというのも一度手順を追って実行すると理解できます。

## 参考情報

- [Sitecore Docker シリーズ](/blog/sitecore-docker)
