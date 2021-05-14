---
title: Postman の活用
date: '2020-03-19'
tags: ['Tools']
draft: false
summary: 今回は開発、テストをする際に便利な Postman を紹介します。このツールは、Sitecore Content Hub や Sitecore Experience Platform / Commerce でも Web サービス連携での開発の際に、非常に便利なツールとなっています。
---

今回は開発、テストをする際に便利な Postman を紹介します。このツールは、Sitecore Content Hub や Sitecore Experience Platform / Commerce でも Web サービス連携での開発の際に、非常に便利なツールとなっています。

## Postman とは？

Web サービスへの投稿、結果の取得など開発ツールを利用してデータを出力して、という作業はあまり効率的ではありません。Postman は Web サービスに対してアクセスをして、その結果を確認することができる非常に便利なツールです。

基本、無料で利用できるようになっており、有料プランを利用することでチームでの開発が効率よく行えるようになります。

## ダウンロード

ツールのダウンロードは以下のサイトにアクセスすることで可能です。

* [Download Postman App](https://www.postman.com/downloads/)

![](/static/images/2020/03/postmandownload.png)

対応 OS は Windows x32 / x64 、macOS 、Linux となっています。環境に合わせてインストールをしてください。

## 環境の作成、動作

画面の構成としては、左側に Web サービスにアクセスするための参考のデータが表示され、中央から右側に処理をしたいデータを設定、入力することができるようになっています。

![](/static/images/2020/03/postmanhome.png)

ソフトウェアによっては、Postman を利用するための参考データを提供しています。Sitecore Experience Commerce は SDK として、Sitecore Content Hub でもトレーニングで利用するサンプルのデータがあります。

画面の右上には環境を選択することができるドロップダウンボックスがこの画面ではあります。最初は何も環境が設定されていないため、環境に関しては作成をする必要があります。

![](/static/images/2020/03/postmanenvlist.png)

環境の変数を設定することで、サーバーの URL やパラメーター関連でよく利用するものを定義し、Web サービスを呼び出すリクエストはその変数を利用して動作させるということが可能です。

![](/static/images/2020/03/postmansampleenv.png)

実際に呼び出しをするWeb リクエストにおいては、以下のような形で上記のパラメーターを利用することができるようになります。

![](/static/images/2020/03/postmansamplerequest.png)


実際に実行をすると、Response にデータが表示されます。HTTP の実行結果はこのサンプル画面は 200 と表示されており、問題なくデータを取得することができました。

![](/static/images/2020/03/postmanresult.png)

実行結果を確認することができます

## まとめ

Postman に関して簡単に紹介をしました。このツールの使い方を紹介しているブログなども多くありますが、機能はシンプルで、非常に使い勝手が良いものです。無料プランでも個人で作成した環境を複数のマシンで共有することができ、また有料プランになると複数人数での共同作業もできるようになります。

今後もこのブログでたまに Postman が出てくる形になるかと思います。
