---
title: Tailwind.css を Next.js のサンプルに適用する
date: '2022-03-14'
tags: ['tailwind.css', 'Next.js', 'Headless']
draft: false
summary: Next.js のサンプルは CSS のスタイルシートとして bootstrap が標準で設定されています。CSS のスタイルシートはさまざまなものが提供されていますが、今回は Tailwind CSS を利用する形に切り替えていきます。
images: ['/static/images/2022/03/tailwindcss05.png']
---

Next.js のサンプルは CSS のスタイルシートとして bootstrap が標準で設定されています。CSS のスタイルシートはさまざまなものが提供されていますが、今回は Tailwind CSS を利用する形に切り替えていきます。

## Tailwind CSS とは？

Tailwind CSS は ユーティリティファースト（コンポーネントにクラス名を付与するのではなく特定のスタイルを設定する）となる CSS フレームワークで、エンジニアには使いやすいものになっています。

また Next.js と一緒に利用する際の手続きも紹介されており、今回はその手順に沿ってサンプルのスタイルシートを Tailwind CSS に切り替えていきます。

## Tailwind CSS をインストールする

すでに作成をしているプロジェクトに対して、以下のコマンドを実行して Tailwind CSS と関連するモジュールをインストールします。

```
npm install -D tailwindcss postcss autoprefixer
```

`package.json` が更新されて利用できるようになっているのがわかります。

![Tailwindcss](/static/images/2022/03/tailwindcss01.png)

続いて Tailwind CSS を利用するための設定ファイルを作成します。これは以下のコマンドを実行するだけで可能です。

```
npx tailwindcss init -p
```

`tailwind.config.js` と `tailwind.config.js` のファイルが出来上がっていることがわかります。

![Tailwindcss](/static/images/2022/03/tailwindcss02.png)

作成された設定ファイル `tailwind.config.js` のテンプレートのパスを指定します。Sitecore のテンプレート src の下にページなどのコンポーネントが配置されているため、Web のサンプルと違うパスを指定する形となります。

```javascript:tailwind.config.js
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

続いて、src/assets の下に `global.css` のファイルを作成して、以下のようにスタイルシートを作成します。

```css:src/assets/global.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

そして src/pages にある `_app.tsx` にて読み込んでいるスタイルシートを変更します。

```javascript:_app.tsx
import 'bootstrap/dist/css/bootstrap.css';
import 'nprogress/nprogress.css';
import 'assets/app.css';
```

bootstarp を利用しないので、削除をして作成をした CSS ファイルを設定します。ついでにコメントの部分も削除すれば少しスッキリします。

```javascript:_app.tsx
import 'nprogress/nprogress.css';
import 'assets/global.css';
import 'assets/app.css';
```

ここまで変更をしたところで、一度手元で `jss start` を利用して実行すると、トップページは以下のように表示されます。

![Tailwindcss](/static/images/2022/03/tailwindcss03.png)

Bootstrap のスタイルシートが削除されていることがわかります。では実際にスタイルシートを適用できるかテストをするために以下のコードを利用します。

```html
<h1 className="text-3xl font-bold underline">これは Tailwind CSS のテストです</h1>
```

対象のファイルは、src/components にある `ContentBlock.tsx` です。今回は以下のように一番上に上記のサンプルコードを入れているだけです。

```javascript:src/components/ContentBlock.tsx
const ContentBlock = ({ fields }: ContentBlockProps): JSX.Element => (
  <div className="contentBlock">
    <h1 className="text-3xl font-bold underline">これは Tailwind CSS のテストです</h1>
    <Text tag="h2" className="display-4" field={fields.heading} />

    <RichText className="contentDescription" field={fields.content} />
  </div>
);
```

ページの再読み込みをすると以下のようになります。

![Tailwindcss](/static/images/2022/03/tailwindcss04.png)

今度は元々のコードを書き換えます。CMS からコンテンツを読み込んでいる部分の Text タグで指定している classname を変更する形です。

```javascript:src/components/ContentBlock.tsx
const ContentBlock = ({ fields }: ContentBlockProps): JSX.Element => (
  <div className="contentBlock">
    <h1 className="text-3xl font-bold underline">これは Tailwind CSS のテストです</h1>
    <Text tag="h2" className="text-2xl font-bold" field={fields.heading} />

    <RichText className="contentDescription" field={fields.content} />
  </div>
);
```

保存をすると、H2 タグを利用している部分にスタイルシートを適用できています。今回は下線は使っていません。

![Tailwindcss](/static/images/2022/03/tailwindcss05.png)

## まとめ

今回は Tailwind CSS を適用するための最初のステップを紹介しました。次回からは有料のサンプルソースコードを提供している https://tailwindui.com のコードを参考にしながら（このブログのために購入しました）、次回はナビゲーションの部分を作りたいと思います。

## 参考情報

- [Install Tailwind CSS with Next.js](https://tailwindcss.com/docs/guides/nextjs)
