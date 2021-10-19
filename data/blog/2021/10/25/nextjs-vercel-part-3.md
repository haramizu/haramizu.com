---
title: Sitecore ヘッドレス と Next.js でサイト構築 - コンポーネントの追加
date: '2021-10-25'
tags: ['JSS','Next.js','Headless']
draft: true
summary: 前回は Sitecore のインスタンスの設定および Vercel での動作まで進めました。今回は立ち上げたサンプルのサイトに関して、すでに入っているコンテンツの整理、またそれを表示するために定義されている内容などを削除して、空っぽのプロジェクトまで仕上げていきます。
images: ['/static/images/2021/10/nextjs303.png']
---

Sitecore JSS で開発をしていくときに、コンポーネントを追加するためのコマンド jss scaffold が用意されています。今回はこれを元に、１つコンポーネントを作成していきます。

## SampleComponent の作成

今回は SampleComponent という部品を作成していきます。プロジェクトのトップで、以下のコマンドを実行してください。なお、コンポーネントの名前を指定する際には、**必ず最初の１文字目は大文字** にしてください。

```
jss scaffold SampleComponent
```

![nextjs3](/static/images/2021/10/nextjs301.png)

このコマンドを実行することで、以下の２つのファイルが作成されています。

* /sitecore/definitions/components/SampleComponent.sitecore.ts
    * コンポーネントのデータ定義のファイル
    * Sitecore で編集したい項目をここで定義していきます
* /src/components/SampleComponent.tsx
    * ページを表示する際のレイアウトを定義します

上記の２つのファイルは、テンプレートとして定義されているデータのまま生成されます。テンプレートの場所は以下の通りです。

* /scripts/templates

## ページに表示する

作成をしたコンポーネントをページに表示するために、/data/routes/en.yml のファイルにコンポーネントとデータを追加します。今回は heading という項目のみが設定されているだけとなるため、コードは少しだけ追加する形です。

```yml
placeholders:
  jss-main:
    - componentName: ContentBlock
      fields:
        heading: Welcome to Sitecore JSS
        # to author content in YAML, use _multi-line values_ (prefixed with | + endline)
        # as long as the same indent is preserved at the beginning of each line, no escaping
        # is required at all in the value, making it easy to read
        content: |
          <p>Thanks for using JSS!! Here are some resources to get you started:</p>

          <h3><a href="https://jss.sitecore.com" rel="noopener noreferrer">Documentation</a></h3>
          <p>The official JSS documentation can help you with any JSS task from getting started to advanced techniques.</p>
    - componentName: SampleComponent
      fields:
        heading: This is sample component
```

編集が終わったところで、**jss start** を実行してページの確認をします。すると、作成したコンポーネントが追加されているのがわかります。

![nextjs3](/static/images/2021/10/nextjs302.png)

コンポーネントが追加できました。

## コンポーネントを変更する

続いて作成したコンポーネントを変更したいと思います。現在はコンポーネントとして heading という項目のみが定義されていますが、ここに画像を追加したいと思います。

### コンポーネントの項目追加

コンテンツ管理をするためのフィールドを追加する際には、今回は以下のファイルを編集することになります。

* /sitecore/definitions/components/SampleComponent.sitecore.ts

アイテムの定義は以下のようになっています。

```javascript
export default function (manifest: Manifest): void {
  manifest.addComponent({
    name: 'SampleComponent',
    icon: SitecoreIcon.DocumentTag,
    fields: [{ name: 'heading', type: CommonFieldTypes.SingleLineText }],
  });
}
```

項目を追加する場合は、Fields を追加する形になります。fields に対して image を追加します。

```javascript
export default function (manifest: Manifest): void {
  manifest.addComponent({
    name: 'SampleComponent',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'heading', type: CommonFieldTypes.SingleLineText },
      { name: 'image', type: CommonFieldTypes.Image },
    ],
  });
}
```

### コンポーネントの表示を変更

表示方法を変更するコードは、以下のファイルの編集をすることになります。

* /src/components/SampleComponent.tsx

```javascript
import { Text, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { NextjsdemoComponentProps } from 'lib/component-props';

type SampleComponentProps = NextjsdemoComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const SampleComponent = (props: SampleComponentProps): JSX.Element => (
  <div>
    <h2>SampleComponent Component</h2>
    <Text field={props.fields.heading} />
  </div>
);

export default SampleComponent;
```

今回は画像を追加するための、画像の定義に関して利用できるように、最初の import のコードに対して、 Image,
 ImageField を追加します。

```javascript
import { Text, Field, Image, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
```

項目の定義として、以下のように image を追加します。

```javascript
type SampleComponentProps = NextjsdemoComponentProps & {
  fields: {
    heading: Field<string>;
    image: ImageField;
  };
};
```

最後に表示エリアとなる項目に画像を追加します。今回は、タイトルを h2 で表示するように合わせて変更をしました。

```javascript
const SampleComponent = (props: SampleComponentProps): JSX.Element => (
  <div>
    <h2>SampleComponent Component</h2>
    <Text field={props.fields.heading} />
    <Image field={props.fields.image} />
  </div>
);
```

これでコンポーネントの定義は完了しました。

### ページデータの編集

データとして、 /data/routes/en.yml のコンポーネントを配置したところに画像に関する記述を追加します。画像に関しては、外部の画像を読み込む形ではなく、ローカルに配置しているファイル /data/media/ の配下にファイルを置いて指定してください。

```yml
    - componentName: SampleComponent
      fields:
        heading: This is sample component
        image:
          src: /data/media/img/sc_logo.png
          alt: Sitecore Logo
```

上記のように変更をしたあと、**jss start** でページを表示します。

![nextjs3](/static/images/2021/10/nextjs303.png)

作成をしたコンポーネントのタイトルのサイズの変更、画像の追加ができていることを確認できました。

## まとめ

Sitecore の開発で、コンポーネントブロックを作成する際の手順を紹介しました。jss scaffold のコマンドを利用することで、必要とされるファイルが展開され、あとは追加されたコードを元にページが構成されることがわかります。

ここまで実行したサンプルのコードを、part-03 のブランチとして作成しておきました。

* [GitHub - haramizu / nextjssxample](https://github.com/haramizu/nextjssample/tree/part-02)

## 関連記事

* [環境の構築](/blog/2021/09/09/nextjs-vercel-part-1)
* [空プロジェクトの作成](/blog/2021/10/20/nextjs-vercel-part-2)
