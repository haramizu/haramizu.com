---
title: Sitecore CLI のインストール for macOS
date: '2022-05-20'
tags: ['Sitecore CLI']
draft: true
summary: Sitecore の環境をコマンドラインで制御することができるコマンドラインのツールとして Sitecore コマンドラインインターフェイスが提供されています。今回は、このツールのインストール手順を紹介します。
images: ['/static/images/2022/05/sitecorecli11.png']
---

Sitecore のコマンドラインツール、Sitecore CLI を今回は macOS にインストールしてみます。これは、PowerShell Core および .NET Core 3.1 ベースで動くコマンドとして提供されているため、Sitecore CLI も macOS 上で動作するためです。

Windows 環境へのインストールは、すでに以下のページで紹介をしています。

- [Sitecore CLI のインストール](/blog/2022/05/13/install-sitecore-cli)

## インストール

Sitecore CLI を利用する上では、PowerShell がインストールされている必要があります。すでにインストール済みであればスキップしても大丈夫です。今回は Homebrew を利用してインストールするため、Homebrew に関しては[公式サイト](https://brew.sh/index_ja)で確認をして、インストールしてください。

### PowerShell for macOS のインストール

PowerShell のインストールは、すでに homebrew がインストールできていればコマンド１行で自動的にセットアップされます。ターミナルを開いて、以下のコマンドを実行してください。

```ps1
brew install powershell --cask
```

![sitecorecli](/static/images/2022/05/sitecorecli01.png)

インストールが完了したら、以下のコマンドで起動することを確認します。

```
pwsh
```

![sitecorecli](/static/images/2022/05/sitecorecli02.png)

- [macOS への PowerShell のインストール](https://docs.microsoft.com/ja-jp/powershell/scripting/install/installing-powershell-on-macos?view=powershell-7.2)

### .NET Core 3.1 のインストール

続いて .NET Core 3.1 をインストールします。以下のサイトからインストーラーをダウンロードして、インストールしてください。

- [.NET Core 3.1 のダウンロード](https://dotnet.microsoft.com/ja-jp/download/dotnet/3.1)

![sitecorecli](/static/images/2022/05/sitecorecli03.png)

インストールをした後、パスが通っていないため dotnet のコマンドが動作しないことがあります。これに関しては、シンボリックリンクを追加することで動きます。なお、手元の macOS では x64 のバイナリをインストールしたため、以下のようなコマンドを実行しました。

```
sudo ln -s /usr/local/share/dotnet/x64/dotnet /usr/local/bin
```

![sitecorecli](/static/images/2022/05/sitecorecli04.png)

## Sitecore CLI のインストール

ここからは前回インストールをした時と同じように、プロジェクトごとで利用できるようにしていきます。まず、ディレクトリを移動します（ディレクトリがなければ作ってください）。

```
cd Projects/SampleDemo
```

まず定義ファイルを作成します。

```
dotnet new tool-manifest
```

続いて nuget ギャラリーの設定をしますが、以前にすでに実施している場合は省略できます。

```
dotnet nuget add source -n Sitecore https://sitecore.myget.org/F/sc-packages/api/v3/index.json
```

最後にコマンドをインストールします

```
dotnet tool install Sitecore.CLI
```

![sitecorecli](/static/images/2022/05/sitecorecli05.png)

コマンドのインストールができました。初期化して、プラグインをインストールします。

```
dotnet sitecore init
dotnet sitecore plugin add -n Sitecore.DevEx.Extensibility.Serialization
dotnet sitecore plugin add -n Sitecore.DevEx.Extensibility.Publishing
```

![sitecorecli](/static/images/2022/05/sitecorecli06.png)

## ログイン

実際に Sitecore のインスタンスに対してログインをします。編集サーバーおよび認証サーバーを指定します。以下はサンプルのドメイン名となっています。

```ps1
dotnet sitecore login --cm https://shinharaxm-cm.sitecoredemo.com/ --auth https://shinharaxm-id.sitecoredemo.com/ --allow-write true
```

![sitecorecli](/static/images/2022/05/sitecorecli07.png)

コマンド実行後、ブラウザが起動してログイン画面になります。

![sitecorecli](/static/images/2022/05/sitecorecli08.png)

ログインを実行すると、権限を付与するかどうかの確認画面に切り替わります。

![sitecorecli](/static/images/2022/05/sitecorecli09.png)

許可をすると、ログイン完了ということでコマンドラインの画面がログイン確認のモードから切り替わります。

![sitecorecli](/static/images/2022/05/sitecorecli10.png)

ログインができることを確認しました。

## 動作確認

実際にコマンドを実行して結果を確認していきます。今回はインポートをするデータを準備していないため、以下のように Index をアップデートしてみます。

```
dotnet sitecore index schema-populate
dotnet sitecore index rebuild
```

![sitecorecli](/static/images/2022/05/sitecorecli11.png)

無事、リモートで準備している Sitecore のインスタンスの処理をコマンドラインで実行することができました。

## まとめ

Sitecore CLI を macOS でも利用できることを確認しました。ヘッドレスをメインに開発を進めていくとなると、macOS で開発をして、クラウドに展開をしているサーバーと連携して、という作業ができるようになっていきます。これも PowerShell Core および .NET Core が macOS で動くようになっており、ツールが対応しているため Windows 以外でも作業ができるという状況です。
