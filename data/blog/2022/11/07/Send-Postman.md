---
title: Sitecore Send の API 連携について
date: '2022-11-07'
tags: ['Sitecore Send']
draft: false
summary: 昨年 Sitecore が買収した Moosend を企業向けのメールマーケティングツールとして Sitecore Send というサービスで展開をしています。このサービスは比較的簡単に導入でき、かつメールマーケティングを実施する上で十分な機能を提供しています。今月は、このツールに関して簡単に紹介をしていきます。今回のテーマは、API 連携です。
images: ['/static/images/2022/11/sitecoresend.png']
---

昨年 Sitecore が買収した Moosend を企業向けのメールマーケティングツールとして Sitecore Send というサービスで展開をしています。このサービスは比較的簡単に導入でき、かつメールマーケティングを実施する上で十分な機能を提供しています。今月は、このツールに関して簡単に紹介をしていきます。今回のテーマは、API 連携です。

すでに Moosend および Sitecore Send の違いに関しては以下の記事で取り上げています。

- [Moosend と Sitecore Send の紹介](/blog/2022/03/11/moosend-and-sitecore-send)

紹介する記事は Moosend でも使えるネタになりますが、Sitecore Send として取り上げていきます。

## API 連携

Sitecore Send の API 連携に関しては以下の記事に記載されています。

[Use the API key to connect to the Sitecore Send web API](https://doc.sitecore.com/send/en/users/sitecore-send/use-the-api-key-to-connect-to-the-sitecore-send-web-api.html)

上記のページの API の URL が http://api.sitecocoresend.com になっていますが、正しくは https://api.sitecoresend.io になりますのでこの点はご注意ください。

また、API 連携に関しては、Moosend の文書が参考になります。

- [Moosend API](https://moosendapp.docs.apiary.io/#)

実際に上記のドキュメントを見ていく形になりますが、それよりも簡単に手元で動かすことができる Postman 連携を次に紹介をします。

## Postman 連携

API 連携での開発、テストで便利なツール Postman のコレクションを作成して、以下のリポジトリで公開をしています。

- https://github.com/SitecoreJapan/SitecoreSendPostmanCollection

使い方は簡単で、上記のリポジトリから json ファイルを２つダウンロードして、Postman にインポートをしてください。

![api key](/static/images/2022/11/postman01.png)

続いて Environment に API キーの項目があります。

![api key](/static/images/2022/11/postman02.png)

この API キーは Sitecore Send の **設定** - **API キー** から確認することができます。

![api key](/static/images/2022/11/sitecoresendapikey.png)

なお、Moosend で利用するときには hostname を api.moosend.com に変更することで同じコードを利用することが可能です。

## テスト

今回は Mailing list - Getting Mailing lists - Getting all active mailing lists をテストしてみます。このサンプルは API キーを入れておけば動作するため非常に簡単です。

![api key](/static/images/2022/11/postman03.png)

画面の下のところには、結果となる Json 形式のデータが返ってきていることがわかります。この形式を xml にする場合は、Environment の項目にある json を xml にすることで XML のデータを取得することも可能です。

サンプルを見ると、

- メーリングリストを作成する
- メーリングリストにユーザーを追加する
- 追加フィールドの作成

などがあり、管理画面でできることを API 経由で実行することが可能なこともわかります。

## まとめ

今回は Sitecore Send の API 機能に関して取り上げました。ここだけでも深堀するといろいろとブログ記事をかけると思いますが、実際にはサンプルを見てもらって実行してもらうのが良いので、今回は Postman で利用できるコレクションを作成して公開をしました。