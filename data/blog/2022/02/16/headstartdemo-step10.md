---
title: Headstart デモ環境を構築する - Part 10 リリースの作成と動作確認
date: '2022-02-16'
tags: ['Sitecore','OrderCloud']
draft: false
summary: 前回の記事で Azure DevOps と GitHub に展開しているリポジトリの連携の設定、ビルドまで進めました。今回は、実際にビルドしたデータを Azure の各リソースに展開するための手順を紹介していきます。
images: ['/static/images/2022/02/release27.png']
---

前回の記事で Azure DevOps と GitHub に展開しているリポジトリの連携の設定、ビルドまで進めました。今回は、実際にビルドしたデータを Azure の各リソースに展開するための手順を紹介していきます。

## リリースの作成

左側のメニューから Pipelines - Releases を選択してください。最初につくるリリースとなるため空になっています。

![OrderCloud](/static/images/2022/02/release01.png)

上記の画面にある New pipeline のボタンをクリックします。クリックをすると **Select a template** が表示されます。

![OrderCloud](/static/images/2022/02/release02.png)

ここでは何も選択せず右上の X をクリックしてください。画面は下のように変わります。

![OrderCloud](/static/images/2022/02/release03.png)

一番左側にある **Add an artifact** をクリックしてください、画面は下のように変わります。Source として前回作成をしたパイプラインを指定します。

![OrderCloud](/static/images/2022/02/release04.png)

追加すると以下のよう画面に切り替わります。

![OrderCloud](/static/images/2022/02/release05.png)

### ミドルウェアの展開

ここからミドルウェアなどのアプリを個別に設定していきます。まず最初にミドルウェアを展開するために、**Add a stage** のボタンをクリックしてください。

![OrderCloud](/static/images/2022/02/release06.png)

今回は **Azure App Service Deployment** を選択します。ステージとしては Middleware Test と名前をつけます。

![OrderCloud](/static/images/2022/02/release07.png)

名前をつけた後画面を Pipeline に戻しますが、この Middleware Test には 1 job, 1 task がアラートになっています。

![OrderCloud](/static/images/2022/02/release08.png)

ここをクリックすると、Azure の Subscription の指定、対象となる App service の名前を入れる必要があります。今回は以下のように設定をしました。

![OrderCloud](/static/images/2022/02/release09.png)

続いて Deply Azure App Service をクリックして設定を確認します。今回は展開するスロットを指定するために、Deploy to Slot or App Service Environment をチェックして、対象となる test のスロットを指定します。

![OrderCloud](/static/images/2022/02/release10.png)

保存をするとミドルウェアの展開に関しての展開手順は完了となります。

## Seller の展開

続いて Seller を作成します、ミドルウェアとほぼ同じ設定にするため、クローンを作成します。Middleware Test の上に合わせると Clone のボタンが出てくるので、これをクリックすると設定がコピーされたステージが追加されます。

![OrderCloud](/static/images/2022/02/release11.png)

名前を Seller Test に変更をして開いた画面が以下の通りです。画面はすでに App Service name に関しては Seller のインスタンスに変更をしてあります。

![OrderCloud](/static/images/2022/02/release12.png)

Run on agent の右側に表示されている + をクリックして Build のためのスクリプトの処理を追加していきます。今回は bash を選択します。

![OrderCloud](/static/images/2022/02/release13.png)

Bash Script の順番を上に変更をします。また右側の Script の項目には inline で以下の１行を追加してください。

```
node inject-appconfig defaultadmin-test
```

追加をした後は、Work directory を seller のフォルダを指定します。

![OrderCloud](/static/images/2021/09/ordercloud66.gif)

設定は以下のようになっていれば完了です。

![OrderCloud](/static/images/2022/02/release14.png)

続いて Deploy Azure App Service を選択して、スロットを Test に、ディレクトリを指定してください。

![OrderCloud](/static/images/2022/02/release15.png)

これで Seller の展開手順に関しては完了しました。

### Buyer の展開

Buyer のステージを追加するために、今回は Seller のステージをベースにクローンを作成します。

![OrderCloud](/static/images/2022/02/release16.png)

名前を Buyer Test に変更をして、進めていきます。まず最初に、展開をする App Service として buyer のインスタンスを指定します。

![OrderCloud](/static/images/2022/02/release17.png)

続いて Bash Script の項目を指定しますが、Inline のスクリプトを以下のコードに変更してください。

```
node inject-css defaultbuyer-test && node inject-appconfig defaultbuyer-test
```

ディレクトリの指定も Seller の設定が引き継がれているため、これに関してもディレクトリを変更します。

![OrderCloud](/static/images/2021/09/ordercloud70.gif)

結果、以下のような設定となります。

![OrderCloud](/static/images/2022/02/release18.png)

続いて Deploy Azure App Service の設定を進めます。変更点はリソースグループの指定、およびスロットとして test を指定する点となります。

![OrderCloud](/static/images/2022/02/release19.png)

### 全体の調整

上記まで手順を進めていくと、以下のような形で３つのステージが設定されています。

![OrderCloud](/static/images/2022/02/release20.png)

それぞれのステージが始まるまえに1分待機させたいと思いますので、Seller Test の左側にあるアイコンをクリックします。このアイコンをクリックして、Gates の設定を 1 分にします。これで前の展開が終わって 1 分の間隔を開けてスタートする形になります。

![OrderCloud](/static/images/2022/02/release21.png)

これは Buyer に関しても同じ設定をしてください。

これでリリースの設定が完了しました。保存をしてリリースの手順を進めていきます。

## 最初のリリースを実行する

左側のメニューで Pipelines - Releases をクリックすると下のような画面になります。

![OrderCloud](/static/images/2022/02/release22.png)

まだ何もリリースしていなため、右上の Create Release のボタンをクリックします。すると以下の画面に切り替わります。Middleware Test を指定してください。

![OrderCloud](/static/images/2022/02/release23.png)

Create を押すとリリースが作成されます。

![OrderCloud](/static/images/2022/02/release24.png)

Release 1 を選択して、Middleware Test にマウスカーソルを合わせて、Deploy ボタンをクリックします。

![OrderCloud](/static/images/2022/02/release25.png)

画面が切り替わりますので、Deploy のボタンをクリックしてください。

![OrderCloud](/static/images/2022/02/release26.png)

これで設定をした通りの形で展開されていきます。

![OrderCloud](/static/images/2022/02/release27.png)

## まとめ

ここまで Headstart のデモを Azure に展開をするための手順として紹介をしていきました。展開をしただけでは動かないため、次回で追加の設定と確認方法を紹介していきます。
