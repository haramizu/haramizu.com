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

### Content Hub 側の準備

まず最初に Content Hub 側の準備を進めます。管理画面で管理 - 設定を開き、PortalConfiguration - CORSConfiguration の設定画面を開きます。

![install](/static/images/2021/06/scsch04.png)

ここで **Add** のボタンを押して、URL を入力してください。例えば、https://yoursitecore.instance.com を入力する形となります。保存をして CORS の設定を完了させます。

環境としてシングルサインオンを採用している場合は、インストールガイドに追加の手順が記載されていますので、そちらを参照して認証の部分を設定してください。

```xml
"ExternalRedirectKeys": {
  "Sitecore": "https://92sc.dev.local/"
}
```

### Sitecore Experience Platform 側の設定

続いて CMS 側の設定を進めていきます。今回は DAM との接続まで説明をしていきます。

まずはインストール中に出てきた設定を ConnectionStrings.config に追加します。

![install](/static/images/2021/06/scsch05.png)

DAM に関しては最後の 3 行だけとなります。CMP の設定は次回紹介をしますので、CMP の部分もコメントアウトをしてとりあえず DAM のみ設定を進めていきます。設定例は以下の通りとなります。

| 項目 | 設定内容 | 例 |
|-|-|-|
| DAM.ContentHub | Content Hub のインスタンス名 | https://sample.stylelabsqa.com |
| DAM.SearchPage | DAM で利用する iFrame の記載 | https://sample.stylelabsqa.com/ja-JP/sitecore-dam-connect/approved-assets |
| DAM.ExternalRedirectKey | SSO で利用する際のキー | 今回はSSO ではないため Sitecore と入力 |

Content Hub の編集用のサーバーとデリバリー用のサーバーに関して、ホスト名が異なる場合は web.config の設定を変更する必要があります。今回の検証は同じため省略しますが、参考までに web.config の設定だけ以下の様に紹介をしておきます。

```xml
<add name="Content-Security-Policy" value="default-src 'self' 'unsafe-inline' 'unsafeeval' https://apps.sitecore.net;
    img-src 'self' data https://content-hub-url.stylelabs.com/ https://content-hub-url-delivery.stylelabs.cloud/;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' 'unsafe-inline' https://fonts.gstatic.com;
    upgrade-insecure-requests; block-all-mixed-content;
    child-src 'self' https://content-hub-url.stylelabs.com/ https://content-hub-urldelivery.stylelabs.cloud/;
    connect-src 'self' https://content-hub-url.stylelabs.com/ https://content-hub-urldelivery.stylelabs.cloud/;
    media-src https://content-hub-url.stylelabs.com/ https://content-hub-urldelivery.stylelabs.cloud/;" />
```

## 動作確認

Sitecore Content Hub および Sitecore CMS の設定が完了したので動作確認に入ります。

まずは Sitecore に管理画面でログインをして、ログインをして

