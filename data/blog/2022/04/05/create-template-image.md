---
title: テンプレートの作成とデータタイプの設定 - 画像編
date: '2022-04-05'
tags: ['Next.js', 'Headless']
draft: true
summary: 前回はテキストに関するフィールド形式を利用して、テンプレートを作成しました。今回は画像を指定できるコンポーネントを作成していきます。
images: ['/static/images/2022/04/template18.gif']
---

前回はテキストに関するフィールド形式を利用して、テンプレートを作成しました。今回は画像を指定できるコンポーネントを作成していきます。

## 画像コンポーネントの作成

今回は画像のコンポーネントを作成して、ページに画像を表示します。また単に表示するだけではなく、ページで編集することができるようにします。

### コンポーネントの作成

まず最初に、以下のコードを実行して `Data/ImageSample` の定義ファイル２つを準備します。

```
jss scaffold Data/ImageSample
```

![template](/static/images/2022/04/template11.png)

これにより、以下のファイルが２つ作成されます。

- sitecore/definitions/components/Data/ImageSample.sitecore.ts
- src/components/Data/ImageSample.tsx

１つ目のファイルはテンプレートを構成するフィールドのタイプを定義することができます。以下のファイルにコードを追加します。

```javascript:sitecore/definitions/components/Data/ImageSample.sitecore.ts
export default function ImageSample(manifest: Manifest): void {
  manifest.addComponent({
    name: 'ImageSample',
    icon: SitecoreIcon.DocumentTag,
    fields: [{ name: 'image1', type: CommonFieldTypes.Image }],
  });
}
```

続いてこの項目をページのアイテムとして表示するように、レイアウトファイルとなる以下のファイルを編集します。import に ImageField が追加されている点、Image タグを利用してデータを表示しようとしているのがわかります。

```javascript:src/components/Data/ImageSample.tsx
import { ImageField, Image, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideComponentProps } from 'lib/component-props';

type ImageSampleProps = StyleguideComponentProps & {
  fields: {
    image1: ImageField;
  };
};

const ImageSample = (props: ImageSampleProps): JSX.Element => (
  <div>
    <p>ImageSample コンポーネント</p>
    <Image media={props.fields.image1} />
  </div>
);

export default withDatasourceCheck()<ImageSampleProps>(ImageSample);
```

### Sitecore にテンプレートを作成する

続いてテンプレートを作成します。今回は画像のフィールドを１つだけ持つシンプルなものを用意します。

![template](/static/images/2022/04/template12.png)

### データ保存のためのフォルダの作成

前回作成をしたサイトの Components/Data のフォルダの下に ImageSample というフォルダを作成します。そしてそのフォルダの下にサンプルとなるアイテムを作成します。アイテムの作成の際には、テンプレートを指定する必要があり、その際に１つ前のステップで作成をしたテンプレートを指定します。

![template](/static/images/2022/04/template13.png)

Sitecore のメディアライブラリの画像を指定して、アイテム作成完了です。

![template](/static/images/2022/04/template14.png)

### レンダリングの追加

続いてレンダリングを追加します。**/sitecore/layout/Renderings/Project/sitecoredemo-jp/Data** のパスの下に新しく Json Rendering を追加します。レンダリング名は `ImageSample` を指定してください。

![template](/static/images/2022/04/template15.png)

作成したレンダリングの設定のうち、以下の２つの項目を設定します。

- **データソースの場所**: 事前に作成をしたフォルダ
- **データソース テンプレート**: 事前に作成をしたテンプレート

設定は以下のようになります。

![template](/static/images/2022/04/template16.png)

### プレースホルダーの設定

プレースホルダーのアイテムを指定します。今回も Main のアイテムを指定します。コントロールを追加して、作成したコンポーネントを使えるようにします。

![template](/static/images/2022/04/template17.png)

### 検証

前回と同じようにモジュールを配置してみたいと思います。

![template](/static/images/2022/04/template18.gif)

ページの中に画像を埋め込むことができるコンポーネントが出来上がりました。

今回の検証はもう少しコードを書き換えます。コンポーネントのコードを以下のように書き換えてみます（前後は省略しています）。

```javascript:src/components/Data/ImageSample.tsx
const ImageSample = (props: ImageSampleProps): JSX.Element => (
  <div>
    <p>ImageSample コンポーネント</p>
    <Image
      field={props.fields.image1}
      editable={false}
      imageParams={{ mw: 100, mh: 50 }}
      height="50"
      width="94"
    />
  </div>
);
```

このコードを展開すると、以下のように画像のサイズが調整され、かつ編集ができない形となっています。このように画像を表示するだけであれば、`editable` の項目を使って編集できないようにすることが可能です。

![template](/static/images/2022/04/template19.png)

レスポンシブに対応した画像を用意することは可能でしょうか？これに関しては、以下のような記述をするとサーバー側で事前にリソースを準備する動きをします。

```javascript:src/components/Data/ImageSample.tsx
const ImageSample = (props: ImageSampleProps): JSX.Element => (
  <div>
    <p>ImageSample コンポーネント</p>
    <Image
      field={props.fields.image1}
      srcSet={[{ mw: 300 }, { mw: 100 }]}
      sizes="(min-width: 960px) 300px, 100px"
    />
  </div>
);
```

上記のコードを記述している場合、以下のような HTML が表示され、また画像サイズに関しても用意されていることがわかります。

```html
<img
  alt="Jump"
  width="1100"
  height="733"
  sizes="(min-width: 960px) 300px, 100px"
  srcset="
    /-/jssmedia/sitecoredemo-jp/GettyImages-1183367089.ashx?mw=300 300w,
    /-/jssmedia/sitecoredemo-jp/GettyImages-1183367089.ashx?mw=100 100w
  "
  src="/-/media/sitecoredemo-jp/GettyImages-1183367089.ashx?h=733&amp;iar=0&amp;w=1100&amp;hash=1FD27EE38776805D782964BA955743E7"
/>
```

なお、レスポンシブに関して処理をすることができるのはメディアライブラリの中にあるファイルであり、Sitecore Content Hub の場合は別の記述方法になりますのでご注意ください。

## まとめ

画像に関しては、単に表示、編集ができるだけではなく、追加の動作確認としてレスポンシブなどで利用する複数の画像の準備に関しても紹介をしました。単にみたまま編集ができるだけでなく、画像もウィンドウのサイズに合わせたものを提供することが可能なのを確認した形です。
