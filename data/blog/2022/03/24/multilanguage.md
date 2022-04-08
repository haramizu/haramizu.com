---
title: 多言語サイトのコンテンツに切り替える
date: '2022-03-24'
tags: ['Next.js', '多言語']
draft: false
summary: Next.js のテンプレートはすでに多言語対応のモジュールが入っているため、Sitecore 側の設定を追加することで比較的簡単に言語を増やすことができます。そこで今回は、日本語のリソースを追加したいと思います。
images: ['/static/images/2022/03/language13.png']
---

Next.js のテンプレートはすでに多言語対応のモジュールが入っているため、Sitecore 側の設定を追加することで比較的簡単に言語を増やすことができます。そこで今回は、日本語のリソースを追加したいと思います。

## Sitecore の言語の追加

これまでの作業で、特に作業をしていなければ英語のリソースのみで作業を進めていました。リソースの確認という点では、コンテンツエディターを開き、`/sitecore/system/Languages` の下にあるアイテムを確認すると、`en` のみがあることがわかります。

![language](/static/images/2022/03/language01.png)

日本語を追加する際には、この画面に表示されている言語のボタンをクリックするとウィザードが始まります。ここで Japanese - Japan を選択してください。

![language](/static/images/2022/03/language02.png)

英語（en)と日本語（ja-JP）が追加されれば Sitecore の設定は完了です。

## コンテンツの日本語版を用意する

デモデータとして用意されているホームアイテムの言語リソースを確認すると、日本語のデータが含まれていないためバージョンが 0 になっています。

![language](/static/images/2022/03/language03.png)

今回は以下のようにデータを入れておきます。

![language](/static/images/2022/03/language04.png)

つづいて、`/sitecore/content/sitecoredemo-jp/Components/Hero/HomeData1` の（すでに利用している Hero ）アイテムの日本語データを用意します。データは以下のような形です。

![language](/static/images/2022/03/language05.png)

せっかくですので、前回設定をした Horizon でコンポーネントを配置したいと思います。まず Horizon を立ち上げてください。ユーザーの標準言語が英語のため、以下のように表示されます。

![language](/static/images/2022/03/language06.png)

右上の言語切り替えをクリックすると、日本語が追加されています。

![language](/static/images/2022/03/language07.png)

日本語に切り替えると、ホームが表示されますが何もコンテンツが配置されていません。

![language](/static/images/2022/03/language08.png)

ここに左側の項目から Hero の部品を配置して、すでに用意しているアイテムを選択したいと思います。手順はここでは以下のような流れです。

![language](/static/images/2022/03/language09.gif)

Sitecore 側、コンテンツの準備ができました。

## プロジェクトを更新する

言語の設定に関しては、next.config.js のファイルの設定を変更するだけとなります。標準では `en` と `da-DK` が設定されています。

```javascript
  i18n: {
    // These are all the locales you want to support in your application.
    // These should generally match (or at least be a subset of) those in Sitecore.
    locales: ['en', 'da-DK'],
    // This is the locale that will be used when visiting a non-locale
    // prefixed path e.g. `/styleguide`.
    defaultLocale: packageConfig.language,
  },
```

今回はデンマーク後は利用していないため、これを日本語ということで ja-JP に変更をしてください。変更後、`jss start` でプロジェクトを実行して、localhost にアクセスすると日本語のページが表示されます。

![language](/static/images/2022/03/language10.png)

日本語のページが表示されるのは、ブラウザの言語が日本語になっているため自動的に日本語のページを表示するという動作になっているためです。参考までに、英語がロケールで一番上になっていれば、英語のコンテンツが表示されます。

![language](/static/images/2022/03/language11.png)

日本語のページでは英語をベースにしているフォントサイズだと大きいことがわかります。そこで、フォントサイズを変更しておきます。今回は h1 のフォントサイズを変更します。

```javascript:src/components/Hero.tsx
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-4xl">
              <span className="block xl">
                <Text field={props.fields.title1} />
              </span>{' '}
              <span className="block text-indigo-600 lg">
                <Text field={props.fields.title2} />
              </span>
            </h1>
```

フォントサイズを整えると、日本語でも英語でも見栄えが良くなりました。

![language](/static/images/2022/03/language12.png)

コンポーネントの更新、および言語の設定を変更したので、GitHub に対して送信をすることができます。ビルドが完了すると、以下のように日本語のページが表示されるようになりました。

![language](/static/images/2022/03/language13.png)

## まとめ

今回は Sitecore の言語設定を追加し、テンプレートに関しても日本語のリソースにも対応するようにしました。これにより、Sitecore で同じレイアウトを利用しながら多言語のコンテンツ管理が可能となりました。
