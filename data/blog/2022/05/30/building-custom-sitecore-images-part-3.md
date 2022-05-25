---
title: Sitecore Docker カスタムイメージの利用 - 管理画面の日本語化
date: '2022-05-30'
tags: ['Docker']
draft: true
summary: カスタムイメージの作成ができましたが、管理画面などは英語のままとなっています。日本語を扱うことができるように、日本語リソースの追加と設定の追加に関しての手順を紹介していきます。
images: ['/static/images/2022/05/customimage14.png']
---

カスタムイメージの作成ができましたが、管理画面などは英語のままとなっています。日本語を扱うことができるように、日本語リソースの追加と設定の追加に関しての手順を紹介していきます。

## CM サーバーへのファイル展開

今回のデモ環境としては、**C:\projects\sitecoredemo-jp\docker\deploy\website** というフォルダがプロジェクトに含まれており、ここにファイルを配置すると CM サーバーのリソースとして動かすことができます。

まず最初に日本語のリソースを入手していきます。今回は、Sitecore Experience Platform の日本語リソース、Sitecore Experience Accelerator の日本語リソースをそれぞれのページからダウンロードをします。

- https://dev.sitecore.net/Downloads/Sitecore_Experience_Platform/102/Sitecore_Experience_Platform_102.aspx
- https://dev.sitecore.net/Downloads/Sitecore_Experience_Accelerator/10x/Sitecore_Experience_Accelerator_1020.aspx

これらのファイルに関して、上記のフォルダに App_Data というフォルダを作成して、リソースを展開します。

![customimage](/static/images/2022/05/customimage13.png)

コンテナを起動したあと、以下の手続きを進めていきます。

1. ログインします
2. Desktop を開きます
3. データベースを Core に切り替えます
4. Control Panel を開いて、 Add a new language をクリック
5. Japanese - Japan を追加します
6. Desktop を開きます
7. データベースを Master に切り替えます
8. User Manager を開きます
9. Admin の設定を開きます
10. Language Settings の Client Language を Japanese(Japan) を選択します
11. ログアウトします
12. Admin でログインします

上記の手順が終わったところで管理画面が日本語になりました。

![customimage](/static/images/2022/05/customimage14.png)

## 追加のリソースファイル

上記のログインでは、PowerShell に関するリソースが不足していることがわかります。このアイコンに関するリソースファイルは https://github.com/SitecoreJapan/InstallScript/tree/master/101 の powershell-report-ja-jp.xml ファイルになります。これを、 **C:\projects\sitecoredemo-jp\docker\deploy\website** の下に temp フォルダを作成してファイルをコピーします。

ファイルを配置したあと、以下の手順でインポートをしていきます。

1. コントロールパネルを開く
2. 言語ファイルをインポートするをクリック
3. ファイルを指定してアップロードを完了させます

![customimage](/static/images/2022/05/customimage15.png)

インポートが完了しました。ここでリソースがそのまま保持されるかどうかを確認するために、リスタートをかけます。

```
docker-compose restart
```

ログインしても保持されていることがわかります。

![customimage](/static/images/2022/05/customimage16.png)

続いてコンテナを削除したあとでも日本語化されているかどうかを確認します。

```
docker-compose down
docker-compose up -d
```

問題なく、日本語化されていることも確認できています。これは、SQL Server のファイルが `docker\data\mssql` の下で展開しており、コンテナを一度落としてもデータは保持されているのを確認できた形です。

## まとめ

今回は日本語化の手順を通じて、サーバーにファイルを展開する方法、Core データベースに必要なデータを入れて反映させる手順を紹介しました。起動しているコンテナに対してアップロードの手順を実施した際には、改めてコンテナを起動した時にはイメージに含まれていないため、日本語リソースがないイメージが起動することになりますが、ファイルを配置しておくことで参照できるようにしています。

## 参考情報

- [Sitecore Docker シリーズ](/blog/sitecore-docker)
