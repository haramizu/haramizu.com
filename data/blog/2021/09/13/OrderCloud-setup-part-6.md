---
title: Sitecore OrderCloud HeadStart - Part 6 展開後の調整
date: '2021-09-13'
tags: ['OrderCloud','Demo']
draft: true
summary: 無事ローカルで動いていたアプリケーションが Azure の各インスタンスに展開されました。とはいえ、もう少しだけ設定を変更していく必要があります。今回はこの部分を進めていきます。
images: ['/static/images/2021/09/ordercloud81.png']
---

無事ローカルで動いていたアプリケーションが Azure の各インスタンスに展開されました。とはいえ、もう少しだけ設定を変更していく必要があります。今回はこの部分を進めていきます。

## Middleware の設定

Middleware をローカルで動かしている時は、Azure の設定を参照して動くようにしていました。このため、Azure に展開した Middleware も設定を反映させるようにします。

1. App_Congirutation から接続文字列を取得する
2. Middleware を展開した App Servcie の Test スロットを開く
3. 左側の**構成**のメニューを選択
4. 新しいアプリケーション設定 をクリックする
5. APP_CONFIG_CONNECTION の名前で、App Configuration から取得した接続文字列を入れる
6. 保存する

以下のような作業となります。

![OrderCloud](/static/images/2021/09/ordercloud77.gif)

設定が変更されたあと、Web サイトにアクセスをすると以下のように Middleware が動いていることがわかります。

![OrderCloud](/static/images/2021/09/ordercloud78.png)

## Seller Admin の設定

続いて、Seller の App Service の Test スロットを開きます。

![OrderCloud](/static/images/2021/09/ordercloud79.png)

参照、もしくは URL をクリックすると管理者画面が開きます。

![OrderCloud](/static/images/2021/09/ordercloud80.png)

すでに作成をしている管理者アカウントでログインをすると、管理画面を参照することができました。

![OrderCloud](/static/images/2021/09/ordercloud81.png)

## Buyer Storefront の設定

Seller と同じように、Buyer のテストスロットを Azure Portal で選択をします。

![OrderCloud](/static/images/2021/09/ordercloud82.png)

参照もしくはサイトの URL にアクセスをすると、下のようにサイトが表示されます。

![OrderCloud](/static/images/2021/09/ordercloud83.png)

これで、全てのサービスが Azure 上で動くようになりました。

## まとめ

これまで 6 回に分けて HeadStart を展開するための手順を紹介していきました。今回はデモサイトを立ち上げるところにフォーカスを絞っていきました。手順をなるべく細かく説明するために６回に分けましたが、慣れれば 1日でサイトを立ち上げることができると思います。

## 参考資料

* [GitHub ordercloud-api / headstart](https://github.com/ordercloud-api/headstart)
* [Exploration of Four51 OrderCloud, its architecture, and Headstart setup](https://himadritechblog.wordpress.com/2021/05/04/exploration-of-four51-ordercloud-its-architecture-and-headstart-setup/)