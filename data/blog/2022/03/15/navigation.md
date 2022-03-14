---
title: ナビゲーションを分離する
date: '2022-03-15'
tags: ['tailwind.css', 'Next.js', 'Headless']
draft: false
summary: 前回は Tailwind CSS を利用できるところまで実施しました。今回はこれを利用する前に、レイアウトの中に記載されているナビゲーションのコードを別のファイルに分離する手順を確認していきます。
images: ['/static/images/2022/03/Navigation06.png']
---

前回は Tailwind CSS を利用できるところまで実施しました。今回はこれを利用する前に、レイアウトの中に記載されているナビゲーションのコードを別のファイルに分離する手順を確認していきます。

## ナビゲーションのコードの確認

サンプルのファイルでは、ナビゲーションの部分に関してレイアウトに埋め込まれる形で記載されています。

```javascript:src/Layout.tsx
const Navigation = () => {
  const { t } = useI18n();

  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom">
      <h5 className="my-0 mr-md-auto font-weight-normal">
        <Link href="/">
          <a className="text-dark">
            <img src={`${publicUrl}/sc_logo.svg`} alt="Sitecore" />
          </a>
        </Link>
      </h5>
      <nav className="my-2 my-md-0 mr-md-3">
        <a
          className="p-2 text-dark"
          href="https://jss.sitecore.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('Documentation')}
        </a>
        <Link href="/styleguide">
          <a className="p-2 text-dark">{t('Styleguide')}</a>
        </Link>
        <Link href="/graphql">
          <a className="p-2 text-dark">{t('GraphQL')}</a>
        </Link>
      </nav>
    </div>
  );
};
```

今回はこのコードを別のファイルに分離する作業を進めていきます。

## ナビゲーションファイルの作成

ナビゲーションの部分に関して、今回は src/components の中に新しいファイルとして `Navigation.tsx` を作成します。また、ナビゲーションの記載している部分に関してコードを入れた形とします。

コードを入れただけでは、項目が不足しています。layout.tsx のファイルを参考にして、必要なコードを持ってきます。まず import および定義としては以下のコードを最初に入れます。

```javascript:src/components/Navigation.tsx
import Link from 'next/link';
import { getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';

const publicUrl = getPublicUrl();
```

また、このファイルの最後に以下のコードを追加します。

```javascript:src/components/Navigation.tsx
export default Navigation;
```

そのままではエラーが出るため、Navigation の定義を変更します。今のコードは、

```javascript:src/components/Navigation.tsx
const Navigation = () => {
```

これを

```javascript:src/Layout.tsx
const Navigation = (): JSX.Element => {
```

と書き換えます。

## コードを追加してテストする

続いて `layout.tsx` ファイルを開いて、作成したコードを利用できるように、以下の１行を追加します。

```javascript:src/Layout.tsx
import Navitation2 from 'components/Navigation';
```

続いて、既存の Navigation のコードの下に、Navigation2 のコードを追加してください。

```javascript:src/Layout.tsx
      <VisitorIdentification />

      <Navigation />
      <Navitation2 />
```

これで、ナビゲーションが２つ表示される形となります。`jss start` で実行してページを表示すると、以下のようなページの表示となります。

![Navigation](/static/images/2022/03/Navigation01.png)

この状態で、`navigation.tsx` ファイルを編集して、GraphQL の項目を増やしてみます。結果、項目が２つ表示されるようになりました。

```javascript:src/components/Navigation.tsx
        <Link href="/styleguide">
          <a className="p-2 text-dark">{t('Styleguide')}</a>
        </Link>
        <Link href="/graphql">
          <a className="p-2 text-dark">{t('GraphQL')}</a>
        </Link>
        <Link href="/graphql">
          <a className="p-2 text-dark">{t('GraphQL')}</a>
        </Link>
```

![Navigation](/static/images/2022/03/Navigation02.png)

正しく動作していることを確認することができました。

## コードを整理する

レイアウトにある Navigation の記述がこれで不要となりました。コードを以下のように書き換えていきます。まず、Navigation のコードの部分は一括で削除してください。いくつか、Navigation が利用していた部分があるため整理をした import のコードは以下の通りです。

```javascript:src/Layout.tsx
import React from 'react';
import Head from 'next/head';
import deepEqual from 'deep-equal';
import {
  Placeholder,
  VisitorIdentification,
  withSitecoreContext,
  getPublicUrl,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideSitecoreContextValue } from 'lib/component-props';
import Navigation from 'components/Navigation';
```

またページの表示のところに関してはコードが元に戻っている形です。

```javascript:src/Layout.tsx
      <VisitorIdentification />

      <Navigation />

      {/* root placeholder for the app, which we add components to using route data */}
      <div className="container">
        <Placeholder name="jss-main" rendering={route} />
      </div>
```

ここまでの変更が反映されると、ページに表示されるメニューは下記の画像のようになります。

![Navigation](/static/images/2022/03/Navigation03.png)

## ナビゲーションのコードを変更する

既存のナビゲーションのコードですが、元々のスタイルガイドのコードをそのまま流用している形です。前回、Tailwind CSS を利用できるようにしたので、コードを以下のように全て入れ替えます。

```javascript:src/components/Navigation.tsx
import { getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs';

const publicUrl = getPublicUrl();

/* This example requires Tailwind CSS v2.0+ */
const navigation = [
  { name: 'ソリューション', href: '/solutions' },
  { name: '価格', href: '/pricing' },
  { name: 'ドキュメント', href: '/documents' },
  { name: '会社情報', href: '/about' },
];

const Navigation = (): JSX.Element => {
  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-gray-500 lg:border-none">
          <div className="flex items-center">
            <a href="#">
              <span className="sr-only">Workflow</span>
              <img className="h-10 w-auto" src={`${publicUrl}/sc_logo.svg`} alt="Sitecore" />
            </a>
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-gray-900 hover:text-indigo-700"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <a
              href="#"
              className="inline-block bg-indigo-700 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
            >
              サインイン
            </a>
            <a
              href="#"
              className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-gray-900 hover:text-indigo-700"
            >
              サインアップ
            </a>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-gray-900 hover:text-indigo-700"
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
```

ナビゲーションのコンポーネントの中身を変えただけとなりますが、CSS も適用されて綺麗にヘッダーが表示されるようになりました。

![Navigation](/static/images/2022/03/Navigation04.png)

レスポンシブルに対応しているか確認するために横幅を縮めると、以下のように表示されるので対応していることがわかります。

![Navigation](/static/images/2022/03/Navigation05.png)

## ついでにフッターも作成

ヘッダーの次にフッターを設定していきます。src/components の下に `Footer.tsx` のファイルを作成してください。コードは以下のコードをそのまま使います。

```javascript:src/components/Footer.tsx
import { getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs';

const publicUrl = getPublicUrl();

const navigation = {
  solutions: [
    { name: 'コンテンツ管理', href: '#' },
    { name: 'パーソナライズ', href: '#' },
    { name: 'コマース', href: '#' },
    { name: 'メールマーケティング', href: '#' },
  ],
  support: [
    { name: '価格', href: '#' },
    { name: 'ドキュメント', href: '#' },
    { name: 'ガイド', href: '#' },
    { name: 'API ステータス', href: '#' },
  ],
  company: [
    { name: '会社概要', href: '#' },
    { name: 'ブログ', href: '#' },
    { name: '採用情報', href: '#' },
    { name: 'ニュースリリース', href: '#' },
    { name: 'パートナー', href: '#' },
  ],
  legal: [
    { name: '問合せ', href: '#' },
    { name: 'プライバシー', href: '#' },
    { name: '使用条件', href: '#' },
  ],
};

const Footer = (): JSX.Element => {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <img className="h-10" src={`${publicUrl}/sc_logo.svg`} alt="Sitecore" />
            <p className="text-gray-500 text-base">
              Sitecore コンポーザブル DXP は顧客とのつながりを強化します
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                  ソリューション
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-gray-700 hover:text-indigo-700">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                  サポート
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-gray-700 hover:text-indigo-700">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                  会社情報
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-gray-700 hover:text-indigo-700">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                  法務情報
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-gray-700 hover:text-indigo-700">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2022 Sitecore, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

ファイルが出来上がったところで、`Layout.tsx` のファイルのインポートで作成をしたコンポーネントファイルを指定します。

```javascript:src/Layout.tsx
import Footer from 'components/Footer';
```

その後、Footer のタグをコンテンツの下に入れてください。

```javascript:src/Layout.tsx
      <Navigation />

      {/* root placeholder for the app, which we add components to using route data */}
      <div className="container">
        <Placeholder name="jss-main" rendering={route} />
      </div>

      <Footer />
```

これでフッターも完成しました。出来上がりは以下の通りです。

![Navigation](/static/images/2022/03/Navigation06.png)

## まとめ

コンテンツエリアをまだ触っていないためページの編集可能なエリアは少し表示がおかしな感じになっていますが、ヘッダー、フッターのコンポーネントを作成して別ファイルにし、表示することができました。今回はレイアウトで使うファイルでの項目を別のファイルで管理する手順を紹介しました。
