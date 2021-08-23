---
title: Sitecore OrderCloud - HeadStart Part 1 準備
date: '2021-09-01'
tags: ['OrderCloud','Demo']
draft: true
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

まず最初にミドルウェアを追加します。App Service を追加、 haramizu-headstart-middleware 

![OrderCloud](/static/images/2021/09/ordercloud04.gif)

デプロイスロットとしてテストを作成します。

![OrderCloud](/static/images/2021/09/ordercloud05.gif)
 
### Azure App Service for Buyer Storefront

Buyer 向けのインスタンスを作る

![OrderCloud](/static/images/2021/09/ordercloud06.png)

デプロイスロットを同じように作る。

![OrderCloud](/static/images/2021/09/ordercloud07.png)

### Azure App Service for Seller Admin

Seller 向けのインスタンスを作る

![OrderCloud](/static/images/2021/09/ordercloud08.png)

デプロイスロットを同じように作る。

![OrderCloud](/static/images/2021/09/ordercloud09.png)

### CosmosDB

![OrderCloud](/static/images/2021/09/ordercloud10.png)

### Application Insights の追加

![OrderCloud](/static/images/2021/09/ordercloud11.png) 

### App Configuration の追加

![OrderCloud](/static/images/2021/09/ordercloud12.png) 

### Blog storage の追加

![OrderCloud](/static/images/2021/09/ordercloud13.png) 

ストレージにコンテナーを追加する

![OrderCloud](/static/images/2021/09/ordercloud14.png) 

ここまでの説明

![OrderCloud](/static/images/2021/09/ordercloud15.png) 


## OrderCloud の確認

![OrderCloud](/static/images/2021/09/ordercloud16.png) 

Marketplaces を選択します。

![OrderCloud](/static/images/2021/09/ordercloud17.png) 

New Marketplace を選択して新しいマーケットプレースを作成します。

![OrderCloud](/static/images/2021/09/ordercloud18.png) 

作成をしたあと、API Console のモードに切り替えて Send ボタンをクリックしてデータを取得できることを確認します。

![OrderCloud](/static/images/2021/09/ordercloud19.gif) 

## まとめ

今回は Azure の設定まで進めていきました。

## 参考サイト

* [GitHub ordercloud-api / headstart](https://github.com/ordercloud-api/headstart)
* [Exploration of Four51 OrderCloud, its architecture, and Headstart setup](https://himadritechblog.wordpress.com/2021/05/04/exploration-of-four51-ordercloud-its-architecture-and-headstart-setup/)
