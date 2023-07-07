---
title: Sitecore CLI を利用してコンテンツのエクスポート
date: '2022-06-03'
tags: ['Sitecore CLI']
draft: true
summary: 前回の Sitecore CLI を利用してコンテンツのインポートの設定の状況から、Sitecore にアイテムを作成してエクスポートをする手順を確認します。インポート、エクスポートができるようになることで、作成したデータをコードで管理することが簡単にできるようになります。
images: ['/static/images/2022/06/cli13.png']
---

前回の [Sitecore CLI を利用してコンテンツのインポート](/blog/2022/05/31/sitecore-cli-import) の設定の状況から、Sitecore にアイテムを作成してエクスポートをする手順を確認します。インポート、エクスポートができるようになることで、作成したデータをコードで管理することが簡単にできるようになります。

## アイテムを作成する

インポートの定義に関しては、src\Foundation\Multisite\Multisite.module.json のファイルに以下のように記述されています。

```json
{
  "namespace": "Foundation.Multisite",
  "items": {
    "includes": [
      {
        "name": "templates",
        "path": "/sitecore/templates/Foundation/Multisite"
      }
    ]
  }
}
```

そこで今回は、Multisite のフォルダの下にアイテムを１つ、同じ階層に１つ作成をします。作成後のツリーは以下の通りです。

![sample](/static/images/2022/06/cli12.png)

この状態で、エクスポートのコマンドを実行します。前回は push でしたがこれが pull となります。

```
dotnet sitecore ser pull
```

![sample](/static/images/2022/06/cli13.png)

１つのアイテムがサーバー側で作成されていることを確認して、yaml ファイルが作成されました。実際のフォルダ構成を見ると以下の通りです。

![sample](/static/images/2022/06/cli14.png)

underfoundation に関しては json で指定しているパスの配下にないためエクスポートは実行されていません。一方、パスの配下にある undermultisite のアイテムは yaml ファイルとしてエクスポートされているのがわかります。

## まとめ

実際に Sitecore 側で作成をしたアイテムをファイルとしてエクスポートすることができました。もちろん、ファイルをオフラインで編集してインポートし直すことも可能です。インポート、エクスポートに関して、設定ファイルを準備して分けることで、フォルダを利用して管理をすることができます。Sitecore CLI を利用することで、コードでの管理が可能となり、バックアップ、リストアがしやすくなります。開発、テストの際には不可欠な機能となっています。
