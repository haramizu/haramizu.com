---
title: Sitecore 権限の確認 - 権限設定のコツ
date: '2021-08-25'
tags: ['Sitecore']
draft: false
summary: 前回は、Sitecore 権限の確認 - アクセスビューアーの活用ということで、２つの権限を作成してそれぞれ異なる権利を付与、またそれをユーザーに割り当てた時にどういう形になるのか、というのを紹介しました。今回は、ロールを組み合わせて権限を設定していくコツに関して紹介をしていきます。
images: ['/static/images/2021/08/accessviewer16.png']
---

前回は、 [Sitecore 権限の確認 - アクセスビューアーの活用](/blog/2021/08/24/access-viewer) ということで、２つの権限を作成してそれぞれ異なる権利を付与、またそれをユーザーに割り当てた時にどういう形になるのか、というのを紹介しました。今回は、ロールを組み合わせて権限を設定していくコツに関して紹介をしていきます。

## アクセスできない権限の設定

前回の記事では、ロールがアクセスできない権限を設定していました。以下の２つのロールを確認してください。

![Access Viewer](/static/images/2021/08/accessviewer05.png)

![Access Viewer](/static/images/2021/08/accessviewer06.png)

この２つのロールに所属しているユーザーの権限が以下のようになります。

![Access Viewer](/static/images/2021/08/accessviewer12.png)

これにより、アクセスできないエリアを追加していく、というのはロールで管理できますが、アクセスできるエリアを追加していくにはどうすればいいでしょうか？今回はこれを紹介します。

## Everyone の権限を理解する

ロールを理解する上で、Everyone というロールを理解する必要があります。このロールは、全てのユーザーに対してデフォルトでつける権限が付与されており、ロール一覧からは参照することはできません。次の画像は、ロールマネージャーで Everyone で検索をしても表示されないことがわかります。

![Access Viewer](/static/images/2021/08/accessviewer13.png)

アクセスビューアを開いて、選択ボタンをクリック、Everyone を検索するとドメインに対する Everyone の権限が表示されます。

![Access Viewer](/static/images/2021/08/accessviewer14.gif)

すべての Sitecore ドメインのユーザーは、全部のコンテンツに対して読み取り権限が設定されていることになります。全てのコンテンツに対して読み取り権限が付いているため、前回の記事のように見えないエリアを指定すると、それが組み合わせた形で複数のロールを指定すると、見えないエリアが増えるという形になります。

## 読み取り権限をつけるロール管理

### Everyone ロールの編集

それではツリーに対して読み取り権限を付与していくための権限管理をするには、このデフォルトで設定されている読み取りが邪魔になります。今回はコンテンツツリーに対して設定をする形となるので、Home アイテムの上の Content の部分から、Everyone で持っている権限を最初に外します。手順としては、以下の通りです。

1. sitecore¥everyone を選択
2. セキュリティ エディターを開く
3. ツリーでコンテンツのトップのアイテムを選択する
4. アイテムの保護を解除する
5. メニューにあるセキュリティプリセットから、継承の削除を選択する

上記の設定が完了すると、コンテンツツリーに対して読み取り権限が外れます。

![Access Viewer](/static/images/2021/08/accessviewer15.gif)

### ２つのロール作成

続いて今回も比較をするために Group A と Group B のロールを作成します。それぞれセキュリティエディターで権限を以下のように設定しています。

![Access Viewer](/static/images/2021/08/accessviewer16.png)

![Access Viewer](/static/images/2021/08/accessviewer17.png)

違いは以下の通りです。

- Group A のみ Components の読み取り可
- Group B のみ Content の読み取り可
- Group A および B は Home、Media、Data を読み取り可
- 読み取りを設定しないアイテムは権限の継承をしないように設定する

### ユーザーにロールを割り当てる

実際に新しいテストユーザーを作成してみます。まずは Group A にのみ所属しているアカウントの作成です。

![Access Viewer](/static/images/2021/08/accessviewer18.png)

このユーザーはもちろん Group A と同じ権限を持っている形となります。

![Access Viewer](/static/images/2021/08/accessviewer19.png)

ユーザーを Group B のロールだけにすると、以下のように当然ながら Group B の権限が反映されます。

![Access Viewer](/static/images/2021/08/accessviewer20.png)

Group A と Group B に所属するとどうなるでしょうか？結果としては２つのロールでアクセスできる権限両方にアクセスできるようになります。

![Access Viewer](/static/images/2021/08/accessviewer21.gif)

このようにロール２つ組み合わせて権限を追加していくことで、アクセスできる範囲を増やしていくことができます。

## まとめ

もともと Group A でも Group B でも参照できるエリアを設定しているため（今回は Home、Media、Data はどちらのロールでも参照可）、一般的にはユーザーは１つのロールを割り当て、ロールで参照できる範囲のコンテンツを参照、編集するなどができます。一方、複数のロールに所属することで部門を超えて参照をする必要のあるユーザーのみが、多くの情報にアクセスできる、という形も設定できます。

## 参考情報

- [セキュリティ ロール](https://doc.sitecore.com/ja/developers/101/platform-administration-and-architecture/the-security-roles.html)
- [セキュリティ アカウントにアクセス権を割り当てる](https://doc.sitecore.com/ja/developers/101/platform-administration-and-architecture/assign-access-rights-to-a-security-account.html)
- [セキュリティ ドメイン](https://doc.sitecore.com/ja/developers/101/platform-administration-and-architecture/security-domains.html)
