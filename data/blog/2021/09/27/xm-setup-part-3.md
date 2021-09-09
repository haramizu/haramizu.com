---
title: Sitecore XM シリーズ - Sitecore Publishing Service インストール
date: '2021-09-27'
tags: ['Sitecore','Install','XM']
draft: true
summary: コンテンツの公開速度を改善することができる Sitecore Publishing Service を今回の XM1 の環境にインストールしていきます。
images: ['/static/images/2021/09/macos11.png']
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
.\Sitecore.Framework.Publishing.Host.exe iis install –-force
```

![XM](/static/images/2021/09/xm26.png)

これで

## Sitecore Publishing Service Module 10.1.0

* [Sitecore Publishing Service Module 10.1.0](https://dev.sitecore.net/Downloads/Sitecore_Publishing_Service_Module/10x/Sitecore_Publishing_Service_Module_1010.aspx)


上記のページから、以下のリンクをクリックしてモジュールをダウンロードします。

* Sitecore Publishing Service Module
    * Sitecore Publishing Module 10.1.0 rev. 00585.zip




## スタイルガイドのインストール

以前のブログ投稿ですが、SXA スタイルガイドのインストール手順を紹介しています。


*
* [Sitecore Experience Accelerator スタイルガイドインストール](/blog/2021/08/04/sxa-styleguide)


## まとめ



## 参考資料

* [Sitecore Publishing Service のインストールおよび設定ガイド](https://doc.sitecore.com/ja/resources/SC-Publishing-Service-5.0-Install-Guide-JA.pdf)
* [Sitecore Publishing Service モジュールのインストールおよび設定ガイド](https://doc.sitecore.com/ja/resources/SC-Publishing-Service-Module-10.1-Install-&-Config-Guide-JA.pdf) PDF ファイル
* [Publishing Service v2.0 - Quick Start Guide](http://www.stephenpope.co.uk/publishing)