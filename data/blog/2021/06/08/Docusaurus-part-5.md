---
title: Docusaurus - サイドバーの設定
date: '2021-06-08'
tags: ['Docusaurus']
draft: true
summary: Docusaurus にコンテンツを追加していく場合は、 sidebars.js のファイルにドキュメントを追加していきます。
images: ['/static/images/docusause/sidebars.png']
---

Docusaurus にコンテンツを追加していく場合は、 `sidebars.js` のファイルにドキュメントを追加していきます。

## sidebars.js の変更

今回は、Docusaurus に関するドキュメントを複数のページに分けて作っています。このため、以下のファイルをサイドバーに追加していきます。

* Docusaurus.md
* Docusaurus-yarn-start.md
* Docusaurus-site-settings.md
* Docusaurus-plugin.md
* Docusaurus-side-bars.md 
* Docusaurus-docs.md
* Docusaurus-blog.md
* Docusaurus-style-guide.md
* Docusaurus-github"

デフォルトの値は sidebars.js の中身は以下のような状態です。

```javascript
module.exports = {
  someSidebar: {
    Docusaurus: ['doc1', 'doc2', 'doc3'],
    Features: ['mdx'],
  },
};
```
![img](/static/images/docusause/sidebar-before.png)

基本的には .md ファイルに定義されている id を並べる形となっています。このため、今回は以下のように書き換えます。

```javascript
module.exports = {
  someSidebar: {
    Docusaurus: [
      "Docusaurus",
      "Docusaurus-yarn-start",
      "Docusaurus-site-settings",
      "Docusaurus-plugin",
      "Docusaurus-side-bars", 
      "Docusaurus-docs",
      "Docusaurus-blog",
      "Docusaurus-style-guide",
      "Docusaurus-github"
    ],
    Features: ['mdx'],
  },
};
```

上記のように変更をすると、左側のメニューに対して各 Markdown のファイルで定義した sidebar_label を利用してメニューが作成されます。

![img](/static/images/docusause/sidebars.png)

注意点としては、 `slug:` で他の Markdown ファイルで定義が被らないようにすること、また `id:` に関しても同様に被らないようにしないといけません。ファイル名と `id` は揃える必要はありませんが、別にして作っていくと対象のコンテンツを見つけるのが難しくなるので、合わせることを推奨します。
