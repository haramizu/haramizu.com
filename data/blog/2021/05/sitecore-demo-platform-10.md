---
title: Sitecore Demo Platform を仮想マシンで動かす 
date: '2021-05-25'
lastmod: '2021-05-25'
tags: ['Sitecore','Demo']
draft: true
summary: 最近の Sitecore のデモイメージは、Docker に対応をしていてインスタンスを分けていてより本番に近い環境を構築できますが、1つの Sitecore のインスタンスを起動して、そこにデモを立ち上げる方が仮想マシンの利用コストが安い形になります。ということで、今回は Docker ではない環境でデモを立ち上げる手順を紹介していきます。
images: ['/static/images/2021/05/repository01.png']
---

最近の Sitecore のデモイメージは、Docker に対応をしていてインスタンスを分けていてより本番に近い環境を構築できますが、1つの Sitecore のインスタンスを起動して、そこにデモを立ち上げる方が仮想マシンの利用コストが安い形になります。ということで、今回は Docker ではない環境でデモを立ち上げる手順を紹介していきます。

## 環境の準備

今回は VM の上で作業をしていく形となりますが、以下のツールはすでにインストールされているものとします。

* Windows Server 2019
* SQL Server 2019
* Google Chrome
* Git for Windows
* GitHub Desktop
* Visual Studio Code

## Sitecore Experience Platform 10.0 のインストール

この記事を書いているタイミングでの最新版の Sitecore のバージョンは 10.1 となりますが、デモ環境が 10.0 向けのものが公開されている状況のため、今回は 10.0 をインストールしていきます。まずダウンロードサイトから以下のファイルをダウンロードします。

* Sitecore 10.0.0 rev. 004346 (Setup XP0 Developer Workstation rev. 1.2.0-r64).zip

このファイルを c:¥projects¥sif のフォルダに展開します。同じディレクトリに license.xml ファイルもコピーしてください。

![demo]](/static/images/2021/05/demo01.png)

