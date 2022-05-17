---
title: Sitecore XM1 を Docker で動かすための環境整備
date: '2022-05-10'
tags: ['Docker', 'Sitecore']
draft: false
summary: すでにこのブログでは Sitecore を Docker で動かすという記事を紹介していますが、もう一度最新版に合わせた手順を紹介ます。以前の記事も参考にしつつですが、今後はこの記事がベースになるように何かあれば更新するようにします。
images: ['/static/images/2022/05/docker08.png']
---

以前にこのブログでは Sitecore を Windows Server にて Docker を利用して動かすという記事を紹介していますが、今回は Sitecore 10.2 の XM バージョン（ CMS モード）を立ち上げる手順を紹介します。今後紹介をする内容は、この記事がベースになるように書いていきたいと思います。

なお以前の記事に関しては、参考までにページの最後に一覧を記載しています。

## 環境の準備

今回作成をするデモ環境に関しては、実際の開発環境を意識して以下の環境で進めていきます。

- Windows 11 Professional
- Visual Studio Code
- Git for Windows
- GitHub Desktop
- Docker for Windows
- NodeJs 14.x
- Visual Studio 2022
- .NET Core 3.1
- .NET Framework 4.8

なお環境としてはメモリが 16GB では少しスペックが不足してしまうため、

まず最初に、Windows 11 Pro の Hyper-V を有効にします。PowerShell を管理者権限で起動して、次のコマンドを実行してください。

```ps1
Enable-WindowsOptionalFeature -Online -FeatureName $("Microsoft-Hyper-V", "Containers") -All
```

インストールが完了すると再起動を促されます。続いて、Windows Subsystem for Linux もインストールしておく必要があります。

```ps1
wsl --install
```

以下のページからモジュールのダウンロードをして、インストールを実行します。

![docker](/static/images/2022/05/wsl1.png)

https://docs.microsoft.com/ja-jp/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package

上期のページからダウンロードしたファイルを実行するとアップデートが実行されます。

![docker](/static/images/2022/05/wsl2.png)

続いて、さまざまなツールをインストールするためのインストーラーとして **chocolatey** を今回は利用したいと思います。

```ps1
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

![docker](/static/images/2022/05/docker01.png)

インストールが完了してバージョンの確認は以下のようになっています。

![docker](/static/images/2022/05/docker02.png)

インストールが完了したら、以下のようにコマンドラインでインストールを進めていきます。

### Visual Studio Code のインストール

```ps1
choco install vscode
```

![docker](/static/images/2022/05/docker03.png)

インストールが完了したあと、機能拡張として日本語リソースを追加します。

![docker](/static/images/2022/05/docker17.png)

また入れていると便利なので Docker の機能拡張も追加しておきます。

![docker](/static/images/2022/05/docker18.png)

### Git for Windows

Git for Windows をインストールします。

```ps1
choco install git
```

![docker](/static/images/2022/05/docker04.png)

### GitHub Desktop

git のコマンドで作業をするのに慣れている人は良いのですが、手軽に使えるという点で GitHub Desktop をこのブログでも利用した形で記事を掲載していきます。

```ps1
choco install github-desktop
```

インストールの途中にアプリケーションが起動して、GitHub のアカウントでログインをするかどうか確認をしてきます。

![docker](/static/images/2022/05/docker05.png)

ここは Skipt this step を選択するもよし、日頃利用している GitHub のアカウントでログインをするもよしという形です。

### Docker for Windows

Docker for Windows をインストールします。

```ps1
choco install docker-desktop
```

![docker](/static/images/2022/05/docker06.png)

Docker Desktop を起動するためには、一度サインアウトをして、サインインし直す必要があります。サインインしなおすと、利用許諾の画面が表示されます。

![docker](/static/images/2022/05/docker07.png)

完了すると起動画面に切り替わります。

![sample](/static/images/2022/05/docker08.png)

Windows コンテナに切り替えます。切り替えは、タスクトレイに入っている Docker のアイコンを右クリックして、`Switch to Windows Containers` を選択してください。

![sample](/static/images/2022/05/docker09.png)

![sample](/static/images/2022/05/docker10.png)

切り替えたあと、今度は右クリックをして Settings をクリックして設定を開きます。動作としては、Docker Engigne のオプションを選択して、以下のように設定をしてください。

```json
{
  "experimental": true
}
```

![sample](/static/images/2022/05/docker11.png)

最後に、設定画面の Use Docker Compose V2 の項目に関してはチェックを外しておいてください。

![sample](/static/images/2022/05/docker12.png)

これで Docker for Windows の設定は完了となります。

### mkcert のインストール

自己証明書などで利用するコマンド、 mkcert をインストールします。

```
choco install mkcert
mkcert -install
```

![sample](/static/images/2022/05/docker13.png)

### Node.js のインストール

Node.js をインストールします。Node.js をインストールする際には、LTS のバージョンを指定してインストールします。

```
choco install nodejs-lts
```

![sample](/static/images/2022/05/docker14.png)

### Visual Studio 2022 Professional のインストール

Visual Studio 2022 Professional をインストールします。マイクロソフトのサイトからインストーラーをダウンロードして、インストール、最後にアクティベーションをすれば作業は完了となります。

![sample](/static/images/2022/05/docker15.png)

## Sitecore Docker Tool のインストール

インストールをする時に便利な支援ツールとして、 Sitecore Docker Tools をインストールします。Sitecore Gallery からダウンロードすることができるため、以下のコマンドを実行してインストールしてください。

```ps1
Register-PSRepository -Name "SitecoreGallery" -SourceLocation "https://sitecore.myget.org/F/sc-powershell/api/v2"
Install-Module SitecoreDockerTools
```

コマンドプロンプトで確認が来た際には Y もしくは A で進めていきます。

![sample](/static/images/2022/05/docker19.png)

## ライセンスファイルの配置

ライセンスファイルを c:\projects\license のフォルダの中に保存しておきます。

![sample](/static/images/2022/05/docker16.png)

## まとめ

以前は Windows Server 2019 にて Docker を利用する方法を紹介しましたが、今回のように Windows 10/11 Pro でも Hyper-V が利用できるマシンであれば環境を準備することができます。

## 参考情報

- [環境の設定](https://doc.sitecore.com/xp/ja/developers/101/developer-tools/set-up-the-environment.html)
- [Sitecore Docker シリーズ](/blog/sitecore-docker)
- [Sitecore を Docker で動かす – Part 1](/blog/2019/12/26/sitecore-docker-part1)
- [Sitecore を Docker で動かす – Part 2](/blog/2020/01/08/sitecore-docker-part2)
- [Sitecore 10 を Docker で実行する](/blog/2020/12/11/sitecore10docker)
- [Sitecore 10 を Docker で実行する - XP1 とドメインの設定](/blog/2020/12/14/sitecore-docker-xp1)
- [Windows Server で Docker の環境を整える](/blog/2021/05/22/Windows-Server-Docker)
