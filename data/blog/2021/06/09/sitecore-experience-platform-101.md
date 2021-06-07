---
title: Sitecore Experience Platform を仮想マシンで動かす 
date: '2021-06-09'
lastmod: '2021-06-09'
tags: ['Sitecore','Demo','Install']
draft: false
summary: Sitecore の開発をしていく上では Docker の環境を使って、というのが 10.1 以降は利用できるようになりました。とはいえ仮想マシン上で手軽に立ち上げることもできるので、今回はその手順に関して紹介をしていきます。
images: ['/static/images/2021/06/demo11.png']
---

Sitecore の開発をしていく上では Docker の環境を使って、というのが 10.1 以降は利用できるようになりました。とはいえ仮想マシン上で手軽に立ち上げることもできるので、今回はその手順に関して紹介をしていきます。

## 環境の準備

今回は VM の上で作業をしていく形となりますが、以下のツールはすでにインストールされているものとします。

* Windows Server 2019
* SQL Server 2019
* SQL Server Management Studio
* Google Chrome
* Git for Windows
* GitHub Desktop
* Visual Studio Code

## Sitecore Experience Platform 10.1 のインストール

この記事を書いているタイミングでの最新版の Sitecore のバージョンは 10.1 となるため、今回はこれの Developer Workstation のパッケージをダウンロードします。

* Sitecore 10.1.0 rev. 005207 (Setup XP0 Developer Workstation rev. 1.2.2-r1).zip

このファイルを c:¥projects¥sif のフォルダに展開します。同じディレクトリに license.xml ファイルもコピーしてください。

![demo](/static/images/2021/06/demo01.png)

### 関連コンポーネントのインストール

上記のフォルダの中に、インストールをするコンポーネントのファイル一覧を定義している、 Prerequisites.json というファイルがあります。Web Platform Installer のダウンロードの URL が古くて最近削除されたのか、エラーになります。以下のダウンロード URL になっている項目を探して、

```
https://download.microsoft.com/download/C/F/F/CFF3A0B8-99D4-41A2-AE1A-496C08BEB904/WebPlatformInstaller_amd64_en-US.msi
```

以下の URL に変更をしてください。

```
https://go.microsoft.com/fwlink/?LinkId=287166
```

変更後、setup.exe を実行すると以下の画面が表示されます。

![demo](/static/images/2021/06/demo02.png)

ボタンをクリックすると、必要コンポーネントのダウンロードの画面に切り替わります。

![demo](/static/images/2021/06/demo03.png)

インストールボタンをクリックすると、必要なコンポーネントをダウンロード、インストールが進んでいきます。

![demo](/static/images/2021/06/demo04.png)

全てのコンポーネントのダウンロードが完了した段階で、一度再起動してください。

### Solr のインストール

再起動後に Solr のインストールを進めていきます。上記で利用したインストールアシスタントでもインストール可能ですが、コマンドラインでインストールすることができるため、今回は Sitecore のコマンドを利用してインストールをします。

PowerShell で管理者権限で起動して、以下のコマンドを実行してください。

```
Install-SitecoreConfiguration .\Solr-SingleDeveloper.json
```

![demo](/static/images/2021/06/demo05.png)

インストールスクリプトが Java のインストール、サービス化をするモジュールなどが自動的にインストールされて、Solr がサービスとして起動します。

### Sitecore インストール

インストールの定義は、 **XP0-SingleDeveloper.ps1** のファイルに、必要な項目を変更してください。以下の項目に関しては必ず確認をしてください。

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

パスワードが表示されてインストールが完了となります。

![demo](/static/images/2021/06/demo06.png)

## 日本語環境のインポート

日本語環境にするためのデータのインポートの手順が 10.1 から変更となりました。非常に短い時間で作業が完了します。まず、管理画面の日本語リソースの定義を追加します。

管理者画面にログインするべく、インストールをしたサーバーに /sitecore を入れてログインをしてください。管理者の権限でログインをしたあと、Control Panel のグループにある Desktop を開きます。

![demo](/static/images/2021/06/demo07.png)

右下にあるデータベースの表示を master から core に切り替えます。

![demo](/static/images/2021/06/demo08.png)

Localization - Add a new language を選択して、日本語のリソースを追加するので Japanese - Japan を選択します。

![demo](/static/images/2021/06/demo09.png)

追加が完了したあと、サイトから以下のリソースファイルをダウンロードしてください。

* Sitecore 10.1.0 rev. 005207 (ja-JP).zip

このファイルを展開すると、以下の２つのフォルダが表示されます。

![demo](/static/images/2021/06/demo10.png)

このフォルダを Sitecore をインストールしたフォルダの App_Data の中にコピーします。コピーが完了したあと、Sitecore の再起動となりますが、ここはシンプルにコマンドラインで **iisreset** で再起動します。

上記の手順が完了させて、ユーザーの言語を日本語に切り替えると、管理画面が日本語になりました。

![demo](/static/images/2021/06/demo11.png)

## まとめ

Hyper-V を利用した仮想マシンに環境を作ることで、手順の検証をしたい場合、スナップショットを利用することができる環境が手に入ります。今回は Sitecore Experience Platform のインストールに関して紹介をしましたが、ほとんど待ちの時間だけでインストールは自動化されている形です。インストールアシスタントを使うとほとんど自動化できますが、インストールをする環境を理解することも考えると、今回の手順で私は毎回セットアップをしています。