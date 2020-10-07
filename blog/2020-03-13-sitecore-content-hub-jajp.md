---
slug: 2020/03/13/sitecore-content-hub-jajp
title: Sitecore Content Hub – 日本語リソースの追加
author: Shinichi Haramizu
author_title: Sitecore Japan
author_url: https://www.haramizu.jp/
author_image_url: https://avatars3.githubusercontent.com/u/5026348?s=400&v=4
tags: [Content Hub]
description: 今回は Sitecore Content Hub の管理画面に関する手順を紹介します。Sitecore Content Hub は管理画面として、英語のユーザーインターフェイスを提供しています。今回は、日本語のユーザーインターフェイスを追加する手順を紹介します。
---

今回は Sitecore Content Hub の管理画面に関する手順を紹介します。Sitecore Content Hub は管理画面として、英語のユーザーインターフェイスを提供しています。今回は、日本語のユーザーインターフェイスを追加する手順を紹介します。

<!--truncate-->

## 言語の追加
Sitecore Content Hub の新しいインスタンスを立ち上げると、以下のように英語のユーザーインターフェイスになっています。

![標準の管理画面](../static/img/blog/2020/03/sitecorecontenthub-default.png "標準の管理画面")

言語の追加に関しては、管理画面で実行することができます。右上にあるアイコンの右から2つ目のアイコンをクリックすることで、管理画面に移動することができます。

![管理画面](../static/img/blog/2020/03/manageenglish.png "管理画面")


言語の追加は「Portal Language」のツールになります。アイコンから選択するのもよいですが、上の検索ボックスを利用すると素早く見つけることができます。

![Portal Language を選択](../static/img/blog/2020/03/portal.gif "Portal Language を選択")

右上にある Portal Language のボタンをクリックして、 ja-JP の定義を追加します。

![ja-JP の追加](../static/img/blog/2020/03/addlang.gif "ja-JP の追加")

これで言語の追加手順は完了しました。

## リソースの追加
続いて日本語リソースを追加します。日本語のリソースファイルは Excel のファイル形式で提供しており、１つのファイルをインポートすることで、日本語の管理画面に切り替わります。

言語リソースの管理に関しては、管理画面にある Translation を選択します。

![Translation を追加](../static/img/blog/2020/03/translationui.gif "Translation を追加")


Translation の画面の右上に、Import / Export のボタンがあります。今回は Import をクリックして、Excel のリソースファイルをインポートします。

![言語リソースの追加](../static/img/blog/2020/03/jajpimport.gif "言語リソースの追加")

リソースの追加の実行状況に関しては、ユーザーの Jobs から確認することができます。

![Jobs でインポートの状況を確認する](../static/img/blog/2020/03/importjobs.gif "Jobs でインポートの状況を確認する")

インポートが完了したあとは、次のステップに進んでください。

![インポートが完了しました](../static/img/blog/2020/03/jobcomplete.gif "インポートが完了しました")

## キャッシュをクリアする

インポートしたリソースは随時反映されますが、キャッシュをクリアすることで即時反映させることができます。日頃の運用ではあまり利用しませんが、UI の変更やリソースの変更をした際には、キャッシュのクリアですぐに確認ができます。

手順は非常に簡単で、管理画面にある「Cache」ツールを起動して、クリアを実行するだけです。今回はすべてのキャッシュをクリアしました。

![Clear all を実行](../static/img/blog/2020/03/cacheclear.gif "Clear all を実行")

## 言語を切り替える
管理画面の言語に関しては、ユーザーが選択することができます。今回、日本語を追加したことで、言語選択のダイアログに日本語が追加されました。追加方法は、右上にあるプロファイルのアイコンをクリックして、「Change Language」をクリック、日本語を選択するだけです。

![言語の切り替え](../static/img/blog/2020/03/changelanguage.gif "言語の切り替え")

## まとめ

以上の手順で、Sitecore Content Hub の管理画面において、日本語を使うことができるようになりました。同様に他の言語のリソースを作成、インポートすることで、Sitecore Content Hub の管理画面を多言語で利用できるように拡張することができます。

## 関連情報

* [Sitecore Content Hub クイックガイド](/docs/Sitecore/Content-Hub-Quick-Guide)