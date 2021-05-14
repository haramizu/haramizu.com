---
title: Sitecore Content Hub – ユーザー管理
date: '2020-03-16'
tags: ['Content Hub']
draft: false
summary: 今回は Sitecore Content Hub を利用するためのアカウント設定について紹介をします。アカウントの管理方法としては、Sitecore Content Hub のローカルアカウントを作成、もしくはシングルサインオンで他のシステムとも連携は可能です。
---

今回は Sitecore Content Hub を利用するためのアカウント設定について紹介をします。アカウントの管理方法としては、Sitecore Content Hub のローカルアカウントを作成、もしくはシングルサインオンで他のシステムとも連携は可能です。

## ユーザー管理ツールの利用

今回はユーザー管理の設定になるため、すべて管理画面としては「ユーザー」を利用します。ユーザーのアクセス方法は、管理アイコンを開き、ユーザーを開くことで利用できるようになります。

![ユーザーを開く](/static/images/2020/03/openuser.gif "ユーザーを開く")

## モジュール

Sitecore Content Hub では契約により利用できる機能が異なります。このためユーザーの権限に対しても、どの機能を利用することができるのかを定義することができます。

![ユーザー情報](/static/images/2020/03/userinfo.png "ユーザー情報")

上記の画面に掲載されているモジュールは、以下の機能を利用するための権限となっています。

* コンテンツ – Content Marketing Platform
* メディア – Digital Asset Management
* 製品 – Product Content Management
* プロジェクト – Marketing Resource Manager
* プリント – Web 2 Print
* Salesforce – Salesforce Marketing Cloud

上記の項目は、製品のライセンスに依存する権利となっています。それでは一般のユーザーの権限を設定することができる、ユーザーグループを参照していきます。

## ユーザーグループ

ユーザーは複数のユーザーグループに所属することができ、ユーザーグループには利用できる権限を設定する形となります。Sitecore Content Hub のユーザーグループの割当てに関しては、基本的にはユーザーの権限を追加していくという考え方となっています。

![ユーザーグループ一覧](/static/images/2020/03/usergrouplist.gif "ユーザーグループ一覧")

ここでは新しいユーザーグループを作成します。ここでは Sample User Group というグループ名を設定し、利用できる機能を「メディア」だけとします。

![ユーザーグループの作成](/static/images/2020/03/createusergroup.gif "ユーザーグループの作成")

続いて、ユーザーグループのポリシーを設定します。ポリシーの画面に切り替える際には、ユーザーグループ一覧のページに戻り、設定のアイコンをクリックします。

![](/static/images/2020/03/usergrouppolicy.gif)

![権限の編集](/static/images/2020/03/policyedit.gif "権限の編集")

なおユーザーの権限は、以下のような項目を選択することができます。

![ユーザー権限の項目](/static/images/2020/03/userpermission.png "ユーザー権限の項目")

## ユーザーをグループに割り当てる

実際に、検証用のユーザーを作成します。ここでは、Sample User というユーザーを作成し、先ほど作成したユーザーグループ Sample User Group を割り当てます。

![サンプルのユーザーを割り当てる](/static/images/2020/03/addsampleuser.gif "サンプルのユーザーを割り当てる")

## ユーザーの権限を偽装して確認

実際に作成したユーザーの権限でどういう形で参照できるのか、確認をするためにユーザーの権限を利用して切り替える「Impersonate（偽装）」をして表示します。

![ユーザーを偽装してアクセス](/static/images/2020/03/impersonate1.gif "ユーザーを偽装してアクセス")

ここでは、アセットが表示される形となりますが、アセットの詳細を見ることができません。これはアセットに対しては読取り権限はありますが、アセットの詳細のページを利用するための権限が無いためです。

## ユーザーグループに権限を追加する

改めてユーザーグループの編集画面に戻り、ポータルページ（Portal.Page）の項目を利用してルールを作成、今回は「アセットの詳細 ページ」に対して読取り権限を付与します。

![ページへのアクセス権を付与](/static/images/2020/03/addpagepermission.gif "ページへのアクセス権を付与")

## テストユーザーで検証

もう一度、テストユーザーに切り替えてアセットの詳細ページが参照できるか確認をします。

![もう一度、テストアカウントでアクセス](/static/images/2020/03/impersonate2.gif "もう一度、テストアカウントでアクセス")

アセットを検索すると、アセットの詳細ページを利用して完了しました。

## まとめ

今回はユーザーの権限の設定方法、ユーザーの権限を確認する方法を紹介しました。アセットへの権限、ページに対する権限をユーザーグループに適用することで、ユーザー個別の設定をする必要はありません。

## 関連情報

* [Sitecore Content Hub クイックガイド](/docs/Sitecore/Content-Hub-Quick-Guide)
* [Users](https://docs-partners.stylelabs.com/content/user-documentation/administration/security/users/users.html?v=3.3.0) (英語）
* [User group management](https://docs-partners.stylelabs.com/content/user-documentation/administration/security/users/user-groups/intro.html?v=3.3.0) （英語）
* [Roles and Authorization](https://docs-partners.stylelabs.com/content/user-documentation/administration/security/users/policies/intro.html?v=3.3.0) （英語）
