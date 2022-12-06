---
title: Headstart デモ環境を構築する - Part 1 環境を整備する
date: '2022-02-01'
tags: ['Sitecore', 'OrderCloud']
draft: false
summary: Sitecore OrderCloud のサンプルサイトでもある Headstart を立ち上げるための手順を紹介します。以前にも記事で紹介をしましたが、あまり説明もなく手順のみが記載されていたのでよくわからない形だったかと思います。実は日本のデータセンターも選択することができるようになったので、この部分も含めてもう少し細かいステップを含めた手順で紹介をしていきます。
images: ['/static/images/2022/02/createaccount01.png']
---

Sitecore OrderCloud のサンプルサイトでもある Headstart を立ち上げるための手順を紹介します。以前にも記事で紹介をしましたが、あまり説明もなく手順のみが記載されていたのでよくわからない形だったかと思います。実は日本のデータセンターも選択することができるようになったので、この部分も含めてもう少し細かいステップを含めた手順で紹介をしていきます。

## セットアップ前提条件

Headstart のサイトを立ち上げるために、まずは以下の環境を用意してください。すでにインストール済みのツールも含まれているかと思います。

- Windows 10 以降、Windows Server 2019 以降、macOS および Linux
- .NET Core 3.1
- Node.js 14.x 以上 [Node.js](https://nodejs.org/ja/)

今回のセットアップに際して、以下のツールを利用するためインストールをしてください。

- Visual Studio 2019 以降
- [Visual Studio Code](https://code.visualstudio.com)
- [Postman](https://www.postman.com)
- [Git for Windows](https://gitforwindows.org)
- [GitHub Desktop](https://desktop.github.com)

必要なオンラインサービス

- [OrderCloud アカウント](https://ordercloud.io)
- [GitHub アカウント](https://github.com)
- [Azure DevOps アカウント](https://azure.microsoft.com/ja-jp/services/devops/)
- [Microsoft Azure アカウント](https://azure.microsoft.com/ja-jp/free/)
- [Sendgrid](https://sendgrid.com) - メールの送信に利用

## OrderCloud アカウントの準備

今回のデモ環境を立ち上げるにあたって、OrderCloud のアカウントが必要となりますが Sandbox は無料で利用することができます。契約をすると Staging および Production の環境が提供される形になります。今回はデモを動かすだけのため、無料の Sandbox が利用できるだけで問題ありません。ということで、アカウントを作成します。まず Web サイトにアクセスをしてください。

![OrderCloud](/static/images/2022/02/createaccount01.png)

画面の右上に表示されている Create a Free Account をクリックするとメールアドレスを入力することができるサインアップ画面が表示されます。

![OrderCloud](/static/images/2022/02/createaccount02.png)

メールアドレスを入力して、Register ボタンをクリックしてください。しばらくするとメールアドレスに確認コードが記載されたメールが届きます。

![OrderCloud](/static/images/2022/02/createaccount03.png)

１つ目の項目にコードを入力して、フルネームおよびログイン用のユーザー名、パスワードを入力してください。

![OrderCloud](/static/images/2022/02/createaccount04.png)

ユーザー登録が完了すると以下の画面に切り替わります。

![OrderCloud](/static/images/2022/02/createaccount05.png)

これでアカウントの作成ができました。

## OrderCloud ポータルにログインをする

作成をしたアカウントでログインをしてください。まず最初に利用に関する条件のダイアログが表示されます。

![OrderCloud](/static/images/2022/02/createaccount06.png)

チェックをしてログインをすると、ポータル画面にアクセスすることができるようになりました。

![OrderCloud](/static/images/2022/02/createaccount07.png)

他のサービスのアカウント作成に関しては、今回は省略しますが、これで OrderCloud のデモ環境となる Headstart を立ち上げるための準備ができた形です。

## まとめ

今回はデモ環境を立ち上げるための最初のステップとして環境に関しての紹介、また必須となる OrderCloud のアカウントの作成手順について紹介をしました。

- [Part 2 サンプルコードを準備する](/blog/2022/02/02/headstartdemo-step2)
