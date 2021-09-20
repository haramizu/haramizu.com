---
title: Sitecore XM シリーズ - セットアップ
date: '2021-09-22'
tags: ['Sitecore','Install','XM']
draft: false
summary: これまで Sitecore Experience Platform （以下XP）のデモ環境のセットアップを紹介してきましたが、今回は CMS のみのインスタンスを立ち上げる Sitecore Experience Manager (以下 XM）の環境をセットアップしていきます。
images: ['/static/images/2021/09/xm09.png']
---

これまで Sitecore Experience Platform （以下XP）のデモ環境のセットアップを紹介してきましたが、今回は CMS のみのインスタンスを立ち上げる Sitecore Experience Manager (以下 XM）の環境をセットアップしていきます。

## 前提条件

今回は、以下の環境が整っていることを前提として、セットアップを進めていきます。

* Windows Server 2019 Standard
    * Microsoft Azure の仮想マシンとして起動
* SQL Server 2019 Standard
* Visual Studio Code

## パッケージの展開

Sitecore のサイトから XM のファイルをダウンロードします。今回は、10.1.1 をダウンロードします。

* Sitecore 10.1.1 rev. 005862 (Setup XM1 Developer Workstation rev. 1.2.3-r6).zip

この zip ファイルを c:¥projects¥sif のフォルダに展開します。

![XM](/static/images/2021/09/xm01.png)

展開をしたフォルダに License.xml のファイルをコピーしてください。

## モジュールのインストール

展開をしたフォルダにある setup.exe を起動します。すると Sitecore Install Assistant の Welcome 画面が表示されます。

![XM](/static/images/2021/09/xm02.png)

Start ボタンを押すと次の画面に切り替わります。この画面に表示されている Install のボタンをクリックすると、Windows Server に必要な設定が一通り自動的に実行されます。

![XM](/static/images/2021/09/xm03.png)

インストールが完了すると、再起動をしてくださいというメッセージが出てきますので、再起動を実行します。

## Solr のインストール

ここからは c:¥projects¥sif のパスあるファイルを利用してインストールの手続きを進めていきます。まず、Solr のエンジンをインストールするために、以下のコマンドを実行してください。

```PowerShell
Install-SitecoreConfiguration .\Solr-SingleDeveloper.json
```

![XM](/static/images/2021/09/xm04.png)

このコマンドで Solr のインストールが完了して、サービスとして起動するようになります。

## インストールスクリプトの変更

上記のフォルダに、XM1-SingleDeveloper.ps1 というスクリプトが準備されています。このファイルの、以下の項目を変更してください。

| 項目 | 説明 | 例 |
|---|---|---|
| $Prefix | DB や インスタンス | XM1 |
| $SitecoreAdminPassword | admin のパスワード | b |
| $SCInstallRoot | インストールのルート | c:¥projects¥sif |
| $SitecoreContentManagementSitename | CMS の URL | $Prefix.cm |
| $SitecoreContentDeliverySitename | デリバリーサーバーの URL | $Prefix.cd |
| $IdentityServerSiteName | Identity Server の URL | $prefix.identityserver |
| $SolrUrl | Solr の URL | https://localhost:8983/solr |
| $SolrRoot | Solr インストール先 | C:\Solr-8.4.0 |
| $SqlAdminPassword | SQL Server のパスワード | password |

変更をしたあと、Powershell から以下のコマンドで実行をしてください。

```
.¥XM1-SingleDeveloper.ps1
```

![XM](/static/images/2021/09/xm05.png)

インストールが完了すると、IIS 管理ツールを開くと３つのインスタンスが追加されています。XM1 の構成となるため、CM サーバー CD サーバー、Identity Server の３つのインスタンスになります。

## 日本語リソースのインポート

管理画面でログインをして、Desktop を開き、右下にあるデータベース名を Core に変更をします。

![XM](/static/images/2021/09/xm06.png)

Control Panel を開き、Localization - Add a new language をクリックします。ここで *Japanese(Japan):日本語(日本)* を選択します。

![XM](/static/images/2021/09/xm07.png)

日本語のリソースをダウンロードします。

* Sitecore 10.1.1 rev. 005862 (ja-JP).zip

このファイルを Sitecore の管理ツールをインストールしているパスの App_Data に展開します。

![XM](/static/images/2021/09/xm08.png)

その後 iisreset を実行して再起動すると管理画面が日本語になります。

![XM](/static/images/2021/09/xm09.png)

## まとめ

これまでの Sitecore Experience Platform の環境と大きな違いとしては、XM は CM と CD に分かれて展開していることです。これにより、モジュールのインストールなどの手順も変わってきます。いくつかのモジュールのインストール手順に関して、今後順次紹介をしていきます。

## 関連サイト

* [Sitecore PowerShell パブリック NuGet フィードの FAQ](https://doc.sitecore.com/ja/developers/101/sitecore-experience-manager/sitecore-powershell-public-nuget-feed-faq.html)