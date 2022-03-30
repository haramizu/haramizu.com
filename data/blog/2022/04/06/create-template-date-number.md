---
title: テンプレートの作成とデータタイプの設定 - 日付と数字編
date: '2022-04-06'
tags: ['Next.js', 'Headless']
draft: true
summary: 日付、数字に関してはテキストのフィールドを利用して管理することもできますが、Sitecore のフィールドとしては日付、時間、数字を設定することが可能です。今回はこれらの項目を利用してコンテンツを構成できるように、フィールドの使い方を紹介していきます。
images: ['/static/images/2022/04/template27.png']
---

日付、数字に関してはテキストのフィールドを利用して管理することもできますが、Sitecore のフィールドとしては日付、時間、数字を設定することが可能です。今回はこれらの項目を利用してコンテンツを構成できるように、フィールドの使い方を紹介していきます。

## 日付と数字のコンポーネントの作成

今回は日付と数字を扱うためのコンポーネントを作成して、ページにコンテンツを表示するコンポーネントを作成します。

### コンポーネントの作成

まず最初に、以下のコードを実行して `Data/DateNumberSample` の定義ファイル２つを準備します。

```
jss scaffold Data/DateNumberSample
```

![template](/static/images/2022/04/template20.png)

これにより、以下の２つのファイルが作成されます。

- sitecore/definitions/components/Data/DateNumberSample.sitecore.ts
- src/components/Data/DateNumberSample.tsx

１つ目のファイルはテンプレートを構成するフィールドのタイプを定義することができます。以下のファイルにコードを追加します。

```javascript:sitecore/definitions/components/Data/DateNumberSample.sitecore.ts
export default function DateNumberSample(manifest: Manifest): void {
  manifest.addComponent({
    name: 'DateNumberSample',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'number1', type: CommonFieldTypes.Number },
      { name: 'date1', type: CommonFieldTypes.Date },
      { name: 'datetime1', type: CommonFieldTypes.DateTime },
    ],
  });
}
```

続いて、レンダリングを定義しているファイルを編集します。`DateField` が import に追加されているのを忘れないでください。

```javascript:src/components/Data/DateNumberSample.tsx
import { Text, DateField, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideComponentProps } from 'lib/component-props';

type DateNumberSampleProps = StyleguideComponentProps & {
  fields: {
    number1: Field<number>;
    date1: Field<string>;
    datetime1: Field<string>;
  };
};

const DateNumberSample = (props: DateNumberSampleProps): JSX.Element => (
  <div>
    <h2>数字</h2>
    <div>
      <Text field={props.fields.number1} />
    </div>
    <h2>日付</h2>
    <div>
      <DateField field={props.fields.date1} />
    </div>
    <h2>日付と時間</h2>
    <div>
      <DateField field={props.fields.datetime1} />
    </div>
  </div>
);

export default withDatasourceCheck()<DateNumberSampleProps>(DateNumberSample);
```

### Sitecore にテンプレートを作成する

これまでと同じ展開ですが、Sitecore にテンプレートを作成します。今回は３つのフィールドを用意します。

![template](/static/images/2022/04/template21.png)

### データ保存のためのフォルダの作成

すでに作成されている Components/Data のフォルダの下に `DateNumberSample` というフォルダを作成します。そしてそのフォルダの下にサンプルとなるアイテムを作成します。アイテムの作成の際には、テンプレートを指定する必要があり、その際に１つ前のステップで作成をしたテンプレートを指定します。

![template](/static/images/2022/04/template22.png)

それぞれのデータを入れて、サンプルのデータも作成しました。

![template](/static/images/2022/04/template23.png)

### レンダリングの追加、プレースホルダーの設定

続いてレンダリングを追加します。**/sitecore/layout/Renderings/Project/sitecoredemo-jp/Data** のパスの下に新しく Json Rendering を追加します。レンダリング名は `DateNumberSample` を指定してください。作成したレンダリングの設定のうち、以下の２つの項目を設定します。

- **データソースの場所**: 事前に作成をしたフォルダ
- **データソース テンプレート**: 事前に作成をしたテンプレート

設定は以下のようになります。

![template](/static/images/2022/04/template24.png)

作成をしたレンダリングをプレースホルダーに追加します。

![template](/static/images/2022/04/template25.png)

### 検証

すでに作成しているコンポーネントをページに貼り付けます。以下の画像がその手順となります。

![template](/static/images/2022/04/template26.gif)

配置したコンポーネントのデータを編集するために、右上に表示されている **Edit content item** をクリックすると、それぞれの項目を編集することが可能です。

![template](/static/images/2022/04/template27.png)

Horizon ではなくエクスペリエンスエディターを選択した際には、日付の選択でダイアログを利用することが可能です。

![template](/static/images/2022/04/template28.png)

## まとめ

今回は数字を扱うという点で `Field<number>` の利用方法を紹介しました。また、日付および日付と時間に関しては `DateField` を利用することで、アイテムを編集する際にカレンダーコントロールを利用することができるのを確認しました。
