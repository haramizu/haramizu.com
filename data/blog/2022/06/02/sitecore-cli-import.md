---
title: Sitecore CLI を利用してコンテンツのインポート
date: '2022-06-02'
tags: ['Sitecore CLI']
draft: false
summary: Sitecore の環境をコマンドラインで制御することができるコマンドラインのツールとして Sitecore コマンドラインインターフェイスが提供されています。今回は、このツールを利用して、サンプルのデータを利用してインポートを実行する手順について確認をしていきます。
images: ['/static/images/2022/06/cli10.png']
---

Sitecore の環境をコマンドラインで制御することができるコマンドラインのツールとして Sitecore コマンドラインインターフェイスが提供されています。今回は、このツールを利用して、サンプルのデータを利用してインポートを実行する手順について確認をしていきます。

## 環境およびデータの確認

すでに Sitecor CLI はインストールされているとします。

- [Sitecore CLI のインストール](/blog/2022/05/18/install-sitecore-cli)
- [Sitecore CLI のインストール for macOS](/blog/2022/05/23/install-sitecore-cli-macos)

今回は、以前のブログ記事 [Sitecore Helix の Next.js サンプルを動かす](/blog/2022/05/19/basic-company-nextjs-part1) で利用したサンプルのデータをそのまま利用していきます。

- [Sitecore Helix Examples](https://github.com/Sitecore/Helix.Examples)

## XM1 の起動およびログインの確認

まずは Sitecore XM1 の環境を起動します。

```
docker-compose up -d
```

続いて Sitecore CLI のコマンドを利用してログインを実行します。

```
dotnet sitecore login --cm https://manage.sitecoredemo.localhost/ --auth https://login.sitecoredemo.localhost/ --allow-write true
```

コマンドを実行するとウィンドウが開いてログイン、コマンドラインからアクセスできるようにします。

![sample](/static/images/2022/06/cli06.png)

正しくコマンドラインが動作するかどうか、以下のコマンドを実行して確認をします。

```
dotnet sitecore index schema-populate
```

![sample](/static/images/2022/06/cli07.png)

繋がっている状況を確認しました。

## 以前の環境の確認

コマンドラインが動作する際に参考にする[設定ファイル](https://github.com/Sitecore/Helix.Examples/blob/master/examples/helix-basic-nextjs/sitecore.json)は、ルートにある `sitecore.json` ファイルになります。このファイルの最初の記述がインポート、エクスポートで必要となる設定です。

```json
{
  "$schema": "./.sitecore/schemas/RootConfigurationFile.schema.json",
  "modules": ["src/*/*/*.module.json"],
  "plugins": [
    "Sitecore.DevEx.Extensibility.Serialization@4.0.0",
    "Sitecore.DevEx.Extensibility.Publishing@4.0.0",
    "Sitecore.DevEx.Extensibility.Indexing@4.0.0",
    "Sitecore.DevEx.Extensibility.ResourcePackage@4.0.0"
  ],
  "serialization": {
    "defaultMaxRelativeItemPathLength": 100,
    "defaultModuleRelativeSerializationPath": "items",
    "removeOrphansForRoles": true,
    "excludedFields": []
  }
}
```

modules で指定している json ファイルを利用してインポート、エクスポートが実行される形となります。実際に対象となるファイルを探すと、

- src\Feature\BasicContent\BasicContent.module.json
- src\Feature\Navigation\Navigation.module.json
- src\Feature\Products\Products.module.json
- src\Feature\Services\Services.module.json
- src\Foundation\Multisite\Multisite.module.json
- src\Project\BasicCompany\BasicCompany.module.json
- src\Project\DemoContent\DemoContent.module.json

上記のファイルが \*.module.json ファイルとして見つけることができ、これらの json ファイルのデータを参照しながら動作します。

## データのコピーとインポート

設定方法がわかりましたので、インポートを実施するにあたって以下の設定を進めます。

### sitecore.json の編集

デフォルトでは以下のように sitecore.json のファイルは定義されています。

```json
{
  "$schema": "./.sitecore/schemas/RootConfigurationFile.schema.json",
  "modules": ["./TODO/*.module.json"],
  "plugins": [
    "Sitecore.DevEx.Extensibility.Indexing@4.1.0",
    "Sitecore.DevEx.Extensibility.ResourcePackage@4.1.0",
    "Sitecore.DevEx.Extensibility.Serialization@4.1.1",
    "Sitecore.DevEx.Extensibility.Publishing@4.1.1"
  ],
  "serialization": {
    "defaultMaxRelativeItemPathLength": 100,
    "defaultModuleRelativeSerializationPath": "serialization",
    "removeOrphansForRoles": true,
    "continueOnItemFailure": false,
    "excludedFields": []
  }
}
```

上記の modules の項目を、サンプルと同じように書き換えます。またインポートをするデータは yaml ファイルとなるため、`defaultModuleRelativeSerializationPath` の値も items に変更します。

```json
{
  "$schema": "./.sitecore/schemas/RootConfigurationFile.schema.json",
  "modules": ["src/*/*/*.module.json"],
  "plugins": [
    "Sitecore.DevEx.Extensibility.Indexing@4.1.0",
    "Sitecore.DevEx.Extensibility.ResourcePackage@4.1.0",
    "Sitecore.DevEx.Extensibility.Serialization@4.1.1",
    "Sitecore.DevEx.Extensibility.Publishing@4.1.1"
  ],
  "serialization": {
    "defaultMaxRelativeItemPathLength": 100,
    "defaultModuleRelativeSerializationPath": "items",
    "removeOrphansForRoles": true,
    "continueOnItemFailure": false,
    "excludedFields": []
  }
}
```

続いてサンプルから `src\Foundation` のフォルダを現在のプロジェクトに追加します。

![sample](/static/images/2022/06/cli08.png)

データの準備が出来ました。まずインポート前の Sitecore の環境を確認します。コンテンツエディターで、`/sitecore/templates/Foundation` を参照すると以下のような形になっています。

![sample](/static/images/2022/06/cli09.png)

ではインポートを実行します。手元のファイルをインポートするのは以下のコマンドになります。

```
dotnet sitecore ser push
```

![sample](/static/images/2022/06/cli10.png)

実行した後、コンテンツエディターで対象のパスを見に行くと、アイテムが追加されていることがわかります。

![sample](/static/images/2022/06/cli11.png)

## まとめ

今回は、サンプルのデータをインポートするために、`sitecore.json` の定義を確認、サンプルのアイテムをインポートしてみました。次回はエクスポートについて紹介をします。
