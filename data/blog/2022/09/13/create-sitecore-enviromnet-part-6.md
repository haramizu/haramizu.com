---
title: Sitecore Headless 開発、テスト環境の構築 Part 6 - エクスペリエンス エディターを利用できるようにする
date: '2022-09-13'
tags: ['Headless', 'Next.js']
draft: true
summary: 前回は Node.js をベースとしたコンテナを立ち上げて、そのコンテナで Next.js を起動しました。Next.js は Sitecore からデータを取得してページを表示している形です。今回は、Sitecore が Node.js のコンテナに接続して、エクスペリエンスエディターが起動するところまで進めていきます。
images: ['/static/images/2022/09/experienceeditor01.png']
---

前回は Node.js をベースとしたコンテナを立ち上げて、そのコンテナで Next.js を起動しました。Next.js は Sitecore からデータを取得してページを表示している形です。今回は、Sitecore が Node.js のコンテナに接続して、エクスペリエンスエディターが起動するところまで進めていきます。

## CM サーバーの設定を変更する

Headless Rendering の設定ファイルに関して、現状は `docker\build\cm\Data\App_Config\include\zzz\sitecoredemo-jp.config` のファイルとなります。このファイルのコードで、２箇所変更をする必要があります。

１つ目は JSS_EDITING_SECRET の値を、以下の設定項目に記載してください。 

```
      <setting name="JavaScriptServices.ViewEngine.Http.JssEditingSecret" value="rundomkeywordsitecore101010" />
```

続いて、今回のコンテナに対してアクセスをするように変更するために、サーバー名を `rendering` に変更してください。

```xml
        <app name="sitecoredemo-jp"
            layoutServiceConfiguration="default"
            sitecorePath="/sitecore/content/sitecoredemo-jp"
            useLanguageSpecificLayout="true"
            graphQLEndpoint="/sitecore/api/graph/edge"
            inherits="defaults"
            serverSideRenderingEngine="http"
            serverSideRenderingEngineEndpointUrl="http://rendering:3000/api/editing/render"
            serverSideRenderingEngineApplicationUrl="http://rendering:3000"
        />
```

上記の設定が完了したところで、cm コンテナをビルドし直して変更を反映させてから、起動します。以下のようにエクスペリエンスエディターで編集することができるようになります。

![Experience Editor](/static/images/2022/09/experienceeditor01.png)

これで、ローカルの環境でエクスペリエンスエディターを起動することができました。

## まとめ

これまで数回に分けて環境を整備してきましたが、ようやく基本となるプロジェクトのベースが出来上がりました。ローカルで開発、CMS にアクセスすることが可能となりました。次回はプロジェクトを利用しやすいように、少し工夫をしていきます。