---
title: Headless SXA でデモサイトを構築する - Part 2 パーシャルデザインの作成 - ヘッダーの作成
date: '2023-02-08'
tags: ['XM Cloud', 'XM', 'Headless SXA']
draft: true
summary: 今回はデモサイトを作る最初の第一歩として、ヘッダーのパーシャルデザインを作りたいと思います。ここで利用するのは標準のコンポーネントを配置して、少し見た目を変えるという感じの簡単な作り方で進めていきます。
images: ['/static/images/2023/01/nextjs03.png']
---

Sitecore の新しいヘッドレス CMS として新たにリリースされる Sitecore Content Hub ONE のデモが提供されました。これのセットアップの手順を今回まとめておきます。

## Content Hub ONE CLI のインストール

まずデモのデータに関しては、シリアライズされたデータ（テキストデータ）が展開されている形です。これをサーバーに展開するために、まずはコマンドラインツールをインストールします。今回の手元の環境は macOS のため、以下の手順です。

```
brew tap sitecore/content-hub
brew install ch-one-cli
```

![content hub one demo](/static/images/2023/02/playone01.png)

Windows や Docker を利用する場合の手順は以下に記載されています。

- [Install and run the Content Hub ONE CLI](https://doc.sitecore.com/ch-one/en/developers/content-hub-one/content-hub-one-cli--install-and-run-the-cli.html)

## シリアライズしたデータのインポート

インポートをするために、Sitecore Content Hub ONE の環境データを取得する必要があります。

```bash
cd serialization
npm install
npm run tenant:add -- -o <organization-id> -t <tenant-id> -ci <oauth-client-id> -cs <oauth-client-secret>
```
