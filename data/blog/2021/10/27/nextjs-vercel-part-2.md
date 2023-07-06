---
title: Sitecore ヘッドレス と Next.js でサイト構築 - 空プロジェクトの作成
date: '2021-10-27'
tags: ['JSS','Next.js','Headless']
draft: true
summary: 前回は Sitecore のインスタンスの設定および Vercel での動作まで進めました。今回は立ち上げたサンプルのサイトに関して、すでに入っているコンテンツの整理、またそれを表示するために定義されている内容などを削除して、空っぽのプロジェクトまで仕上げていきます。
images: ['/static/images/2021/10/nextjs202.png']
---

前回は Sitecore のインスタンスの設定および Vercel での動作まで進めました。今回は立ち上げたサンプルのサイトに関して、すでに入っているコンテンツの整理、またそれを表示するために定義されている内容などを削除して、空っぽのプロジェクトまで仕上げていきます。

## サンプルデータの削除

サンプルのデータを削除するための手順は、 **jss start** を実行してサイトを表示したページに記載されています。

![nextjs2](/static/images/2021/10/nextjs201.png)

このページのファイルは **/data/routes/en.yml** となり、該当するコードは以下の通りです。

```xml
<div class="alert alert-dark">
<h4>How to start with an empty app</h4>
<p>To remove all of the default sample content (the Styleguide and GraphQL routes) and start out with an empty JSS app:</p>
<ol>
    <li>Delete <code>/src/components/Styleguide*</code> and <code>/src/components/GraphQL*</code></li>
    <li>Delete <code>/sitecore/definitions/components/Styleguide*</code>, <code>/sitecore/definitions/templates/Styleguide*</code>, and <code>/sitecore/definitions/components/GraphQL*</code></li>
    <li>Delete <code>/data/component-content/Styleguide</code></li>
    <li>Delete <code>/data/content/Styleguide</code></li>
    <li>Delete <code>/data/routes/styleguide</code> and <code>/data/routes/graphql</code></li>
    <li>Delete <code>/data/dictionary/*.yml</code></li>
</ol>
</div>
```

この手順に沿ってファイルを削除していきますが、上記のままだとエラーになるので、エラーにならない手順を記載しておきます。

1. **/src/components/** のフォルダに含まれる Styleguide および fields を削除します。
2. **/src/components/** のフォルダに含まれる GraphQL のうち、GraphQL-ConnectedDemo.graphql のファイルを除いて削除します
3. **/sitecore/definitions/components** のフォルダの中にある Styleguide、 GraphQL および fields のフォルダを削除
4. **/sitecore/definitions/templates/** のフォルダごと削除
5. **/data/component-content** のフォルダを削除
6. **/data/content** のフォルダを削除
7. **/data/routes/** のフォルダにある styleguide と graphql フォルダの削除

今回は辞書に関してはそのままにしておきます。

続いてトップページのコンテンツの調整をします。 /data/routes/en.yml のファイルでサンプルデータへのリンクが多いため、

```html
<h3><a href="/styleguide">Styleguide</a></h3>
```

よりも下のコードを削除します。これで削除したデータへのリンクが削除されることになります。この段階で、 jss start を実行すると、以下のようにデータが消えたサイトになります。右上のグローバルナビゲーションにまだリンクがありませんが、取り急ぎここはそのままとしてきます。

![nextjs2](/static/images/2021/10/nextjs202.png)

## プロジェクトに合わせた名前に変更する

サンプルのソースコードでは、コンポーネント名に関して StyleguideComponentProps を継承して動いています。プロジェクトに合わせて、 **Styleguide** と記載されているところを **Nextjsdemo** に変更していきます。

* /src/components/ContentBlock.tsx
    * StyleguideComponentProps を NextjsdemoComponentProps に変更（2箇所）
* /src/Layout.tsx
    * StyleguideSitecoreContextValue を　NextjsdemoSitecoreContextValue（2箇所） 
* /src/lib/component-props.ts
    * StyleguideComponentProps を NextjsdemoComponentProps に変更（2箇所）
    * StyleguideSitecoreContextValue を　NextjsdemoSitecoreContextValue（2箇所）
    * StyleguideSpecimenFields を NextjsdemoSpecimenFields に変更（１箇所）
    * StyleguideComponentWithContextProps を NextjsdemoComponentWithContextProps に変更（１箇所）
* /scripts/templates/component-src.ts
    * StyleguideComponentProps を NextjsdemoComponentProps に変更（2箇所）
* /src/pages/[[...path]].tsx
    * StyleguideSitecoreContextValue を　NextjsdemoSitecoreContextValue（3箇所）

複数のファイルがありますが、Visual Studio Code で一括で変更をするとすぐに終わります。

* StyleguideComponentProps を NextjsdemoComponentProps に変更（6箇所）
* StyleguideSitecoreContextValue を　NextjsdemoSitecoreContextValue（7箇所） 
* StyleguideSpecimenFields を NextjsdemoSpecimenFields に変更（１箇所）
* StyleguideComponentWithContextProps を NextjsdemoComponentWithContextProps に変更（１箇所）

仕上がりとして、GitHub にアップしておきました。Part-02 のブランチが該当するコードになります。

* [GitHub - haramizu / nextjssxample](https://github.com/haramizu/nextjssample/tree/part-02)

すでに一度 Sitecore に展開している場合は、一度サイトごと削除してもう一度 jss deploy items -c -d を実行すると、この空っぽのテンプレートを展開することになります。

## まとめ

色々とサンプルのコードが入っていますが、 Sitecore の JSS リポジトリにアクセスすると、いつでもソースコードを確認できますので、手元の環境としては一度クリーンナップしておき、作業をしていく形とします。

* [GitHub - Sitecore / jss](https://github.com/Sitecore/jss/tree/dev/samples/nextjs)

## 関連記事

* [環境の構築](/blog/2021/09/09/nextjs-vercel-part-1)
