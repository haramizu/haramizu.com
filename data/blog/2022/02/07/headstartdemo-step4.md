---
title: Headstart デモ環境を構築する - Part 4 ミドルウェアの起動
date: '2022-02-07'
tags: ['Sitecore', 'OrderCloud']
draft: false
summary: 今回は、前回準備した Azure のリソースを利用しながら、ローカルの環境でミドルウェアを起動する手順を紹介します。ミドルウェアの手順に関しては、Visual Studio を利用して作業をする形となります。
images: ['/static/images/2022/02/vs07.png']
---

今回は、前回準備した Azure のリソースを利用しながら、ローカルの環境でミドルウェアを起動する手順を紹介します。ミドルウェアの手順に関しては、Visual Studio を利用して作業をする形となります。

## Visual Studio でプロジェクトを開く

ミドルウェアの作業をするために、Visual Studio を起動してソリューションファイルを開きます。ソリューションファイルは以下のディレクトリにあります。

- src/Middleware/Headstart.sln

開くと以下のような画面となります。

![OrderCloud](/static/images/2022/02/vs01.png)

ソリューションエクスプローラーに表示されている Headstart.API を右クリックして、プロパティを選択してプロジェクトの設定を変更します。

**補足 2022 年 12 月 20 日** .NET Core 6 がターゲットとして変更されています。画像は以下の通り。

![OrderCloud](/static/images/2022/02/vs02-1.png)

今回はデバッグモードを追加する必要があるため、デバッグを選択してください。

![OrderCloud](/static/images/2022/02/vs02.png)

今回のプロジェクトでは、前回作成をした App Configuration の値を参照するようにするため、管理画面の設定 - Access Keys の画面からあらかじめ Connection string の値を取得してください。

![OrderCloud](/static/images/2022/02/vs03.png)

もう一度 Visual Studio に戻って、上記の値を利用する新規のプロファイルを作成します。ここでは Test という名前をつけて、起動に関してはプロジェクトを選択してください。また、環境変数の名前としては、`APP_CONFIG_CONNECTION` を、上記の Connections string を入力します。設定画面は以下のようになります。

![OrderCloud](/static/images/2022/02/vs04.png)

**2022-12-26 更新：** Visual Studio 2022 version 17.4.2 では以下の様な設定画面となります。

![OrderCloud](/static/images/2022/02/vs04-1.png)

設定が完了した段階で、デバッグモードを headstart.API - Test のプロファイルに切り替えます。

![OrderCloud](/static/images/2022/02/vs05.png)

切り替えたあと、Test の横にある三角のアイコンをクリックして、実行します。しばらくするとローカルでミドルウェアが起動して、URL がコンソール画面に表示されます。

![OrderCloud](/static/images/2022/02/vs06.png)

表示されている URL https://localhost:5001 の URL をブラウザで開くと以下のように Web サービスの画面が表示されます。

![OrderCloud](/static/images/2022/02/vs07.png)

正しく Azure の設定ファイルを読み込めているかどうかを確認するために、上記の URL の後ろに env を追加してアクセス ( https://localhost:5001/env )をします。

![OrderCloud](/static/images/2022/02/vs08.png)

Azure で設定している２つの項目が結果として表示されていることがわかります。

```
  "CosmosSettings:DatabaseName": "headstartdemo",
  "EnvironmentSettings:Environment": "Test",
```

これでミドルウェアの起動に関して確認をすることができ、かつ Azure に展開している App Configuration の値を参照していることも確認することができました。

## まとめ

今回はミドルウェアを起動するところまで紹介をしました。次回は OrderCloud にサンプルのデータを追加する手順について紹介をしていきます。

- [Part 5 サンプルデータの準備](/blog/2022/02/08/headstartdemo-step5)
