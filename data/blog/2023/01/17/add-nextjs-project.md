---
title: Next.js のプロジェクトを追加する
date: '2023-01-17'
tags: ['Docker', 'Next.js', 'XM']
draft: false
summary: 前回作成をしたヘッドレスのサイトはまだサイトコアのアイテムがあるだけとなっています。今回はこれに Next.js のプロジェクトを追加して、ページの編集ができるところまでの紹介をします。
images: ['/static/images/2023/01/nextjs03.png']
---

前回作成をしたヘッドレスのサイトはまだサイトコアのアイテムがあるだけとなっています。今回はこれに Next.js のプロジェクトを追加して、ページの編集ができるところまでの紹介をします。

## Next.js SXA のプロジェクトを作成する

今回は Next.js SXA のプロジェクトを追加していきます。Version 21 からは以下のリポジトリにテンプレートを展開しています。

- https://github.com/Sitecore/jss/tree/v21.0.0/packages/create-sitecore-jss/src/templates

まずコンテナを動かすために利用していた `src\rendering` のフォルダを削除します。この段階で、src の下には何もない状況なのを確認してください。

![nextjs](/static/images/2023/01/nextjs01.png)

ここでバージョンを指定してテンプレートを作成するために、以下のようにコマンドを実行してください（以下の数字は GitHub のリポジトリの番号になります）。

```
npx create-sitecore-jss@21.0.0 --templates nextjs,nextjs-sxa
```

ここからは、普通に Next.js のプロジェクトの設定を入れていく形です。ここから先のプロジェクトのフォルダは `C:\Projects\Sitecoredemo.Docker` としていますので、随時手元に合わせて実行してください。

1. インストール先のディレクトリの確認が表示されます。今回は、`C:\Projects\Sitecoredemo.Docker\src\rendering` を指定します。
2. アプリの名前の確認が表示されます。アプリの名前は、今回は `sitecoredemo-jp` とします。
3. CMS サーバーの名前を次に聞かれますが、 `cm.sitecoredemo.localhost` と設定します。
4. 続いて GraphQL か REST のどちらのプロジェクトにするかを確認してきます。今回は `GraphQL` を選択します。
5. 最後に SSG か SSR かの確認が表示されるため、`SSG` を選択します。

これでセットアップの手順が完了となります。自動的に `npm install` などが実行されます。

![nextjs](/static/images/2023/01/nextjs02.png)

しばらくすると以下のようにプロジェクト作成完了となります。

![nextjs](/static/images/2023/01/nextjs03.png)

これでプロジェクトが作成されました。

## Next.js の設定を変更する

Next.js をコンテナに展開する際に利用するために、jss setup を実行する必要があります。

```
cd src\rendering
jss setup
```

以下のデータを設定していきます。

| 質問項目                            | 設定                                                      |
| ----------------------------------- | --------------------------------------------------------- |
| Path to the Sitecore folder         | ..\..\docker\deploy\platform\                             |
| Sitecore hostname                   | https://cm.sitecoredemo.localhost                         |
| Sitecore import service URL         | https://cm.sitecoredemo.localhost/sitecore/api/jss/import |
| Sitecore API Key                    | src\items\api-key\DockerStarter.yml の ID                 |
| Please enter your deployment secret | .env の JSS_DockerStarter_DEPLOYMENT_SECRET               |

![clean](/static/images/2023/01/nextjs04.png)

今回は DockerStarter でプロジェクトを作っているためパラメーターやファイル名に名前が入っています。別の名前で作成している場合は、上記の参照先を変更して値を設定してください。

準備としては、最後に jss deploy config を実行して

## Sitecore 側でサイトを作成する
