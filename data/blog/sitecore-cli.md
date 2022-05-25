---
title: Sitecore CLI シリーズ
date: '2022-06-06'
tags: ['Sitecore CLI']
draft: true
summary: Sitecore CLI はコマンドラインで Sitecore を制御することができる非常に便利な機能です。このシリーズでは、Sitecore CLI の環境を整備する手順や関連機能について紹介をしています。
images: ['/static/images/2022/05/cli01.png']
---

Sitecore CLI はコマンドラインで Sitecore を制御することができる非常に便利な機能です。このシリーズでは、Sitecore CLI の環境を整備する手順や関連機能について紹介をしています。

- [Sitecore CLI のインストール](/blog/2022/05/17/install-sitecore-cli)
- [Sitecore CLI のインストール for macOS](/blog/2022/05/23/install-sitecore-cli-macos)
- [Sitecore CLI を利用してコンテンツのインポート](/blog/2022/06/02/sitecore-cli-import)
- [Sitecore CLI を利用してコンテンツのエクスポート](/blog/2022/06/03/sitecore-cli-export)

## Sitecore CLI コマンド

Sitecore CLI の基本コマンドは dotnet sitecore から開始します。ヘルプを参照すると以下のように表示されます。

```
PS C:\projects\sitecoredemo-jp> dotnet sitecore --help
sitecore.cli:
  Sitecore command line tool

Usage:
  sitecore.cli [options] [command]

Options:
  --version         Show version information
  -?, -h, --help    Show help and usage information

Commands:
  login                 Authenticates the CLI to a Sitecore instance
  plugin                Manage plugins commands
  init                  Creates Sitecore configurations in current directory
  index                 working with indexes data
  itemres               Resource Items Package commands
  ser, serialization    Item serialization commands
  publish               Performs a publish operation on all content

PS C:\projects\sitecoredemo-jp>
```

### ログイン

ログインを実行する際には以下のようにサーバーを含めて指定します。一度実行をすると、サーバー名などは環境ファイルに保存されます。

```
dotnet sitecore login --cm https://cmserver.local/ --auth https://login.local/ --allow-write true
```

### インポートエクスポート

`dotnet sitecore ser` の後ろに push や pull を指定することでインポート、エクスポートの処理を指定することができます。

```
dotnet sitecore ser push
dotnet sitecore ser pull
```

なおヘルプを実行すると他の処理の手順も確認できます。

```
PS C:\projects\sitecoredemo-jp> dotnet sitecore ser --help
serialization:
  Item serialization commands

Usage:
  sitecore.cli serialization [options] [command]

Options:
  -?, -h, --help    Show help and usage information

Commands:
  info            Shows serialization configuration information
  explain         Explains whether an item path is included and why
  pull            Pulls serialized items from Sitecore to disk
  push            Pushes serialized items from disk into Sitecore
  diff            Compares two Sitecore instances
  validate        Checks serialized items for validity and can fix common issues
  watch           Watches item changes in Sitecore and pulls them to disk.
  package, pkg    Create or install packages of serialized items
```
