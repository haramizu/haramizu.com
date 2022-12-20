---
title: Next.js Commerce と OrderCloud の連携
date: '2022-12-23'
tags: ['OrderCloud', 'Next.js']
draft: true
summary: Next.js Commerce との連携の手順を以前にも紹介していましたが、時間が経ったこともありアップデートがあります。今回は、最短で立ち上げるための手順を改めて紹介したいと思います。
images: ['/static/images/2022/12/nextjscommerce18.png']
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

今回は日本のデータセンターに OrderCloud のテナントを立ち上げるのをゴールとします。このため、日本のデータセンターに対して新規のマーケットプレースを作成していきます。

事前準備として、サイトで利用をする画像を Azure のストレージにアップロードしておく必要があります。手順は以下の通りです（ストレージに関しては作成が完了しているとします）。

1. https://raw.githubusercontent.com/ordercloud-api/ordercloud-seed/main/seeds/Vercel-B2C.yml のファイルをダウンロードします。このファイルは一旦 assets/Seed のフォルダに保存をします。
2. 上記の Yaml ファイルで記載されている画像を一通りダウンロードしてください。
3. Azure ストレージに対して、 `vercel-integration-assets` のコンテナを作成します

![storage](/static/images/2022/12/storage01.png)

4. 作成したコンテナに、ダウンロードをした画像をアップロードします

![storage](/static/images/2022/12/storage02.png)

5. アップロードをした画像にブラウザでアクセスできることを確認します
6. assets/Seed/Vercel-b2c.yml ファイルにある画像のパスを、新しいストレージのパスに変更をします。

これでアップロードの準備が完了しました。続いてコマンドラインを利用して、準備をしたデータを利用して新しい Marketplace を作成します。

```
npx @ordercloud/seeding seed Vercel-B2C.yml -n='Nextjs Commerce Japan' -u={username} -p={password} -r=jpn
```

ユーザー名とパスワードを先ほど作成したアカウントのデータとして合わせてください。以下の様に、データを元に必要となるデータが生成されます。

![OrderCloud](/static/images/2022/12/seeding01.png)

完了したところで、OrderCloud の管理画面にてマーケットプレースができているのを確認してください。

![OrderCloud](/static/images/2022/12/seeding02.png)

これで日本のデータセンターで立ち上げる準備が完了しました。

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

Integration をする上で、まずはアメリカのデータセンターに新規マーケットプレースを作成します。これはコネクタの管理画面ではデータセンターを選択することができないため、一度米国でマーケットプレースの作成、その後日本のマーケットプレースのデータに接続する、という形で手続きを進めていきます。

まず Integration の管理画面で `sitecore` のキーワードで検索をして、Sitecore OrderCloud を選択してください。

![OrderCloud](/static/images/2022/12/nextjscommerce05.png)

クリックをすると下の画面が表示されて、Add Integration のボタンをクリックします。

![OrderCloud](/static/images/2022/12/nextjscommerce06.png)

画面が切り替わり、以下の様なダイアログが表示されます（サンプルの環境はすでにインストールされているため、初回と画面は異なります）。

![OrderCloud](/static/images/2022/12/nextjscommerce07.png)

これで完了したあと、`Configure` のボタンをクリックすると以下の画面が表示されます。右側に表示されるリストに関しては、Seed new Marketplace の項目を選択したまま、`Apply Changes` をクリックします。

![OrderCloud](/static/images/2022/12/nextjscommerce08.png)

画面でしばらく新しい Marketplace が生成されていることがわかります。

![OrderCloud](/static/images/2022/12/nextjscommerce09.png)

Integration の設定が完了しただけではまだ Build プロセスが動いていないため、サイトに関しては特に変更はありません。

![OrderCloud](/static/images/2022/12/nextjscommerce10.png)

`Deployments` のメニューから `Redeploy` をクリックして、サイトをビルドします

![OrderCloud](/static/images/2022/12/nextjscommerce11.png)

しばらくすると、ビルドが完了して以下のようにサイトが変更されます。

![OrderCloud](/static/images/2022/12/nextjscommerce12.png)

## マーケットプレースを切り替える

すでに Next.js Commerce と OrderCloud が連携してサイトが起動している形ですが、データセンターとしては海外となっています。最後に、日本のマーケットプレースに切り替える手続きを進めていきます。

まず、プロジェクトの Environment Variables の値を変更していきます。まず最初に、マーケットプレースに関する２つの情報を OrderCloud の以下のページから取得します。

- ORDERCLOUD_MARKETPLACE_ID: Marketplace Identifier
- ORDERCLOUD_MARKETPLACE_NAME: Marketplace Name

![OrderCloud](/static/images/2022/12/nextjscommerce13.png)

続いて左側のメニューから `API Clients` を選択、また Sandbox に関しては `Nextjs` を選択します（名前が異なる場合は、その名前を選択してください）。

![OrderCloud](/static/images/2022/12/nextjscommerce14.png)

この画面画面からは、API Client を選択して値を取得していきます。まずは、 Middleware Integrations から以下の 2 つのキーを取得してください。

- ORDERCLOUD_MIDDLEWARE_CLIENT_ID : Client ID
- ORDERCLOUD_MIDDLEWARE_CLIENT_SECRET : Client Secret

![OrderCloud](/static/images/2022/12/nextjscommerce15.png)

最後に Buyer の ID を取得するために、Storefront App に切り替えて ID を取得します。

- ORDERCLOUD_BUYER_CLIENT_ID : Client ID

![OrderCloud](/static/images/2022/12/nextjscommerce16.png)

これで Vercel でセットアップしているプロジェクトの変数を変更することができました。ただしこれだけでは作業が完了しておらず、Next.js Commerce のプロジェクトが参照するデータセンターがアメリカになっているため、これを日本に切り替える必要があります。プロジェクトの以下のファイルを変更してください。

```typescript:packages\ordercloud\src\constants.ts
export const API_URL = 'https://japaneast-sandbox.ordercloud.io'
```

また画像に関してはサンプルとは異なる別のストレージを利用することになるため、以下の様にストレージの URL を追加してください。

```typescript:packages\ordercloud\src\next.config.cjs
const commerce = require('./commerce.config.json')

module.exports = {
  commerce,
  images: {
    domains: ['localhost', 'ocdevops.blob.core.windows.net', 'YOURBLOBSTORAGE.blob.core.windows.net'],
  },
}
```

このコードを変更して、GitHub に反映させるとリビルドが実行されます。

![OrderCloud](/static/images/2022/12/nextjscommerce17.png)

エラーになった場合は、Redeploy の画面で Redeploy with existing Build Chache のダイアログをクリックしてからサイドで展開することで完了します。以下がその画面となります。

![OrderCloud](/static/images/2022/12/nextjscommerce18.png)

## まとめ

今回は Next.js Commerce と Sitecore OrderCloud を連携させる手順、また日本のデータセンターを選択する際の手順まで紹介をしました。簡単にコマースサイトを立ち上げ流ことが可能なことがわかります。
