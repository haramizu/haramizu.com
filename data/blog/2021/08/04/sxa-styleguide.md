---
title: Sitecore Experience Accelerator スタイルガイドインストール
date: '2021-08-04'
tags: ['Sitecore','SXA','Install']
draft: true
summary: Sitecore Experience Accelerator のモジュールで作成をしているサンプルサイト、スタイルガイドのインストール方法を紹介します。
images: ['/static/images/2021/07/styleguide05.png']
---

Sitecore Experience Accelerator（以下 SXA）のモジュールで作成をしているサンプルサイト、スタイルガイドのインストール方法を紹介します。

## 前提条件

前提条件として、SXA がインストールされていることを前提とします。モジュールのインストールの手順は前回紹介した通りです。

* [Sitecore Experience Accelerator インストール](https://haramizu.com/blog/2021/07/21/sxa-install)

## SXA Styleguide とは

SXA のモジュールを紹介するための、SXA で作成されているサンプルサイトです。このサイトに関してはサポート対象外のサンプルとして提供されているものです。これに関しては以下のページが参考になります。

* https://www.markvanaalst.com/blog/sxa/introducing-the-sxa-styleguide/

サンプルコードなどは全て Github 上で展開されており、最新版は 10.1 に対応しています。

* https://github.com/markvanaalst/SXA.Styleguide

## インストール

インストールをするにあたって、Zip ファイルのパッケージが GitHub にて展開されているので、ファイルをダウンロードしてください。

* https://github.com/markvanaalst/SXA.Styleguide/releases/tag/10.1

ダウンロードしたファイルを、**コントロールパネル**の **管理** - **パッケージをインストールする** を選択します。

![StyleGuide](/static/images/2021/07/styleguide01.png)

インストールが完了したあと、コンテンツエディターを開くと、下図のようにツリーが追加されています。

![StyleGuide](/static/images/2021/07/styleguide02.png)

これでパッケージのインストールは完了です。

## 環境を調整する

インポートしたデータは、サーバーの仮想フォルダ /styleguide にアクセスをすると参照できるように標準では設定されています。設定をしているアイテムは以下のアイテムです。

* /sitecore/content/Sitecore/Styleguide/Settings/Site Grouping/Styleguide

今回は、ターゲットホスト名をサーバーの名前に、仮想フォルダは / に変更をします。またデータベースに関しても master から web データベースに変更をしてください。

![StyleGuide](/static/images/2021/07/styleguide03.png)

変更をしたあと、パブリッシュ - サイトをパブリッシュを選択、今回はリパブリッシュを選択してコンテンツを展開します。

![StyleGuide](/static/images/2021/07/styleguide04.png)

これで対象となるサーバーにアクセスをすると、コンテンツが表示されるようになります。

![StyleGuide](/static/images/2021/07/styleguide05.png)

## まとめ

SXA で開発をする際にはこの SXA StyleGuide を一通り理解していると色々と助かることがあるでしょう。特に、モジュールの作り方、スタイルシートとの連携などの検証なども、すでにインポートしてあるアイテムを利用して、確認することができます。