---
title: Storefront - Commerce Control Panel
date: '2021-06-15'
lastmod: '2021-06-15'
tags: ['Sitecore','Demo','Install','Commerce','Storefront']
draft: false
summary: 前回は Storefront のホームページの表示まで紹介をしました。日本語のサイトで表示されていない部分を参照していきながら、不足しているリソースを追加して動かしていきます。
images: ['/static/images/2021/06/storefront07.png']
---

Storefront のコンテンツに関して調整をしてきましたが、サイトの動作で必要となる項目はどこで定義されているでしょうか？今回は Commerce Control Panel の設定について紹介をしていきます。

## Commerce Control Panel

Sitecore Experience Commerce をインストールすると、トップレベルに Commerce のアイテムが表示されます。そして、すでに動作している Storefront が参照している設定は、この Commerce の中に含まれる Commerce Control Panel を参照しています。

![storefront](/static/images/2021/06/storefront15.png)

よくやる設定に関して、紹介をしていきます。

## 通貨の設定

通貨に関しては複数のセットを作ることができます。今回はデフォルトの設定で動いているため、以下のアイテムが対象となります。

* /sitecore/Commerce/Commerce Control Panel/Shared Settings/Currency Settings/Currency Sets/Default

標準では日本円はこのセットに入っていないため、日本円を追加します。追加方法としては、リストから選択をして、右矢印をクリックすると選択ができ、アイテムを保存すると有効になります。

![storefront](/static/images/2021/06/storefront16.png)

## 国データの追加

国情報は、以下のアイテムの配下で管理をしています。

* /sitecore/Commerce/Commerce Control Panel/Shared Settings/Countries-Regions

例えばアメリカの情報を見ると、United States のアイテムの下に、州のアイテムが並んでいることがわかります。

![storefront](/static/images/2021/06/storefront17.png)

日本の場合、コードとしては都道府県コード（北海道 01）という感じでアイテムを作成するのが無難なため、アイテムを作成していきましょう。と、47 都道府県のアイテムを作るのは大変ですよね。ということで、パッケージを作成してみました。以下の zip ファイルをダウンロードしてください。

* https://github.com/SitecoreJapan/InstallScript/tree/master/XC101
    * SCJapanPrefecture.zip

ダウンロードをしたら、コントロールパネルを開いて、管理 - パッケージをインストールする を選択します。ダイアログが表示されるので、パッケージをアップロードしてください。

![storefront](/static/images/2021/06/storefront18.png)

パッケージをインストールが完了すると、以下のダイアログが表示されます。クライアントの再起動をチェックして、パッケージのインストールを完了させます。

![storefront](/static/images/2021/06/storefront19.png)

アイテムを見にいくと、都道府県データが 47 アイテム作成されており、コードと名前が入っていることがわかります。

![storefront](/static/images/2021/06/storefront20.png)

上記の設定が完了したら、Commerce Control Panel のアイテムを選択して、パブリッシュを実行してください。

## 動作確認

現状、商品としては日本円のデータが無いため、通貨に関する確認は別途します。今回は、追加した都道府県データを見ていきます。通常の Storefront のサイトにアクセスをして、ユーザー登録、ユーザーの住所登録の画面に移動します。

![storefront](/static/images/2021/06/storefront21.png)

上記画面のように、日本を選択できるようになっています。デフォルトでは住所の都道府県の項目は、コード番号を入れる形となっているため、今回は 13 （東京都の都道府県コード）を入力して保存をすると、住所を保存することができます。

## まとめ

Commerce Control Panel の項目を変更して、通貨の追加と住所に関する設定ができました。実際の運用時には、国の項目をドロップダウンで選択、都道府県に関してもドロップダウンで、また郵便番号を入力したら自動的に住所が設定される、などの実装が必要になりますが、検証という点ではこれである程度動くので、取り急ぎ次のステップに入ります。
