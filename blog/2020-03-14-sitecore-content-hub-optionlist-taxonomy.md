---
slug: 2020/03/14/sitecore-content-hub-optionlist-taxonomy
title: Sitecore Content Hub – オプションリストとタクソノミー
author: Shinichi Haramizu
author_title: Sitecore Japan
author_url: https://www.haramizu.jp/
author_image_url: https://avatars3.githubusercontent.com/u/5026348?s=400&v=4
tags: [Content Hub]
description: Sitecore Content Hub では定義済みのリストとしてはオプションリストとタクソノミーを提供しています。それぞれの仕組みに関して紹介をします。オプションリストとタクソノミーに関しては、管理画面からツールでアクセスすることができます。
---

Sitecore Content Hub では定義済みのリストとしてはオプションリストとタクソノミーを提供しています。それぞれの仕組みに関して紹介をします。オプションリストとタクソノミーに関しては、管理画面からツールでアクセスすることができます。

<!--truncate-->

## オプションリスト

オプションリストのツールを開くと、以下のような画面になります。

![オプションリスト](../static/img/blog/2020/03/optionlist.png "オプションリスト")

オプションリスト一覧の参照、検索ができるようになっています。実際に個別のリストを参照するために、NewsItemType をクリックすると以下のような画面になります。

![NewsItemType を開く](../static/img/blog/2020/03/newsitem.png "NewsItemType を開く")

上の画面は、すでにhomeFeatured の項目を選択している状況です。このように、オプションリストの個別の項目に対して識別子が指定されており、その識別子を表示する際のラベルの設定ができています。リストを選択した際に、アセットやデータを表示する際に、その表示言語のデータが入っていることで、同じ識別子を多言語で表示できるようになっています。

## タクソノミー

ツールを立ち上げると、様々なタクソノミーの定義一覧がデフォルトで設定されています。

![タクソノミー](../static/img/blog/2020/03/taxonomy.png "タクソノミー")

タクソノミーは、オプションリストのように一覧で管理するだけでなく、システムで利用しているものも多くあります。例えば、M.Final.LifeCycle.Status というタクソノミーを参照すると以下のような形です。

![タクソノミーの情報](../static/img/blog/2020/03/mfinaltaxonomy.png "タクソノミーの情報")

タクソノミーの識別子に関しては一定のルールで記載することを推奨しています。例えば、M.Final.LifeCycle.Status のタクソノミーではアセットの承認状況に関する識別子として利用しており、Approved （承認済）であれば、M.Final.LifeCycle.Status.Approved という識別子となります。このタクソノミーはシステムで利用しているため、変更をすることはできません。

では別のタクソノミーとして、M.AssetType を開きます。

![M.AssetType のタクソノミー](../static/img/blog/2020/03/massettype.png "M.AssetType のタクソノミー")

このタクソノミーについては、「ラベル」が指定されています。ラベルを利用することができる識別子に関しては、定義されているデータに対して多言語での表示が可能となります。これを利用して、実際のタグで英語では Water、日本語では 水、という形でタグを持つことが可能となり、このタグで検索をするということができます。

## まとめ

Sitecore Content Hub で管理をするデータに関してはデータスキーマを拡張することができます。その際に、テキストなどの柔軟な項目ではなく、定義済みのリストを使ってその中から項目を選択する、という運用をするような場合、このオプションリストとタクソノミーを利用してください。

## 関連情報

* [Sitecore Content Hub クイックガイド](/docs/Sitecore/Content-Hub-Quick-Guide)
* [Option lists](https://docs-partners.stylelabs.com/content/3.3.x/user-documentation/administration/data/option-lists/option-lists.html) （英語）
* [Taxonomy](https://docs-partners.stylelabs.com/content/3.3.x/user-documentation/administration/data/taxonomies/taxonomy.html) （英語）
