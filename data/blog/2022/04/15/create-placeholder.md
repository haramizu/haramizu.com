---
title: プレースホルダーの作成
date: '2022-04-15'
tags: ['Next.js', 'Headless']
draft: true
summary: Sitecore でレイアウトのエリアに関して、名前をつける機能をプレースホルダーという形で定義することができます。これを利用することで、プレースホルダーに配置することができるコンポーネントの制限をしたり、プレースホルダーを階層化して管理することができるようになります。今回はこのプレースホルダーの考え方、そして作り方を紹介していきます。
images: ['/static/images/2022/04/placeholder09.gif']
---

Sitecore でレイアウトのエリアに関して、名前をつける機能をプレースホルダーという形で定義することができます。これを利用することで、プレースホルダーに配置することができるコンポーネントの制限をしたり、プレースホルダーを階層化して管理することができるようになります。今回はこのプレースホルダーの考え方、そして作り方を紹介していきます。

## プレースホルダーとは？

すでに最初の文章で説明をしていますが、プレースホルダーはコンポーネントを配置する場所を定義するための機能となります。これまでのサンプルでは、`jss-main` というプレースホルダーに対して、作成をしたコンポーネントを配置する形としていました。

![placeholder](/static/images/2022/04/placeholder01.png)

例えば Sitecore の Web サイトのエリアに名前をつけていくような場合、以下画像がイメージになるかと思います。ヘッダーエリア、メインのエリアに対してもバナーエリアやトピックのエリアを用意するというような形です。

![placeholder](/static/images/2022/04/placeholder02.png)

もちろん複数のエリアに対して利用可能なコンポーネントを作ることもできます。

## プレースホルダーの設定

Next.js のプロジェクトにて、Placeholder の設定を以下のように記載することができます。設定項目に関して２つの視点で紹介をします。

### コードファーストで実装している場合

設定ファイル `package.json` の config の中に rootPlaceholders という設定項目があります。以下はサンプルのデータとなります。

```json
{
  "name": "sitecoredemo-jp",
  "description": "Application utilizing Sitecore JavaScript Services and Next.js",
  "version": "19.0.2",
  "private": true,
  "config": {
    "appName": "sitecoredemo-jp",
    "rootPlaceholders": [
      "jss-main"
    ],
    "sitecoreConfigPath": "/App_Config/Include/zzz",
    "graphQLEndpointPath": "/sitecore/api/graph/edge",
    "language": "en"
  },
```

ルートレベルで利用する placeholder を追加したい場合は、この項目に追加してください。

また、各 Placeholder の設定としては、`sitecore/definitions/placeholders.sitecore.ts` に記載することができるようになっています。サンプルでは以下のような記載となっています（コメントは削除しています）。

```javascript:sitecore/definitions/placeholders.sitecore.ts
import { Manifest } from '@sitecore-jss/sitecore-jss-manifest';

export default function addPlaceholdersToManifest(manifest: Manifest): void {
  manifest.addPlaceholder(
    { name: 'jss-main', displayName: 'Main' },
    { name: 'jss-tabs', displayName: 'Tabs', id: 'tabs-placeholder' }
  );
}
```

name はアイテムの名前を、displayName で表示名を指定することができるようになっています。

上記のファイルに記載をしておくことで、インポートをする際にテンプレートに関するアイテムが作成される形です。

### Sitecore ファーストの場合

Sitecore は Placeholder の設定に関しては `/sitecore/layout/Placeholder Settings` の配下に設定をします。これまで紹介をしていたコンポーネントシリーズですと、 `/sitecore/layout/Placeholder Settings/Project/sitecoredemo-jp` の下に `jss-main` というアイテムが作成されており、関連づけられたレンダリングが用意されています。

![placeholder](/static/images/2022/04/placeholder01.png)

## Placeholder の追加

ここからは Sitecore ファーストの環境での設定を進めていきます。時間がある時に、コードファーストの際の記述方法は別途紹介できればと考えています。

### レイアウトの設定

Placeholder をページのどの場所で利用できるようにするのか、という定義は `layout.tsx` のファイルで定義しています。サンプルコードとしては以下のコードが標準で実装されているものとなります。

```javascript:src/Layout.tsx
      <div className="container">
        <Placeholder name="jss-main" rendering={route} />
      </div>
```

この部分を以下のように書き換えます。

```javascript:src/Layout.tsx
      <div className="container">
        <Placeholder name="jss-header" rendering={route} />
      </div>
      <div className="container">
        <Placeholder name="jss-main" rendering={route} />
      </div>
      <div className="container">
        <Placeholder name="jss-footer" rendering={route} />
      </div>
```

このコードを環境に反映させます。

### Sitecore にプレースホルダーを作成する

Placeholder の名前に合わせてたアイテムを、Sitecore のプレースホルダーの設定の下に作成をします。今回は表示名をわかりやすくするために、`Headler` および `Footer` という名前を付けておきました。また利用できるコンポーネントも併せて設定をしています。

![placeholder](/static/images/2022/04/placeholder03.png)

![placeholder](/static/images/2022/04/placeholder04.png)

今回はこれまで作成をしてきた簡単なコンポーネントを配置できるようにしたいと思います。そこで Main は少し減らしました。

![placeholder](/static/images/2022/04/placeholder05.png)

### レイアウトで利用できるプレースホルダーの設定

今回のサンプルが利用しているレイアウトは、`/sitecore/layout/Layouts/Project/sitecoredemo-jp/sitecoredemo-jp Layout` のアイテムになります。このレイアウトで利用できるプレースホルダーとして、Header および Footer を追加してください。

![placeholder](/static/images/2022/04/placeholder06.png)

## 検証

上記の設定が全て完了している状況で編集画面に移動をすると、以下のようにヘッダーエリア、フッターエリアが追加されています。

![placeholder](/static/images/2022/04/placeholder07.png)

![placeholder](/static/images/2022/04/placeholder08.png)

ヘッダーエリアに対して利用できるコンポーネントは以下のように指定しています。

![placeholder](/static/images/2022/04/placeholder03.png)

利用できないコンポーネントを指定した場合、配置できないと言うアイコンがされます。またテキストのコンポーネントを配置して、アイテムを指定するとコンポーネントの配置することが可能です。以下のアニメーション画像をご覧ください。

![placeholder](/static/images/2022/04/placeholder09.gif)

プレースホルダーの追加の手順、および紐付けされているコントロールを配置する際の動きを検証しました。

## まとめ

ページのワイヤーフレームを考えていく上で、エリアを設定していきますが、それぞれのエリアの名前をプレースホルダーとして設定し、そこに配置できるコンポーネントを決めることで、サイトのデザインに関して統一性を持たせることができるようになります。今回は、ページデザインを決めていく上で便利な機能、プレースホルダーに関して紹介をしました。
