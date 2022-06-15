---
title: Sitecore を AKS に展開する - 環境の準備
date: '2022-06-21'
tags: ['AKS', 'インストール']
draft: true
summary: 今回は Sitecore のガイドに沿って Kubernetes への展開の手順を確認していきます。公式の文書はこのブログ記事を書いている段階で 10.2 が最新版となっていますが、10.1 に関して日本語版も提供しています。ブログでは最新版を紹介するために英語版をベースに進めていきますが、日本語版の記載の違いなどがあればその点も気づいた点があれば記載したいと思います。
images: ['/static/images/2022/06/aks14.png']
---

今回は Sitecore のガイドに沿って Kubernetes への展開の手順を確認していきます。公式の文書はこのブログ記事を書いている段階で 10.2 が最新版となっていますが、10.1 に関して日本語版も提供しています。ブログでは最新版を紹介するために英語版をベースに進めていきますが、日本語版の記載の違いなどがあればその点も気づいた点があれば記載したいと思います。

- [Installation Guide for Production Environment with Kubernetes](https://sitecoredev.azureedge.net/~/media/7C9507580CCC47E385ADAC44CD332418.ashx?date=20220204T132502)
- [Kubernetes を使用した Sitecore 10.1.0 本番環境のデプロイへのインストール ガイド](https://doc.sitecore.com/xp/ja/resources/SC-XP-10.1-Production-Deployment-with%20Kubernetes-JA.pdf) PDF ダウンロード

関連ブログとしては、SB テクノロジーの神村さんが書いています。

- [Sitecore を AKS に展開する](https://www.softbanktech.co.jp/special/blog/dx_station/2021/0037/)

## 今回の目標

今回は XM Scaled (XM1) の環境を Azure Kubernates Service - AKS に展開して環境を整えるところまでとします。
