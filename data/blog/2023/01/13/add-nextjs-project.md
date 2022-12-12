---
title: Next.js のプロジェクトを追加する
date: '2023-01-13'
tags: ['Docker', 'Next.js', 'XM']
draft: false
summary: 前回の記事でまずはテンプレートとなるプロジェクトを作成しました。今回は、一番シンプルな XM1 を実行するためのプロジェクトにするために、不要なものを削除、調整の手順を進めていきます。
images: ['/static/images/2023/01/newproject01.png']
---

## Next.js SXA のプロジェクトを作成する

今回は Next.js SXA のプロジェクトを追加していきます。Version 21 からは以下のリポジトリにテンプレートを展開しています。

- https://github.com/Sitecore/jss/tree/v21.0.0/packages/create-sitecore-jss/src/templates

プロジェクトの現状を確認するためにフォルダを見ると、src の下には何も JavaScript のプロジェクトが作成されていません。

![newproject](/static/images/2023/01/newproject04.png)

ここでバージョンを指定してテンプレートを作成するために、以下のようにコマンドを実行してください（以下の数字は GitHub のリポジトリの番号になります）。

```
npx create-sitecore-jss@21.0.0 --templates nextjs,nextjs-sxa
```

ここからは、普通に Next.js のプロジェクトの設定を入れていく形です。まずはインストール先のディレクトリの確認が表示されます。今回は、`C:\projects\DockerStarter\src\rendering` を指定します。

続いてアプリの名前の確認が表示されます。アプリの名前は、今回は `sitecoredemo-jp` とします。

CMS サーバーの名前を次に聞かれますが、 `cm.sitecoredemo.localhost` と設定します。

続いて GraphQL か REST のどちらのプロジェクトにするかを確認してきます。今回は `GraphQL` を選択します。

最後に SSG か SSR かの確認が表示されるため、`SSG` を選択します。

これでセットアップの手順が完了となります。自動的に `npm install` などが実行されます。

![newproject](/static/images/2023/01/newproject05.png)

しばらくすると以下のようにプロジェクト作成完了となります。

![newproject](/static/images/2023/01/newproject06.png)

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

![clean](/static/images/2023/01/clean08.png)

今回は DockerStarter でプロジェクトを作っているためパラメーターやファイル名に名前が入っています。別の名前で作成している場合は、上記の参照先を変更して値を設定してください。
