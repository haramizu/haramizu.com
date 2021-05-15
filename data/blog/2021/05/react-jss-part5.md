---
title: Sitecore JSS - React SDK を利用してサンプルサイトを構築 - Part.5
date: '2021-06-01'
tags: ['JSS', 'React', 'Carousel']
summary: 前回の記事では、新しいコンポーネントを追加しました。今回から数回に分けて、カルーセルのコンポーネントを作成していきます。ということで、今回はカルーセルで回す基本的なアイテムのコンポーネントを作成したいと思います。
draft: true
---

前回の記事では、新しいコンポーネントを追加しました。今回から数回に分けて、カルーセルのコンポーネントを作成していきます。ということで、今回はカルーセルで回す基本的なアイテムのコンポーネントを作成したいと思います。

# カルーセルアイテムの作成

今回は、カルーセルのアイテムを作成していきます。最初に、scaffold のコマンドを利用してアイテムを作成します。


```
jss scaffold CarouselSlide
```

![CarouselItem](/static/images/2021/05/CarouselItem01.png "CarouselItem")


コマンドを実行すると、以下の２つのファイルが生成されます。

```
sitecore/definitions/components/CarouselSlide.sitecore.js
src/components/CarouselSlide/index.js
```

## CarouselSlide のフィールドを変更

まず最初に、フィールドを追加します。対象となるファイルは以下のファイルです。

* /sitecore/definitions/components/CarouselSlide.sitecore.js

コードを今回は以下のように設定しました。

```JavaScript
    fields: [
      { name: 'src', type: CommonFieldTypes.SingleLineText },
      { name: 'altText', type: CommonFieldTypes.SingleLineText },
      { name: 'caption', type: CommonFieldTypes.SingleLineText },
    ],
```

## CarouselSlide の表示を変更する

続いてフィールドで利用されるデータを利用して、表示する部分を以下のように更新をします。

* src/components/CarouselSlide/index.js

```JavaScript
import React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react';

const CarouselSlide = (props) => (
  <div>
    <img src={props.fields.src.value} alt={props.fields.altText.value} />
    <Text tag="p" field={props.fields.caption} />
  </div>
);

export default CarouselSlide;
```

## コンテンツアイテムの変更

作成したコンポーネントが正しく動作するかどうかの確認のために、ja-JP.yml ファイルを更新します。

* data/routes/ja-JP.yml

今回は jss-main の placeholder の中にそのままアイテムを設定します。

```yaml
  jss-main:
    - componentName: CarouselSlide
      fields:
        src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
        altText: 'Slide 1'
        caption: 'Caption1'
    - componentName: ContentBlock
      fields:
```

#　実行する

上記の変更が完了しているのを確認して、手元で実行をしてください。

```
jss start
```

実行結果は以下のようになります。

![CarouselItem](/static/images/2021/05/CarouselItem02.png "CarouselItem")

今回はカルーセルで利用する画像の部分を Text で引っ張ってきていますが、これは後々変更するので気にしないでください。

# まとめ

作成したコンポーネントで管理する項目を増やして表示する部分を紹介しました。フィールドを追加するのは、Sitecore で管理項目を設定する定義となりますので、どのデータをコンテンツ管理をするのか、を決めてフィールドを決めていく形となります。

