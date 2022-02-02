---
title: Next.js のサンプルデータが含まれないプロジェクトの作成
date: '2021-12-22'
tags: ['Sitecore','Headless']
draft: false
summary: サイトコアの新しいバージョンとなる 10.2 のリリースに合わせて Sitecore Headless Services のバージョンも 19.0.0 に変わりました。この際、Next.js のサンプルデータが入っていないプロジェクトの作成の手順が追加されました。毎回最初のステップでデータを削除するところを省略できるので、今回はこれについて紹介をします。
images: ['/static/images/2021/12/nextjs01.png']
---

サイトコアの新しいバージョンとなる 10.2 のリリースに合わせて Sitecore Headless Services のバージョンも 19.0.0 に変わりました。この際、Next.js のサンプルデータが入っていないプロジェクトの作成の手順が追加されました。毎回最初のステップでデータを削除するところを省略できるので、今回はこれについて紹介をします。

## jss のコマンドのバージョンに関して

コマンドを最新版にアップデートをする必要があります。バージョンの確認をすると以下のように結果が表示されました。

```bash
github % jss --version
JSS CLI is running in global mode because it was not installed in the local node_modules folder.
19.0.0
```

19.0.0 のコマンドがインストールされていることがわかります。

## Next.js のプロジェクトを作成する

まずはこれまでと同じように、プロジェクトを作成します。

```
jss create nextjs.test nextjs
```

作成が完了すると、以下のようなメッセージが表示されています。

![nextjs](/static/images/2021/12/nextjs01.png)

最後に表示されている Next.js sample app のパラメーターに説明が記載されています。

```
* --fetchWith {REST|GraphQL} : Specifies how Sitecore data (layout, dictionary) is fetched. Default is REST.
* --prerender {SSG|SSR} : Specifies the Next.js pre-rendering form for the optional catch-all route. Default is SSG.
* --empty {true|false} : Specifies whether the sample should be empty. Disconnected mode and styleguide components will be removed. Default is false.
```

3つ目の --empty を利用するとサンプルデータが削除された形で実装される形となる点が紹介されています。ということで、改めて今回は以下のようにパラメーターをつけてプロジェクトを作成します。

```
jss create nextjs.demo nextjs --empty
```

作成した新しいディレクトリには、/src/components の配下が空っぽになっているのがわかります。同様にトップレベルで /data のディレクトリもありません。

![nextjs](/static/images/2021/12/nextjs02.png)

実際に動かすにはデータおよびコンポーネントを追加していく必要があります。

## まとめ

ヘッドレスで作成しているサイトに関して、新しいバージョンに対応して動かすという際には、この空っぽのテンプレートに必要なデータを移行していくという手順が可能となります。この機能は先々便利な機能として利用できそうです。

## 参考ページ

* [Release 19.0.0](https://github.com/Sitecore/jss/releases/tag/v19.0.0)