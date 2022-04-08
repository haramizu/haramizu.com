---
title: ルートアイテムの作成
date: '2022-04-20'
tags: ['Next.js', 'Headless']
draft: false
summary: これまで Next.js ベースのサンプルとして作成していたアイテムは JSS のサンプルをインポートした時のルートアイテムをベースに作成をしていました。今回はルートアイテムに相当するものを作成する手順を紹介して行きます。
images: ['/static/images/2022/04/route15.png']
---

これまで Next.js ベースのサンプルとして作成していたアイテムは JSS のサンプルをインポートした時のルートアイテムをベースに作成をしていました。今回はルートアイテムに相当するものを作成する手順を紹介して行きます。

## ベース テンプレートを作成する

今回は新しいテンプレートを作成して、今後サイトで管理するためのコンテンツ構造をうまく処理することができるように、テンプレートを作成して行きたいと思います。まず最初に、ベース テンプレートを作成していきます。テンプレートの作成場所は以下のフォルダで作成して行きます。

- /sitecore/templates/Project/sitecoredemo-jp

まずテンプレートフォルダーを作成します。**テンプレートフォルダー**のボタンを押して `Common` フォルダとします。

![route item](/static/images/2022/04/route01.png)

作成したフォルダをしている状態で、**新しいテンプレート** ボタンをクリックします。今回は `Page` という名前を設定します。ベーステンプレートはスタンダードテンプレートのまま進める形で問題ありません。

![route item](/static/images/2022/04/route02.png)

Page テンプレートのフィールド項目として、フィールドセクションは Content とし、pageTitle を Singleline Text、pageContent で RichText フィールドを指定します。

![route item](/static/images/2022/04/route03.png)

続いてコンテンツエディタのメニューからビルダーオプションを選択して、ベーステンプレートを指定します。

![route item](/static/images/2022/04/route04.png)

ベーステンプレートには、テンプレート - ファウンデーション - JavaScript Services の下にある Route を指定します。

![route item](/static/images/2022/04/route05.png)

テンプレートを一度保存して、今度はビルダーオプションのメニューのスタンダードバリューをクリックします。タイトルの項目に $name を指定してスタンダードバリューの設定を完了させます。

![route item](/static/images/2022/04/route06.png)

続いてメタデータ用のテンプレートを作成します。テンプレート名は `_Metadata` とします。

![route item](/static/images/2022/04/route07.png)

フィールドとしては Metadata フィールドセクションを作成し、pageDescription というフィールドを作成しておきます。

![route item](/static/images/2022/04/route08.png)

## テンプレートを作成する

ベーステンプレートを２つ作成したので、続いてホームのテンプレートを作成して行きます。今回は Common のフォルダではなく、`Pages` というフォルダを作成します。

![route item](/static/images/2022/04/route09.png)

続いて Home テンプレートを作成しますが、テンプレートとしてはスタンダードテンプレートのまま作成をしていきます。

![route item](/static/images/2022/04/route10.png)

ベーステンプレートとして、上記２つ作成した `Page` と `_Metadata` を指定してください。

![route item](/static/images/2022/04/route11.png)

ホームアイテムのアイコンは以下のようにネットワークの中にあるアイテムを指定します。

![route item](/static/images/2022/04/route12.png)

これでルートアイテムは完成しました。

## アイテムを作成する

今回作成したテンプレートをベースにアイテムを作成してみます。まず、コンテンツツリーで **/sitecore/content/sitecoredemo-jp** を右クリックして、**挿入** - **テンプレートから挿入** を選択してください。

![route item](/static/images/2022/04/route13.png)

テンプレートから挿入を選択する際に、先ほど作成をした Home テンプレートを指定します。アイテム名は今回は Home Test としました。

![route item](/static/images/2022/04/route14.png)

アイテムが作成されて、タイトルには `$name` が有効になってアイテム名が記載されていることがわかります。

![route item](/static/images/2022/04/route15.png)

## まとめ

新しいテンプレートを作成してアイテムを作成することができるようになりました。今回は `Home` というテンプレートを作成しました形です。次回からはこのテンプレートを表示するためのレイアウトの設定や設定を進めて行きます。
