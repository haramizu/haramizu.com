---
title: Headless SXA でデモサイトを構築する - Part 8 YouTube コンポーネントを追加する（前編）
date: '2023-02-27'
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

まず最初に、YouTube のデータを取得するためにテンプレートの定義を変更します。テンプレートは `/sitecore/templates/Feature/Demo/Data Source/YouTube` を変更します。

作成したフィールドは、以下の通りです。

- videoId : YouTube のビデオの ID を指定
- thumbnail : メディアライブラリの画像を指定

![component](/static/images/2023/02/component04.png)

続いて、ファイルを作成します。以前に作成したサンプルをベースに、フィールド名などを変更して、`Youtube.tsx` を作成します。

```javascript:src\sxastarter\src\components\YouTube.tsx
import React from 'react';
import { Field, Text, ImageField, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  videoId: Field<string>;
  thumbnail: ImageField;
}
type YoutubeProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: YoutubeProps): JSX.Element => {
  return (
    <>
      <div className="youtube-container">
        <JssImage field={props?.fields?.thumbnail} />
      </div>
      <Text field={props.fields.videoId} />
    </>
  );
};
```

これでほとんど準備ができましたが、より使いやすくするために設定を追加していきます。

## アイコンの設定

コンテンツツリーやコンポーネントとしてわかりやすくするために、以下の２つのアイテムのアイコンを変更します。

- /sitecore/layout/Renderings/Feature/Demo/YouTube
- /sitecore/templates/Feature/Demo/Data Source/YouTube

アイコンは以下のパスを指定します。今回は動画になるため、ビデオカメラのアイコンを設定しました。

- office/32x32/video_camera.png

![component](/static/images/2023/02/component07.png)

## YouTube フォルダの作成

データの保存としてはアイテムに紐づく Data フォルダに作成される形と、サイト内で共有することができるフォルダに保存と２つのタイプを選択できるようにします。この為のフォルダを作成します。

## コンポーネントの登録

作成したコンポーネントを作成できるように、サイトの設定に作成したレンダリングを追加していきます。まず、`/sitecore/content/sitecoredemo-jp/sitecoredemo-jp/Presentation/Available Renderings` の下で Available Renderings を追加します。

![component](/static/images/2023/02/component05.png)

作成したレンダリング一覧に、上記で作成済みの YouTube のレンダリングを追加します。

![component](/static/images/2023/02/component06.gif)

## まとめ

まとめ
