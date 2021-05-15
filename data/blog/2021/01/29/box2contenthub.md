---
title: Box と Sitecore Content Hub DAM の連携
date: '2021-01-29'
tags: ['Content Hub', 'Box']
draft: false
summary: 今回は Box と Sitecore Content Hub の DAM との連携するサンプルを作成しながら、開発のための基本的な手順を紹介していきます。Box にファイルを配置したものが、自動的に Sitecore Content Hub にアセットとして追加されて、承認待ちのステータスになる様に設定するところまで紹介します。
---

今回は Box と Sitecore Content Hub の DAM との連携するサンプルを作成しながら、開発のための基本的な手順を紹介していきます。Box にファイルを配置したものが、自動的に Sitecore Content Hub にアセットとして追加されて、承認待ちのステータスになる様に設定するところまで紹介します。

## 前提条件

今回のデモ実装に関する前提条件は以下の通りです。

* Box のアカウントがある
* Microsoft Azure の Logic App を利用できる
* Sitecore Content Hub 3.4.6 

あくまでサンプルとして Box を利用した説明となりますが、応用として OneDrive や Dropbox も同様の実装をすることができます。

## Box から直接インポートできないの？

Box のファイルを直接インポートをするためには、Sitecore Content Hub が Web サービス経由で Box のファイルにアクセスできる必要がありますが、このための URL を準備できない問題があります。

例えば、Box のファイルを Web ブラウザで参照した時の URL が以下の様な形だとします。

* https://sample.app.box.com/folder/130423025175

![box01](/static/images/2021/01/box01.png "box01")

この URL でアクセスできるのは Box のアカウントを持ってて権限がある人だけ、という限定された URL になります。ファイルを共有する場合は以下の様に設定します。

![box02](/static/images/2021/01/box02.png "box02")

生成される URL は以下の様になります。

* https://sample.box.com/s/yj8uanz65m2aml342p7xfoioyi0hj632

この URL にアクセスをした場合でも、あくまでも上記に表示しているようなページが表示できるようになるだけで、ファイルに直接アクセスすることはできません。直接アセットをダウンロードするための URL を取得するためには、ダイアログに表示されている**リンク設定**をクリックして別の URL を取得します。

![box03](/static/images/2021/01/box03.png "box03")

**ダウンロードを許可** に記載されている直接リンクがダウンロード用の URL になります。

* https://sample.box.com/shared/static/yj8uanz65m2aml342p7xfoioyi0hj632.jpg

これで直接ダウンロードをするための URL を取得できました。 /s/ のところが /shared/static/ になり、拡張子をつければダウンロードが可能、に見えるのですがこの URL はあくまで URL であってファイル実態とは異なります。この URL にアクセスすると以下の様な URL にリダイレクトされて、ダウンロードすることが可能です。

* https://dl.boxcloud.com/d/1/{ランダムなキー}/download

ランダムなキーが発行されて非常に長い URL からダウンロードすることが可能となります。この URL は上記のダウンロード用の URL にアクセスした時に自動的に生成され、有効期限が設定されているためしばらくすると変更されます。このため、インポートをするための 固定 URL として利用することができません。一方、Sitecore Content Hub のインポートは URL にあるデータをインポートする動作となるため、固定 URL がないアセットのインポートが難しい形です。

今回は、Box にファイルをアップロードすると、それをトリガーとして自動的にファイルを Sitecore Content Hub にアップロードするサンプルプログラムを作ります。

## Sitecore Content Hub の準備

今回は Web サービスを経由してアップロードするため、Web サービスで利用するためのトークンが必要となります。トークンの作成方法は以下の通りです。

* 管理画面のユーザーを開く
* 新しいユーザーを作成する（ 今回は SitecoreDemo ）
* 権限を設定する
* ユーザーのトークンを取得する

![action4](/static/images/2021/01/action4.gif "action4")

## ストレージの準備

今回は Box からファイルを取得して、取得したファイルを Sitecore Content Hub にアップロードする、という形で実装をします。このため、一時的にファイルを保存するストレージを Azure 常に作成をします。

1. リソースグループのリソース一覧で**追加**をクリック
2. *ストレージ アカウント*で検索します
3. **ストレージアカウント**を選択します
4. 名前をつけて作成します

![storage01](/static/images/2021/01/storage01.gif "storage01")

作成したストレージとして、ファイルのアップロードの確認が簡単にできる様に、**BLOB（BLOB専用の匿名読み取りアクセス）**のコンテナーを作成します。左側のメニューにある Blob service の下にある**コンテナー**をクリックします。すると下の画面に切り替わります。

![storage02](/static/images/2021/01/storage02.png "storage02")

続いてコンテナーを追加します。右側のダイアログには入力項目が用意されていますが、今回は boxdemo という名前にします。今回の処理は Logic App の処理を作成している途中、正しくアップされているかどうかを見るため、アクセスレベルは**BLOB（BLOB専用の匿名読み取りアクセス）**にします。

![storage03](/static/images/2021/01/storage03.png "storage03")

これでストレージの準備が完了となります。

![storage04](/static/images/2021/01/storage04.png "storage04")

## Logic App を作成する

ここからは Microsoft Azure の Logic App を作成していく手続きとなります。リソースグループで追加、Logic App で検索をして作成します。今回はアプリの名前を、Box2DAM とします。

![logicapp1](/static/images/2021/01/logicapp1.gif "logicapp1")

作成された Box2DAM のリソースを開きます。まだ何も定義していないため、初期画面が表示されます。

![boxlogicapp1](/static/images/2021/01/boxlogicapp1.png "boxlogicapp1")

今回は**空のロジックアップ**を選択します。すると空っぽのデザイナーの画面になります。

![boxlogicapp2](/static/images/2021/01/boxlogicapp2.png "boxlogicapp2")

### Box と連携させる

まず最初に、Box にファイルが作成された時にトリガーが動く様に設定するため、最初のステップを設定するためにBox で検索をします。

![boxlogicapp3](/static/images/2021/01/boxlogicapp3.png "boxlogicapp3")

Box を選択すると複数のトリガーが表示されます。

![boxlogicapp4](/static/images/2021/01/boxlogicapp4.png "boxlogicapp4")

今回のトリガーは、**ファイルが作成された時（プロパティのみ）**を選択します。すると、以下の様に Box へのログインの画面が表示されます。

![boxlogicapp5](/static/images/2021/01/boxlogicapp5.png "boxlogicapp5")

ログインが完了すると、以下の画面になります。

![boxlogicapp6](/static/images/2021/01/boxlogicapp6.png "boxlogicapp6")

今回は、Box のフォルダとして Box Demo を指定しました。

![boxlogicapp7](/static/images/2021/01/boxlogicapp7.png "boxlogicapp7")

これを保存することで、Box の該当フォルダにファイルがアップロードされたのを、3分に一度確認しにいき、ファイルがあれば Logic App が動く様になります。

実際にフォルダにファイルをおいて、トリガーを実行してください。結果のサンプルは以下の様な本文を取得することができます。

![boxlogicapp8](/static/images/2021/01/boxlogicapp8.png "boxlogicapp8")

```json
{
  "Id": "769263266879",
  "Name": "boxlogicapp4.png",
  "DisplayName": "boxlogicapp4.png",
  "Path": "/すべてのファイル/Box Demo/boxlogicapp4.png",
  "LastModified": "2021-01-28T04:13:13+00:00",
  "Size": 203204,
  "MediaType": "image/png",
  "IsFolder": false,
  "ETag": "\"0\"",
  "FileLocator": "769263266879",
  "LastModifiedBy": "Shinichi Haramizu"
}
```

### ファイルをストレージに一時的に保存する

Box にアップロードされたファイルを、Azure のストレージにアップロードするためのステップを追加していきます。

#### Box ファイル のIDを取得

まず最初は、Box ファイルをアップロードするために、１つ目のトリガーの結果に利用されている Id を変数で設定します。まず、アクションを追加して、**変数**で検索をします。

![boxparam1](/static/images/2021/01/boxparam1.png "boxparam1")

指定した変数のアクションから、**変数を初期化する**を選択します。

![boxparam2](/static/images/2021/01/boxparam2.png "boxparam2")

名前を FileID とし、種類は文字列、値には上記の Box の結果から ID を取得します。作業としては以下の様な流れになります。

![boxparam3](/static/images/2021/01/boxparam3.gif "boxparam3")

#### Box ファイル名の取得

上記の ID の取得と同じ様に、ファイル名を取得します。上記と手順は同じですが、パラメーターが異なります。入力項目は以下のダイアログを参照にしてください。

![boxparam4](/static/images/2021/01/boxparam4.png "boxparam4")

#### ファイルコンテンツの取得

実際にファイルのコンテンツを取得します、これに関しては Box のアクションが提供されており、Box で検索、アクション一覧を表示します。

![boxparam5](/static/images/2021/01/boxparam5.png "boxparam5")

アクション一覧から、ID によるファイルコンテンツの取得を選択します。

![boxparam6](/static/images/2021/01/boxparam6.png "boxparam6")

ダイアログが表示されますので、上記で変数として定義している FileID を入力して保存します。

#### ストレージにデータを保存する

ストレージにアップロードするためのデータが全て揃ったので、次のアクションはストレージにファイルを作成する形となります。まず、Blob で検索をすると以下の様な画面になります。

![upload2blob1](/static/images/2021/01/upload2blob1.png "upload2blob1")

アクションから **Blob の作成**を選択します。作成をすると、サブスクリプションで利用可能なストレージが一覧で表示されます。

![upload2blob2](/static/images/2021/01/upload2blob2.png "upload2blob2")

今回はすでに準備している contenthubdemo を選択します。接続名を記入して、作成ボタンを押します。すると次の様なダイアログになります。

![upload2blob3](/static/images/2021/01/upload2blob3.png "upload2blob3")

値を設定している画面は以下の通りです。

![upload2blob4](/static/images/2021/01/upload2blob4.gif "upload2blob4")

#### 動作確認

動作確認しとして、Box にファイルを配置すると、ストレージにファイルが出来上がっているのか、を確認します。

1. Box にファイルをアップロードする
2. 作成しているトリガーを実行する（3分に一度を待つのは時間がかかるので）
    ![upload2blob5](/static/images/2021/01/upload2blob5.png "upload2blob5")
3. Azure Portal の画面からストレージにファイルが出来上がっているのを確認します
    ![upload2blob6](/static/images/2021/01/upload2blob6.png "upload2blob6")
4. 該当するファイルを確認します
    ![upload2blob7](/static/images/2021/01/upload2blob7.gif "upload2blob7")

ファイルの URL をコピーして、別のブラウザのウィンドウで正しくファイルがアップロードされていることを確認してください。
 
### ストレージにあるファイルを Sitecore Content Hub にアップロードする

Box のファイルがすでに準備できているので、続いて Sitecore Content Hub にアップロードするまでの手続きとなります。ここからは Web サービス経由で Sitecore Content Hub にアクセスするため、サーバーインスタンスおよびトークンを変数で呼び出せるようにします。設定は以下のようにします。

![upload2dam1](/static/images/2021/01/upload2dam1.png "upload2dam1")

![upload2dam2](/static/images/2021/01/upload2dam2.png "upload2dam2")

#### エンティティの作成

アセットを Sitecore Content Hub に登録するにあたって、まず最初に、Sitecore Content Hub に新しいエンティティを作成する必要があります。

これを Logic App の HTTP アクションで処理します。まず新しいアクションで、HTTP を指定します。

![upload2dam3](/static/images/2021/01/upload2dam3.png "upload2dam3")

HTTP を指定すると、いくつかのアクションが表示されます。

![upload2dam4](/static/images/2021/01/upload2dam4.png "upload2dam4")

今回は一番上にある普通の HTTP を選択します。するとダイアログが以下の様に変わります。

![upload2dam5](/static/images/2021/01/upload2dam5.png "upload2dam5")

このダイアログで HTTP の処理を入力していきます。方法やヘッダー情報は以下の様にまとめてください。：

![upload2dam6](/static/images/2021/01/upload2dam6.png "upload2dam6")

新しいエンティティを作成する方法は以下の URL で紹介されています。

* [Create an entity](https://docs.stylelabs.com/content/3.4.x/integrations/rest-api/entities/create-entity.html)

この Json を本文に記載してください。

```json
{
    "properties":{
        "Property1":"Some value",
        "Property2":42
    },
    "relations": {
        "FinalLifeCycleStatusToAsset": {
            "parent": {
                "href": "http://hostname/api/entities/{id}"
            }
        }
    },
    "entitydefinition":{
        "href":"http://hostname/api/entitydefinitions/EntityDefinition1"
    }
}
```

![upload2dam7](/static/images/2021/01/upload2dam7.png "upload2dam6")

上記の本文を少しづつ変更していきます。

properties にはファイルの属性を定義することになります。今回はファイル名ぐらいなので、以下の様に書き換えます。FileName は Box から取得した値を設定している変数を記載します。

```json
    "properties":{
        "Title":"FileName"
    },
```

続いて relations の中に記載している FinalLifeCycleStatusToAsset にはファイルのライフサイクルの ID を設定します。接続する先の管理画面で、

1. タクソノミー
2. M.Final.LifeCycle.Status を選択
3. UnderReview のタクソノミーを選択
4. URL に記載される値が ID になります

今回下書きにアップロードされる様にしたいので、UnderReview に設定します。URL には、https://servername/ja-jp/admin/taxonomymgmt/43?s=543 が表示されているため、543 が ID になります。ID が正しいかどうか確認するためには、 https://servername/api/entities/543 にアクセスすることで確認も可能です。

![upload2dam8](/static/images/2021/01/upload2dam8.png "upload2dam8")

このため、仕上がりは以下の様になります。

```json
    "relations": {
        "FinalLifeCycleStatusToAsset": {
            "parent": {
                "href": "http://hostname/api/entities/543"
            }
        }
    },
```

最後の項目、entitydefinition にはどのエンティティタイプを利用するのかの名前を定義する必要があります。今回はアセットなので M.Asset を指定します。

```json
    "entitydefinition":{
        "href":"http://hostname/api/entitydefinitions/M.Asset"
    }
```
上記の値を反映させた結果は、以下の様な画像となります。hostname も変数を指定してください。

![upload2dam9](/static/images/2021/01/upload2dam9.png "upload2dam9")

これで新規のエンティティが生成されます。実際にファイルを box のフォルダにコピーして実行しましょう。結果として、以下のような JSON を取得していれば、新しいエンティティが出来上がっていることになります。

```json
{
  "id": 31993,
  "identifier": "m8UQf1YvlESJ2pbtvATQeA"
}
```

#### エンティティを更新する

作成したエンティティに、事前に Azure のストレージにアップロードしているファイルに更新を実行します。この実行方法に関しては、以下の URL の処理を実行することになります。

* [Create a new Fetch Job](https://docs.stylelabs.com/content/3.4.x/integrations/rest-api/fetch/create-fetch-job.html)

ポストする本文のサンプルは以下の通りです。

```json
{
    "state_description":"",
    "asset":{
        "href":"/entities/23"
    },
    "files":[
        {
            "type":"File",
            "path":"\\server\path\file1.jpg"
        },
        {
            "type" : "Web",
            "href" : "http://www.gstatic.com/webp/gallery/5.jpg"
        },
        {
            "type":"Azure",
            "key":"fileProviderName-/path/to/file/on/blob/storage.jpg"
        }
    ]
}
```

まず最初の値は asset となっています。

```json
    "asset":{
        "href":"/entities/23"
    },
```

この数字のところには、更新先のアセットの ID を設定する必要があります。そこで、１つ前に実施している HTTP にの結果を JSON の解析を利用して値として使えるようにします。

HTTP の後ろに新しいステップとして、**データ操作**を選択します。

![updatedam1](/static/images/2021/01/updatedam1.png "updatedam1")

データ操作のアクションにある、JSON の解析を選択します。

![updatedam2](/static/images/2021/01/updatedam2.png "updatedam2")

コンテンツには１つ前の HTTP 本文を指定します。また、スキーマに入力する項目は、事前のテスト結果で出てきた JSON のデータをサンプルのペイロードとして入れることで出来上がります。作業の内容は次の様になります。

![updatedam3](/static/images/2021/01/updatedam3.gif "updatedam3")

これで JSON のデータからエンティティの ID を取得できるようになりました。合わせてサーバーの名前なども含めて、以下の様に書き換えます。

```json
    "asset":{
        "href":"https://hostname/api/entities/EntityID"
    },
```

続いて記載されている JSON の項目を見ると以下の様になっています。

```json
    "files":[
        {
            "type":"File",
            "path":"\\server\path\file1.jpg"
        },
        {
            "type" : "Web",
            "href" : "http://www.gstatic.com/webp/gallery/5.jpg"
        },
        {
            "type":"Azure",
            "key":"fileProviderName-/path/to/file/on/blob/storage.jpg"
        }
    ]
```

ファイルを反映させる方法としては、上記のような３つのパターンがありますが、今回は Web が対象となります。記述は非常にシンプルで以下のようになります。

```json
    "files":[
        {
            "type" : "Web",
            "href" : "http://www.gstatic.com/webp/gallery/5.jpg"
        }
    ]
```

あとは URL をストレージにアップロードしている URL に補正するだけで完了となります。これらを全て反映させたコードは以下の様になります。

```json
{
    "asset":{
        "href":"https://@{variables('hostname')}/api/entities/@{body('JSON_の解析')?['id']}"
    },
    "files":[
        {
            "type" : "Web",
            "href" : "https://contenthubdemo.blob.core.windows.net@{body('BLOB_の作成')?['Path']}"
        }
    ]
}
```

![updatedam4](/static/images/2021/01/updatedam4.png "updatedam4")

## アップロードテスト

ここまで正しく実装ができていれば、あとは Box で指定したフォルダのファイルが Sitecore Content Hub にアップロードされます。なお、アップロードされた段階でレビュー中となりますので、レビュー権限のあるユーザーでログインをして確認をしてください。

![box2chdemo](/static/images/2021/01/box2chdemo.gif "box2chdemo")

Box にファイルをおいた後、そのファイルが Sitecore Content Hub のアセットとしてアップロードされていることを確認できました。

## まとめ

今回は Box から Sitecore Content Hub に自動的にアップロードする仕組みを、 API を利用して構築しました。この形を応用することで、移行するための専用ツールの作り方（ Web サービス連携で作れます）を理解していただけます。

そして今回は Logic App の仕組みを利用することで、ファイルが作成されたというトリガーを下に、複数のステップが動き、その際にアクションを利用することで他の環境にもアクセスしてデータをまとめる、というサンプルにもなっています。