---
title: Next.js Commerce と OrderCloud の連携 - Middleware と Seller の追加（前編）
date: '2021-10-20'
tags: ['OrderCloud','Next.js','Headless']
draft: false
summary: Next.js Commerce と Sitecore OrderCloud の連携で簡単にサイトが立ち上がることがわかりました。あとは管理画面、ミドルウェア部分がポイントになりますが、これに関しては HeadStart のサンプルを追加していきたいと思います。
images: ['/static/images/2021/10/nextjscommerce31.png']
---

Next.js Commerce と Sitecore OrderCloud の連携で簡単にサイトが立ち上がることがわかりました。あとは管理画面、ミドルウェア部分がポイントになりますが、これに関しては HeadStart のサンプルを追加していきます。

手順としては、以前に作成をした [セットアップシリーズ](https://haramizu.com/blog/OrderCloud) から必要なものを抜粋、追加していきたいと思います。

## 必要となるデモサイト

Sitecore HeadStart のデモは以下の３つの機能が実装されています。

* **Middleware** - バックエンドとなるサービスレイヤー
* **Buyer** - EC サイト のフロントになるサイトです
* **Seller** - 管理者画面を提供します。

Next.js Commerce + Sitecore OrderCloud との組み合わせで構築されるサンプルサイトは、**Buyer** のサイトとなります。つまり、これから必要となるのは Middleware および Seller の部分となります。

## リポジトリのクローンを作成

HeadStart のリポジトリは以下の URL を利用して、手元にクローンを作成します。

* https://github.com/ordercloud-api/headstart

## Azure のリソースを準備する

Azure のリソースに関して、以前に紹介をしていますが、以下のページの中から、Azure App Service for Buyer Storefront 以外をセットアップしてください。

* [準備](/blog/2021/09/06/OrderCloud-setup-part-1)

## 設定ファイルの作成

クローンを作成したリポジトリの src / Middleware / src / Headstart.Common に AppSettingConfigTemplate.json のファイルに Azure の各種リソースに対するキーを入力していきます。

* [設定](/blog/2021/09/08/OrderCloud-setup-part-2)

ファイルのエンコーディングを UTF-8 にするのを忘れないようにしてください。そしてインポートをするとこの手順は完了です。

## ローカルでの展開

HeadStart に関して、以下のページを参照しながら進めていきます。

* [ローカルでの展開](/blog/2021/09/10/OrderCloud-setup-part-3)

手順としては、以下の項目を実行していく形となります。

* Middleware をローカルで実行する

続いてシードになるのですが、API キーやシークレットコードなどはすでに展開済みの環境で作成されています。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce18.png)

作成されているものを上記の文書で作成されているものと比較すると以下のようになります。

| 役割 | Next.js Ecommerce | HeadStart Sample |
|---|---|---|
| Middleware | Vercel-Middleware-Connector | Middleware Integrations |
| Buyer | Vercel-Storefront-Connector | Default Buyer Storefront |
| Seller | Back Office App | Default HeadStart Admin UI |

このため、シードとして不足しているのは管理者のアカウント、UI のリソースということになります。

```json
{
  "PortalUsername": "username",
  "PortalPassword": "Passwo0d!",
  "InitialAdminUsername": "demoadmin",
  "InitialAdminPassword": "demoPassw0rd!",
  "MiddlewareBaseUrl": "http://localhost:5001/",
  "marketplaceID": "string",
  "OrderCloudSettings": {
    "Environment": "sandbox",
    "WebhookHashKey": "demo-headstart"
  },
  "StorageAccountSettings": {
    "ConnectionString": "azurestorage endpoint"
  }
}
```

![Nextjs Commerce](/static/images/2021/10/nextjscommerce23.png)

上記を実行すると、以下のように結果が返ってきます。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce24.png)

実際にアカウントが作成できているかを確認します。OrderCloud の管理画面から Seller - Admin Users のメニューを選択して、Get /adminusers を実行すると、アカウントが追加されていることがわかります。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce25.png)

また Azure のストレージに日本語リソースが展開されていることがわかります。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce26.png)

もう一度管理画面に戻ると、いくつか API クライアントが準備されているのがわかります。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce27.png)

すでに用意されているデータを利用するため、この段階で追加したものは削除してしまいます。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce28.png)

Web ページでの手順とは少し異なりますが、この seed を実行した後、次のステップに進みます。

## 環境の確認

まず、リポジトリの src/UI/SDK に移動をして、SDK をビルドする必要があります。

```
cd SDK
npm install
```

上記の手順が完了した段階で、build を実行します。

```
npm run build
```

これで SDK のビルドが完了しました。続いて Seller のサイトを動かしたいと思います。プロジェクトのソースに移動をして、まずは npm install を実行します。

```
cd src/UI/seller
npm install
```

Seller\src\environments\environment.local.ts のファイルを開きます。このファイルの次の項目

* useLocalMiddleware

を true に変更します。続いてリソースの設定をするために、 Seller\src\assets\appConfigs\defaultadmin-test.json のファイルを開き、Azure のストレージの URL を変更してください。また、OrderCloud の管理画面から、Back Office App の **clientID** を取得して、設定をします。また、**middlewareUrl** には Middleware のテストスロットの URL を入力してください。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce29.png)

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

設定の変更が終わったところで、npm run start を実行すると、しばらくするとログイン画面が表示されます。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce30.png)

ログインをすると、管理画面が表示されれば、管理画面の構築手順は完了となります。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce31.png)

## まとめ

インストールの手順が長くなってきたので、続きは後編にまとめていきます。

## 参考情報

* [HeadStart セットアップ](/blog/OrderCloud)