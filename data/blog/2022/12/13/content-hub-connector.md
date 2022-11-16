---
title: XM Cloud - Sitecore Content Hub コネクタを有効にする
date: '2022-12-13'
tags: ['XM Cloud', 'Content Hub']
draft: false
summary: Sitecore Content Hub の DAM 機能を有効にするために、XM Cloud と連携させるためにはコネクタを有効にする必要があります。今回は、この手順に関して紹介をします。
images: ['/static/images/2022/12/contenthub03.png']
---

Sitecore Content Hub の DAM 機能を有効にするために、XM Cloud と連携させるためにはコネクタを有効にする必要があります。今回は、この手順に関して紹介をします。

## コネクタを有効にする

XM Cloud を利用するにあたって、コネクタの連携は従来と異なる SaaS となるため手順が変わってきます。Sitecore Content Hub の DAM および CMP の連携に関しては、標準機能として提供しており、この機能を有効にするのは非常に簡単です。今回はこの手順を紹介します。

まず、XM Cloud Deploy で設定をしたい環境を選択して、メニューの項目から Environment Variable を選択してください。

![Content Hub](/static/images/2022/12/contenthub01.png)

以下の２つの項目を追加してください。

| Name                                      |     |
| ----------------------------------------- | --- |
| SITECORE_AppSettings_cmpEnabled\_\_define | Yes |
| SITECORE_AppSettings_damEnabled\_\_define | Yes |

以下のような形となります。

![Content Hub](/static/images/2022/12/contenthub02.png)

これで準備が完了です。メニューから Build & Deploy を選択して改めて展開が完了したあと、管理画面にアクセスをするとコネクタが有効になっていることがわかります。

![Content Hub](/static/images/2022/12/contenthub03.png)

## Sitecore Content Hub との連携

次は実際に接続する Content Hub の情報を XM Cloud のインスタンスに登録する必要があります。従来であれば Connection String に接続文字列を記載する形となりますが、XM Cloud では上記と同じように Environment variables に設定をする必要があります。

この際、接続をするためのパラメーター名は以下のようになります。右側の値は、接続をする Content Hub から取得してください。

事前に Content Hub に関して設定すべき点は、以下のページに紹介をしているステップと同じです。

- [Sitecore Connect for Content Hub 5.0 のインストール](/blog/2022/03/22/sitecore-connect-for-content-hub-5.0)

上記のページの以下の項目を設定して、Content Hub にローカルアカウントでログインできるようにしつつ、CORS の設定も完了させておきます。

- Content Hub の設定変更

Environment variables の設定は以下の表を参考にしてください。

| Name                                                       | 値                                                                                                   |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Sitecore_ConnectionStrings_CMP_dot_ContentHub              | {client_id};ClientSecret={client_secret};UserName={username};Password={password};URI={uri};          |
| Sitecore_ConnectionStrings_CMP_dot_ServiceBusEntityPathIn  | {Azure Service Bus connection string with incoming topic}                                            |
| Sitecore_ConnectionStrings_CMP_dot_ServiceBusEntityPathOut | {Azure Service Bus connection string with outcoming topic}                                           |
| Sitecore_ConnectionStrings_CMP_dot_ServiceBusSubscription  | {Subscription name}                                                                                  |
| Sitecore_ConnectionStrings_DAM_dot_ContentHub              | ClientId={client_id};ClientSecret={client_secret};UserName={username};Password={password};URI={uri}; |
| Sitecore_ConnectionStrings_DAM_dot_ExternalRedirectKey     | Sitecore                                                                                             |
| Sitecore_ConnectionStrings_DAM_dot_SearchPage              | \_dot_SearchPage {Content Hub search page URI}                                                       |

## Sitecore Content Hub 側の設定
