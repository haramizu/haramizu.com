---
title: Next.js Commerce と OrderCloud
date: '2022-12-23'
tags: ['OrderCloud', 'Next.js']
draft: true
summary: Next.js Commerce との連携の手順を以前にも紹介していましたが、時間が経ったこともありアップデートがあります。今回は、最短で立ち上げるための手順を改めて紹介したいと思います。
images: ['/static/images/2021/09/xm09.png']
---

Next.js Commerce との連携の手順を以前にも紹介していましたが、時間が経ったこともありアップデートがあります。今回は、最短で立ち上げるための手順を改めて紹介したいと思います。

## アカウントを作成する

Sitecore OrderCloud の Sandbox は無料で利用することができます。実際の契約をすると Staging および Production の環境が提供される形となり、実際の運用で求められる構成を組むことができます。まず、アカウントの作成をします。

![OrderCloud](/static/images/2022/02/createaccount01.png)

画面の右上に表示されている Create a Free Account をクリックするとメールアドレスを入力することができるサインアップ画面が表示されます。

![OrderCloud](/static/images/2022/02/createaccount02.png)

メールアドレスを入力して、Register ボタンをクリックしてください。しばらくするとメールアドレスに確認コードが記載されたメールが届きます。

![OrderCloud](/static/images/2022/02/createaccount03.png)

１つ目の項目にコードを入力して、フルネームおよびログイン用のユーザー名、パスワードを入力してください。

![OrderCloud](/static/images/2022/02/createaccount04.png)

ユーザー登録が完了すると以下の画面に切り替わります。

![OrderCloud](/static/images/2022/02/createaccount05.png)

これでアカウントの作成ができました。作成をしたアカウントでログインをしてください。まず最初に利用に関する条件のダイアログが表示されます。

![OrderCloud](/static/images/2022/02/createaccount06.png)

チェックをしてログインをすると、ポータル画面にアクセスすることができるようになりました。

![OrderCloud](/static/images/2022/02/createaccount07.png)

## OrderCloud にサンプルのデータをインポートする

ここでコマンドラインに関する紹介をする

```
npx @ordercloud/seeding seed https://raw.githubusercontent.com/ordercloud-api/ordercloud-seed/main/seeds/Simple-B2C.yml -u={username} -p={password} -r=jpn
```

![OrderCloud](/static/images/2022/12/seeding01.png)

マーケットプレースができているのを確認

![OrderCloud](/static/images/2022/12/seeding02.png)

## Next.js Commerce のプロジェクトを作成

続いて Vercel で Next.js のプロジェクトを作成します。Vercel も無料のアカウントを作成することが可能です（容量などに制限がありますが、評価用としては問題ありません）。

プロジェクトの作成をクリックすると、以下の画面となり Next.js Commerce のプロジェクトが表示されているため、これをクリックします。

![OrderCloud](/static/images/2022/12/nextjscommerce01.png)

連携をする Git リポジトリを選択することとなりますが、今回は GitHub を選択します。

![OrderCloud](/static/images/2022/12/nextjscommerce02.png)

プロジェクト名を入力します。今回は `nextjs-commerce` とします。

![OrderCloud](/static/images/2022/12/nextjscommerce03.png)

Sitecore OrderCloud はこのタイミングでは無いため、Add Integrations の部分に関しては Skip をして実行します。

![OrderCloud](/static/images/2022/12/nextjscommerce04.png)

しばらくすると Next.js Commerce のデータを利用してサイトが立ち上がる形となります。

## OrderCloud との連携をする

サンプルのデータをとりあえず海外のデータセンターで起動する

![OrderCloud](/static/images/2022/12/nextjscommerce05.png)

![OrderCloud](/static/images/2022/12/nextjscommerce06.png)

![OrderCloud](/static/images/2022/12/nextjscommerce07.png)

![OrderCloud](/static/images/2022/12/nextjscommerce08.png)

![OrderCloud](/static/images/2022/12/nextjscommerce09.png)

![OrderCloud](/static/images/2022/12/nextjscommerce10.png)

![OrderCloud](/static/images/2022/12/nextjscommerce11.png)

![OrderCloud](/static/images/2022/12/nextjscommerce12.png)

## マーケットプレースを切り替える

日本のマーケットプレースに切り替える

Marketplace Identifier
Marketplace Name

![OrderCloud](/static/images/2022/12/nextjscommerce13.png)

API Client
![OrderCloud](/static/images/2022/12/nextjscommerce14.png)

Middleware Integrations
Secret

![OrderCloud](/static/images/2022/12/nextjscommerce15.png)

ORDERCLOUD_BUYER_CLIENT_ID

![OrderCloud](/static/images/2022/12/nextjscommerce16.png)

```typescript:packages\ordercloud\src\constants.ts
export const API_URL = 'https://japaneast-sandbox.ordercloud.io'
```

GitHub に反映させる

![OrderCloud](/static/images/2022/12/nextjscommerce17.png)

![OrderCloud](/static/images/2022/12/nextjscommerce18.png)

## まとめ

ここでまとめ
