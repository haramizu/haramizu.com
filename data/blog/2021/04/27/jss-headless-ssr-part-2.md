---
title: Sitecore JSS - Headless SSR - Part.2
date: '2021-04-27'
tags: ['JSS', 'React', 'Headless SSR']
draft: false
summary: 前回は手元で Headless SSR のプロジェクトを動作させて、ページが表示できるのかどうかを確認しました。今回は、各種プラットフォームに展開をする手順に関して紹介をしていきます。
images: ['/static/images/2021/04/delivery23.png']
---

前回は手元で Headless SSR のプロジェクトを動作させて、ページが表示できるのかどうかを確認しました。今回は、各種プラットフォームに展開をする手順に関して紹介をしていきます。

## Github にリポジトリを作成する

手元で動作させていたコードを Github に登録します。今回は手軽に Github Desktop を利用して以下の様な手順で進めていきます。git のコマンドに慣れている方は、コマンドラインのみで進めることもできます。

### ローカルのリポジトリを作成

まず最初に、Github Desktop を立ち上げて File - Add Local Repository をクリックします。

![delivery](/static/images/2021/04/delivery01.png "delivery")

対象となるディレクトリを選択します。

![delivery](/static/images/2021/04/delivery02.png "delivery")

選択をすると以下のダイアログが表示されます。Git のリポジトリがないため作成をするかどうか、という問い合わせとなります。

![delivery](/static/images/2021/04/delivery03.png "delivery")

作成に関しては、デフォルトのままで進めて問題ありません。

![delivery](/static/images/2021/04/delivery04.png "delivery")

### GitHub にリポジトリを作成

完了すると、Publish your repository to GitHub が表示されます。

![delivery](/static/images/2021/04/delivery05.png "delivery")

Publish repository のボタンをクリックすると以下のダイアログが表示されます。

![delivery](/static/images/2021/04/delivery06.png "delivery")

API キーなどを入れているので、必ずプライベートで展開してください。クリックすると、GitHub にリポジトリの作成ができました。

![delivery](/static/images/2021/04/delivery07.png "delivery")

## Heroku

Heroku は Salesforce が提供するアプリケーションプラットフォームです。開発者向けに無料で使うことができるサービスもあるため、今回はその範囲で展開していきます。

### 公開準備

Heroku に展開するにあたって、yarn に関しては対応をしていないため、package.json の設定を変更する必要があります。デフォルトのコードは以下の通りです。

```
"engines": {
    "node": ">=8.1",
    "npm": ">=5.6.0",
    "yarn": "yarn is not supported, please use npm"
},
```

最後の項目を削除してください。

```
"engines": {
    "node": ">=8.1",
    "npm": ">=5.6.0"
},
```

コードを削除したあと、Github にリポジトリに反映させる必要があります。

私は Visual Studio Code を利用して編集をしているので、左側の Git のアイコンをクリックします。すると、package.json のファイルを変更していることがわかります。

![delivery](/static/images/2021/04/delivery08.png "delivery")

コミットするためのメッセージを入力して、上にあるチェックマークをクリックすると、コミットされます。あとは右上にある ・・・ のアイコンをクリックして、プッシュを選択すると、GitHub に反映されます。

![delivery](/static/images/2021/04/delivery09.png "delivery")

### Heroku に展開する

Heroku でアカウントを作るなどを別途完了させていることを前提とします。ログインをすると以下の様な画面となります。

![delivery](/static/images/2021/04/delivery10.png "delivery")

**Create new app** のボタンをクリックしてください。続いてアプリの名前を入力する画面になります。

![delivery](/static/images/2021/04/delivery11.png "delivery")

アプリの名前を入れて、**Create app** をクリックします。ページが切り替わると、Deploy のタブが開いた形でアプリの設定画面が表示されます。

![delivery](/static/images/2021/04/delivery12.png "delivery")

今回は GitHub のリポジトリと連携させるために、GitHub のアイコンをクリックします。連携している GitHub のリポジトリを検索する画面に切り替わります。

![delivery](/static/images/2021/04/delivery13.png "delivery")

検索をして、対象となるリポジトリの右にある **Connect** のボタンをクリックします。

![delivery](/static/images/2021/04/delivery14.png "delivery")

デプロイするブランチの選択、および自動で展開をするかどうかのボタンが表示されます。

![delivery](/static/images/2021/04/delivery15.png "delivery")

今回は **main** のブランチを選択、テストなので Automatic Deploys は選択しません。ここはニーズに合わせて設定してください。最後に、一番下にあるボタン **Deploy Branch** のボタンをクリックして展開を開始します。

![delivery](/static/images/2021/04/delivery16.png "delivery")

ログの最後には URL が表示されます。

![delivery](/static/images/2021/04/delivery17.png "delivery")

URL にアクセスすると、デリバリーサーバーが動作していることがわかります。

![delivery](/static/images/2021/04/delivery18.png "delivery")

## Azure Web App

続いて、Azure Web App に展開する手順を紹介します。

### Web アプリの作成

Azure の管理ポータルから、Web アプリを作成します。

![delivery](/static/images/2021/04/delivery19.png "delivery")

追加するリソースグループなどは、既存のもの、必要に応じて新規作成するなどして準備してください。ここから紹介するのは以下の項目となります。

![delivery](/static/images/2021/04/delivery20.png "delivery")

項目のサンプルは以下の通り。

| 項目 | 概要 | 参考 |
|-|-|-|
| 名前 | Web アプリ名を入力 | react-app-cd |
| 公開 | コードを展開して動かすためコードを選択 | コード |
| ランタイム スタック | Web アプリのランタイムの選択 | Node 14 LTS |
| オペレーティングシステム | OS を選択できます | Linux |
| 地域 | データセンターを選択 | Japan East |
| App Service プラン | プラン名を選択 |  |

入力済みの画面は以下の通りです。

![delivery](/static/images/2021/04/delivery21.png "delivery")

続いて、画面の下にある **次：デプロイ** をクリックします。画面は以下の様に切り替わります。

![delivery](/static/images/2021/04/delivery22.png "delivery")

有効化、を選択すると再度画面が切り替わります。GitHub のアカウントと連携をし、必要な項目を選択してください。

![delivery](/static/images/2021/04/delivery23.png "delivery")

入力が完了したあと、**確認および作成** をクリックし、作成ボタンを押して**リソース**の作成となります。

![delivery](/static/images/2021/04/delivery24.png "delivery")

### 動作確認

作成が完了したあと、App Service の画面に切り替えます。

![delivery](/static/images/2021/04/delivery25.png "delivery")

デプロイセンターに切り替えて、ログで展開を成功していることを確認してください。

![delivery](/static/images/2021/04/delivery26.png "delivery")

ビルドの成功が完了したところで、URL にアクセスをしてください。以下の様にページが表示されます。

![delivery](/static/images/2021/04/delivery27.png "delivery")

## まとめ

今回は２つのプラットフォーム、Heroku と Azure Web アプリに対して GitHub のリポジトリを連携してサイトを立ち上げるところまで紹介をしました。Azure Web アプリの場合はブランチを分けて展開するとかも可能ですので、main の前に staging に展開をして確認をする、ということも可能です。

また heroku および Azure Web アプリどちらもオートスケールのための機能も提供されていますので、クラウドを活用したサイト運用として、JSS も１つの選択しになります。