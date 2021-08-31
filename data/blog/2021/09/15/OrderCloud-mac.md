---
title: Sitecore OrderCloud HeadStart - macOS で動作させる
date: '2021-09-15'
tags: ['OrderCloud','Demo','HeadStart']
draft: true
summary: これまで Sitecore OrderCloud の展開に関して、このブログでは Windows の環境で Visual Studio を動かして手順を紹介していました。これは macOS の上でも動くでしょうか？今回は、環境を macOS に変更をして、前回まで動かしていたリポジトリのソースコードを使いながら確認をしていきたいと思います。
images: ['/static/images/2021/09/macos11.png']
---

これまで Sitecore OrderCloud の展開に関して、このブログでは Windows の環境で Visual Studio を動かして手順を紹介していました。これは macOS の上でも動くでしょうか？今回は、環境を macOS に変更をして、前回まで動かしていたリポジトリのソースコードを使いながら確認をしていきたいと思います。

## 環境の確認

今回は以下の環境を前提として説明をしていきます。

* macOS Big Sur 11.5.2
* Visual Studio for Mac 8.10.8
* Visual Studio Code バージョン: 1.59.1
* Node.js v14.17.0

また前回まで紹介をしていた環境を macOS で動かすというのが前提のため、Azure にセットアップする情報などは以前のブログ記事を参考にしてください。

## Middleware を起動する

Middleware は .NET Core 3.1 で開発しているため、Visual Studio for Mac でプロジェクトを開くことができます。

![macos](/static/images/2021/09/macos01.png)

Windows で作業をしていた時は、プロジェクトのプロパティを開いてプロファイルを作成していました。今回は、以下の手順を進めていきます。

まず最初に、ソリューションのビルドを実行します。

![macos](/static/images/2021/09/macos02.png)

Headstart.API を右クリックして、オプションを開きます。

![macos](/static/images/2021/09/macos03.png)

実行 > 構成を選択して、下に表示されている新規をクリックします。

![macos](/static/images/2021/09/macos04.png)

新しい構成は Test とします。

![macos](/static/images/2021/09/macos05.png)

Test の構成を開いて、環境変数に関しては *APP_CONFIG_CONNECTION* に変更し、Azure Portal の App Configuration から接続文字列を取得して値として設定します。また、ターミナルウィンドウで実行するもチェックします。

![macos](/static/images/2021/09/macos06.png)

ASP.NET Core のタブに切り替えて、アプリの URL を http://localhost:5001 に変更する。

![macos](/static/images/2021/09/macos07.png)

OK をクリックして構成を保存します。続いて、左上に表示されている Headstart.API をクリックすると、構成を選択することが可能になっています。ここでは、Headstart.API - Test を選択します。

![macos](/static/images/2021/09/macos08.png)

選択をした後、実行してください。指定をした http://localhost:5001 で middleware が起動していることをブラウザで確認、ターミナルにも表示されていることがわかります。

![macos](/static/images/2021/09/macos09.gif)

これで Middleware は起動しました。

## Seller Admin / Buyer Storefront の起動

Headstart のサンプルの src/UI のディレクトリをルートとして、Visual Studio Code を起動します。

![macos](/static/images/2021/09/macos10.png)

Windows の時と同じように、まずは SDK をビルドしましょう。コマンドは以下の３行を順に実行していきます。

```
cd SDK
npm install
npm run build
```

![macos](/static/images/2021/09/macos11.png)

続いて buyer に関して npm install まで実行します。

```
cd ..
cd buyer
npm install
```

同様に、seller に関しても npm install まで実行をしてください。

```
cd ..
cd seller
npm install
```

これで準備が完了しました。まず最初に、Seller を起動しましょう。

```
npm run start
```

しばらくすると、ブラウザが開いて Headstart Admin が表示されます。

![macos](/static/images/2021/09/macos12.png)

すでに作成している管理者アカウントでログインをすると、以下のように管理画面が開きました。

![macos](/static/images/2021/09/macos13.png)

同じように buyer を起動します。別のターミナル画面を開いて、buyer ディレクトリに移動、npm run start を実行してください。

![macos](/static/images/2021/09/macos14.png)

しばらくすると、Buyer のサイトが起動します。

![macos](/static/images/2021/09/macos15.png)

無事、３つのインスタンスが起動した形となります。

## まとめ

HeadStart のデモは .NET Core 3.1 ベースのため macOS でも動作するはず、ということで動かしただけの記事となりますが、開発をする人にとっては OS を選択しないという点では大変便利な部分となります。