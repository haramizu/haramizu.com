---
title: Docusaurus - プラグインの追加とサイドバー
date: '2021-06-07'
tags: ['Docusaurus']
draft: true
summary: ここではサイトを運用していく上ではやっておいた方がいい手順、ということで Google Analytics およびサイトマップを追加するためのプラグイン実装について紹介しています。
images: ['/static/images/docusause/sidebars.png']
---

ここではサイトを運用していく上ではやっておいた方がいい手順、ということで Google Analytics およびサイトマップを追加するためのプラグイン実装について紹介しています。また後半ではサイドバーの編集方法に関して紹介をします。

手順に関しては、公式サイト https://docusaurus.io/docs/using-plugins/ に記載されています。ここではこのページの中から、抜粋した内容となります。

## Google Analytics プラグインのインストール

Google Analytics 連携ができるプラグインは、公式プラグインとして提供されています。プラグインとしては、 `@docusaurus/plugin-google-gtag` を利用します。

プラグインのインストールは以下の通りです。

**Tips** すでに package.json の中に `@docusaurus/preset-classic` が含まれている場合はプラグインのインストールは不要です。

```
yarn add @docusaurus/plugin-google-gtag
```

私の環境では `@docusaurus/preset-classic` がすでにセットアップされているので、`docusaurus.config.js` ファイルで定義している themeConfig に対して以下のコードを追加しただけとなります。

```javascript
module.exports = {
  themeConfig: {
    gtag: {
      trackingID: 'UA-yourGAcode',
      // Optional fields.
      anonymizeIP: true, // Should IPs be anonymized?
    },
  },
}
```

これで Google Analytics のタグが埋め込まれました。

## sitemap.xml の追加

サイトマップを追加する場合も以下のようプラグインをインストールします。

**Tips** すでに package.json の中に `@docusaurus/preset-classic` が含まれている場合はプラグインのインストールは不要です。

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

## sidebars.js の変更

今回は、Docusaurus に関するドキュメントを複数のページに分けて作っています。このため、以下のファイルをサイドバーに追加していきます。

- Docusaurus.md
- Docusaurus-yarn-start.md
- Docusaurus-site-settings.md
- Docusaurus-plugin.md
- Docusaurus-side-bars.md
- Docusaurus-docs.md
- Docusaurus-blog.md
- Docusaurus-style-guide.md
- Docusaurus-github"

デフォルトの値は sidebars.js の中身は以下のような状態です。

```javascript
module.exports = {
  someSidebar: {
    Docusaurus: ['doc1', 'doc2', 'doc3'],
    Features: ['mdx'],
  },
}
```

![img](/static/images/docusause/sidebar-before.png)

基本的には .md ファイルに定義されている id を並べる形となっています。このため、今回は以下のように書き換えます。

```javascript
module.exports = {
  someSidebar: {
    Docusaurus: [
      'Docusaurus',
      'Docusaurus-yarn-start',
      'Docusaurus-site-settings',
      'Docusaurus-plugin',
      'Docusaurus-side-bars',
      'Docusaurus-docs',
      'Docusaurus-blog',
      'Docusaurus-style-guide',
      'Docusaurus-github',
    ],
    Features: ['mdx'],
  },
}
```

上記のように変更をすると、左側のメニューに対して各 Markdown のファイルで定義した sidebar_label を利用してメニューが作成されます。

![img](/static/images/docusause/sidebars.png)

注意点としては、 `slug:` で他の Markdown ファイルで定義が被らないようにすること、また `id:` に関しても同様に被らないようにしないといけません。ファイル名と `id` は揃える必要はありませんが、別にして作っていくと対象のコンテンツを見つけるのが難しくなるので、合わせることを推奨します。

## 参考情報

- [Plugins](https://docusaurus.io/docs/using-plugins/)
