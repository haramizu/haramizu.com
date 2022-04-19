---
title: Sitecore JSS 20.0.0 提供開始
date: '2022-05-09'
tags: ['Headless']
draft: true
summary: Sitecore JavaScript Rendering SDK の新しいバージョンとして 20.0.0 が 4 月にリリースされました。プロジェクトの作り方などが変わりましたので、その点を紹介します。
images: ['/static/images/2022/03/component06.gif']
---

Sitecore JavaScript Rendering SDK の新しいバージョンとして 20.0.0 が 4 月にリリースされました。プロジェクトの作り方などが変わりましたので、その点を紹介します。

## 主な変更点

20.0.0 における主な変更点は以下のとおりです。

- create-sitecore-jss の提供
- Next.js 12 への対応
- Node 16 への対応

その他多くのバグフィックス、機能強化という形です。今回大きな変更は、1 つめの create-sitecore-jss のコマンドとなります。今回はこれを紹介します。

## create-sitecore-jss を利用する

テンプレートを作成する際のコマンドはこれまで `jss create` を利用していました。事前に `jss` コマンドをインストールして利用する形でしたが、今回の変更によりその作業が不要となります。

プロジェクト作成の際には、以下の２パターンでコマンドを利用して実行することができます。

```
npm init sitecore-jss
```

もしくは

```
npx create-sitecore-jss
```

上記のコマンドを実行すると、テンプレートの設定をするための質問が表示されるため、随時実行していきます。
