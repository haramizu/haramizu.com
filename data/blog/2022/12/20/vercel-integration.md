---
title: Sitecore XM Cloud - Vercel との連携
date: '2022-12-20'
tags: ['XM Cloud', 'XM', 'Vercel']
draft: false
summary: Sitecore XM Cloud で作成をした CMS のデリバリー環境として Vercel を選択することが可能ですが、この作業を簡単にするための Sitecore XM Cloud との連携機能を提供しています。今回は、この機能を利用して、Web サイトを Vercel に展開する手順を紹介します。
images: ['/static/images/2022/12/VercelIntegration09.png']
---

Sitecore XM Cloud で作成をした CMS のデリバリー環境として Vercel を選択することが可能ですが、この作業を簡単にするための Sitecore XM Cloud との連携機能を提供しています。今回は、この機能を利用して、Web サイトを Vercel に展開する手順を紹介します。

## Experimental Features を有効にする

プロジェクトを作成、その後新しい環境ができたところで、右上にある歯車のアイコンをクリックしてください。実験的な機能を利用することができる様に、`Environment Details` を利用できる様にチェックをします。

![Vercel](/static/images/2022/12/VercelIntegration01.png)

この段階で次のステップに進みます。

## サイトを作成する

まずサイトを作成するためには、これまでであれば Launch Pad を起動して管理画面を切り替えていましたが、今回はすでに有効にした機能を活用していきます。まず、環境の名前をクリックすると環境の設定画面に移動することができます。

![Vercel](/static/images/2022/12/VercelIntegration02.png)

まだ新規にプロジェクトを作成しただけのため、まずはサイトを追加する必要があります。`Add your rist website` をクリックしてください。

![Vercel](/static/images/2022/12/VercelIntegration03.png)

今回は Basic site を選択して、Site name を入力、Create website をクリックしてサイトを追加します。

![Vercel](/static/images/2022/12/VercelIntegration04.png)

サイトが作成されたら次のステップに進みます。

## Vercel に展開する

まずは Publish をクリックして、サイトを公開します。

![Vercel](/static/images/2022/12/VercelIntegration05.png)

Publish をしたあと、`Setup Hosting` をクリックして Vercel との連携を進めていきます。

![Vercel](/static/images/2022/12/VercelIntegration06.png)

初回は Vercel との連携をインストールする必要があります。

![Vercel](/static/images/2022/12/VercelIntegration07.png)

完了をすると、Vercel のアカウントがドロップダウンに表示されます。プロジェクトの名前を設定して、`Save` ボタンをクリックしてください。

![Vercel](/static/images/2022/12/VercelIntegration08.png)

設定が完了すると、以下の様にサイトが用意されます。

![Vercel](/static/images/2022/12/VercelIntegration09.png)

Vercel に移動をすると、Build が実行されています。

![Vercel](/static/images/2022/12/VercelIntegration10.png)

しばらくするとサイトが公開されています。

![Vercel](/static/images/2022/12/VercelIntegration11.png)

## まとめ

この機能を利用することで、Vercel を利用したセットアップの手順を自動化することができます。現在は個人アカウントまででチームアカウントに展開できない状況ですが、beta 版のため今後この部分は解消するのを期待したいと思います。
