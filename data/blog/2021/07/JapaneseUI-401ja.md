---
title: Content Hub - 4.0.1 デモ環境における日本語リソース
date: '2021-06-11'
tags: ['Content Hub']
draft: true
summary: この記事を書いている段階では最新版のデモ環境は Sitecore Content Hub 4.0.1 で動作するようになっています。日本語のリソースに関して、一部インポートに関しての手順でハマることがあるので、今後のためにメモとして共有しておきます。
images: ['/static/images/2021/05/caas_architecture.png']
---

この記事を書いている段階では最新版のデモ環境は Sitecore Content Hub 4.0.1 で動作するようになっています。日本語のリソースに関して、一部インポートに関しての手順でハマることがあるので、今後のためにメモとして共有しておきます。

## 日本語リソースの追加方法

日本語のリソースに関しては、以前のブログの記事で紹介をしています

* [Sitecore Content Hub – 日本語リソースの追加](/blog/2020/03/13/sitecore-content-hub-jajp)

手順は全く同じですが、リソースに関して調整をする必要があります。

## インポートエラー解除

全てのリソースを用意した後、インポートをすると以下のようなエラーが発生します。

![ch401ja](/static/images/2021/06/ch401ja01.png "ch401ja")

この項目はコンテンツ配信で必要となるリソースで、システムがリソースを持っているためインポートでは書き込むことができません。

### リソースの調整

上記のエラーが発生しないように、以下の日本語リソースの適用を翻訳データから削除してください。

* M.Automation.State
    * M.Automation.State.M.PCM.Product.ProductWorkflow.Approved
    * M.Automation.State.M.PCM.Product.ProductWorkflow.Archived
    * M.Automation.State.M.PCM.Product.ProductWorkflow.Draft
    * M.Automation.State.M.PCM.Product.ProductWorkflow.Enrichment
    * M.Automation.State.M.PCM.Product.ProductWorkflow.Validation
* M.ChannelAccount
    * ChannelAccount.CorporateWebsite

その後、インポートをすると一通りデータがインポートされて、