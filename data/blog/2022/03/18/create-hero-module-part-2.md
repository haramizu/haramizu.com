---
title: Hero エリアの部品を作成する（後編）
date: '2022-03-18'
tags: ['tailwind.css', 'Next.js', 'Headless']
draft: true
summary: 前回は新しいコンポーネントを作成して配置しましたが、まだ見た目は普通に HTML が表示されている程度の Tailwind CSS のデザインになっています。今回は見た目を少し変更するのと、合わせてコンテンツの属性を少し変更したいと思います。
images: ['/static/images/2022/03/Scaffold24.png']
---

前回は新しいコンポーネントを作成して配置しましたが、まだ見た目は普通に HTML が表示されている程度の Tailwind CSS のデザインになっています。今回は見た目を少し変更するのと、合わせてコンテンツの属性を少し変更したいと思います。

## コンテンツのタイプを変更する

前回は項目を作る時にすべて Single-Line Text を適用していました。

![Scaffold](/static/images/2022/03/Scaffold18.png)

もう少し使い勝手を良くするために、コンテンツのタイプを変更します。管理画面でまずは image と設定していた項目を、タイプを画像に変更をします。

![Scaffold](/static/images/2022/03/Scaffold19.png)

ついでに画像を指定します（今回は Content Hub の画像を指定しています）

![Scaffold](/static/images/2022/03/Scaffold20.png)

ここでコンテンツのタイプを変更したため、レイアウトを指定している Next.js のプロジェクトで画像を扱えるようにします。image のコンテンツタイプを `CommonFieldTypes.Image` に変更します。

```javascript:sitecore/definitions/components/Hero.sitecore.ts
export default function Hero(manifest: Manifest): void {
  manifest.addComponent({
    name: 'Hero',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'title1', type: CommonFieldTypes.SingleLineText },
      { name: 'title2', type: CommonFieldTypes.SingleLineText },
      { name: 'text', type: CommonFieldTypes.SingleLineText },
      { name: 'image', type: CommonFieldTypes.Image },
    ],
  });
}
```

Visual Studio Code を利用していれば、CommonFieldTypes で利用できるタイプを候補として表示してくれるため、非常に便利です。

![Scaffold](/static/images/2022/03/Scaffold21.png)

続いて表示をするためのファイルを更新します。変更点としては、`@sitecore-jss/sitecore-jss-nextjs` の import に Image を追加、image に関する定義を２箇所変更している形です。

```javascript:src/components/Hero.tsx
import {
  Text,
  Field,
  Image,
  ImageField,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideComponentProps } from 'lib/component-props';

type HeroProps = StyleguideComponentProps & {
  fields: {
    title1: Field<string>;
    title2: Field<string>;
    text: Field<string>;
    image: ImageField;
  };
};

const Hero = (props: HeroProps): JSX.Element => (
  return (
    <div>
      <p>Hero Component</p>
      <Text tag="h2" className="text-2xl font-bold" field={props.fields.title1} />
      <Text tag="h3" className="text-1xl font-bold" field={props.fields.title2} />
      <Text field={props.fields.text} />
      <Image media={props.fields.image} />
    </div>
  );
);

export default withDatasourceCheck()<HeroProps>(Hero);
```

変更が終わったタイミングで、実行をすると以下のようになります。もともと文字が入っていたところに対して、Sitecore で変更をした画像のデータが表示されるようになりました。

![Scaffold](/static/images/2022/03/Scaffold22.png)

## 見た目を綺麗に整える

もう少し見た目を綺麗にするために、Tailwind CSS のサンプルコードを利用します。必要なコードを入れた部分は以下の通りです。

```javascript:src/components/Hero.tsx
import {
  Text,
  Field,
  Image,
  ImageField,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideComponentProps } from 'lib/component-props';

type HeroProps = StyleguideComponentProps & {
  fields: {
    title1: Field<string>;
    title2: Field<string>;
    text: Field<string>;
    image: ImageField;
  };
};

const Hero = (props: HeroProps): JSX.Element => {
  return (
    <div className="relative bg-gray-50">
      <main className="lg:relative">
        <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
          <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block xl:inline">
                <Text field={props.fields.title1} />
              </span>{' '}
              <span className="block text-indigo-600 xl:inline">
                <Text field={props.fields.title2} />
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              <Text field={props.fields.text} />
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  はじめに
                </a>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  ライブデモ
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
          <Image media={props.fields.image} />
        </div>
      </main>
    </div>
  );
};

export default withDatasourceCheck()<HeroProps>(Hero);
```

![Scaffold](/static/images/2022/03/Scaffold23.png)

ガラリと画面が変わりました。ではこのコードを GitHub のリポジトリに反映させます。しばらくすると Vercel でのビルドが完了して、以下のようにエクスペリエンスエディターでページの編集をすることができるようになりました。

![Scaffold](/static/images/2022/03/Scaffold24.png)

## まとめ

コンポーネントを作成するにあたって、jss scaffold というコマンドを実行すると２つのファイルが出来上がりました。それぞれのファイルの役割は

- sitecore/definitions/components/Hero.sitecore.ts Sitecore で管理をするデータの定義
- src/components/Hero.tsx ページを表示するためのレンダリング

また Sitecore 側でテンプレートを作る際には、名前を合わせておくだけで連携することが今回できているのがわかります。Sitecore でアイテムを作成してデータを表示する、そしてそのデータの表示方法を Tailwind CSS のテンプレートを使ってそれなりの画面に仕上げていきました。
