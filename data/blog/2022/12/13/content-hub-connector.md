---
title: XM Cloud - Sitecore Content Hub コネクタを有効にする
date: '2022-12-13'
tags: ['XM Cloud', 'Headless SXA', 'Content Hub']
draft: false
summary: Sitecore Content Hub の DAM 機能を有効にするために、XM Cloud と連携させるためにはコネクタを有効にする必要があります。今回は、この手順に関して紹介をします。
images: ['/static/images/2022/10/symposium.png']
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

![Content Hub](/static/images/2022/12/contenthub02.png)

これで準備が完了です。メニューから Build & Deploy を選択して改めて展開が完了したあと、管理画面にアクセスをするとコネクタが有効になっていることがわかります。

![Content Hub](/static/images/2022/12/contenthub03.png)

## Sitecore Content Hub との連携

DAM_ContentHub=ClientId={client_id};ClientSecret={client_secret};UserName={username};Password={password};URI={uri};
DAM_SearchPage={Content Hub search page URI}
DAM_ExternalRedirectKey=Sitecore
