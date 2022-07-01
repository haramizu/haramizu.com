---
title: Sitecore JSS 20.0 からの新しいテンプレート作成方法
date: '2022-07-11'
tags: ['Headless', 'Next.js']
draft: true
summary: これまでサンプルのアプリを作成する際には、Sitecore JSS のコマンドとして jss を利用していました。Sitecore JSS 20.0 からはコマンドの動作が更新され便利な機能が提供されるようになりました。そこで今回は、新しいテンプレートの作成方法に関して確認をしていきます。
images: ['/static/images/2022/03/component06.gif']
---

これまでサンプルのアプリを作成する際には、Sitecore JSS のコマンドとして jss を利用していました。Sitecore JSS 20.0 からはコマンドの動作が更新され便利な機能が提供されるようになりました。そこで今回は、新しいテンプレートの作成方法に関して確認をしていきます。

## 新しいコマンドを実行する

新しいコマンドを利用してプロジェクトを作成したいディレクトリに Next.js のプロジェクトを作成します。これまで jss コマンドを利用していましたが、これが少し変わる形です。実際にプロジェクトを作成したいディレクトリにおいて以下のコマンドを実行してください。

```
npm init sitecore-jss
```

![nextjs](/static/images/2022/07/nextjs01.png)

ここでは y を選択して進めると、続いてどのテンプレートをベースにするか確認が表示されます。

![nextjs](/static/images/2022/07/nextjs02.png)

今回は nextjs のまま進めるので、キーボードで Enter をタイプすることで画面が切り替わります。続いてディレクトリの指定が表示されます。

![nextjs](/static/images/2022/07/nextjs03.png)

続いてアプリの名前が表示されます。今回は sitecoredemo-jp とします。

![nextjs](/static/images/2022/07/nextjs04.png)

Sitecore のホスト名が表示されます。これまでの環境では manage-demo.sitecoredemo.jp としていたので、この値を設定します。

![nextjs](/static/images/2022/07/nextjs05.png)

GraphQL か REST にするのかの確認が表示されるため、GraphQL を選択します。

![nextjs](/static/images/2022/07/nextjs06.png)

続いて SSG （スタティクサイトジェネレーター）なのか SSR （サーバーサイドレンダリング）の確認が表示されます。ここでは SSG を選択します。

![nextjs](/static/images/2022/07/nextjs07.png)

テンプレートのデータが必要かどうかが表示されます。空っぽのテンプレートを作成するためにチェックせずに進めます。

![nextjs](/static/images/2022/07/nextjs08.png)

これでコマンドによる確認は終了となり、`npm install` が実行されます。

![nextjs](/static/images/2022/07/nextjs09.png)

しばらくするとテンプレートの完成です。

![nextjs](/static/images/2022/07/nextjs11.png)

## まとめ

今回は
