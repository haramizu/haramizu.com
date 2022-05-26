---
title: Sitecore Content Hub と CI HUB - Microsoft Office 編
date: '2022-06-08'
tags: ['Content Hub', 'CI HUB']
draft: true
summary: Sitecore Content Hub をさまざまなアプリケーションと連携することができるツールを CI HUB という会社が提供しているいます。前回の Adobe Creative Cloud の連携に続いて、Microsoft Office との連携について紹介をします。
images: ['/static/images/2022/03/component06.gif']
---

Sitecore Content Hub をさまざまなアプリケーションと連携することができるツールを CI HUB という会社が提供しているいます。前回の Adobe Creative Cloud の連携に続いて、Microsoft Office との連携について紹介をします。

なお、今回は Sitecore Content Hub 4.1.14 を立ち上げて接続しています。

## Microsoft Office

PowerPoint、Word および Excel にもコネクタをインストールすることができます。インストールの際には以下のように手順を進めていきます。

1. https://appsource.microsoft.com にアクセスする
2. CI HUB で検索をする

![CI HUB](/static/images/2022/06/cihub05.png)

3. CI HUB Connector for Office365 をインストールする
4. Office のアカウントでログインをする

インストールが完了すると以下の画面になります。

![CI HUB](/static/images/2022/06/cihub06.png)

Outlook 版は別で提供されているため、Outlook でも利用したい場合は、Outlook 版もインストールしてください。

## PowerPoint で利用する

インストール後の画面から、PowerPoint で開くのアイコンをクリックしてください。ダイアログが表示されたあと、PowerPoint を起動します。

![CI HUB](/static/images/2022/06/office01.png)

PowerPoint を開くと、以下のようにアドインの起動方法の画面が表示されます。このスライドも日本語化されていますね。

![CI HUB](/static/images/2022/06/office02.png)

PowerPoint のウィンドウの右側にアドインを信頼するかどうかのダイアログが表示されています。ここではこの `アドインを信頼` のボタンをクリックします。しばらくすると右上に CI HUB のアイコンがリボンに追加されます。クリックをすると CI HUB のツールにログインを画面が表示されます。

![CI HUB](/static/images/2022/06/office03.png)

ログインの手順は前回の Adobe Creative Cloud のサイト同じく、ブラウザが起動してログイン、ログインに成功すると PowerPoint の画面に CI HUB が表示されるようになります。Connections にある + のボタンをクリックして、新しいサーバーを選択します。この部分も Adobe Creative Cloud の時と同じように URL を入れてログインをして、という手続きとなります。

ログインができたら、たとえば Brand - Logo で絞り込みをすると以下のようにロゴに関するファイルを素早く見つけることができます。

![CI HUB](/static/images/2022/06/office04.png)

いつでも PowerPoint にロゴを入れることができるようになりました。

## Word で利用する

PowerPoint と同じように、プラグインインストール後の画面からクリックをして Word を開くと、アドインの起動方法のファイルを開いて Word が立ち上がります。起動後、右上に CI HUB のアイコンが表示されているのでクリックをするとこれまでと同じようにログインの画面が埋め込まれています。

![CI HUB](/static/images/2022/06/office05.png)

違いとしてはすでに PowerPoint でアドインを信頼する形としているため、そのための確認が表示されない点です。あとはログインをしてアセットを検索など、Word に画像を貼り付けを簡単にできるようになります。

## まとめ

今回は Excel および別のアドインとなる Outlook に関しては省略をしましたが、どちらにおいても同様に Sitecore Content Hub のアセットを参照することができるようになります。
