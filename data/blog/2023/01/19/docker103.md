---
title: Sitecore 10.3 で Headless SXA を簡単に起動する
date: '2023-01-19'
tags: ['Docker', 'Next.js', 'XM', 'Headless SXA']
draft: true
summary: これまで数回に分けて Sitecore 10.3 のコンテナ環境、SXA の追加など手元で動かす方法を紹介してきました。毎回同じ手順を実施するのは大変なので、簡単に起動することができるリポジトリを作成しました。リポジトリを利用して起動する方法を今回は紹介します。
images: ['/static/images/2023/01/103docker12.png']
---

これまで数回に分けて Sitecore 10.3 のコンテナ環境、SXA の追加など手元で動かす方法を紹介してきました。毎回同じ手順を実施するのは大変なので、簡単に起動することができるリポジトリを作成しました。リポジトリを利用して起動する方法を今回は紹介します。

- [新しいプロジェクトを作成する](/blog/2023/01/10/create-new-project)
- [XM1 のプロジェクトを準備する](/blog/2023/01/11/docker-xm1)
- [SXA のモジュールを追加する](/blog/2023/01/12/install-sxa)
- [日本語リソースの追加](/blog/2023/01/13/add-japanese-resource)
- [ヘッドレスサイトを追加する](/blog/2023/01/16/add-headless-site)
- [Next.js のプロジェクトを追加する](/blog/2023/01/17/add-nextjs-project)

## テンプレートを利用して新しいリポジトリを作成する

これまで作成してきた Sitecore のプロジェクトに関して、簡単に立ち上げることができるようにカスタマイズしたリポジトリを以下のように公開しています。

- [Sitecoredemo.Docker](https://github.com/SitecoreJapan/Sitecoredemo.Docker)

このリポジトリは Sitecore のバージョン 10.2 の頃から提供していますが、今日のブログに合わせて 10.3 にアップデートをして、新しい機能となる Headless SXA を利用できるところまで用意した形です。

このリポジトリを利用して新しいリポジトリを作成するにあたっては、画面に表示されてる `Use this template` をクリックしてください。

![docker](/static/images/2023/01/103docker01.png)

`Create a new repository` をクリックすると、新しいリポジトリの作成となります。今回はリポジトリの名前を sitecore103sxa とします。

![docker](/static/images/2023/01/103docker02.png)

これで新しいリポジトリの作成が完了しました。

## ローカルで展開する

新しく作成をしたリポジトリのクローンをローカルに作成します。手元では Docker Desktop を利用して以下のように作成をしました。

![docker](/static/images/2023/01/103docker03.png)

`env.example` のファイルをコピーして、手元で利用するための `.env` のファイルを作成します。

![docker](/static/images/2023/01/103docker04.png)

続いて管理者権限のあるターミナルを開いて、対象となるフォルダに移動をして。 `init.ps1` を利用してプロジェクトの初期化を実行します。

```powershell
cd C:\projects\sitecore103sxa
.\init.ps1 -InitEnv -LicenseXmlPath "C:\projects\license\license.xml" -AdminPassword "DesiredAdminPassword"
```

![docker](/static/images/2023/01/103docker05.png)

実行をすると証明書となるファイルの作成、および初期値の設定を進めていきます。以下の画面で完了となります。

![docker](/static/images/2023/01/103docker06.png)

これで準備完了です。イメージの構築なども一括で処理することができる `up.ps1` を実行してください。

![docker](/static/images/2023/01/103docker07.png)

コンテナが起動したところで、Sitecore CLI の復元を実行して、ログインの画面が表示されます。

![docker](/static/images/2023/01/103docker08.png)

ログインをして書き込みができるように許可として進めていきます。

![docker](/static/images/2023/01/103docker09.png)

しばらくすると Sitecore にログインするためのウィンドウが開きます。ログインをすると、10.3 の管理画面が表示されているのがわかります。

![docker](/static/images/2023/01/103docker10.png)

## 環境の確認

ログイン後、コンテンツエディターを開くとサンプルのサイトがインポートされていることがわかります。

![docker](/static/images/2023/01/103docker11.png)

サイトの Home アイテムを選択して、エクスペリエンスエディターを開きます。開くと以下の画面となり、右側に SXA のコンポーネントが並んでいます。

![docker](/static/images/2023/01/103docker12.png)

無事 Headless SXA の開発環境として利用できる状況になりました。

## まとめ

簡単に手元で Sitecore 10.3 を起動して、Sitecore Headless SXA を利用できる形となりました。なお、SXA に関して現在は 3 つのタイプが提供されており、Headless に関しては利用できるコンポーネントの数が異なります。詳しくは以下を参照してください。

- [Compare headless and MVC features according to product](https://doc.sitecore.com/xp/en/developers/sxa/103/sitecore-experience-accelerator/compare-headless-and-mvc-features-according-to-product.html)
