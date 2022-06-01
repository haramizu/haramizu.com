---
title: Sitecore Helix の Next.js サンプルを動かす - Next.js アプリの追加
date: '2022-06-13'
tags: ['Next.js', 'Sitecore CLI']
draft: true
summary: Sitecore Helix のサンプルに関して以前一度動作確認をしました。今回から数回に分けて、これまで作成してきたイメージを利用して、Sitecore Helix と同等の環境をサンプルコードを利用して準備していきたいと思います。
images: ['/static/images/2022/03/component06.gif']
---

Sitecore Helix のサンプルに関して以前一度動作確認をしました。今回から数回に分けて、これまで作成してきたイメージを利用して、Sitecore Helix と同等の環境をサンプルコードを利用して準備していきたいと思います。

## 前提条件

Sitecore Helix のデモ環境を動作させた手順は以下の２つの記事になります。

- [Sitecore Helix の Next.js サンプルを動かす - 準備](/blog/2022/05/19/basic-company-nextjs-part1)
- [Sitecore Helix の Next.js サンプルを動かす - コンテナを起動する](/blog/2022/05/20/basic-company-nextjs-part2)

またサンプルのコンテナイメージを利用してコンテンツのインポートの手前まで進めた手順は以下の通りです。

- [Sitecore Docker カスタムイメージの利用 - 初期設定](/blog/2022/05/26/building-custom-sitecore-images-part-1)
- [Sitecore Docker カスタムイメージの利用 - プロジェクトの作成](/blog/2022/05/27/building-custom-sitecore-images-part-2)
- [Sitecore Docker カスタムイメージの利用 - 管理画面の日本語化](/blog/2022/05/30/building-custom-sitecore-images-part-3)
- [Sitecore Docker カスタムイメージの利用 - Sitecore Management Services のインストール](/blog/2022/05/31/building-custom-sitecore-images-part-4)
- [Sitecore Docker カスタムイメージの利用 - Sitecore Headless Services のイメージ作成](/blog/2022/06/01/building-custom-sitecore-images-part-5)

Sitecore CLI に関連する記事は以下の２つが前提条件となっています。

- [Sitecore CLI のインストール](/blog/2022/05/18/install-sitecore-cli)
- [Sitecore CLI を利用してコンテンツのインポート](/blog/2022/06/02/sitecore-cli-import)

## Next.js のサンプルコードを展開する

まず最初に src ディレクトリの配下に新しい Next.js のプロジェクトを作成します。これまで jss コマンドを利用していましたが、今回からは新しい手順で進めていきたいと思います。まず、`src` フォルダに移動をして、以下のコマンドを実行します。

```
cd src
npm init sitecore-jss
```

![nextjs](/static/images/2022/06/nextjs01.png)

ここでは y を選択して進めると、続いてどのテンプレートをベースにするか確認が表示されます。

![nextjs](/static/images/2022/06/nextjs02.png)

今回は nextjs のまま進めるので、キーボードで Enter をタイプすることで画面が切り替わります。続いてディレクトリの指定が表示されます。

![nextjs](/static/images/2022/06/nextjs03.png)

続いてアプリの名前が表示されます。今回は sitecoredemo-jp とします。

![nextjs](/static/images/2022/06/nextjs04.png)

Sitecore のホスト名が表示されます。これまでの環境では manage-demo.sitecoredemo.jp としていたので、この値を設定します。

![nextjs](/static/images/2022/06/nextjs05.png)

GraphQL か REST にするのかの確認が表示されるため、GraphQL を選択します。

![nextjs](/static/images/2022/06/nextjs06.png)

続いて SSG （スタティクサイトジェネレーター）なのか SSR （サーバーサイドレンダリング）の確認が表示されます。ここでは SSG を選択します。

![nextjs](/static/images/2022/06/nextjs07.png)

テンプレートのデータが必要かどうかが表示されます。今回は取り急ぎテンプレートを入れたいと思いますので、スペースキーをタイプしてチェックしている状態で進めます。

![nextjs](/static/images/2022/06/nextjs08.png)

追加の言語の確認が表示されます。先々を考えて `ja-JP` を追加しておきます。

![nextjs](/static/images/2022/06/nextjs09.png)

これでコマンドによる確認は終了となり、`npm install` が実行されます。

![nextjs](/static/images/2022/06/nextjs10.png)

しばらくするとテンプレートの完成です。
