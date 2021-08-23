---
title: Sitecore OrderCloud - HeadStart セットアップ - Part 3
date: '2021-09-03'
tags: ['OrderCloud','Demo']
draft: false
summary: 
images: ['/static/images/2021/09/lang08.png']
---

Sitecore OrderCloud のサンプルサイト、HeadStart を動かしていきましょう。

## HeadStart について

Sitecore OrderCloud のサンプルサイトを HeadStart という形で GitHub のリポジトリで展開をしています。

* https://github.com/ordercloud-api/headstart

このサンプルには 3 つのプログラムを展開しています。

1. **Middleware** - バックエンドを ASP.NET Core 書いているプログラムになります
2. **Buyer** - EC サイトのフロントになるサイトです
3. **Seller** - 管理者画面のサイトとなります

実際にこのリポジトリをそのまま利用して、サンプルサイトを立ち上げたいと思います。手元にリポジトリのクローンを持ってくるところまで、進めてください。

## リポジトリのクローンを作成


![OrderCloud](/static/images/2021/09/ordercloud01.png)


![OrderCloud](/static/images/2021/09/ordercloud02.png)


## Azure に展開する環境を作成する

今回は Azure に展開したいと思います。リソースグループを作成して、ここにリソースを追加していきます。

![OrderCloud](/static/images/2021/09/ordercloud03.png)

### Azure App Service for Middleware

まず最初にミドルウェアを追加します。App Service を追加、

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

## アプリの設定

アプリの設定ファイルのテンプレートが src / Middleware / src / Headstart.Common に AppSettingConfigTemplate.json が展開されています。

![OrderCloud](/static/images/2021/09/ordercloud20.png) 



## Middleware をローカルで実行する

プロパティ

![OrderCloud](/static/images/2021/09/ordercloud21.png) 


![OrderCloud](/static/images/2021/09/ordercloud22.png) 


![OrderCloud](/static/images/2021/09/ordercloud23.png) 

![OrderCloud](/static/images/2021/09/ordercloud24.png) 

![OrderCloud](/static/images/2021/09/ordercloud25.png) 

![OrderCloud](/static/images/2021/09/ordercloud26.png) 

![OrderCloud](/static/images/2021/09/ordercloud27.png) 

## Postman

/seed

```json
{
  "PortalUsername": "",
  "PortalPassword": "",
  "InitialAdminUsername ": "",
  "InitialAdminPassword": "",
  "MiddlewareBaseUrl": "",
  "MarketplaceID": "",
  "OrderCloudSettings": {
    "Environment": "sandbox",
    "WebhookHashKey": ""
  },
  "StorageAccountSettings": {
    "ConnectionString": ""
  }
}
```

https://himadritechblog.wordpress.com/2021/05/04/exploration-of-four51-ordercloud-its-architecture-and-headstart-setup/#setting-up-headstart
