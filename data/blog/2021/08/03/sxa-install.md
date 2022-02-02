---
title: Sitecore Experience Accelerator インストール
date: '2021-08-03'
tags: ['Sitecore','SXA','インストール']
draft: false
summary: Sitecore のモジュール集となる Sitecore Experience Accelerator のモジュールのインストール方法をここでは紹介をしています。
images: ['/static/images/2021/07/sxa09.png']
---

Sitecore のモジュール集となる Sitecore Experience Accelerator のモジュールのインストール方法をここでは紹介をしています。

## 前提条件

今回は、以下の環境で作業を進めていきます。

* Sitecore Experience Platform 10.1 update 1
* 日本語リソース適用済み

Sitecore インストールをしたクリーンな環境、というところです。それではインストールを進めていきましょう。

## モジュールのダウンロード

今回は Sitecore Experience Accelerator としては Sitecore 10.1 向けのモジュールをダウンロードします。ファイルは以下のページからダウンロードが可能です。

* https://dev.sitecore.net/Downloads/Sitecore_Experience_Accelerator/10x/Sitecore_Experience_Accelerator_1010.aspx

ダウンロードをするファイルは、Downloads のエリアにある２つのファイルとなります。

* Sitecore Experience Accelerator
* Sitecore PowerShell Extension for Sitecore

## モジュールのインストール

Sitecore に管理者権限を利用してログインをします。**コントロールパネル**を開いて、**管理** - **パッケージをインストールする**をクリックします。

![SXA](/static/images/2021/07/sxa01.png)

ここでパッケージのアップロードをクリックします。ダウンロードをした２つのファイルを指定してください。

![SXA](/static/images/2021/07/sxa02.png)

次へ、アップロードのボタンをクリックして２つのモジュールを Sitecore にアップロードします。続いてパッケージの選択をします。これは、Sitecore PowerShell Extension for Sitecore を先にインストールする必要があるためです。

![SXA](/static/images/2021/07/sxa03.png)

![SXA](/static/images/2021/07/sxa04.png)

次へ、という形でモジュールのインストールを進めていき、モジュールのインストールが完了したところで、Sitecore Experience Accelerator のモジュールのインストールをします。

![SXA](/static/images/2021/07/sxa05.png)

## 日本語リソースの追加

モジュールのインストールが完了したあと、日本語のリソースを追加していきます。日本語のリソースに関しては不足している部分もあるため、Github に追加のリソースファイルも公開しています。事前にダウンロードをしてください。

* https://github.com/SitecoreJapan/InstallScript/tree/master/101 SXA-ja-JP-update.xml

リソースのインポートの際には、**コントロールパネル** を開き、**グローバリゼーション** - **言語ファイルをインポートする** を選択します。以下のダイアログが開くので、/temp/SXAtranslations/ja-JP.xml のファイルを指定してください。これが SXA の日本語リソースになります。

![SXA](/static/images/2021/07/sxa06.png)

このリソースは、リソースにターゲットとなるデータベースも含まれているため、 core を選択したまま進めて大丈夫です。インポートのボタンをクリックして進めていくと、インポートの作業が始まります。

![SXA](/static/images/2021/07/sxa07.png)

続いて、ダウンロードをしていたリソースファイルのアップロード、インポートを実行します。今回は、/temp/SXAtranslations の中に SXA-ja-JP-update.xml をアップロードして、ファイルを指定してインポートをします。

![SXA](/static/images/2021/07/sxa08.png)

## 動作確認

SXA のモジュールのインストール、および日本語リソースのインストールが完了しました。動作確認として、コンテンツエディターを開いて、コンテンツツリーから Content を選択、右クリックをするとメニューが表示されます。

![SXA](/static/images/2021/07/sxa09.png)

表示されたメニューにテナントが含まれていれば、SXA のモジュールのインストールに成功したことになります。

## まとめ

SXA のモジュールのインストールは、Sitecore のモジュールインストールの際に標準的なインストール手順となります。参考にしていただければと思います。