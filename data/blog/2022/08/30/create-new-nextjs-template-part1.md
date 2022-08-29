---
title: Next.js サンプルサイトの追加（前編）
date: '2022-08-30'
tags: ['Headless', 'Next.js']
draft: false
summary: ４回に分けて作成をしてきた環境にはまだ Next.js のプロジェクトがないため、サンプルサイトを追加していきます。プロジェクトにコードを追加する形です。この手順は２回に分けて紹介をしていく予定です。今回は、まず Next.js のサンプルが動くところまで進めていきます。
images: ['/static/images/2022/08/nextjs07.png']
---

４回に分けて作成をしてきた環境にはまだ Next.js のプロジェクトがないため、サンプルサイトを追加していきます。プロジェクトにコードを追加する形です。この手順は２回に分けて紹介をしていく予定です。今回は、まず Next.js のサンプルが動くところまで進めていきます。

## Next.js のプロジェクトの追加

以前から提供されている jss のコマンドではなく、新しいプロジェクトを作る方法が 20.x から変更されました。今回は、この新しいコマンドを利用して Next.js のプロジェクトを作成します。

まずコードの管理は src の下で実装したいので、src のフォルダに移動をしてい、以下のコマンドを実行します。

```
npm init sitecore-jss
```

![nextjs](/static/images/2022/08/nextjs01.png)

どのフレームワークを利用するのか、の質問が表示されているため `nextjs` を選択して次に進めます。

![nextjs](/static/images/2022/08/nextjs02.png)

続いてフォルダの名前を聞いてきます。今回は、 `C:\projects\Sitecoredemo.Docker\src\rendering` に変更して実行します。続いてアプリの名前が表示されます。

![nextjs](/static/images/2022/08/nextjs03.png)

今回は sitecoredemo-jp とします。Sitecore のホスト名が表示されます。今回はローカルで動かす名前を cm.sitecoredemo.localhost にしているため、この値を設定します。

![nextjs](/static/images/2022/08/nextjs04.png)

GraphQL か REST にするのかの確認が表示されるため、GraphQL を選択します。

続いて SSG （スタティクサイトジェネレーター）なのか SSR （サーバーサイドレンダリング）の確認が表示されます。ここでは SSG を選択します。

![nextjs](/static/images/2022/08/nextjs05.png)

テンプレートのデータが必要かどうかが表示されます。サンプルのデータなどは今回は不要とするため、テンプレートのみが必要なためチェックせずに進めます。

![nextjs](/static/images/2022/08/nextjs06.png)

これでコマンドによる確認は終了となり、指定したディレクトリにデータが作成されて、 `npm install` が実行されます。しばらくするとテンプレートの完成です。

![nextjs](/static/images/2022/08/nextjs07.png)

## 追加の設定

Next.js のプロジェクトを見やすくするために、 [Prettier](https://prettier.io) という仕組みを利用しています。改行コードの違いなどでエラーになるケースも出てきます。これを避けるために、以下のファイルを追加します。

```.gitattributes
# Auto detect text files and perform LF normalization
* text=auto
```

これにより、今後新しいコンポーネントを追加した場合や、何らかのコードを別途利用するような際の改行コードの違いなどでエラーが発生するケースを避けることができるようになります。

## まとめ

今回は Next.js のテンプレートをプロジェクトに追加するところまで紹介をしました。この状態ではまだ Sitecore にコンテンツがなく、Next.js にもサンプルのデータがないため動作しません。この部分の追加作業は、次回のポイントとなります。
