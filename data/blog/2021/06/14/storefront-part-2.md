---
title: Storefront - ログイン、ショッピング
date: '2021-06-14'
lastmod: '2021-06-14'
tags: ['Sitecore','Demo','Install','Commerce','Storefront']
draft: false
summary: 前回は Storefront のホームページの表示まで紹介をしました。日本語のサイトでリソースが不足していて表示されていない部分を確認しながら、不足しているリソースを追加して、正しく動作するように調整をしていきます。
images: ['/static/images/2021/06/storefront14.png']
---

前回は Storefront のホームページの表示まで紹介をしました。日本語のサイトでリソースが不足していて表示されていない部分を確認しながら、不足しているリソースを追加して、正しく動作するように調整をしていきます。

## ログインページ、アカウント

まず、右上にあるボタンにマウスカーソルを当てても、メニューの項目が表示されません。英語では２つのメニューが表示されています。

![storefront](/static/images/2021/06/storefront09.png)

![storefront](/static/images/2021/06/storefront08.png)

対象となるリソースを追加する前に、関連するページのリソースを準備していきます。アカウント管理のページは、以下のアイテムの配下に準備されています。

* /sitecore/content/Sitecore/Storefront/Home/accountmanagement

ここのアイテムの日本語アイテムを準備してください。タイトルおよびナビゲーションのリンクキャプション、表示名ぐらいの設定で進めていけます。

続いて、英語のページでメニュー項目を参照をすると、ログイン、ギフトカードのページになっています。以下の２つのアイテムになります。

* /sitecore/content/Sitecore/Storefront/Home/login
* /sitecore/content/Sitecore/Storefront/Home/buygiftcard

ページの準備ができれば、リンクの調整となります。

まず、この TopBar で利用しているリンク一覧は以下で定義されています。

* /sitecore/content/Sitecore/Storefront/Data/Links/TopBar

今回利用する内容以外にもリンクが多くありますので、日本語リソースを作るために、前回の手順と同じようにエクスポート、インポートで一通り日本語のリソースを用意してください。

リンクリストのデータが日本語になったときに
ここのリソースに日本語を追加すると、実際のトップバーのリンクが修正される形となります。

* /sitecore/content/Sitecore/Storefront/Data/Commerce/Top Bar Links/Top Bar Links

この際、リンクは以下のように設定をします。

![storefront](/static/images/2021/06/storefront10.png)

これで一通り設定が完了しました。作成したアイテムをパブリッシュすると、サイトでメニューが有効になりました。

![storefront](/static/images/2021/06/storefront11.png)

## ユーザー登録のページ

ログインのページを表示すると、英語のページではユーザー登録もしくはゲストというのが記載されていますが、今の段階では含まれていません。

![storefront](/static/images/2021/06/storefront12.png)

この２つのアイテムは、以下で定義されています。

* /sitecore/content/Sitecore/Storefront/Data/Links/Register New Account Link
* /sitecore/content/Sitecore/Storefront/Data/Links/Checkout As Guest Link

この機会に、他のリンクも含めてすべて日本語のリソースをこの機会にすべて翻訳をしていきます。

![storefront](/static/images/2021/06/storefront13.png)

## Commerce のリソースを有効にする

標準で提供されているリソースをすでにインポートしていますが、コンテンツツリーで参照できない形になっています。これを修正していきます。

* /sitecore/content/Sitecore/Storefront/Data/Commerce

の配下にあるアイテムで日本語のリソースを追加すると、自動的に日本語のデータが設定されていきます。設定されない項目や好みでは無い英語の場合は、日本語を変更してください。以下のアイテムに関しては、空欄のものがあるので、その部分を埋めてください。

* /sitecore/content/Sitecore/Storefront/Data/Commerce/Cart/Free Gift Selection
* /sitecore/content/Sitecore/Storefront/Data/Commerce/Cart/Minicart
* /sitecore/content/Sitecore/Storefront/Data/Commerce/Catalog/Commerce Search Results/Default
* /sitecore/content/Sitecore/Storefront/Data/Commerce/Relationships/Installation Product
* /sitecore/content/Sitecore/Storefront/Data/Commerce/Relationships/Related Product
* /sitecore/content/Sitecore/Storefront/Data/Commerce/Relationships/Training Product
* /sitecore/content/Sitecore/Storefront/Data/Commerce/Relationships/Warranty Product

またカートの遷移に合わせた文字列の定義は以下のアイテムになります。

* /sitecore/content/Sitecore/Storefront/Data/Commerce/Checkout/Step Indicator

変更点としては、以下の画像のようにラベルを設定すると、カートの遷移の際に利用するラベルの設定ができます。

![storefront](/static/images/2021/06/storefront14.png)

## カートページの修正

ショッピングカートのページのヘッダーアイテムが不足しています。以下のアイテムを選択してください。

* /sitecore/content/Sitecore/Storefront/Presentation/Partial Designs/Shopping Cart Page Header

設定項目は、データの項目を英語と同じ値にすることで、有効になります。合わせて、以下のパーシャルデザインの日本語リソースも作っておきましょう。

* /sitecore/content/Sitecore/Storefront/Presentation/Partial Designs/Commerce Header
* /sitecore/content/Sitecore/Storefront/Presentation/Partial Designs/Commerce Metadata
* /sitecore/content/Sitecore/Storefront/Presentation/Partial Designs/Commerce Metadata For Catalog Items

## 日本語の修正

販売に関するステップのラベルに関して、以下のアイテムを編集します。

以下のアイテムの表示名を変更してください

* /sitecore/system/Settings/Buckets/Search Types/Commerce Brand
* /sitecore/system/Settings/Buckets/Search Types/Commerce Definition Name
* /sitecore/system/Settings/Buckets/Search Types/Commerce On Sale
* /sitecore/system/Settings/Buckets/Search Types/Commerce Rating
* /sitecore/system/Settings/Buckets/Search Types/Commerce Search Item Type

## パブリッシュ

上記の項目の設定がすべて完了した段階で、パブリッシュを実行してください。これで設定が反映されます。

## 動作確認

この段階で、Sitecore Experience Commerce の Storefront として、以下手順の動作確認ができるようになります。

* ユーザー登録（ログインの画面から移動）
* アカウントの確認
* 商品の表示
* カートに入れる
* チェックアウト
* オーダープロセス
* 注文一覧にオーダーした結果が表示される

動作に関しては別途紹介をしたいと思いますが、とりあえず試していただくとわかると思います。なお、決済の部分は Braintree の sandbox を利用して作成したキーで実行、検証することができます。

## まとめ

Sitecore Experience Commerce のモックとなるサイト、Storefront が日本語で動作するようになりました。ある程度デフォルトの値などはインポートされていますが、いくつかの情報を追加するだけで動作確認をすることができるのがわかります。