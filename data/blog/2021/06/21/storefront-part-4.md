---
title: Storefront - Postman を利用してアクセスをする
date: '2021-06-21'
lastmod: '2021-06-21'
tags: ['Sitecore', 'デモ', 'インストール', 'Commerce', 'Storefront', 'Postman']
draft: true
summary: Sitecore Experience Commerce は Web API を用意しており、API を利用することでさまざまなことが可能です。今回は、この Web API の動作を確認するために、Postman を利用していくつかのシナリオを実施していきます。
images: ['/static/images/2021/06/storefront07.png']
---

Sitecore Experience Commerce は Web API を用意しており、API を利用することでさまざまなことが可能です。今回は、この Web API の動作を確認するために、Postman を利用していくつかのシナリオを実施していきます。

## Postman をインストールする

Sitecore Experience Commerce の環境にアクセスすることができる環境に、Postman をインストールして作業をしていきます。Postman に関しては以前にも紹介をしました。

- [Postman の活用](/blog/2020/03/19/postman)

choco を利用してインストールすることもできます。

```ps1
choco install postman
```

以下の画面が表示されていれば、インストール完了となります。

![postman](/static/images/2021/06/postman01.png)

## SDK を Postman で利用できるようにする

前回のインストールの手順で c:¥projects¥xc101 にインストールのためのファイルを展開しました。この中に、SDK のファイルが用意されています。

- Sitecore.Commerce.Engine.SDK.7.0.55.zip

このファイルを展開すると、Postman のフォルダが表示されます。

![postman](/static/images/2021/06/postman02.png)

Postman を起動して、File - Import のメニューを選択、Folder のタブに切り替えます。

![postman](/static/images/2021/06/postman03.png)

インポートをするフォルダとして、事前に解凍してあるフォルダの Postman を指定すると、以下のような画面に切り替わります。

![postman](/static/images/2021/06/postman04.png)

全てインポートをすると、Postman の環境が以下のような画面に切り替わります。

![postman](/static/images/2021/06/postman05.png)

続いて接続するための情報をインポートするために、画面の右上にあるアイコンをクリックすると、環境がまだ何も含まれていないことがわかります。

![postman](/static/images/2021/06/postman06.png)

環境のインポートの手順としては、先ほどはフォルダごとでしたが、ファイルを指定してください。

![postman](/static/images/2021/06/postman07.png)

ここに、C:\projects\xc101\Sitecore.Commerce.Engine.SDK.7.0.55\postman の下にある２つの json ファイルをドラッグ＆ドロップでインポートをします。すると環境ファイルが２つチェックされている画面に切り替わります。

![postman](/static/images/2021/06/postman08.png)

## 証明書に関する動作

標準でインストールをした場合、Sitecore Experience Commerce は SSL に関して自己証明書で動作しています。Postman はデフォルトでは SSL の検証をするため、自己証明書を利用している場合は正しい動作をしません。このため、この設定をオフにするために、File - Settings を開きます。

![postman](/static/images/2021/06/postman09.png)

左側の上から２つ目の SSL Certificate verification の項目をオフにするとで、自己証明書でも使えるようになります。

## Sitecore Experience Commerce の環境に合わせる

接続するために、環境に合わせた設定を入れていきます。Postman 環境を、Habitat Environment に切り替えて、各種パラメーターを変更していきます。

| 項目名                   | 入力値                                       |
| ------------------------ | -------------------------------------------- |
| SitecoreIdServerHost     | Sitecore Identity Server の URL を指定します |
| SitecoreIdServerPassword | 管理者のパスワードを設定します               |
| HostName                 | サーバー名を設定します                       |

上記の設定を変更したあと、保存をしてください。

## 動作検証

上記の設定まで完了しているのを前提として、以下の手順で動作検証を実施してみます。

1. Postman の Collections （左側のパネル）から Authenticaion - Sitecore - GetToken を選択します。

![postman](/static/images/2021/06/postman10.png)

2. Send ボタンをクリックすると、設定が正しければ 200 OK と表示されて Token を取得することができます。

![postman](/static/images/2021/06/postman11.png)

上記の手順で、access_token を取得できていれば、動作確認完了です。

## まとめ

API を利用して Sitecore Experience Commerce にアクセスをしてデータを取得できることを確認しました。この API を利用して、システム連携を仕上げていくという形となります。次回は、カタログデータに関して紹介をしますが、Sitecore の管理画面ではなく API でのカタログデータの取得、というのを紹介させていただきます。
