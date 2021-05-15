---
title: Sitecore Content Hub タクソノミー - 自動タグの翻訳連携を実装する - 前編
date: '2021-01-18'
tags: ['Content Hub']
draft: false
summary: Sitecore Content Hub で便利な機能として、アセットのタグ付けを自動的に実行する Cognitive Service 連携の機能があります。このタグに関しては標準で英語のタグを紐づける動きをします。この実装に関しては、2回に分けて紹介をします。今回は前編として、Azure のリソースの作成、および Content Hub のアクション、トリガーの作成まで紹介します。
---

Sitecore Content Hub で便利な機能として、アセットのタグ付けを自動的に実行する Cognitive Service 連携の機能があります。このタグに関しては標準で英語のタグを紐づける動きをします。この実装に関しては、2回に分けて紹介をします。今回は前編として、Azure のリソースの作成、および Content Hub のアクション、トリガーの作成まで紹介します。

## Sitecore AI - 画像分析について

Sitecore Content Hub に実装されている画像分析ですが、Microsoft Azure の Cognitive Service で提供している画像分析の機能と連携するようになっています。

この機能を利用するために標準機能として実装されているのは、アセットタイプを指定した時に、自動的に分析させてタグ付けを設定する、という機能があります。この設定を確認するためには、管理画面から「タクソノミー」ー「M.AssetType」を選択して、アセットタイプ一覧から任意のアセットタイプを選択してください。デモサイトであれば、ソーシャルメディアアセットの設定を見ると、トリガービジョンの項目にチェックが入っています。

![triggervision](/static/images/2021/01/triggervision.png "triggervision")

## タグの翻訳のプロセスに関して

新しくタグが生成される際に、英語の単語を取得して、それを機械翻訳で日本語にして、該当するタグにの日本語リソースに反映させる、という処理を今回開発をします。開発の際にはトリガーを利用して、新しいタグが生成された事前に指定されているアクションを実行、結果が反映されるという形です。

外部で処理をする部分に関して、今回は Microsoft Azure を利用します。これは、Sitecore Content Hub のアクションが Service Bus にメッセージを送る機能を標準で提供しているため、そのメッセージを Logic App が処理をして翻訳をして元のデータに反映させる、という処理を作成します。

スクリプトを開発して API で処理をすることも可能ですが、このカスタマイズの形は汎用性が高いので、今回は Logic App を利用した処理を紹介します。

## Microsoft Azure での処理

今回は初めて作成する Logic App のサンプルになりますので、リソースグループの作成からスタートします。

### リソースグループを作成する

Microsoft Azure ポータルにアクセスをして、リソースグループを選択、作成の画面に移動します。

![resourcegroup](/static/images/2021/01/resourcegroup.png "resourcegroup")

今回はリソースグループ名を contenthubdemo として作成します。サブスクリプションは Visual Studio Enterprise についている無料のプランを選択してみました。

リソースグループが出来上がると、以下の様にリソースが空っぽの物が出来上がります。

![resourcegroup](/static/images/2021/01/newresourcegroup.png "resourcegroup")

### Service Bus を準備する

#### Service Bus の作成

Sitecore Content Hub のアクションが提供するメッセージを処理するための Message Bus の準備をします。上記で作成した新しいリソースグループの中に **追加** のボタンがありますので、これをクリックしてください。

![servicebus1](/static/images/2021/01/servicebus1.png "servicebus1")

新しいリソースのタイプを選択することになりますので、検索ボックスに Service Bus を入力すると候補が表示されます。

![servicebus2](/static/images/2021/01/servicebus2.png "servicebus2")

選択をすると画面が切り替わり、以下の様に新しい Service Bus の作成画面となります。

![servicebus3](/static/images/2021/01/servicebus3.png "servicebus3")

**作成** をクリックして、名前空間の作成に入ります。サブスクリプション、リソースグループはすでに作業中のものが反映されており、名前空間の名前、場所、価格レベルの設定となります。価格レベルは Standard を選択する必要があります。

![servicebus4](/static/images/2021/01/servicebus4.png "servicebus4")

項目の入力が完了したあと、確認及び作成、作成を実行して Service Bus の作成を完了させます。

![servicebus5](/static/images/2021/01/servicebus5.png "servicebus5")

#### トピックの作成

Sitecore Content Hub のアクションから送信されるメッセージはトピックとして処理をしているため、その受け口となるトピックの準備をします。

作成した Service Bus を開き、メニューに表示されている **エンティティ** の中にある **トピック** を開きます。今回は作成して間もないため、トピックに関しての定義はありません。

![topictag1](/static/images/2021/01/topictag1.png "topictag1")

上の画面の **トピック** を追加する項目をクリックして、新しいトピックを作成します。今回は **m_trans** として作成します。

![topictag2](/static/images/2021/01/topictag2.png "topictag2")

作成したトピックが一覧に表示されます。

![topictag3](/static/images/2021/01/topictag3.png "topictag3")

名前をクリックすると以下の画面になります。

![topictag4](/static/images/2021/01/topictag4.png "topictag4")

サブスクリプションの設定を追加するために、左側のメニューにある **エンティティ** - **サブスクリプション** をクリックしてください。

![topictag5](/static/images/2021/01/topictag5.png "topictag5")

サブスクリプションが空欄になっているので、*結果なし* の上にある**サブスクリプション**をクリックして追加します。入力する項目は、名前に **sitecore** を、最大配信数は **10** と今回は設定しておきます。

![topictag6](/static/images/2021/01/topictag6.png "topictag6")

作成をクリックすることで、Service Bus の設定に関して完了しました。

### Microsoft Translator の追加

今回は翻訳処理として、Microsoft Translator を利用します。すでに Microsoft Transalator のリソースを持っている場合はこの作業をスキップすることは可能です。

翻訳の処理をするために、リソースグループに Microsoft Translator のリソースを追加しておきます。Service Bus を選択したのと同様に、リソースグループで **追加** をクリックして、Translator のキーワードで検索します。

![translator1](/static/images/2021/01/translator1.png "translator1")

Translator をクリックするとリソースの説明画面となります。この画面に表示されている作成をクリックしてください。

![translator2](/static/images/2021/01/translator2.png "translator2")

作成画面では、リソースのリージョン、名前と価格レベルを選択できます。デモ程度であれば価格レベルは Free で大丈夫です。なお、Free を選択できるのはサブスクリプションごとに１つまでという制限がありますのでご注意ください。またリージョンに関してはグローバルを選択してください。このため、今回は以下の設定で作成します。

![translator3](/static/images/2021/01/translator3.png "translator3")

これで処理が完了しました。作成されているリソースは２つ準備ができている形です。

![resourcegroup2](/static/images/2021/01/resourcegroup2.png "resourcegroup2")

## トリガーとアクションの作成

ここでは Sitecore Content Hub で動作するトリガーに関して紹介をします。なお、トリガーだけのパッケージを https://github.com/SitecoreJapan/ContentHub.Demo/tree/main/Packages に用意しており、今回のパッケージは TaxonomyAutoTranslateJA-346.zip が対象となります。以下は手作業で作成をするための手順書です。

### アクションの作成

今回準備した Service Bus に繋げるためのアクションを作成します。アクションの作成は、管理画面から**アクション**を選択してください。

![action1](/static/images/2021/01/action1.png "action1")

アクションの管理画面にある新規アクションをクリックするとアクションの設定画面となります。

![action2](/static/images/2021/01/action2.png "action2")

アクションを作成するためには以下の項目を入力していきます。

| 項目名 | 役割 | 例 |
|-|-|-|
| 名前 | アクションの名前 | Demo - AutoTag |
| ラベル | アクションの概要 |  |
| 型式 | アクションの動作を選択  | Azure Service Bus |
| 接続文字列 | Service Bus の URL | 後述 |
| 送信タイプ | トピックもしくはキュー | トピック |
| 送信先 | トピックの名前 | m_trans |

接続文字列には、Azure で作成した Service Bus の URL を入力します。この URL は今回はデモ用ですので以下の手順で取得します。

1. Service Bus の設定画面にアクセス
2. **設定**の**共有アクセスポリシー**を選択
3. 一覧に表示されるポリシーを選択
4. 表示される項目の中から、**プライマリ接続文字列**のクリップボードボタンを押す
5. アクションの**接続文字列**にペーストする

上記の項目全ての入力が完了したタイミングで、接続テストを実行してください。接続成功となれば、初期設定は完了です。

![action3](/static/images/2021/01/action4.gif "action3")

ここで保存をして必要な項目を別途準備します。

### トークンの取得

今回は Logic App で処理をするために、Logic App が Web サービス経由でアクセスする必要があります。その際に必要となるのが、トークンになります。トークンの作成方法は以下の通りです。

1. 管理画面のユーザーを開く
2. 新しいユーザーを作成する（ 今回は SitecoreDemo ）
3. 権限を設定する
4. ユーザーのトークンを取得する

![action4](/static/images/2021/01/action4.gif "action4")

### アクションのカスタマイズ

実際の運用の際にはトークンやサーバーの名前は別途管理するのが理想ですが、今回はアクションを利用してサーバーの情報およびトークンを Logic App に送信するトピックに含めます。

ヘッダーを追加で、２つの要素を追加します。

* host_header - 利用しているインスタンスの FQDN を記載する
* token - 上記で取得したトークンの入力

上記の内容を設定した参考画面が以下の様になります。

![action5](/static/images/2021/01/action5.png "action5")

これで Sitecore Content Hub のアクションの定義ができました。

### トリガーの設定

管理画面からトリガーを選択し、新規トリガーを作成します。画面としては以下の様になります。

![trigger1](/static/images/2021/01/trigger1.png "trigger1")

#### 基本

設定項目はそれぞれ以下のように設定します。

| 項目名 | 役割 | 例 |
|-|-|-|
| 名前 | トリガーの名前 | Demo - AutoTag |
| 概要 | トリガーの概要 |  |
| 目的 | エンティティの処理 | エンティティの変更 |
| 実行タイプ | 実行方法の選択 | バックグラウンドで |

#### 条件

続いて条件を設定します。今回はタグが自動的に生成された時をトリガーとして利用するため、以下の様な設定となります。

1. 定義の追加をクリック
2. **M.Tag** を選択
3. 条件をクリック
4. **自動作成（AutoCreated)** を選択
5. 現在の値を選択
6. 等しいを選択
7. 右側のボタンをクリックして有効

#### アクション

アクションの指定の画面では、Demo - AutoTag を選択します。

上記の設定が完了したあと、保存、その際にトリガーを有効にすることが可能なため、トリガーを有効にします。

![trigger2](/static/images/2021/01/trigger2.gif "trigger2")

## まとめ

今回は前編ということで、Microsoft Azure のリソースグループの作成、および Logic App で利用するリソースの準備、Sitecore Content Hub 側の準備まで完了させました。次回は後編ということで、Logic App での処理を実装していきます。

[後編 自動タグの翻訳連携を実装する - 後編](/blog/2021/01/19/dam-auto-tag-translation2) へ続く。