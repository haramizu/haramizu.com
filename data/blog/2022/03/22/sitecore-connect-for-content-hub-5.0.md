---
title: Sitecore Connect for Content Hub 5.0 のインストール
date: '2022-03-22'
tags: ['Sitecore', 'Content Hub']
draft: true
summary: 以前にこのブログでも Sitecore の CMS と Content Hub を連携させるコネクタのインストールの手順を紹介しましたが、コネクタの新しいバージョンがリリースされました。このリリースからは Sitecore Install Framework を利用したインストールに対応をしているので、今回はこの手順を紹介します。
images: ['/static/images/2022/03/Scaffold17.png']
---

以前にこのブログでも Sitecore の CMS と Content Hub を連携させるコネクタのインストールの手順を紹介しましたが、コネクタの新しいバージョンがリリースされました。このリリースからは Sitecore Install Framework を利用したインストールに対応をしているので、今回はこの手順を紹介します。

なお、以前の記事は以下の通りです。変更点としてはモジュールのインストール手順、設定が変わった形となりますので、今回は DAM の設定まで紹介をします。CMP に関しては以前の記事を参考にしてください。

- [Sitecore Connect for Content Hub 4.0 - インストール編](/blog/2021/06/17/sitecore-connect-for-content-hub-4.0-part-1)
- [Sitecore Connect for Content Hub 4.0 - CMP 設定編](/blog/2021/06/18/sitecore-connect-for-content-hub-4.0-part-2)

## 前提条件

今回は以下の環境でインストール作業を実施します。

- Sitecore Experience Manager 10.2
- Sitecore Connect for Content Hub 5.0
- Sitecore Content Hub 4.1.10

なお、このコネクタは Sitecore の XM/XP どちらでも利用が可能となっており、Content Hub のバージョンも 4.1, 4.0 および 3.4 で利用することができます。

## モジュールの準備

インストールを始めるにあたって、以下のページから **Sitecore Connect™ for Content Hub SIF Package** と **Sitecore Connect™ for Content Hub WDP Package** のファイルをダウンロードしてください。

- [Sitecore Connect™ for Content Hub 5.0.0](https://dev.sitecore.net/Downloads/Sitecore_Connect_for_Content_Hub/5x/Sitecore_Connect_for_Content_Hub_500.aspx)

## ファイルの展開と実行

まず最初に、**Sitecore Connect™ for Content Hub SIF Package** のファイル（ SIF Installation Scripts For Sitecore Connector Content Hub 5.0.0 rev. 00328.zip ）を以下のフォルダに展開してください。

`C:\projects\contenthub50`

続いて Sitecore.Connector.ContentHub.WDP.5.0.0-r00328.4145.scwdp.zip のファイルを同じフォルダにコピーします。仕上がりは以下のような形です。

![contenthub](/static/images/2022/03/contenthub01.png)

続いて、スクリプトでインストールをするために、環境に整えた値を設定していきます。`deploy.ps1` のファイルの最初の部分に設定が記載されています。

```powershell:\projects\contenthub50
param
(
  [string] $ScchWdpPackage = "$($PSScriptRoot)\Sitecore.Connector.ContentHub.WDP.scwdp.zip",
  [string] $InstanceName = "sitecore",
  [string] $InstanceUrl = "https://$($InstanceName)",
  [string] $SitecoreAdminUser = "admin",
  [string] $SitecoreAdminPass = "b",
  [string] $SqlInstanceName = "$InstanceName",
  [string] $SqlUser = "sa",
  [string] $SqlPass = "Password12345",
  [string] $SqlServerName = ".",
  [bool] $SkipDatabaseInstallation = $false
)
```

主に変更する項目は以下の通りです。

| 項目名                    | 規定値                                      | 変更する値                                                    |
| ------------------------- | ------------------------------------------- | ------------------------------------------------------------- |
| $ScchWdpPackage           | Sitecore.Connector.ContentHub.WDP.scwdp.zip | Sitecore.Connector.ContentHub.WDP.5.0.0-r00328.4145.scwdp.zip |
| $InstanceName             | sitecore                                    | インストールしているインスタンスの名前                        |
| $SitecoreAdminPass        | b                                           | 管理者のパスワード                                            |
| $SqlPass                  | Password12345                               | SQL Server のパスワード                                       |
| $SkipDatabaseInstallation | $false                                      | 10.2 の場合は $true に設定                                    |

上記の設定に問題なければ、PowerShell で実行してください。

![contenthub](/static/images/2022/03/contenthub02.png)

インストールはあっという間に終わります。

![contenthub](/static/images/2022/03/contenthub03.png)

## CD サーバーにインストール

モジュールを CD サーバーにもインストールをします。すでに実行したスクリプトのうちインスタンス名 `$InstanceName` を変更して実行してください。

また CD サーバーの \xsl フォルダにある xslt のファイルでフィールドイメージということで image として記載できるように以下のように変更をしてください。

```xml
  <!-- entry point -->
  <xsl:template match="*">
    <div>
      <h1 class="contentTitle">
        <sc:text field="title"/>
      </h1>
      <div class="contentDescription">
        <sc:text field="text" />
        <sc:image field="image" />
      </div>
    </div>
  </xsl:template>
```

これで CD サーバーに関してのインストールが完了しました。

## 日本語リソースのインストール

モジュールダウンロードのページから日本語のリソースファイルがあるので、ダウンロードをしてください。ファイル名は Sitecore Connect for Content Hub 5.0.0 rev. 00328 (ja-JP).zip となります。

このファイルを Sitecore のインストールしているフォルダの \App_Data に展開をしてください。２つのファイルが展開されます。

- App_Data\localization\chub.texts.ja-JP.xml
- App_Data\items\master\localization\chub.items.master.ja-JP.dat

上記２つのファイルが展開されているのを確認したあと、一度 Sitecore のインスタンスを再起動してください。自動的にリソースが読み込まれます。

日本語リソースのインポートが完了した後は、画像の指定のフィールドに Sitecore DAM をブラウズの項目が追加されます。

![contenthub](/static/images/2022/03/contenthub04.png)

## Sitecore と Content Hub を接続する

### Sitecore の設定変更

まず最初に、Sitecore の設定を変更していきます。接続文字列の調整として、App_Config の中に入っている ConnectionStrings.config の設定を変更します。項目としては以下の通りです。

```xml
  <add name="DAM.ContentHub" connectionString="ClientId={client_id};ClientSecret={client_secret};UserName={username};Password={password};URI={uri};"/>
  <add name="DAM.SearchPage" connectionString="{Content Hub search page URI}"/>
  <add name="DAM.ExternalRedirectKey" connectionString="{External redirect key}"/>
```

`DAM.ContentHub` で利用する項目は Sitecore Content Hub から設定を取得する形です。

- ClientId: 設定の OAuth クライアントから取得します。今回は、LogicApp を利用します
- ClientSecret: 上記の ClientId に紐づいているシークレットキーを利用します
- UserName: Sitecore Content Hub にログイン出来るアカウントを設定します
- Password: 上記アカウントのパスワードを設定します
- URI: サーバーの URL を設定します

`DAM.SearchPage` には利用しているインスタンス名に /en-us/sitecore-dam-connect/approved-assets （日本語の管理画面にする際には en-us を ja-jp ）を指定してください。

- 例: https://sitecorecontenthubdemo.cloud/ja-jp/sitecore-dam-connect/approved-assets

`DAM.ExternalRedirectKey` に関してはサインインの仕組みになりますが、今回は Sitecore を設定しておきます。

続いて web.config の設定です。インストールのドキュメントにも記載されていますが、Sitecore と一緒になって利用する Content Hub のインスタンスと連携することができるようにする手順となります。デリバリーと管理で別の URL の場合は並べる形となりますが、今回は同じ設定ということで、以下のようなサンプルに変更する形です（インスタンス名は変更してください）。

```xml:web.config
    <add name="Content-Security-Policy" value="default-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data https://sitecorecontenthubdemo.cloud/; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' 'unsafe-inline' https://fonts.gstatic.com; upgrade-insecure-requests; block-all-mixed-content; child-src 'self' https://sitecorecontenthubdemo.cloud/; connect-src 'self' https://sitecorecontenthubdemo.cloud/; media-src https://sitecorecontenthubdemo.cloud/;" />
```

### Content Hub の設定変更

Sitecore Content Hub の設定に関しては、以下の２点を変更してください。まず最初に、サーバー間連携の設定として CORS の設定をします。**設定** の画面を開き、**PortalConfiguration** - **CORSConfiguration** を開きます。ここに、Sitecore の管理画面、デリバリーサーバーなど必要なサーバーの URL を追加していきます。

![contenthub](/static/images/2022/03/contenthub05.png)

続いて認証です。この項目も **設定** の画面から **PortalConfiguration** - **Authentication** を開くとログイン認証の設定画面が出てきます。ログイン認証で Sitecore の認証を使うことができるように、認証の項目の authentication_mode を `Passive` に変更してください。

![contenthub](/static/images/2022/03/contenthub06.png)

これで設定が完了となります。

## 動作確認

実際に Sitecore のアイテムの画像フィールドにアクセスをします。なお、手元の環境は管理画面は英語にしています。

![contenthub](/static/images/2022/03/contenthub07.png)

まず最初に、Browse Sitecore DAM のアイコンをクリックします。しばらくすると認証の画面になるため、ログインをしてください。これは、接続文字列を設定する時に利用したアカウントではなく、DAM にアクセスすることができるアカウントを利用する形で進めれます。ログインが成功すると、以下のように認証済みのアセットを選択することができます。

![contenthub](/static/images/2022/03/contenthub08.png)

アイテムを選択して公開リンクを指定します。公開リンクがない場合は、ここで作成をしてください。

![contenthub](/static/images/2022/03/contenthub09.png)

選択をすると、画像を指定するアイテムフィールドに以下のようにサムネイルが表示されます。

![contenthub](/static/images/2022/03/contenthub10.png)

これで設定が完了しました。

## まとめ

今回は Sitecore Content Hub とつなげるためのコネクタの最新版の設定を紹介しました。4.0 と 5.0 の若干の違いがありますが、参考にしていただければと思います。CMP に関しては以前の記事と同じ手順で進めることができますので、以下のページを参照してください。

- [Sitecore Connect for Content Hub 4.0 - CMP 設定編](/blog/2021/06/18/sitecore-connect-for-content-hub-4.0-part-2)
