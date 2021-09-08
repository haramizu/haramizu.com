---
title: Sitecore OrderCloud HeadStart - Part 4 環境の確認
date: '2021-09-13'
tags: ['OrderCloud','Demo','HeadStart']
draft: true
summary: ローカルで OrderCloud のデモ環境、HeadStart を起動しましたが、エラーが出ていて少し作業をする必要があります。そこで、今回はどこにどの設定ファイルがあるのか、というのを確認していきます。
images: ['/static/images/2021/09/ordercloud40.png']
---

ローカルで OrderCloud のデモ環境、HeadStart を起動しましたが、エラーが出ていて少し作業をする必要があります。そこで、今回はどこにどの設定ファイルがあるのか、というのを確認していきます。

## Buyer Storefront の設定

今回、デモサイトを起動したときに以下のようにエラーが表示されているのがわかります。

![OrderCloud](/static/images/2021/09/ordercloud37.png)

画面に表示されている文字を見ると、パラメーターになっているのがわかります。それではこの部分を改善するためにどうすればいいでしょうか？前回、ローカルで動かすための設定ファイル、Buyer\src\environments\environment.local.ts を参照しにいくと、以下のコードがあります。

```javascript
// ===== MAKE CHANGES TO CONFIGURATION BETWEEN THESE LINES ONLY =======
// ====================================================================
const brand = Brand.DEFAULT_BUYER
const appEnvironment = Environment.TEST
const useLocalMiddleware = true
const useLocalBuyerApiClient = true // set to true for running integration events locally
const localMiddlewareURL = 'https://localhost:5001'
const localBuyerApiClient = '800EFEC0-43A5-4EB6-9150-C3BBE628214C'
// ====================================================================
// ======= UNLESS YOU ARE DOING SOMETHING WEIRD =======================

import defaultbuyertest from '../assets/appConfigs/defaultbuyer-test.json'
import defaultbuyeruat from '../assets/appConfigs/defaultbuyer-uat.json'
import defaultbuyerproduction from '../assets/appConfigs/defaultbuyer-production.json'

const apps = {
  TEST: {
    DEFAULT_BUYER: defaultbuyertest,
  },
  UAT: {
    DEFAULT_BUYER: defaultbuyeruat,
  },
  PRODUCTION: {
    DEFAULT_BUYER: defaultbuyerproduction,
  },
}
```

今回、環境としては TEST として動かしており、その際の参照データは **defaultbuyertest** です。これはすでに json ファイルがインポートされています。この json ファイルを参照すると以下のようになります。

```json
{
  "hostedApp": true,
  "appname": "HeadstartDemo",
  "appID": "my-seller-id",
  "clientID": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "incrementorPrefix": "HS_TEST",
  "baseUrl": "https://my-default-buyer-test.com",
  "middlewareUrl": "https://my-hosted-middleware.com",
  "creditCardIframeUrl": "https://fts-uat.cardconnect.com/itoke/ajax-tokenizer.html",
  "translateBlobUrl": "https://MYSTORAGEACCOUNTNAME.blob.core.windows.net/ngx-translate/i18n/",
  "sellerID": "HEADSTARTDEMO_TEST",
  "sellerName": "Headstart Demo Seller",
  "orderCloudApiUrl": "https://sandboxapi.ordercloud.io",
  "theme": {
    "logoSrc": "assets/generic-logo.png"
  },
  "instrumentationKey": null
}
```

さまざまな値が設定されていますが、translateBlobUrl に翻訳リソースに関する１行が設定されています。Azure のストレージを見にいくと、 middleware をビルドした際にファイルが追加されていることがわかります。

![OrderCloud](/static/images/2021/09/ordercloud38.png)

ここのパラメーターを Azure から取得して変更、保存をします。また、clientID に関しては、Postman で初期化した時に返ってきた clientID ( buyer 向け）の値を設定します。

変更完了後、**npm run start** で実行してみます。

![OrderCloud](/static/images/2021/09/ordercloud39.png)

言語リソースが読み込まれて、エラーもなくページが開くようになりました。

## Seller Admin の設定

この設定は、Seller に対しても変更をしていきます。対象となるファイルは先ほどと同じように Seller\src\assets\appConfigs\defaultadmin-test.json になります。

```json
{
  "hostedApp": true,
  "sellerID": "my-seller-id",
  "sellerName": "Default Admin",
  "appname": "Default Admin",
  "clientID": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "middlewareUrl": "https://my-hosted-middleware.com",
  "translateBlobUrl": "https://MYSTORAGEACCOUNTNAME.blob.core.windows.net/ngx-translate/i18n/",
  "blobStorageUrl": "https://MYSTORAGEACCOUNTNAME.blob.core.windows.net",
  "orderCloudApiUrl": "https://sandboxapi.ordercloud.io"
}
```

今回はストレージを指定している項目は２つあるため、先ほどと同じように Azure ポータルからパラメータを取ってきて、設定を変更します。また、buyer の時と同じく clientID に関しても、Postman で返ってきた値を設定してください。

**npm run start** を実行すると以下のように管理画面のエラーも治ります。

![OrderCloud](/static/images/2021/09/ordercloud40.png)

これで前回画面に表示されていたエラーが消えました。また、初期設定をした Admin アカウントとパスワードを利用してログインをします。

![OrderCloud](/static/images/2021/09/ordercloud41.png)

初期管理者アカウントでログインが出来ました。

## Azure App Configuration の設定変更

上記のように Postman で取得したデータのアプリでの利用方法を紹介しましたが、以下の２つが残っています。

```json
"Middleware": {
    "ClientID": "Client Key from Postman",
    "ClientSecret": "Client Secret from Postman"
},
```

この２つのキーは、Azure にアップロードをしている設定の２つの項目に設定をする形となります。

![OrderCloud](/static/images/2021/09/ordercloud42.png)

## まとめ

今回は、起動したストアに関してエラーが発生している部分を修正しました。次回は、Azure の環境に展開をしていきます。

## 参考資料

* [GitHub ordercloud-api / headstart](https://github.com/ordercloud-api/headstart)
