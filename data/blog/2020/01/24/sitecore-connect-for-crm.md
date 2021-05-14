---
title: CRM 連携に関して
date: '2020-01-24'
tags: ['Sitecore']
draft: false
summary: Sitecore 9.3 以降からはメディアのファイルの保存場所として、Azure Storage を利用できるようになりました。このモジュールを利用することで、以下のようなメリットを得ることができます。
---

Sitecore と CRM を接続するためのコネクターを提供しています。対応している CRM は Microsoft Dynamics CRM と Salesforce CRM の２つになります。コネクターのインストール手順に関して、Sitecore 9.3 に対応したページも用意しました。


* [Sitecore Connect for Microsoft Dynamics 365 for Sales](https://sitecorejapan.cmsdemo.jp/93/modules/dynamicscrm.html)
* [Sitecore Connect for Salesforce CRM](https://sitecorejapan.cmsdemo.jp/93/modules/salesforcecrm.html)

仕組みとしては Sitecore とコネクタと連携する仕組みとして Data Exchange Framework というツールを提供しています。これをベースに、Dynamics CRM / Salesforce CRM とは Web サービス経由で連携できるように、それぞれのコネクターを提供している形となっています。

インストールの手順に関して、Salesforce との連携に関しての参考動画も用意しました。

[![](https://img.youtube.com/vi/pyr4RBGbs_4/0.jpg)](https://www.youtube.com/watch?v=pyr4RBGbs_4)
