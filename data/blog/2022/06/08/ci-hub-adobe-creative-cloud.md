---
title: Sitecore Content Hub と CI HUB - Adobe Creative Cloud 編
date: '2022-06-08'
tags: ['Content Hub', 'CI HUB']
draft: true
summary: Sitecore Content Hub をさまざまなアプリケーションと連携することができるツールを CI HUB という会社が提供しているいます。このコネクタを利用することで、DAM の利用に関しての可能性を広げます。今回は Adobe Creative Cloud のコネクタのインストール、利用方法に関して紹介をします。
images: ['/static/images/2022/06/adobe15.png']
---

Sitecore Content Hub をさまざまなアプリケーションと連携することができるツールを CI HUB という会社が提供しているいます。このコネクタを利用することで、DAM の利用に関しての可能性を広げます。今回は Adobe Creative Cloud のコネクタのインストール、利用方法に関して紹介をします。

なお、今回は Sitecore Content Hub 4.1.14 を立ち上げて接続しています。

## Adobe Creative Cloud

クリエイティブツールのスイート、Adobe Creative Cloud と連携させるためのコネクタがあります。この記事を書いている現在、Windows および macOS に対応した以下のバージョンで利用することができます。

- Photoshop CC (2018) 19.0 - CC (2022) 23.0
- InDesign CC (2018) 13.0 - CC (2022) 17.0
- InCopy CC (2018) 13.0 - CC (2022) 17.0
- Illustrator CC (2018) 22.0 - CC (2022) 26.0
- Premiere Pro CC (2018) 12.0 - CC (2022) 22.0
- After Effects CC (2018) 15.0 - CC (2022) 22.0

インストールをする場合、Adobe Creative Cloud から Stock とマーケットプレイスからプラグインを選択、CI HUB で検索をするとツールが表示されます。

![CI HUB](/static/images/2022/06/cihub01.png)

詳細情報をクリックするとサイトが立ち上がり、Free のアイコンをクリックするとインストールの手続きが進みます。

![CI HUB](/static/images/2022/06/cihub02.png)

![CI HUB](/static/images/2022/06/cihub03.png)

インストールが完了すると、プラグインを管理の中にコネクタが表示されるようになります。

![CI HUB](/static/images/2022/06/cihub04.png)

## Apple Silicon 版について

機能拡張機能を利用するためには、Apple Silicon の macOS マシンを利用している場合は、アプリケーションを `Rosetta を利用して開く` をチェックして起動する必要があります。

![Adobe](/static/images/2022/06/adobe01.png)

この設定はアプリケーションごとに必要となります。

## Photoshop で起動する

Photoshop を起動して、メニューの `ウィンドウ` - `エクステンション` から CI HUB を選択します。

![Adobe](/static/images/2022/06/adobe02.png)

選択をすると CI HUB へのログイン画面が表示されます。

![Adobe](/static/images/2022/06/adobe03.png)

ここでは契約している CI HUB のアカウントでログインをします。ブラウザが別途起動してログインをする形となります。

![Adobe](/static/images/2022/06/adobe04.png)

ログインが完了するとダイアログは以下のように更新されます。

![Adobe](/static/images/2022/06/adobe05.png)

## Sitecore Content Hub への接続

ダイアログが表示されている右上に + のアイコンがあります。これをクリックして、接続を追加します。標準のおすすめでは出てこないため Show all をクリックして Sitecore のアイコンの右側にあるチェックを有効にしてください。

![Adobe](/static/images/2022/06/adobe06.png)

チェックをしておくと、一覧に表示されるようになります。

![Adobe](/static/images/2022/06/adobe07.png)

Sitecore のロゴをクリックすると、次のように Sitecore の URL を入力する画面になります。ここでは、Sitecore Content Hub のサイトの URL を設定してください。

![Adobe](/static/images/2022/06/adobe08.png)

URL を入れて次に進むと接続先の Sitecore Content Hub のログイン画面に切り替わります。

![Adobe](/static/images/2022/06/adobe09.png)

ログインをすると、アプリケーションがアクセスして良いかの確認が表示されます。

![Adobe](/static/images/2022/06/adobe10.png)

付与をクリックすると、Photoshop の機能拡張を通じて Sitecore の権限に合わせてアセットを参照することが可能となります。

![Adobe](/static/images/2022/06/adobe11.png)

結果、アセットの検索に関して Photoshop から選択することができるようになりました。

![Adobe](/static/images/2022/06/adobe12.png)

アセットはドラッグ＆ドロップで選択することができます。

## Adobe InDesign で起動する

Photoshop 以外のツールでも利用可能ですが、今回は InDesign を選択します。`ウィンドウ`メニューにあるエクステンションを利用して、CI HUB をアクセスしてください。

![Adobe](/static/images/2022/06/adobe13.png)

ログインのダイアログが表示されます。

![Adobe](/static/images/2022/06/adobe14.png)

ログインから先は Photoshop の時と同じく接続をする Sitecore Content Hub の URL を設定、ログインをして権限を付与する形となります。InDesign からも DAM のアセットにアクセスすることができるようになりました。

![Adobe](/static/images/2022/06/adobe15.png)

## まとめ

CI HUB のプラグインをインストールすることで、Adobe Creative Cloud のアプリケーションから直接 Sitecore Content Hub のアセットを参照することができるようになりました。必要なファイルをダウンロード、作業することができます。ログインをするアカウントの権限に合わせて表示されるアセットが変わる形となりますので、アセットの利用制限などを Sitecore Content Hub 側で実装しておけば、各種ツールでも同様の動きをすることになります。
