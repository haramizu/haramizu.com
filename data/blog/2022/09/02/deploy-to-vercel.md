---
title: Vercel に展開する
date: '2022-09-02'
tags: ['Headless', 'Next.js','Vercel']
draft: false
summary: これまで作成をしてきた Web サイトを Vercel に展開したいと思います。シリーズの最初の頃に立ち上げたサーバーに対してサンプルのデータを展開、合わせて Vercel に展開する手順を紹介していきます。
images: ['/static/images/2022/09/vercel05.png']
---

これまで作成をしてきた Web サイトを Vercel に展開したいと思います。シリーズの最初の頃に立ち上げたサーバーに対してサンプルのデータを展開、合わせて Vercel に展開する手順を紹介していきます。

## 実施する手順に関して

今回実行する内容は以下のようになります。

- サーバーにアイテムを展開する
    - サーバーは [Sitecore Headless 開発、テスト環境の構築 Part 1 - サーバーの準備（サーバー編）](/blog/2022/08/24/create-sitecore-enviromnet-part-1) で用意したもの
    - アイテムの展開は [Sitecore CLI を利用してアイテムのインポート](/blog/2022/08/31/install-cli-import-items) の手順を実施
- GitHub にコードの展開 (https://github.com/SitecoreJapan/Sitecoredemo.Docker)
- Vercel に展開

となります。関連ブログ記事としては以下のものがあります。

- [Sitecore ヘッドレス と Next.js でサイト構築 - Vercel 環境の構築](/blog/2021/09/09/nextjs-vercel-part-1)

## サーバーにアイテムを展開する

すでに手元にプロジェクトとしてアイテムが同期されているのを前提として、Sitecore CLI を利用してサーバーに接続します。まず、コマンドでつながることを検証するために、Index のビルドが可能か確認をしてください。

```
dotnet sitecore login --cm https://yourcm.server --auth https://yourid.server --allow-write true
dotnet sitecore index schema-populate
```

![vercel](/static/images/2022/09/vercel01.png)

実行できていれば、コマンドラインで接続できている形となります。以下のコマンドで、手元のアイテムをサーバーに展開します。

```
dotnet sitecore ser push
```

コンテンツエディターを参照すると、アイテムが追加されていることがわかります。

![vercel](/static/images/2022/09/vercel02.png)

`/sitecore/system/Settings/Services/API Keys` の下に新しい API キーを作成して、作成した API キーを公開してください。

最後に、これまで作成していたプロジェクトの中から、 `docker\build\cm\Data\App_Config\include\zzz\sitecoredemo-jp.config` のファイルを、サーバーの `App_Config\include\zzz` のフォルダにコピーをして準備が完了となります。

## Vercel に展開する

Vercel にログインをして、プロジェクトを作成します。これまでと違い Next.js のプロジェクトは src\rendering のフォルダの下にあるため、プロジェクト作成の際の Root Directory で上記のフォルダを指定してください。

![vercel](/static/images/2022/09/vercel03.png)

また、Environment Variables に関しては以下の２つの項目を追加します。

- SITECORE_API_HOST: サーバー名
- SITECORE_API_KEY: サーバーで作成した API キー（インターネットでつながるホスト名である必要があります）

![vercel](/static/images/2022/09/vercel04.png)

これで Deploy ボタンをクリックしてください。しばらくすると Build が完了となり、CMS と連携しているサイトが立ち上がります。

![vercel](/static/images/2022/09/vercel05.png)

## まとめ

今回はプロジェクトのコードを GitHub に展開して、GitHub と連携させて Vercel にサイトの展開をしました。これは前回のタイミングでローカルで動かしたものを、インターネット上にある CMS サーバーと Vercel で実現したことになります。