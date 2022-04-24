---
title: Sitecore Helix の Next.js サンプルを動かす - 環境の構築
date: '2022-05-09'
tags: ['デモ', 'Next.js']
draft: true
summary: Sitecore が提供しているデモ Sitecore Helix に、Next.js をベースにしたサンプルが含まれています。これを動かす手順に関してこれから数回に分けて紹介をしていきます。
images: ['/static/images/2022/05/sample09.png']
---

Sitecore が提供しているデモ Sitecore Helix に、Next.js をベースにしたサンプルが含まれています。これを動かす手順に関してこれから数回に分けて紹介をしていきます。

## Sitecore Helix とは？

Sitecore Helix は、CMS でサイトを構築するにあたって、継続して更新、機能強化をしていくという点で考慮すべきアーキテクチャガイドに関する名称となります。最初の頃にアーキテクチャに関して全く考慮していない場合、将来的の実装において互換性のないコンポーネントが多く出来上がってしまうなどの問題が起こりにくいように、最初から考慮すべき点を明確していく、その一手間が長期的にメンテナンスしやすいサイトの構築につながるため重要な要素です。

英語のページのみですが、以下のようにサイトを立ち上げています。

- [Sitecore Helix](https://helix.sitecore.com)

この Sitecore Helix のガイドに沿ったコンテンツとしてデモサイトなどもこれまで公開していましたが、従来のデモと異なるサンプルとして、Sitecore Helix Examples というリポジトリを公開しています。

- [Sitecore Helix Examples](https://github.com/Sitecore/Helix.Examples)

この中には、ASP.NET Core 、Next.js のサンプルおよび Sitecore TDS 、Unicorn などのサンプルが提供されています。今回はこの中の Next.js のサンプルを起動する手順を紹介するのがテーマとなります。

## 環境の準備

立ち上げるための手順に関しては、以下のページで紹介されています。

- [Running the Example](https://github.com/Sitecore/Helix.Examples/tree/master/examples/helix-basic-nextjs)

環境は以下の仕組みが必要となります。

- NodeJs 14.x
- .NET Core 3.1 SDK
- .NET Framework 4.8 SDK
- Visual Studio 2019
- Docker for Windows, with Windows Containers enabled

今回は、Windows 10 Professional の環境においてデモが動くように設定をしたいと思います。

まず最初に、Docker Desktop をインストールします。公式サイトからダウンロードをしてください。

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

インストーラーをダウンロードして実行すると、以下のダイアログが表示されます。

![sample](/static/images/2022/05/sample01.png)

OK をクリックするとインストールが始まります。

![sample](/static/images/2022/05/sample02.png)

インストールが完了した際には、Windows の再起動の画面が出てくるので再起動してください。再起動後、しばらくすると Docker for Windows が起動して、以下のように利用許諾の画面になります。

![sample](/static/images/2022/05/sample03.png)

利用許諾に関して同意したあと、続いて Windows コンテナに切り替えます。切り替えは、タスクトレイに入っている Docker のアイコンを右クリックして、`Switch to Windows Containers` を選択してください。

![sample](/static/images/2022/05/sample04.png)

切り替えたあと、今度は右クリックをして Settings をクリックして設定を開きます。動作としては、Docker Engigne のオプションを選択して、以下のように設定をしてください。

```json
{
  "experimental": true
}
```

これで Docker for Windows の設定は完了となります。

続いて、Visual Studio 2022 Professional をインストールします。

![sample](/static/images/2022/05/sample06.png)

最後に mkcert のコマンドをインストールしたいと思います。手順として、を利用すると便利なので、まずはツールをインストールします。

```
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

インストールが完了したあと、以下のコマンドで mkcert のインストールが完了となります。

```
choco install mkcert
```

これでインストールは完了です。ついでに Visual Studio Code や GitHub Desktop などもインストールをして今後の紹介では使っていきます。

### ライセンスファイルの配置

ライセンスファイルを c:\projects\license のフォルダの中に保存しておきます。

![sample](/static/images/2022/05/sample07.png)

## リポジトリのクローンを作成

今回は、GitHub Desktop を利用して、以下のように `c:\projects` の配下にリポジトリを作成します。指定するリポジトリの URL は *https://github.com/Sitecore/Helix.Examples.git* です。

![sample](/static/images/2022/05/sample08.png)

## Docker Desktop の設定変更

今回のサンプルは、`docker-compose` のコマンドが version 2.x の場合は起動時にエラーになってしまうため、管理画面を起動して `Use Docker Compose V2` のチェックを外してください。

![sample](/static/images/2022/05/sample09.png)

## まとめ

今回は準備を一通り実施しただけで、セットアップの作業は実施していません。次回は、手順に沿ってデモ環境を立ち上げたいと思います。

## 参考サイト

- [Troubleshooting unhealthy Sitecore containers on Docker](https://www.logicalfeed.com/posts/1249/troubleshooting-unhealthy-sitecore-containers-on-docker)
