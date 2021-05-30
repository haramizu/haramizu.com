---
title: Docusaurus - プロジェクトを起動する
date: '2021-06-03'
tags: ['Docusaurus']
draft: true
summary: プロジェクトができたところで、実際に手元で起動するところまで進めていきます。
images: ['/static/images/docusause/edittext.gif']
---

プロジェクトができたところで、実際に手元で起動するところまで進めていきます。

## ディレクトリ構造を確認する

コマンドを利用してプロジェクトを作成したあとのディレクトリ構成は、以下のようになっています。

<img src="/docs/img/docusause/initialfiles.png" alt="drawing" width="250"/>

## ローカルで実行する

ファイルが配置された段階で、以下のコマンドを実行します。

```
yarn start
```

しばらくすると、Node.js のインスタンスが起動してブラウザの画面にページが表示されます。

![img](/static/images/docusause/yarnstart.gif)

### ファイルの中身を変更する

上記のようにコマンドを実行して、ブラウザでページを表示したままコードを書き換えてみましょう。まず、メニューの **Docs** を選択して、Style Guide のページに移動します。

![img](/static/images/docusause/styleguide.png)

続いて、docs フォルダにある `doc1.md` を開いてください。

![img](/static/images/docusause/opendoc1.png)

ここで、ページのタイトル、およびサイドメニューのタイトルを変更します。`doc1.md` のファイルの最初の定義は以下のようになっています。

```
---
id: doc1
title: Style Guide
sidebar_label: Style Guide
slug: /
---
```

これを以下のように書き換えて

```
---
id: doc1
title: スタイルガイド
sidebar_label: スタイルガイド
slug: /
---
```

保存をすると、ブラウザの表示が変わることがわかります。

![img](/static/images/docusause/edittext.gif)

Visual Studio Code の markdown のプレビュー機能を利用しながらページを作成していくのも非常に便利ですが、合わせてサイトの仕上がりに関してローカルで確認することができます。ファイルを保存したタイミングで、新しいデータを読み込んで表示する形になります。