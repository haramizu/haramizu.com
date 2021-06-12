---
title: Sitecore Connect for Content Hub インストール編
date: '2021-06-17'
lastmod: '2021-06-17'
tags: ['Sitecore','Demo','Content Hub']
draft: false
summary: 前回は Storefront のホームページの表示まで紹介をしました。日本語のサイトで表示されていない部分を参照していきながら、不足しているリソースを追加して動かしていきます。
images: ['/static/images/2021/06/storefront07.png']
---

今回は Sitecore Experience Platform の環境と Sitecore Content Hub を連携させる手順について紹介をしていきます。今回はモジュールのインストールおよび初期設定までの紹介とします。

## 前提条件

前提条件として、以下の環境が動作していることとします。

* Sitecore Experience Platform 10.1
* Sitecore Content Hub 4.0.1 - DAM & CMP

## モジュールのインストール

Sitecore Connect for Content Hub のモジュールは、Sitecore 9.3-10.x と Sitecore Content Hub 4.x に対応しているモジュールは以下のサイトからダウンロードできるようになっています。 

* https://dev.sitecore.net/Downloads/Sitecore_Connect_for_Content_Hub/4x/Sitecore_Connect_for_Content_Hub_400.aspx

Sitecore Content Hub 3.4 よりも前のバージョンに対するモジュールは別になっています。とはいえ、Sitecore Content Hub は適宜バージョンアップしていくのと、この記事を書いている際には最新版は 4.0.1 になっていますので、最新版を前提とした説明を進めていきます。

今回はモジュールをインストールする Sitecore のバージョンが 10.1 XP となるため、以下のモジュールが該当します。

* Sitecore Connect™ for Content Hub XP 10.1

サイトからダウンロードすると以下のファイルのダウンロードが完了となります。

* Sitecore Connect for Content Hub XP for 10.1 v. 4.0.0 rev. 00229.zip

このファイルを、コントロールパネル、管理のエリアにある **パッケージをインストールする** を開き、パッケージをアップロードして指定をします。

![install](/static/images/2021/06/scsch01.png)

ダイアログを進めると、connectionstring.config に以下の設定をするように情報が表示されます。

![install](/static/images/2021/06/scsch02.png)

コードは以下の通りです。

```xml
<add name="CMP.ContentHub" connectionString="ClientId={client_id};ClientSecret={client_secret};UserName={username};Password={password};URI={uri};" />
<add name="CMP.ServiceBusEntityPathIn" connectionString="{Azure Service Bus connection string with incoming topic}" />
<add name="CMP.ServiceBusSubscription" connectionString="{Subscription name}" />
<add name="CMP.ServiceBusEntityPathOut" connectionString="{Azure Service Bus connection string with outcoming topic}" />
<add name="DAM.ContentHub" connectionString="{Content Hub URI}" />
<add name="DAM.SearchPage" connectionString="{Content Hub search page URI}" />
<add name="DAM.ExternalRedirectKey" connectionString="{External redirect key}" />
```

インストール中に、アイテムがすでにある、という表示が出てきます。その際には、**結合**を選択して**適用**をクリックしてください。しばらくすると、モジュールのインストールが完了します。

![install](/static/images/2021/06/scsch03.png)

## DAM と接続する

今回は DAM との接続まで説明をしていきます。まずはインストール中に出てきた設定を ConnectionStrings.config に追加します。

