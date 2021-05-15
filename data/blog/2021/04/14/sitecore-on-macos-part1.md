---
title: macOS + VMWare Fusion を組み合わせて Sitecore の環境を整える - その１
date: '2021-04-14'
tags: ['Sitecore', 'VMWare Fusion']
draft: false
summary: Sitecore JSS の開発をする場合、Node.js が動けば問題ないため macOS の環境でも開発が可能です。しかしながら、Sitecore は Windows の環境で動作する形となるため、別途環境を整える必要があります。今回は、VMWare Fusion を利用して Sitecore JSS の開発をするための環境を整える方法を紹介します。
---

Sitecore JSS の開発をする場合、Node.js が動けば問題ないため macOS の環境でも開発が可能です。しかしながら、Sitecore は Windows の環境で動作する形となるため、macOS で開発をするためには別途環境を整える必要があります。今回は、VMWare Fusion を利用して Sitecore JSS の開発をするための環境を整える方法を紹介します。Windows の場合も Hyper-V で同様のことができますが、今回は macOS で環境を整える方法として紹介をします。

## 前提条件

このトピックを書いている時は、 macOS は現在２つのプラットフォームがあり、Intel 版と Apple Silicon 版があります。Apple Silicon 版では今のところ仮想環境で Windows を動かすことができないため、対象となるマシンは Intel 版の macOS となります。

今回、この記事を書いている環境は以下の様になります。

- Mac mini (2018) - Intel
- macOS Big Sur 11.2.3
- VMWare Fusion 12.1.1
    - 個人での利用は 12 から無料となりました
- Visual Studio サブスクリプション
    - Windows Server 2019 Standard
    - SQL Server 2019 Standard

クラウド上の仮想マシンを利用する際は、この記事にある仮想マシンの準備のところはスキップしていただき、Sitecore のインストールから進めてください。

## 仮想マシンを準備する

### 仮想マシンの作成

VMWare Fusion のメニューから、ファイル - 新規を選択すると以下のダイアログが表示されます。

![vmwarefusion](/static/images/2021/04/vmware01.png "vmwarefusion")

今回は Windows Server 2019 の ISO ファイルを事前にダウンロードしているので、ディスクまたはイメージからインストールを選択して、続けるをクリックします。

続いて Windows Server 2019 のディスクイメージを指定します。指定済みの画面が以下の通りです。

![vmwarefusion](/static/images/2021/04/vmware02.png "vmwarefusion")

続ける、をクリックすると簡易インストールの画面が表示されます。今回は、簡易インストールは利用せずに進めるため、チェックを外して続けるをクリックしてください。

![vmwarefusion](/static/images/2021/04/vmware03.png "vmwarefusion")

ファームウェアタイプを選択する画面が表示されます。UEFI を選択して続けるをクリックします。

![vmwarefusion](/static/images/2021/04/vmware04.png "vmwarefusion")

これで設定は完了となり、以下の様な画面となります。

![vmwarefusion](/static/images/2021/04/vmware05.png "vmwarefusion")

標準ではメモリ 2GB、CPU も 2 Core という形でサイズが小さいため、**設定のカスタマイズ**をクリックしてより詳細な設定に進みます。この際、仮想マシンの名前を決めてください。

![vmwarefusion](/static/images/2021/04/vmware06.png "vmwarefusion")

名前を保存すると、以下の仮想マシンの設定に関するダイアログが表示されます。

![vmwarefusion](/static/images/2021/04/vmware07.png "vmwarefusion")

プロセッサとメモリを開いて、CPU コアとメモリの調整をします。今回は以下の様な設定としました。

![vmwarefusion](/static/images/2021/04/vmware08.png "vmwarefusion")

またネットワークアダプタに関しては、Mac を共有から自動検出に変更します。

![vmwarefusion](/static/images/2021/04/vmware09.png "vmwarefusion")

### Windows Server 2019 のインストール

スタートアップを選択すると、以下の様に読み込みの画面が表示されます。このタイミングで仮想マシンをクリックしてエンターをクリックすると、ISO ファイルからインストーラーがブートします。

![windowsserver](/static/images/2021/04/winsrv01.png "windowsserver")

しばらくすると Windows セットアップのダイアログが表示されます。

![windowsserver](/static/images/2021/04/winsrv02.png "windowsserver")

環境としてはデフォルトで表示されている内容で今回は問題ないため、**次へ**をクリックして進めます。

次に表示されるダイアログの真ん中にある**今すぐインストール**をクリックします。

![windowsserver](/static/images/2021/04/winsrv03.png "windowsserver")

Windows セットアップのダイアログの画面が Windows Server の選択画面になります。ここでは、**Windows Server 2019 Standard （デスクトップエクスペリエンス）** を選択して、次へをクリックします。

![windowsserver](/static/images/2021/04/winsrv04.png "windowsserver")

クリックをするとライセンス条項が表示されるので、同意しますをチェックして次へをクリック、インストールの種類が表示されます。

![windowsserver](/static/images/2021/04/winsrv05.png "windowsserver")

上kの画面では、下に表示されている**カスタム：Windows のみインストールする（詳細設定）**を選択して次に進みます。

![windowsserver](/static/images/2021/04/winsrv06.png "windowsserver")

ここではインストールするドライブは１つだけとなっているので、デフォルトのまま **次へ**をクリックするとインストールが始まります。

![windowsserver](/static/images/2021/04/winsrv07.png "windowsserver")

インストールが進むと、インストーラーが再起動して Windows Server 2019 が立ち上がります。まず最初に、管理者のパスワードを設定する必要があります。

![windowsserver](/static/images/2021/04/winsrv08.png "windowsserver")

パスワードを設定すると、Windows Server 2019 のインストールが完了となります。

![windowsserver](/static/images/2021/04/winsrv09.png "windowsserver")

### VMware Tool のインストール

設定したパスワードを利用してログインをします。最後に VMWare のツールをインストールします。VMWare Fusion のメニュー**仮想マシン** にある **VMWare Toool のインストール** を選択します。

![windowsserver](/static/images/2021/04/winsrv10.png "windowsserver")

以下のダイアログが表示されるため、**インストール**をクリックしてください。

![windowsserver](/static/images/2021/04/winsrv11.png "windowsserver")

しばらくすると、右下にツールを起動するかどうかのダイアログが表示されます。

![windowsserver](/static/images/2021/04/winsrv12.png "windowsserver")

クリックをすると、オートスタートに関するダイアログが表示されます。今回は setup64.exe の実行を選択してください。

![windowsserver](/static/images/2021/04/winsrv13.png "windowsserver")

ツールのインストーラーが表示されるので、次へをクリック、デフォルトのままインストールを完了させてください。

![windowsserver](/static/images/2021/04/winsrv14.png "windowsserver")

インストールが完了すると、一度再起動が促され、起動したところで Windows Server 2019 の仮想マシンに関して準備が完了となります。

## SQL Server 2019 インストール

今回は SQL Server 2019 の ISO イメージをマウントしてインストールを進めていきます。まず、ディスクイメージとしてすでにダウンロード済みの ISO ファイルを指定します。

![sqlserver](/static/images/2021/04/sqlserv01.png "sqlserver")

CD/DVD を接続をメニューから選択をすると、右下にダイアログが表示されます。

![sqlserver](/static/images/2021/04/sqlserv02.png "sqlserver")

ダイアログをクリックすると、ISO ファイルに含まれている実行ファイルをそのまま実行するかのダイアログが表示されます。

![sqlserver](/static/images/2021/04/sqlserv03.png "sqlserver")

SQL Server のインストールをするため、**setup.exe の実行** をクリックします。しばらくすると SQL Server のインストーラーが起動します。

左側のメニューから**インストール**をクリック、**SQL Server の新規スタンドアロンインストールを実行するか、既存のインストールに機能を追加** を選択してください。

![sqlserver](/static/images/2021/04/sqlserv04.png "sqlserver")

SQL Server のインストールに関しては標準項目で進めるのでほとんど問題ありませんが、以下の項目に関して注意をしてください。

### 機能の選択

データベースエンジン、Machine Learning Services および言語の拡張の２つをクリックします。

![sqlserver](/static/images/2021/04/sqlserv05.png "sqlserver")

### サーバの構成

SQL Server エージェント、および SQL Server データベースエンジンのアカウント名を Network Service に変更します。

![sqlserver](/static/images/2021/04/sqlserv06.png "sqlserver")


### データベースエンジンの構成

認証モードは混在モードを選択し、sa のパスワードを設定してください。また、SQL Server 管理者の指定には、現在のユーザーの追加をクリックして、管理者の設定もします。

![sqlserver](/static/images/2021/04/sqlserv07.png "sqlserver")

上記の設定を下に、インストールを進めて SQL Server 2019 のインストールを完了させます。

## その他便利なツールのインストール

作業をする上で便利なツールを事前にインストールしていきます。下記の順番で行くとスムーズに進めることができます。

### Chocolatey のインストール

Chocolatey は Windows 向けのパッケージマネージャーとなっており、コマンドラインで対象となるパッケージを指定するとダウンロード、インストールを実行する便利なツールです。今回はこれを利用していきます。

* [Chocolatey](https://chocolatey.org)

サイトにアクセスをすると、右上に Install Now のボタンがあります。

![choco](/static/images/2021/04/choco01.png "choco")

クリックをするとインストールに関するページが表示されます。Step 2 のエリアに、PowerShell でインストールをするためのサンプルスクリプトが準備されています。

![choco](/static/images/2021/04/choco02.png "choco")

このスクリプトを PowerShell の管理者権限の画面で実行します。しばらくするとインストールが完了します。

![choco](/static/images/2021/04/choco03.png "choco")

コマンドで choco と入力するとバージョンが表示されれば、インストールに成功していることになります。

![choco](/static/images/2021/04/choco04.png "choco")

### Google Chrome のインストール

Windows Server 2019 にインストールされているブラウザは Internet Explorer 11 で使い勝手が悪いので、今回は Google Chrome をインストールします。PowerShell の画面で以下のコマンドを実行してください。

```
choco install googlechrome
```

しばらくするとスクリプトを実行するかどうかの質問が表示されるので、A を入力してエンターを押してください。Google Chrome のインストールが完了します。

![choco](/static/images/2021/04/choco05.png "choco")

ブラウザを起動して、標準のブラウザを Google Chrome にしておくと良いでしょう。

### ツールをインストール

今回は以下のようにツールをインストールしていきます。まずは、Git for Windows のインストール

```
choco install git
```

![choco](/static/images/2021/04/choco06.png "choco")

Visual Studio Code のインストール

```
choco install vscode
```

![choco](/static/images/2021/04/choco07.png "choco")

Visual Studio Code は起動後日本語のリソースを入れるなど、作業環境を別途整えてると作業が楽になります。

### SQL Server Management Studio のインストール

SQL Server Management Studio は以下の URL からダウンロードすることができます。

* [SQL Server Management Studio (SSMS) のダウンロード](https://docs.microsoft.com/ja-jp/sql/ssms/download-sql-server-management-studio-ssms?redirectedfrom=MSDN&view=sql-server-ver15)

すでにインストールをしている Google Chrome を起動してサイトを表示し、OS の言語に合わせたパッケージをダウンロード、インストールをしてください。

## まとめ

環境を整えるところまで今回は紹介をしました。次回は、Sitecore のインストール、最終的な動作確認まで進めていきます。

* [macOS + VMWare Fusion を組み合わせて Sitecore の環境を整える - その２](/blog/2021/04/15/sitecore-on-macos-part2)