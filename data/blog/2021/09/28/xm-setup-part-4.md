---
title: Sitecore XM シリーズ - Sitecore Headless Rendering インストール
date: '2021-09-28'
tags: ['Sitecore','Install','Headless','XM']
draft: true
summary: 今回は Sitecore Experience Manager (XM) の環境にヘッドレスのモジュールをインストールする手順を紹介していきます。すでに紹介したように、XM をインストールアシスタントを利用してインストールをすると、 CM / CD と分かれた環境が展開されます。この環境で、Sitecore ヘッドレスに関するモジュールをインストールする手順を紹介していきます。
images: ['/static/images/2021/09/macos11.png']
---

今回は Sitecore Experience Manager (XM) の環境にヘッドレスのモジュールをインストールする手順を紹介していきます。すでに紹介したように、XM をインストールアシスタントを利用してインストールをすると、 CM / CD と分かれた環境が展開されます。この環境で、Sitecore ヘッドレスに関するモジュールをインストールする手順を紹介していきます。

手順に関しては、以下の JSS のサイトの紹介に沿って進めていく形です。

* [JSS Server Setup](https://jss.sitecore.com/docs/client-frameworks/getting-started/jss-server-install)

## 前提条件

今回はこれまで紹介をしてきた環境をそのまま使います。このため、以下の環境が基本となります。

* Sitecore 10.1.1 
    * XM1 の構成（CD / CM を分離）している構成

インストールは以下のモジュールを利用します。

* [Sitecore Headless Rendering 18.0.0](https://dev.sitecore.net/Downloads/Sitecore_Headless_Rendering/18x/Sitecore_Headless_Rendering_1800.aspx)

## モジュールのダウンロード & インストール


