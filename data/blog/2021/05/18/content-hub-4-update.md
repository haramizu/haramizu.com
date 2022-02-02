---
title: Content Hub - 4.0 新機能について
date: '2021-05-18'
tags: ['Content Hub']
draft: false
summary: Sitecore Content Hub のコンテンツ作成において、多言語のコンテンツを作成したいケースがあります。実際に翻訳をするのも良しですが、機械翻訳と連携するシナリオを実装していきます。
images: ['/static/images/2021/05/ch407.png']
---

Sitecore Content Hub はデジタルアセット管理の機能を基盤として、企業で求められるサービスを実装しています。今回は Sitecore Content Hub 4.0 でリリースされた新機能について紹介をしていきます。

## 新しく提供するライセンス

これまで Sitecore Content Hub 3.4.x までで提供していたライセンスは以下の通りです。

* デジタルアセット管理（DAM:Media）
* 製品コンテンツ管理（PCM:Product)
* コンテンツマーケティングプラットフォーム（CMP:Content)
* マーケティングリソースマネージャー（MRM:Project）
* Web 2 Print (Print)
* Salesforce Connector (Salesforce)
* フリーモデリング (FeelModeling) 

基本機能として提供しているのが Media + Product となっており、それ以外は個別にライセンスが設定されているケースがあります。Sitecore Content Hub 4.0.x から新たに１つ追加で機能がリリースされました。

* コンテンツ公開（Content Publishing)

また、このコンテンツ公開の機能と合わせて新しい機能がリリースされています。

* Sitecore Experience Edge for Content Hub

今回は、１つ目のコンテンツ公開に関する機能を紹介します。

## コンテンツ公開とは？

コンテンツ公開機能を利用することで、Sitecore Content Hub の CMP で作成したコンテンツを GraphQL を通じてコンテンツを公開することができるようになります。もちろん、GraphQL でアクセスすることができるデータとしては DAM / PCM のデータも利用できるようになります。

### 機能を有効にする

今回は Sitecore Content Hub 4.0.0 のサンドボックスを利用して紹介をします。この機能は契約をしていないと利用出来ないため、環境によっては以下の手順はできませんのでご了承ください。

まず最初に、管理画面で機能を有効にします。管理画面から**設定**を開き、**publishing** の設定を選択してください。

![ContentHub4](/static/images/2021/05/ch401.png "ContentHub4")

上の図はすでに設定済みですが、２つの項目に関してチェックをした上で、保存をしてください。これで API キーの発行ができるようになります。

### API キーを発行する

機能を有効にすると、API キーの作成が可能となります。管理画面で **API キー** を選択してください。

![ContentHub4](/static/images/2021/05/ch402.png "ContentHub4")

初めてあるとキーは何もない状態です。

![ContentHub4](/static/images/2021/05/ch403.png "ContentHub4")

今回はプレビュー用の API キーを発行します。

![ContentHub4](/static/images/2021/05/ch404.png "ContentHub4")

作成をすると API キーが一時的に表示されます。このキーは再度確認することができませんので、大切なキーとして管理してください。

![ContentHub4](/static/images/2021/05/ch405.png "ContentHub4")

キーが有効になると、作成したキーを確認できるようになります。

![ContentHub4](/static/images/2021/05/ch406.png "ContentHub4")

このキーを利用して、GraphQL を利用していきましょう。

## GraphQL を利用する

### GraphQL IDE を利用する

ブラウザで GraphQL を利用することができる画面を用意しています。ご利用のインスタンスで、以下のようにアクセスをしてください。

```
https://{youe-instance}/api/graphql/preview/ide/
```

アクセスをすると以下のような画面に切り替わります。

![ContentHub4](/static/images/2021/05/ch407.png "ContentHub4")

左下にリクエストの際に利用するヘッダーの定義があります。ここに、先ほど作成をした Token を利用して、**X-GQL-Token** と組み合わせて以下のようにヘッダーを記載してください。

```json
{
"X-GQL-Token":"L0pYRkx6bmVYOWZtZmsxSVZqSkNuTm1YcU9jK2wwRXE4eTJBVFZYNkdkST18bGlnaHRob3VzZTQwMWph"
}
```

また左側には Query を入力します。取り急ぎ、Query のサンプルページのコードを参照します。

* [GraphQL の例](https://docs.stylelabs.com/ja-jp/contenthub/4.0.x/content/user-documentation/experience-edge/content-delivery/graphql/graphql-examples.html?rp=true&rv=true)

今回は以下のコードを左側に設定しました。

```graphql
{
  allM_Content(where: { publishStatus_eq: "Published" }) {
    total
    results {
      content_Name
      publishStatus
      __typename
    }
  }
}
```

実行前の画面は以下のようになります。

![ContentHub4](/static/images/2021/05/ch408.png "ContentHub4")

それでは中央にある実行ボタンをクリックしてください。問い合わせた結果が JSON のデータとして返ってきます。

![ContentHub4](/static/images/2021/05/ch409.png "ContentHub4")

このように、GraphQL を利用して Sitecore Content Hub に蓄積しているデータにアクセスする方法を確認しました。

### Postman でアクセスをする

Sitecore Content Hub で提供している IDE 以外からのアクセスとして、Postman を利用した場合のアクセス方法を紹介します。

新しいクエリを利用して、以下のように設定を進めてください。

* リクエスト方法は POST を選択
* エンドポイントは https://youe-instance/api/graphql/preview/v1
* Headers に KEY として X-GQL-Token を、Value に作成したキーを設定

![ContentHub4](/static/images/2021/05/ch410.png "ContentHub4")

* Body に GraphQL のクエリーを設定

![ContentHub4](/static/images/2021/05/ch411.png "ContentHub4")

上記の設定が完了した段階で、**Send** ボタンをクリックしてください。GraphQL からの結果が画面の下に表示されます。

![ContentHub4](/static/images/2021/05/ch412.png "ContentHub4")

GraphQL IDE と同じ結果を Postman を利用して取得することが出来ました。

## まとめ

今回は、Sitecore Content Hub の新しい機能として提供されたコンテンツ公開の機能を紹介しました。これにより、Sitecore Content Hub に蓄積されている情報を、他のシステムから簡単に参照することができます。ヘッドレス CMS として利用できる、という流れになりますので、これが別途ご紹介をする Sitecore Experience Edge for Content Hub との連携となります。