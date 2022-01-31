---
title: Headstart デモ環境を構築する - Part 7 Buyer および seller サイトの起動
date: '2022-02-09'
tags: ['Sitecore','OrderCloud']
draft: true
summary: ミドルウェアが起動して初期データの設定ができました。続いて、EC サイトのストアフロントとなる buyer およびEC サイトの管理画面となる seller のサイトをローカルで起動していきます。
images: ['/static/images/2022/02/jssapp04.png']
---

ミドルウェアが起動して初期データの設定ができました。続いて、EC サイトのストアフロントとなる buyer およびEC サイトの管理画面となる seller のサイトをローカルで起動していきます。

ここから先は、Visual Studio Code で手順を進めていきます。

## SDK のビルド

Buyer および Seller の両方で利用する SDK をまず最初にビルドを実行します。手順としては、src/ui/sdk のフォルダに入り、npm install および npm run build を実行する形です。

```
cd src/ui/sdk
npm install
npm run build
```

![OrderCloud](/static/images/2022/02/jssapp01.png)

## Buyer を動かす

buyer のパスは src/UI/Buyer になります。ここに移動をして、以下のコマンドを実行してください（１行目は前の処理の後そのままのため、一度上位のフォルダに移動をして、buyer に移動しています）。

```
cd ..
cd buyer
npm install
```

続いて buyer を起動するための設定を記入します。まず最初にローカルのミドルウェアを利用すると指定するために、src/UI/Buyer/src/environments/environment.local.ts のファイルを編集します。このファイルの上の方に以下の設定が記載されています。

```
// ===== MAKE CHANGES TO CONFIGURATION BETWEEN THESE LINES ONLY =======
// ====================================================================
const brand = Brand.DEFAULT_BUYER
const appEnvironment = Environment.TEST
const useLocalMiddleware = false
const useLocalBuyerApiClient = false // set to true for running integration events locally
const localMiddlewareURL = 'https://localhost:5001'
const localBuyerApiClient = '800EFEC0-43A5-4EB6-9150-C3BBE628214C'
// ====================================================================
// ======= UNLESS YOU ARE DOING SOMETHING WEIRD =======================
```

useLocalMiddleware と useLocalBuyerApiClient を true に変更して、localBuyerApiClient を Postman で取得した Buyer の ClientID を設定してください。

続いてその他の設定が記載されているファイル、 src/UI/Buyer/src/assets/appConfigs/defaultbuyer-test.json を変更します。サンプルで入っているデータは以下の通りです。

```json
{
  "hostedApp": true,
  "appname": "HeadstartDemo",
  "appID": "headstartdemo-test",
  "clientID": "4E288BF1-5B2B-4558-83AD-0C5EAD429935",
  "incrementorPrefix": "HS_TEST",
  "baseUrl": "https://headstartdemo-buyer-ui-test.azurewebsites.net/",
  "middlewareUrl": "https://headstartdemo-middleware-test.azurewebsites.net",
  "cmsUrl": "https://ordercloud-cms-test.azurewebsites.net",
  "creditCardIframeUrl": "https://fts-uat.cardconnect.com/itoke/ajax-tokenizer.html",
  "translateBlobUrl": "https://headstartjpdemo.blob.core.windows.net/ngx-translate/i18n/",
  "sellerID": "HEADSTARTDEMO_TEST",
  "sellerName": "Headstart Demo Seller",
  "sellerQuoteContactEmail": "quotes@seller.com",
  "orderCloudApiUrl": "https://sandboxapi.ordercloud.io",
  "useSitcoreSend": false,
  "sitcoreSendWebsiteID": "xxxxxxxxxxxxxxxxxxxxxxxx",
  "useSitecoreCDP": false,
  "sitecoreCDPTargetEndpoint": "https://api-us.boxever.com/v1.2",
  "sitecoreCDPApiClient": "xxxxxxxxxxxxxxxxxxx",
  "theme": {
      "logoSrc": "assets/generic-logo.png"
  },
  "instrumentationKey": null,
  "anonymousShoppingEnabled": true,
  "acceptedPaymentMethods": ["CreditCard", "PurchaseOrder"]
}
```

変更する項目は以下の通りです

| 項目 | 説明 | 例 |
|---|---|---|
| clientID | Buyer の ClientID | 4E99898A-72E3-4584-AAFD-130C4B2F205D |
| middlewareUrl | Web アプリのテストスロットの URL | https://headstart-middleware-test.azurewebsites.net |
| translateBlobUrl | Blob URL | https://headstartjpdemo.blob.core.windows.net/ngx-translate/i18n/ |
| sellerID | Seller ID を設定 | 0E2CB93C-CE06-450D-9921-3C8FC00444F0 |
| sellerName | Seller のアプリ名 | Default HeadStart Admin UI |
| orderCloudApiUrl | Sandbox の URL | https://japaneast-sandbox.ordercloud.io |

上記の設定が完了したところで、buyer のアプリを実行します。

```
npm run start
```

![OrderCloud](/static/images/2022/02/jssapp02.png)

## Seller を動かす

まずは Seller のアプリを動かすことができるように、npm install まで進めていきます。

```
cd ..
cd seller
npm install
```

Seller のアプリも Buyer と同様のローカルで動かすための設定、アプリの設定の２つのファイルがあります。まずはローカルで動かすためのファイルを編集します。src/UI/Seller/src/environments/environment.local.ts のファイルであり、設定は１ヶ所 useLocalMiddleware を true であれば動作します。

```
// ===== MAKE CHANGES TO CONFIGURATION BETWEEN THESE LINES ONLY =======
// ====================================================================
const brand = Brand.DEFAULT_ADMIN
const sebEnvironment = Environment.TEST
const useLocalMiddleware = true
const localMiddlewareURL = 'https://localhost:5001'
// ====================================================================
// ======= UNLESS YOU ARE DOING SOMETHING WEIRD =======================
```

続いてアプリの設定を変更するために、src/UI/Seller/src/assets/appConfigs/defaultadmin-test.json のファイルを変更します。

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

| 項目 | 説明 | 値 |
|---|---|---|
| clientID | Seller の ClientID | 0E2CB93C-CE06-450D-9921-3C8FC00444F0 |
| middlewareUrl | Web アプリのテストスロットの URL | https://headstart-middleware-test.azurewebsites.net |
| translateBlobUrl | Blob URL | https://headstartjpdemo.blob.core.windows.net/ngx-translate/i18n/ |
| blobStorageUrl | Blob URL | https://headstartjpdemo.blob.core.windows.net |
| orderCloudApiUrl | Sandbox の URL | https://japaneast-sandbox.ordercloud.io |

上記の設定が終わったところで、コマンドの npm run start を実行します。

![OrderCloud](/static/images/2022/02/jssapp03.png)

postman で作成をしたアカウントでログインをすると、管理画面にはいることができます。

![OrderCloud](/static/images/2022/02/jssapp04.png)

## まとめ

ミドルウェアに続いて buyer 、seller のアプリをローカルで動かすことができました。動作確認が終わったところで、次回からは Microsoft Azure に展開していきます。
