---
title: Sitecore CLI のインストール
date: '2022-05-13'
tags: ['Sitecore CLI']
draft: true
summary: Sitecore には開発効率、運用などで活用できるコマンドラインツールを提供しています。今回は、このツール、Sitecore CLI のインストール手順を紹介します。
images: ['/static/images/2022/05/cli01.png']
---

Sitecore には開発効率、運用などで活用できるコマンドラインツールを提供しています。今回は、このツール、Sitecore CLI のインストール手順を紹介します。

## Sitecore コマンドライン インターフェイス

コマンドラインインターフェイスの使い方に関しては、以下のサイトでヘルプの文書を提供しています。

- [Sitecore コマンド ライン インターフェイス](https://doc.sitecore.com/xp/ja/developers/101/developer-tools/sitecore-command-line-interface.html)

また、下記のブログでも検証手順を紹介しています。

- [Sitecore CLI を使用する パート１ インストール](https://www.pine4.net/Memo2/Article/Archive/use-sitecore-cli-part1-installation)
- [Sitecore CLI を使用する パート 2 動作確認](https://www.pine4.net/Memo2/Article/Archive/use-sitecore-cli-part2-verification)

上記の記事と異なり、すでに Sitecore CLI はこのブログ記事掲載時点では 4.1.0 がリリースされています。

- [Sitecore CLI](https://dev.sitecore.net/Downloads/Sitecore_CLI.aspx)

今回は 4.1.0 をこのブログで紹介します。

## 前提条件

Sitecore CLI 4.1.0 は以下の環境で利用することができます。

- Sitecore 10.1 and 10.2 と組み合わせた利用
  - Sitecore Management Services をインストールする必要があります
- .NET Core 3.1
- PowerShell

Sitecore CLI NuGet Package のサイトに行くと、.NET Core 3.1 がターゲットだということを確認できます。

![cli](/static/images/2022/05/cli01.png)

## インストールの準備

Visual Studio などをすでにインストール済みであれば .NET Core 3.1 がインストールされているとおもいますが、インストールをしていない場合は以下のサイトからモジュールをダウンロードすることができます。

- https://dotnet.microsoft.com/ja-jp/download/dotnet/3.1

![cli](/static/images/2022/05/cli02.png)

これで動作環境が整いました。

## インストール

Sitecore CLI はプロジェクトごとにインストールすることを推奨としています。これは、対象となる Sitecore のバージョンによって Sitecore CLI のバージョンが異なることがあるためです。このため、今回はローカルのプロジェクトにインストールをするという形です。

```
cd <project folder>
dotnet new tool-manifest
dotnet nuget add source -n Sitecore https://sitecore.myget.org/F/sc-packages/api/v3/index.json
```

`dotnet new tool-manifest` を実行することで、.config フォルダが作成されます。`dotnet nuget add source -n Sitecore` に関しては、以前に一度実行している場合は不要となります。

続いて、コマンドをインストールします。

```
dotnet tool install Sitecore.CLI
```

これでコマンドがインストールされたことになります。

![cli](/static/images/2022/05/cli03.png)

## プロジェクトの初期設定

ここからはプロジェクトの初期設定を実行していきます。まず、Sitecore CLI コマンドの設定を開始します。

```
dotnet sitecore init
```

これを実行すると、いくつかのデータが追加されます。

- .sitecore フォルダ
- sitecore.json
- .gitignore
- .vscode\settings.json

Sitecore CLI のプラグインをインストールします。4.1 で用意されているのは以下の項目です。

- Sitecore.DevEx.Extensibility.Serialization
- Sitecore.DevEx.Extensibility.Publishing
- Sitecore.DevEx.Extensibility.Indexing
- Sitecore.DevEx.Extensibility.ResourcePackage

今回はシリアライズ、パブリッシュのプラグインをインストールします。

```
dotnet sitecore plugin add -n Sitecore.DevEx.Extensibility.Serialization
dotnet sitecore plugin add -n Sitecore.DevEx.Extensibility.Publishing
```

![cli](/static/images/2022/05/cli04.png)

インストールしているプラグインを確認する際には、以下のコマンドで確認ができます。

```
dotnet sitecore plugin list
```

![cli](/static/images/2022/05/cli05.png)

## まとめ

Sitecore CLI のインストールに関して紹介をしました。ツールの使い方は別の記事で紹介をしますが、Sitecore CLI は今後ブログでも利用していきますので、なるべくインストールをしてください。

## 参考ページ

- [Install Sitecore Command Line Interface](https://doc.sitecore.com/xp/en/developers/102/developer-tools/install-sitecore-command-line-interface.html)
