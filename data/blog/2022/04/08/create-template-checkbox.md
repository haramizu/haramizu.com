---
title: コンポーネントの作成とテンプレート連携 - チェックボックス編
date: '2022-04-08'
tags: ['Next.js', 'Headless']
draft: false
summary: これまで紹介をしていたデータの形式は一般的なデータとして利用することが多い項目でしたが、今回はチェックボックスを紹介する地味なトピックとなります。
images: ['/static/images/2022/04/template46.png']
---

これまで紹介をしていたデータの形式は一般的なデータとして利用することが多い項目でしたが、今回はチェックボックスを紹介する地味なトピックとなります。

## チェックボックスコンポーネントの作成

今回はチェックボックスのデータに関するフィールドを複数設定することができるコンポーネントを作成し、記述方法および動作を確認していきます。

### コンポーネントの作成

まず最初に、以下のコードを実行して `Data/CheckboxSample` の定義ファイル２つを準備します。

```
jss scaffold Data/CheckboxSample
```

![template](/static/images/2022/04/template40.png)

これにより、以下の２つのファイルが作成されます。

- sitecore/definitions/components/Data/CheckboxSample.sitecore.ts
- src/components/Data/CheckboxSample.tsx

１つ目のファイルはテンプレートを構成するフィールドのタイプを定義することができます。以下のファイルにコードを追加します。

```javascript:sitecore/definitions/components/Data/CheckboxSample.sitecore.ts
export default function CheckboxSample(manifest: Manifest): void {
  manifest.addComponent({
    name: 'CheckboxSample',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'checkbox1', type: CommonFieldTypes.Checkbox },
      { name: 'checkbox2', type: CommonFieldTypes.Checkbox },
    ],
  });
}
```

チェックボックスの値がどうなっているのかを確認するために、以下のコードを表示の際に利用します。

```javascript:src/components/Data/CheckboxSample.tsx
import { Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideComponentProps } from 'lib/component-props';

type CheckboxSampleProps = StyleguideComponentProps & {
  fields: {
    checkbox1: Field<boolean>;
    checkbox2: Field<boolean>;
  };
};

const CheckboxSample = (props: CheckboxSampleProps): JSX.Element => (
  <div>
    <p>チェックボックス１</p>
    <div>
      {props.fields && props.fields.checkbox1 && props.fields.checkbox1.value && (
        <li>
          <code>チェックボックス１</code> はチェックされています
        </li>
      )}
      {!props.fields ||
        !props.fields.checkbox1 ||
        (!props.fields.checkbox1.value && (
          <li>
            <code>チェックボックス１</code> はチェックされていません
          </li>
        ))}
    </div>
    <p>チェックボックス２</p>
    <div>
      {props.fields && props.fields.checkbox2 && props.fields.checkbox2.value && (
        <li>
          <code>チェックボックス２</code> はチェックされています
        </li>
      )}
      {!props.fields ||
        !props.fields.checkbox2 ||
        (!props.fields.checkbox2.value && (
          <li>
            <code>チェックボックス２</code> はチェックされていません
          </li>
        ))}
    </div>
  </div>
);

export default withDatasourceCheck()<CheckboxSampleProps>(CheckboxSample);
```

### Sitecore にテンプレートを作成する

Sitecore にテンプレートを作成します。今回は２つのチェックボックスのフィールドを用意します。

![template](/static/images/2022/04/template41.png)

### データ保存のためのフォルダの作成

すでに作成されている Components/Data のフォルダの下に `CheckboxSample` というフォルダを作成します。そしてそのフォルダの下にサンプルとなるアイテムを作成します。アイテムの作成の際には、テンプレートを指定する必要があり、その際に１つ前のステップで作成をしたテンプレートを指定します。

![template](/static/images/2022/04/template42.png)

サンプルのデータを設定しますが、今回はチェックボックス１はチェックせず、２はチェックする形とします。

![template](/static/images/2022/04/template43.png)

### レンダリングの追加、プレースホルダーの設定

続いてレンダリングを追加します。**/sitecore/layout/Renderings/Project/sitecoredemo-jp/Data** のパスの下に新しく Json Rendering を追加します。レンダリング名は `CheckboxSample` を指定してください。作成したレンダリングの設定のうち、以下の２つの項目を設定します。

- **データソースの場所**: 事前に作成をしたフォルダ
- **データソース テンプレート**: 事前に作成をしたテンプレート

設定は以下のようになります。

![template](/static/images/2022/04/template44.png)

作成をしたレンダリングをプレースホルダーに追加します。

![template](/static/images/2022/04/template45.png)

### 検証

今回も管理画面でコンポーネントを配置します。結果は以下の通りです。

![template](/static/images/2022/04/template46.png)

アイテムのチェックボックスがチェックされているかどうかを判別できました。

## まとめ

チェックボックスを使うケースとしては、アイテムの中で複数のフィールドがあり、チェックしておくと追加のフィールドに関しての処理をする、といった用途での利用が想定されます。例えば、ログインをしているときにのみ表示されるコンテンツ、というような使い方をしたいなどのケースが考えられます。
