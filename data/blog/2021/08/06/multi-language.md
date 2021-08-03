---
title: Sitecore における多言語コンテンツの管理
date: '2021-07-27'
tags: ['Sitecore','MultiLanguage']
draft: true
summary: Sitecore Experience Accelerator のモジュールで作成をしているサンプルサイト、スタイルガイドのインストール方法を紹介します。
images: ['/static/images/2021/07/lang08.png']
---

Sitecore は多言語サイトにおいて多く採用されています。背景として

## 言語の追加

コンテンツエディタで言語を見ると、標準のインストールでは en のみが設定されています。

![multi language](/static/images/2021/07/lang01.png)

コントロールパネル - グローバリゼーション - システムに言語を追加する

![multi language](/static/images/2021/07/lang02.png)

定義済みから日本語を選択する

![multi language](/static/images/2021/07/lang03.png)

エンコーディングも今時はすべて utf-8 のままで問題ないでしょう。

![multi language](/static/images/2021/07/lang04.png)

スペルチェックに関しては辞書がないのでスキップをすると、言語の追加が完了となります。

![multi language](/static/images/2021/07/lang05.png)

## アイテムの言語の確認

ホームアイテムを選択すると、右上に言語の切り替えができる項目があります。クリックをすると、英語のコンテンツに対して日本語のコンテンツを追加できるようになっているのがわかります。

![multi language](/static/images/2021/07/lang06.png)

サイトコアの場合、コンテンツに対して言語のデータをそれぞれ持つことができます。もちろん、この部分はロケールを利用して管理することができるので、。。。

## フォールバック言語に関する考え方



## フォールバック言語の追加

追加された言語ファイルを確認しにいきます。コンテンツエディターで /sitecore/system/Languages のアイテムを開くと、ja-JP が追加されていることがわかります。

![multi language](/static/images/2021/07/lang07.png)

ja-JP のアイテムのデータを見にいくとフォールバック言語があります。

![multi language](/static/images/2021/07/lang08.png)

今回は en を指定して保存しておきます。これで、日本語のデータがない場合は英語の情報を利用することになります。

## まとめ

今回は言語の追加方法、およびフォールバック言語について紹介をしました。