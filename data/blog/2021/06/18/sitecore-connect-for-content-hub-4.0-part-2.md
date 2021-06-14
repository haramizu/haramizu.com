---
title: Sitecore Connect for Content Hub - CMP 設定編
date: '2021-06-18'
lastmod: '2021-06-18'
tags: ['Sitecore','Demo','Content Hub']
draft: falsed
summary: 前回、Sitecore Connect for Content Hub のインストールを実施しました。インストール、設定が完了すると、デジタルアセット管理との連携まではスムーズに進みます。今回は、コンテンツマーケティングプラットフォームとの連携について少し深掘りをします。
images: ['/static/images/2021/06/storefront07.png']
---

前回、Sitecore Connect for Content Hub のインストールを実施しました。インストール、設定が完了すると、デジタルアセット管理との連携まではスムーズに進みます。今回は、コンテンツマーケティングプラットフォームとの連携について少し深掘りをします。

## Microsoft Azure での準備

Sitecore Content Hub CMP と Sitecore CMS を連携させるにあたって、Microsoft Azure の Azure Service Bus を利用して連携をします。まずは、Service Bus を作成します。

![cmpinstall](/static/images/2021/06/chcmp01.png)

作成をする際には、価格レベルに関しては Standard をしてください。

![cmpinstall](/static/images/2021/06/chcmp02.png)

左側のメニューのうち、トピックを選択して、名前を **hub_out** を選択して作成してください。

![cmpinstall](/static/images/2021/06/chcmp03.png)

作成したトピックの中に、Sitecore というサブスクリプションを作成してください。今回は **Sitecore** とします。

![cmpinstall](/static/images/2021/06/chcmp04.png)

続いて、共有アクセスポリシーを作成します。hub_out のトピックの左側のメニューにある、共有アクセスポリシーをクリックします。追加、を選択して、必要な項目を選択してください。

![cmpinstall](/static/images/2021/06/chcmp05.png)

これで Azure Service Bus の最初の設定が完了しました。

## Sitecore Content Hub CMP の設定

### アカウントの作成

まず、コネクタで利用するシステム連携のアカウントを作成します。

![cmpinstall](/static/images/2021/06/chcmp06.png)

ユーザーにはグループメンバーシップとして、Supeusers を適用します。

![cmpinstall](/static/images/2021/06/chcmp07.png)


アカウントの作成をしたあと、プロファイルの編集を選択、メールアドレスを設定します。

![cmpinstall](/static/images/2021/06/chcmp08.png)

メールアドレスを設定したあと、**パスワードのリセット** をクリックすると、パスワードリセットのメールを受け取ることができます。

![cmpinstall](/static/images/2021/06/chcmp09.png)

パスワードをリセットしたあと、ログインができるか確認をします。ログインができれば、Sitecore Content Hub のアカウントができました。

### アクションの作成

続いて事前に作成をしておいた Azure Service Bus との接続を作成していきます。管理画面のアクションで新規アクションを作成します。入力項目は以下の通りです。

| 設定項目 | 設定値 |
|-|-|
| 名前 | Demo - CMP 2 Sitecore Action |
| ラベル |  |
| 形式 | Azure Service Bus |
| 接続文字列 | （後述） |
| 送信タイプ | トピック |
| 送信先 | hub_out |

接続文字列に関しては、hub_out の共有アクセスポリシーを作成していると思いますので、それを選択すると次の様な画面になります。

![cmpinstall](/static/images/2021/06/chcmp10.png)

プライマリ接続文字列を設定してください。実際に全てを入力したのが以下の画面です。**テスト接続** のボタンをクリックして、テストがパスすることを確認してください。

![cmpinstall](/static/images/2021/06/chcmp11.png)

### トリガーの作成

今度はトリガーの作成をおこないます。管理画面からトリガーを開き、新規トリガーの作成を進めます。まず最初の画面では以下のように設定をしてください。

| 設定項目 | 設定値 |
|-|-|
| 名前 | Demo - CMP 2 Sitecore Trigger |
| 目的 | エンティティの変更 |
| 実行タイプ | バックグラウンドで |

![cmpinstall](/static/images/2021/06/chcmp12.png)

続いて**条件**のタブに切り替えます。ここでは、M.Content に対する変更をトリガーとし、Published のステータスに変わった際にトリガーが動く様にします。ということで、以下の様な設定となります。

![cmpinstall](/static/images/2021/06/chcmp13.png)

最後にアクションのタブに切り替えて、先ほど作成をしたアクションを選択します。

![cmpinstall](/static/images/2021/06/chcmp14.png)

全て設定が完了したら、保存して閉じるをクリックします。するとトリガーを有効にするかどうかの確認が表示されます。

![cmpinstall](/static/images/2021/06/chcmp15.png)

有効にすることで、Sitecore Content Hub CMP 側の設定が完了となります。

## Sitecore の設定

### ConnectionStrings.config の設定

前回の Sitecore Content Hub DAM の設定の際に、ConnectionStrings.config の設定として以下の項目が決まっていませんでした。

```xml
<add name="CMP.ContentHub" connectionString="ClientId={client_id};ClientSecret={client_secret};UserName={username};Password={password};URI={uri};" />
<add name="CMP.ServiceBusEntityPathIn" connectionString="{Azure Service Bus connection string with incoming topic}" />
<add name="CMP.ServiceBusSubscription" connectionString="{Subscription name}" />
<add name="CMP.ServiceBusEntityPathOut" connectionString="{Azure Service Bus connection string with outcoming topic}" />
```

以下の項目を設定していきます。

| 設定項目 | 設定値 |
|-|-|
| Client Id | LogicApp |
| Client Secret | （後述） |
| ユーザー名 | 作成した管理者名 |
| Password | 作成した管理者のパスワード |
| Content Hub URI | Content Hub のサーバー URL |
| Connection String | Service Bus の Endpont |
| Incoming topic name | hub_out |
| Incoming subscription name | sitecore |

Client Seacret に関しては、Sitecore Content Hub の管理画面、**Oauth クライアント**を開きます。すると、LogicApp の設定を参照できます。

![cmpinstall](/static/images/2021/06/chcmp16.png)

### テンプレートの作成

CMP から提供されるアイテムを保存するために、/sitecore/content/CMP の直下にバケットを作成します。今回は Blog とします。

![cmpinstall](/static/images/2021/06/chcmp17.png)

続いてこのアイテムのテンプレートを作成します。テンプレートの /sitecore/templates/User Defined の直下で Blog テンプレートを作ります。今回は、タイトル（１行テキスト）と本文（複数行テキスト）のフィールドを作成しました。

![cmpinstall](/static/images/2021/06/chcmp18.png)

続いて作成中のテンプレートのタブで**コンテンツ**を選択します。CMP のテンプレート一覧にある Content Hub Entity を選択してください。

![cmpinstall](/static/images/2021/06/chcmp19.png)

表示タブを選択して、**スタンダードフィールド**および**バケット**をチェックしてください。

![cmpinstall](/static/images/2021/06/chcmp20.png)

メニューのビルダーオプションを選択して、スタンダードバリューをクリックします。

![cmpinstall](/static/images/2021/06/chcmp21.png)

アイテムバケットの設定項目で、**バケット化を許可**をチェックします。

![cmpinstall](/static/images/2021/06/chcmp22.png)

保存をしてテンプレートが完成しました。

### エンティティマッピング

続いて Sitecore Content Hub CMP で定義しているフィールドと Sitecore のテンプレートのフィールドのマッピングをします。/sitecore/system/Modules/CMP/Config のアイテムを右クリックして、Entity Mapping のアイテムの作成を開始します。

![cmpinstall](/static/images/2021/06/chcmp23.png)

今回は **Blog** としてアイテムを作成します。設定をする項目は以下の通りです。

EntityTypeSchema は、Content Hub のタクソノミーにあるコンテンツタイプの識別子を利用してください。

![cmpinstall](/static/images/2021/06/chcmp24.png)

バケットは事前に作ったバケットのアイテムを、テンプレートも事前に作成をしたテンプレートを指定します。最後の項目はアイテム名に関する定義となります。今回は、仕上がりはこんな形です。

![cmpinstall](/static/images/2021/06/chcmp25.png)

続いて、フィールドを指定していきます。

