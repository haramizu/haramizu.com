---
title: スタンダードバリュー - その１ 初期値について
date: '2022-04-19'
tags: ['Sitecore', 'XM']
draft: false
summary: これまでフィールド形式を指定してコンポーネントを作成するところを紹介していましたが、ページの編集をする人の手間を省くために、標準の値に関して設定をすることができるスタンダードバリューについて紹介をします。この機能は、Sitecore のヘッドレスの機能固有のものではなく、普通の Sitecore の機能のため、設定をしていない場合は運用に併せてどういう設定が良いか検討していただきたい項目です。
images: ['/static/images/2022/04/standardvalue07.png']
---

これまでフィールド形式を指定してコンポーネントを作成するところを紹介していましたが、ページの編集をする人の手間を省くために、標準の値に関して設定をすることができるスタンダードバリューについて紹介をします。この機能は、Sitecore のヘッドレスの機能固有のものではなく、普通の Sitecore の機能のため、設定をしていない場合は運用に併せてどういう設定が良いか検討していただきたい項目です。

## スタンダードバリューの設定方法

アイテムを作成した時に、標準の値を設定したい時に利用できるのがスタンダードバリューという仕組みになります。これはテンプレートを定義する画面で設定することができ、アイテムを作成した時に初期値として設定される形です。

以下のページで詳細は紹介されています。

- [スタンダード バリュー](https://doc.sitecore.com/xp/ja/developers/101/sitecore-experience-manager/standard-values.html)
- [スタンダード バリューの設定](https://doc.sitecore.com/xp/ja/developers/101/sitecore-experience-manager/configure-standard-values.html)

まず最初にアイテムを作成した時のデータとして、アイテム名と同じデータをテキストフィールドに設定する方法を説明します。以前作成をしたテンプレート、`/sitecore/templates/Project/sitecoredemo-jp/Data/TextSample` を利用します。これの作成は、以下のページで紹介しています。

- [コンポーネントの作成とテンプレート連携 - テキスト編](/blog/2022/04/04/create-template-text)

対象となるテンプレートを指定すると、メニューの項目にビルダーオプションが表示されます。リボンを開くと、スタンダードバリューとメニューが表示されます。

![standardvalue](/static/images/2022/04/standardvalue01.png)

メニューをクリックすると、テンプレートの１つ下の階層のアイテムとして \_\_Standard Values という項目が追加されて、空欄のアイテムが作成されます。これが新規作成をする際の初期データのために定義するアイテムとなります。

![standardvalue](/static/images/2022/04/standardvalue02.png)

今回は singlelinetext1 の項目に関して、`$name` という設定を入れてスタンダードバリューを保存してください。

![standardvalue](/static/images/2022/04/standardvalue03.png)

これで初期値の設定が完了となります。

もう一つ、`/sitecore/templates/Project/sitecoredemo-jp/Data/DateNumberSample` のテンプレートのスタンダードバリューを作成してください。値としては日付のところに `$date` を設定する形です。

![standardvalue](/static/images/2022/04/standardvalue04.png)

## トークン

今回、上記のところでは $name や $date という形で突然値を紹介していますが、これらのパラメーターをトークンといいます。Sitecore では以下のトークンが用意されています。

| トークン    | 機能                       |
| ----------- | -------------------------- |
| $name       | アイテムの名前             |
| $id         | アイテムの ID              |
| $parentid   | 親アイテムの ID            |
| $parentname | 親アイテムの名前           |
| $date       | システムの日付 yyyyMMdd    |
| $time       | システムの時間 HHmmss      |
| $now        | 日付と時間 yyyyMMddTHHmmss |

## 検証

まず最初に、先ほど作成をした `TextSample` のテンプレートを利用してアイテムを作成したいと思います。今回は、以下のようなアイテム名で作成をします。

![standardvalue](/static/images/2022/04/standardvalue05.png)

作成すると、`singlelinetext1` に対してアイテム名がそのまま入力されている形です。

![standardvalue](/static/images/2022/04/standardvalue06.png)

このようにアイテムを作成した際のアイテム名を入れる、ということが簡単にできるようになります。続いて、`DateNumberSample` のテンプレートを利用してアイテムを作成します。

![standardvalue](/static/images/2022/04/standardvalue07.png)

仕上がりとしては、日付のところに今日の日付が指定される形です。

![standardvalue](/static/images/2022/04/standardvalue08.png)

## まとめ

今回はアイテムを作成した時の初期値の設定方法としてスタンダードバリューの動きを紹介をしました。今回は、$name $date という形でトークンを指定しましたが、標準で設定する値を入れておくことも可能です。こういった機能を利用することで、日頃のコンテンツ制作作業を少しシンプルにすることが出るようになります。

## 参考ページ

- [スタンダード バリュー](https://doc.sitecore.com/xp/ja/developers/101/sitecore-experience-manager/standard-values.html)
- [スタンダード バリューの設定](https://doc.sitecore.com/xp/ja/developers/101/sitecore-experience-manager/configure-standard-values.html)
