---
title: Sitecore XM シリーズ - Sitecore Publishing Service インストール
date: '2021-09-28'
tags: ['Sitecore','Install','XM']
draft: true
summary: コンテンツの公開速度を改善することができる Sitecore Publishing Service を今回の XM1 の環境にインストールしていきます。
images: ['/static/images/2021/09/xm30.png']
---

コンテンツの公開の速度を改善することができる Sitecore Publishing Service を今回の XM1 の環境にインストールしていきます。

## 前提条件

今回は以下の環境にセットアップしていきます。

* Sitecore XM1 10.1 (CM/CDに分かれている)
* Sitecore Experience Acceleartor 10.1 インストール済み

Sitecore Publishing Service は２つのモジュールで構成されています。公開作業をするためのサービス機能として Sitecore Publishing Service、このサービスを Sitecore と繋げて動かすための仕組みとして Sitecore Publishing Service Module があります。それぞれ、順にセットアップをしていきます。

## Sitecore Publishing Service 5.0.0

### IIS の作成

このモジュールをインストールするためには、Windows Server Hosting (.NET Core) のモジュールをインストールする必要があります。

* [Download .NET Core 2.1](https://dotnet.microsoft.com/download/dotnet/2.1)
    * ASP.NET Core Runtime 2.1.30
        * Hosting Bundle

これで dotnet-hosting-2.1.30-win.exe のファイルのダウンロードができました。これを実行して .NET Core 2.1 のランタイムをインストールします。

準備ができたところで、 Sitecore Publishing Service のモジュールをダウンロードします。

* [Sitecore Publishing Service 5.0.0](https://dev.sitecore.net/Downloads/Sitecore_Publishing_Service/5x/Sitecore_Publishing_Service_500.aspx)
    * Sitecore Publishing Service (64 bit)

ダウンロードをしたファイル名は以下の通りです。

* Sitecore Publishing Service 5.0.0-win-x64.zip

今回はマニュアルインストールを実行していきます。

1. zip ファイルを以下のパスに展開をします。

C:\inetpub\wwwroot\sitecorepublishing

![XM](/static/images/2021/09/xm15.png)

2. IIS でフォルダを指定した新しいサイトを作成します

![XM](/static/images/2021/09/xm16.png)

3. 今回はホスト名として sitecore.publishing という名前をつけたので、C:\Windows\System32\drivers\etc にある hosts ファイルに追加しておきます。

``` 
127.0.0.1	sitecore.publishing
```

![XM](/static/images/2021/09/xm17.png)

4. 作成をしたサイトのアプリケーションプールを選択し、基本設定を開きます
5. .NET CLR バージョンの項目を**マネージコードなし**に変更します

![XM](/static/images/2021/09/xm18.png)

6. アプリケーションプールの詳細設定を開きます
7. アイドル状態のタイムアウトを 0 に変更します

![XM](/static/images/2021/09/xm19.png)

### 接続文字列の作成

接続文字列を更新していきます。これは、Core、Master および Web に関しての設定が必要となります。現在の App_Config に含まれる ConnectionStrings.config からのデータを参考にしながら、DB の管理者権限（今回は sa ）のアカウントで作成をしていきます。

```powershell
.\Sitecore.Framework.Publishing.Host.exe configuration setconnectionstring core ‘Data Source=localhost;Initial Catalog=XM1_Core;Integrated Security=False;User ID=sa;Password=12345;MultipleActiveResultSets=True’
```

![XM](/static/images/2021/09/xm20.png)

```powershell
.\Sitecore.Framework.Publishing.Host.exe configuration setconnectionstring master ‘Data Source=localhost;Initial Catalog=XM1_Master;Integrated Security=False;User ID=sa;Password=12345;MultipleActiveResultSets=True’
```

![XM](/static/images/2021/09/xm21.png)

```powershell
.\Sitecore.Framework.Publishing.Host.exe configuration setconnectionstring web ‘Data Source=localhost;Initial Catalog=XM1_Web;Integrated Security=False;User ID=sa;Password=12345;MultipleActiveResultSets=True’
```

![XM](/static/images/2021/09/xm22.png)

上記３つの接続文字列の設定を実行すると、C:\inetpub\wwwroot\sitecorepublishing\config\global の中に **sc.connectionstrings.json** というファイルが生成されています。中のデータが正しいかを確認してください。

![XM](/static/images/2021/09/xm23.png)

### スキーマの更新

スキーマを更新するために以下のコマンドを実行します。まず、現在のスキーマのバージョンを調べるために、以下のコマンドを実行します。

```powershell
.\Sitecore.Framework.Publishing.Host.exe schema list
```

![XM](/static/images/2021/09/xm24.png)

このスキーマのバージョンを更新するためには、以下のコマンドを実行します。

```powershell
.\Sitecore.Framework.Publishing.Host.exe schema upgrade --force
```

アップグレードと合わせて結果を確認している画面は以下の通り。

![XM](/static/images/2021/09/xm25.png)

これで設定関連は完了しました。以下のコマンドを実行して設定を反映させます。

```powershell
.\Sitecore.Framework.Publishing.Host.exe iis install --force
```

![XM](/static/images/2021/09/xm26.png)

これでインストールが完了となりました。動作確認のために、以下の URL にアクセスをします。

* http://sitecore.publishing/api/publishing/operations/status

結果として、

```
{"status":0}
```

が表示されれば、Publishing Service が動いている形となります。

## Sitecore Publishing Service Module 10.1.0

### モジュールのインストール

続いて Sitecore のモジュールとなる Sitecore Publishing Services Module をインストールします。モジュールは以下のサイトからダウンロードできます。

* [Sitecore Publishing Service Module 10.1.0](https://dev.sitecore.net/Downloads/Sitecore_Publishing_Service_Module/10x/Sitecore_Publishing_Service_Module_1010.aspx)

* Sitecore Publishing Service Module
    * Sitecore Publishing Module 10.1.0 rev. 00585.zip

モジュールのインストールは、管理画面のコントロールパネルから管理 - パッケージをインストールするを選択し、モジュールをアップロードして指定をします。

![XM](/static/images/2021/09/xm27.png)

インストールの途中、手順が出てきますが、その部分はこのあと随時紹介をしていきます。

### 設定の変更

インストールが完了したあと、以下のファイルを参照すると PublishingService.UrlRoot の項目があることがわかります。

* App_Config\Modules\PublishingService\Sitecore.Publishing.Service.Config

![XM](/static/images/2021/09/xm28.png)

この項目を変更するために、\App_Config\Include\zz のフォルダに Sitecore.Publishing.Service.Config を作成して、値を変更するパッチを作成します。

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/">
    <sitecore>
        <settings>
            <setting name="PublishingService.UrlRoot" value="http://sitecore.publishing/"/>
        </settings>
    </sitecore>
</configuration>
```

設定が完了したあと、Sitecore の管理画面に移動をします。コンテンツ管理のツールの項目にパブリッシュが追加されていることがわかります。

![XM](/static/images/2021/09/xm29.png)

ツールを開くと、パブリッシュのダッシュボードが開きます。これで管理サーバーの設定は完了です。

![XM](/static/images/2021/09/xm30.png)

### コンテンツ配信サーバー

コンテンツ配信サーバーで Publishing Service を利用できるように、以下のファイルをコピーします。

1. App_Config/Modules/PublishingService ディレクトリを作成
2. 以下のファイルをコピーする
    * Sitecore.Publishing.Service.Delivery.config 
    * Sitecore.Publishing.Service.SingleLinkDatabase.config 
3. bin ディレクトリに以下のファイルをコピーする
    * Sitecore.Publishing.Service.dll
    * Sitecore.Publishing.Service.Abstractions.dll
    * Sitecore.Publishing.Service.Delivery.dll

注意 : ドキュメントでは bin/Sitecore.Framework.Conditions.dll のファイルも表記されていますが、元々の XM1 のインストールですでに入っているため、コピーをする必要はありません

## 公開のテスト

今回作業をしている環境は、まだ XM をインストールしてすぐのため Home アイテムのみがあります。そこで以下のように作業をしました。

* Home をコピーして、子アイテムとして保存
    * Home Sub とする
    * Home へのリンクを貼る
* Home のバージョン 2 を作成
    * タイトルにバージョンの数字を入れる
    * Sub への保存をする

上記の作業が完了したコンテンツエディターのツリーが以下のようになります。

![XM](/static/images/2021/09/xm31.png)

アイテムをパブリッシュします。

![XM](/static/images/2021/09/xm32.png)

ダッシュボードを開くと、処理内容が表示されます。

![XM](/static/images/2021/09/xm33.png)

完了したあとサイトを参照しにいくと、ページが更新されていることがわかります。

![XM](/static/images/2021/09/xm34.png)

## まとめ

今回 Publishing Service は同じサーバーにインストールをしましたが、手順を見るとわかるようにサイトは別で起動しており、かつデータベース接続を通じて処理をしているため、編集サーバー以外に別途入れることも可能です。リソースの割り当てなどを考えるときに、どのようにインストールをするのかは都度考慮していく形となります。デモ環境などでも、Publishing Service が入っていると公開などの処理も速くなるので、便利なのでこの機会にぜひ試してみてください。

## 参考資料

* [Sitecore Publishing Service のインストールおよび設定ガイド](https://doc.sitecore.com/ja/resources/SC-Publishing-Service-5.0-Install-Guide-JA.pdf)
* [Sitecore Publishing Service モジュールのインストールおよび設定ガイド](https://doc.sitecore.com/ja/resources/SC-Publishing-Service-Module-10.1-Install-&-Config-Guide-JA.pdf) PDF ファイル
* [Publishing Service v2.0 - Quick Start Guide](http://www.stephenpope.co.uk/publishing)
* [パッチ ファイルを使用して Sitecore 設定をカスタマイズする](https://doc.sitecore.com/ja/developers/101/platform-administration-and-architecture/use-a-patch-file-to-customize-the-sitecore-configuration.html)