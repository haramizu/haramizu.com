---
title: Sitecore Content Hub ONE - プロジェクトの作成 - シリアライズ
date: '2023-03-07'
tags: ['Content Hub ONE']
draft: true
summary: まずは Content Hub ONE の画面でコンテンツ形式、コンテンツの登録、メディアの登録を実施しました。これらのデータに関して手元のデータとして持つことはできるでしょうか？今回はシリアライズに関して紹介をします。
images: ['/static/images/2023/03/project09']
---

まずは Content Hub ONE の画面でコンテンツ形式、コンテンツの登録、メディアの登録を実施しました。これらのデータに関して手元のデータとして持つことはできるでしょうか？今回はシリアライズに関して紹介をします。

## Content Hub ONE CLI のインストール

まずデモのデータに関しては、シリアライズされたデータ（テキストデータ）が展開されている形です。これをサーバーに展開するために、まずはコマンドラインツールをインストールします。Windows の場合は Chocolatey を利用してインストールできます。

```
choco install Sitecore.ContentHubOne.Cli --source https://nuget.sitecore.com/resources/v2/
```

また macOS の場合は以下の様にインストールができます。

```
brew tap sitecore/content-hub
brew install ch-one-cli
```

![project](/static/images/2023/03/project01.png)

Windows や Docker を利用する場合の手順は以下に記載されています。

- [Install and run the Content Hub ONE CLI](https://doc.sitecore.com/ch-one/en/developers/content-hub-one/content-hub-one-cli--install-and-run-the-cli.html)

## Content Hub One に接続する

今回はプロジェクトのフォルダ名を Sitecore.CHONE とします。このフォルダに移動をして、以下のコマンドを実行してシリアライズを実行する際のフォルダとします。

```
ch-one-cli serialization initialize -f serialization
```

実行をすると、必要なファイルが展開されます。

![project](/static/images/2023/03/project02.png)

作成したフォルダに移動をして、以下のコマンドを実行します。

```
ch-one-cli tenant add --organization-id <Organization ID> --tenant-id <Tenant ID>  --client-id <Device: OAuth client ID>
```

上記の ID は以下の手順で確認できます。まず、 `Organization ID` と `Tenant ID` はログインしているアイコンをクリックすると利用している組織名が表示されます。

![project](/static/images/2023/03/project03.png)

この組織名をクリックすると以下のダイアログが表示されます。

![project](/static/images/2023/03/project04.png)

続いて `Device: OAuth client ID` の項目ですが、Content Hub ONE の管理画面の Settings から OAuth Client の項目を選択すると以下の画面になります。

![project](/static/images/2023/03/project05.png)

これで３つの値を取得することができます。コマンドを実行すると、一度ブラウザが開きます。

![project](/static/images/2023/03/project06.png)

実行したあと接続できた画面は以下の通りとなります。

![project](/static/images/2023/03/project07.png)

これで接続できました。

## シリアライズの実行

まず最初にコンテンツ形式に関して１つだけシリアライズをしたい、ということで blog のデータを取るために id を入れて実行します。

```
ch-one-cli serialization pull content-type --id "blog"
```

以下のようにシライライズされるのを確認することができました。

![project](/static/images/2023/03/project08.png)

この id の項目は省略することができます。その際には Content Hub ONE で登録されているコンテンツ形式を取得することができます。

```
ch-one-cli serialization pull content-type
```

![project](/static/images/2023/03/project09.png)

続いてコンテンツのデータをシリアライズしていきます。アイテムの場合は必ずコンテンツ形式を記載する必要があります。

```
ch-one-cli serialization pull content-item -c product
```
