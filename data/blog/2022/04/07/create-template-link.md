---
title: テンプレートの作成とデータタイプの設定 - リンクフィールド編
date: '2022-04-07'
tags: ['Next.js', 'Headless']
draft: true
summary: Web サイトのデータとして重要になってくるのがコンテンツの次にリンクになります。この部分の記述をコンポーネントではどう言った形で記述するのかを今回は紹介していきます。
images: ['/static/images/2022/03/component06.gif']
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
        <Text field={itemlink1.fields.pageTitle as Field<string>} />
      </div>
    </div>
  );
};

export default withDatasourceCheck()<LinkSampleProps>(LinkSample);
```

### Sitecore にテンプレートを作成する

### データ保存のためのフォルダの作成

### レンダリングの追加

### プレースホルダーの設定

### 検証

## まとめ
