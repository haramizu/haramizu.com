---
title: ヘッドレスサイトを追加する
date: '2023-01-16'
tags: ['Docker', 'Next.js', 'XM']
draft: false
summary: プロジェクトの作成、XM1 の環境整備、そして前回は SXA のモジュールのインストールをしました。今回はこのプロジェクトに対して、ヘッドレスのサイトを追加して、Next.js のプロジェクトと連携させていきます。手順が長くなるため、今回はヘッドレスのサイトを追加して、そのデータをいつでも再利用できるようにシリアライズができるところまで紹介をします。
images: ['/static/images/2023/01/jss06.png']
---

プロジェクトの作成、XM1 の環境整備、そして前回は SXA のモジュールのインストールをしました。今回はこのプロジェクトに対して、ヘッドレスのサイトを追加して、Next.js のプロジェクトと連携させていきます。手順が長くなるため、今回はヘッドレスのサイトを追加して、そのデータをいつでも再利用できるようにシリアライズができるところまで紹介をします。

## Headless のテナントを追加する

すでに用意されている XM のインスタンスにおいて、サイトを追加していきます。まず最初に JSS テナントを追加してください。

![jss](/static/images/2023/01/jss01.png)

ここでは `sitecoredemo-jp` とします。

![jss](/static/images/2023/01/jss02.png)

続いてテナントの中に JSS サイトを追加します。右クリックをするとサイトの追加のメニューが表示されます。

![jss](/static/images/2023/01/jss03.png)

サイトの名前に関しては `sitecoredemo-jp` とします。

![jss](/static/images/2023/01/jss04.png)

利用するモジュールはすべての機能を選択します。

![jss](/static/images/2023/01/jss05.png)

上記の手順が終了すると、以下のようにサイトが追加されます。

![jss](/static/images/2023/01/jss06.png)

## 作成したデータのシリアライズ

今回は新規サイトを作成していきましたが、日本語リソースと同様にクリーンナップしたあと改めて同じ作業をするのは手間になります。そこで、作成したデータをいつでも戻せるように、シリアライズを実行したいと思います。

ここで Sitecore CLI を利用します。プロジェクトのトップレベルで以下のコマンドを実行して、まずはコマンドラインから Sitecore に書き込みができるようにします。

```
dotnet sitecore login --cm https://cm.sitecoredemo.localhost/ --auth https://id.sitecoredemo.localhost/ --allow-write true
```

ログイン画面が表示されて、以下のようにアクセスしてよいかの確認画面が出てきます。

![jss](/static/images/2023/01/jss07.png)

ここで許可をしてください。続いて Sitecore で作成をしたアイテムを取得する前に、プロジェクトで用意をしている API キーをサイトに反映させます。コマンドを実行する前に、src 直下にある json ファイルのうち、 `src\InitItems.module.json` だけを利用するため、これ以外のファイルの拡張子を一時的に .txt に変更します。変更後、以下のコマンドで API キーをインポートします。

```
dotnet sitecore ser push
```

![jss](/static/images/2023/01/jss08.png)

実行後、コンテンツエディターで API キーがインポートされていることがわかります。

![jss](/static/images/2023/01/jss09.png)

続いて作成をしたサイトのデータをシリアライズするために、この手順の前に変更をした２つのファイルの拡張子を json に戻してください。

標準で用意されているパスとは異なる形で今回サイトを作成したため、２つのファイルのパスを調整します。下記のパスは、作成したサイト名によって異なるため、適宜 CMS に展開されているパスを参照してください。

```json:src\DockerStarter.module.json
{
    "namespace": "DockerStarter",
    "references": [ "InitItems" ],
    "items": {
        "includes": [
            {
                "name": "layouts",
                "path": "/sitecore/layout/Layouts/Project"
            },
            {
                "name": "placeholders",
                "path": "/sitecore/layout/Placeholder Settings/Project/sitecoredemo-jp"
            },
            {
                "name": "renderings",
                "path": "/sitecore/layout/Renderings/Project/sitecoredemo-jp"
            },
            {
                "name": "templates",
                "path": "/sitecore/templates/Project/sitecoredemo-jp"
            }
        ]
    }
}
```

もう一つのコンテンツに関するファイルは以下のように変更してください。

```json:src\DockerStarter-Content.module.json
{
    "namespace": "DockerStarter-Content",
    "references": [ "DockerStarter" ],
    "items": {
        "includes": [
            {
                "name": "content",
                "path": "/sitecore/content/sitecoredemo-jp"
            },
            {
                "name": "media",
                "path": "/sitecore/media library/Project/sitecoredemo-jp"
            }
        ]
    }
}
```

上記の変更が終わった後、以下のコマンドを実行します。

```
dotnet sitecore ser pull
```

![jss](/static/images/2023/01/jss10.png)

作成をしたサイトのデータがシリアライズされて、items のフォルダの下に yaml ファイルが作成されています。

![jss](/static/images/2023/01/jss11.png)

## Core データベースのアイテムを追加

上記のデータはすべて Master データベースに関してのシリアライズの処理をしていました。言語設定として日本語を追加しているため、core データベースのアイテムもシリアライズでエクスポートをしておきます。今回は `src\InitItems.module.json` のファイルに以下のように `core-language` という形で最後の項目を追加しておきました。

```json:src\src\InitItems.module.json
{
    "namespace": "InitItems",
    "items" : {
        "includes": [
            {
                "name": "content-root",
                "path": "/sitecore/content",
                "scope": "singleItem",
                "allowedPushOperations": "createAndUpdate"
            },
            {
                "name": "api-key",
                "path": "/sitecore/system/Settings/Services/API Keys/DockerStarter",
                "scope": "singleItem"
            },
            {
                "name": "core-language",
                "path": "/sitecore/system/Languages",
                "database": "core"
            }       
        ]
    }
}
```

上記の設定を実施したあと、改めてシリアライズを実行しておきます。

```
dotnet sitecore ser pull
```

## インポートのテスト

上記の作業で作成をしたシリアライズのデータを、新規の環境に対してインポートできるかどうかのテストを実施します。起動している XM1 の環境を一度落として、データをクリーンナップをしてクリーンな環境で起動をします。

```
docker-compose down
cd docker
.\clean.ps1
cd ..
docker-compose up -d
```

立ち上がったあと、コマンドラインでログインをします。すでに一度上記の手続きの時にログインをしているため、今回はシンプルに以下のコマンドだけでログインすることが可能です。

```
dotnet sitecore login
```

その後、

```
dotnet sitecore ser push
```

サイトが復元されていることを確認しました。

![jss](/static/images/2023/01/jss12.png)

## まとめ

今回は Sitcore 側にヘッドレスの Web サイトを追加しました。次回はこのサイトと Next.js のプロジェクトを連携するための手順を確認していきます。