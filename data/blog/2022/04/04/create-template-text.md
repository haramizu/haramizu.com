---
title: テンプレートの作成とデータタイプの設定 - テキスト編
date: '2022-04-04'
tags: ['Next.js', 'Headless']
draft: false
summary: Sitecore のコンテンツ管理の仕組みとしては、コンテンツのデータ構造を定義する仕組みとしてテンプレートという仕組みを提供しています。今回はデータの持ち方を定義して、どのように呼び出しをするのかについてテンプレートを作成、データの表示について紹介をしていきます。なお、このサンプルコードは Styleguide のサンプルデータとして含まれているものを紹介していく形となります。
images: ['/static/images/2022/03/component06.gif']
---

Sitecore のコンテンツ管理の仕組みとしては、コンテンツのデータ構造を定義する仕組みとしてテンプレートという仕組みを提供しています。今回はデータの持ち方を定義して、どのように呼び出しをするのかについてテンプレートを作成、データの表示について紹介をしていきます。なお、このサンプルコードは Styleguide のサンプルデータとして含まれているものを紹介していく形となります。

## フィールド形式および定義の整理

まず最初に、Sitecore のコンポーネントを作るにあたっての定義と Sitecore におけるフィールド形式の一覧を整理していきます。項目と値を一覧にしたものは以下の通りです。

| 項目            | 用途             | 設定する値                      | Sitecore のフィールド形式 |
| --------------- | ---------------- | ------------------------------- | ------------------------- |
| singlelinetext1 | １行テキスト     | CommonFieldTypes.SingleLineText | Single-Line Text          |
| multilinetext1  | 複数行テキスト   | CommonFieldTypes.MultiLineText  | Multi-Line Text           |
| richtext1       | リッチテキスト   | CommonFieldTypes.RichText       | Rich Text                 |
| image1          | 画像             | CommonFieldTypes.Image          | Image                     |
| number1         | 数字             | CommonFieldTypes.Number         | Number                    |
| checkbox1       | チェックボックス | CommonFieldTypes.Checkbox       | Checkbox                  |
| contentlist1    | コンテンツリスト | CommonFieldTypes.ContentList    | Treelist                  |
| date1           | 日付             | CommonFieldTypes.Date           | Date                      |
| datetime1       | 日付時間         | CommonFieldTypes.DateTime       | Datetime                  |
| generallink1    | 一般リンク       | CommonFieldTypes.GeneralLink    | General Link              |
| itemlink1       | アイテムリンク   | CommonFieldTypes.ItemLink       | Droptree                  |
| file1           | ファイル         | CommonFieldTypes.File           | File                      |

今回はテンプレートをいくつかに分けて、利用方法を紹介していきたいと考えています。基本的には jss scaffold を利用してコンポーネントを作成して、いくつかのフィールド形式を設定してコンポーネントとして展開するという流れで考えています。

## テキスト関連のコンポーネントの作成

今回はコンポーネントとして、テキストのフィールドを組み合わせたものを作成して、Sitecore に展開、編集できるところまで作っていきます。

### コンポーネントの作成

上の表でいくと、最初の３つの項目を定義しているコンポーネントの作成を進めていきます。まず最初に、以下のコードを実行して `Data/TextSample` の定義ファイル２つを準備します。

```
jss scaffold Data/TextSample
```

![template](/static/images/2022/04/template01.png)

これにより、以下の２つのファイルが作成されます。

- sitecore/definitions/components/Data/Text.sitecore.ts
- src/components/Data/Text.tsx

１つ目のファイルはテンプレートを構成するフィールドのタイプを定義するために、以下のファイルにコードを追加します。

```javascript:sitecore/definitions/components/Data/Text.sitecore.ts
export default function TextSample(manifest: Manifest): void {
  manifest.addComponent({
    name: 'TextSample',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'singlelinetext1', type: CommonFieldTypes.SingleLineText },
      { name: 'multilinetext1', type: CommonFieldTypes.MultiLineText },
      { name: 'richtext1', type: CommonFieldTypes.RichText },
    ],
  });
}
```

CommonFieldTypes につける設定項目は、Visual Studio Code を利用すれば以下のように選択できるようになっています。

![template](/static/images/2022/04/template02.png)

続いてこの項目をページのアイテムとして表示するように指定します。

```javascript:src/components/Data/Text.tsx
import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideComponentProps } from 'lib/component-props';

type TextSampleProps = StyleguideComponentProps & {
  fields: {
    singlelinetext1: Field<string>;
    multilinetext1: Field<string>;
    richtext1: Field<string>;
  };
};

const TextSample = (props: TextSampleProps): JSX.Element => {
  return (
    <div>
      <h2>１行テキスト</h2>
      <div>
        <Text field={props.fields.singlelinetext1} />
      </div>
      <h2>複数行テキスト</h2>
      <div>
        <Text field={props.fields.multilinetext1} />
      </div>
      <h2>リッチテキスト</h2>
      <div>
        <Text field={props.fields.richtext1} />
      </div>
    </div>
  );
};

export default withDatasourceCheck()<TextSampleProps>(TextSample);
```

上記のコードが出来上がったところで、GitHub にコードを展開しましょう。

### Sitecore にテンプレートを作成する

続いて上記のコンポーネントに関する Sitecore 側の設定を進めていきます。今回は全て Data のフォルダを作成してサンプルのコードを展開していくため、フォルダを作成してテンプレートの作成をします。

1. Data フォルダを作成
2. TextSample のテンプレートを作成する
3. singlelinetext1, multilinetext1 および richtext1 を追加してそれぞれのフィールド形式に揃えます

出来上がったテンプレートは以下の通りです。

![template](/static/images/2022/04/template03.png)

### データ保存のためのフォルダの作成

テンプレートの作成と合わせて、今回のデモ用のデータを保存する場所を設定しておきます。今回はサイトの Components フォルダの中に Data のフォルダを作成、その下に定義をするデータを格納できるようにもう１つフォルダを作成します。

![template](/static/images/2022/04/template04.png)

### レンダリングの追加

今回定義をしたデータをもとにしたアイテムを作成するために、レンダリングを追加します。Data フォルダを作成して、の下に Json レンダリングのアイテムを作成します。アイテムの名前は、すでに作成しているコンポーネントと同じく `TextSample` とします。

![template](/static/images/2022/04/template05.png)

続いてこのレンダリングの追加設定を行います。設定するべきは２点。データソースの場所にはコンテンツを配置するフォルダ（１つ前に作成したもの）、もう一つは データソース テンプレート で、テンプレートの定義（２つ前に作成したもの）を利用します。以下の画面が設定している内容となります。

![template](/static/images/2022/04/template06.gif)

### プレースホルダーの設定

プレースホルダーとしては jss-main のみを現在のところは設定しているだけとなるため、jss-main でこのコンポーネントを使えるようにします。対象となるアイテムは、/sitecore/layout/Placeholder Settings/Project/sitecoredemo-jp/jss-main で、 **関連付けられたコントロール** に表示されるように設定を変更します。

![template](/static/images/2022/04/template07.png)

### 検証

動作検証をするために、先にアイテムを用意します。 **/sitecore/content/sitecoredemo-jp/Components/Data/TextSample** フォルダの下に `SampleTextData` というアイテムを作成します。もちろん、対象となるテンプレートを作成してというのが前提となります。

![template](/static/images/2022/04/template08.png)

作成したアイテムにデータを入れておきます。内容はなんでも問題ありませんが、今回は以下のように記載しました。

![template](/static/images/2022/04/template09.png)

続いて Horizon のエディターを開きます。

![template](/static/images/2022/04/template10.gif)

コンポーネントが有効になって、編集することが可能となりました。

## まとめ

テキストの３つのタイプのデータを含んだテンプレートを作成して、表示する部分および編集ができるようになるところまで紹介をしました。しばらくはこのシリーズを進めていきたいと思います。
