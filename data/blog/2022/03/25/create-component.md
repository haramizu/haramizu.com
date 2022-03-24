---
title: コンポーネントの作成
date: '2022-03-25'
tags: ['Next.js', 'Headless']
draft: false
summary: Sitecore と連携している環境の準備ができていれば、コンポーネントの追加に関しての手順は非常に簡単なものです。今回は、jss scaffold のコマンドを利用することなく、コンポーネントを追加することで、どういう形でコンポーネントを管理しているのか、を確認します。
images: ['/static/images/2022/03/component06.gif']
---

Sitecore と連携している環境の準備ができていれば、コンポーネントの追加に関しての手順は非常に簡単なものです。今回は、jss scaffold のコマンドを利用することなく、コンポーネントを追加することで、どういう形でコンポーネントを管理しているのか、を確認します。

## コンポーネントファイルの追加

まず手元でコンポーネントのファイルをプロジェクトに追加します。コンポーネント自体は階層化して管理したほうがわかりやすいため、今回はコンポーネントの階層化に関しても一緒に進めていきます。

まず最初に、src/components の下に `Demo` のフォルダを作成します。作成をするファイルは ` LayoutContextData.tsx` とし、コードは以下の通りです。

```javascript:src/components/Demo/LayoutContextData.tsx
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

const LayoutContextData = (): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  return (
    <div>
      <h2>レイアウト データ</h2>
      <pre style={{ maxHeight: '400px', overflow: 'scroll' }}>
        {JSON.stringify(sitecoreContext, null, 2)}
      </pre>
    </div>
  );
};

export default LayoutContextData;
```

このファイルを追加した後、GitHub に展開をします。

## Sitecore にレンダリングを追加する

上記のファイルを Sitecore で管理するためのレンダリングを作成します。今回は Demo のフォルダの下に作成をしたので、 `/sitecore/layout/Renderings/Project/sitecoredemo-jp` の下に `Demo` のフォルダを作成します。

![component](/static/images/2022/03/component01.png)

demo のフォルダの下に、Json Rendering のアイテムを作成します。

![component](/static/images/2022/03/component02.png)

作成をするアイテム名は先ほど作成をしたコンポーネントの名前と同じものとします。

![component](/static/images/2022/03/component03.png)

これで作成をしたコンポーネントと Sitecore で扱うレンダリングの定義のリンクが出来ました。

## プレースホルダーで利用できるように指定する

続いて Horizon Editor で編集をしてコンポーネントを指定するために、プレースホルダーの設定を変更します。今の所、プレースホルダーとしては `jss-main` のみとなっているため、対象となるアイテムは以下の通りです。

```
/sitecore/layout/Placeholder Settings/Project/sitecoredemo-jp/jss-main
```

関連付けられたコントロールの項目に、作成をしたレンダリングを追加します。

![component](/static/images/2022/03/component04.png)

これで編集ツールでレンダリングの指定ができるようになりました。

## ページにコンポーネントを追加する

編集ツールとして今回は Horizon Editor を起動します。立ち上げると左側にコンテンツツリーが表示されており、トップページが指定されている形です。この左側の項目をコンポーネント一覧の画面に切り替えると Demo のグループが表示されます。ここから、コンポーネントをドラッグ & ドロップで配置すると、今回作成をしたコンポーネントを配置することができました。

![component](/static/images/2022/03/component0g.gif)

## まとめ

以前の記事で、jss scaffold を利用してコンポーネントを追加する手順を紹介しました。その際には、Sitecore のアイテムの定義、その定義を利用したコンポーネントの作成という手順になっていましたが、今回のようにシンプルなコンポーネントであればファイルを作成、レンダリングと連携する形で作ることができます。
