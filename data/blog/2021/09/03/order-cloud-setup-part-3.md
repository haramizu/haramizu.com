---
title: Sitecore OrderCloud HeadStart - Part 3 展開
date: '2021-09-03'
tags: ['OrderCloud','Demo']
draft: false
summary: 環境の準備、設定が完了すれば、続いて展開をしていく流れとなります。Sitecore OrderCloud のサンプルサイト、HeadStart を動かしていきましょう。
images: ['/static/images/2021/09/lang08.png']
---

環境の準備、設定が完了すれば、続いて展開をしていく流れとなります。Sitecore OrderCloud のサンプルサイト、HeadStart を動かしていきましょう。

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
