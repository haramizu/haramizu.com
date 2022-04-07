---
title: コンポーネントの作成とテンプレート連携 - ファイル編
date: '2022-04-12'
tags: ['Next.js', 'Headless']
draft: true
summary: コンポーネント作成シリーズの最後として、ファイルを指定することができるファイルコンポーネントを作成します。ファイル自体はメディアライブラリにあるファイルを指定する形となりますが、データとしてどういう形で取得することができるのか、というのを確認するのが主な目的です。
images: ['/static/images/2022/04/template65.png']
---

コンポーネント作成シリーズの最後として、ファイルを指定することができるファイルコンポーネントを作成します。ファイル自体はメディアライブラリにあるファイルを指定する形となりますが、データとしてどういう形で取得することができるのか、というのを確認するのが主な目的です。

## ファイルコンポーネントの作成

今回はファイルを指定するためのコンポーネントを作っていきます。

### コンポーネントの作成

まず最初に、以下のコードを実行して `Data/FileSample` の定義ファイル２つを準備します。

```
jss scaffold Data/FileSample
```

![template](/static/images/2022/04/template59.png)

これにより、以下の２つのファイルが作成されます。

- sitecore/definitions/components/Data/FileSample.sitecore.ts
- src/components/Data/FileSample.tsx

１つ目のファイルはテンプレートを構成するフィールドのタイプを定義することができます。以下のファイルにコードを追加します。`contentlist1` を作成して、コンテンツタイプを `CommonFieldTypes.ContentList` としています。

```javascript:sitecore/definitions/components/Data/FileSample.sitecore.ts
export default function FileSample(manifest: Manifest): void {
  manifest.addComponent({
    name: 'FileSample',
    icon: SitecoreIcon.DocumentTag,
    fields: [{ name: 'file1', type: CommonFieldTypes.File }],
  });
}
```

レンダリングを担うコードは以下の通りです。import に `File` および `FileField` の項目が追加されている点など、標準で作成されているコードと異なります。

```javascript:src/components/Data/ContentListSample.tsx
import { File, FileField, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideComponentProps } from 'lib/component-props';

type FileSampleProps = StyleguideComponentProps & {
  fields: {
    file1: FileField;
  };
};

const FileSample = (props: FileSampleProps): JSX.Element => (
  <div>
    <p>ファイル コンポーネント</p>
    <div>
      <File field={props.fields.file1} />
    </div>
  </div>
);

export default withDatasourceCheck()<FileSampleProps>(FileSample);
```

### Sitecore にテンプレートの作成、データ保存のためのフォルダの作成

まず最初に、コンポーネントの定義となるテンプレートを作成します。フィールド名は `file1` でフィールド形式は File を選択します。

![template](/static/images/2022/04/template60.png)

続いてデータ保存のためのフォルダを作成します。

![template](/static/images/2022/04/template61.png)

サンプルのデータに関しては、メディアライブラリにあるファイルを指定します。

![template](/static/images/2022/04/template62.png)

### レンダリングの追加、プレースホルダーの設定

続いてレンダリングを追加します。**/sitecore/layout/Renderings/Project/sitecoredemo-jp/Data** のパスの下に新しく Json Rendering を追加します。レンダリング名は `FileSample` を指定してください。作成したレンダリングの設定のうち、以下の２つの項目を設定します。

- **データソースの場所**: 事前に作成をしたフォルダ
- **データソース テンプレート**: 事前に作成をしたテンプレート

設定は以下のようになります。

![template](/static/images/2022/04/template63.png)

作成をしたレンダリングをプレースホルダーに追加します。

![template](/static/images/2022/04/template64.png)

### 検証

実際にコンポーネントを配置し、作成したサンプルのデータを指定すると以下のようになります。

![template](/static/images/2022/04/template65.png)

プレビューで参照をすると、画像に対してリンクが貼られていることがわかります。

## まとめ

今回はファイルに関するフィールドを利用してリンクを作成しました。実際には Doc や PDF などのファイルをダウンロードすることができるように、ファイルを指定する場合によく利用するフィールドになります。
