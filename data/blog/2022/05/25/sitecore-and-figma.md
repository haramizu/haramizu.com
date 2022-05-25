---
title: Sitecore とデザインツール Figma の連携
date: '2022-05-25'
tags: ['Figma', 'ヘッドレス']
draft: true
summary: 今回は少し趣向を凝らして、デザインツールの Figma との連携について紹介をします。このツールはブラウザ上で動作する Web サイトのデザインツールで、無料でも使うことができるようになっています。近々日本語版もリリースされるそうです。最初に Figma で簡単なコンポーネントを作成して、Sitecore のヘッドレスと連携して GraphQL からデータを取得、デザインに反映させるための手順を簡単に紹介します。
images: ['/static/images/2022/03/component06.gif']
---

今回は少し趣向を凝らして、デザインツールの Figma との連携について紹介をします。このツールはブラウザ上で動作する Web サイトのデザインツールで、無料でも使うことができるようになっています。近々日本語版もリリースされるそうです。最初に Figma で簡単なコンポーネントを作成して、Sitecore のヘッドレスと連携して GraphQL からデータを取得、デザインに反映させるための手順を簡単に紹介します。

- [デザインコラボツール「Figma」日本語版リリースへ　日本法人設立](https://www.itmedia.co.jp/news/articles/2203/17/news096.html)

## Figma のアカウントを作成する

公式サイトは以下の通りです。

- https://www.figma.com

![figma](/static/images/2022/05/figma01.png)

右上に Sign up のボタンがありますが、今回は Pricing のページのアクセスをします。価格一覧には、`Starter` というプランが表示されており、**Choose Starter** のボタンをクリックして進めていくことができます。

![figma](/static/images/2022/05/figma02.png)

最初にログインをするためのメールアドレスとパスワードの登録、続いて名前と職種の確認が表示されます。併せて、メーリングリストに参加するかどうかのチェックボックスに関しては必要に応じてチェックするかどうかを決めて、**Create account** のボタンをクリックしてください。

ボタンを押した後しばらくすると、メールアドレスに対してアドレスが正しいかどうかの認証のメールが届きます。メールにある認証のための URL をクリックすれば、アカウントの作成が完了となります。

![figma](/static/images/2022/05/figma03.png)

## Figma でコンポーネントを作成する

## Postman で検証

## Figma から Sitecore のデータを読み込む

https://www.figma.com/community/plugin/784880696244762700/Data-Sync

https://manage.sitecoredemo.jp/sitecore/api/graph/edge

```
{
  "headers":{
      "sc_apikey": "{A8BB7124-A3DD-4CD2-AF81-77A9A3E44227}"
    },
  "query":{
      "query": "query { item(path: \"/sitecore/content/sitecoredemo-jp/Home\", language: \"en\") { ... on Home { pageTitle { value } } field(name: \"pageTitle\") { ... on TextField { value } } } }"
   }
}
```

## まとめ
