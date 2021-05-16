---
title: ブログをリニューアルしました
date: '2021-05-15'
tags: ['Next.js']
draft: false
summary: Docusaurus も v2 beta になったのと慣れはし始めたのですが、お仕事で Next.js を利用することが増えてきそうなので、ベースを切り替えてみました。
images: ['/static/images/2021/05/vercel01.png']
---

Docusaurus も v2 beta になったのと慣れはし始めたのですが、お仕事で Next.js を利用することが増えてきそうなので、ベースを切り替えてみました。

## Next.js + Tailwind.css 

フレームワークとしては、SSG (Static Site Generator)としても SSR (Server Side Rendering)にも対応している Next.js を利用しています。また、スタイルシートに関しても Tailwind.css を利用しています。

ベースに関しては、以下のリポジトリを参考にさせていただき、自分形にカスタマイズしていく形です。

* [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog)

### コンテンツを移行

これまでのブログの記事も Markdown 型式で書いていたので、移行はスムーズにできました。

* Header エリアとなる定義が異なるので、そこの部分は手作業で
* URL が変わらないように、Slug に合わせてパスを設定
    * これまでブログの記事はフラットに並べていて作業がしにくかったのですが、改善しまsちあ
* 画像に関しては /static/images の配下に移動して、ブログの記事で指しているパスを変更
* .md でリンクを貼っていたコンテンツのリンク切れを修正
* docs に入っているコンテンツは一旦公開停止

このサイトの一番重要なブログコンテンツは全部公開をしました。

### Google Analytics の追加

上記のテンプレートには Google Analytics に関してのコードが含まれていないので、コードを追加しました。dangerouslySetInnerHTML を利用してそのまま埋め込んでいる感じなのですが、とりあえず動いていれば OK という感じです。

### RSS の設定を変更

最初のテンプレートは /index.rss という形でルートに RSS のファイルが配置されるようになっていました。これを rss.xml のファイル名に変更しています。以前だと /blog/rss.xml のパスでフィードを展開していましたが、今回の変更で /rss.xml という形でパスが変わりました。RSS リーダーを利用している場合は、ご注意ください。

ブログをアップすると LinkedIn / Twitter につぶやくボットを動かしているのですが、それのパスも変更をしておきました。

## Netlify から Vercel に変更

これまでホスティングに関しては Netlify を利用していましたが、Next.js と相性の良い Vercel に切り替えることにしました。手順としては以下のような感じです。

1. DNS の変更（ haramizu.com に関するレコードを変更）
2. GitHub のリポジトリと Vercel を接続
3. main のブランチは Docusaurs のコンテンツで Vercel でホスティングできるのを確認
4. staging のドメインを追加、ブランチを staging に変更
5. Vercel のプロジェクトを Docusaurs v2 から Next.js に変更

![vercel](/static/images/2021/05/vercel01.png "vercel")

これで Staging にアップされている状況を確認して、問題なければ切り替えるという形です。staging のサーバーで Next.js の新しいサイトを見ることができたので、 main のブランチのバックアップとして docusaurus というのを作成し、staging から pull request で main に反映させました。

DNS の変更もこの作業をやっているうちに変更されたので、スムーズに切り替えることができました。