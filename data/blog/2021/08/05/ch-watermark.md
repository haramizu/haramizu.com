---
title: Sitecore Content Hub - ウォーターマークについて
date: '2021-08-05'
tags: ['Sitecore','Content Hub']
draft: false
summary: Sitecore Content Hub のアセット管理の機能で、ウォーターマークの機能を提供しています。この機能を検証する手順に関してまとめてみました。
images: ['/static/images/2021/08/chwatermark15.png']
---

Sitecore Content Hub のアセット管理の機能で、ウォーターマークの機能を提供しています。この機能を検証する手順に関してまとめてみました。

## DAM ユーザーを作成

検証用のアカウントとして、まずは DAM にアクセスすることができるユーザーを作成していきます。

### ユーザーの追加

今回は Demo.DAM というユーザーを作成して確認をしていきます。ユーザー名として Demo.DAM を用意し、アクセスできるモジュールとしては **メディア** および **製品** の２つを選択します。

![watermark](/static/images/2021/08/chwatermark01.png)

ユーザーグループに関しては Everyone だけを指定します。

![watermark](/static/images/2021/08/chwatermark02.png)

プロファイルの編集を開いてアカウントのメールアドレスを設定、パスワードのリセットを押してメールを設定したメールアドレスにリセットメールを送信します。メールを受け取り、パスワードを設定すると作成したアカウントでログインをすることができます。ログインをした際の画面は以下の通りで何も表示されることはありません。

![watermark](/static/images/2021/08/chwatermark03.png)

### ユーザーグループの作成

新しくアセットを表示するためのユーザーグループを作成していきます。**Demo.DAM.Readers** というユーザーを作成し、利用できるモジュールとしてはメディアを指定します。

ルールに関しては２つ追加をします。まず、M.Asset （アセット）に対して、M.Final.LifeCycle.Status: Approved の条件を追加し、権限としては Read / DownloadPreview / ViewNotWatemark の 3 つをチェックします。アセットの更新の権限を与える場合は Update 、アセット削除の権限を与える場合は Delete などをチェックしますが、今回の目的は最低限の機能だけ設定できればよいので、３つだけチェックしています。

![watermark](/static/images/2021/08/chwatermark04.png)

上記だけではアセットへの権限が付与されただけで、アセットを表示するためのページへのアクセス権が設定されていません。Portal.Page の権限として、アセット詳細 に読み込みの権限を設定します。

![watermark](/static/images/2021/08/chwatermark05.png)

この作成したユーザーグループを Demo.DAM のユーザーに追加します。

![watermark](/static/images/2021/08/chwatermark06.png)

権限をつけたあと、管理ツールのキャッシュのクリアをしてください。これで、Demo.DAM がアクセスをした時には最新の権限でアクセスすることができます。

![watermark](/static/images/2021/08/chwatermark07.png)

アセットをクリックすると、アセット詳細のページが表示されます。

![watermark](/static/images/2021/08/chwatermark08.png)

これで DAM のアセットを読み込むことができるユーザーの作成ができました。

## ウォーターマークに関して

Sitecore Content Hub のウォーターマークに関して紹介をしているページは以下の通りです。

* [Dynamic watermarking](https://docs.stylelabs.com/content/4.0.x/user-documentation/administration/processing/watermarking/overview.html)

標準のウォーターマークに関する設定は、今回の環境では以下のようになっています。

![watermark](/static/images/2021/08/chwatermark09.png)

日付の項目が空欄の時には、日付の型式を指定してください。

![watermark](/static/images/2021/08/chwatermark10.png)

ウォーターマークを作成する手順に関しては以下のページで紹介されていますが、今回はデフォルトのウォーターマークで進めていきます。

* [Create a watermark](https://docs.stylelabs.com/content/4.0.x/user-documentation/administration/processing/watermarking/create-new-watermark.html)
* [Watermark settings](https://docs.stylelabs.com/content/4.0.x/user-documentation/administration/processing/watermarking/watermark-settings.html)

## ウォーターマークの権限を作成

ウォーターマークの権限に関してのセットアップは以下のページに記載されています。

* [Set up watermark permissions](https://docs.stylelabs.com/content/4.0.x/user-documentation/administration/processing/watermarking/set-up-watermark-permissions.html)

まずはウォーターマークを利用するユーザーグループの作成を進めていきます。

### ユーザーグループの作成

今回はユーザーグループとして Demo.DAM.Watermark を作成します。

![watermark](/static/images/2021/08/chwatermark11.png)

続いてアクセス件に関しては、先ほどと同じ権限を付与します。

![watermark](/static/images/2021/08/chwatermark12.png)

続いてアセット詳細のページを表示するようにしますが、前回と異なるのは ViewNotWatermark を設定しないことです。

![watermark](/static/images/2021/08/chwatermark13.png)

### ユーザーの権限を変更する

権限として、もともと作成をした権限ではなく Demo.DAM.Watermark の権限を付け直します。

![watermark](/static/images/2021/08/chwatermark14.png)

権限の設定を変更したあとは、一度キャッシュをクリアして、Demo.DAM のアカウントでアセット詳細のページをみにいきます。すると以下のような画面になります。

![watermark](/static/images/2021/08/chwatermark15.png)

## まとめ

ユーザーグループの権限でウォーターマークを入れる、入れないの設定をすることが可能なのを確認しました。ウォーターマークの表示方法に関しては、管理ツールのウォーターマークから設定することができますので、ロゴを変更するなども可能です。