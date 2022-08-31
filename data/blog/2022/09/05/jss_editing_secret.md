---
title: エクスペリエンス エディターを利用できるようにする
date: '2022-09-05'
tags: ['Headless', 'Next.js', 'Vercel']
draft: true
summary: 前々回に Next.js のテンプレートの準備を、前回はそれを利用するための Sitecore にアイテムをインポートする手順を紹介しました。今回は Next.js の設定を変更して、Sitecore のアイテムを参照してページが表示されるところまで紹介をします。
images: ['/static/images/2022/03/component06.gif']
---

前回は Vercel に新しいサイトを展開することができました。このインスタンスを利用して、エクスペリエンスエディターでページの編集をできるように進めていきます。

## Vercel の環境変数の追加

`SITECORE_API_KEY` と同じように、編集をする際のキーを Vercel のプロジェクトに追加します。以下のパラメーターで、16 文字以上の文字列が推奨となります。

- JSS_EDITING_SECRET

以下の値としては、現在起動しているインスタンスの URL を設定してください。

- PUBLIC_URL

上記２つの設定を完了させたあと、一度 ReDeploy で展開をしなおします。

## Sitecore の設定

JSS の設定ファイルは、今回は `App_Config\Include\zzz\sitecoredemo-jp.config` のファイルが対象となります。まず、以下の項目に対して、上記で設定したキーと同じ値を設定してください。なお、デフォルトではコメントアウトされている場所にコードがあるため、コードとして認識できるようにコメントアウトの部分を修正してください。

```xml
<setting name="JavaScriptServices.ViewEngine.Http.JssEditingSecret" value="" />
```

続いて JavaScript 動作に関して、以下のように http://localhost:3000 として記載されているホスト名があります。これを Vercel で展開しているホスト名に変更してください。

```xml
      <apps>
        <app name="sitecoredemo-jp"
            layoutServiceConfiguration="default"
            sitecorePath="/sitecore/content/sitecoredemo-jp"
            useLanguageSpecificLayout="true"
            graphQLEndpoint="/sitecore/api/graph/edge"
            inherits="defaults"
            serverSideRenderingEngine="http"
            serverSideRenderingEngineEndpointUrl="http://localhost:3000/api/editing/render"
            serverSideRenderingEngineApplicationUrl="http://localhost:3000"
        />
      </apps>
```

## エクスペリエンスエディターで動作確認

上記の設定が完了したところで、Home アイテムを選択して、エクスペリエンスエディターを起動してください。ページの編集が可能となっています。

![vercel](/static/images/2022/09/vercel06.png)

ここでエラーが発生する際は、Vercel の環境変数の追加を忘れていないか、設定後 ReDeploy を忘れていないかを確認してください。

## まとめ

これまで準備してきた環境をサーバーとして動かすことができるようになりました。次回はコンテナの環境でもエクスペリエンスエディターが動作するようにします。