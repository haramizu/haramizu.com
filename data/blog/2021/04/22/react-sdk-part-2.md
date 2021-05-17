---
title: Sitecore JSS - React SDK を利用してサンプルサイトを構築 - Part.2
date: '2021-04-22'
tags: ['JSS', 'React']
draft: false
summary: 前回は JSS のサンプルアプリとして提供されている React のアプリを起動、Sitecore に React アプリの展開という手順を紹介しました。今回は、サンプルデータの削除、日本語データの追加という手順を紹介します。
images: ['/static/images/2021/04/reactsample19.png']
---

前回は JSS のサンプルアプリとして提供されている React のアプリを起動、Sitecore に React アプリの展開という手順を紹介しました。今回は、サンプルデータの削除、日本語データの追加という手順を紹介します。

## はじめに

前回の記事で全て実行した場合は、サンプルのデータがインポートされている状況です。今回は、クリーンな JSS サイトに対してデータをインポートするにあたって、サンプルアプリから不要なデータを削除した後の環境を新たに展開しています。接続する手順に関しては[前回](/blog/2021/04/21/react-sdk-part-1) の記事が参考になります。

## サンプルデータの削除

React のサンプルには、JSS の開発をするためのスタイルガイドが展開されています。トップページに掲載されている以下の内容が該当します。

### ファイルを削除していく

![reactsample](/static/images/2021/04/reactsample01.png "reactsample")

記載されている情報に合わせて、削除していきます。まず、src/components/ の配下にある Styleguide* および GraphQL* を削除すると ContentBlock のみが残ります。

![reactsample](/static/images/2021/04/reactsample02.png "reactsample")

続いて /sitecore/definitions/components の配下にある Styleguide** および GraphQL* を削除します。今回も、ContentBlock.sitecore.js のみが残ります。

![reactsample](/static/images/2021/04/reactsample03.png "reactsample")

次は /sitecore/definitions/templates/ の配下にある Styleguide** を削除します。template のフォルダは空っぽになります。

![reactsample](/static/images/2021/04/reactsample04.png "reactsample")

次は、 /data/component-content/Styleguide のフォルダごと削除します。：

![reactsample](/static/images/2021/04/reactsample05.png "reactsample")

コンテンツとなるデータが入っている /data/component-content/Styleguide を削除します。content のフォルダも空っぽになります。

![reactsample](/static/images/2021/04/reactsample06.png "reactsample")
 
最後に、/data/routes/ の下にある styleguide および　graphql のディレクトリをコンテンツごと削除します。

![reactsample](/static/images/2021/04/reactsample07.png "reactsample")

ディクショナリーのデータもサンプルでは紹介されていますが、今回はこれは残しておきます。

### 実際に起動して確認をする

一通りデータを削除した後に改めて **jss start** で動作するかどうか確認をします。実際のページの右上にある Styleguide などのリンクをクリックしてもエラーになるのは、データを削除したためであり、今回はエラーのままで進めていきます。

### Sitecore にインポートをする

データを削除したので、アイテムをインポートしていきます。コマンドは以下の通りです。

```
jss deploy items -c -d
```

インポートが完了すると、前回と違ってツリーがシンプルになっています。

![reactsample](/static/images/2021/04/reactsample08.png "reactsample")

### レイアウトデータをインポートする

アイテムデータがインポートできたので、次はレイアウトに関するデータをインポートします。まず、JSS アプリの Build を実行します。

```
jss build
```

このコマンドを実行したあと、build フォルダが作成されて、ファイルが生成されています。

![reactsample](/static/images/2021/04/reactsample09.png "reactsample")

続いて、JSS サイトで設定されているファイルシステムパスを確認します。

![reactsample](/static/images/2021/04/jsstenant18.png "reactsample")

上記で指定されているパスに、build の中にあるファイルをすべてコピーしてください。

![jss tenant](/static/images/2021/04/reactsample10.png "jss tenant")

最小限のデータとなった react-app を展開することができました。エクスペリエンスエディターでも開くか、確認をしてください。

![jss tenant](/static/images/2021/04/reactsample11.png "jss tenant")
　
## 日本語をコンテンツ

サンプルは英語とデンマーク語のコンテンツが入っているので、今回は日本語のコンテンツを作成してインポートしたいと思います。

### 環境の確認

システムの言語として、ja-JP が追加されているか確認をしてください。

![jss tenant](/static/images/2021/04/reactsample12.png "jss tenant")

言語の設定がない場合は、以下の手順で追加できます。

1. コントロールパネルを開く
2. グローバリゼーション - システムに言語を追加する
3. Japanese (Japan) : 日本語（日本）を選択してシステムに追加します。

![jss tenant](/static/images/2021/04/reactsample13.png "jss tenant")

### 日本語のファイルを作成する

今回は手っ取り早く、サンプルで入っているファイルをコピーして作成します。

対象となるファイルは data/routes/en.yml を利用して data/routes/ja-JP.yml を作成します（ja は小文字、JP は大文字）。

作成したファイルに関して、以下の2行を id: の下に追加します。

```
name: home
displayName: ホーム
```

![jss tenant](/static/images/2021/04/reactsample14.png "jss tenant")

**Welcome to Sitecore JSS** と記載されているコンテンツを **ようこそ Sitecore JSS** に書き換えます。

![jss tenant](/static/images/2021/04/reactsample15.png "jss tenant")

### 設定ファイルを変更する

JSS のデフォルトの言語は英語になっているため、これを日本語に変更します。

package.json のファイルに language の項目がありますので、これを ja-JP に変更します。

![jss tenant](/static/images/2021/04/reactsample16.png "jss tenant")

続いて、sitecore/config/appname.conifg の site に language の項目を追加してください。

![jss tenant](/static/images/2021/04/reactsample17.png "jss tenant")

### 変更を確認する

日本語のコンテンツが表示できるかを確認するために、現在のサイトをローカルで開きます。

```
jss start
```

作成した ja-JP.yaml ファイルのコンテンツが表示されれば、日本語データの追加が完了となります。

![jss tenant](/static/images/2021/04/reactsample18.png "jss tenant")

### コンテンツを Sitecore に同期する

日本語のデータを Sitecore にアップロードするために、以下のコマンドを実行します。

```
jss deploy items -c -d
```

今回は特にレイアウトは変更していないため、build のプロセスは省略します。インポートが完了したあと、Sitecore のアイテムを確認します。

![jss tenant](/static/images/2021/04/reactsample19.png "jss tenant")

アイテムに日本語のデータが追加されていれば、Home のアイテム、およびその下のアイテムに日本語のデータが含まれているのがわかります。

## まとめ

今回はサンプルの JSS アプリのスリム化、そして日本語を扱える様に変更をしました。次回は何気なしに動かしている JSS アプリの動作モードに関して紹介をします。
