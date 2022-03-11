---
title: Sitecore Headless - カスタムコンポーネントの作成
date: '2022-02-28'
tags: ['Sitecore','Headless']
draft: true
summary: ページを作成していく際に、コンポーネントの配置をすることができるエリアとして Placeholder を作成して配置することで、コンテンツをページの場所に貼り付けたり、同じコンテンツを複数のページで利用したりということが簡単にできるようになります。今回はこの Placeholder の作成方法を紹介していきます。
images: ['/static/images/2022/02/release27.png']
---

ページを作成していく際に、コンポーネントの配置をすることができるエリアとして Placeholder を作成して配置することで、コンテンツをページの場所に貼り付けたり、同じコンテンツを複数のページで利用したりということが簡単にできるようになります。今回はこの Placeholder の作成方法を紹介していきます。

## Placeholder の考え方

Web ページにコンポーネントを配置したい場合のエリアを指定する仕組みとして Placeholder というのがあります。たとえばページのエリアでバナーエリア、コンテンツエリアという形で指定をしたい場合は、以下のように名前を付けて設定をすることができます。

![Placeholder](/static/images/2022/02/placeholder01.png)

また Placeholder に関しては階層化することができ、placeholder の中に placeholder を指定することも可能です。

![Placeholder](/static/images/2022/02/placeholder02.png)

この仕組みを利用することで Web ページを分割してブロック単位でのコンテンツ管理が可能になるという形です。

## Placeholder の追加方法

前回の記事で紹介をした環境をまずは確認します。すでにインポート済みの **/sitecore/layout/Placeholder Settings/Project/sitecoredemo-jp** のフォルダの下に、Placeholder が設定されています。

![Placeholder](/static/images/2022/02/placeholder03.png)

ここに記載されているプレースホルダーは以下の通りです。

* jss-graphql-layout
    * sitecore/definitions/components/graphql/GraphQL-Layout.sitecore.ts
* Main
    * sitecore/definitions/placeholders.sitecore.ts
* Tabs
    * sitecore/definitions/placeholders.sitecore.ts




