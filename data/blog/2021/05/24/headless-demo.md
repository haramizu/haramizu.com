---
title: Headless デモを動かしてみる 
date: '2021-05-24'
lastmod: '2021-05-24'
tags: ['Sitecore','Docker','デモ']
draft: false
summary: 今回は、Microsoft Azure 上で展開する仮想環境にて、Docker が動く環境を整備していきます。Windows 10 Pro では Docker for Desktop を利用する形が一番シンプルですが、今回は Windows Server 2019 ベースでの環境を整えていきます。
images: ['/static/images/2021/05/headless10.png']
---

Sitecore の Headless の環境を評価するには、実際のデモを動かしてみるのが一番早いので、GitHub で提供されているデモを実行してみます。環境に関しては、Docker の動作する環境が準備できていれば問題ありません。まだの場合は、以下の記事を参考に構築してみてください。

* [Windows Server で Docker の環境を整える](/blog/2021/05/22/Windows-Server-Docker)

## リポジトリのクローンを作成

まず最初に、リポジトリのクローンを作成します。対象となるのは以下のリポジトリとなります。

* [Sitecore/Sitecore.Demo.Headless](https://github.com/sitecore/sitecore.demo.headless)

GitHub Desktop でサクッとクローンを作成しします。今回は c:¥projects の下にクローンを作成します。

![Headless](/static/images/2021/05/headless01.png)

これとは別に、以下のリポジトリも同時にクローンを作成してください。

* [Sitecore/Sitecore.Demo.platform](https://github.com/sitecore/sitecore.demo.platform)

結果、 c:¥projects に２つのリポジトリのクローンが作成されます。

![Headless](/static/images/2021/05/headless02.png)

## ライセンスファイルを準備する

ライセンスファイルを c:¥license というディレクトリを作成して、ファイルをコピーします。

![Headless](/static/images/2021/05/headless03.png)

ライセンスファイルに関しては、開発評価用のライセンスを Sitecore のサイトから入手することができます。

* [Sitecore front-end developer trial](https://www.sitecore.com/knowledge-center/getting-started/developer-trial)

期間限定のライセンスファイルになりますが、Sitecore のユーザーでもなく、パートナーでもなく、でも評価したい、という形はぜひご利用ください。

## Node.js および JSS コマンドのインストール

Sitecore JSS を利用する際には、Node.js のコンポーネントおよび JSS のコマンドをインストールする必要があります。

まず、Node.js に関しては公式サイトからモジュールをダウンロード、インストールをしてください。LTS がおすすめです。

* [Node.js](https://nodejs.org/ja/)

ファイルをダウンロードして、インストーラーを起動、デフォルトの設定のまま進めていってください。

![Headless](/static/images/2021/05/headless04.png)

続いて、JSS のコマンドをインストールします。コマンドのインストールは以下のコマンド１行を管理者権限で実行するだけです。

```powershell
npm install -g @sitecore-jss/sitecore-jss-cli
```

![Headless](/static/images/2021/05/headless05.png)

## セットアップの準備

セットアップの準備のためのスクリプトが、リポジトリのクローンのフォルダに入っています。ディレクトリを移動して、以下のコマンドを実行します。

```powershell
.\init.ps1 -InitEnv -LicenseXmlPath C:\license\license.xml -AdminPassword b
```

![Headless](/static/images/2021/05/headless06.png)

ライセンスファイルのパスが異なる場合は書き換えてください。また、管理者のパスワードも b 以外を指定する場合は、このタイミングで変更することができます。途中で証明書に関する確認のダイアログが表示されますが、そこは OK を押して進めていきます。初期設定の情報は **.env** ファイルに記載されます。

## コンテナを起動する

設定が完了したので、ますはイメージのダウンロードを実行します。

```powershell
docker-compose pull
```

![Headless](/static/images/2021/05/headless07.png)

続いて以下のコマンドでコンテナをスタートします。

```powershell
docker-compose up -d
```

![Headless](/static/images/2021/05/headless08.png)

コンテナがすべて起動したあと、初回はコンテンツのインポートが動きます。初期の起動状況は以下の環境で確認ができます。

```powershell
docker-compose logs -f init
```

しばらくするとログが止まりますので、そこでインスタンスが起動している形となります。

## デモ環境を確認する

以下のようにサイトが動作しています。

| 役割 | URL |
|-|-|
| CM サーバー | https://cm.lighthouse.localhost/sitecore/ |
| Fitness | https://app.lighthouse.localhost/ |
| Fitness Kiosk | https://kiosk.lighthouse.localhost/ |

CM サーバーにログインをすると、Lighthouse Fitness のホームのアイテムがあります。

![Headless](/static/images/2021/05/headless09.png)

このアイテムを選択して、エクスペリエンスエディターを起動すると以下のような画面になります。

![Headless](/static/images/2021/05/headless10.png)

実際にこのサンプルのコードはどこに保存されているでしょうか？このコードは、　C:\projects\sitecore.demo.headless\fitness\app に保存されています。このコードを Disconnected Mode で起動するために、以下のように手続きを進めてください（npm install は初回のみです）。

```powershell
cd C:\projects\sitecore.demo.headless\fitness\app
npm install
jss start
```

最後のコマンドを実行したあと、サンプルのサイトが起動します。

![Headless](/static/images/2021/05/headless11.png)

このようにサンプルのサイトを動かし、コードの確認をすることができました。もう一つのサイトは C:\projects\sitecore.demo.headless\fitness\kiosk にコードがあるので、それを利用することで同じ確認ができます。

## まとめ

GitHub にあるリポジトリを利用して、Sitecore JavaScript Services が動いている環境を手元で動かすことができました。サンプルのコードでどういう形で実装をしているのか、などみていただくのもいいと思います。

## 参考

* [Connected and Integrated Modes Installation](https://github.com/Sitecore/Sitecore.Demo.Headless/blob/main/docs/configuration/installation.md)