---
title: Sitecore Helix の Next.js サンプルを動かす - 環境の構築
date: '2022-05-09'
tags: ['デモ', 'Next.js']
draft: true
summary: Sitecore が提供しているデモ Sitecore Helix に、Next.js をベースにしたサンプルが含まれています。これを動かす手順に関してこれから数回に分けて紹介をしていきます。
images: ['/static/images/2022/05/sample02.png']
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

まず最初に環境を整えるにあたって、Docker の環境を整備します。手順に関しては、ブログで以前すでに紹介しているため、Docker の部分だけ以下のページを参考にしてください。

[Windows Server で Docker の環境を整える](/blog/2021/05/22/Windows-Server-Docker)

続いて、Visual Studio に進みますが、今回インストールをするのは Visual Studio 2022 Professional をインストールします。

![sample](/static/images/2022/05/sample01.png)

これでインストールは完了です。

## リポジトリのクローンを作成

今回は、GitHub Desktop を利用して、以下のように `c:¥projects` の配下にリポジトリを作成します。

![sample](/static/images/2022/05/sample02.png)

### ライセンスファイルの配置

ライセンスファイルを c:¥license のフォルダの中に保存しておきます。

![sample](/static/images/2022/05/sample03.png)

## まとめ

今回は準備を一通り実施しただけで、セットアップの作業は実施していません。次回は、手順に沿ってデモ環境を立ち上げたいと思います。
