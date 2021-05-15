---
title: Sitecore JSS - React SDK を利用してサンプルサイトを構築 - Part.6
date: '2021-06-02'
tags: ['JSS', 'React', 'Carousel']
draft: true
summary: 前回はカルーセルを作成する前に、カルーセルのアイテムを管理をするためのコンポーネントを作成しました。今回は、カルーセルのコンポーネントとなるコンテナーを作成して、前回作成したコンポーネントを子アイテムとして読み込む手順を紹介します。
---

[前回](2021-05-07-react-jss-part5.md) はカルーセルを作成する前に、カルーセルのアイテムを管理をするためのコンポーネントを作成しました。今回は、カルーセルのコンポーネントとなるコンテナーを作成して、前回作成したコンポーネントを子アイテムとして読み込む手順を紹介します。

## CarouselContainer の作成

まず最初に、Carousel が動作するコンテナを作成していきます。

```
jss scaffold CarouselContainer
```

![carousel](/static/images/2021/05/carousel01.png "carousel")

### 表示テストの実施

作成したコンポーネントが正しく動作するかを確認するために、 ja-jp.xml にコンポーネントを追記します。

```yaml
  jss-main:
    - componentName: CarouselContainer
      fields:
        heading: カルーセルコンテナー
    - componentName: CarouselItem
      fields:
```

実行すると、以下のようにアイテムが表示されます。

![carousel](/static/images/2021/05/carousel02.png "carousel")

## placeholder の追加

まず最初にコンポーネントが利用するアイテムを表示する Placeholder を追加します。対象となるファイルは以下の通りです。

* sitecore/definitions/components/CarouselContainer.sitecore.js

フィールドを削除して、以下のように定義しました。

```JavaScript
export default function(manifest) {
  manifest.addComponent({
    name: 'CarouselContainer',
    icon: SitecoreIcon.DocumentTag,
    placeholders: ['jss-carousel-item']
  });
}
```

次は以下のファイルに Placeholder を利用するための記述を追加します。

* src/components/CarouselContainer/index.js

最初の import の項目に、**withPlaceholder** を追加して、placeholder の下のアイテムを参照する形とします。全体的に、以下のように書き換えてください。

```JavaScript
import React from 'react';
import { Text, withPlaceholder } from '@sitecore-jss/sitecore-jss-react';

class CarouselContainer extends React.Component {
  render() {
    const { slides } = this.props;
    return (
      <div>
        <p>CarouselContainer Component</p>
        {slides}
      </div>
    );
  }
}

export default withPlaceholder({ placeholder: 'jss-carousel-item', prop: 'slides' })(
  CarouselContainer
);
```

placeholder を追加したので、コンテンツアイテムのファイルを以下のように書き換えます。

```yaml
placeholders:
  jss-main:
    - componentName: CarouselContainer
      placeholders:
        jss-carousel-item:
          - componentName: CarouselItem
            fields:
              src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
              altText: 'Slide 1'
              caption: 'Caption1'
    - componentName: ContentBlock
      fields:
        heading: ようこそ Sitecore JSS
```

 ## 動作確認

 上記のコードを利用して、以下のような手順で動作確認をしていきます。

 現状を確かめるために、普通に起動をします。

```
jss start
```

起動した画面は、前回とあまり変わりませんが、コンテナーに持たせていた文字列を placeholder のみとしたため、その文字が消えています。

![carousel](/static/images/2021/05/carousel03.png "carousel")

続いて、placeholder の文字列を変更したいと思います。**jss-carousel-items**と変更して、再度読み込みをするとスライドが表示されない状態となります。

![carousel](/static/images/2021/05/carousel04.png "carousel")

placeholder の設定を戻して、次は３つのアイテムを並べます。

```yaml
    - componentName: CarouselContainer
      placeholders:
        jss-carousel-item:
          - componentName: CarouselItem
            fields:
              src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
              altText: 'Slide 1'
              caption: 'Caption1'
          - componentName: CarouselItem
            fields:
              src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
              altText: 'Slide 2'
              caption: 'Caption 2'
          - componentName: CarouselItem
            fields:
              src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
              altText: 'Slide 3'
              caption: 'Caption 3'
```

この状態で再度読み込みをすると、３つのアイテムの読み込みに成功しています。

![carousel](/static/images/2021/05/carousel05.png "carousel")

### まとめ

上記のように、placeholder を設定して、その中にあるアイテムを呼び出しして表示することができました。次回はこれを利用してカルーセルに仕上げていきます。

