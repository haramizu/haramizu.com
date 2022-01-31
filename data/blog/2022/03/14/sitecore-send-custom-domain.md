---
title: Sitecore Send - カスタムドメインの設定
date: '2022-03-14'
tags: ['Sitecore Send','Moosend']
draft: true
summary: Sitecore Send が提供するランディングページ機能を利用する際に、カスタムドメインを設定することが可能です。カスタムドメインには２つあり、プラっtフォームのカスタムドメイン、ランディングページのカスタムドメインの２つです。これを利用することで、簡単なページを既存の Web サイトとは別で立ち上げることが可能となります。今回はこの設定について紹介をします。
images: ['/static/images/2022/03/customdomain04.png']
---

Sitecore Send が提供するランディングページ機能を利用する際に、カスタムドメインを設定することが可能です。カスタムドメインには２つあり、プラっtフォームのカスタムドメイン、ランディングページのカスタムドメインの２つです。これを利用することで、簡単なページを既存の Web サイトとは別で立ち上げることが可能となります。今回はこの設定について紹介をします。

## 事前準備

カスタムドメインを設定するためには、まず最初に DNS に CNAME の項目を追加する必要があります。右上のアカウントのアイコンをクリックすると **設定** が表示されます。

![Sitecore Send](/static/images/2022/03/customdomain01.png)

設定画面に切り替わると、ブランディングの項目がありますのでこれを開きます。

![Sitecore Send](/static/images/2022/03/customdomain02.png)

デフォルトでは、アカウントを作成したドメイン名が指定されています（上記の画面では少し削除しています）。例えば、契約をして提供されているサイト名が sample.sitecoresend.io となっていれば、その項目が表示されます。この名前に CNAME でカスタムドメインを指定することになります。

以下の画面が Azure DNS を利用している際の CNAME の設定画面（参考）です。

![Sitecore Send](/static/images/2022/03/customdomain03.png)

DNS の設定は多少時間をかけて反映されるため、しばらく時間を置いてから次の手順に進みます。

## カスタムドメインの設定

ブランディングの画面にもう一度戻り、右上にあるドメインを新規作成のボタンをクリックします。ダイアログが表示されるので、１つ前の手順で設定をしたドメイン名を入力してください。

![Sitecore Send](/static/images/2022/03/customdomain04.png)


## 参考情報

* [Configure your domain](https://doc.sitecore.com/send/en/users/sitecore-send/configure-your-domain.html)
* [Add, verify, and delete a custom domain](https://doc.sitecore.com/send/en/users/sitecore-send/add,-verify,-and-delete-a-custom-domain.html)