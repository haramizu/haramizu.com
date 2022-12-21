---
title: 起動するためのスクリプトの調整
date: '2023-01-18'
tags: ['XM Cloud', 'XM', 'Vercel']
draft: false
summary: Sitecore XM Cloud で作成をした CMS のデリバリー環境として Vercel を選択することが可能ですが、この作業を簡単にするための Sitecore XM Cloud との連携機能を提供しています。今回は、この機能を利用して、Web サイトを Vercel に展開する手順を紹介します。
images: ['/static/images/2023/01/nextjs03.png']
---

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
