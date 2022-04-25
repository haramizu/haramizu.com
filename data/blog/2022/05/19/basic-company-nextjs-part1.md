---
title: Sitecore Helix の Next.js サンプルを動かす
date: '2022-05-19'
tags: ['デモ', 'Next.js']
draft: true
summary: Sitecore が提供しているデモ Sitecore Helix に、Next.js をベースにしたサンプルが含まれています。今回は、このサンプルを動かすところまでの手順を紹介していきます。
images: ['/static/images/2022/05/sample09.png']
---

Sitecore が提供しているデモ Sitecore Helix に、Next.js をベースにしたサンプルが含まれています。今回は、このサンプルを動かすところまでの手順を紹介していきます。

## Sitecore Helix とは？

Sitecore Helix は、CMS でサイトを構築するにあたって、継続して更新、機能強化をしていくという点で考慮すべきアーキテクチャガイドに関する名称となります。最初の頃にアーキテクチャに関して全く考慮していない場合、将来的の実装において互換性のないコンポーネントが多く出来上がってしまうなどの問題が起こりにくいように、最初から考慮すべき点を明確していく、その一手間が長期的にメンテナンスしやすいサイトの構築につながるため重要な要素です。

英語のページのみですが、以下のようにサイトを立ち上げています。

- [Sitecore Helix](https://helix.sitecore.com)

この Sitecore Helix のガイドに沿ったコンテンツとしてデモサイトなどもこれまで公開していましたが、従来のデモと異なるサンプルとして、Sitecore Helix Examples というリポジトリを公開しています。

- [Sitecore Helix Examples](https://github.com/Sitecore/Helix.Examples)

この中には、ASP.NET Core 、Next.js のサンプルおよび Sitecore TDS 、Unicorn などのサンプルが提供されています。今回はこの中の Next.js のサンプルを起動する手順を紹介するのがテーマとなります。

## 環境の準備

まず今回検証をする環境は Docker が動作することが前提となっています。このため、以下の手順を完了させていることを前提としています。

- [Sitecore XM を Docker で動かすための環境整備](/blog/2022/05/09/sitecore-docker-environment)

## リポジトリのクローンを作成

今回は、GitHub Desktop を利用して、以下のように `c:\projects` の配下にリポジトリを作成します。指定するリポジトリの URL は *https://github.com/Sitecore/Helix.Examples.git* です。

![sample](/static/images/2022/05/sample08.png)

## まとめ

今回は準備を一通り実施しただけで、セットアップの作業は実施していません。次回は、手順に沿ってデモ環境を立ち上げたいと思います。

## 参考サイト

- [Troubleshooting unhealthy Sitecore containers on Docker](https://www.logicalfeed.com/posts/1249/troubleshooting-unhealthy-sitecore-containers-on-docker)
