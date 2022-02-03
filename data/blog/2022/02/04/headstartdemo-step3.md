---
title: Headstart デモ環境を構築する - Part 3 Azure の環境を準備する（その１）
date: '2022-02-04'
tags: ['Sitecore','OrderCloud']
draft: false
summary: コードの準備ができたので、まずは手元でミドルウェアを起動するところまで進めていきます。そのためには、Microsoft Azure の環境にいくつかリソースを準備していく形となるため、この部分の手順も併せて紹介をしていきます。
images: ['/static/images/2022/02/azure17.png']
---

コードの準備ができたので、まずは手元でミドルウェアを起動するところまで進めていきます。そのためには、Microsoft Azure の環境にいくつかリソースを準備していく形となるため、この部分の手順も併せて紹介をしていきます。

## 設定ファイルのテンプレート

Headstart のミドルウェアが動作するために必要となるパラメーターのテンプレートに関しては、このプロジェクトの中に以下のパスで準備しています。

* src/Middleware/src/Headstart.Common/AppSettingConfigTemplate.json

このファイルで設定されているパラメーターで必要なリソースを埋めていくようにしていきます。

## リソースグループの作成

今回は Microsoft Azure に展開をする形で紹介をしていきます。デモ環境で必要となるリソースは Web アプリインスタンス、CosmosDB、Application Insights、App Configuration およびストレージが必要となります。今回はミドルウェアの動作に必要なリソースのみを準備していきます。

まず受け皿となるリソースグループを１つ作成します。

![OrderCloud](/static/images/2022/02/azure01.png)

###  Application Insights の設定

パラメーターの一つ目は Application Insights のデータを入れる必要があります。リソースグループを指定して、今回は以下のように作成をします。

![OrderCloud](/static/images/2022/02/azure02.png)

作成された Application Insights の Instrumentation Key は Overview のページに表示されています。

![OrderCloud](/static/images/2022/02/azure03.png)

この値を、以下のように ApplicationInsightsSettings:InstrumentationKey 反映します。

![OrderCloud](/static/images/2022/02/azure04.png)

### ストレージの設定

続いてストレージを作成します。ストレージの名前を指定して作成をしてください。

![OrderCloud](/static/images/2022/02/azure05.png)

作成が完了したあと、２つのパラメーターを取得します。セキュリティとネットワークにあるアクセスキーから接続文字列を取得してください。

![OrderCloud](/static/images/2022/02/azure06.png)

もう１つのエンドポイントに関しては、設定 - エンドポイントを選択してプライマリ エンドポイントの値を取得します。

![OrderCloud](/static/images/2022/02/azure07.png)

２つの値を AppSetting のファイルに反映させます。

![OrderCloud](/static/images/2022/02/azure08.png)

### CosmosDB の設定

続いてトランザクションのデータを保存する CosmosDB を作成します。API オプションに関してはコア(SQL)を選択してください。

![OrderCloud](/static/images/2022/02/azure09.png)

サブスクリプション、リソースグループを指定して、アカウント名、データセンターの選択をしてください。今回は以下の設定で作成をします。

![OrderCloud](/static/images/2022/02/azure10.png)

作成されたデータベースからは２つの値を取得します。まず設定 - キーを選択すると、このデータベースにアクセスするための情報が表示されます。

![OrderCloud](/static/images/2022/02/azure11.png)

URI の値がエンドポイントの値として、あとはプライマリキーが表示されています。これ以外にヒアDatabaseName に関しては今回は分かりやすくするために同じ値を設定します。

![OrderCloud](/static/images/2022/02/azure12.png)

### App Configuration の設定

作成をしたファイルをインポートする先として、App Configuration をリソースグループに追加します。

![OrderCloud](/static/images/2022/02/azure13.png)

これで手元で準備をしている設定ファイルのインポートの準備が完了しました。

## 設定ファイルのインポート

まだ空欄のパラメーターが多くありますが、取り急ぎ現在の設定をインポートします。

設定ファイルを Visual Studio Code で開くと、元々のファイルのエンコーディングが UTF-8 with BOM LF になっているのがウィンドウの右下で確認することができます。

![OrderCloud](/static/images/2022/02/azure14.png)

これを UTF8 に変更をしてください。変更をする際には、エンコーディングの部分をクリックすると UTF-8 を選択できるようになります。変更後は以下のようになっており、この状況で保存できているのを確認してください。

![OrderCloud](/static/images/2022/02/azure15.png)

UTF-8 になっている状態で、Azure の App Configuration の設定画面を開き、Operations - Import / Export をクリックします。Import の手順として、

* Source service - Configuration file
* For language - Other
* File type - Json

まで指定すると、ファイルのアップロード画面に切り替わります。すでに値を入力済みのファイルを指定すると、以下のように画面が切り替わります。

![OrderCloud](/static/images/2022/02/azure16.png)

**Separator を : に変更**をした後、Apply をクリックします。インポートが完了すると、Operations - Configuration explorer を開くと値がアップロードされていることが分かります。

![OrderCloud](/static/images/2022/02/azure17.png)

## Web アプリ - ミドルウェアを追加

展開をするのは先の方ですが、取り急ぎミドルウェアの URL を決めておくために Web アプリを追加します。ランタイムスタックとしては .NET Core 3.1(LTS) を選択、プランは安いものでデモですので問題ないでしょう。ということで、今回は以下のように作成をしておきます。

![OrderCloud](/static/images/2022/02/azure18.png)

作成が完了した後、左側のメニューからデプロイスロットの項目を選択して、test のスロットを追加します。追加が完了すると、以下のような形となります。

![OrderCloud](/static/images/2022/02/azure19.png)

## まとめ

まだ設定としては不足しているところがありますが、ミドルウェアを立ち上げるために必要な機能の準備ができました。次回はミドルウェアの起動まで紹介をしていきます。
