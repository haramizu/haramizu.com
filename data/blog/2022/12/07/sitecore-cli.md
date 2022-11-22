---
title: Sitecore CLI を利用してクラウドとローカルの環境を揃える
date: '2022-12-07'
tags: ['XM Cloud', 'Sitecore CLI']
draft: false
summary: XM Cloud のローカルの環境とサーバーとして利用している SaaS の XM Cloud の環境を同期する方法を紹介します。今回は全てを一括で同期していますが、アイテムに関して全て同期するとデータ量も増えるため、実際の開発環境では必要なデータだけを同期させて運用することになります。それでは早速環境を整えるところからスタートします。
images: ['/static/images/2022/12/cli04.png']
---

XM Cloud のローカルの環境とサーバーとして利用している SaaS の XM Cloud の環境を同期する方法を紹介します。今回は全てを一括で同期していますが、アイテムに関して全て同期するとデータ量も増えるため、実際の開発環境では必要なデータだけを同期させて運用することになります。それでは早速環境を整えるところからスタートします。

## インポート、エクスポートの環境を整える

まずローカルの XM Cloud の環境でコンテンツエディターにアクセスをします。以下のようにアイテムが何もない状況となっています。

![sitecore cli](/static/images/2022/12/cli01.png)

それではローカルのリポジトリのトップで、Sitecore CLI のコマンドを利用して環境を整えていきます。まず最初に、`dotnet sitecore cloud login --allow-write true` のコマンドを実行して XM Cloud にログインをします。

```
PS C:\projects\sxastarter> dotnet sitecore cloud login --allow-write true
[DeviceLogin] User Code : VVBK-FDTH
[DeviceLogin] Authentication url : https://auth.sitecorecloud.io/activate?user_code=VVBK-FDTH
[DeviceLogin] Authorization pending. Waiting.
PS C:\projects\sxastarter>
```

ログインの際には一度ブラウザが起動するため、ブラウザで XM Cloud の環境にログインをしてください。

![sitecore cli](/static/images/2022/12/cli02.png)

続いて、ローカルのプロジェクトがどの環境に接続するのかを取得していきます。まず最初に、XM Cloud で展開しているプロジェクト一覧を取得します。コマンドは、 `dotnet sitecore cloud project list` となります。

```
PS C:\projects\sxastarter> dotnet sitecore cloud project list

sxastarter Project detailed information:
Organization Name : sitecore-saas-ops-sales-engineers-16
Organization Id   : org_demodemodemodemo
Project Id        : 4KRUJ3FMWIJaDsBIod0oAL
Project name      : sxastarter
Region            : jpe (Japan East)
Created by        : shinhara@example.com
Created at        : 2022/11/14 4:29:57
Last updated by   : shinhara@example.com
Last updated at   : 2022/11/14 4:29:57

PS C:\projects\sxastarter>
```

プロジェクトの ID をリストから取得することができます。この ID を利用して、今度は環境の一覧を取得するコマンド `dotnet sitecore cloud environment list --project-id projectid` を実行します。

```
PS C:\projects\sxastarter> dotnet sitecore cloud environment list --project-id 4KRUJ3FMWIJaDsBIod0oAL
Found 1 environment(s)
development Environment detailed information:
Organization Id                   : org_demodemodemodemo
Organization Name                 : sitecore-saas-ops-sales-engineers-16
Project Id                        : 4KRUJ3FMWIJaDsBIod0oAL
Project name                      : sxastarter
Environment Id                    : 5lCcnEfcWlVfZLjbRyboNq
Environment Name                  : development
Environment Host                  : xmc-sitecoresaademo-sxastarter-development.sitecorecloud.io
Environment Type                  : nonprod
Created by                        : shinhara@example.com
Created at                        : 2022/11/14 4:29:59
Last updated by                   : shinhara@example.com
Last updated at                   : 2022/11/14 6:29:45
Provisioning status               : Complete
Provisioning last failure message :

PS C:\projects\sxastarter>
```

プロジェクトの中には複数の環境が用意されている場合は、最適な環境を選択してください。あとは、以下のコマンドで環境 ID を利用して接続をします。

```
PS C:\projects\sxastarter> dotnet sitecore cloud environment connect --environment-id 5lCcnEfcWlVfZLjbRyboNq
Connecting to the environment...
PS C:\projects\sxastarter>
```

環境につなげることができました。続いて、Index の作成および環境の名前をつけます。今回は以下のような形で実行しました。

```
PS C:\projects\sxastarter> dotnet sitecore index list --environment-name development
Indexes list:
sitecore_core_index
sitecore_master_index
sitecore_web_index
sitecore_horizon_index
PS C:\projects\sxastarter>
```

## 連携をするデータの設定

Sitecore CLI のコマンドは、標準では `src` の直下にある json ファイルを参照して、items のフォルダの中に yml ファイルを作成していきます。今回は、必要となるアイテムの定義は以下の３つのファイルとして作成をします。なお、今回は sxastarter で web サイトを作成しましたが、異なる場合は以下の json ファイルのパスが異なる形となりますのでご注意ください。

```json:src\InitItems.module.json
{
    "namespace": "InitItems",
    "items" : {
        "includes": [
            {
                "name": "content-root",
                "path": "/sitecore/content",
                "scope": "singleItem",
                "allowedPushOperations": "createAndUpdate"
            }
        ]
    }
}
```

```json:src\SitecoreDemo-Content.module.json
{
    "namespace": "SitecoreDemo-Content",
    "references": [ "SitecoreDemo" ],
    "items": {
        "includes": [
            {
                "name": "content",
                "path": "/sitecore/content/sxastarter"
            },
            {
                "name": "media",
                "path": "/sitecore/media library/Project/sxastarter"
            }
        ]
    }
}
```

```json:src\SitecoreDemo.module.json
{
    "namespace": "SitecoreDemo",
    "references": [ "InitItems" ],
    "items": {
        "includes": [
            {
                "name": "placeholders",
                "path": "/sitecore/layout/Placeholder Settings/Project/sxastarter"
            },
            {
                "name": "renderings",
                "path": "/sitecore/layout/Renderings/Project/sxastarter"
            },
            {
                "name": "templates",
                "path": "/sitecore/templates/Project/sxastarter"
            },
            {
                "name": "languages",
                "path": "/sitecore/system/Languages"
            }
        ]
    }
}
```

上記の 3 つの json ファイルを作成したあと、インポートなどの作業もできるように以下のファイルの allowWrite の項目を `true` にしてください。

```json:.sitecore\user.json
    "development": {
      "ref": "XmCloud",
      "allowWrite": true,
      "host": "https://xmc-sitecoresaademo-sxastarter-development.sitecorecloud.io/",
      "variables": {}
    }
```

これで準備が完了となりました。

## データの取得、反映

まずクラウドの環境からデータを取得します。以下のコマンドを実行すると、 `src\items` の中に多くのアイテムのデータが yaml ファイルとして作成されます。

```
dotnet sitecore ser pull -n development
```

SaaS で展開している XM Cloud からアイテムのデータを取得できたことを確認して、ローカルの環境（ default ）に push してください。

```
dotnet sitecore ser push -n default
```

この段階で XM Cloud の SaaS 版のアイテムが全てローカルで展開されました。１点、ローカルで動かす際の Node.js の Docker コンテナの指定が SaaS のインスタンスとなり利用することができません。この定義は、Sitecore のアイテムの `/sitecore/system/Settings/Services/Rendering Hosts/Default` が設定先となります。

- Server side rendering engine endpoint URL: http://rendering:3000/api/editing/render
- Server side rendering engine application URL: http://rendering:3000

![sitecore cli](/static/images/2022/12/cli03.png)

改めてアイテムにデータを反映させるために、以下のコマンドを実行してください。

```
dotnet sitecore ser pull -n default
```

これでデータのインポートが完了となりました。ローカルの XM Cloud でエクスペリエンスエディターを起動すると、以下のようにみたまま編集の環境が整いました。

![sitecore cli](/static/images/2022/12/cli04.png)

## まとめ

上記の手続きを理解していただくことで、SaaS の CMS として展開している XM Cloud の環境と、同じサーバーをローカルで起動して開発をすることが可能となります。手元で開発、テストを実行、必要なアイテムをプロジェクトに追加していくという形で、開発を進めていくことができます。

上記の内容をダイジェストで紹介している動画を YouTube にアップしています。参考にしてください。

[![](https://img.youtube.com/vi/8ouE-pT5fDw/0.jpg)](https://www.youtube.com/watch?v=8ouE-pT5fDw)
