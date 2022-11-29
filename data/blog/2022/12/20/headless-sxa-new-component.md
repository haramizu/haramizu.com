---
title: Headless SXA - 新規コンポーネントの追加
date: '2022-12-20'
tags: ['XM Cloud', 'XM', 'Headless SXA']
draft: true
summary: 前回は既存のコンポーネントの表示形式を増やすだけでしたが、今回は新しいコンポーネントを作成します。これにより、各企業で求めているデータ構造に対してのレイアウト作成という形で、Sitecore でデータ形式の定義をして、見た目の部分を実装するという部分のイメージが湧くかと思います。
images: ['/static/images/2022/12/newcomponent13.png']
---

前回は既存のコンポーネントの表示形式を増やすだけでしたが、今回は新しいコンポーネントを作成します。これにより、各企業で求めているデータ構造に対してのレイアウト作成という形で、Sitecore でデータ形式の定義をして、見た目の部分を実装するという部分のイメージが湧くかと思います。

## レンダリングアイテムの作成

まず最初に、コンポーネントの定義としてレンダリングアイテムを作成します。`/sitecore/layout/Renderings/Feature` のフォルダの中に `Custom` というフォルダを追加します。上記のフォルダを作ったあと、フォルダを右クリックをして `Json Rendering` を追加してください。

![New Component](/static/images/2022/12/newcomponent01.png)

今回は `QandA` という Json Rendering のアイテムを作成します。

![New Component](/static/images/2022/12/newcomponent02.png)

## テンプレートの作成

続いてこのレンダリングアイテムで利用するテンプレートを作成します。`/sitecore/templates/Feature/` の下に、 `Custom` というフォルダを作成して、その下に `QandA` というテンプレートを作成します。このアイテムには、`Question` と `Answer` のテキストフィールドを追加します。また、Configure のメニューから Icon を選択、`office/32x32/book2.png` のアイテムを設定します。以下の項目が最初の仕上がりです。

![New Component](/static/images/2022/12/newcomponent03.png)

このアイテムの `Content` のタブを開き、ベーステンプレートとして、以下のテンプレートを追加してください。

- /sitecore/templates/Foundation/Experience Accelerator/StandardValues/\_PerSiteStandardValues

![New Component](/static/images/2022/12/newcomponent04.png)

これでベースとなるアイテムの作成ができました。続いて QandA のアイテムを保存するためのフォルダアイテムを作成します。`QandA Folder` という形でアイテムを作成します。

![New Component](/static/images/2022/12/newcomponent05.png)

作成したアイテムのベーステンプレートを削除します。

![New Component](/static/images/2022/12/newcomponent06.png)

続いて Standard Value を作成して、Configure のメニューから挿入オプションの `Assign` をクリックしてください。ここで、すでに作成していた `QandA` と `QandA folder` の２つを設定します。

![New Component](/static/images/2022/12/newcomponent07.png)

アイコンに関してはこちらには `office/32x32/books.png` を設定しました。

続いて `Rendering Parameters` のフォルダを `Custom` の下に作成をします。また、その下にアイテムとして `QandA` というアイテムを作成します。このアイテムのベーステンプレートを以下の４つとしてください。

- /sitecore/templates/Foundation/JSS Experience Accelerator/Presentation/Rendering Parameters/BaseRenderingParameters
- /sitecore/templates/Foundation/Experience Accelerator/Dynamic Placeholders/Rendering Parameters/IDynamicPlaceholder
- /sitecore/templates/Foundation/Experience Accelerator/StandardValues/\_PerSiteStandardValues
- /sitecore/templates/Foundation/Experience Accelerator/Markup Decorator/Rendering Parameters/IRenderingId

アイコンなども設定したあとのアイテムは以下のように完成します。

![New Component](/static/images/2022/12/newcomponent08.png)

## レンダリングアイテムの設定

すでに作成済みのアイテムに、作成をしたテンプレートを設定していきます。まず、Datasource Location に関しては以下のコードを挿入します。

```
query:$site/*[@@name='Data']/*[@@name='QandA']|query:$sharedSites/*[@@name='Data']/*[@@name='QandA']
```

続いて Datasouce Template に関しては、`/sitecore/templates/Feature/Custom/QandA` を設定します。

## レンダリングに関して追加する

ここから先は、利用するサイトのセッっていをしていくため、前提としては `/sitecore/content/tenant/site/` の配下の設定を進めていきます。

まず `Presentaion` の `Available Renderings` を右クリックして、`Available Renderings` のアイテムを作成します。

![New Component](/static/images/2022/12/newcomponent09.png)

今回は Custom というアイテムとしました。また、この Custom のアイテムに対して、今回作成をしている QandA のテンプレートを入れておきます。

![New Component](/static/images/2022/12/newcomponent10.png)

続いて Data フォルダの下に、QandA の共有アイテムとして管理できるように、フォルダを作成します。ここは、あらかじめ作成した `QandA Folder` のアイテムを指定して、フォルダ名を `QandA` とします。

![New Component](/static/images/2022/12/newcomponent11.png)

最後に Presentation の下の `Headless Variants` のところで、QandA を作成し、Variant として Default を作成しておきます。

## JavaScript コンポーネントファイルの作成

コンポーネントファイルを作成するにあたって、すでに設定をしているレンダリングアイテムの中の Component Name に記載されている名前を確認します。

![New Component](/static/images/2022/12/newcomponent12.png)

コンポーネントの名前に合わせた、JavaScript ファイルを作成して、次のコードを入れてください。コードは以下の通りです。

```javascript:
import React from 'react';
import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Question: Field<string>;
  Answer: Field<string>;
}
type QandAProps = {
  params: { [key: string]: string };

  fields: Fields;
};

export const Default = (props: QandAProps): JSX.Element => {
  return (
    <div className={`component myrendering ${props.params.styles}`}>
      <div className="component-content">
        <div>
          <strong>質問：</strong>
          <Text field={props.fields.Question} />
        </div>
        <div>
          <strong>回答：</strong>
          <Text field={props.fields.Answer} />
        </div>
      </div>
    </div>
  );
};
```

これで新しいコンポーネントを作成することができました。

## 動作確認

エクスペリエンスエディタを開くと、QandA のアイテムが Custom グループの中に作成されていることがわかります。

![New Component](/static/images/2022/12/newcomponent13.png)

これをドラッグ & ドロップで配置します。

![New Component](/static/images/2022/12/newcomponent14.gif)

## エクスポートの追加

最後に、レンダリングやテンプレートなどを作成したため、これらのアイテムを対象としてシリアライズの設定を追加します。以下の include の定義を既存の `SitecoreDemo.module.json` のファイルに追加してください。

```json:src\SitecoreDemo.module.json
            {
                "name": "customrendering",
                "path": "/sitecore/layout/Renderings/Feature/Custom"
            },
            {
                "name": "customtemplate",
                "path": "/sitecore/templates/Feature/Custom"
            }
```

これで準備が整いました。シリアライズするために以下のコマンドを実行していきます。

```
dotnet sitecore login
dotnet sitecore ser pull
```

作成したアイテムが無事シリアライズされて、コードベースの落とし込むことができました。

## まとめ

今回は Headless SXA のコンポーネントの作り方を Step by Step 的に紹介をしました。実際には既存のアイテムをコピーして作業をするなど効率化はできるような形です。まず、簡単なコンポーネントを１つ追加しまいた。

## 参考ページ

- [Walkthrough: Building a simple rendering](https://doc.sitecore.com/xmc/en/developers/xm-cloud/walkthrough--building-a-simple-rendering.html)
