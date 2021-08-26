---
title: Sitecore OrderCloud HeadStart - Part 3 展開
date: '2021-09-03'
tags: ['OrderCloud','Demo']
draft: false
summary: これまで２回で環境の準備、設定と進めていきました。今回から、すでにダウンロード済みのソースコードを利用して環境に展開をしていきます。
images: ['/static/images/2021/09/lang08.png']
---

これまで２回で環境の準備、設定と進めていきました。今回から、すでにダウンロード済みのソースコードを利用して環境に展開をしていきます。

## Middleware をローカルで実行する

Visual Studio で手元にあるプロジェクトを開いてください。画面のようになっていれば、準備が完了です。

![OrderCloud](/static/images/2021/09/ordercloud21.png) 

今回は設定に関してすべて Azure の App Configuration にアップロードをしたので、その値を利用して動かしたいと思います。そこで、Visual Studio のプロファイルを追加して、設定を読み込みするような手順を進めます。

1. ソリューションエクスプローラーにて、 **Headstart.API** のプロパティを開く
2. デバッグを選択する
3. プロファイルを追加する
4. 起動方法はプロジェクトを選択
5. 環境変数として *APP_CONFIG_CONNECTION* を追加します。

![OrderCloud](/static/images/2021/09/ordercloud22.gif) 

環境変数の値としては、Azure Portal から App Configuration のリソースを開き、設定 - アクセスキー を選択したあと接続文字列をコピーして取得してください。

![OrderCloud](/static/images/2021/09/ordercloud23.png) 

続いてソリューションのビルドを実行します。

![OrderCloud](/static/images/2021/09/ordercloud24.png) 

ビルドエラーが出ないことを確認して、実行をします。Visual Studio のメニューにある ▷ Test （先ほど作成したプロファイル）を指定して実行をします。

![OrderCloud](/static/images/2021/09/ordercloud25.png) 

しばらくするとコンソールが立ち上がり、プログラムが動いている状況の確認ができます。

![OrderCloud](/static/images/2021/09/ordercloud26.png) 

1 つめの URL にアクセスをすると、以下のように Headstart Middleware API の画面が表示されます。

![OrderCloud](/static/images/2021/09/ordercloud27.png) 

## OrderCloud データのシード

上記の画面が起動している状況で、Postman を利用して初期化用のデータを投入していきます。Postman がアクセスする URL はローカルのサーバーに対して /seed のパスを指定して Post を実行することになります。その際のサンプルのデータは以下のようになります。

```json
{
  "PortalUsername": "",
  "PortalPassword": "",
  "InitialAdminUsername": "",
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

それぞれには以下の項目を設定します。下記のMarketplaceID はすでに Part 1 の最後に作成していると思いますが、まだであれば最初のステップを確認しながら作成をします。

| 項目 | 入力 | 例 |
|---|---|---|
| PortalUsername | ordercloud.io のログイン名 | sitecoredemo |
| PortalPassword | ordercloud.io のパスワード | Hell0wor!d |
| InitialAdminUsername | 初期管理者のユーザー名 | admin |
| InitialAdminPassword | 初期管理者のパスワード | p@ssw0rd! |
| MiddlewareBaseUrl | Middleware の URL | https://localhost:5001/ |
| MarketplaceID | ordercloud.io で作成している ID |  |
| Environment | sandbox |  |
| WebhookHashKey | WebHook のキー | demo-headstart |
| ConnectionString | Blob ストレージの接続文字列 |  |

Postman の画面では以下の通りです（項目はいくつか表示していません）

![OrderCloud](/static/images/2021/09/ordercloud28.png) 

実行して以下のようなデータを取得できると、必要な ClientID などを取得できる形となります。

![OrderCloud](/static/images/2021/09/ordercloud29.png) 





## Buyer Storefront のビルド



https://himadritechblog.wordpress.com/2021/05/04/exploration-of-four51-ordercloud-its-architecture-and-headstart-setup/#setting-up-headstart
