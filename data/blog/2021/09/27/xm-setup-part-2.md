---
title: Sitecore XM シリーズ - Sitecore Experience Accelerator インストール
date: '2021-09-27'
tags: ['Sitecore','Install','SXA','XM']
draft: true
summary: 以前に紹介をした Sitecore Experience Accelrator のインストールは、構成として XP0 ということで CM および CD サーバーを共有する形での運用となっていました。この記事の直前にインストールをした XM の構成は CM と CD と分かれています。この場合は、必要なモジュールを CD サーバーにもインストールする必要があります。今回は、このインストールの手順について紹介をします。
images: ['/static/images/2021/09/xm14.png']
---

以前に紹介をした Sitecore Experience Accelrator のインストールは、構成として XP0 ということで CM および CD サーバーを共有する形での運用となっていました。この記事の直前にインストールをした XM の構成は CM と CD と分かれています。この場合は、必要なモジュールを CD サーバーにもインストールする必要があります。今回は、このインストールの手順について紹介をします。

* [Sitecore Experience Accelerator インストール](/blog/2021/08/03/sxa-install)

## 前提条件

Sitecore XM のインストールに関しては、以下の記事で紹介した手順が終了しているのを前提とします。

* [Sitecore XM シリーズ - セットアップ](/blog/2021/09/27/xm-setup-part-1)

## モジュールの準備

以下のサイトからモジュールをダウンロードします。今回は Sitecore XM 10.1 ベースとなります。

* [Sitecore Experience Accelerator 10.1.0](https://dev.sitecore.net/Downloads/Sitecore_Experience_Accelerator/10x/Sitecore_Experience_Accelerator_1010.aspx)
    * SXA SIF templates

SXA_SIF_Templates_10.1.0.zip のファイルを c:¥projects¥sxa に展開をします

![XM](/static/images/2021/09/xm10.png)

今回、利用するファイルは **SXA-SingleDeveloper-XM1.ps1** となります。また、このフォルダに c:¥projects¥sif から以下の３つのファイルをコピーします。

* Sitecore Experience Accelerator XM 10.1.0.3751 CD.scwdp.zip
* Sitecore Experience Accelerator XM 10.1.0.3751.scwdp.zip
* Sitecore.PowerShell.Extensions-6.2.scwdp.zip

## ファイル設定　& 実行

ファイルに関して、以下の項目を変更していきます。

| 項目 | 説明 | 例 |
|---|---|---|
| $Prefix | インストールの際に利用した値 | XM1 |
| $SitecoreAdminPassword | admin のパスワード | b |
| $SCInstallRoot | インストールのルート | C:\projects\sxa\SXA_SIF_Templates_10.1.0 |
| $SolrUrl | Solr の URL | https://localhost:8983/solr |
| $SolrRoot | Solr インストール先 | C:\Solr-8.4.0 |
| $SqlAdminPassword | SQL Server のパスワード | password |
| $CMSitename | CM サーバーの名前 | xp1.cm |
| $CDSiteName | CD サーバーの名前 | xp1.cd |

Solr のポートが XM1 のインストールと値が違うので、必要に応じて変更をしておいてください。

続いて、config フォルダにある以下のファイルを、スクリプトファイルと同じ階層にコピーしてください。

* SXA-SingleDeveloper-XM1.json
* spe.json
* sxa-solr.json
* sxa-XM1-CM.json
* sxa-XM1-CD.json

![XM](/static/images/2021/09/xm11.png)

これで準備が完了となりました。スクリプトを実行してインストールします。

## インストールの確認

インストールが完了したあと、ログインをしてコンテンツエディターを起動します。ここで Sitecore/Content のアイテムを右クリックすると、挿入 > Tenant などのアイテムが表示されているのを確認してください。

![XM](/static/images/2021/09/xm12.png)

## 日本語リソースの追加

モジュールのインストールが完了していますが、日本語リソースのインストールは終わっていません。このため、以下のように作業を進めていきます。

1. コントロールパネルを開く
2. グローバリゼーション - 言語ファイルをインポートする をクリック
3. 言語ファイルとして /temp/SXAtranslations/ja-JP.xml を選択します

![XM](/static/images/2021/09/xm13.png)

4. ダイアログを進めてインポートを実行します

上記のリソースでは若干リソースが不足しているため、以下の Github のリポジトリから

* https://github.com/SitecoreJapan/InstallScript
    * 101
        * SXA-ja-JP-update.xml
        * powershell-report-ja-jp.xml

の２つのファイルを上記の手順と同じようにインポートしてください。インポートが完了したあと、先ほどと同様にコンテンツエディターを右クリックして選択することで、日本語のリソースが適用できていることが確認できます。

![XM](/static/images/2021/09/xm14.png)

## まとめ

Sitecore XP の開発環境の際にはシングルインスタンスのため管理画面からパッケージをインストールするだけで作業が完了する形でした。一方、XM の開発環境は CM / CD に分かれているので、Sitecore Install Framework を利用して展開をする、という手順となります。