---
title: XM Cloud Deploy 環境の追加
date: '2022-11-30'
tags: ['XM Cloud', 'XM Cloud Deploy']
draft: false
summary: 前回は新しい XM Cloud のプロジェクトを作成しました。その際に環境として Development というのを作成しましたが、コード管理とどのように連携しているのでしょうか？今回は、環境について紹介をします。
images: ['/static/images/2022/11/portal01.png']
---

前回は新しい XM Cloud のプロジェクトを作成しました。その際に環境として Development というのを作成しましたが、コード管理とどのように連携しているのでしょうか？今回は、環境について紹介をします。

## 環境の確認

まず最初に、前回作成をした環境を見にいくと、development の環境が紐づいている GitHub のリポジトリが main になっていることがわかります。

![environment](/static/images/2022/11/environment01.png)

今回は開発環境を整えるということで、`development` というブランチを GitHub に作成します。まずは連携しているリポジトリを見にいくと、`main` のみが作成されているのがわかります。

![environment](/static/images/2022/11/environment02.png)

今回は `development` と環境名と合わせたブランチを `main` から作成します。

![environment](/static/images/2022/11/environment03.png)

GitHub 上で変更をしたあと、改めて XM Cloud で作成した環境の項目のメニューから `Edit environment details` を選択します。

![environment](/static/images/2022/11/environment04.png)

ダイアログが開いたあと、`Link to Branch` の項目を参照すると、main 以外に development が追加されているのがわかります。

![environment](/static/images/2022/11/environment05.png)

これを変更することで、今後はこの環境は development のブランチと連携して動作することになります。

## まとめ

今回は環境の設定に関して確認をしました。複数の CMS サーバーの環境を用意して開発をしたい、テストをしたい、といった場合に利用する機能となります。

上記の内容をダイジェストで紹介している動画を YouTube にアップしています。参考にしてください。

[![](https://img.youtube.com/vi/T_P3_XG8Fzw/0.jpg)](https://www.youtube.com/watch?v=T_P3_XG8Fzw)
