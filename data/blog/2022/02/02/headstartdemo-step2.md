---
title: Headstart デモ環境を構築する - Part 2 サンプルコードを準備する
date: '2022-02-02'
tags: ['Sitecore', 'OrderCloud']
draft: false
summary: 前回はデモ環境を構築するための前提条件の紹介、そして OrderCloud のアカウントの作成まで紹介をしました。今回は、デモ環境のサンプルソースコードを手元に準備して GitHub のリポジトリと連携するところまで紹介をします。
images: ['/static/images/2022/02/download07.png']
---

前回はデモ環境を構築するための前提条件の紹介、そして OrderCloud のアカウントの作成まで紹介をしました。今回は、デモ環境のサンプルソースコードを手元に準備して GitHub のリポジトリと連携するところまで紹介をします。

## Headstart リポジトリをコピーする

Headstart のリポジトリは Sitecore とは別で OrderCloud のアカウントが提供しています。URL は以下の通りです。

- https://github.com/ordercloud-api/Headstart

サイトにアクセスをして、Code のボタンをクリック、Download Zip のボタンをクリックしてリポジトリのデータを Zip ファイルとしてダウンロードしてください。

![OrderCloud](/static/images/2022/02/download01.png)

ダウンロードした zip ファイルを c:¥projects¥Headstart-demo というフォルダに展開をします。

![OrderCloud](/static/images/2022/02/download02.png)

続いてこのフォルダをローカルのリポジトリとして、かつ GitHub のリポジトリにもアップロードします。この部分は Git のコマンドに慣れている人であればコマンドで実行してください。ここでは GitHub Desktop を利用して手順を進めていきます。

GitHub Desktop を立ち上げて、File - Add local repository のメニューを選択します。以下のような画面となります。

![OrderCloud](/static/images/2022/02/download03.png)

ここではローカルのリポジトリを作るために、create a repository をクリックします。クリックをするとダイアログが変更されて次のようになります。

![OrderCloud](/static/images/2022/02/download04.png)

ここではデフォルトのまま Create repository のボタンをクリックします。これで c:¥projects¥Headstart-demo のディレクトリがローカルのリポジトリとなります。すでに GitHub のアカウントと連携している状況であれば、処理が終わると以下の画面となります。

![OrderCloud](/static/images/2022/02/download05.png)

Publish repository のボタンをクリックすると以下のダイアログが表示されます。

![OrderCloud](/static/images/2022/02/download06.png)

今回はプライベートリポジトリとして GitHub にコードをアップロードするため、チェックを入れたまま publish repository のボタンをクリックしてください。しばらくすると、GitHub にリポジトリが作成されます。

![OrderCloud](/static/images/2022/02/download07.png)

これでデモ環境を立ち上げるためのコードの準備が完了しました。

## 中身の確認

Sitecore OrderCloud の Headstart には３つのアプリケーションが含まれています。

### Middleware

さまざまな処理をするためのミドルウェアのコードが src¥middleware の中に含まれています。このミドルウェアを起動して OrderCloud と繋げていくという処理が今後続いていきます。

### Buyer および Seller

この２つのアプリケーションは JavaScript の Angular で記述されています。それぞれ src¥UI¥buyer および src¥UI¥seller のフォルダの中にコードが格納されており、buyer はいわゆる EC のストアフロントとなるサイト、seller は EC の管理画面のサイトになります。この２つのアプリケーションは上記のミドルウェアと Sitecore OrderCloud と連携して動作するコードとなります。

## まとめ

今回はデモ環境を構築するために必要となるコードの準備となりました。文章として紹介しているため長くなっていますが、リポジトリからコードをダウンロードして、手元で操作できるように準備をしただけという形ですので慣れればこの部分は数分で終わる手順です。

- [Part 3 Azure の環境を準備する（その１）](/blog/2022/02/04/headstartdemo-step3)
