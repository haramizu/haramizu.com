---
id: Docusaurus-docs
title: ドキュメントを追加する
sidebar_label: ドキュメントを追加する
description: ここでは、Docusaurus を利用しているサイトに関して 新しいドキュメントを追加する方法を紹介します。
slug: /Docusaurus/docs
---

ここでは追加のページの作成方法について紹介をします。

## ファイルを追加する

まず最初に markdown ファイルを docs の下に作成をします。例えば、新しいファイルとして作成するものを `Docusaurus.md` のファイルをします。

新規に作成したファイルに関して、以下の４つの項目を最初に定義してください。id にはファイル名から .md を削除したものを設定します。

```
---
id: document-id
title: ページのタイトル
sidebar_label: サイドバーに配置するラベル
slug: URL を指定する
---
```

ファイルを作成したあと、`docs` の配下のコンテンツで左側のメニューに記載したい場合、次のステップのサイドバーの設定を参照してください。

## Markdown で記述する

.md ファイルに関しては、markdown 形式でコンテンツを書いていきます。記述方法に関しては、サンプルで提供している Style Guide の記述を参考にしながら、記述してください。

* [スタイルガイド](Docusaurus-style-guide.md)

Markdown として特別なコードの書き方がある形ではありませんので、日頃 Markdown を利用している人にとっては便利です。
