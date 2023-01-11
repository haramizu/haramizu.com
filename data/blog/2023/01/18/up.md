---
title: 起動するためのスクリプトの調整
date: '2023-01-18'
tags: ['Docker', 'Next.js', 'XM']
draft: false
summary: Docker のプロジェクトを作成して、Headless SXA の開発をすることができる環境まで手順を進めていきましたが、これを毎回実施するのは面倒です。そこで今回は、これまでブログで紹介をしてきた内容を一足飛びで利用できるプロジェクトを作成していきます。
images: ['/static/images/2023/01/nextjs03.png']
---

Docker のプロジェクトを作成して、Headless SXA の開発をすることができる環境まで手順を進めていきましたが、これを毎回実施するのは面倒です。そこで今回は、これまでブログで紹介をしてきた内容を一足飛びで利用できるプロジェクトを作成していきます。

## データをシリアライズする

これまで作成してきた Sitecore のプロジェクトをコマンドを利用してシリアライズ、簡単にサイトを立ち上げることができるようにします。ポイントとしては、前回の記事で Rendering Host のアイテムを変更しているため、この項目も反映できるように、ファイルを以下のように更新します。`rendering-host` の部分が追加された点です。

```yml:src\InitItems.module.json
{
    "namespace": "InitItems",
    "items" : {
        "includes": [
            {
                "name": "content-root",
                "path": "/sitecore/content",
                "scope": "singleItem",
                "allowedPushOperations": "createAndUpdate"
            },
            {
                "name": "api-key",
                "path": "/sitecore/system/Settings/Services/API Keys/DockerStarter",
                "scope": "singleItem"
            },
            {
                "name": "rendering-host",
                "path": "/sitecore/system/Settings/Services/Rendering Hosts/Default",
                "scope": "singleItem"
            },
            {
                "name": "core-language",
                "path": "/sitecore/system/Languages",
                "database": "core"
            }
        ]
    }
}
```

変更後、コマンドを実行してシリアライズの手順を完了します。

```
dotnet sitecore login
dotnet sitecore ser pull
```

## 各種パラメーターの受け渡し

最後に up.ps1 のファイルを編集します。これも、トップレベルに .env ファイルなどを移動させたために必要となる作業です。ここはシンプルで、

```powershell:up.ps1
$workingDirectoryPath;
```

ここで以下のように設定します。

```powershell:up.ps1
$workingDirectoryPath= ".\";
```

そして以下のコードを削除します。

```powershell:up.ps1
foreach ($topology in $topologyArray)
{
  $envCheck = Get-Content (Join-Path -Path ($startDirectory + $topology) -ChildPath .env) -Encoding UTF8 | Where-Object { $_ -imatch "^$envCheckVariable=.+" }
  if ($envCheck) {
    $workingDirectoryPath = $startDirectory + $topology;
    break
  }
}

if (-not $envCheck) {
    throw "$envCheckVariable does not have a value. Did you run 'init.ps1 -InitEnv'?"
}
```

![clean](/static/images/2023/01/clean07.png)

ログインをすると CLI でインポートをするための権限を付与するかどうかの確認画面が表示されます。

![clean](/static/images/2023/01/clean08.png)

ここではそのまま OK を押して進めていきます。途中からヘッドレスのプロジェクトを今回作成していないためエラーになって止まりますが、この不足部分は後ほど補足するので問題ありません。Sitecore Experience Manager 10.3 にログインをして、起動してログインをすることができる様になりました。

![clean](/static/images/2023/01/clean09.png)

バージョンをコントロールパネルで確認をした画面は以下の通りです。

![clean](/static/images/2023/01/clean10.png)
