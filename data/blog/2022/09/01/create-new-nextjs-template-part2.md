---
title: Next.js サンプルサイトの追加（後編）
date: '2022-09-01'
tags: ['Headless', 'Next.js']
draft: true
summary: 前々回に Next.js のテンプレートの準備を、前回はそれを利用するための Sitecore にアイテムをインポートする手順を紹介しました。今回は Next.js の設定を変更して、Sitecore のアイテムを参照してページが表示されるところまで紹介をします。
images: ['/static/images/2022/03/component06.gif']
---

前々回に Next.js のテンプレートの準備を、前回はそれを利用するための Sitecore にアイテムをインポートする手順を紹介しました。今回は Next.js の設定を変更して、Sitecore のアイテムを参照してページが表示されるところまで紹介をします。

## 設定ファイルを反映させる

テンプレートを作成すると以下のファイルが生成されています（プロジェクト名によって .config ファイルの名前が変わります。

- src\rendering\sitecore\config\sitecoredemo-jp.config

ファイルを反映させたあと、以下のコマンドでコンテナに反映させます。

```
docker-compose build cm
```

これで CM サーバーに対して設定ファイルを反映させることができました。

## Next.js のローカルプロジェクトのテスト

src\rendering\.env のファイルに対して、SITECORE_API_KEY と SITECORE_API_HOST の項目を設定してください。前者はすでに作成している API キーを、後者はホスト名を設定する形です。この２つの項目を設定した後、以下のコマンドでローカルで起動します。

```
jss start:connected
```

しばらくすると、下記のようにページが表示されます。

![nextjs](/static/images/2022/09/nextjs01.png)

## まとめ

実際には３回に分けてサンプルサイトの立ち上げ手順を紹介しました。Next.js のサンプルをプロジェクトに追加して、実際に Sitecore で利用するアイテムを展開、そして接続という形でした。実際の作業的には1時間もかかりませんが、ステップを踏んで紹介するために３回に分けた形です。次回はローカルではなく、Vercel に展開して表示していきます。