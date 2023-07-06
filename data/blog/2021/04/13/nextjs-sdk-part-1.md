---
title: Sitecore JSS - Next.js SDK を利用してサンプルサイトを構築 - Part.1
date: '2021-04-13'
tags: ['JSS', 'Next.js']
draft: true
summary: Sitecore 10.1 から Sitecore Headless Service は標準機能として提供することになりました。合わせて静的サイトに対応した React ベースの Next.js の SDK もリリースをしました。今回から数回に分けて、Next.JS SDK を利用してサンプルサイトを構築する手順をブログでシリーズ化して紹介をしていきます。
images: ['/static/images/2021/04/jsssetup02.png']
---

Sitecore 10.1 から Sitecore Headless Service は標準機能として提供することになりました。合わせて静的サイトに対応した React ベースの Next.js の SDK もリリースをしました。今回から数回に分けて、Next.JS SDK を利用してサンプルサイトを構築する手順をブログでシリーズ化して紹介をしていきます。

## 前提条件

前提条件として、Sitecore Experience Platform の基本的な作業を理解していること、JavaScript を利用したサイト構築に関しての知識を持っていること、という形となります。このブログでは Step by Step で紹介をしていきますので、手順をみて理解してもらうのを目的としていますが、応用する際には上記の知識が必要となります。

以下の作業をする上での環境は以下の通りです。

- OS: Windows 10 以降、macOS
- NodeJs 14.x

## サンプルの実行

まずサンプルが動作しなければ意味がありませんので、サンプルのダウンロード、実行をします。

- [Walkthrough: Using the JSS CLI to Get Started with JSS and Next.js](https://doc.sitecore.com/xp/en/developers/hd/190/sitecore-headless-development/walkthrough--creating-a-jss-next-js-application-with-the-jss-cli.html)

初めて Sitecore JSS を利用する際にはコマンドラインをインストールする必要があります。以下の様なコマンドとなります。

```
npm install -g @sitecore-jss/sitecore-jss-cli
```

![jsssetup](/static/images/2021/04/jsssetup01.png 'jsssetup')

これで **jss** というコマンドを利用できるようになります。コマンドを利用して、Next.js のテンプレートをダウンロードをします。

```
jss create nextjs-app nextjs
```

![jsssetup](/static/images/2021/04/jsssetup02.png 'jsssetup')

テンプレートのコピーが終わったら、フォルダを移動して、サンプルアプリを実行します。

```
cd nextjs-app
jss start
```

![jsssetup](/static/images/2021/04/jsssetup03.png 'jsssetup')

上記の画面まで表示されれば、サイトにアクセスできるようになります。 http://localhost:3000 にアクセスすると、以下の様な画面となります。

![jsssetup](/static/images/2021/04/jsssetup04.png 'jsssetup')

これでサンプルが手元で動く様になりました。

## テンプレートのコンテンツを削除する

サンプルには Styleguide や GraphQL に関する利用方法の文書がサンプルとして入っています。スタイルガイドを利用することで、Sitecore Experience Platform のフィールドに関しての記載方法が含まれていますので、

```
How to start with an empty app
To remove all of the default sample content (the Styleguide and GraphQL routes) and start out with an empty JSS app:

Delete /src/components/Styleguide* and /src/components/GraphQL*
Delete /sitecore/definitions/components/Styleguide*, /sitecore/definitions/templates/Styleguide*, and /sitecore/definitions/components/GraphQL*
Delete /data/component-content/Styleguide
Delete /data/content/Styleguide
Delete /data/routes/styleguide and /data/routes/graphql
Delete /data/dictionary/*.yml
```

上記のデータを削除していきますが、Next.js のテンプレートは以下の追加作業が必要です。

- 次のフォルダを削除 /src/components/fields\*
- 以下の２つに関してはそのまま保存しておきます。
  - /src/components/graphql/GraphQL-ConnectedDemo.graphql
  - /sitecore/definitions/components/graphql/GraphQL-IntegratedDemo.sitecore.graphql

削除完了後に jss start を利用して実行すると、以下の画面のように右上のナビゲーションが削除されているのがわかります。

![jsssetup](/static/images/2021/04/jsssetup05.png 'jsssetup')

## 日本語のコンテンツの作成、切り替え

JSS のテンプレートでは英語、デンマーク語のサンプルがありますが、日本語のサンプルデータはありません。そこで、新しいファイルを作成して、日本語のデフォルトのコンテンツを準備していきます。

nextjs-app/data/routes/ja-jp.yml の新しいファイルを作成して、以下のコンテンツを yml ファイルに記載してください。

```yaml
name: home
id: home-page
displayName: ホーム

fields:
  pageTitle: ようこそ Sitecore JSS

placeholders:
  jss-main:
    - componentName: ContentBlock
      fields:
        heading: ようこそ Sitecore JSS
        content: |
          <p>サンプル</p>
```

続けて日本語リソースを認識できるように、設定を２つ変更します。

next.config.js のファイルに日本語のロケールとして、 ja-JP を追加します。

```json
  i18n: {
    // These are all the locales you want to support in your application.
    // These should generally match (or at least be a subset of) those in Sitecore.
    locales: ['en', 'da-DK','ja-JP'],
    // This is the locale that will be used when visiting a non-locale
    // prefixed path e.g. `/styleguide`.
    defaultLocale: packageConfig.language,
  },
```

続いて package.json に記載されている以下の言語の設定を en から ja-JP に変更します。

```json
  "config": {
    "appName": "nextjs-app",
    "rootPlaceholders": [
      "jss-main"
    ],
    "sitecoreConfigPath": "/App_Config/Include/zzz",
    "graphQLEndpointPath": "/sitecore/api/graph/edge",
    "language": "ja-JP"
  },
```

jss start でサンプルを実行すると、以下の様な画面となります。

![jsssetup](/static/images/2021/04/jsssetup06.png 'jsssetup')

これで日本語のページが表示される Next.js のサンプルのベースができました。

ここまでの手順に関しては、以下のリポジトリの Step-1 のブランチで参照することができます。

- [github.com/haramizu/nextjs-app](https://github.com/haramizu/nextjs-app/tree/step-1)

[次回に続く](/blog/2021/04/16/nextjs-sdk-part-2)
