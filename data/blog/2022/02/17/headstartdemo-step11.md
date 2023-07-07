---
title: Headstart デモ環境を構築する - Part 11 環境のチェック
date: '2022-02-17'
tags: ['Sitecore', 'OrderCloud']
draft: true
summary: これまでローカルで Headstart のデモを動かし、GitHub を通じて Microsoft Azure にリソースを展開しました。今回は最後のステップとして展開済みの環境に関して動作を確認していきたいと思います。
images: ['/static/images/2022/02/release27.png']
---

これまでローカルで Headstart のデモを動かし、GitHub を通じて Microsoft Azure にリソースを展開しました。今回は最後のステップとして展開済みの環境に関して動作を確認していきたいと思います。

## ミドルウェアの設定を追加する

まず最初に展開をしたミドルウェアにアクセスをしてみます。

![OrderCloud](/static/images/2022/02/headstart01.png)

無事動いているように見えますが、URL に /env を入れてみると結果はどう表示されるでしょうか？

![OrderCloud](/static/images/2022/02/headstart02.png)

環境としては Test を取得できていますが、CosmosDatabase の項目が空欄になっていることがわかります。これはローカルでは App_Congirutation を参照するように指定していましたが、単に展開されただけでこの指定が含まれていないためです。これを反映させるために以下の手順を進めてください。

1. App_Congirutation から接続文字列を取得する
2. Middleware を展開した App Servcie の Test スロットを開く
3. 左側の構成のメニューを選択
4. 新しいアプリケーション設定 をクリックする
5. `APP_CONFIG_CONNECTION` の名前で、App Configuration から取得した接続文字列を入れる
6. 保存する

![OrderCloud](/static/images/2021/09/ordercloud77.gif)

保存が終わると、インスタンスは再起動します。あらためて、/env を入れた URL にいくと結果が変わります。設定を読み込むことができていることがわかります。

![OrderCloud](/static/images/2022/02/headstart03.png)

## Seller でログインをする

Seller のテストインスタンスにアクセスをします。最初はログイン画面が表示されます。

![OrderCloud](/static/images/2022/02/headstart04.png)

ログインをすると、Welcome 画面が表示されます。これで Seller のアプリが OrderCloud のサービスおよびミドルウェアと正しく接続できていることがわかります。

![OrderCloud](/static/images/2022/02/headstart05.png)

実際にプロダクトのページを見にいくと、正しく動作していることがわかります。

![OrderCloud](/static/images/2022/02/headstart06.png)

## Buyer サイトにアクセスをする
