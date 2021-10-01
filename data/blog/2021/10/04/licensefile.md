---
title: ライセンスファイルの更新 
date: '2021-10-04'
tags: ['Sitecore']
draft: false
summary: ライセンスを変更した際に、ライセンスファイルを入れ替える必要が出てきます。今回は、ライセンスファイルの更新手順に関して、紹介をします。
images: ['/static/images/2021/10/license.png']
---

ライセンスを変更した際に、ライセンスファイルを入れ替える必要が出てきます。今回は、ライセンスファイルの更新手順に関して、紹介をします。

## ライセンスファイル

Sitecore のライセンスファイルは license.xml というファイルが提供されて、このファイルで契約しているライセンスを確認して Sitecore のインスタンスが動くようになっています。インストールの際にもライセンスファイルが必要となるので、インストール時は自動的に必要な場所にコピーされますが、ファイルを更新する場合はファイルを更新する必要があります。

### Core ロール

Sitecore の管理サーバーが動いているインスタンスは以下のフォルダにライセンスファイルがあります。

* App_Data 

これは、CD サーバー、CM サーバーなどが対象となります。

* [Core ロールのライセンス ファイルの更新](https://doc.sitecore.com/ja/developers/101/platform-administration-and-architecture/update-core-role-license-files.html)


### Sitecore Host

Sitecore のサービスと動作するサービス、例えば Sitecore Identity Server に関しては、インスタンスの以下のフォルダにファイルを探しにいきます。

* sitecoreruntime

このフォルダにあるライセンスファイルを更新してください。

* [ライセンス](https://doc.sitecore.com/ja/developers/101/sitecore-experience-manager/licensing.html)

### XP ロール

Sitecore XP を動作させる場合、xConnect Server のインスタンスが起動します。この場合は、以下の３つのファイルを更新する必要があります。

* App_Data\jobs\continuous\ProcessingEngine\App_Data
* App_data\jobs\continuous\IndexWorker\App_data
* App_Data\jobs\continuous\AutomationEngine\App_Data

* [XP サービス ロールのライセンス ファイルの更新](https://doc.sitecore.com/ja/developers/101/platform-administration-and-architecture/update-xp-service-role-license-files.html)

## まとめ

ライセンスファイルに関しては、契約の変更や期間限定ライセンスの期間が切れるので改めて、という際にはファイルを更新することになります。