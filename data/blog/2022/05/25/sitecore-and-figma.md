---
title: Sitecore とデザインツール Figma の連携
date: '2022-05-25'
tags: ['Figma', 'Headless']
draft: false
summary: 今回は少し趣向を凝らして、デザインツールの Figma との連携について紹介をします。このツールはブラウザ上で動作する Web サイトのデザインツールで、無料でも使うことができるようになっています。近々日本語版もリリースされるそうです。最初に Figma で簡単なコンポーネントを作成して、Sitecore のヘッドレスと連携して GraphQL からデータを取得、デザインに反映させるための手順を簡単に紹介します。
images: ['/static/images/2022/05/figma16.png']
---

今回は少し趣向を凝らして、デザインツールの Figma との連携について紹介をします。このツールはブラウザ上で動作する Web サイトのデザインツールで、無料でも使うことができるようになっています。近々日本語版もリリースされるそうです。最初に Figma で簡単なコンポーネントを作成して、Sitecore のヘッドレスと連携して GraphQL からデータを取得、デザインに反映させるための手順を簡単に紹介します。

- [デザインコラボツール「Figma」日本語版リリースへ　日本法人設立](https://www.itmedia.co.jp/news/articles/2203/17/news096.html)

## Figma のアカウントを作成する

Figma の公式サイトは以下の通りです。.jp は別のサイトが立ち上がっているので、.com でアクセスをしてください。

- https://www.figma.com

![figma](/static/images/2022/05/figma01.png)

右上に Sign up のボタンがありますが、今回は無料プランを選択するために Pricing のページを開きます。価格一覧には、`Starter` というプランが表示されており、**Choose Starter** のボタンをクリックして進めていくことができます。

![figma](/static/images/2022/05/figma02.png)

最初にログインをするためのメールアドレスとパスワードの登録、続いて名前と職種の確認が表示されます。併せて、メーリングリストに参加するかどうかのチェックボックスに関しては必要に応じてチェックするかどうかを決めて、**Create account** のボタンをクリックしてください。

ボタンを押した後しばらくすると、メールアドレスに対してアドレスが正しいかどうかの認証のメールが届きます。メールにある認証のための URL をクリックすれば、アカウントの作成が完了となります。

![figma](/static/images/2022/05/figma03.png)

## Figma でコンポーネントを作成する

今回の検証用のコンポーネントを Figma で作成をします。管理画面で、`New design file` をクリックして新しいデザインファイルを作成します。今回は画像は変更しませんが、テキストを２箇所、配置してそれっぽいものを作成します。

![figma](/static/images/2022/05/figma04.gif)

## Plug-in をインストールする

今回はサーバーから JSON のデータを読み込む連携が可能なプラグインとして Data Sync を利用します。インストールをする際には、以下のページにアクセスをして、Install のボタンをクリックする形です。

- [Data Sync](https://www.figma.com/community/plugin/784880696244762700/Data-Sync)

![figma](/static/images/2022/05/figma05.png)

メニューから Plug-in 一覧に Data Sync が表示されていれば、プラグインのインストールは完了しています。

![figma](/static/images/2022/05/figma06.png)

## Sitecore の管理画面で検証

このステップは省略して、次の Postman のステップに進んでもらっても問題ありません。ここで確認しているのは、Sitecore の管理画面で提供されているツールを利用して、データを取得することができるのかの確認です。ヘッドレスモジュールや API キーなどが準備できていない場合は、この手順を進めることができません。設定の方法は以下のページを参考にしてください。

- [Sitecore XM シリーズ - Sitecore Headless Rendering インストール](/blog/2021/09/29/xm-setup-part-4)
- [Sitecore Headless - GraphQL UI の利用](/blog/2022/02/24/sitecore-graphql-ui)

環境が整備されているのを前提として、サーバーの URL に `/sitecore/api/graph/edge/ui` を追加してアクセスします。アクセスをすると GraphQL を利用して結果を確認することができる管理画面をが表示されます。

![figma](/static/images/2022/05/figma07.png)

左下の HTTP Headers にはサイトにアクセスするための API キーを記載してください。

```json
{
  "sc_apikey": "your api key"
}
```

続いて、左上の GraphQL を入力するところは、以下のコードを入力してください。なお、環境によっては `path` やアイテム名、フィールド名を変更する必要があります。

```graphql
query {
  item(path: "/sitecore/content/sitecoredemo-jp/home", language: "en") {
    ... on Home {
      pageTitle {
        value
      }
    }
    field(name: "pageTitle") {
      ... on TextField {
        value
      }
    }
  }
}
```

上記のコードを設定して実行すると、以下の Json が返ってきました。

```json
{
  "data": {
    "item": {
      "pageTitle": {
        "value": "Home Sample Update 1 "
      },
      "field": {
        "value": "Home Sample Update 1 "
      }
    }
  }
}
```

![figma](/static/images/2022/05/figma08.png)

コンテンツエディターで対象のアイテムを参照すると、ページタイトルを正しく取得できていることが確認できます。

![figma](/static/images/2022/05/figma09.png)

## Postman で検証

今度は別の環境からデータを取得することができるのかを確認するために、Postman を利用してアクセスをします。まず、新しい設定を追加して、メソッドを `POST` に、URL は GraphQL のエンドポイントになるため、先ほど利用していた管理画面から /ui を削除したサーバー名を設定します。API キーに関しては、Headers のタブを開いて、キーを設定します。ここまで進んでいる画面は以下のようになります。

![figma](/static/images/2022/05/figma10.png)

Body では GraphQL の値を指定して、前回と同じクエリ文を設定します。

```graphql
query {
  item(path: "/sitecore/content/sitecoredemo-jp/home", language: "en") {
    ... on Home {
      pageTitle {
        value
      }
    }
    field(name: "pageTitle") {
      ... on TextField {
        value
      }
    }
  }
}
```

実行した結果として同じデータが表示されていれば、外部からのアクセスで Json のデータを取得することが可能となっている状況です。

![figma](/static/images/2022/05/figma11.png)

## Figma で Json データを割り当てる

ここで改めて Figma に戻ります。メニュー画面からプラグインの Data Sync を選択するとダイアログが表示されます。今回は Load のところで、Postman で取得している JSON のデータを入れます。

![figma](/static/images/2022/05/figma12.png)

Load を実行すると、Json データの中からコンテンツの要素がダイアログで表示されるようになります。

![figma](/static/images/2022/05/figma13.png)

それぞれの値を、コンポーネントの要素に割り当てていきます。

![figma](/static/images/2022/05/figma14.gif)

JSON のデータの割り当てができました。

## Figma から Sitecore のデータを読み込む

続いて Sitecore からデータを取得したいと思います。Load の画面に移動して New のメニューを選択して、サーバーのエンドポイントを記載してください。そして API Request Options を開いて、API キーおよび Query を設定します。Query ではダブルクォーテーションをそのまま利用するのはエラーになるため、バックスラッシュを追加して、改行がない形で作成をします。以下が参考のコードです（ API キーや Path などは必要に応じて変更してください）。

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

![figma](/static/images/2022/05/figma15.png)

Load ボタンをクリックしてしばらくすると読み込みができ、アイテムのデータを割り当てることができるようになっています。

![figma](/static/images/2022/05/figma16.png)

## まとめ

ヘッドレスで JSON のデータを取得することができるのであれば、Figma などの別のツールでコンテンツを利用して展開することが簡単になります。サイトのデザインを実施する場合に Figma を利用してデザインを作成し、Sitecore が管理する部分に実際のデータを入れて作業をする、ということがこれで可能となります。
