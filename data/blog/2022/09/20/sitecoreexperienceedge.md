---
title: Experience Edge を利用して Vercel に展開する
date: '2022-09-20'
tags: ['Headless', 'Next.js', 'Vercel']
draft: true
summary: これまでサーバーとして Sitecore を仮想マシンとして起動していましたが、エンドポイントとして Sitecore Experience Edge というサービスを展開しており、これを利用することで Next.js のアプリを Vercel に簡単に展開することができます。今回はその展開手順に関して紹介をします。
images: ['/static/images/2022/09/vercel11.png']
---

これまでサーバーとして Sitecore を仮想マシンとして起動していましたが、エンドポイントとして Sitecore Experience Edge というサービスを展開しており、これを利用することで Next.js のアプリを Vercel に簡単に展開することができます。今回はその展開手順に関して紹介をします。

## 前提条件

今回は以下のような環境が整っているとします。

- Sitecore Experience Managar にコンテンツの展開をしていr
- Next.js のプロジェクトに関しては GitHub に同期している
- Sitecore Experience Manager は Sitecore Experience Edge と連携している

Sitecore Experience Edge は Sitecore が提供する SaaS のサービスで、Sitecore Experience Manager/Platform でヘッドレスで実装する際に利用可能なサービスです。これを利用することで、コンテンツ管理サーバーからコンテンツを公開すると、Experience Edge を通じて外部にコンテンツを公開することができます。

- [Sitecore Experience Edge for XM](https://doc.sitecore.com/xp/en/developers/101/developer-tools/sitecore-experience-edge-for-xm.html)
- [画期的なSitecore Experience Edgeが登場](https://www.sitecore.com/ja-jp/blog/content/were-thrilled-to-announce-groundbreaking-sitecore-experience-edge)

## Vercel に展開する

Sitecore Experience Manager でページの編集ができるようになっている状況を前提としているため、今回は Experience Edge と Vercel を接続する手順を紹介します。

なお、Experience Manager から Experience Edge には該当するコンテンツの Publish が完了していることとします。

まず最初に、連携している GitHub のリポジトリを指定します。今回は Sitecoredemo-sxa を選択します。

![vercel](/static/images/2022/09/vercel07.png)

Root Directory として Next.js が展開しているディレクトリを指定してください。

![vercel](/static/images/2022/09/vercel08.png)

Environment Value としては以下の３つの項目が必要となります。

| 項目              | 値                                                |
|-------------------|---------------------------------------------------|
| SITECORE_API_KEY  | 提供されている Experience Edge にアクセスするキー |
| JSS_APP_NAME      | Next.js の Package.json に指定しているアプリ名    |
| GRAPH_QL_ENDPOINT | 提供されている Experience Edge のエンドポイント |

![vercel](/static/images/2022/09/vercel09.png)

上記の設定が完了したところで Deploy ボタンをクリックすると展開します。

![vercel](/static/images/2022/09/vercel10.png)

しばらくすると、展開が完了して以下のように画面が切り替わります。

![vercel](/static/images/2022/09/vercel11.png)

## まとめ

Sitecore Experience Edge を利用することで、ヘッドレスでサイトを展開する際のサービスを SaaS 化することができます。そして Vercel に展開することで、Web サイト自体をサーバーレスの環境で展開しつつ、コンテンツが更新されればサイトの更新ができるようになります。