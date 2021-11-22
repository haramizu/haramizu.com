---
title: Content Hub - 入力項目の制御
date: '2021-11-22'
tags: ['Content Hub']
draft: false
summary: Sitecore Content Hub のスキーマを拡張していくときに、とある条件の時に入力をしたいという項目が出てきます。それを常時表示しているのは作業効率も悪くなってきます。こういう課題のために表示を制御するための機能が搭載されているので、今回はそれを紹介します。
images: ['/static/images/2021/11/schema09.gif']
---

Sitecore Content Hub のスキーマを拡張していくときに、とある条件の時に入力をしたいという項目が出てきます。それを常時表示しているのは作業効率も悪くなってきます。こういう課題のために表示を制御するための機能が搭載されているので、今回はそれを紹介します。

## 前提条件

今回は Sitecore Content Hub をセットアップした後の環境で紹介をしていきます。また作業をしているバージョンは 4.1.5 ですが、この機能はこの製品の買収前から持っている機能になるため、バージョンに依存しない機能となります。

## スキーマを拡張する

まず最初に、アセットのスキーマを簡単に拡張してみます。まず、M.Asset のスキーマを開くと以下のような設定になっています。

![ContentHubSchema](/static/images/2021/11/schema01.png)

今回はわかりやすくするために、Overview に DemoText というメンバーを追加します。Overview が選択されている画面で New Member をクリックするとダイアログが表示されます。

![ContentHubSchema](/static/images/2021/11/schema02.png)

テキストを追加したいので、PROPERTY を選択します。

![ContentHubSchema](/static/images/2021/11/schema03.png)

文字列を設定するので String を選択します。

![ContentHubSchema](/static/images/2021/11/schema03.png)

あとは DemoText というスキーマを追加します。タイトルだけでも Demo Text に変更しておきましょう（単に見た目的な部分で、検証なのでそのまま同じでもいいですが）。

![ContentHubSchema](/static/images/2021/11/schema04.png)

設定を変更したあと、Apply Changes のボタンをクリックします。するとスキーマが拡張されます。アセットを選択すると、以下のように項目が表示されます。

![ContentHubSchema](/static/images/2021/11/schema05.png)

標準で Demo Text の項目が追加されているのがわかります。

## 表示を制御する

もう一度スキーマの定義で Demo Text の項目に戻ります。設定として Conditional というタブがあることがわかります。

![ContentHubSchema](/static/images/2021/11/schema06.png)

選択をすると、この項目を入力するための項目が表示されます。

![ContentHubSchema](/static/images/2021/11/schema07.png)

本来は表示制御するための前提条件を作らないといけないのですが、今回はデフォルトの項目となるため AsssetTypeToAsset に最初からサンプルとして入っている FactSheet を選択します。

![ContentHubSchema](/static/images/2021/11/schema08.png)

設定を変更したら Apply Changes のボタンをクリックして、設定を反映させます。変更後の画面ですが、以下のように選択をすると項目が追加で表示されることがわかります（アニメーション Gif です）。

![ContentHubSchema](/static/images/2021/11/schema09.gif)

これである項目を選択すると、それに関する項目が表示されている、というのを確認することができました。

## まとめ

入力項目が増えてくると、画面に多くのデータが表示されるようになります。このために項目として何かと連携して入力しなければいけない、というようなときだけ出てくるという設定をすることで、通常では不要な項目が出てこないようになるので、作業効率を上げることもできます。

## 参考ページ

* [リレーションの追加](https://docs.stylelabs.com/ja-jp/contenthub/4.0.x/content/user-documentation/administration/data/schema/members/adding-relation.html)