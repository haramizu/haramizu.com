---
title: Sitecore Docker カスタムイメージの利用 - 管理画面の日本語化
date: '2022-05-30'
tags: ['Docker']
draft: false
summary: カスタムイメージの作成ができましたが、管理画面などは英語のままとなっています。日本語を扱うことができるように、日本語リソースの追加と設定の追加に関しての手順を紹介していきます。
images: ['/static/images/2022/05/customimage14.png']
---

カスタムイメージの作成ができましたが、管理画面などは英語のままとなっています。日本語を扱うことができるように、日本語リソースの追加と設定の追加に関しての手順を紹介していきます。

## CM サーバーへのファイル展開

CM サーバーに対してリソースをコピーすることで、日本語化することが可能となります。イメージをビルドする際に、対象となるファイルをコピーするようにします。まず、ローカライズをするリソースファイルのパスを今回は以下のように設定をします。

C:\projects\sitecoredemo-jp\docker\build\cm\localization

日本語のリソースファイルは、以下のページからダウンロードすることができます。今回は、Sitecore Experience Platform の日本語リソースページからダウンロードして展開します。

- https://dev.sitecore.net/Downloads/Sitecore_Experience_Platform/102/Sitecore_Experience_Platform_102.aspx

これらのファイルに関して、上記のフォルダにリソースを展開します。

![customimage](/static/images/2022/05/customimage13.png)

続いて C:\projects\sitecoredemo-jp\docker\build\cm\Dockerfile の Dockerfile がイメージをビルドする際の定義となりますので、以下の１行を追加します。色々なデータをコピーしているため、その最後に入れておく形で問題ありません。

```dockerfile
# Copy Localization Files
COPY .\localization \inetpub\wwwroot\App_Data
```

ファイルの更新が終わったら、このイメージをビルドし直します。

```psh
docker-compose build cm
```

あとは以下の手順となります。

1. docker-comopse up -d で起動する
2. ログインをする
3. デスクトップを開いて Core データベースに切り替える
4. コントロールパネルを開いて言語の追加、日本語を追加する
5. Master データベースに戻す
6. ユーザーの表示言語を日本語にする

これで日本語の UI に切り替えることができました。

![customimage](/static/images/2022/05/customimage14.png)

実際にコンテナにファイルがコピーされているか確認をします。Visual Studio Code のコンテナ一覧から CM を右クリックで選択して、`Attache Shell` を実行します。

![customimage](/static/images/2022/05/customimage25.png)

コマンドラインで App_Data\localization に移動して dir コマンドを実行すると、ファイルがコピーされていることがわかります。

![customimage](/static/images/2022/05/customimage26.png)

## 追加のリソースファイル

上記のログインでは、PowerShell に関するリソースが不足していることがわかります。このアイコンに関するリソースファイルは https://github.com/SitecoreJapan/InstallScript/tree/master/101 の powershell-report-ja-jp.xml ファイルになります。C:\projects\sitecoredemo-jp\docker\build\cm\temp\ というフォルダを作成してファイルをコピーします。続いて Dockerfile に以下のコピーを追加します。

```dockerfile
# Copy temp file
COPY .\temp \inetpub\wwwroot\temp\import
```

改めてイメージを build しなおします。

```psh
docker-compose build cm
```

新しいイメージでコンテナを起動すると、ファイルが temp\import の下に配置されていることを確認できます。あとは以下の手順でリソースのインポートとなります。

1. コントロールパネルを開く
2. 言語ファイルをインポートするをクリック
3. ファイルを指定してアップロードを完了させます

![customimage](/static/images/2022/05/customimage15.png)

インポートを完了させると、PowerShell のアイコンも日本語のリソースが適用されているのがわかります。

![customimage](/static/images/2022/05/customimage16.png)

## まとめ

今回は日本語化の手順を通じて、イメージの中にファイルをコピーする手順を確認しました。合わせて、temp フォルダを経由してリソースファイルをイメージに含めて、 Core データベースに必要なデータを入れて反映させる手順を紹介しました。今後はこのイメージファイルは日本語のリソースを常にインポートしており、言語の追加作業および不足リソースの追加だけで管理画面の日本語化をいつでも行えるようになりました。

## 参考情報

- [Sitecore Docker シリーズ](/blog/sitecore-docker)
