---
title: Next.js に Google Tag Manager を設定する
date: '2022-02-25'
tags: ['Next.js', 'Google Tag Manager']
draft: false
summary: 今回は少し趣向を変えて Sitecore ではなく Next.js で Google Tag Manager を適用するための手順を紹介します。テストも含めて、実施していきます。
images: ['/static/images/2022/02/gtm01.png']
---

今回は少し趣向を変えて Sitecore ではなく Next.js で Google Tag Manager を適用するための手順を紹介します。テストも含めて、実施していきます。

## 前提条件

今回はこのような前提条件です。

- ブログのサンプル [Tailwind Nextjs Theme](https://github.com/timlrx/tailwind-nextjs-starter-blog)
- Next.js のバージョン 12.0.9
- Vercel にホスティングしています

それでは早速、進めていきましょう。

## Google Tag Manager の実装

Next.js で利用する Google Tag Manager のサンプルは以下のようにまとまっています。

- https://github.com/vercel/next.js/tree/canary/examples/with-google-tag-manager

これをそのまま利用するのもありですが、今回は、react-gtm-module を利用したいと思います。まず最初に、以下のコマンドを実行します。

```
npm install react-gtm-module
```

pages/\_app.js のファイルを編集していきます。以下の import を追加してください。

```javascript:pages/_app.js
import TagManager from 'react-gtm-module'
```

以下のコードを App の下に追加してください。`GTM-SAMPLE1` のところは、利用する際のタグを記載します。

```javascript:pages/_app.js
export default function App({ Component, pageProps }) {
  // Google Tag Manager start
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-SAMPLE1' })
  }, [])

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])
  // Google Tag Manager end
```

これで設定は完了となります。Vercel の環境に展開すると、タグが含まれていることがわかります。

![GoogleTagManager](/static/images/2022/02/gtm01.png)

基本的にはこれで動きます。とはいえもう少し細かい点を見ていきましょう。

## Content Security Policy を確認する

私のブログサイトは、[Tailwind Nextjs Theme](https://github.com/timlrx/tailwind-nextjs-starter-blog)をベースにコンテンツを追加、利用したい機能を追加しています。このサンプルはセキュリティに関してもしっかり実装しているため、コードがそのままでは動きません。この設定は、`next.config.js` のファイルに記載されています。

コードの中身は以下の通りです。

```javascript:next.config.js
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
  frame-src giscus.app
`
```

このまま展開をしても、以下のようにエラーが発生します。

![GoogleTagManager](/static/images/2022/02/gtm02.png)

この設定を回避する手順は、Google が以下のページで公開をしています。

- [コンテンツ セキュリティ ポリシーが設定されているページでの Google タグ マネージャーの使用](https://developers.google.com/tag-manager/web/csp?hl=ja)

今回はタグが動いているかどうかのプレビューも実施したいため、以下のように書き換えました。

```javascript:next.config.js
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' www.google-analytics.com ssl.google-analytics.com tagmanager.google.com www.googletagmanager.com giscus.app;
  style-src 'self' 'unsafe-inline' tagmanager.google.com fonts.googleapis.com cdn.jsdelivr.net;
  img-src * blob: data:
  media-src 'none';
  connect-src *;
  font-src 'self' fonts.gstatic.com data: cdn.jsdelivr.net;
  frame-src giscus.app
`
```

実際に動作するかどうか、Google Tag Manager のプレビュー機能で確認をします。管理画面の右上にあるプレビューをクリックしてください。

![GoogleTagManager](/static/images/2022/02/gtm03.png)

画面が切り替わり URL を入力する画面となります。ここにプレビューをしたい URL を入力して Connect をクリックします。

![GoogleTagManager](/static/images/2022/02/gtm04.png)

ページが開いて、タグが検出されれば以下のような画面になります。

![GoogleTagManager](/static/images/2022/02/gtm05.png)

実際にこのブログに対してアクセスをした結果は以下のようになります。

![GoogleTagManager](/static/images/2022/02/gtm06.png)

実際に Google Analytics にアクセスすることが可能か確認をすると、以下のような形でリアルタイムの画面にアクセスを反映しているのを確認できました。

![GoogleTagManager](/static/images/2022/02/gtm07.png)

## まとめ

今回は公式が提供しているサンプルをそのまま使う手順を紹介しつつ、Content Security Policy に関して設定をしている場合に、Google Tag Manager を動かす際の手順を合わせて解説をしました。この Content Security Policy に関しては、私のブログのサンプルでは厳密に設定しているため、公式のサンプルと違う動きで悩みましたが、ブラウザの開発者ツールでエラーを確認して問題を見つけることができました。

## 参考情報

- [How to personalize your site with Sitecore CDP via Google Tag Manager](https://neilkillen.com/2021/11/22/how-to-personalize-your-site-with-sitecore-cdp-via-google-tag-manager/)
