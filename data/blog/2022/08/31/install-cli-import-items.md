---
title: Sitecore CLI を利用してアイテムのインポート
date: '2022-08-31'
tags: ['Headless', 'Next.js']
draft: true
summary: 前回は Next.js のテンプレートをプロジェクトに追加しましたが、この段階では Sitecore には何もデータが無いためエラーとなります。そこで、Sitecore CLI を利用して、サンプルデータをインポートしたいと思います。
images: ['/static/images/2022/08/cli06.png']
---

前回は Next.js のテンプレートをプロジェクトに追加しましたが、この段階では Sitecore には何もデータが無いためエラーとなります。そこで、Sitecore CLI を利用して、サンプルデータをインポートしたいと思います。

## Sitecore CLI のインストール

データをインポートするためのツールに関して、今回は Sitecore CLI を利用します。インストールに関する手順は以下のブログですでに紹介をしています。

- [Sitecore CLI のインストール](/blog/2022/05/18/install-sitecore-cli)

今回はプロジェクトのトップでコマンドを実行していきます。

```
dotnet new tool-manifest
dotnet nuget add source -n Sitecore https://sitecore.myget.org/F/sc-packages/api/v3/index.json
dotnet tool install Sitecore.CLI
```

これでインストールは完了となります。

![cli](/static/images/2022/08/cli01.png)

## 初期設定

Sitecore CLI を利用するにあたっての初期化を実行します。

```
dotnet sitecore init
```

続いてリストを確認すると、必要なプラグインがインストールされます。

```
dotnet sitecore plugin list
```

![cli](/static/images/2022/08/cli02.png)

これで一通り設定が完了となりますが、以下のファイルに関しては GitHub のリポジトリにコピーされないように、.gitignore に設定を追加してください。

```.gitignore
# may contain OAuth secrets, do not commit
.sitecore/user.json

# NuGet cache for Sitecore CLI
.sitecore/package-cache/
```


## アイテムを準備する

インポートをするアイテムですが、以下の GitHub のリポジトリから入手することができます。

- https://github.com/SitecoreJapan/Sitecoredemo.Docker

対象のファイルは以下の通りです。

- src/*.json ファイル
- src/items フォルダ

上記２つに関して、同じ階層にファイルをコピーしてください。コピーをした後のファイルは以下のようになります。

![cli](/static/images/2022/08/cli03.png)

## Sitecore にインポートをする

