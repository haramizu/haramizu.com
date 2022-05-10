---
title: Sitecore OrderCloud Headstart - Part 2 設定
date: '2021-09-08'
tags: ['OrderCloud', 'デモ', 'Headstart']
draft: false
summary: 前回は Sitecore OrderCloud のサンプルサイトを展開するための準備まで進めていきました。今回は、展開をする手前となる Headstart のデモを動かすための設定について、紹介をしていきます。
images: ['/static/images/2021/09/ocappconfig02.png']
---

前回は Sitecore OrderCloud のサンプルサイトを展開するための準備まで進めていきました。今回は、展開をする手前となる Headstart のデモを動かすための設定について、紹介をしていきます。

ここで紹介をしている手順は、少し古いもので新しい手順は以下のページで紹介をしています。

- [Part 3 Azure の環境を準備する（その１）](/blog/2022/02/03/headstartdemo-step3)

一覧では以下のページが見やすくなっています。

- [Sitecore OrderCloud シリーズ](/blog/OrderCloud)

## アプリの設定

アプリの設定ファイルのテンプレートが src / Middleware / src / Headstart.Common に AppSettingConfigTemplate.json が展開されています。

![OrderCloud](/static/images/2021/09/ordercloud20.png)

設定をする項目に関しては、[GitHub](https://github.com/ordercloud-api/Headstart/blob/development/src/Middleware/src/Headstart.Common/AppSettingsReadme.md) にて紹介されていますので、それに従って設定作業をすすめていきます。オリジナルのファイルをコピーして、以下の設定項目を入れていきます。

このファイルをコピーして import.json ファイルを作成して作業を進めていきます。ファイルをコピーした後、このファイルは UTF-8 with BOM の形式でエンコーディングされています。例えば、Visual Studio Code でファイルを開くと、右下のようにエンコーディングが設定されています。

![OrderCloud](/static/images/2021/09/ocappconfig00.png)

ファイル形式を UTF-8 に変更をしてから作業を進めていきます。今回は、サードパーティのサービスに関しては、今回は全てスキップしていきます。

### ApplicationInsightsSettings

前回の準備で作成をした Application Insight を開き、概要の基本パラメーターとして表示されている **インストルメンテーション キー** の値をそのままコピーをします。

![OrderCloud](/static/images/2021/09/ocappconfig01.png)

### StorageAccountSettings

ストレージアカウントに関しては、以下の 2 つの値が必要となります。

- ConnectionString
- BlobPrimaryEndpoint

まず最初に、前回作成をしたストレージアカウントのメニュー、アクセスキーから接続文字列を取得して設定をします。

![OrderCloud](/static/images/2021/09/ocappconfig02.png)

続いて、左側のメニューの**エンドポイント**から**プライマリエンドポイント**の値を取得して設定をします。

![OrderCloud](/static/images/2021/09/ocappconfig03.png)

### CosmosSettings

CosmosDB に関しての設定を取得していきます。必要となる項目は、以下の３つとなります。

- DatabaseName
- EndpointUri
- PrimaryKey

DatabaseName には CosmosDB のリソース名を指定します。

続いてエンドポイントとして、https://COSMOS_DB_ACCOUNT_NAME.documents.azure.com:443/ となる URL を指定します。管理画面では、 URI という形で表示されているので、その値をコピーして設定をします。

![OrderCloud](/static/images/2021/09/ocappconfig04.png)

CosmosDB の設定メニューにある**キー**を開いて、プライマリーキーを取得して設定します。

![OrderCloud](/static/images/2021/09/ocappconfig05.png)

## 設定をアップロードする

作成をした Json ファイルを設定にインポートをしていきます。アプリ設定のリソースを選択、左側のメニューにある操作 - インポート/
エクスポート を選択すると、インポートの画面が表示されます。ここで構成ファイルを指定、json ファイルをアップロードすると、設定がインポートされます。

![OrderCloud](/static/images/2021/09/ocappconfig06.gif)

構成エクスプローラーを参照すると、全ての項目がインポートされていることがわかります。

![OrderCloud](/static/images/2021/09/ocappconfig07.png)

これで設定が完了となります。

## まとめ

今回は、前回作成をしたリソースに関する情報をもとに設定ファイルを作成、アップロードするところまで紹介をしていきました。次回からはアプリケーションを展開していくための手順を紹介していきます。

## 参考情報

- [GitHub ordercloud-api / Headstart](https://github.com/ordercloud-api/Headstart)
- [Exploration of Four51 OrderCloud, its architecture, and Headstart setup](https://himadritechblog.wordpress.com/2021/05/04/exploration-of-four51-ordercloud-its-architecture-and-Headstart-setup/)
