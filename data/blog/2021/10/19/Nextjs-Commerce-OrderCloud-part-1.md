---
title: Next.js Commerce と OrderCloud の連携
date: '2021-10-19'
tags: ['OrderCloud', 'Next.js', 'Headless']
draft: false
summary: 2021 年 10 月最初の週に実施された Sitecore Symposium 2021 にて発表された Sitecore OrderCloud のテンプレートとして、Next.js Commerce との連携ができるようになりました。これにより、汎用的な Web サイトのテンプレートを使って開発をしていくことができるようになります。今回はその手順に関して紹介をしていきます。
images: ['/static/images/2021/10/nextjscommerce20.png']
---

2021 年 10 月最初の週に実施された Sitecore Symposium 2021 にて発表された Sitecore OrderCloud のテンプレートとして、Next.js Commerce との連携ができるようになりました。これにより、汎用的な Web サイトのテンプレートを使って開発をしていくことができるようになります。今回はその手順に関して紹介をしていきます。

- Find an Integration - [Sitecore OrderCloud](https://vercel.com/integrations/ordercloud)

## 前提条件

今回の手順として、以下の部分はすでに用意されているとします。

- Sitecore OrderCloud のフリーアカウントがすでに用意されている
- Vercel のアカウントが準備できている
  - [Vercel](https://vercel.com/)
  - 個人で利用する分には無料で利用できます
- GitHub のアカウント
  - Vercel のアカウントと事前に連携をしておいてください

これだけでデモサイトを立ち上げることができます。

## プロジェクトを作成する

Vercel にアクセスをすると、まだプロジェクトがない場合は、以下のような画面になります。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce01.png)

すでに他のプロジェクトを持っている場合は、プロジェクト一覧のところから New Project のボタンをクリックすると、以下の画面になります。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce02.png)

今回は、以下のアイコン、Next.js Commerce をクリックしてください。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce03.png)

画面が切り替わると、Create Git Repository でリポジトリの名前を指定することができるようになっています。すでに私のアカウントは GitHub のアカウントと紐づいているため、連携しているアカウントのリポジトリを作成します。今回はプライベートリポジトリとします。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce04.png)

続いてチームの作成となります。個人のアカウントであれば、この部分はスキップしてください。ここでチームを作成する場合は、複数のメンバーで作業をするための有料アカウントを作成する形ですので、実際のプロジェクトであれば Team を作る形（もしくは Team にプロジェクトを追加する形）となります。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce05.png)

次はインテグレーションの追加、となりますがここには Sitecore OrderCloud は（これを書いている段階では）リストで表示されません。これはあとで設定できるためスキップします。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce06.png)

上記の設定の後、まずは Next.js Commerce が展開されます。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce07.png)

特に何もコードを書いていませんが、以下のように展開が完了します。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce08.png)

## OrderCloud と連携をする

作成をしたリポジトリに Sitecore OrderCloud との連携をする手順を進めていきます。サイトとして以下のサイトにアクセスをしてください。

- [Sitecore OrderCloud](https://vercel.com/integrations/ordercloud)

![Nextjs Commerce](/static/images/2021/10/nextjscommerce09.png)

右上に表示されている、 **Add Integration** のボタンをクリックすると、以下の画面に切り替わり、連携をするアカウントを選択します。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce10.png)

**Continue** をクリックするとプロジェクトのリポジトリの指定となります。先ほど作成をしたリポジトリを指定します。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce11.png)

**Add Integration** のボタンを押すと、OrderCloud のアカウントの確認画面が表示されます。ここでは事前に準備している OrderCloud のアカウントがあるので右側のボタンをクリックしてください。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce12.png)

ログインをすると、現在選択をしている Vercel のプロジェクトと、どの Marketplace と連携させるのかを選択する画面に切り替わります。ここでは、New を選択してください。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce13.png)

**Apply Change** をクリックします。しばらくすると展開が開始されます。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce14.png)

上記の設定で、連携が完了した形となります。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce15.png)

## インストール後の確認

まず最初に、OrderCloud の管理画面にアクセスをして Marketplace 一覧を見にいくと、 Vercel Commerce が作成されています。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce16.png)

すでに API Client なども含めて作成されていることがわかります。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce17.png)

この API Client などの値に関しては、Vercel のプロジェクトの Environment Variables に設定されています。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce18.png)

上記の設定は確認するだけで問題ありません。設定が入っていることを確認したあと、すでに展開していたプロジェクトをもう一度再展開します。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce19.png)

## 展開後の確認

Redeploy が終わると以下のような画面になります。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce20.png)

サイトにアクセスするとすでにサイトが立ち上がっています。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce21.gif)

商品を選択して、カートに入れるという形で動作するようになっています。とはいえ、このサイトに関する Middleware および Seller のサイトは起動していないため、この部分は Headstart を流用することで、サンプルのサイトが立ち上がる形となります。

続いて OrderCloud のサイトに移動をして、作成をした Marketplace を開きます。例えば、Products の画面で検索キーワードとして Search で Jacket で検索をすると、ジャケットが製品として登録できていることもわかります。

![Nextjs Commerce](/static/images/2021/10/nextjscommerce22.png)

まずは Buyer のサイトが Next.js で起動できました。

## まとめ

今回は Buyer サイトのテンプレートとして、Next.js Commerce を利用する方法を紹介しました。非常に簡単に Commerce のサイトが立ち上がります。あとは、GitHub のリポジトリにあるソースコードを初期のプロジェクトのコードとして、プロジェクトをスタートすることが可能です。あまりにスムーズに作ることができたのでこれは本当に良くできたソリューションという形ですね。

## 参考情報

- [How to Deploy Next.js Commerce Storefront with Vercel Sitecore OrderCloud Integration in 5 Easy Steps](https://sitecoredude.com/how-to-deploy-next-js-commerce-storefront-with-vercel-sitecore-ordercloud-integration-in-5-easy-steps/)
