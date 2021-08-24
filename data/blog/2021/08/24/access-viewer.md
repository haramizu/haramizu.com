---
title: Sitecore 権限の確認 - アクセスビューアーの活用
date: '2021-08-24'
tags: ['Sitecore']
draft: false
summary: Sitecore のロール権限を利用してアクセス権を設定する時、そのロールでどのアイテムが参照できるのか、というのを確認するには、アクセスビューアーを利用するのが便利です。今回は、ロールを２つ作成して、どのアイテムに権限があるのか、というのを確認する手順を紹介していきます。
images: ['/static/images/2021/08/accessviewer12.png']
---

Sitecore のロール権限を利用してアクセス権を設定する時、そのロールでどのアイテムが参照できるのか、というのを確認するには、アクセスビューアーを利用するのが便利です。今回は、ロールを２つ作成して、どのアイテムに権限があるのか、というのを確認する手順を紹介していきます。

## ２つの権限を作成する

今回は２つのロールを作成したいと思います。まず２つのロールを作成するために、ロールマネージャーを立ち上げてください。

![Access Viewer](/static/images/2021/08/accessviewer01.png)

作成するルールはわかりやすく、Group A および Group B という名前にします。

![Access Viewer](/static/images/2021/08/accessviewer02.png)

２つのグループの作成ができました。

![Access Viewer](/static/images/2021/08/accessviewer03.png)

## セキュリティエディターで権限を設定する

ロールマネージャーからアクセス権の設定を変更したいロールを選択して、メニューから**セキュリティエディター**を起動します。するとどのコンテンツに対してどの権限を持っているのか、をチェックボックス形式で選択できるようになります。

![Access Viewer](/static/images/2021/08/accessviewer04.gif)

設定をした項目は以下のようになります。

Group A は Global に関しては権限がなく、Lighthouse サイトもデータを見れないようにしています。

![Access Viewer](/static/images/2021/08/accessviewer05.png)

Group B は 2 つのサイトに対して読み取り権限をつけていますが、プレゼンテーションは読めない形です。

![Access Viewer](/static/images/2021/08/accessviewer06.png)

## ユーザーを作成して、ロールに所属させる

今度はロールに所属しているユーザーを作成します。今回もわかりやすく、User A と User B というユーザーを作成します。以下の手順は User A を作成している手順となります。

![Access Viewer](/static/images/2021/08/accessviewer07.gif)

User B に関して Group B に所属する形として、同じようにアカウントを作成しました。

![Access Viewer](/static/images/2021/08/accessviewer08.png)

## アクセスビューアーで確認をする

User A および User B はロールに所属しているだけのため個別の権限を持っていません。このため、それぞれが所属している Group A および Group B の権限を確認することができます。実際に User A を選択してアクセスビューアーを開きます。

![Access Viewer](/static/images/2021/08/accessviewer09.png)

このように UserA は Group A に設定したロールが付与されていることを確認することができました。それでは User B はどうでしょうか？

![Access Viewer](/static/images/2021/08/accessviewer10.png)

グループ B の権限を引き継いでいることがわかります。

## 両方に所属するユーザーを作成する

それでは Group A と Group B に所属するユーザーを作成してみます。

![Access Viewer](/static/images/2021/08/accessviewer11.png)

これによりどのような権限設定になるでしょうか？この場合 And で設定した権限となるため、両方の見えないエリアが設定されます。

![Access Viewer](/static/images/2021/08/accessviewer12.png)

権限に関して、ロールを利用する際にはこの動きを注意して設計していく必要があります。

## まとめ

今回は、ロールで見える範囲を設定したロールを作成して、組み合わせるとどのような形となるのか、を確認してみました。そのロールで見える権限、見えない権限をどのように組み合わせていくのかに関して、権限の設定で上手に組み合わせていく必要があります。

