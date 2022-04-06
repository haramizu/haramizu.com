---
title: コンポーネントの作成とテンプレート連携 - コンテンツリスト編
date: '2022-04-11'
tags: ['Next.js', 'Headless']
draft: true
summary: 今回はコンテンツリストを利用したコンポーネントを作成していきます。コンテンツリストは、Sitecore のアイテムを複数指定して、それらのデータを一括で利用したいというケースで使い勝手の良いものです。よくあるケースとしては、Meta タグで利用するキーワードを選択できるようにする、といったニーズにも使えます。
images: ['/static/images/2022/04/template58.png']
---

今回はコンテンツリストを利用したコンポーネントを作成していきます。コンテンツリストは、Sitecore のアイテムを複数指定して、それらのデータを一括で利用したいというケースで使い勝手の良いものです。よくあるケースとしては、Meta タグで利用するキーワードを選択できるようにする、といったニーズにも使えます。

## コンテンツリストコンポーネントの作成

今回は、コンテンツリストのデータを管理できるフィールドを１つ設定するコンポーネントを作成します。

### コンポーネントの作成

まず最初に、以下のコードを実行して `Data/ContentListSample` の定義ファイル２つを準備します。

```
jss scaffold Data/ContentListSample
```

![template](/static/images/2022/04/template47.png)

これにより、以下の２つのファイルが作成されます。

- sitecore/definitions/components/Data/ContentListSample.sitecore.ts
- src/components/Data/ContentListSample.tsx

１つ目のファイルはテンプレートを構成するフィールドのタイプを定義することができます。以下のファイルにコードを追加します。`contentlist1` を作成して、コンテンツタイプを `CommonFieldTypes.ContentList` としています。

```javascript:sitecore/definitions/components/Data/ContentListSample.sitecore.ts
export default function ContentListSample(manifest: Manifest): void {
  manifest.addComponent({
    name: 'ContentListSample',
    icon: SitecoreIcon.DocumentTag,
    fields: [{ name: 'contentlist1', type: CommonFieldTypes.ContentList }],
  });
}
```

レンダリングを担うコードは以下の通りです。import に Item の項目が追加されている点など、標準で作成されているコードと異なります。

```javascript:src/components/Data/ContentListSample.tsx
import { Text, Item, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideComponentProps } from 'lib/component-props';

type ContentListSampleProps = StyleguideComponentProps & {
  fields: {
    contentlist1: Item[];
  };
};

const ContentListSample = (props: ContentListSampleProps): JSX.Element => {
  const { contentlist1 } = props.fields;

  return (
    <div>
      <h2>コンテンツリスト</h2>
      <div>
        {contentlist1 &&
          contentlist1.map((listItem, index) => (
            <div key={`contentlist-${index}`}>
              {/* The referenced item's fields can be rendered and edited using normal helper components: */}
              <p>
                ページタイトル: <Text field={listItem.fields.pageTitle as Field<string>} />
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default withDatasourceCheck()<ContentListSampleProps>(ContentListSample);
```

### Sitecore にテンプレートの作成、データ保存のためのフォルダの作成

まず最初に、コンポーネントの定義となるテンプレートを作成します。フィールド名は `contentlist1` でフィールド形式は treelist を選択します。

![template](/static/images/2022/04/template48.png)

続いてデータ保存のためのフォルダを作成します。

![template](/static/images/2022/04/template49.png)

サンプルのアイテムを作成すると、サイトコアのコンテンツツリーが表示されます。今回は、**/sitecore/content/sitecoredemo-jp/Home** のアイテムを選択して右側に表示されるようにします。

![template](/static/images/2022/04/template50.png)

### レンダリングの追加、プレースホルダーの設定

続いてレンダリングを追加します。**/sitecore/layout/Renderings/Project/sitecoredemo-jp/Data** のパスの下に新しく Json Rendering を追加します。レンダリング名は `ContentListSample` を指定してください。作成したレンダリングの設定のうち、以下の２つの項目を設定します。

- **データソースの場所**: 事前に作成をしたフォルダ
- **データソース テンプレート**: 事前に作成をしたテンプレート

設定は以下のようになります。

![template](/static/images/2022/04/template51.png)

作成をしたレンダリングをプレースホルダーに追加します。

![template](/static/images/2022/04/template52.png)

### 検証

実際にコンポーネントを配置すると、以下のようにサンプルのデータを表示することができました。

![template](/static/images/2022/04/template53.png)

今回は `Text` タグを利用しているため、文字の変更が可能です。

![template](/static/images/2022/04/template54.png)

変更をしたデータをコンテンツエディターで変更すると、正しく変更できていることがわかります。

![template](/static/images/2022/04/template55.png)

概要に関しての部分も記載しておきました。そこでこの部分を追加で表示できるようにレイアウトを少し書き換えます。

```javascript:src/components/Data/ContentListSample.tsx
const ContentListSample = (props: ContentListSampleProps): JSX.Element => {
  const { contentlist1 } = props.fields;

  return (
    <div>
      <h2>コンテンツリスト</h2>
      <div>
        {contentlist1 &&
          contentlist1.map((listItem, index) => (
            <div key={`contentlist-${index}`}>
              {/* The referenced item's fields can be rendered and edited using normal helper components: */}
              <h3>
                タイトル: <Text field={listItem.fields.pageTitle as Field<string>} />
              </h3>
              <p>
                コンテンツ: <Text field={listItem.fields.PageDescription as Field<string>} />
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};
```

変更をすると以下のように概要も表示できるようになります。

![template](/static/images/2022/04/template56.png)

最後に、もう一つ Home のアイテムを作成してコンテンツリストにも追加します。アイテムを作成した後の画面は以下の通りです。

![template](/static/images/2022/04/template57.png)

２つのアイテムが指定されている状況になりました。それではサンプルのページはどのような形になっているでしょうか？

![template](/static/images/2022/04/template58.png)

２つのアイテムを指定しているので、コンポーネントは２つのアイテムのタイトルと概要を表示するようになりました。

## まとめ

コンテンツリストコンポーネントの作成を実施しましたが、Sitecore のフィールド形式としてはコンテンツ一覧を表示する Treelist になります。実際には今回はコンテンツを表示しているだけですが、おすすめのトピックを指定しておき、リンク一覧を作成するといった用途などにも利用可能です。
