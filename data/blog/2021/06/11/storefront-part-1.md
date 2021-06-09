---
title: Storefront - ホームページの表示
date: '2021-06-11'
lastmod: '2021-06-11'
tags: ['Sitecore','Demo','Install','Commerce','Storefront']
draft: true
summary: Sitecore Experience Commerce 10.1 に関するインストールの手順を2回に分けて紹介をしました。今回から数回に分けて、標準で実装されている Commerce のモックとなるサイト、Storefront の設定について紹介をしていきます。また、リソースの翻訳に関して手順を記載していますが、インポートをすると全て反映されるサンプルデータは後日公開予定ですので、公開までは手作業で、公開後はリソースを使って作業を軽減できます。
images: ['/static/images/2021/06/storefront07.png']
---

Sitecore Experience Commerce 10.1 に関するインストールの手順を2回に分けて紹介をしました。今回から数回に分けて、標準で実装されている Commerce のモックとなるサイト、Storefront の設定について紹介をしていきます。また、リソースの翻訳に関して手順を記載していますが、インポートをすると全て反映されるサンプルデータは後日公開予定ですので、公開までは手作業で、公開後はリソースを使って作業を軽減できます。

## ホスト名の変更

Storefront のサイトに関しては、セットアップの際に別のサイト名を指定している場合、Storefront のコンテンツで指定されるホスト名はデフォルトの値と異なることになるため、サイトが有効になっていない形となります。

次のパスのアイテム /sitecore/content/Sitecore/Storefront/Settings/Site Grouping/Storefront を開くと以下のような画面になっています。

![storefront](/static/images/2021/06/storefront01.png)

この項目に記載されているホスト名を、インストールした環境で利用したいホスト名に変更をしてください。

変更をしたあと、コンテンツエディターのパブリッシュタブにある**パブリッシュ▼** をクリックして、アイテムをパブリッシュを選択します。

![storefront](/static/images/2021/06/storefront02.png)

スマートパブリッシュ、および言語は日本語と英語を選択して公開してください。公開が完了すると、以下のようにサイトが表示されます。

![storefront](/static/images/2021/06/storefront03.png)

## 日本語リソースの追加

デフォルトでは Storefront のサイトには日本語のリソースは追加されていません。そこで、以下の手順で日本語のツリーを作り上げていきます。

### ホームの追加

ホームアイテムを選択し、日本語に切り替えると、以下のように日本語のバージョンが無いと表示されます。

![storefront](/static/images/2021/06/storefront04.png)

日本語のリソースを追加して、以下の項目を入力してください。

| 項目名 | 入力値 |
|-|-|
| タイトル | ストアフロント |
| ナビゲーションのリンクキャプション | ホーム |

これでホームアイテムができました。

### ヘッダーアイテムの設定

ホームページが利用している Header の定義は、以下のアイテムになります。

* /sitecore/content/Sitecore/Storefront/Presentation/Partial Designs/Default Commerce Header

このアイテムの日本語リソースも追加します。追加をしたあとパーシャルデザインを設定する項目がありますので、ここで **Partial Designs/Multi-Rows Base Header Structure** を選択します。

![storefront](/static/images/2021/06/storefront05.png)

ヘッダーで利用しているロゴアイテムの日本語リソースも追加します。ロゴのイメージは以下の通りです。

* /sitecore/content/Sitecore/Storefront/Data/Images/Large Logo

ロゴの画像のパスは英語と同じく /Project/Sitecore/Storefront/Logo Images/Logo Desktop を指定、代替テキストの設定、リンク先を先ほど作成をしたホームに指定します。

### フッターリンクリストの調整

ホームページが利用しているフッターエリアのパーシャルデザインは、以下のリンクリストを利用しています。

* /sitecore/content/Sitecore/Storefront/Data/Link Lists/Footer 

このリンクリストを全て日本語のリソースを準備します。

### その他のフッターの要素を調整

Corprights および We are Social! の項目は以下のテキストデータとして管理されています。

* /sitecore/content/Sitecore/Storefront/Data/Texts/Footer

ソーシャル一覧のリソースは、画像とリンクということで以下の一覧で管理されています。

* /sitecore/content/Sitecore/Storefront/Data/Images 

上記２つのリソースで必要とされるアイテムの日本語データを設定してください。

### カルーセルの調整

ホームで利用しているカルーセルのアイテムは以下で定義されています。

* /sitecore/content/Sitecore/Storefront/Data/Carousels/Home Carousel

### テキストアイテムの調整

ページで利用しているテキストがいくつか以下で定義されています。これらの用語はそれぞれ翻訳していく必要があります。

* /sitecore/content/Sitecore/Storefront/Data/Texts/Promoted Products

Load more に関しては以下のアイテムになります。このアイテムの日本語リソースを追加すると、デフォルトの値が設定されます。

* /sitecore/content/Sitecore/Storefront/Data/Search/Load More/Default

### Cookie の警告の翻訳

Cookie に関する警告の文章は以下のアイテムで管理をしています。

* /sitecore/content/Sitecore/Storefront/Settings/Privacy Warning

日本語のリソースを追加することで、デフォルトの値が利用できるようになります。

## エクスペリエンスエディターで確認

上記のリソースに関して、一通り設定が終わった段階で、ホームのアイテムを選択してエクスペリエンスエディターを起動してください。以下のようにトップページの準備ができました。

![storefront](/static/images/2021/06/storefront06.png)

ホームアイテムを選択して、サブアイテムと一緒にスマートパブリッシュを実行すると、ホームページが公開される形となります。

![storefront](/static/images/2021/06/storefront07.png)

## まとめ

まずは Storefront のサイトの URL の変更、合わせてトップページを表示する際に必要となるリソースの翻訳に関して紹介をしました。今回は細かく説明していますが、一度リソースを作れば、毎回作業をする必要はありません。このため、後日手順で紹介しているサンプルデータはダウンロードできるようにします。今回の手順を見ていくことで、どこでどういうリソースが利用されているのか、というのを理解することができます。次回は、ホーム以外のページの調整を進めていきます。