---
title: Sitecore Content Hub ONE - コンテンツ形式
date: '2023-03-02'
tags: ['Content Hub ONE']
draft: false
summary: Sitecore Content Hub ONE （以下 Content Hub ONE）の最初のステップはコンテンツの構造を決めるところです。コンテンツの構造で関係性を持たせることもできるため、最初のステップとして幾つかのコンテンツのタイプを今回は定義していきます。
images: ['/static/images/2023/03/chone09.png']
---

Sitecore Content Hub ONE （以下 Content Hub ONE）の最初のステップはコンテンツの構造を決めるところです。コンテンツの構造で関係性を持たせることもできるため、最初のステップとして幾つかのコンテンツのタイプを今回は定義していきます。

今回のデモではブログを作っていく感じで作成していきます。

## ブログ記事

簡単なブログを掲載できる様に、ブログ記事のためのコンテンツ形式を作成します。まず、タイプを追加します。

![content type](/static/images/2023/03/chone02.png)

するとフィールドを定義するための画面に切り替わります。

![content type](/static/images/2023/03/chone03.png)

Add field をクリックすると以下のタイプが表示されます。

![content type](/static/images/2023/03/chone04.png)

今回は Text を選択してタイトルとして定義します。項目は必須項目です。

![content type](/static/images/2023/03/chone05.png)

右上にある Save ボタンをクリックすると、設定をしたフィールドが項目として定義されます。

![content type](/static/images/2023/03/chone06.png)

ブログに必要な項目をいくつか追加していきます。仕上がりは以下の様な形です。

![content type](/static/images/2023/03/chone07.png)

## 製品の管理

上記のブログを書く際に、どの製品のブログなのか？というのをわかる様にするために製品一覧のコンテンツ形式も作成したいと思います。手順は上記ですでに紹介していますので、以下の様な形で仕上げます。

![content type](/static/images/2023/03/chone08.png)

この項目をブログの関連データとして設定できる様にしたいと思います。そこで改めてブログのコンテンツ形式を開き、追加のフィールドを定義します。追加したフィールドは Reference タイプで、product としました。

![content type](/static/images/2023/03/chone09.png)

これで、ブログ記事で製品を選択できる様になりました。

## まとめ

今回はブログの記事、それと関連する製品一覧を管理するためのコンテンツ形式を定義しました。次回は今回作成をしたコンテンツ形式を利用して、コンテンツの登録をしていきます。
