---
title: Sitecore Content Hub タクソノミー - 自動タグの翻訳連携を実装する
author: Shinichi Haramizu
author_title: Sitecore Japan
author_url: https://haramizu.jp/
author_image_url: https://avatars3.githubusercontent.com/u/5026348?s=400&v=4
tags: [Content Hub]
description: Sitecore Content Hub で便利な機能として、アセットのタグ付けを自動的に実行する Cognitive Service 連携の機能があります。このタグに関しては標準で英語のタグを紐づける動きをします。今回は、自動的にタグが生成された時に、機械翻訳でタグの日本語を割り当てる、という連携を実装します。
slug: 2021/01/18/dam-auto-tag-translation
---

Sitecore Content Hub で便利な機能として、アセットのタグ付けを自動的に実行する Cognitive Service 連携の機能があります。このタグに関しては標準で英語のタグを紐づける動きをします。今回は、自動的にタグが生成された時に、機械翻訳でタグの日本語を割り当てる、という連携を実装します。

<!--truncate-->

## Sitecore AI - 画像分析について

Sitecore Content Hub に実装されている画像分析ですが、Microsoft Azure の Cognitive Service で提供している画像分析の機能と連携するようになっています。

この機能を利用するために標準機能として実装されているのは、アセットタイプを指定した時に、自動的に分析させてタグ付けを設定する、という機能があります。この設定を確認するためには、管理画面から「タクソノミー」ー「M.AssetType」を選択して、アセットタイプ一覧から任意のアセットタイプを選択してください。デモサイトであれば、ソーシャルメディアアセットの設定を見ると、トリガービジョンの項目にチェックが入っています。

![triggervision](img/2021/01/triggervision.png "triggervision")

## タグの翻訳のプロセスに関して

新しくタグが生成される際に、英語の単語を取得して、それを機械翻訳で日本語にして、該当するタグにの日本語リソースに反映させる、という処理を今回開発をします。開発の際にはトリガーを利用して、新しいタグが生成された事前に指定されているアクションを実行、結果が反映されるという形です。

外部で処理をする部分に関して、今回は Microsoft Azure を利用します。これは、Sitecore Content Hub のアクションが Service Bus にメッセージを送る機能を標準で提供しているため、そのメッセージを Logic App が処理をして翻訳をして元のデータに反映させる、という処理を作成します。

スクリプトを開発して API で処理をすることも可能ですが、このカスタマイズの形は汎用性が高いので、今回は Logic App を利用した処理を紹介します。

## Microsoft Azure での処理

今回は初めて作成する Logic App のサンプルになりますので、リソースグループの作成からスタートします。

### リソースグループを作成する

Microsoft Azure ポータルにアクセスをして、リソースグループを選択、作成の画面に移動します。

![resourcegroup](img/2021/01/resourcegroup.png "resourcegroup")

今回はリソースグループ名を contenthubdemo として作成します。サブスクリプションは Visual Studio Enterprise についている無料のプランを選択してみました。

リソースグループが出来上がると、以下の様にリソースが空っぽの物が出来上がります。

![resourcegroup](img/2021/01/newresourcegroup.png "resourcegroup")

### Service Bus を準備する

#### Service Bus の作成

Sitecore Content Hub のアクションが提供するメッセージを処理するための Message Bus の準備をします。上記で作成した新しいリソースグループの中に **追加** のボタンがありますので、これをクリックしてください。

![servicebus1](img/2021/01/servicebus1.png "servicebus1")

新しいリソースのタイプを選択することになりますので、検索ボックスに Service Bus を入力すると候補が表示されます。

![servicebus2](img/2021/01/servicebus2.png "servicebus2")

選択をすると画面が切り替わり、以下の様に新しい Service Bus の作成画面となります。

![servicebus3](img/2021/01/servicebus3.png "servicebus3")

**作成** をクリックして、名前空間の作成に入ります。サブスクリプション、リソースグループはすでに作業中のものが反映されており、名前空間の名前、場所、価格レベルの設定となります。価格レベルは Standard を選択する必要があります。

![servicebus4](img/2021/01/servicebus4.png "servicebus4")

項目の入力が完了したあと、確認及び作成、作成を実行して Service Bus の作成を完了させます。

![servicebus5](img/2021/01/servicebus5.png "servicebus5")

#### トピックの作成

Sitecore Content Hub のアクションから送信されるメッセージはトピックとして処理をしているため、その受け口となるトピックの準備をします。

作成した Service Bus を開き、メニューに表示されている **エンティティ** の中にある **トピック** を開きます。今回は作成して間もないため、トピックに関しての定義はありません。

![topictag1](img/2021/01/topictag1.png "topictag1")

上の画面の **トピック** を追加する項目をクリックして、新しいトピックを作成します。今回は **m_trans** として作成します。

![topictag2](img/2021/01/topictag2.png "topictag2")

作成したトピックが一覧に表示されます。

![topictag3](img/2021/01/topictag3.png "topictag3")

名前をクリックすると以下の画面になります。

![topictag4](img/2021/01/topictag4.png "topictag4")

サブスクリプションの設定を追加するために、左側のメニューにある **エンティティ** - **サブスクリプション** をクリックしてください。

![topictag5](img/2021/01/topictag5.png "topictag5")

サブスクリプションが空欄になっているので、*結果なし* の上にある**サブスクリプション**をクリックして追加します。入力する項目は、名前に **sitecore** を、最大配信数は **10** と今回は設定しておきます。

![topictag6](img/2021/01/topictag6.png "topictag6")

作成をクリックすることで、Service Bus の設定に関して完了しました。

### Microsoft Translator の追加

今回は翻訳処理として、Microsoft Translator を利用します。すでに Microsoft Transalator のリソースを持っている場合はこの作業をスキップすることは可能です。

翻訳の処理をするために、リソースグループに Microsoft Translator のリソースを追加しておきます。Service Bus を選択したのと同様に、リソースグループで **追加** をクリックして、Translator のキーワードで検索します。

![translator1](img/2021/01/translator1.png "translator1")

Translator をクリックするとリソースの説明画面となります。この画面に表示されている作成をクリックしてください。

![translator2](img/2021/01/translator2.png "translator2")

作成画面では、リソースのリージョン、名前と価格レベルを選択できます。デモ程度であれば価格レベルは Free で大丈夫です。なお、Free を選択できるのはサブスクリプションごとに１つまでという制限がありますのでご注意ください。またリージョンに関してはグローバルを選択してください。このため、今回は以下の設定で作成します。

![translator3](img/2021/01/translator3.png "translator3")

これで処理が完了しました。作成されているリソースは２つ準備ができている形です。

![resourcegroup2](img/2021/01/resourcegroup2.png "resourcegroup2")

## トリガーとアクションの作成

ここでは Sitecore Content Hub で動作するトリガーに関して紹介をします。なお、トリガーだけのパッケージを https://github.com/SitecoreJapan/ContentHub.Demo/tree/main/Packages に用意しており、今回のパッケージは TaxonomyAutoTranslateJA-346.zip が対象となります。以下は手作業で作成をするための手順書です。

### アクションの作成

今回準備した Service Bus に繋げるためのアクションを作成します。アクションの作成は、管理画面から**アクション**を選択してください。

![action1](img/2021/01/action1.png "action1")

アクションの管理画面にある新規アクションをクリックするとアクションの設定画面となります。

![action2](img/2021/01/action2.png "action2")

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

![action3](img/2021/01/action4.gif "action3")

ここで保存をして必要な項目を別途準備します。

### トークンの取得

今回は Logic App で処理をするために、Logic App が Web サービス経由でアクセスする必要があります。その際に必要となるのが、トークンになります。トークンの作成方法は以下の通りです。

1. 管理画面のユーザーを開く
2. 新しいユーザーを作成する（ 今回は SitecoreDemo ）
3. 権限を設定する
4. ユーザーのトークンを取得する

![action4](img/2021/01/action4.gif "action4")

### アクションのカスタマイズ

実際の運用の際にはトークンやサーバーの名前は別途管理するのが理想ですが、今回はアクションを利用してサーバーの情報およびトークンを Logic App に送信するトピックに含めます。

ヘッダーを追加で、２つの要素を追加します。

* host_header - 利用しているインスタンスの FQDN を記載する
* token - 上記で取得したトークンの入力

上記の内容を設定した参考画面が以下の様になります。

![action5](img/2021/01/action5.png "action5")

これで Sitecore Content Hub のアクションの定義ができました。

### トリガーの設定

管理画面からトリガーを選択し、新規トリガーを作成します。画面としては以下の様になります。

![trigger1](img/2021/01/trigger1.png "trigger1")

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

![trigger2](img/2021/01/trigger2.gif "trigger2")

## LogicApp の作成

Sitecore Content Hub で新しいタグが生成された際に、トリガーが実行され、そのトリガーで指定されているアクションが動作するようになりました。今度は送信された Message の情報を利用して、Logic App 側で処理をして Sitecore Content Hub に返す手順を作成します。

### Logic App のリソースを追加する

今回管理しているリソースグループに Logic App のリソースを追加します。リソースグループを開いて追加を押して、Logic App を選択、作成します。作成するアプリの名前は今回は TagTranslator としました。

![logicapp1](img/2021/01/logicapp1.gif "logicapp1")

### Logic App デザイナーで処理を追加する

今回は Service Bus にリクエストが来た際に動作する Logic App を作成していきます。このため以下の様に処理を追加していきます。

#### Message を受け取った時の処理

まず最初に、Logic App デザイナーが表示されるため、ここで**空のロジックアプリ**を選択してください。

![logicapp2](img/2021/01/logicapp2.gif "logicapp2")

今回、処理をするためには Service Bus を利用するため、Service と検索ボックスに入力することで、対象となる機能が表示されます。

![logicapp3](img/2021/01/logicapp3.png "logicapp3")

Service Bus のアイコンをクリックすると、トリガーの一覧が表示されます。

![logicapp4](img/2021/01/logicapp4.png "logicapp4")

今回は、**メッセージがトピックサブスクリプションに着信した時（オート コンプリート）**を選択します。すると以下の画面に切り替わります。

![logicapp5](img/2021/01/logicapp5.png "logicapp5")

接続名は任意の名前で（ここでは ContentHub とします）、Service Bus の名前空間は、今回作成をした名前を選択してください。Service Bus の名前空間を選択したあと、Service Bus ポリシーの画面に切り替わります。

![logicapp6](img/2021/01/logicapp6.png "logicapp6")

表示されているポリシーから利用するポリシーを選択することで、作成ボタンが有効になりますので、ボタンをクリックしてください。すると以下の画面に切り替わります。

![logicapp7](img/2021/01/logicapp7.png "logicapp7")

すでに作成しているトピック、サブスクリプションを選択できるようになっていますので、それぞれを選択すると完了となります。

![logicapp8](img/2021/01/logicapp8.png "logicapp8")

ここまで来たところで、一度保存を実行してください。

#### 受信したメッセージからパラメーターを取得する

続いて、送信されているトピックからパラメーターを取得します。**新しいステップ** のボタンをクリックします。今回は変数の初期化を実行するため、変数を次のステップとして選択します。いくつかのトリガーが表示されますが、今回は変数を初期化するを選択してください。

![topicparam1](img/2021/01/topicparam1.gif "topicparam1")

以下の値を設定してください。

| 項目名 | 役割 | 例 |
|-|-|-|
| 名前 | 変数名 | source_host |
| 種類 | データの種類 | 文字列 |
| 値 | 初期値とする値 | @{triggerBody() [ 'Properties' ] ['host_header']} |

作業をしている動画は以下の通りとなります。値に関しては、アクションで定義しているカスタムヘッダーを取得するために、一度コードビューに切り替えて host_header を追加しています。

![topicparam2](img/2021/01/topicparam2.gif "topicparam2")

同じ手順で、Token に関しても作成します。

| 項目名 | 役割 | 例 |
|-|-|-|
| 名前 | 変数名 | token |
| 種類 | データの種類 | 文字列 |
| 値 | 初期値とする値 | @{triggerBody() [ 'Properties' ] ['token']} |

仕上がりは以下の通りとなります。

![topicparam3](img/2021/01/topicparam3.png "topicparam3")

#### データの処理

すでに送信されている Message に関して、データ操作を実行して Logic App で利用できる様に変換をします。まず最初に、**データ操作**を選択します。

![contentdata1](img/2021/01/contentdata1.png "contentdata1")

データ操作に紐づいているアクションから**作成**を選択します。

![contentdata2](img/2021/01/contentdata2.png "contentdata2")

入力の項目ですが、送信されているデータを Base64 で処理をして文字列として扱えるようにします。コードとしては以下の様に設定される様に作成します。

```json
{
    "inputs": "@base64ToString(triggerBody()?['ContentData'])"
}
```

今回は以下の様に入力しました。

![contentdata3](img/2021/01/contentdata3.gif "contentdata3")

文字列の操作をしたあと、もう一度**データ操作**を追加します。今回のデータ操作は、**JSON の解析** を選択してください。

![contentdata4](img/2021/01/contentdata4.png "contentdata4")

設定内容としては、コンテンツの項目には１つ前のステップで実行した出力を設定、またスキーマには以下のスキーマを設定します。

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

実際のスキーマの設定に関しては、Postman などを利用して Web サービス経由で必要な JSON データを取得、設定する形となりますが、今回はその部分を初略しています。作業をしている手順画像は以下の通りとなります。

![contentdata5](img/2021/01/contentdata5.gif "contentdata5")

これで Sitecore Content Hub の対象エンティティに対してアクセスするためのデータが揃いました。

#### Sitecore Content Hub からデータを取得

Service Bus に投げられているメッセージには、エンティティのデータは含まれていないため、このタイミングでエンティティの情報を取得します。サーバーにアクセスするための処理として HTTP の処理を追加します。

![http1](img/2021/01/http1.png "http1")

アクションとしては、一番上に表示されている HTTP を選択します。

![http2](img/2021/01/http2.png "http2")

以下の様な項目が表示されます。

![http3](img/2021/01/http3.png "http3")

入力する項目は以下の通りです。

| 項目名 | 役割 | 例 |
|-|-|-|
| 方法 | アクセス方法 | GET |
| URI | アクセスする URI | https://source_host/api/entities/TargetId |
| ヘッダー | ヘッダー値 | Content-Type と X-Auth-Token |

URL や X-Auth-Token に関しては、変数および JSON の解析結果取得したデータを設定します。作業としては以下の様になります。

![http4](img/2021/01/http4.gif "http4")

これで Sitecore Content Hub の対象エンティティからデータを取得できるようになりました。

#### 取得したデータから翻訳対象を追加

取得した JSON のデータの処理をするために、改めて**データ操作**を追加します。今回は HTTP で取得した本文に対して、以下の JSON スキーマを適用します。

```json
{
    "properties": {
        "created_by": {
            "properties": {
                "href": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                }
            },
            "type": "object"
        },
        "created_on": {
            "type": "string"
        },
        "display_template": {
            "type": "string"
        },
        "entities": {
            "properties": {
                "href": {
                    "type": "string"
                },
                "templated": {
                    "type": "boolean"
                },
                "title": {
                    "type": "string"
                }
            },
            "type": "object"
        },
        "id": {
            "type": "integer"
        },
        "is_manual_sorting_allowed": {
            "type": "boolean"
        },
        "is_path_enabled_definition": {
            "type": "boolean"
        },
        "is_system_owned": {
            "type": "boolean"
        },
        "is_taxonomy_item_definition": {
            "type": "boolean"
        },
        "labels": {
            "properties": {
                "en-US": {
                    "type": "string"
                },
                "ja-JP": {
                    "type": "string"
                }
            },
            "type": "object"
        },
        "member_groups": {
            "items": {
                "properties": {
                    "conditions": {
                        "type": "array"
                    },
                    "is_conditional": {
                        "type": "boolean"
                    },
                    "is_secured": {
                        "type": "boolean"
                    },
                    "is_system_owned": {
                        "type": "boolean"
                    },
                    "labels": {
                        "properties": {
                            "ja-JP": {
                                "type": "string"
                            }
                        },
                        "type": "object"
                    },
                    "members": {
                        "items": {
                            "properties": {
                                "allow_navigation": {
                                    "type": "boolean"
                                },
                                "allow_updates": {
                                    "type": "boolean"
                                },
                                "associated_entitydefinition": {
                                    "properties": {
                                        "href": {
                                            "type": "string"
                                        },
                                        "title": {
                                            "type": "string"
                                        }
                                    },
                                    "type": "object"
                                },
                                "associated_labels": {
                                    "properties": {
                                        "en-US": {
                                            "type": "string"
                                        },
                                        "ja-JP": {
                                            "type": "string"
                                        }
                                    },
                                    "type": "object"
                                },
                                "boost": {
                                    "type": "boolean"
                                },
                                "can_trigger_conditional_members": {
                                    "type": "boolean"
                                },
                                "can_write": {
                                    "type": "boolean"
                                },
                                "cardinality": {
                                    "type": "string"
                                },
                                "child_is_mandatory": {
                                    "type": "boolean"
                                },
                                "completion_is_copied": {
                                    "type": "boolean"
                                },
                                "conditions": {
                                    "type": "array"
                                },
                                "content_is_copied": {
                                    "type": "boolean"
                                },
                                "content_type": {
                                    "type": "string"
                                },
                                "helptext": {
                                    "properties": {},
                                    "type": "object"
                                },
                                "ignore_on_export": {
                                    "type": "boolean"
                                },
                                "included_in_completion": {
                                    "type": "boolean"
                                },
                                "included_in_content": {
                                    "type": "boolean"
                                },
                                "inherits_security": {
                                    "type": "boolean"
                                },
                                "is_conditional": {
                                    "type": "boolean"
                                },
                                "is_indexed": {
                                    "type": "boolean"
                                },
                                "is_mandatory": {
                                    "type": "boolean"
                                },
                                "is_multilanguage": {
                                    "type": "boolean"
                                },
                                "is_multivalue": {
                                    "type": "boolean"
                                },
                                "is_nested": {
                                    "type": "boolean"
                                },
                                "is_path_hierarchy_relation": {
                                    "type": "boolean"
                                },
                                "is_path_relation": {
                                    "type": "boolean"
                                },
                                "is_rendition_relation": {
                                    "type": "boolean"
                                },
                                "is_secured": {
                                    "type": "boolean"
                                },
                                "is_system_owned": {
                                    "type": "boolean"
                                },
                                "is_taxonomy_hierarchy_relation": {
                                    "type": "boolean"
                                },
                                "is_taxonomy_relation": {
                                    "type": "boolean"
                                },
                                "is_unique": {
                                    "type": "boolean"
                                },
                                "labels": {
                                    "properties": {
                                        "en-US": {
                                            "type": "string"
                                        },
                                        "ja-JP": {
                                            "type": "string"
                                        }
                                    },
                                    "type": "object"
                                },
                                "name": {
                                    "type": "string"
                                },
                                "parent_is_mandatory": {
                                    "type": "boolean"
                                },
                                "path_hierarchy_score": {
                                    "type": "integer"
                                },
                                "role": {
                                    "type": "string"
                                },
                                "stored_in_graph": {
                                    "type": "boolean"
                                },
                                "type": {
                                    "type": "string"
                                },
                                "validation_expression": {}
                            },
                            "required": [
                                "type",
                                "name",
                                "labels",
                                "helptext",
                                "is_conditional",
                                "conditions",
                                "can_trigger_conditional_members",
                                "is_system_owned",
                                "is_secured",
                                "can_write",
                                "allow_updates"
                            ],
                            "type": "object"
                        },
                        "type": "array"
                    },
                    "name": {
                        "type": "string"
                    }
                },
                "required": [
                    "name",
                    "labels",
                    "members",
                    "is_system_owned",
                    "is_conditional",
                    "conditions",
                    "is_secured"
                ],
                "type": "object"
            },
            "type": "array"
        },
        "modified_by": {
            "properties": {
                "href": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                }
            },
            "type": "object"
        },
        "modified_on": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "related_paths": {
            "properties": {
                "href": {
                    "type": "string"
                },
                "templated": {
                    "type": "boolean"
                },
                "title": {
                    "type": "string"
                }
            },
            "type": "object"
        },
        "self": {
            "properties": {
                "href": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                }
            },
            "type": "object"
        }
    },
    "type": "object"
}
```

手順は以下の様な動画となります。

![contentdata6](img/2021/01/contentdata6.gif "contentdata6")



![contentdata7](img/2021/01/contentdata7.gif "contentdata7")


#### テキストの翻訳

取得したデータから、英語のタグラベルを取得して Microsoft Translator にデータを渡します。

まずは変数を作成して初期化します。

![mstranslator1](img/2021/01/mstranslator1.gif "mstranslator1")

#### タグのデータを更新する

最後に http の put でエンティティを更新します。

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
![http5](img/2021/01/http5.gif "http5")

## 動作確認



## まとめ

