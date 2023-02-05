---
title: Headless SXA でデモサイトを構築する - Part 3 パーシャルデザインの作成 - ヘッダーの作成 その２
date: '2023-02-09'
tags: ['XM Cloud', 'XM', 'Headless SXA']
draft: true
summary: 前回はヘッダーエリアに３つのコンテナーを配置して、そのうち2つに関してのバックグランドの色を変更しました。今回は一番上に配置したコンテナーにメンニューの項目を配置していきたいと思います。
images: ['/static/images/2023/02/header25.png']
---

前回はヘッダーエリアに３つのコンテナーを配置して、そのうち 2 つに関してのバックグランドの色を変更しました。今回は一番上に配置したコンテナーにメンニューの項目を配置していきたいと思います。

## コンテナを被せる

一番上のコンテナに対して、改めてコンテナを被せていきます。この理由は次回紹介する記事で説明をします。まずはコンテナを配置して、下記のように階層化されている状況にしてください。なお、バックグラウンドの色と横幅の設定は 1 つ上のコンテナと同様に設定をします。

![header](/static/images/2023/02/header13.png)

このコンテナの上に、今度は Culumn Splitter のコンポーネントを配置します。

![header](/static/images/2023/02/header14.gif)

Column Splitter のコンポーネントの設定ですが、以下の様にしてください。

- Row Column を 1 つ追加します
- Component Layout に関しては Basic タグで Compact Phones の項目を 12 と設定
- Column 1 layout の Basic に、Compact Phones 6、Laptops 2、Large Desktops 1 とします
- Column 2 layout の Basic に、Compact Phones 6、Laptops 5、Large Desktops 5 とします
- Column 3 layout の Basic に、Compact Phones は空欄、Laptops 5、Large Desktops 6 とします

これで一番左にロゴのエリアを、中央にテキストエリア、右側にボタンエリアを作りました。

![header](/static/images/2023/02/header15.gif)

## 各種コンポーネントの配置

スプリッターで分割したあと、左から順にロゴ、テキスト、ボタンを設定していきます。まず最初に、一番左のエリアに Image コンポーネントを配置して、ロゴを表示します。

![header](/static/images/2023/02/header16.png)

続いて中央のコンテナ部分にはリッチテキストのコンポーネントを配置して以下の HTML を設定します。

```html
<h1 style="color:white; padding-top:25px;">Sitecore XM Cloud</h1>
```

![header](/static/images/2023/02/header17.png)

もう一度 Rich Text コンポーネントを今度は右側のエリアに配置します。コンテンツは以下のコードを設定します。また配置する場所を右側に寄せます。

```html
<a
  style="background-color: #676767;padding: 10px 35px;color: white;text-align: center;width: fit-content; float:right;"
  href="/alert"
  >Newsletter</a
>
```

![header](/static/images/2023/02/header18.gif)

これでヘッダーエリアの作成ができました。

## コンテンツを追加する

続いてメニューを作成したいので、ひとまずコンテンツツリーの構成を作成します。今回は以下の様に作成をします。

- Products
  - Content Cloud
  - Engagement Cloud
  - Commerce Cloud
- Showcase
- Services

既存のアイテムとしては About が一番下に来る様にします。作成および完了を次の画像で展開しています。

![header](/static/images/2023/02/header19.gif)

## ナビゲーションコンポーネントの配置

ナビゲーションコンポーネントを配置する前に、上記の手順と同様にコンテナを被せて配置してください。

![header](/static/images/2023/02/header20.png)

あとはここにナビゲーションをドラッグアンドドロップで配置します。

![header](/static/images/2023/02/header21.png)

メニューが展開されている状況のため、設定を変更します。メニューを選択して左から 2 つ目のアイコンをクリックします。ここで、今回は Main Navigation - Drop down vertical がチェックされているのを確認してください。

![header](/static/images/2023/02/header22.png)

設定を完了させると、これでメニューが表示されました。

![header](/static/images/2023/02/header23.png)

## ページデザインの変更

現在のサイトはサンプルデータが入っており、Default というページデザインがあります。このページデザインのヘッダーを今回作成したヘッダーに切り替えます。

まず、 `/sitecore/content/sitecoredemo-jp/sitecoredemo-jp/Presentation/Page Designs/Default` のアイテムを選択します。ページデザインとして、どのパーシャルデザインを利用するのかが記載されています。これを Header を削除して Demo Header に入れ替えます。

![header](/static/images/2023/02/header24.png)

これでサンプルページを表示してください。上記のようにヘッダーが切り替わっていることがわかります。

![header](/static/images/2023/02/header25.png)

## まとめ

今回はブランドに関する部分を記載することができるようにヘッダーの部分を少し変更をしました。またコンテンツツリーをメニューで再現させるために、新しいコンテンツを入れていきました。次回はまだ手をつけていない 3 つ目のコンテナを活用してヘッダーを完成させます。
