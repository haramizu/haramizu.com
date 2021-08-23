---
title: Sitecore OrderCloud - HeadStart セットアップ - Part 2
date: '2021-09-02'
tags: ['OrderCloud','Demo']
draft: false
summary: 
images: ['/static/images/2021/09/lang08.png']
---

Sitecore OrderCloud のサンプルサイト、HeadStart を動かしていきましょう。

## アプリの設定

アプリの設定ファイルのテンプレートが src / Middleware / src / Headstart.Common に AppSettingConfigTemplate.json が展開されています。

![OrderCloud](/static/images/2021/09/ordercloud20.png) 

設定方法は、[GitHub にて紹介](https://github.com/ordercloud-api/headstart/blob/development/src/Middleware/src/Headstart.Common/AppSettingsReadme.md) されていますので、それに従って作業をすすめていきます。今回は、以下のパラメーターを設定しました。

### ApplicationInsightsSettings:InstrumentationKey 

作成をした Application Insight を開き、接続文字列を設定します。

![OrderCloud](/static/images/2021/09/ocappconfig01.png) 

### StorageAccountSettings:ConnectionString

作成をしたストレージアカウントのメニュー、アクセスキーから接続文字列を取得します。

![OrderCloud](/static/images/2021/09/ocappconfig02.png) 

### StorageAccountSettings:BlobPrimaryEndpoint

作成をしたストレージアカウントのメニュー、エンドポイントからプライマリエンドポイントを指定します。

![OrderCloud](/static/images/2021/09/ocappconfig03.png) 

### CosmosSettings:DatabaseName

CosmosDB のリソース名を指定します。

### CosmosSettings:EndpointUri

エンドポイントとして、https://{COSMOS_DB_ACCOUNT_NAME}.documents.azure.com:443/ となる URL を指定します。

![OrderCloud](/static/images/2021/09/ocappconfig04.png) 

### CosmosSettings:PrimaryKey

キーのプライマリーキーを取得します。

![OrderCloud](/static/images/2021/09/ocappconfig05.png) 


## まとめ

今回は Azure の設定まで進めていきました。

## 参考サイト

* [GitHub ordercloud-api / headstart](https://github.com/ordercloud-api/headstart)
* [Exploration of Four51 OrderCloud, its architecture, and Headstart setup](https://himadritechblog.wordpress.com/2021/05/04/exploration-of-four51-ordercloud-its-architecture-and-headstart-setup/)
