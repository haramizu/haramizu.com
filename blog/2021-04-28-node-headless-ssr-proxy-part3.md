---
title: Sitecore JSS - Headless SSR - Part.3
author: Shinichi Haramizu
author_title: Sitecore Japan
author_url: https://haramizu.jp/
author_image_url: https://avatars3.githubusercontent.com/u/5026348?s=400&v=4
tags: [JSS,React,headless ssr]
description: 
slug: 2021/04/28/jss-headless-ssr-part-3
---

Headless SSR の3回目は、Docker コンテナを作成して展開したいと思います。

<!--truncate-->

## Docker の環境を整える

コンテナを動かすために、まずは Docker Desktop for Windows / macOS をインストールしてください。手元の環境は macOS のため、Docker Desktop for Mac で作業を進めていきます。

* [Docker Desktop](https://www.docker.com/products/docker-desktop)

![docker](img/2021/04/docker01.png "docker")

起動をすると、何度かダイアログが表示されますが、権限を与えるために必要となりますので、設定を続けてください。しばらくすると以下の画面が表示されます。

![docker](img/2021/04/docker02.png "docker")

動作確認のためにチュートリアルを実行します。Start ボタンをクリックします。すると、右側にコマンドラインが、中央にチュートリアルのコマンドが表示されます。

![docker](img/2021/04/docker03.png "docker")

中央にコマンドが表示されているところをクリックすると、右側のコマンドラインにコピーされて実行します。内容は、リポジトリのクローン、そしてイメージのダウンロードです。**Next Step** のボタンをクリックします。

![docker](img/2021/04/docker04.png "docker")

新しいコマンドが中央に表示されるので、これをクリックします。しばらくすると処理が終わります。**Next Step** のボタンをクリックすると、以下の画面に切り替わります。

![docker](img/2021/04/docker05.png "docker")

コマンドを見ると、コンテナを実行することがわかります。それでは、クリックして実行し、ブラウザで http://localhost にアクセスしてください。以下のようなサイトを参照することができます。

![docker](img/2021/04/docker06.png "docker")

また、Done をクリックすると Docker コンテナが動いていることがわかります。

![docker](img/2021/04/docker07.png "docker")

ダッシュボードに切り替えると、以下の様な画面になります。

![docker](img/2021/04/docker08.png "docker")

不要であれば、作成したイメージは一番右側に表示されているゴミ箱のマークをクリックすると削除できます。これで、環境は整いました。

## Docker ファイルの作成

続いて Docker ファイルの作成をおこないます。


## プロジェクトのパラメーターの変更



## 実行、確認


## まとめ

react-app の環境から docker コンテナを立ち上げて Headless SSR の確認をすることが出来る環境を手元で整備しました。
