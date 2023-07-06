---
title: Sitecore JSS - React SDK を利用してサンプルサイトを構築 - Part.4
date: '2021-05-06'
tags: ['JSS', 'React']
draft: true
summary: これまでサンプルのアプリケーションを作成して動作確認、という内容を紹介してきました。今回は実際に React のコンポーネントを追加したいと思います。
images: ['/static/images/2021/05/scaffold03.png']
---

これまでサンプルのアプリケーションを作成して動作確認、という内容を紹介してきました。今回は実際に React のコンポーネントを追加したいと思います。

## jss scaffold ComponentName

新しくコンポーネントを作成するためのコマンドとして、**jss scaffold** というコマンドで必要なファイルを生成することができます。今回は、Test というコンポーネントを作成したいと思います。

```
jss scaffold Test
```

コマンドを実行すると、以下のように結果が表示されます。

![scaffold](/static/images/2021/05/scaffold01.png 'scaffold')

コンポーネントのデータの定義をするファイルとして sitecore/definitions/components/Test.sitecore.js が生成され、React コンポーネントのファイルとして src/components/Test/index.js が生成されている形です。それぞれのファイルを参照します。

### sitecore/definitions/components/Test.sitecore.js

ファイルを参照すると以下のように記載されています。

```JavaScript
// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Test component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function(manifest) {
  manifest.addComponent({
    name: 'Test',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'heading', type: CommonFieldTypes.SingleLineText },
    ],
    /*
    If the component implementation uses <Placeholder> or withPlaceholder to expose a placeholder,
    register it here, or components added to that placeholder will not be returned by Sitecore:
    placeholders: ['exposed-placeholder-name']
    */
  });
}
```

このファイルで重要となるのは、以下の項目となります。

```JavaScript
  manifest.addComponent({
    name: 'Test',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'heading', type: CommonFieldTypes.SingleLineText },
    ],
```

Test コンポーネントで利用するフィールドとして heading という項目が用意されており、この文字列は SingleLineText として定義されています。

### src/components/Test/index.js

続いて React コンポーネントを参照すると、コードは以下のようになっています。

```JavaScript
import React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react';

const Test = (props) => (
  <div>
    <p>Test Component</p>
    <Text field={props.fields.heading} />
  </div>
);

export default Test;
```

実際の HTML のタグと定義している項目を表示するための記載が含まれている形です。上から順に見ていくと

```JavaScript
import React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react';
```

この２行目で、Sitecore JSS で定義している Text をインポートしています。そしてこれを以下のように HTML に埋め込む形としています。

```html
<div>
  <p>Test Component</p>
  <Text field="{props.fields.heading}" />
</div>
```

このテストコンポーネントは、Test Component と文字を表示し、その後にコンテンツとしてのテキストを表示する、という動作をすることになります。

## コンテンツの編集

### jss start

今回は、Visual Studio Code を利用しているのを前提として作業をしていきます。まず、コンポーネントを追加したプロジェクトが正しく動くかどうか、確認をするために実行します。

```
jss start
```

実行すると以下のように表示されます。

![scaffold](/static/images/2021/05/scaffold02.png 'scaffold')

今回は実行している状態のまま、コンテンツの編集をしてください。

### コンテンツを変更する

これを実際のページで利用する際には、以下のファイルがコンテンツとなっているので、編集をします。

- react-app/data/routes/ja-JP.yml

元々のファイルでは以下のような記載が入っているとします。

```yaml
placeholders:
  jss-main:
    - componentName: ContentBlock
      fields:
        heading: ようこそ Sitecore JSS
```

ContentBlock は元々用意されているサンプルのコンポーネントです。今回は、これの前にコンテンツを追加します。

```yaml
placeholders:
  jss-main:
    - componentName: Test
      fields:
        heading: テストコンポーネント
    - componentName: ContentBlock
      fields:
        heading: ようこそ Sitecore JSS
```

保存をすると改めてコンパイルが実行されて、ブラウザの画面で再読み込みをすると反映されていることがわかります。

![scaffold](/static/images/2021/05/scaffold03.png 'scaffold')

## まとめ

今回は、コマンドを実行してコンポーネントを新規に作成をしました。どのファイルがどういう役割か、という点ではコンテンツのテンプレートを定義しているファイル、表示をする React のコンポーネントのファイル、そして実際のコンテンツを編集してコンポーネントを利用する方法を紹介しました。

次回はこの作成したコンポーネントを編集して、アイテムの編集項目に関しての定義をもう少し追加していきます。

## 参考情報

- [UI Components in the JSS React sample app](https://doc.sitecore.com/xp/en/developers/hd/190/sitecore-headless-development/ui-components-in-the-jss-react-sample-app.html)
