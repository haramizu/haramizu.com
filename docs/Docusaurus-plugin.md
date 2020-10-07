---
id: Docusaurus-plugin
title: プラグインの追加
sidebar_label: プラグインの追加
description: ここでは、Docusaurus を利用しているサイトに関して Google Analytics およびサイトマップを追加するためのプラグイン実装について紹介しています。
slug: /Docusaurus/plugin
---

ここではサイトを運用していく上ではやっておいた方がいい手順、ということで Google Analytics およびサイトマップを追加するためのプラグイン実装について紹介しています。

手順に関しては、公式サイト https://v2.docusaurus.io/docs/using-plugins/ に記載されています。ここではこのページの中から、抜粋した内容となります。

## Google Analytics プラグインのインストール

Google Analytics 連携ができるプラグインは、公式プラグインとして提供されています。プラグインとしては、 `@docusaurus/plugin-google-gtag` を利用します。

プラグインのインストールは以下の通りです。

:::tip

すでに package.json の中に `@docusaurus/preset-classic` が含まれている場合はプラグインのインストールは不要です。

:::

```
yarn add @docusaurus/plugin-google-gtag
```

私の環境では `@docusaurus/preset-classic` がすでにセットアップされているので、`docusaurus.config.js` ファイルで定義している themeConfig に対して以下のコードを追加しただけとなります。

``` javascript
module.exports = {
  themeConfig: {
    gtag: {
      trackingID: 'UA-yourGAcode',
      // Optional fields.
      anonymizeIP: true, // Should IPs be anonymized?
    },
  },
};
```

これで Google Analytics のタグが埋め込まれました。

## sitemap.xml の追加

サイトマップを追加する場合も以下のようプラグインをインストールします。

:::tip

すでに package.json の中に `@docusaurus/preset-classic` が含まれている場合はプラグインのインストールは不要です。

:::

```
$ yarn add @docusaurus/plugin-sitemap
```

`docusaurus.config.js` ファイルで定義している presets: の中に以下のコードを１行追加するだけです。

```javascript
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        // 略
        sitemap: {},
      },
    ],
  ],
```

サイトの /sitemap.xml アクセスすると、サイトマップのファイルが表示されます。

## 参考記事

* [Plugins](https://v2.docusaurus.io/docs/using-plugins/)