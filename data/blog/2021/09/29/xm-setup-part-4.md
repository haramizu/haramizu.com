---
title: Sitecore XM シリーズ - Sitecore Headless Rendering インストール
date: '2021-09-29'
tags: ['Sitecore','インストール','Headless','XM']
draft: true
summary: 今回は Sitecore Experience Manager (XM) の環境にヘッドレスのモジュールをインストールする手順を紹介していきます。すでに紹介したように、XM をインストールアシスタントを利用してインストールをすると、 CM / CD と分かれた環境が展開されます。この環境で、Sitecore ヘッドレスに関するモジュールをインストールする手順を紹介していきます。
images: ['/static/images/2021/09/xm36.png)']
---

今回は Sitecore Experience Manager (XM) の環境にヘッドレスのモジュールをインストールする手順を紹介していきます。すでに紹介したように、XM をインストールアシスタントを利用してインストールをすると、 CM / CD と分かれた環境が展開されます。この環境で、Sitecore ヘッドレスに関するモジュールをインストールする手順を紹介していきます。

手順に関しては、以下の JSS のサイトの紹介に沿って進めていく形です。

* [Installing Headless Services](https://doc.sitecore.com/xp/en/developers/hd/190/sitecore-headless-development/installing-headless-services.html)

## 前提条件

今回はこれまで紹介をしてきた環境をそのまま使います。このため、以下の環境が基本となります。

* Sitecore 10.1.1 
    * XM1 の構成（CD / CM を分離）している構成

## モジュールのダウンロード & インストール

インストールは以下のモジュールを利用します。

* [Sitecore Headless Rendering 18.0.0](https://dev.sitecore.net/Downloads/Sitecore_Headless_Rendering/18x/Sitecore_Headless_Rendering_1800.aspx)

管理画面に入り、コントロールパネル - 管理 - パッケージをインストールするを選択して、ダウンロードしたファイルをインポートします。

![XM](/static/images/2021/09/xm35.png)

モジュールのインストールが終わった後、API キーを作成します。

1. コンテンツエディターを開きます
2. システム - 設定 - サービス - API Keys を選択します
3. 新しい API キーを作成
4. CORS Origines / 認められたコントローラーには * を設定、偽装ユーザーは extranet¥anonymous を指定します

![XM](/static/images/2021/09/xm36.png)

5. 作成をした API キーをパブリッシュして有効にします

作成をしたアイテム ID が API キーになります。この作成された API キーを利用して、キーが有効になっているか以下のような URL でアクセスをして確認をします。Json のデータが表示されれば、API キーが有効になりました。

```
http://your-sitecore-instance/sitecore/api/layout/render/jss?item=/&sc_apikey=TEST
```

![XM](/static/images/2021/09/xm37.png)

## CD サーバーへの展開

パッケージをインストールした段階で、ヘッドレスの機能はCM サーバーで動くようになりましたが CD サーバーでも利用したい、というケースでは、以下のように手作業でインストールをします。

1. モジュールのファイルを解凍、その中から出てくる Package.zip も解凍します
2. files フォルダにある App_Config、bin , sitecore, Views にあるファイルを CD サーバーに展開します
3. web.config の &lt;handlers&gt; に以下の行を追加します。

```xml
<add verb="*" path="sitecorejss_media.ashx" type="Sitecore.JavaScriptServices.Media.MediaRequestHandler, Sitecore.JavaScriptServices.Media" name="Sitecore.JavaScriptServices.Media.MediaRequestHandler" />
```

CD サーバーを再起動して手順は完了となります。動作確認としては、改めて CD サーバーで動作しているかどうか確認をしてください。

```
http://your-cd-instance/sitecore/api/layout/render/jss?item=/&sc_apikey=TEST
```

## まとめ

これらの設定でヘッドレス CMS として動かすための手順が完了しました。CD サーバーでも動かすときには手作業でモジュールを入れる形で紹介をしました。実際のエンドポイントをどこに置くのかで、CM サーバーのみでいくか、CD サーバーを利用するのかは変わってくる形です。

## 参考情報

* [Installing Headless Services](https://doc.sitecore.com/xp/en/developers/hd/190/sitecore-headless-development/installing-headless-services.html)