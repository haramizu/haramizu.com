---
title: Sitecore Demo Platform を仮想マシンで動かす 
date: '2021-05-31'
lastmod: '2021-05-31'
tags: ['Sitecore','Demo']
draft: true
summary: 最近の Sitecore のデモイメージは、Docker に対応をしていてインスタンスを分けていてより本番に近い環境を構築できますが、1つの Sitecore のインスタンスを起動して、そこにデモを立ち上げる方が仮想マシンの利用コストが安い形になります。ということで、今回は Docker ではない環境でデモを立ち上げる手順を紹介していきます。
images: ['/static/images/2021/05/demo02.png']
---

最近の Sitecore のデモイメージは、Docker に対応をしていてインスタンスを分けていてより本番に近い環境を構築できますが、1つの Sitecore のインスタンスを起動して、そこにデモを立ち上げる方が仮想マシンの利用コストが安い形になります。ということで、今回は Docker ではない環境でデモを立ち上げる手順を紹介していきます。

## 環境の準備

今回は VM の上で作業をしていく形となりますが、以下のツールはすでにインストールされているものとします。

* Windows Server 2019
* SQL Server 2019
* SQL Server Management Studio
* Google Chrome
* Git for Windows
* GitHub Desktop
* Visual Studio Code

## Sitecore Experience Platform 10.0 のインストール

この記事を書いているタイミングでの最新版の Sitecore のバージョンは 10.1 となりますが、デモ環境が 10.0.1 向けのものが公開されている状況のため、今回は 10.0.1 をインストールしていきます。まずダウンロードサイトから以下のファイルをダウンロードします。

* Sitecore 10.0.1 rev. 004842 (Setup XP0 Developer Workstation rev. 1.2.1-r1).zip

このファイルを c:¥projects¥sif のフォルダに展開します。同じディレクトリに license.xml ファイルもコピーしてください。

![demo](/static/images/2021/05/demo01.png)

### 関連コンポーネントのインストール

上記のフォルダの中に、インストールをする際のファイル一覧を定義している、 Prerequisites.json のファイルがあります。Web Platform Installer のダウンロードの定義が古いため、エラーになります。以下のダウンロード URL になっている項目を探して、

```
https://download.microsoft.com/download/C/F/F/CFF3A0B8-99D4-41A2-AE1A-496C08BEB904/WebPlatformInstaller_amd64_en-US.msi
```

以下の項目に変更をしてください。

```
https://go.microsoft.com/fwlink/?LinkId=287166
```

変更後、setup.exe を実行すると以下の画面が表示されます。

![demo](/static/images/2021/05/demo02.png)

ボタンをクリックすると、必要コンポーネントのダウンロードの画面に切り替わります。

![demo](/static/images/2021/05/demo03.png)

インストールボタンをクリックすると、必要なコンポーネントをダウンロード、インストールが進んでいきます。

![demo](/static/images/2021/05/demo04.png)

全てのコンポーネントのダウンロードが完了した段階で、一度再起動してください。

### Solr のインストール

再起動後に Solr のインストールを進めていきます。上記で利用したインストールアシスタントデモインストール可能ですが、コマンドラインでインストールすることができるため、今回は Sitecore のコマンドを利用してインストールをします。

PowerShell で管理者権限で起動して、以下のコマンドを実行してください。

```
Install-SitecoreConfiguration .\Solr-SingleDeveloper.json
```

インストールスクリプトが Java のインストール、サービス化をするモジュールなどが自動的にインストールされて、Solr がサービスとして起動します。

![demo](/static/images/2021/05/demo05.png)

### Sitecore インストール

インストールの定義は、 **XP0-SingleDeveloper.ps1** のファイルに、必要な項目を変更してください。

| パラメータ | 入力値 | 説明 |
|-|-|-|
| $SitecoreAdminPassword | b | 管理者パスワード |
| $SCInstallRoot | C:\projects\sif | インストールのルート |
| $SitecoreSiteName | 任意 サイト名 |  |
| $SqlAdminPassword | 任意 | SQL Server パスワード |
| $SolrRoot | 任意 | 上記の手順であればデフォルトのまま |
| $SolrService | 任意 | 上記の手順であればデフォルトのまま |

変更後、スクリプトを実行してください。

```
.¥XP0-SingleDeveloper.ps1
```

![demo](/static/images/2021/05/demo06.png)

## Sitecore Experience Accelerator のインストール

デモは Sitecore Experience Accelerator を必要とするため、モジュールを２つダウンロードしてください。PowerShell Extension と SXA のモジュールの２つになります（Sitecore のバージョンは 10.0.1 ですが SXA のモジュールは 10.0.0 のものをそのまま利用できます）。

* Sitecore.PowerShell.Extensions-6.1.1.scwdp.zip
* Sitecore Experience Accelerator 10.0.0.3138.scwdp.zip

これらのファイルを、 C:\inetpub\wwwroot\yourinstance\App_Data\packages （yourinstance は Sitecore のインストール先）にコピーをします。

続いて管理画面から、Control Panel - Administration の項目にある Install a package をクリックして、パッケージのインストールを開始します。

![demo](/static/images/2021/05/demo07.png)

インストールの順番としては、Sitecore.PowerShell.Extensions-6.1.1.scwdp.zip 続いて Sitecore Experience Accelerator 10.0.0.3138.scwdp.zip をインストールしていきます。

![demo](/static/images/2021/05/demo08.png)

これで Sitecore 側の設定は完了となりました。

## 追加のツールのインストール

インストールをする際に２つのアプリケーションをインストールしておく必要があります。

* [Node.js LTS 版](https://nodejs.org/ja/)
* [Build Tools for Visual Studio 2019](https://visualstudio.microsoft.com/ja/downloads/)
    * Visual Studio 2019 のライセンスがあれば不要です
    * 上記のページにアクセスをします
    * Visual Studio 2019 のツールをクリック
    * Build Tools for Visual Studio 2019 をインストール

![demo](/static/images/2021/05/demo09.png)

Build をする際に、Coveo のライブラリが必要となるのですが、nuget に提供されていません。このため、Docker の環境を一時的に準備する必要があります。

全ての設定となると、 [Windows Server で Docker の環境を整える](/blog/2021/05/22/Windows-Server-Docker) という形で手順を進めていく必要がありますが、今回はフルスペックで準備をする必要はありません。まず、PowerShell のギャラリーから、Docker-Microsoft PackageManagement Provider をインストールします。

```
Install-Module -Name DockerMsftProvider -Repository PSGallery -Force
```

続いて Docker をインストールします。

```
Install-Package -Name docker -ProviderName DockerMsftProvider
```

ついでに、docker-compose も入れておきましょう。

```
choco install docker-compose
```

これで準備が完了しました。Docker の環境などをインストールしているので一度再起動をかけてください。

## デモコンテンツのインポート

今回のデモのコンテンツとしては、以下のリポジトリのコードを利用します。

* https://github.com/sitecore/sitecore.demo.platform

コードは c:¥projects¥sitecore.demo.platform に展開する形を想定します。

まず最初に、build を準備するために、以下のコマンドを実行してください。

```
.\pull-build-libraries.ps1
```

![demo](/static/images/2021/05/demo10.png)

続いて、build.ps1 を実行するにあたって、２つの設定ファイルを確認する必要があります。

ディレクトリの中に **cake-config.json** と **publishsettings.targets** のファイルがあり、これまでセットアップしたデータを入れておく必要があります。projects のフォルダの下に入れている場合は、ホスト名の変更をすれば問題ありません。

今回は Content Hub に関しての設定を省略しているので、以下の１行に関してはコメントアウトしてください。記載は２箇所あります。

```
.IsDependentOn("Modify-ContentHub-Variable")
```

ここまで準備ができれば、build.ps1 を実行するとインポートまで全て完了します。

```
.¥build.ps1
```

## 日本語環境のインポート

```
<add name="CMP.ContentHub" connectionString="ClientId={client_id};ClientSecret={client_secret};UserName={username};Password={password};URI={uri};" />
<add name="CMP.ServiceBusEntityPathIn" connectionString="{Azure Service Bus connection string with incoming topic}" />
<add name="CMP.ServiceBusSubscription" connectionString="{Subscription name}" />
<add name="CMP.ServiceBusEntityPathOut" connectionString="{Azure Service Bus connection string with outcoming topic}" />
<add name="DAM.ContentHub" connectionString="{Content Hub URI}" />
<add name="DAM.SearchPage" connectionString="{Content Hub search page URI}" />
<add name="DAM.ExternalRedirectKey" connectionString="{External redirect key}" />
```
