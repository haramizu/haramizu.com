---
title: スタンダードバリュー - その３ ワークフローの設定
date: '2022-04-22'
tags: ['Sitecore', 'XM', 'Headless']
draft: false
summary: 作成をしたアイテムのワークフローをスタンダードバリューで設定することで、アイテムを作成後に指定したワークフローを利用して承認プロセスを動かすことができます。
images: ['/static/images/2022/04/workflow10.png']
---

作成をしたアイテムのワークフローをスタンダードバリューで設定することで、アイテムを作成後に指定したワークフローを利用して承認プロセスを動かすことができます。

## JSS ワークフローをオフにする

JSS インポートを実行した際に、各種アイテムにはインポートをすると上書きされる可能性に関しての警告が表示されています。警告は以下のようにアイテムに表示されています。

![Workflow](/static/images/2022/04/workflow01.png)

ワークフローを設定するにあたって、JSS のワークフローでこの表示をオフにすることが可能ですが、通常のワークフローを利用できるようにするためにも、この項目をオフにします。設定の手順は非常にシンプルで、サイトのアイテムを選択、**セキュリティ** タブにある**セキュリティプリセット**を実行する形です。

![Workflow](/static/images/2022/04/workflow02.png)

`JSS Import - No overwrite` 選択すると以下のダイアログが表示されます。

![Workflow](/static/images/2022/04/workflow03.png)

設定をした際のセキュリティの割り当てを参照しに行くと、以下のような設定が追加されています。

![Workflow](/static/images/2022/04/workflow04.png)

`JSS Import - No new children` に関しても実行をすると、セキュリティの割り当てが以下のように更新されます。

![Workflow](/static/images/2022/04/workflow05.png)

JSS インポートが出来なくなりましたが、これでワークフローの部分に表示される警告が１つ減る形となります。

## デフォルトのワークフローを設定する

今回は標準のワークフローを設定するために、**/sitecore/system/Workflows/Sample Workflow** とすでに用意されているサンプルのワークフローを利用したいと思います。

![Workflow](/static/images/2022/04/workflow06.png)

このワークフローを設定すると、初期状態として `Draft` （下書き）から始まり、承認依頼、承認が完了すると後悔となりますが、公開する時間を設定している場合は自動公開でタイマーが有効になるようになっています。

このワークフローをアイテムに設定する際には、アイテムのスタンダードバリューで設定をします。ワークフローを設定するためには、**表示** - **スタンダードフィールド**をオンにしてください。一番下の項目に、ワークフローの設定が用意されているので、Simple Workflow を選択してください。

![Workflow](/static/images/2022/04/workflow07.png)

## アイテム作成でのテスト

トップレベルで `Home Item Test` というアイテムを作成します。

![Workflow](/static/images/2022/04/workflow08.png)

アイテムのワークフローを参照すると、以下のように下書きになっていることを確認することができます。

![Workflow](/static/images/2022/04/workflow09.png)

ワークボックスを開くと、下書きにアイテムが作成されているのがわかります。

![Workflow](/static/images/2022/04/workflow10.png)

## まとめ

新しいアイテムを作成して、標準のワークフローの設定ができるようになりました。スタンダードバリューに設定することで、作成した時にそのアイテムが利用するべきワークフローが指定されている形です。実際にはワークフローが複数ある場合で、デフォルトのワークフローをここで設定しておくことで、コンテンツのタイプによってワークフローが自動的に変えることができます。

## 参考情報

- [Code-first development workflow](https://doc.sitecore.com/xp/en/developers/hd/190/sitecore-headless-development/code-first-development-workflow.html#front-end-developer-and-sitecore-developer-item-ownership)
- [デフォルトのワークフローの割り当て](https://doc.sitecore.com/xp/ja/developers/101/sitecore-experience-manager/assign-a-default-workflow.html)
