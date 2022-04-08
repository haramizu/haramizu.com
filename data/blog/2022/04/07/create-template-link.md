---
title: コンポーネントの作成とテンプレート連携 - リンクフィールド編
date: '2022-04-07'
tags: ['Next.js', 'Headless']
draft: false
summary: Web サイトのデータとして重要になってくるのがコンテンツの次にリンクになります。この部分の記述をコンポーネントではどう言った形で記述するのかを今回は紹介していきます。
images: ['/static/images/2022/04/template39.png']
---

Web サイトのデータとして重要になってくるのがコンテンツの次にリンクになります。この部分の記述をコンポーネントではどう言った形で記述するのかを今回は紹介していきます。

## リンクフィールドコンポーネントの作成

今回はリンクに関するフィールドを含むコンポーネントを作成し、記述方法および動作を確認していきます。

### コンポーネントの作成

まず最初に、以下のコードを実行して `Data/LinkSample` の定義ファイル２つを準備します。

```
jss scaffold Data/LinkSample
```

![template](/static/images/2022/04/template29.png)

これにより、以下の２つのファイルが作成されます。

- sitecore/definitions/components/Data/LinkSample.sitecore.ts
- src/components/Data/LinkSample.tsx

１つ目のファイルはテンプレートを構成するフィールドのタイプを定義することができます。以下のファイルにコードを追加します。

```javascript:sitecore/definitions/components/Data/LinkSample.sitecore.ts
export default function LinkSample(manifest: Manifest): void {
  manifest.addComponent({
    name: 'LinkSample',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'generallink1', type: CommonFieldTypes.GeneralLink },
      { name: 'itemlink1', type: CommonFieldTypes.ItemLink },
    ],
  });
}
```

続いてこの項目をページのアイテムとして表示するように、レイアウトファイルとなる以下のファイルを編集します。import に `LinkField`, `Link`, `Item`, を追加しています。

```javascript:src/components/Data/LinkSample.tsx
import {
  Text,
  Field,
  LinkField,
  Link,
  Item,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideComponentProps } from 'lib/component-props';

type LinkSampleProps = StyleguideComponentProps & {
  fields: {
    generallink1: LinkField;
    itemlink1: Item;
  };
};

const LinkSample = (props: LinkSampleProps): JSX.Element => {
  const { itemlink1 } = props.fields;

  return (
    <div>
      <h2>標準リンク</h2>
      <div>
        <Link field={props.fields.generallink1} />
      </div>
      <h2>アイテムリンク</h2>
      <div>
        <Text field={itemlink1.fields.Title as Field<string>} />
      </div>
    </div>
  );
};

export default withDatasourceCheck()<LinkSampleProps>(LinkSample);
```

### Sitecore にテンプレートを作成する

Sitecore にテンプレートを作成します。今回は２つのフィールドを用意します。ポイントとしては、アイテムリンクに関しては dropbox tree のフィールド形式を選択する点です。

![template](/static/images/2022/04/template30.png)

### データ保存のためのフォルダの作成

すでに作成されている Components/Data のフォルダの下に `LinkSample` というフォルダを作成します。そしてそのフォルダの下にサンプルとなるアイテムを作成します。アイテムの作成の際には、テンプレートを指定する必要があり、その際に１つ前のステップで作成をしたテンプレートを指定します。

![template](/static/images/2022/04/template31.png)

サンプルのデータを設定しますが、今回は General Link に関しては以下のように設定します。

![template](/static/images/2022/04/template32.png)

もう一つのアイテムリンクに関しても同じアイテムを選択しておきます。

![template](/static/images/2022/04/template33.png)

### レンダリングの追加、プレースホルダーの設定

続いてレンダリングを追加します。**/sitecore/layout/Renderings/Project/sitecoredemo-jp/Data** のパスの下に新しく Json Rendering を追加します。レンダリング名は `LinkSample` を指定してください。作成したレンダリングの設定のうち、以下の２つの項目を設定します。

- **データソースの場所**: 事前に作成をしたフォルダ
- **データソース テンプレート**: 事前に作成をしたテンプレート

設定は以下のようになります。

![template](/static/images/2022/04/template34.png)

作成をしたレンダリングをプレースホルダーに追加します。

![template](/static/images/2022/04/template35.png)

### 検証

すでに作成しているコンポーネントを配置すると以下のような画面になります。

![template](/static/images/2022/04/template36.png)

General Link に関しては、`Link` タグを利用しているため、リンクが作成されています。Horizon でも右上のエリアに編集することができる項目が表示されているのがわかります。

```javascript
      <h2>標準リンク</h2>
      <div>
        <Link field={props.fields.generallink1} />
      </div>
```

またアイテムリンクに関しては以下のように表示されています。

![template](/static/images/2022/04/template37.png)

今回のコードは以下のようになっており、指定したアイテムのテキストを編集可能にするために `Text` タグを利用して記載した形です。

```javascript
      <h2>アイテムリンク</h2>
      <div>
        <Text field={itemlink1.fields.Title as Field<string>} />
      </div>
```

アイテムリンクのコードを以下のように書き換えるとどうなるでしょうか？

```javascript
      <h2>アイテムリンク</h2>
      <div>
        <Text field={itemlink1.fields.Text as Field<string>} />
      </div>
```

結果は以下のようになります。

![template](/static/images/2022/04/template38.png)

この `Title` と `Text` の違いに関しては、そのアイテムのフィールドを指定して呼び出している形となっています。

![template](/static/images/2022/04/template39.png)

## まとめ

今回は２つのリンクに関して紹介しました。Generic Link に関しては、サイト内、外も含めたリンクを指定する際に利用可能で、リンクに関してそのまま表示されるため便利な機能です。一方、Item Link は対象となるアイテムのデータを読み込むという手順において便利な機能となっています。うまくこれらを使い分けるのが良いでしょう。
