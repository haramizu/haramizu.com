---
title: Hero エリアの部品を作成する（前編）
date: '2022-03-16'
tags: ['Next.js', 'Headless']
draft: true
summary: 前回の記事でヘッダー、フッターのエリアを整理しました。今回はトップページで利用する Hero エリアのコンポーネントを新規に作成していきます。この手順を通じて、新しいコンポーネントの作り方を学んでいきます。
images: ['/static/images/2022/03/Scaffold17.png']
---

前回の記事でヘッダー、フッターのエリアを整理しました。今回はトップページで利用する Hero エリアのコンポーネントを新規に作成していきます。この手順を通じて、新しいコンポーネントの作り方を学んでいきます。

## 新規コンポーネントを作成する

新しいコンポーネントを作るために、jss のコマンドを利用してください。

```
jss scaffold Hero
```

![Scaffold](/static/images/2022/03/Scaffold01.png)

実行後、２つのファイルが出来上がっています。

- sitecore/definitions/components/Hero.sitecore.ts
- src/components/Hero.tsx

## Sitecore の設定

コンポーネントのコードの準備ができたので、続いて Sitecore 側にテンプレートを作成します。今回のプロジェクトは、 **/sitecore/templates/Project/sitecoredemo-jp** がテンプレートの場所です。ここで新しいテンプレートを作成します。テンプレートの名前は Hero で、ベーステンプレートはデフォルトのまま進めてください。

![Scaffold](/static/images/2022/03/Scaffold02.png)

アイテムが出来上がったところで、今回はまだ何も項目を増やしていないため、Data の中に heading を指定、１行テキストを作成します。

![Scaffold](/static/images/2022/03/Scaffold03.png)

アイテムを作成した時のデフォルトの値を準備しておくために、スタンダードバリューを設定しておきます。

![Scaffold](/static/images/2022/03/Scaffold04.png)

続いてこのテンプレートを利用した共通アイテムを作成できるフォルダを準備します。 **/sitecore/content/sitecoredemo-jp/Components** の下に Hero のフォルダを作成します。

![Scaffold](/static/images/2022/03/Scaffold05.png)

続いてレンダリングを作成 s います。**/sitecore/layout/Renderings/Project/sitecoredemo-jp** に対して Json Rendering のテンプレートを利用してレンダリングを追加します。

![Scaffold](/static/images/2022/03/Scaffold06.png)

出来上がったアイテムは以下のようになります。

![Scaffold](/static/images/2022/03/Scaffold07.png)

最後に、プレースホルダーに対して作成したコンポーネントを利用できるように指定します。 **/sitecore/layout/Placeholder Settings/Project/sitecoredemo-jp/jss-main** のプレースホルダーの関連づけられたコントローラーに、**Hero** を追加してください。

![Scaffold](/static/images/2022/03/Scaffold08.png)

これで一通り準備が終わりました。

## Sitecore のアイテムを作成する

今回はこれまで利用してきた Home アイテムを削除して、新しい Home アイテムを作成します。利用するテンプレートは /sitecore/templates/Project/sitecoredemo-jp/App Route です。

作成をしたホームアイテムは、Sitecore Demo というページタイトルのみにしています。

![Scaffold](/static/images/2022/03/Scaffold09.png)

アイテムができたところで、エクスペリエンスエディターを起動します。何もサブアイテムを持っていないため、ヘッダーとフッターだけのページが表示されています。

![Scaffold](/static/images/2022/03/Scaffold10.png)

空欄のエリアをクリックしてコンポーネントを追加する作業をすると、今回作成をした Hero のコンポーネントを選択することが可能なのを確認です。

![Scaffold](/static/images/2022/03/Scaffold11.png)

Hero を選択するとアイテムの選択画面が表示されます。ここではまだ何も作っていないため、新しいコンテンツを作成を選択し、アイテムの名前を設定、OK ボタンをクリックしてください。

![Scaffold](/static/images/2022/03/Scaffold12.png)

画面が切り替わり、今回はエラーが出てきました。開発環境の際にはこの時に手元の開発環境と繋いでおけばエラーが出ませんが、そうではない場合はこのようなエラーが表示されます。

![Scaffold](/static/images/2022/03/Scaffold13.png)

エラーが出ていても気にせず保存して、続いて手元の環境に戻ります。

## ローカルで Sitecore と接続してレイアウトを作成する

手元の環境で、jss start を実行して Sitecore に繋いでいる場合はどういう形で表示されるでしょうか？次の画面が localhost でアクセスしている画面です。

![Scaffold](/static/images/2022/03/Scaffold14.png)

先ほど編集をしたエクスペリエンスエディターでの作業が反映されていることがわかります。Sitecore で作成をした /sitecore/content/sitecoredemo-jp/Components/Hero/HomeData1 のアイテムの中身を更新すると、手元のページが更新されれば正しく接続できていることになります。

## データの項目を増やす

今回のコンポーネントのデータ項目を増やします。レイアウトの関係で、フィールド名も含めて変更をします。定義ファイルを更新します。

```javascript:sitecore/definitions/components/Hero.sitecore.ts
  manifest.addComponent({
    name: 'Hero',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'title1', type: CommonFieldTypes.SingleLineText },
      { name: 'title2', type: CommonFieldTypes.SingleLineText },
      { name: 'text', type: CommonFieldTypes.SingleLineText },
      { name: 'image', type: CommonFieldTypes.SingleLineText },
    ],
  });
```

続いて、表示するコンポーネントのファイルを編集します。

```javascript:src/components/Hero.tsx
type HeroProps = StyleguideComponentProps & {
  fields: {
    title1: Field<string>;
    title2: Field<string>;
    text: Field<string>;
    image: Field<string>;
  };
};

const Hero = (props: HeroProps): JSX.Element => (
  <div>
    <p>Hero Component</p>
    <Text tag="h2" className="text-2xl font-bold" field={props.fields.title1} />
    <Text tag="h3" className="text-1xl font-bold" field={props.fields.title2} />
    <Text field={props.fields.text} />
    <Text tag="h3" className="text-1xl" field={props.fields.image} />
  </div>
);
```

今回は項目を増やしたので、Sitecore のテンプレートも変更します。なお、元々の項目を title1 と変更しているので、既存のフィールド名の変更も忘れないようにしてください。

サンプルとして用意しているアイテム **/sitecore/content/sitecoredemo-jp/Components/Hero/HomeData1** の内容を更新しておきます。

![Scaffold](/static/images/2022/03/Scaffold15.png)

これで一通り変更をしました。テストページを参照するとどうなっているでしょうか？

![Scaffold](/static/images/2022/03/Scaffold16.png)

きちんとアイテムが表示されていることがわかります。

## GitHub にコードを展開する

ここまで完成したコードを GitHub の development ブランチに展開します。展開されたコードは Vercel に自動的に展開されて、ビルドが完了するまで少し待ちましょう。ビルドが完了したところでアクセスをすると、以下のように編集可能なコンポーネントとして展開されているのを確認することができます。

![Scaffold](/static/images/2022/03/Scaffold17.png)

## まとめ

今回は新しいコンポーネントを作成、Sitecore との連携の部分まで紹介をしました。長くなったので、このコンポーネントをもう少し編集するのですが、後編として次回お届けします。
