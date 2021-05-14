---
title: Content Hub - CMP Instagram 連携 後編
author: Shinichi Haramizu
author_title: Sitecore Japan
author_url: https://haramizu.jp/
author_image_url: https://avatars3.githubusercontent.com/u/5026348?s=400&v=4
tags: [Content Hub]
description: 前回は、Facebook for Developer のサイトでのアプリ作成、権限の設定、そして Web サービス経由で Instagram に投稿という流れで、基本的な動作を説明しました。今回は、後半の Web サービス経由で投稿する部分を活用して、Sitecore Content Hub - CMP との連携を実装していきます。
slug: 2021/05/17/CMP-2-Instagram-part-2
---

前回は、Facebook for Developer のサイトでのアプリ作成、権限の設定、そして Web サービス経由で Instagram に投稿という流れで、基本的な動作を説明しました。今回は、後半の Web サービス経由で投稿する部分を活用して、Sitecore Content Hub - CMP との連携を実装していきます。

<!--truncate-->

## 実装の方針

今回は、CMP のコンテンツタイプをして、コンテンツの作成をして公開をすると Instagram に投稿される、という処理を実装していきます。

本来であれば写真を選択してその画像の URL を表示するという処理を実装しなければいけませんが、今回はこの部分で少しだけ手作業とさせていただきます。

## Sitecore Content Hub での準備

### アセットタイプの追加

CMP のコンテンツタイプを設定するために、タイプを追加します。管理画面からコンテンツタイプをクリックすると以下の画面になります。

![Instagram](img/2021/05/instagram22.png "Instagram")

コンテンツのタイプとして、ラベルを Instagram、アイコンも Instagram（検索をすると出てきます）、カラーはピンクにしてみました。

![Instagram](img/2021/05/instagram23.png "Instagram")

左側に追加されたタイプを選択すると、下のような画面になります。

![Instagram](img/2021/05/instagram24.png "Instagram")

bd675_Content と表示されている項目のメンバーを追加します。メンバーの追加をクリックすると画面が切り替わります。今回はラベルを英語で Photo URL / 日本語で 写真 URL と設定、単一行、スタイルは文章を指定しました。

![Instagram](img/2021/05/instagram25.png "Instagram")

もう一つ項目を追加します。今度はコンテンツ型式を HTML として、それ以外はそのままで進めていきます。

![Instagram](img/2021/05/instagram26.png "Instagram")

追加をした２つの項目は以下の通りとなります。

![Instagram](img/2021/05/instagram27.png "Instagram")

### コンテンツの作成

今回作成をしたコンテンツタイプを作って、サンプルのアイテムを作成します。まず最初に、コンテンツ - ワークの画面に切り替えます。

![Instagram](img/2021/05/instagram28.png "Instagram")

右上にある **+ コンテンツ** のボタンをクリックすると、以下のようなダイアログが表示されます。

![Instagram](img/2021/05/instagram29.png "Instagram")

コンテンツタイプとして Instagram を指定して保存を実行してください。保存をするとアイテム作成の画面に切り替わります。

![Instagram](img/2021/05/instagram30.png "Instagram")

写真 URL および写真の入力項目があることが確認できました。データの入力はまた追って、次のステップに進みます。

### アクションの作成

管理画面からアクションを開いて、新規アクションを指定します。新規アクションでは型式として Azure Service Bus 、接続文字列は Service Bus に繋げるための文字列、送信タイプにはトピック、送信先の名前を今回は m_instagram としました。

![Instagram](img/2021/05/instagram31.png "Instagram")

Azure Service Bus の設定がわからない方は、次回の Twitter との連携で紹介をします。今回は全体的に長くなってしまったので、もう少し簡単な時にその補足を入れます。

続いてヘッダーを追加していきます。今回は 4 つのヘッダーを作成してみました。

![Instagram](img/2021/05/instagram32.png "Instagram")

ここには実際のアクセストークンなどを入力してください。これでアクションの作成が完了しました。

### トリガーの作成

最後に、Instagram のコンテンツのワークフローが完了した時に、アクションを実行するためのトリガーを作成します。管理画面からトリガーを選択すると以下のような画面になります。

![Instagram](img/2021/05/instagram33.png "Instagram")

新規トリガーを作成します。今回は、CMP のコンテンツのワークフローが完了、ということになるためエンティティの変更をキーにしてトリガーを動かします。処理はバックグラウンドです。

![Instagram](img/2021/05/instagram34.png "Instagram")

続いて条件を設定します。今回は CMP のコンテンツとなるため、M.Content を対象とし、ContentTypeToContent の値が instagram 、ステータスが完了となっている場合にトリガーを動かすようにします。

![Instagram](img/2021/05/instagram35.png "Instagram")

そしてアクションに事前に作成しておいたアクションを設定します。

これで一旦、Sitecore Content Hub の準備が完了しました。

## Azure Logic Apps のアプリを作成する

CMP でコンテンツのワークフローが完了したあと、Azure Service Bus にメッセージが送信されるため、その情報を利用して処理を実行する Azure Logic Apps のアプリを作成していきます。

### 空のロジックアップの作成

Microsoft Azure のリソース作成を選択してください。Logic App を指定して作成ボタンを押します。

![Instagram](img/2021/05/instagram36.png "Instagram")

今回の Logic App の名前は、cmp2instagram とします。

![Instagram](img/2021/05/instagram37.png "Instagram")

リソースの作成が完了すると、Logic Apps デザイナーが起動します。

![Instagram](img/2021/05/instagram38.png "Instagram")

今回は、テンプレートから**空のロジックアプリ**を選択してください。するとデザイナーの画面に切り替わります。

![Instagram](img/2021/05/instagram39.png "Instagram")

### Service Bus との接続

検索ボックスに Service Bus と入力し、一覧に出てくる Service Bus の項目を選択すると次の画面に切り替わります。

![Instagram](img/2021/05/instagram40.png "Instagram")

今回は　**メッセージがトピックサブスクリプションに着信したとき（オートコンプリート）** を選択します。項目を選択する画面になります。この画面の手前で接続を選択する画面が出ることもあります。

![Instagram](img/2021/05/instagram41.png "Instagram")

### 各種値の初期化

取得したメッセージから、アクションで指定をしたホストヘッダーをこの Logic Apps で使えるように初期化していきます。**新しいステップ**をクリックして、**変数**を指定します。

![Instagram](img/2021/05/instagram42.png "Instagram")

アクションの一覧にある**変数を初期化する**をクリックしてください。名前にはわかりやすくするためにヘッダーの名前をそのままで、種類は文字列、値に対しては以下のコードをコピーしてください。以下のように画面が更新されます。

```
@{triggerBody()['Properties']['host_header']}
```
![Instagram](img/2021/05/instagram43.png "Instagram")

残り３つのパラメータも初期化していきます。作業の際には以下のコードを参考にしてください。

```
@{triggerBody()['Properties']['sitecore_token']}
@{triggerBody()['Properties']['instagram_id']}
@{triggerBody()['Properties']['facebook_token']}
```

ここまで進んだ画面は以下の通りです。

![Instagram](img/2021/05/instagram44.png "Instagram")

最後に、取得しているメッセージのエンコーディングを実施します。**データ操作** で検索をして、作成を選択、以下のコードを入力します。

```
@base64ToString(triggerBody()?['ContentData'])
```

### メッセージデータの解析

次の処理として、データ操作のアクティビティの中から、JSON の解析を選択します。コンテンツとしては、一つ前のステップで作成したデータの出力を指定、スキーマとしては以下の JSON のデータを入れてください。

```json
{
    "properties": {
        "context": {
            "properties": {},
            "type": "object"
        },
        "saveEntityMessage": {
            "properties": {
                "ChangeSet": {
                    "properties": {
                        "Cultures": {
                            "items": {
                                "type": "string"
                            },
                            "type": "array"
                        },
                        "PropertyChanges": {
                            "type": "array"
                        },
                        "RelationChanges": {
                            "items": {
                                "properties": {
                                    "Cardinality": {
                                        "type": "integer"
                                    },
                                    "NewValues": {
                                        "items": {
                                            "type": "integer"
                                        },
                                        "type": "array"
                                    },
                                    "Relation": {
                                        "type": "string"
                                    },
                                    "RemovedValues": {
                                        "items": {
                                            "type": "integer"
                                        },
                                        "type": "array"
                                    },
                                    "Role": {
                                        "type": "integer"
                                    }
                                },
                                "required": [
                                    "Relation",
                                    "Role",
                                    "Cardinality",
                                    "NewValues",
                                    "RemovedValues"
                                ],
                                "type": "object"
                            },
                            "type": "array"
                        }
                    },
                    "type": "object"
                },
                "EventType": {
                    "type": "string"
                },
                "IsNew": {
                    "type": "boolean"
                },
                "TargetDefinition": {
                    "type": "string"
                },
                "TargetId": {
                    "type": "integer"
                },
                "TargetIdentifier": {
                    "type": "string"
                },
                "TimeStamp": {
                    "type": "string"
                },
                "UserId": {
                    "type": "integer"
                },
                "Version": {
                    "type": "integer"
                }
            },
            "type": "object"
        }
    },
    "type": "object"
}
```

![Instagram](img/2021/05/instagram45.png "Instagram")

この JSON の解析で、Sitecore Content Hub のメッセージを送信したエンティティの ID を TargetID から取得することができます。

### Content Hub からエンティティの情報を取得する

続いて Web サービスにアクセスをして、メッセージを送信したエンティティの情報を取得します。操作としては HTTP を選択してください。

![Instagram](img/2021/05/instagram46.png "Instagram")

アクションとしては HTTP を選択します。

![Instagram](img/2021/05/instagram47.png "Instagram")

Web サービスとアクセスする際には、これまで初期化していきた変数を適用していきます。

![Instagram](img/2021/05/instagram48.png "Instagram")

Web サービスで取得した結果のデータに関して、改めてデータ操作で JSON の処理を実行します。コンテンツは HTTP の結果から返ってくる本文を指定します。

![Instagram](img/2021/05/instagram49.png "Instagram")

スキーマに関しては、環境によって異なる形となるため、以下のような手順で作成していきます。まず、事前に作成をした Instagram の空のデータにアクセスしてください。

![Instagram](img/2021/05/instagram50.png "Instagram")

編集ボタンをクリック、HTML を入力できるエリアをクリックしてアセットを指定します。この際に指定する URL をクリップボードにコピーしてください。

![Instagram](img/2021/05/instagram51.png "Instagram")

URL は写真の URL にコピーします。編集を終了させると、テストデータが出来上がりました。

![Instagram](img/2021/05/instagram52.png "Instagram")

この入力したデータのエンティティを参照する場合は、URL の locale/content/detail の部分を api/entities に変更することで、JSON のデータで確認することができます。

![Instagram](img/2021/05/instagram53.png "Instagram")

Logic Apps デザイナーに戻り、作業中の JSON の解析 2 のダイアログにある **サンプルのペイロードを使用してスキーマを生成する**、をクリックして、ダイアログに貼り付けて完了ボタンをクリックします。対象となる JSON のデータからスキーマが生成されます。

![Instagram](img/2021/05/instagram54.png "Instagram")

スキーマは非常に大きなデータとなるため、利用しない項目に関しては削除してスリム化しました。今回は bd675_PhotoURL の項目さえ取得できれば良いので、スリム化したスキーマは以下の通りです。

```json
{
    "type": "object",
    "properties": {
        "id": {
            "type": "integer"
        },
        "identifier": {
            "type": "string"
        },
        "cultures": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "properties": {
            "type": "object",
            "properties": {
                "Content.Name": {
                    "type": "string"
                },
                "MasterAssetIsContent": {},
                "Content.ExpirationDate": {},
                "Content.PublishedOn": {},
                "Content.DynamicPublishDate": {},
                "Content.DaysFromCampaignStart": {},
                "Content.Impact": {},
                "Content.PublicationDate": {},
                "Content.Brief": {},
                "Content.ContentStoryPoints": {},
                "Content.StrategyCompletenessStatus": {},
                "Content.ContentCompletenessStatus": {},
                "Content.Variant": {
                    "type": "object",
                    "properties": {
                        "identifier": {
                            "type": "string"
                        },
                        "labels": {
                            "type": "object",
                            "properties": {
                                "en-US": {
                                    "type": "string"
                                },
                                "ja-JP": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                },
                "Content.NumberOfCreatedVersions": {
                    "type": "integer"
                },
                "Renditions": {},
                "Content.ApprovedForCreation": {
                    "type": "boolean"
                },
                "Content.IsInIdeationState": {},

                "bd675_PhotoURL": {
                    "type": "string"
                },
                "bd675_Photo": {
                    "type": "string"
                }
            }
        }
    }
}
```

### Instagram に投稿する

必要なデータが揃ったので、あとは Instagram に投稿するための手順を実装するのみです。前回の最後に紹介をしている URL で投稿ができるので、実装としては以下のようになります。ヘッダーの認証に関しては、すでに Postman で実施しているアクセス方法をそのまま実装している形です。

![Instagram](img/2021/05/instagram55.png "Instagram")

この HTTP を実行すると以下のような ID が返ってくることになります。

```json
{
  "id": "17889455560051444"
}
```

このサンプルのデータを利用して、HTTP 2 の JSON のデータを分析するために JSON の解析を再度追加して、HTTP 2 の本文を指定、スキーマには上記のデータをサンプルのペイロードを使用してスキーマを生成する、に入れて作成をすると、以下のような形となります。

![Instagram](img/2021/05/instagram56.png "Instagram")

最後にアップロードしたメディアファイルを公開します。HTTP の処理を追加して以下のように記載します。

![Instagram](img/2021/05/instagram57.png "Instagram")

これで一通りの処理が実装できました。

## テストを実行する

### アクセストークンの更新

色々な作業を進めているうちに、前編で作成したアクセストークンは無効になっていると思われます。作成して１時間以上立っている場合は、改めてアクセストークンを作成し直し、アクションで利用しているトークンの項目を更新してください。

### コンテンツの承認プロセスを進めていく

途中で作成をしたサンプルの CMP のコンテンツの承認を進めていきます。承認のプロセスになると、ダイアログが表示されてコネクタにデータを送信するかどうかを聞いてきます。

![Instagram](img/2021/05/instagram58.png "Instagram")

送信をすると、トリガーが起動、アクションで設定された情報を下に Azure Logic Apps が動作します。実際にエラーなしで動いている状況は以下の通りです。

![Instagram](img/2021/05/instagram59.png "Instagram")

投稿が完了したので、Instagram のアプリを立ち上げてみると、Sitecore Content Hub のアセットが投稿されていることがわかります。

![Instagram](img/2021/05/instagram60.jpg "Instagram")

## 今後の拡張という点で

Facebook の開発センターで検証用として利用できるアクセストークンを利用して動作確認をしました。今回作成したものは継続して運用できるものではありませんが、動作検証としてはしっかりできています。

このサンプルの手順以外に実際に手続きとして必要となるのは以下の内容になります。

* 継続して利用できるアクセストークンの取得
* 投稿画面の改善
    * 今回は検証用ということで、画像の URL を直接入れています
    * PNG などの画像がアセットとして設定されている場合、公開用の JPEG ファイルを自動生成、URL を渡す
    * ビデオへの対応
* 投稿した結果を CMP のコンテンツに反映させる
    * HTTP 2 で取得している ID を CMP のコンテンツに反映させる

### Insights

さまざまなメトリクスも定期的にとることができると考えられます。

例えば insights を利用する際には、以下の権限を追加します。

* instagram_manage_insights
* pages_read_engagement

この解説は以下のページにあります。

* [IGユーザーのインサイト](https://developers.facebook.com/docs/instagram-api/reference/ig-user/insights)

Instagram Graph API 経由で、過去 28 日感のデータを取得する場合、 {instagram-use-id}/insights?metric=impressions&period=days_28 と URL をつけてアクセスすると取得できます。

![Instagram](img/2021/05/instagram61.png "Instagram")

これは instagram の UserID で実施しましたが、**HTTP 2 で取得している ID** を利用してインプレッションのデータをとることも可能です。

![Instagram](img/2021/05/instagram62.png "Instagram")

コンテンツの ID がわかればインプレッションをコンテンツのデータに反映させることができ、レポートなどでも活用できる形となります。

## まとめ

前編では Web サービス経由でアクセスして写真の投稿を検証し、後編では同じプロセスを自動化するために Azure Web Apps を利用して処理をしました。