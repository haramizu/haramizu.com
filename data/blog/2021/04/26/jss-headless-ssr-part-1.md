---
title: Sitecore JSS - Headless SSR - Part.1
date: '2021-04-26'
tags: ['JSS', 'React', 'Headless SSR']
draft: false
summary: 今回は JSS のアプリの展開方法について紹介をします。利用するのは前回までの JSS のアプリ、そして Sitecore のインスタンスを利用して、Node.js のアプリケーションホスティングを利用して、サイトを公開する形です。
images: ['/static/images/2021/04/headless01.png']
---

今回は JSS のアプリの展開方法について紹介をします。利用するのは前回までの JSS のアプリ、そして Sitecore のインスタンスを利用して、Node.js のアプリケーションホスティングを利用して、サイトを公開する形です。

## 前提条件

Sitecore のインスタンスは仮想マシンとして立ち上げて、JSS のアプリがインターネットを通じて Sitecore にアクセスすることができるようにしてあります。また、API キーなどもすでに作成されており、FQDN でサーバーを参照できるようになっていることを前提とします。

また Headless のトポロジーを紹介します。以下図が参考になります（引用：[A DevOps guide to JSS](https://jss.sitecore.com/docs/techniques/devops)）。

![headless](/static/images/2021/04/headless01.png "headless")

右側が訪問者で、Node.js のインスタンスにアクセスをします。この Node.js のインスタンスは、アクセスがあると必要な情報を取得するために、左側の Sitecore CD にアクセスする形となります。必要な情報を取得した Node.js のインスタンスが返答をして、ブラウザにページが表示されるようになります。

## Sitecore 側の環境の確認

### サイト設定の確認

厳密にはホスト名を指定する必要がありますが、今回は検証ということで、ホスト名に関しては * を指定します。ホスト名の設定は、アイテム /sitecore/content/demo/react-app/Settings/Site Grouping/react-app の**ホスト 名**の項目が該当します。

![headless](/static/images/2021/04/headless02.png "headless")

### API キーの確認およびパブリッシュ

API キーでアクセスできる偽装ユーザーの項目が空欄の場合は、extranet\anonymous を入力してください。

![headless](/static/images/2021/04/apikey.png "headless")

更新をした場合は、該当するアイテムをパブリッシュします。

### サイトの公開

これまで、アイテムの同期をしてページの表示などを確認していましたが、データは Master データベースに蓄積されており、実際に外部から見ることができるように、サイトの公開をする必要があります。

関連するアイテムをパブリッシュするために、以下のように作業をしてください。

1. JSS サイトのアイテムを選択する
2. 右クリックをして、**アイテムをパブリッシュ**をクリック

![headless](/static/images/2021/04/headless03.png "headless")

3. サブアイテム、関連アイテムの項目をチェック、言語も対象となる言語を選択してパブリッシュします。

![headless](/static/images/2021/04/headless04.png "headless")

上記の結果、サイトにアクセスできることを確認します。

![headless](/static/images/2021/04/headless05.png "headless")

これで Sitecore の準備ができました。

## Headless SSR プロジェクトの作成

デリバリー用の Node.js を作成するために、新しいプロジェクトを作成します。テンプレート名は node-headless-ssr-proxy になりますので、以下のコマンドで実行をします。

```
jss create react-app-cd node-headless-ssr-proxy
```

![headless](/static/images/2021/04/headless06.png "headless")

作成したプロジェクトのファイルのうち、**config.js** ファイルに設定を書き込んでいきます。

まず最初に、アプリの名前を指定します。

```
let appName = process.env.SITECORE_JSS_APP_NAME;
```

これを

```
let appName = process.env.SITECORE_JSS_APP_NAME || `react-app`;
```

と後ろにデフォルト値を入れます。続いてサーバー名の設定項目

```
const apiHost = process.env.SITECORE_API_HOST || 'http://my.sitecore.host'
```

後ろのサーバー名を、自分で利用しているサーバー名に変更してください。https で利用している場合は、https から記述する必要があります。最後に API キーを

```
apiKey: process.env.SITECORE_API_KEY || serverBundle.apiKey || '{YOUR API KEY HERE}',
```

に設定します。デフォルトのコンテンツを切り替える場合は、以下の１行の言語を en から ja-JP に変更してください。

```
const language = layoutServiceData.sitecore.context.language || 'ja-JP';
```

これで config.js に関する設定は完了しました。


## build ファイルのコピー

元々の react-app のプロジェクトで **build** を改めて実行してください（前回から何も変更がなく、build フォルダがあればそれで問題ありません）。この中身を、新しく作った react-app-cd のプロジェクトの、 dist/react-app を作成してコピーします。

ディレクトリは下図のようになります。

![headless](/static/images/2021/04/headless07.png "headless")

## 動作確認

上記の設定が完了していれば、手元の環境で動作確認をします。

```
npm run start
```

実行するとすぐに以下の様なメッセージが表示されます。

![headless](/static/images/2021/04/headless08.png "headless")

ローカルの 3000 番にアクセスする形となりますので、http://localhost:3000 にアクセスします

![headless](/static/images/2021/04/headless09.png "headless")

## まとめ

これで動作確認が完了しました。次回はこのプロジェクトを各種プラットフォームに展開していきたいと思います。

* [Sitecore JSS - Headless SSR - Part.2](/blog/2021/04/27/jss-headless-ssr-part-2)