---
title: Sitecore Headless - Next.js 評価手順
date: '2022-02-17'
tags: ['Sitecore','Headless']
draft: true
summary: ブログでこれまでヘッドレスに関しての情報を提供していましたが、手順は以前の記事を参考にしつつ（少し補足を入れることもあります）、Next.js でのデモサイト構築の手順を今回紹介していきます。
images: ['/static/images/2022/02/release27.png']
---

ブログでこれまでヘッドレスに関しての情報を提供していましたが、手順は以前の記事を参考にしつつ（少し補足を入れることもあります）、Next.js でのデモサイト構築の手順を今回紹介していきます。

## Next.js テンプレートを利用する

jss のコマンドをインストールしている環境で Next.js のテンプレートを作成します。

```
jss create sitecoredemo.jp nextjs
```

サンプルのデータを今回は削除していきます。詳細な手順は [Next.js SDK を利用してサンプルサイトを構築 - Part.1](/blog/2021/04/13/nextjs-sdk-part-1)でも紹介をしています。


## Sitecore XM で API キーを発行する

Sitecore の管理画面から API を新規に作成をします。作成するアイテムは /sitecore/system/Settings/Services/API Keys のアイテムを指定したあと、API Key のボタンをクリックすると新しいキーが作成されます。

![nextjs](/static/images/2022/02/nextjs01.png)

キーを利用してプロジェクトのセットアップを進めます。

```
jss setup
```

## Vercel に展開する前に

上記のコマンドで、nextjs のサンプルが手元にプロジェクトとして作成されます。作成された .gitattributes のファイルの中に記載されているテキストのエンコーディングを crlf に変更してください。これは先々 Vercel に展開をする際に pritteir のエラーが改行コードによって発生するため、ビルドエラーが出ないように指定をします。

```
* text eol=crlf
```
