---
id: Docusaurus-plugin
title: プラグインの追加
sidebar_label: プラグインの追加
description: ここでは、Docusaurus を利用しているサイトに関して Google Analytics およびサイトマップを追加するためのプラグイン実装について紹介しています。
slug: /Docusaurus/plugin
---

今回は、Docusaurus を利用しているサイトに関して Google Analytics およびサイトマップを追加するためのプラグイン実装について紹介しています。

## Google Analytics プラグインのインストール

```
yarn add @docusaurus/plugin-google-gtag
```

エラーが表示されます


@docusaurus/preset-classic



Google Analytics を追加する

docusaurus.config.js に対して

```javascript
module.exports = {
  plugins: [
    // Basic usage.
    '@docusaurus/plugin-google-analytics',

    // With options object (babel style)
    [
      '@docusaurus/plugin-sitemap',
      {
        cacheTime: 600 * 1000,
      },
    ],
  ],
};
```

https://v2.docusaurus.io/docs/using-plugins/

サイトマップを追加

```
$ yarn add @docusaurus/plugin-sitemap
```


## 参考記事

* [Plugins](https://v2.docusaurus.io/docs/using-plugins/)