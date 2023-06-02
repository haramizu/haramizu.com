---
title: Vercel に XM Cloud のサイトを展開する
date: '2022-12-09'
tags: ['XM Cloud', 'Vercel']
draft: true
summary: XM Cloud をこれまで紹介してきましたが、これまで CMS の環境を操作しているだけでした。実際に Web サイトとして公開をする際には、ヘッドレスとして実装しているので別のサービスと連携させる必要があります。今回は、Vercel にサイトを展開する手順を紹介します。これまでも何度か Vercel に展開する手順を紹介してきましたが、今回はその XM Cloud 版です。
images: ['/static/images/2022/12/vercel10.png']
---

XM Cloud をこれまで紹介してきましたが、これまで CMS の環境を操作しているだけでした。実際に Web サイトとして公開をする際には、ヘッドレスとして実装しているので別のサービスと連携させる必要があります。今回は、Vercel にサイトを展開する手順を紹介します。

これまでも何度か Vercel に展開する手順を紹介してきましたが、今回はその XM Cloud 版です。これまでの記事は以下のとおりです。

- [Vercel](/tags/vercel)

## アイテムのパブリッシュ

まず最初に、外部でサイトを立ち上げるためには現在利用している CMS のアイテムを一度公開する必要があります。公開の手順は簡単で、コンテンツエディターを起動して、公開したいサイトを選択、Publish タブから Publish Site を選択することで後は通常の Web サイトの公開と同じ形です。

![vercel](/static/images/2022/12/vercel07.png)

## API キーの取得

続いて、現在利用している CMS にアクセスするための API キーを取得する必要があります。このキーを取得するためには、Docker のプロジェクトで作成していたローカルの環境で Sitecore CLI を利用して取得する必要があります。

まずコマンドラインで Cloud にログインをします。

```
dotnet sitecore cloud login
```

続いてプロジェクトのリストを取得します。

```
dotnet sitecore cloud project list
```

![vercel](/static/images/2022/12/vercel03.png)

該当するプロジェクトの ID を利用して、Environment ID を取得します。

```
dotnet sitecore cloud environment list --project-id {your-project-id}
```

![vercel](/static/images/2022/12/vercel04.png)

以下の PowerShell のコマンドを利用することで、API キーを取得することができます。

```
.\New-EdgeToken.ps1 -EnvironmentId {your-environment-id}
```

![vercel](/static/images/2022/12/vercel05.png)

ブラウザが起動して GraphQL でアクセスできる画面が表示されています。この左下の HTTP HEADERS の中に、提供されたコードを入れて右側のエリアでエラーが表示されないようになれば、API キーが有効になった形となります。この API キーは Vercel での作業の際に必要となります。わからなくなった場合は、もう一度実行することで新しいキーが発行されます。

![vercel](/static/images/2022/12/vercel06.png)

これで準備が整いました。Vercel の環境でサイトを立ち上げましょう。

## Vercel のアカウントの作成、プロジェクトの作成

今回は XM Cloud と連携する GitHub のアカウントが用意されているかと思いますが、同じアカウントで Vercel にサインアップしてください。これにより、簡単に GitHub に展開しているコードを Vercel に展開することができます。

まず Vercel にログインをします。今回は無償の Hobby アカウントで進めていきます。

![vercel](/static/images/2022/12/vercel01.png)

新規のプロジェクトとして、`sxastarter` が表示されているため、これを `Import` します。

![vercel](/static/images/2022/12/vercel02.png)

プロジェクトの名前は任意で、Framework Preset に関しては `Next.js` を選択して、ルートディレクトに関しては `src/sxastarter` を指定してください。

![vercel](/static/images/2022/12/vercel08.png)

続いて Environment Value を設定する必要がありますが、今回は以下の３つの値を設定する必要があります。

| 名前              | 値                                           |
| ----------------- | -------------------------------------------- |
| GRAPH_QL_ENDPOINT | https://edge.sitecorecloud.io/api/graphql/v1 |
| JSS_APP_NAME      | sxastarter                                   |
| SITECORE_API_KEY  | 取得した APIKEY                              |

これらの値の設定方法は以下のページで紹介されています。

- [Walkthrough: Deploying your front-end application to Vercel](https://doc.sitecore.com/xmc/en/developers/xm-cloud/walkthrough--deploying-your-front-end-application-to-vercel.html)

![vercel](/static/images/2022/12/vercel09.png)

これだけで準備が完了となります。Deploy ボタンをクリックすると自動的に展開が開始され、Web サイトの展開が完了となります。

![vercel](/static/images/2022/12/vercel10.png)

## ページの更新

CMS と連携しているのを確認するために、今回はページの編集をします。まず、Pages を起動して今回は表示されている文章の最初に Demo という文字を入れてみます。

![vercel](/static/images/2022/12/vercel11.png)

画面の右下にある `publish` のボタンをクリックします。Publish が完了したあと、公開されているページを参照すると更新されていることがわかります。

![vercel](/static/images/2022/12/vercel12.png)

## まとめ

今回の手順までで、XM Cloud の開発環境を整え、また外部に公開する手順まで進めていきました。単に SaaS の環境として CMS を提供するだけでなく、開発をする環境を手元に準備することができ、また Web の配信に関しては Vercel を利用して展開することができます。利用しているほとんどのインフラ部分をサービス化することで、そこにかかっていたリソースを Web サイトの改善、マーケティング推進に使えるようになるのではないでしょうか。

上記の内容をダイジェストで紹介している動画を YouTube にアップしています。

[![](https://img.youtube.com/vi/wIF_TJR6b98/0.jpg)](https://www.youtube.com/watch?v=wIF_TJR6b98)
