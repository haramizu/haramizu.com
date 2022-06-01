---
title: Sitecore Content Hub と CI HUB - Figma 編
date: '2022-06-10'
tags: ['Content Hub', 'CI HUB', 'Figma']
draft: true
summary: Adobe Creative Cloud および Microsoft Office と日頃から利用するであろうツール以外にも CI HUB は対応しています。今回はデザインツールである Figma との連携について紹介をします。
images: ['/static/images/2022/06/figma04.png']
---

Adobe Creative Cloud および Microsoft Office と日頃から利用するであろうツール以外にも CI HUB は対応しています。今回はデザインツールである Figma との連携について紹介をします。

なお、今回は Sitecore Content Hub 4.1.14 を立ち上げて接続しています。

## Figma

デザインツールである Figma でも利用することができます。Figma のデスクトップツールを立ち上げて、Community のメニューから `CI HUB` で検索、プラグインに切り替えると CI HUB Connector が表示されます。

![CI HUB](/static/images/2022/06/cihub07.png)

インストール後、右上のプロファイルアイコンをクリック、プラグインを選択するとインストール済みになっているかどうかを確認できます。

![CI HUB](/static/images/2022/06/cihub08.png)

## 使い方

メニューから Plugins - CI HUB Connector を選択します。

![CI HUB](/static/images/2022/06/figma01.png)

プラグインが起動したタイミングで、いつものログイン画面が表示されます。

![CI HUB](/static/images/2022/06/figma02.png)

いつものと同じくブラウザが起動して、CI HUB のアカウントでログインをすると CI HUB の画面となり、どのサーバーと繋げるのかという画面になります。

![CI HUB](/static/images/2022/06/figma03.png)

Connection から Sitecore のロゴを選択し、クリックをするとサーバーの URL を指定する画面となります。あとはログインをして、CI HUB との連携で権限を付与すれば、Figma の画面から Sitecore Content Hub のアセットを参照することができます。

![CI HUB](/static/images/2022/06/figma04.png)

## まとめ

今回は Figma での連携について紹介をしました。Web サイトのデザインをする際に、画像を利用したいという状況では DAM から直接取ってこれると作業効率が良くなります。またダウンロードして、という作業も可能ですので、作業の内容に合わせて手順を選択してください。
