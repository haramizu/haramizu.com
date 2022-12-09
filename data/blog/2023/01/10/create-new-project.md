---
title: 新しいプロジェクトを作成する
date: '2023-01-10'
tags: ['Docker', 'Next.js']
draft: false
summary: 新年あけましておめでとうございます。今年も Sitecore に関する技術的な情報をブログで提供していきたいと思います。実は Sitecore の技術情報は日本語で多く提供しているのですが、いざ始めるとなるとどこから手を付けていいのか悩ましいですよね。ということで、新年最初の投稿は、新しいプロジェクトをサクッと作るところを紹介します。
images: ['/static/images/2023/01/newproject03.png']
---

新年あけましておめでとうございます。今年も Sitecore に関する技術的な情報をブログで提供していきたいと思います。実は Sitecore の技術情報は日本語で多く提供しているのですが、いざ始めるとなるとどこから手を付けていいのか悩ましいですよね。ということで、新年最初の投稿は、新しいプロジェクトをサクッと作るところを紹介します。

## テンプレート作成の事前準備

いろいろなサンプルがインターネット上で提供されており、GitHub からコードを持ってくると手軽にスタートできるのも魅力ですが、プレーンなプロジェクトがどういうものか、そこからどのように作業をしていくのが良いのか、という点を紹介する流れとなります。オンラインの記事で以下のページがありまして、それをベースに進めていきます。

- [チュートリアル: 開始テンプレートを使用する](https://doc.sitecore.com/xp/ja/developers/101/developer-tools/walkthrough--using-the-getting-started-template.html)

まず最初に、テンプレートを利用できるように以下のコマンドを管理者権限のある PowerShell のコマンドラインで実行してください。

```powershell
dotnet new install Sitecore.DevEx.Templates --nuget-source https://sitecore.myget.org/F/sc-packages/api/v3/index.json
```

実行結果は以下のようになります。

![newproject](/static/images/2023/01/newproject01.png)

実行結果が以下のようになっています。

```
テンプレート名                                         短い名前                        言語        タグ
-----------------------------------------------------  ------------------------------  ----------  --------
Sitecore Simple Container-based ASP.NET Core Solution  sitecore.aspnet.gettingstarted  [C#]        Sitecore
Sitecore Simple Container-based Next.js Solution       sitecore.nextjs.gettingstarted  JavaScript  Sitecore
```

プロジェクトのタイプとして、C# もしくは JavaScript の 2 つを選択できるようになっています。これで新規プロジェクトを作成する準備ができました。

## 新しいプロジェクトを作成する

新しいプロジェクトを作成したいと思います。任意のディレクトリに移動して（手元では `c:\projects` ）のディレクトリに移動をして、以下のコマンドを実行してください。

```powershell
dotnet new sitecore.nextjs.gettingstarted -n DockerStarter
```

実行をするとしばらくすると dotnet tool restore を実行するかどうかを聞いてきます。ここは `Y` を押して進めていきます。

![newproject](/static/images/2023/01/newproject02.png)

すると文字化けをしてしまいます。ここでは Next.js のプロジェクトを作るためのコマンドを実行するかどうか、が表示されています。参考までに英語での表示は以下の様になります。

![newproject](/static/images/2023/01/newproject03.png)

プロジェクトは別途作成をするため、ここでは `N` をタイプしてプロジェクト作成を終了させます。

## Next.js SXA のプロジェクトを作成する

今回は Next.js SXA のプロジェクトを追加していきます。Version 21 からは以下のリポジトリにテンプレートを展開しています。

- https://github.com/Sitecore/jss/tree/v21.0.0/packages/create-sitecore-jss/src/templates

プロジェクトの現状を確認するためにフォルダを見ると、src の下には何も JavaScript のプロジェクトが作成されていません。

![newproject](/static/images/2023/01/newproject04.png)

ここでバージョンを指定してテンプレートを作成するために、以下のようにコマンドを実行してください（以下の数字は GitHub のリポジトリの番号になります）。

```
npx create-sitecore-jss@21.0.0 --templates nextjs,nextjs-sxa
```

ここからは、普通に Next.js のプロジェクトの設定を入れていく形です。まずはインストール先のディレクトリの確認が表示されます。今回は、`C:\projects\DockerStarter\src\rendering` を指定します。

続いてアプリの名前の確認が表示されます。アプリの名前は、今回は `sitecoredemo-jp` とします。

CMS サーバーの名前を次に聞かれますが、 `cm.sitecoredemo.localhost` と設定します。

続いて GraphQL か REST のどちらのプロジェクトにするかを確認してきます。今回は `GraphQL` を選択します。

最後に SSG か SSR かの確認が表示されるため、`SSG` を選択します。

これでセットアップの手順が完了となります。自動的に `npm install` などが実行されます。

![newproject](/static/images/2023/01/newproject05.png)

しばらくすると以下のようにプロジェクト作成完了となります。

![newproject](/static/images/2023/01/newproject06.png)

これでプロジェクトが作成されました。

## プロジェクトの中身を確認する

作成したプロジェクトがどういう構成になっているか確認をします。まず、フォルダとしては docker フォルダ、src フォルダなどがあり、src フォルダの中には Visual Studio のプロジェクトファイルなどが作成されているのがわかります。

![newproject](/static/images/2023/01/newproject07.png)

Docker フォルダの中には、Sitecore の多くのインスタンスに関する dockerfile が準備されているのがわかります。

![newproject](/static/images/2023/01/newproject08.png)

Run フォルダの下には、XM1 や XP1 で利用する docker-compose.xml ファイルが用意されているのがわかります。

![newproject](/static/images/2023/01/newproject09.png)

このテンプレートを利用することで、XM1 に限らず Docker を利用してローカルで起動するための必要なリソースが含まれていることがわかります。

## まとめ

今回はコマンドを利用して Sitecore の Next.js に関するプロジェクトを作成しました。とはいえ起動するためにはもう少し準備が必要です。次回は XM1 の構成で起動するように必要な追加の作業を実行していきます。
