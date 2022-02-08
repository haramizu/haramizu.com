---
title: Headstart デモ環境を構築する - Part 5 サンプルデータの準備
date: '2022-02-08'
tags: ['Sitecore','OrderCloud']
draft: false
summary: ミドルウェアが起動するようになったので、ミドルウェア経由で Headstart のデモ環境を立ち上げるために必要なデータを揃えていきます。まず最初にサンプルのデータが含まれているマーケットプレースを作成し、そこに初期データを入れていきます。今回は日本のデータセンターを使うための手順も少し入ってきますので、海外のデータセンターを利用する際にはその点は読み替えて進めてください。
images: ['/static/images/2022/02/seeding02.png']
---

ミドルウェアが起動するようになったので、ミドルウェア経由で Headstart のデモ環境を立ち上げるために必要なデータを揃えていきます。まず最初にサンプルのデータが含まれているマーケットプレースを作成し、そこに初期データを入れていきます。今回は日本のデータセンターを使うための手順も少し入ってきますので、海外のデータセンターを利用する際にはその点は読み替えて進めてください。

## Seeding コマンド

サンプルのデータをインポートするツールとして、ordercloud-seed というリポジトリでデータおよびツールに関して紹介をしています。

* https://github.com/ordercloud-api/ordercloud-seed

このコマンドをインストールするのは非常に簡単で、以下のコマンドでインストールが完了となります。

```
npm i @ordercloud/seeding -g
```

macOS の場合は sudo を組み合わせることでコマンドをローカルで利用できるようになります。インストールが完了できているかの確認としては、以下のコマンドを実行してヘルプが表示されるか確認をしてください。

![OrderCloud](/static/images/2022/02/seeding01.png)

また上記のリポジトリにはサンプルの yml ファイルも配置されており、コマンドでそのファイルを指定することでリポジトリのデータを利用して展開することが可能です。

今回は日本のデータセンターを指定してデータをインポートするため、以下のコマンドを実行します。-u および -p は以前に作成をした Ordercloud ポータルのアカウントを指定します。

```
seeding seed Simple-B2C -n='Headstart Japan' -u=username -p=password -r=jpn
```

実行をすると、以下のようにデータが作成されていくのがわかります。

![OrderCloud](/static/images/2022/02/seeding02.png)

## OrderCloud ポータルで確認

コマンドを実行したあと、実際に OrderCloud ポータルにマーケットプレースが作成されているか確認をします。

![OrderCloud](/static/images/2022/02/seeding03.png)

コマンドで指定をした名前の Marketplaces が作成されており、また Marketplace ID も同じものが作成されているのがわかります。対象となる Marketplace をクリックすると、OrderCloud API Instance に sandbox のための URL が表示されています。

![OrderCloud](/static/images/2022/02/seeding04.png)

## Azure App configuration の更新

今回作成された Marketplace の情報を反映させます。直接 Azure ポータルで対象となる値を編集するのもよし、プロジェクトに含まれている json ファイルに値を入れてインポートし直すのもよし、です。ここでは json のファイルを更新して、インポートし直します。

変更項目としては、以下の 4 つの項目を設定します。

```
  "OrderCloudSettings:MiddlewareClientID": "",
  "OrderCloudSettings:MiddlewareClientSecret": "",
  "OrderCloudSettings:MarketplaceID": "",
  "OrderCloudSettings:MarketplaceName": "",
```

MiddlewareClientID キーに関しては、OrderCloud の管理画面の左側に表示されている API Console をクリックして、作成をしたマーケットプレースの API Clients の項目を選択すると確認することができます。

![OrderCloud](/static/images/2022/02/seeding05.png)

MiddlewareClientSecret の項目は Middleware Integrations の項目を開くと Client Secret が用意されています。この項目を指定してください。

![OrderCloud](/static/images/2022/02/seeding06.png)

今回は以下のように変更しました。

```
  "OrderCloudSettings:MiddlewareClientID": "149A56B4-4561-4187-A764-E81E8FD098F9",
  "OrderCloudSettings:MiddlewareClientSecret": "Kqd8OoIxp0j0LB1u2s2RviXnEy0357Exq3ibm9qTJdUK8SOJFqgQtyDaXoV0",
  "OrderCloudSettings:MarketplaceID": "qopHVYFrBtpnrwxE",
  "OrderCloudSettings:MarketplaceName": "Headstart Japan",
```

この機会に、Middleware の URL も入れておきます。Step 3 Azure の環境を準備する（その１） で作成をした Web アプリのテストスロットの URL を入れておきます。

```
  "EnvironmentSettings:MiddlewareBaseUrl": "https://headstart-middleware-test.azurewebsites.net",
```

追加で、WebhookHashKey に関しても指定しておきます。今回はデモなので以下のように設定をしておきました。

```
  "OrderCloudSettings:WebhookHashKey": "demo-headstart",
```

## データセンター指定の変更

上記の変更をしているのと併せて、API サーバーの指定をしている URL が直前の項目として用意されています。

```
  "OrderCloudSettings:ApiUrl": "https://sandboxapi.ordercloud.io",
```

このサーバーは北米の OrderCloud の sandbox サーバーとなっているため、今回日本のデータセンターにしたため、変更をする必要があります。URL は Marketplace ID が表示されていた画面に含まれていいます。変更の後の値は以下のように異なります。

```
  "OrderCloudSettings:ApiUrl": "https://japaneast-sandbox.ordercloud.io",
```

### ミドルウェアのソース内の変更

ミドルウェアはコードの中にこの URL が記載されています。対象となるファイルは以下のファイルです。

* src/Middleware/src/Headstart.Common/Models/Misc/EnvironmentSeed.cs

以下のように sandbox のサーバーの URL を変更してください。

![OrderCloud](/static/images/2022/02/seeding07.png)

ファイルを変更したあとは、改めて Azure App Configuration にインポートをして、設定が反映されているかを確認してください。

![OrderCloud](/static/images/2022/02/seeding08.png)

### SDK のソース内の変更

SDK が利用しているファイルにも URL が記載されているため、Sandbox の URL を変更してください。

* e2e/helpers/test-setup.ts

のファイルに記載されている URL を https://japaneast-sandbox.ordercloud.io に書き換えます。


##  初期設定の作成

OrderCloud に Marketplace の設定ができたところで、初期に必要となるデータをインポートしていきます。この手順は Postman を利用します。

まず、ミドルウェアをローカルで立ち上げて、https://localhost:5001 にアクセスして参照できることを確認してください。

続いて、Postman を起動します。まず最初に https://localhost:5001/seed に対して Post をする処理を作成します。Postman をインストールしてすぐの場合、SSL での投稿に関して証明書のチェックをするようになっているため、その項目はローカル環境で実施するためオフにする必要があります。

投稿をするための Body のデータは以下の URL で紹介されているデータを利用します。

* https://github.com/ordercloud-api/headstart/blob/development/src/Middleware/src/Headstart.Common/Assets/SeedTemplate.json

```
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

各項目には、以下のデータを設定してください。

| 項目 | 入力 | 例 |
|---|---|---|
| PortalUsername | ordercloud.io のログイン名 | username |
| PortalPassword | ordercloud.io のパスワード | password |
| InitialAdminUsername | 初期管理者のユーザー名 | demoadmin |
| InitialAdminPassword | 初期管理者のパスワード | Sitecor3DeM0! |
| MiddlewareBaseUrl | Middleware の URL | https://localhost:5001/ |
| MarketplaceID | ordercloud.io で作成している ID |  |
| Environment | sandbox |  |
| WebhookHashKey | WebHook のキー | demo-Headstart |
| ConnectionString | Blob ストレージの接続文字列 |  |

![OrderCloud](/static/images/2022/02/seeding09.png)

実行前に、以下の項目を確認しておきます。ストレージに関しては以下のように空っぽの状態です。

![OrderCloud](/static/images/2022/02/seeding10.png)

この状態で Postman でミドルウェアに対して Seed のデータを送ります。しばらくすると、結果の画面に Success! のメッセージが表示されます。

![OrderCloud](/static/images/2022/02/seeding11.png)

ストレージを参照しにいくと、ngx-translate のフォルダが増えていることがわかります。

![OrderCloud](/static/images/2022/02/seeding12.png)

この段階で OrderCloud のサンプルのデータの準備、および次のステップを進めるための準備ができたことになります。

## まとめ

日本のデータセンターにサンプルのデータを作成し、またミドルウェアを通じて初期のデータ（管理者アカウントの作成）なども実現できました。続いてローカルの環境で buyer のアプリ、seller のアプリを順に動かしていきます。