---
title: Headless SXA でデモサイトを構築する - Part 10 YouTube コンポーネントを追加する（後編）
date: '2023-03-14'
tags: ['XM Cloud', 'XM', 'Headless SXA']
draft: true
summary: 前回は新しいコンポーネントを追加するところまで作成しました。今回は、コンポーネントにコードを追加して、YouTube の動画を扱うことができるコンポーネントに仕上げていきます。
images: ['/static/images/2023/02/component03.png']
---

前回は新しいコンポーネントを追加するところまで作成しました。今回は、コンポーネントにコードを追加して、YouTube の動画を扱うことができるコンポーネントに仕上げていきます。

## コンテンツの準備をする

前回作成をしたアイテムに対して、`videoId` と thumbnail を設定します。videoId は YouTube の動画に個別に設定される ID で、URL などにも表示されています。その動画の YouTube のサムネイルを取得する方法としては、以下の URL でも取得することができます（以下の videoId の部分を変更してください）。

- https://img.youtube.com/vi/videoId/0.jpg

出来上がったアイテムは以下のようになります。

## YouTube コンポーネントの変更

前回のコードを以下のように書き換えます。一度画像は使わない形に変更しています。

```javascript:src\sxastarter\src\components\YouTube.tsx
import React from 'react';
import { Field, Text, ImageField, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  videoId: Field<string>;
  thumbnail: ImageField;
}
type YoutubeProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: YoutubeProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  if (props.fields) {
    if (sitecoreContext.pageState == 'edit') {
      return (
        <>
          <iframe
            src={
              'https://www.youtube.com/embed/' + props.fields.videoId.value + '?modestbranding=1'
            }
            width="480px"
            height="360px"
          />
          <Text field={props.fields.videoId} />
        </>
      );
    } else {
      return (
        <>
          <iframe
            src={
              'https://www.youtube.com/embed/' + props.fields.videoId.value + '?modestbranding=1'
            }
            width="480px"
            height="360px"
          />
        </>
      );
    }
  }
};
```

上記のコードで、`sitecoreContext.pageState` というのを利用しています。これは編集モードとプレビューモードで変更をしたい際に使える便利な機能です。YouTube の URL をみたまま編集の画面で変更をしたいが、ページには表示したくない、というような時にこの仕組みを利用することで簡単に制御することができます。

## コンポーネントを配置する

作成をしたコンポーネントを配置していきます。手順は以下の通りで進めていきます。

1. Column Splitter をトップページの画像の上に配置します
2. 左側の項目に YouTube のコンポーネントを配置します
3. すでに用意したアイテムを指定します
4. 表示をする際には中央寄せで表示するように指定します

以下のような手順になります。

![component](/static/images/2023/02/component14.gif)
