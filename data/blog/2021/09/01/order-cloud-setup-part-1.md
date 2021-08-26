---
title: Sitecore OrderCloud HeadStart - Part 1 準備
date: '2021-09-01'
tags: ['OrderCloud','Demo']
draft: false
summary: Sitecore が提供する新しいソリューションの一つ、Sitecore OrderCloud のデモ環境を作る手順を紹介したいと思います。この OrderCloud は、ヘッドレスコマースのソリューションとなっており、これのデモとして提供している HeadStart があります。これから何回かに分けて、実際のデモを動かす手順を紹介していきます。
images: ['/static/images/2021/09/ordercloud16.png']
---

Sitecore が提供する新しいソリューションの一つ、Sitecore OrderCloud のデモ環境を作る手順を紹介したいと思います。この OrderCloud は、ヘッドレスコマースのソリューションとなっており、これのデモとして提供している HeadStart があります。これから何回かに分けて、実際のデモを動かす手順を紹介していきます。

## HeadStart について

Sitecore OrderCloud のサンプルサイトとして HeadStart というデモを GitHub のリポジトリで展開をしています。

* https://github.com/ordercloud-api/headstart

このサンプルには 3 つのプログラムが含まれています。

1. **Middleware** - バックエンドを ASP.NET Core 書いているプログラムになります
2. **Buyer** - EC サイトのフロントになるサイトです
3. **Seller** - 管理者画面のサイトとなります

実際にこのリポジトリをそのまま利用して、サンプルサイトを立ち上げたいと思います。

## 環境の確認

今回の作業を最後まで進めていくにあたって、以下のツールを利用しています。都度必要になってからインストールをしても良いのですが、事前に入れておくとスムーズに進めていくことができます。

* Visual Studio 2019  
* Visual Studio Code
* Node.js 14 LTS

## リポジトリのクローンを作成

今回の環境は Visual Studio 2019 Professional を利用して、リポジトリのクローンの手続きから始めていきます。まずはメニューから、リポジトリのクローンを選択して、上記のリポジトリを c:¥projects の下に配置します。

![OrderCloud](/static/images/2021/09/ordercloud01.png)

クローンが終わった状況は以下の通りです。

![OrderCloud](/static/images/2021/09/ordercloud02.png)

これを使うのはまだ先ですが、リポジトリのコードを使うことができるようになりました。

## Azure に展開する環境を作成する

今回はデモ環境を Azure に展開していきます。リソースグループを作成して、ここにリソースを追加していきます。リソースグループの名前は手元で管理するために適当なものを作成してください。

![OrderCloud](/static/images/2021/09/ordercloud03.png)

では実際に Azure のリソースを追加していきます。

### Azure App Service for Middleware

まず最初にミドルウェアを追加します。以下のリソースを追加していきます。

* Web アプリ
* インスタンスの名前（今回は haramizu-headstart-middlewareを指定)
* ランタイムスタックとして .NET Core 3.1 (LTS)
* インスタンスは Windows を選択
* データセンターを選択（今回は 東日本）
* 必要に応じてプランを変更します（今回は S1 を選択）

上記の手順を実施しているのは、以下の画面で確認することができます。

![OrderCloud](/static/images/2021/09/ordercloud04.gif)

Web アプリの展開が完了したところで、デプロイスロットとして test を追加します。作成をしたアプリを選択して、左側のメニューから**デプロイスロット** を選択して、test のスロットを作成します。

![OrderCloud](/static/images/2021/09/ordercloud05.gif)
 
作成が完了すると、運用のスロットとは別に test スロットが表示されれば、展開スロットの作成が完了した形となります。

### Azure App Service for Buyer Storefront

続いて、一般ユーザーが商品の購入をするサイトとして、Buyer 向けのインスタンスを追加していきます。手順は middleware と同じ形です。違いは、

* インスタンスの名前（今回は haramizu-headstart-buyer を指定）

となります。スクリーンショットは以下の通りです。

![OrderCloud](/static/images/2021/09/ordercloud06.png)

もちろんこちらに関してもデプロイスロットを同じように用意して、作業は完了です。

![OrderCloud](/static/images/2021/09/ordercloud07.png)

### Azure App Service for Seller Admin

続いて、サイトの管理者向けのツールとなる Seller 向けのインスタンスを追加していきます。これまでと同じ手順で、buyer の時と異なるのはインスタンスの名前となります。

![OrderCloud](/static/images/2021/09/ordercloud08.png)

先ほどまでと同じように、デプロイスロットを作成して完成となります。

![OrderCloud](/static/images/2021/09/ordercloud09.png)

これで３つのインスタンスを展開するための Web アプリの準備ができました。

### CosmosDB

続いてデータベースの作成として CosmosDB を作成します。作成をする際のポイントは以下の通りです。

* データベースのタイプとして コア（SQL）を選択
* アカウント名を入力
* データセンターを選択

作成している画面のサンプルは以下の通りです。

![OrderCloud](/static/images/2021/09/ordercloud10.png)

### Application Insights の追加

続いて Application Insights も作成をしていきます。

* インスタンスの名前
* データセンターの選択

作成しているサンプルの画面は以下の通りです。

![OrderCloud](/static/images/2021/09/ordercloud11.png) 

### Blob ストレージの追加

ストレージとして Blob ストレージを作成します。

* ストレージアカウント名
* データセンターの選択

の２つの項目を選択してください。

![OrderCloud](/static/images/2021/09/ordercloud13.png) 

### App Configuration の追加

続いてアプリケーションの設定値を設定するための項目として、アプリ構成（ App Configuration )を作成します。

* リソース名
* データセンターの選択
* 価格レベル

価格レベルは Standard で問題ないでしょう。

![OrderCloud](/static/images/2021/09/ordercloud12.png) 

### ここまでの設定を振り返る

これまで作成をしたリソースは以下のようになります。

* Web アプリ を３つ（運用およびテストのスロット）
* CosmosDB - コア SQL 
* Application Insights
* ストレージ
* アプリ構成 ( App Configuration )

を追加していきました。結果、リソースグループに作成したリソース一覧が表示されるようになっています。

![OrderCloud](/static/images/2021/09/ordercloud15.png) 

## OrderCloud の確認

続いて、デモを実施するにあたっての OrderCloud にアクセスをします。アカウントを持っていない方は、Sandbox であれば無償で作成することができます。

* https://ordercloud.io

作成の手順は以前に紹介していますので、以下のブログの後半をご覧ください。

* [OrderCloud のご紹介](/blog/2021/06/16/order-cloud-create-account)

まず、ポータルからログインをします。

![OrderCloud](/static/images/2021/09/ordercloud16.png) 

ログインをすると、左側のメニューとして

* Dashboard
* Marketplaces
* Teams
* API Console
* Settings

の項目が表示されます。今回は、上から２つ目の **Marketplaces** を選択します。

![OrderCloud](/static/images/2021/09/ordercloud17.png) 

右上に表示されている **New Marketplace** を選択して、新しいマーケットプレースを作成します。作成をする際に、Sandbox に関してはこの記事を書いている現在は Azure US-West を選択する形となります。環境はもちろん Sandbox のみとなり、実際に入力をするのは Marketplace Name の項目となります。

![OrderCloud](/static/images/2021/09/ordercloud18.png) 

作成をしたあと、左側のメニューから **API Console** のモードに切り替えて、**Send** ボタンをクリックしてデータを取得できることを確認します。

![OrderCloud](/static/images/2021/09/ordercloud19.gif) 

これで OrderCloud 側の準備も完了しました。

## まとめ

今回は HeadStart を動かす上で必要となる Azure の環境、OrderCloud の環境の準備を進めていきました。次回は、展開をするための設定を紹介していきます。

## 参考サイト

* [GitHub ordercloud-api / headstart](https://github.com/ordercloud-api/headstart)
* [Exploration of Four51 OrderCloud, its architecture, and Headstart setup](https://himadritechblog.wordpress.com/2021/05/04/exploration-of-four51-ordercloud-its-architecture-and-headstart-setup/)
