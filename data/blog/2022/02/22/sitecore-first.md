---
title: Sitecore Headless - Sitecore First に変更する
date: '2022-02-22'
tags: ['Sitecore', 'Headless', 'Next.js']
draft: true
summary: これまで Sitecore の SDK のサンプルのコードを展開するところにフォーカスしていましたが、ここからは Sitecore で作業をしてコードで補完する形の開発をしていく手順に切り替えていきます。後半では以前に紹介をした空っぽのプロジェクトを作る手順を改めて確認して、実際につながるところまで進めていきます。
images: ['/static/images/2022/02/sitecorefirst01.png']
---

これまで Sitecore の SDK のサンプルのコードを展開するところにフォーカスしていましたが、ここからは Sitecore で作業をしてコードで補完する形の開発をしていく手順に切り替えていきます。後半では以前に紹介をした空っぽのプロジェクトを作る手順を改めて確認して、実際につながるところまで進めていきます。

## Sitecore JSS 開発のモード

これまで手元に展開していたコードの記述を Sitecore に展開して動作確認をする、という手順を紹介していきました。アプリケーションのモードとしては以下のように３つのモードがあります。

- Disconnected mode - Sitecore のインスタンスは不要で、ローカルで動作させるモードです。プロジェクトを作成したときの最初のモードです
- Connected mode - このモードで動作させるためには、Sitecore のインスタンスが必要です。アプリケーションはローカルで動作させながら、Sitecore のデータを利用して動作させます。
- Integrated mode - このモードで動作させるためには、Sitecore のインスタンスが必要です。アプリケーションをホストして動作させている状況です。

前回までの記事で説明をすると

- Disconnected mode - jss start でローカルで動かしている状況
- Connected mode - jss start:production もしくは .env に Sitecore と接続するための情報を記述している状況
- Integrated mode - Vercel のホスティングしているアプリが Sitecore のインスタンスの情報を利用している

このようになります。開発という点では以下の２つを考えていく必要があります。

- Code-first - コードの記述を優先するもので、Sitecore に都度コンテンツを展開する
- Sitecore-first - Sitecore でテンプレートの作成などを行い、必要な情報をコードに入れていく

これまでの説明手順となる Code-first の開発モードでは、何かを作れば `jss deploy items` とコードを展開する形となっていました。インポートのプロセスにはある程度制限があるため、Sitecore において定義を作成して開発をしていくというスタイルが効率よくなる形です。例えば以下のようなパターンです。

- ブランチ テンプレートを作成したい
- レンダリングとスタンダードバリューの定義をしたい
- データソースの場所をしたい

そこで Sitecore-first という形で開発をすることができます。今回はこの手順について紹介をしていきます。

## 既存のプロジェクトを変更する

既存のプロジェクトを Sitecore First の形にする際の手順は以下のページに記載されています。

- [Transitioning from code-first to Sitecore-first](https://doc.sitecore.com/xp/en/developers/hd/190/sitecore-headless-development/transitioning-from-code-first-to-sitecore-first.html)

実際のプロジェクトを利用して、上記の手順を変更していきます。まずサーバーに接続できていることを確認します（前回の手順まで進んでいれば、つながるはずです）。

続いて、以下の手順を進めていきます。

1. ディレクトリ /data を削除して、切断されたルートデータを削除する。
2. ディレクトリ /sitecore/definitions を削除して、マニフェストの定義を削除します。
3. ディレクトリ /sitecore/pipelines を削除して、マニフェスト パイプライン パッチを削除します。
4. /scripts/disconnected-mode-proxy.js は、Sitecore-first の開発以外では使用しないため、削除します。
5. package.json のファイルの start の項目を削除、start:connected の名前を start に変更します。

上記の手順が終わったところで、 jss start を実行してページが表示されていれば、Sitecore First のプロジェクトに変更ができました。

## 空のテンプレートを利用する

以前にブログの記事で [Next.js のサンプルデータが含まれないプロジェクトの作成](/blog/2021/12/22/jss-create-nextjs-empty)を紹介しています。今回はこれを利用して、Sitecore につなげる環境を確認していきます。

まず最初に、空っぽのプロジェクトを作成します。

```
jss create nextjs-demo nextjs --empty
```

package.json ファイルが１行に纏まっているため、フォーマットを整えてください。その後、ファイルに関しては以下の点を修正していきます。

1. フォーマットを整える（上記に記載済み）
2. name などに記載している nextjs-demo を sitecoredemo-jp に変更する
3. scripts の start のコマンドを追加します（start:connected の前だと他と比較しやすい位置です）

```json:package.json
"start": "npm-run-all --serial bootstrap next:build next:start",
```

package.json ファイルの変更をしたので、一度以下のコマンドを実行しておきます。

```
npm install
```

続いて **/sitecore/config/nextjs-demo.config** のファイルを消して、すでに作成をしたプロジェクトから
**/sitecore/config/sitecoredemo-jp.config** のファイルをコピーしてきます。

またコンポーネントの定義に関して、 **/src/components** の配下のファイルを全てコピーをしてきます。

最後に、`.env` のファイルに接続する先の Sitecore に関する情報を記載します。

- JSS_EDITING_SECRET
- SITECORE_API_KEY
- SITECORE_API_HOST

の３つの項目に値を設定してください。これで準備ができました。

## ローカルで実行する

ローカルで実行するために、以下のコマンドを実行します。

```
jss start
```

Sitecore のサーバーにアクセスをしてデータを取得して、実行することができました。

![vercel](/static/images/2022/02/sitecorefirst01.png)

## まとめ

今回はプロジェクトに関して、より Sitecore の機能を利用できるようにするために Code First のプロジェクトを Sitecore First の形にする手順を紹介しました。次回からは、Sitecore First を前提とした手順を紹介していきます。

## 参考情報

- [Application modes](https://doc.sitecore.com/xp/en/developers/hd/190/sitecore-headless-development/application-modes.html)
- [Start a JSS app in connected mode](https://doc.sitecore.com/xp/en/developers/hd/190/sitecore-headless-development/start-a-jss-app-in-connected-mode.html)
- [Transitioning from code-first to Sitecore-first](https://doc.sitecore.com/xp/en/developers/hd/190/sitecore-headless-development/transitioning-from-code-first-to-sitecore-first.html)
