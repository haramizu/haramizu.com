---
title: Sitecore ヘッドレス と Next.js でサイト構築 - Part 1
date: '2021-09-09'
tags: ['JSS','Next.js']
draft: false
summary: これまで Next.js のサンプルの使い方を何回か紹介をしてきました。詳細に関しては過去の記事も参照していただく形となりますが、今回はサイト構築をする際の構成について、便利な機能 Vercel と組み合わせた場合どういう開発になるのかを紹介していきます。
images: ['/static/images/2021/09/nextjs22.png']
---

これまで Next.js のサンプルの使い方を何回か紹介をしてきました。詳細に関しては過去の記事も参照していただく形となりますが、今回はサイト構築をする際の構成について、便利な機能 Vercel と組み合わせた場合どういう開発になるのかを紹介していきます。

## 前提条件

今回は、以下の環境を用意しました。

* サーバー環境
    * Sitecore Experience Platform 10.1 Update 1
    * Sitecore Headless Rendering 18.0.0
* クライアント環境
    * macOS Big Sur (もちろん Windows 10 も大丈夫です)
    * Visual Studio Code
    * Node.js 14.17.0
    * npm 7.19.0
    * GitHub Desktop

なお、上記のサイトは公開サーバーとしてアクセスできるように、Microsoft Azure の仮想マシンにワイルドカード証明書を利用してアクセスできるようにしています。これは、Vercel との連携の際に必要となる条件となります（サーバー同士で連携して動かしていくため）。

今回は最短の手順で紹介をしていくため、細かい手順は以前の記事を参照してください。

* [Next.js SDK を利用してサンプルサイトを構築 - Part.1](/blog/2021/04/13/nextjs-sdk-part-1)
* [Next.js SDK を利用してサンプルサイトを構築 - Part.2](/blog/2021/04/13/nextjs-sdk-part-2)
* [Next.js SDK を利用してサンプルサイトを構築 - Part.3](/blog/2021/04/19/nextjs-sdk-part-3)
* [Next.js SDK を利用してサンプルサイトを構築 - Part.4](/blog/2021/04/20/nextjs-sdk-part-4)

## サンプルアプリを手元で起動する

今回はサンプルのアプリとして、以下のように nextjs ベースのアプリとして nextjsdemo を作成します。

```
jss create nextjsdemo nextjs
```

![Next.js](/static/images/2021/09/nextjs01.gif)

作成されたあと、動作確認として以下のコマンドを実行して画面を表示してください。

```
cd nextjsdemo
jss start
```

しばらくすると、 http://localhost:3000 でアクセスできますというメッセージが表示されるため、アクセスするとローカルの環境で動作することを確認できました。

![Next.js](/static/images/2021/09/nextjs02.png)

## Sitecore との連携を設定する

上記のプロセスを一度停止して、jss setup のコマンドを実行して各値を設定していきます。今回は別の環境にサーバーをおいているので、最初の質問には、それ以降はサーバーの名前、セキュリティキー、展開キー（なければ自動生成）を設定していきます。

![Next.js](/static/images/2021/09/nextjs03.png)

設定は、*scjssconfig.json* のファイルに定義が作成されています。変更をする際は、このファイルを変更してください。

```json
{
  "sitecore": {
    "instancePath": "",
    "apiKey": "{1ED35304-B022-509B-AC5E-5C85047454A6}",
    "deploySecret": "mewuff45f8lst6a05b322o27v9tgviq76nnueg631icd",
    "deployUrl": "https://manage.cmsdemo.jp/sitecore/api/jss/import",
    "layoutServiceHost": "https://manage.cmsdemo.jp"
  }
}
```

また sitecore/config のフォルダに以下の 2 つのファイルが生成されます。

* nextjsdemo.config
* nextjsdemo.deploysecret.config

このファイルは、起動している Sitecore のフォルダ /App_Config/Include/zzz のフォルダにコピーをしてください。

![Next.js](/static/images/2021/09/nextjs04.png)

これで展開するための設定が完了しました。今回はサンプルそのまま展開するため、以下のコマンドでアイテムを Sitecore に展開をします。

```
jss deploy items -c -d
```

![Next.js](/static/images/2021/09/nextjs05.png)

完了すると、Sitecore 側に必要なアイテムが展開されます。

![Next.js](/static/images/2021/09/nextjs06.png)

## Sitecore に接続して動作確認

Sitecore にあるアイテムを利用してアプリが正しく動作するかを確認していきます。

```
jss start:production
```

しばらくすると build が実行されて、 .next/server/pages に HTML のファイルが生成され、ローカルで表示することができます。

![Next.js](/static/images/2021/09/nextjs07.png)

一度停止して、アイテムを更新します。今回は、home/page components/ContentBlock-1 を以下のように Demo をタイトルに追加してみました。

![Next.js](/static/images/2021/09/nextjs08.png)

もう一度、jss start:production を実行して localhost:3000 にアクセスすると以下のようにページが更新されていることがわかります。

![Next.js](/static/images/2021/09/nextjs09.png)

## Vercel に展開する

### Github に展開する

今回はデリバリーの環境として Vercel を選択します。Next.js との相性が良いというのが大きな理由です。実際に Vercel はグローバルの CDN を組み込んだプラットフォームとなっているため、静的なコンテンツを配置するという点では有力なプラットフォームとなります。また、個人で利用するのは無料、というのは嬉しいところです。

Vercel に展開するにあたって、手元のコードをまず Github に展開したいと思います。今回は GitHub Desktop を利用して作業をします。

1. File - Add Local Repository を選択
2. 対象となるパスを指定します

![Next.js](/static/images/2021/09/nextjs10.png)

3. Create a Repository の部分をクリックすると以下の画面に切り替わります。必要な項目を設定して、Create Repository をクリックしてください。

![Next.js](/static/images/2021/09/nextjs11.png)

4. 画面が下記のように切り替わります。

![Next.js](/static/images/2021/09/nextjs12.png)

5. Publish repository のボタンをクリックします。Keep this code private はチェックしたまま公開をしてください。

![Next.js](/static/images/2021/09/nextjs13.png)

6. Github にプライベートリポジトリが作成されました。

![Next.js](/static/images/2021/09/nextjs14.png)

### Vercel と Github リポジトリを連携する

続いて Github のリポジトリを Vercel の環境に連携させていきます。手順に関しては、以下のページで紹介されています。

* [Walkthrough: Deploying to Vercel](https://jss.sitecore.com/docs/nextjs/deploying-to-production/vercel)

では画面ショットを元に手順を紹介していきます。

1. New Project をクリックします。すでに GitHub のアカウントと連携をしていれば、リポジトリ一覧が表示されます。

![Next.js](/static/images/2021/09/nextjs15.png)

2. 対象となるリポジトリを選択します
3. Create a Team では Skip します
4. Configure Project の設定を確認していきます

![Next.js](/static/images/2021/09/nextjs16.png)

5. ここでは Environment Variables を追加していきます。 

    * **PUBLIC_URL** これは展開後設定するため今回は省略
    * **SITECORE_API_KEY** API キーを設定します
    * **SITECORE_API_HOST** ホスト名を指定します
    * **JSS_EDITING_SECRET** 16文字以上の文字数字の組み合わせ（新規作成）
    * **GRAPH_QL_ENDPOINT** Experience Edge を利用する際には設定は必須です。今回は設定せずにいきます（ XM のデフォルトでの動作を期待）

![Next.js](/static/images/2021/09/nextjs17.png)

6. Deploy ボタンをクリックすると、Vercel の展開が始まり、以下が終了となります。

![Next.js](/static/images/2021/09/nextjs18.png)

サムネイルのページが CSS や画像が適用されていないことがわかります。これを修正するために、以下の作業を進めます。

1. 展開をしたサイトのドメインを確認します。

![Next.js](/static/images/2021/09/nextjs19.png)

2. Settings - Environment Variables を開きます
3. PUBLIC_URL を指定して、Add を実行します

![Next.js](/static/images/2021/09/nextjs20.png)

4. Deployments のメニューに切り替えて、前回展開をした項目をチェックして Redeploy を選択します。

![Next.js](/static/images/2021/09/nextjs21.png)

しばらくすると完了して、以下のように必要なデータを読み込んだ形で展開ができました。

![Next.js](/static/images/2021/09/nextjs22.png)

## Sitecore の管理画面の変更

Sitecore を展開しているサーバーの設定を変更して、Vercel の環境とも連携をさせていきます。初期のステップの時に展開をした /App_Config/Include/zzz のフォルダに入っている config ファイル（今回だと nextjsdemo.config ）を編集します。

JSS App Registration の項目の２つの項目に、serverSideRenderingEngineEndpointUrl および serverSideRenderingEngineApplicationUrl の２つの項目が http://localhost:3000 が初期設定となっています。これを、Vercel のサーバーの URL に変更をします。

![Next.js](/static/images/2021/09/nextjs23.png)

またコメントアウトされている JSS EDITING SECRET の項目を有効にして、値を設定してください。

```xml
<setting name="JavaScriptServices.ViewEngine.Http.JssEditingSecret" value="" />
```

上記の設定が完了した後、Sitecore のコンテンツエディターで、Home アイテムを選択して、エクスペリエンスエディターを開きます。

![Next.js](/static/images/2021/09/nextjs24.png)

Sitecore のサーバーには Node.js などもインストールすることなく、Vercel の環境を利用してエクスペリエンスエディターが動くようになりました。

## Sitecore のシャットダウン

今回、展開が完了している状況まで進めていきましたが、最後に Sitecore の仮想マシンをシャットダウンしてみたいと思います。

結果、Vercel で動作しているサイトは引き続き動作しています。Next.js を展開した時のコンテンツが静的サイトとして動作していることを確認しました。

## まとめ

今回は Next.js を利用して静的なサイトの生成、Sitecore のみたまま編集との連携、展開としては Vercel を利用できるようにしました。静的なサイトとなっているため、Sitecore がシャットダウンしても（編集はできませんが）サイトは動作しています。
