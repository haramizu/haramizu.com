---
title: Headless SXA でデモサイトを構築する - Part 8 YouTube コンポーネントを追加する（前編）
date: '2023-02-16'
tags: ['XM Cloud', 'XM', 'Headless SXA']
draft: false
summary: 標準のコンポーネントだけではできることが限られてきます。そこで、新しいコンポーネントをサイトに追加していきます。今回はウィザードを利用して少し手間を省きます。
images: ['/static/images/2023/02/component03.png']
---

標準のコンポーネントだけではできることが限られてきます。そこで、新しいコンポーネントをサイトに追加していきます。今回はウィザードを利用して少し手間を省きます。

- [Headless SXA - 新規コンポーネントの追加](/blog/2022/12/16/headless-sxa-new-component)

## フォルダを作成する

ウィザードで作成する設定を保存する場所を用意するために、関連リソースの場所にフォルダを作成していきます。今回は `Demo` というフォルダを以下のパスの配下に作成していきます。

- /sitecore/layout/Renderings/Feature
- /sitecore/system/Settings/Feature
- /sitecore/templates/Branches/Feature
- /sitecore/templates/Feature

![component](/static/images/2023/02/component01.png)

これで Demo のコンポーネントのファイルを展開する場所ができました。

## ウィザードの起動と作成

まずレンダリングに作成をしたフォルダに対して、右クリックをしてメニューを表示します。そして Insert の一番上に `Component` というメニューがあります。これがウィザードになります。

![component](/static/images/2023/02/component02.png)

クリックをするとダイアログが表示されます。今回は `YouTube` というコンポーネントを作成していきます。

![component](/static/images/2023/02/component03.png)

データソースのタブに切り替えて、`Rendering template` は以下のアイテムを設定をしてください。

- /sitecore/templates/Foundation/JavaScript Services/Json Rendering

今回はこの形でウィザードを終了させます。すると以下のアイテムが作成されているのがわかります。

- /sitecore/layout/Renderings/Feature/Demo/YouTube
- /sitecore/system/Settings/Feature/Demo/Demo Site Setup
- /sitecore/templates/Branches/Feature/Demo/Available Renderings
- /sitecore/templates/Feature/Demo/Data Source/YouTube
- /sitecore/templates/Feature/Demo/Rendering Parameters/YouTube

今後はこの Demo フォルダに展開していきたいと思いますので、上記のファイルをシリアライズできるように既存の定義ファイルに以下のコードを追加しておきます。

```yaml:src\SitecoreDemo.module.json
            {
                "name": "renderings-demo",
                "path": "/sitecore/layout/Renderings/Feature/Demo"
            },
            {
                "name": "settings-demo",
                "path": "/sitecore/system/Settings/Feature/Demo"
            },
            {
                "name": "branchs-demo",
                "path": "/sitecore/templates/Branches/Feature/Demo"
            },
            {
                "name": "templates-demo",
                "path": "/sitecore/templates/Feature/Demo"
            },
```

これで基本的なコンポーネントを展開するためのアイテムの準備ができました。

## サンプルコードの適用

純粋なサンプルコードを入れる

## コンポーネントの登録

コンポーネントを表示できる様にする

## まとめ

まとめ
