---
title: Sitecore Content Hub タクソノミー - 自動タグの翻訳連携を実装する - 後編
date: '2021-01-19'
tags: ['Content Hub']
draft: false
summary: 前回はアセットのタグ付けを自動的に作成するための準備を前編ということで紹介しました。後編では、実際に取得したデータを Logic App で処理して、機械翻訳した結果を反映させるところまで進めて、サンプルを完成させます。
images: ['/static/images/2021/01/logicapp3.png']
---

[前回 自動タグの翻訳連携を実装する - 前編](/blog/2021/01/18/dam-auto-tag-translation1) はアセットのタグ付けを自動的に作成するための準備を前編ということで紹介しました。後編では、実際に取得したデータを Logic App で処理して、機械翻訳した結果を反映させるところまで進めて、サンプルを完成させます。

## LogicApp の作成

Sitecore Content Hub で新しいタグが生成された際に、トリガーが実行され、そのトリガーで指定されているアクションが動作するようになりました。今度は送信された Message の情報を利用して、Logic App 側で処理をして Sitecore Content Hub に返す手順を作成します。

## Logic App のリソースを追加する

今回管理しているリソースグループに Logic App のリソースを追加します。リソースグループを開いて追加を押して、Logic App を選択、作成します。作成するアプリの名前は今回は TagTranslator としました。

![logicapp1](/static/images/2021/01/logicapp1.gif "logicapp1")

## Logic App デザイナーで処理を追加する

今回は Service Bus にリクエストが来た際に動作する Logic App を作成していきます。このため以下の様に処理を追加していきます。

### Message を受け取った時の処理

まず最初に、Logic App デザイナーが表示されるため、ここで**空のロジックアプリ**を選択してください。

![logicapp2](/static/images/2021/01/logicapp2.gif "logicapp2")

今回、処理をするためには Service Bus を利用するため、Service と検索ボックスに入力することで、対象となる機能が表示されます。

![logicapp3](/static/images/2021/01/logicapp3.png "logicapp3")

Service Bus のアイコンをクリックすると、トリガーの一覧が表示されます。

![logicapp4](/static/images/2021/01/logicapp4.png "logicapp4")

今回は、**メッセージがトピックサブスクリプションに着信した時（オート コンプリート）**を選択します。すると以下の画面に切り替わります。

![logicapp5](/static/images/2021/01/logicapp5.png "logicapp5")

接続名は任意の名前で（ここでは ContentHub とします）、Service Bus の名前空間は、今回作成をした名前を選択してください。Service Bus の名前空間を選択したあと、Service Bus ポリシーの画面に切り替わります。

![logicapp6](/static/images/2021/01/logicapp6.png "logicapp6")

表示されているポリシーから利用するポリシーを選択することで、作成ボタンが有効になりますので、ボタンをクリックしてください。すると以下の画面に切り替わります。

![logicapp7](/static/images/2021/01/logicapp7.png "logicapp7")

すでに作成しているトピック、サブスクリプションを選択できるようになっていますので、それぞれを選択すると完了となります。

![logicapp8](/static/images/2021/01/logicapp8.png "logicapp8")

ここまで来たところで、一度保存を実行してください。


### 受信したメッセージからパラメーターを取得する

続いて、送信されているトピックからパラメーターを取得します。**新しいステップ** のボタンをクリックします。今回は変数の初期化を実行するため、変数を次のステップとして選択します。いくつかのトリガーが表示されますが、今回は変数を初期化するを選択してください。

![topicparam1](/static/images/2021/01/topicparam1.gif "topicparam1")

以下の値を設定してください。

| 項目名 | 役割 | 例 |
|-|-|-|
| 名前 | 変数名 | source_host |
| 種類 | データの種類 | 文字列 |
| 値 | 初期値とする値 | 下記コード |

```
@{triggerBody() [ 'Properties' ] ['host_header']} 
```

作業をしている動画は以下の通りとなります。値に関しては、アクションで定義しているカスタムヘッダーを取得するために、一度コードビューに切り替えて host_header を追加しています。

![topicparam2](/static/images/2021/01/topicparam2.gif "topicparam2")

同じ手順で、Token に関しても作成します。

| 項目名 | 役割 | 例 |
|-|-|-|
| 名前 | 変数名 | token |
| 種類 | データの種類 | 文字列 |
| 値 | 初期値とする値 | 下記コード |

```
@{triggerBody() [ 'Properties' ] ['token']}
```

仕上がりは以下の通りとなります。

![topicparam3](/static/images/2021/01/topicparam3.png "topicparam3")


### データの処理

すでに送信されている Message に関して、データ操作を実行して Logic App で利用できる様に変換をします。まず最初に、**データ操作**を選択します。

![contentdata1](/static/images/2021/01/contentdata1.png "contentdata1")

データ操作に紐づいているアクションから**作成**を選択します。

![contentdata2](/static/images/2021/01/contentdata2.png "contentdata2")

入力の項目ですが、送信されているデータを Base64 で処理をして文字列として扱えるようにします。コードとしては以下の様に設定される様に作成します。

```json
{
    "inputs": "@base64ToString(triggerBody()?['ContentData'])"
}
```

今回は以下の様に入力しました。

![contentdata3](/static/images/2021/01/contentdata3.gif "contentdata3")

文字列の操作をしたあと、もう一度**データ操作**を追加します。データ操作は、**JSON の解析** を選択してください。

![contentdata4](/static/images/2021/01/contentdata4.png "contentdata4")

設定内容としては、コンテンツの項目には１つ前のステップで実行した出力を設定、またスキーマには以下のスキーマを設定します。今回はターゲットとなるエンティティの ID を取得するのが目的となるため、以下のスキーマを設定します。

```json
{
    "properties": {
        "saveEntityMessage": {
            "properties": {
                "TargetId": {
                    "type": "integer"
                }
            },
            "type": "object"
        }
    },
    "type": "object"
}
```

実際のスキーマの設定に関しては、Postman などを利用して Web サービス経由で必要な JSON データを取得、設定する形となりますが、今回はこの手順を省略しています。作業をしている手順画像は以下の通りとなります。

![contentdata5](/static/images/2021/01/contentdata5.gif "contentdata5")

これで Sitecore Content Hub の対象エンティティに対してアクセスするためのデータが揃いました。

### Sitecore Content Hub からデータを取得

Service Bus に投げられているメッセージには、エンティティのデータは含まれていないため、このタイミングでエンティティの情報を取得します。サーバーにアクセスするための処理として HTTP の処理を追加します。

![http1](/static/images/2021/01/http1.png "http1")

アクションとしては、一番上に表示されている HTTP を選択します。

![http2](/static/images/2021/01/http2.png "http2")

以下の様な項目が表示されます。

![http3](/static/images/2021/01/http3.png "http3")

入力する項目は以下の通りです。

| 項目名 | 役割 | 例 |
|-|-|-|
| 方法 | アクセス方法 | GET |
| URI | アクセスする URI | https://source_host/api/entities/TargetId |
| ヘッダー | ヘッダー値 | Content-Type と X-Auth-Token |

URL や X-Auth-Token に関しては、変数および JSON の解析結果取得したデータを設定します。作業としては以下の様になります。

![http4](/static/images/2021/01/http4.gif "http4")

これで Sitecore Content Hub の対象エンティティからデータを取得できるようになりました。

### 取得したデータから翻訳対象を取得

取得した JSON のデータの処理をするために、改めて**データ操作**を追加します。今回は HTTP で取得した本文に対して、以下の JSON スキーマを適用します。以下のスキーマはタグの英語のラベルだけを取得したいため、以下の様になります。

```json
{
    "properties": {
        "identifier": {
            "type": "string"
        },
        "properties": {
            "properties": {
                "TagLabel": {
                    "properties": {
                        "en-US": {
                            "type": "string"
                        }
                    },
                    "type": "object"
                }
            },
            "type": "object"
        }
    },
    "type": "object"
}
```

手順は以下の様な動画となります。

![contentdata6](/static/images/2021/01/contentdata6.gif "contentdata6")

上記の値で取得したタグの英語のラベルに関して、機械翻訳エンジンに渡すために変数として定義します。今回は EnglishLabel という名前とし、初期設定は en-US の値を設定します。

![contentdata7](/static/images/2021/01/contentdata7.gif "contentdata7")

これで機械翻訳で処理をする文字列の取得ができました。

### テキストの翻訳

取得したデータから、英語のタグラベルを取得して Microsoft Translator にデータを渡します。まず最初に、Microsoft Translator のリソースを初回に追加する場合は、キーを取得する必要があります。キーは、Cognitive Service を開き、キーとエンドポイントをクリック、キーが２つ表示されます。今回は、キー1 を利用します。

![mstranslator1](/static/images/2021/01/mstranslator1.png "mstranslator1")

このキーを Subscription Key に設定してください。これは初回実施すれば、2回目からは省略できます。

![mstranslator2](/static/images/2021/01/mstranslator2.gif "mstranslator2")

続いて表示されるのがアクション一覧になります。英語を日本語に翻訳することは決まっているので、Translate text（プレビュー）を選択します。

![mstranslator3](/static/images/2021/01/mstranslator3.png "mstranslator3")

続いて表示されるのが Target language、Text および Add new parameter の項目となります。

![mstranslator4](/static/images/2021/01/mstranslator4.png "mstranslator4")

ソース言語を**英語**、翻訳ターゲットを**日本語**、翻訳する言葉は手前で準備している **EnglishLabel** を指定します。

![mstranslator5](/static/images/2021/01/mstranslator5.gif "mstranslator5")

これで翻訳処理まで進みました。この結果を元のデータに反映させます。

### タグのデータを更新する

データを反映させる際も、改めて HTTP リクエストを送信します。今回は更新する内容を本文に記載しながら、Web サービスにアクセスをすることになります。

| 項目名 | 役割 | 例 |
|-|-|-|
| 方法 | アクセス方法 | GET |
| URI | アクセスする URI | https://source_host/api/entities/TargetId |
| ヘッダー | ヘッダー値 | Content-Type と X-Auth-Token |
| 本文 | リクエストをする JSON データ | 下記のコードを参照 |

```json
{
  "cultures": [
    "en-US",
    "ja-JP"
  ],
  "entitydefinition": {
    "href": "https://source_host/api/entitydefinitions/M.Tag",
    "title": "The entity definition for this entity"
  },
  "identifier": "identifer",
  "properties": {
    "TagLabel": {
      "en-US": "EnglishLabel",
      "ja-JP": "翻訳されたテキスト"
    }
  }
}
```

実際に更新している模様は以下のような画像となります。

![http5](/static/images/2021/01/http5.gif "http5")

これで Logic App が完成しました。

## 動作確認

上記の設定が完了しているのを前提として、新しいファイルをアップロードします。アップロードをしたあと、アセット型式として**ソーシャルメディアアセット**を設定してください。このアセット型式にすることで、Vision API を利用してタグを付与する動きをします。

![autotag1](/static/images/2021/01/autotag1.gif "autotag1")

バックグラウンド処理で、ジョブの処理が完了しているのを確認します。

![autotag2](/static/images/2021/01/autotag2.png "autotag2")

この状態で、アクションの監査ログを参照すると、Azure Service Bus に対して処理をしているのかどうか、確認できます。

![autotag3](/static/images/2021/01/autotag3.gif "autotag3")

それでは Logic App の画面に移動してみましょう。実行の履歴を開くと、必要な処理が実行されていることがわかります。成功をしていない場合は、Logic App の設定の確認、また Sitecore Content Hub との連携（ Token など）を確認してください。

![autotag4](/static/images/2021/01/autotag4.png "autotag4")

## まとめ

今回は、タグが新規に作成された場合（ M.Tag ）に関して、トリガーを設定し、Azure Service Bus に対してトピックを送信するようにアクションを作成、Microsoft Azure 側で受け取ったトピックの内容から Sitecore Content Hub にアクセスをして、必要な処理を外部で実行（今回は機械翻訳）する、というカスタマイズを設定しました。

トリガーで処理ができるものとしてはスクリプトなども用意されていますが、Logic App のような仕組みを利用することで、より簡単にシステム連携の実装をすることが可能となります。