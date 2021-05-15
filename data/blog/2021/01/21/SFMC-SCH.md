---
title: Salesforce Marketing Cloud と Sitecore Content Hub DAM の連携
date: '2021-01-21'
tags: ['Content Hub', 'Salesforce']
draft: false
summary: Salesforce Marketing Cloud を利用するために Sitecore Content Hub で管理しているアセットを直接利用できるように接続をする手順を紹介します。
---

Salesforce Marketing Cloud を利用するために Sitecore Content Hub で管理しているアセットを直接利用できるように接続をする手順を紹介します。

## 前提条件

前提条件として Sitecore Content Hub のインスタンスに対して、Salesforce Marketing Cloud と連携するためのモジュールが設定されている必要があります。また、今回は Sitecore Content Hub 3.4 を利用して手続きの紹介をしています。

## Sitecore Content Hub の設定

Salesforce Marketing Cloud と Sitecore Content Hub の連携をするための手順は以下の通りです。

### CROS の設定

Salesforce Marketing Cloud と連携するためには、Sitecore Content Hub の CORS の設定をする必要があります。

1. 管理ツールを開きます
2. 設定を開きます
3. Portalconfiguration の下にある CORSConfiguration を選択します。

![sch1](/static/images/2021/01/sch1.gif "sch1")

今回接続をする Salesforce Marketing Cloud のサーバーの名前を https から含めて入力をしていきます。追加をする CORS に関しては、以下の３つを追加する必要があります。Salesforce_Marketing_Endpoint は実際に契約をしているインスタンス名となります。

```
https://mc.Salesforce_Marketing_Endpoint.exacttarget.com
https://content-builder.Salesforce_Marketing_Endpoint.marketingcloudapps.com 
https://email-app.Salesforce_Marketing_Endpoint.marketingcloudapps.com 
```

![sfmc3](/static/images/2021/01/sch2.gif "sfmc3")

これで、Sitecore Content Hub が Salesforce Marketing Cloud と連携するようになりました。

## Salesforce Marketing Cloud の設定

Salesforce Marketing Cloud の連携としては、Sitecore Content Hub Salesforce Marketing Cloud連携パッケージを作成する必要があります。手順は以下の通りです。

### パッケージの作成

パッケージを作成するためには、管理者権限で Salesforce Marketing Cloud にログインをする必要があります。

![sfmc2](/static/images/2021/01/sfmc2.png "sfmc2")

ダッシュボードにアクセスをしたあと、管理者ユーザーのアイコンからセットアップを選択します。

![sfmc3](/static/images/2021/01/sfmc3.png "sfmc3")

管理画面が切り替わったあと、**プラットフォームツール**の下にある**アプリ**オプションを開きます。開くと**インストール済みパッケージ**のメニューが表示されますので、クリックをして画面を切り替えます。**インストール済みパッケージ** を選択すると、既にインストールされているパッケージが一覧で表示されます。

![sfmc4](/static/images/2021/01/sfmc4.png "sfmc4")

画面の右上に表示されている**新規**のボタンをクリックします。以下の様なダイアログが表示されます。ここでは名前にパッケージの名前を、説明にはそのコネクタに関する説明を記載しています。

![sfmc5](/static/images/2021/01/sfmc5.png "sfmc5")

### コンポーネントの作成

完了すると以下の画面になります。この画面で**コンポーネントの追加**をクリックします。

![sfmc6](/static/images/2021/01/sfmc6.png "sfmc6")

コンポーネントとしては、以下の様に**カスタムコンテンツブロック**を選択してください。

![sfmc7](/static/images/2021/01/sfmc7.png "sfmc7")

| 入力項目 | 内容 | 入力例 |
|-|-|-|
| 名前 | コンポーネントの名前 | Sitecore Content Hub |
| 説明 | コンポーネントの説明 | Drag and Drop component |
| エンドポイント URL | インスタンス名 | 下記に記載 |

エンドポイントには、先ほど CORS を設定した Sitecore Content Hub のインスタンスを利用してください。また実際にアクセスする URL も含めて入れるため、以下の様になります。

```
https://your-sitecore-instance.io/en-us/salesforce-connect/salesforce-connect-approved-assets?forcePassive=true
```

日本語の UI を準備している場合は、上記の URL の en-us を ja-JP に設定するだけで日本語の管理画面同士で連携できます。

設定のサンプル画面は以下の通りです

![sfmc8](/static/images/2021/01/sfmc8.png "sfmc8")

### アクセス件の設定

続いてアクセス件に関して設定をします。保存されている画面の上に表示されている**アクセス**をクリックしてください。すると以下の様に画面が切り替わります。

![sfmc9](/static/images/2021/01/sfmc9.png "sfmc9")

利用できるユーザーを選択して保存してください。

## 連携の流れ

メールを作成する画面に移動するために、Content Builder に移動します。サンプルのメールを準備してください。

![sfmcinch1](/static/images/2021/01/sfmcinch1.png "sfmcinch1")

コンテンツブロックの一番下に、カスタムとして Sitecore Content Hub のアイコンが表示されています。

![sfmcinch2](/static/images/2021/01/sfmcinch2.png "sfmcinch2")

表示されているアイコンを、メール側にドラッグ & ドロップで持っていきます。

![sfmcinch3](/static/images/2021/01/sfmcinch3.gif "sfmcinch3")

続いてブロック一覧の画面が拡張子、Sitecore Content Hub のアセットを選択する画面となります。

![sfmcinch4](/static/images/2021/01/sfmcinch4.png "sfmcinch4")


このあとは画像を選択、用意されている公開リンクを選択するか、公開リンクを作成することで、メールの画像として利用できるようになります。

一貫した動きの画像は以下の通りです。

![sfmcinch5](/static/images/2021/01/sfmcinch5.gif "sfmcinch5")

## まとめ

上記の設定、および連携の流れの通り、Sitecore Content Hub の DAM で提供している素材をメールの中に埋め込むことが可能です。この際、利用したい画像にレンディション（画像サイズのタイプ）が準備されていない場合は、この画面上で作成することができます。メールの画像に関しては別途アセットが増える形ではなく、元の画像に対するレンディションとして設定される形です。

今回は管理者権限で全て実行しましたが、メールの画像に関して利用できるものを Sitecore Content Hub の DAM 側でユーザーの権限に合わせて制御することで、デジタルデータのガバナンスを担保することができます。

## 参考資料

* [Sitecore Connect™ for Salesforce Marketing Cloud](https://docs.stylelabs.com/content/3.4.x/user-documentation/content-user-manual/integrate/sitecore-connect-for-salesforce-marketing-cloud/overview.html)