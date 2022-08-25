---
title: Sitecore Headless 開発、テスト環境の構築 Part 4 - 管理画面の日本語化
date: '2022-08-29'
tags: ['Headless', 'Docker']
draft: true
summary: コンテナの環境を設定したあと、管理画面が英語のままとなっているため、日本語化の手続きを今回紹介をします。今回は Docker のイメージを作成する時にファイルをコピーする形でリソースを展開する手順を紹介します。
images: ['/static/images/2022/08/docker11.png']
---

コンテナの環境を設定したあと、管理画面が英語のままとなっているため、日本語化の手続きを今回紹介をします。今回は Docker のイメージを作成する時にファイルをコピーする形でリソースを展開する手順を紹介します。

## リソースを用意する

日本語リソースに関しては、 https://dev.sitecore.net からダウンロードすることができます。今回利用しているモジュールとしては、以下のリソースをインポートする形となります。

- Sitecore Experience Manager 10.2
- Sitecore Experience Accelerator 10.2
- Sitecore Connect for Content Hub 5.0.0

ファイルをダウンロードした後、次はファイルを展開する形となります。 `docker\build\cm\Data` のフォルダを作成、その下に App_Data のフォルダを作成します。**注意** 前回の記事で Sitecore Content Hub Connector をインストールしている場合は、同じコードが記載されているため不要です。

このフォルダに上記のリソースファイルを展開してください。展開した状況は以下のようになります。

![install](/static/images/2022/08/docker10.png)

## Docker ファイルの編集

上記の用意したファイルをコンテナに展開するために、以下の１行を Docker ファイルに追加してください。

```dockerfile:docker\build\cm\Dockerfile
# Copy CM Resource
COPY .\Data\ .\
```

上記のコマンドで、リソースファイルが CM サーバーのコンテナに展開される形となります。コンテナを build して実行するとファイルが展開されます。日本語化ができた画面は以下の通りです。

![install](/static/images/2022/08/docker11.png)

## まとめ

今回は簡単ではありますが管理画面の日本語化を実践しました。リソースファイルはサーバーの方にも展開しておくと、どちらでも日本語の管理画面を利用できるようになります。