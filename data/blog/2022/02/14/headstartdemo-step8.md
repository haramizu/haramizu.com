---
title: Headstart デモ環境を構築する - Part 8 Azure の環境を準備する（その２）
date: '2022-02-14'
tags: ['Sitecore', 'OrderCloud']
draft: false
summary: ローカルでの動作確認ができたので、次は Azure にミドルウェア、Buyer および Seller を展開していきます。実はまだミドルウェアのみインスタンスを作っていただけですので、ここで Buyer および Seller のインスタンスを追加していきます。
images: ['/static/images/2022/02/azure24.png']
---

ローカルでの動作確認ができたので、次は Azure にミドルウェア、Buyer および Seller を展開していきます。実はまだミドルウェアのみインスタンスを作っていただけですので、ここで Buyer および Seller のインスタンスを追加していきます。

## Azure のリソース追加

まず最初に Buyer のリソースを追加したいと思います。作業としては Middleware の Web アプリを追加したのと同じで、追加をした後デプロイスロットとして test を追加するだけとなります。インスタンスとしては Node.js 14 に対応しているインスタンスを作成するところがポイントです。

![OrderCloud](/static/images/2022/02/azure20.png)

インスタンスが出来上がったあと、デプロイスロットとして test を追加します。

![OrderCloud](/static/images/2022/02/azure21.png)

続いて Seller （管理画面用）の Webapp を追加します。これも Node.js 14 に対応しているインスタンスを作成するところが同じポイントになります。

![OrderCloud](/static/images/2022/02/azure22.png)

出来上がったあと、デプロイスロッとして test を追加します。

![OrderCloud](/static/images/2022/02/azure23.png)

これで Azure のリソースが一通り揃いました。以下の画面が、今回の手順で作成をした Azure のリソース一覧となります。

![OrderCloud](/static/images/2022/02/azure24.png)

## まとめ

Azure の受け入れ側の手順の確認ができたので、次回からは GitHub にアップしているリポジトリのデータを利用して Azure に展開する手順を紹介していきます。

- [Part 9 Azure DevOps と GitHub 連携](/blog/2022/02/15/headstartdemo-step9)
