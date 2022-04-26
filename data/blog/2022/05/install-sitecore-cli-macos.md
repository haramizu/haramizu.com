---
title: Sitecore CLI のインストール
date: '2022-05-17'
tags: ['Sitecore CLI']
draft: true
summary: Sitecore の環境をコマンドラインで制御することができるコマンドラインのツールとして Sitecore コマンドラインインターフェイスが提供されています。今回は、このツールのインストール手順を紹介します。
images: ['/static/images/2022/03/component06.gif']
---

Sitecore の環境をコマンドラインで制御することができるコマンドラインのツールとして Sitecore コマンドラインインターフェイスが提供されています。今回は、このツールのインストール手順を紹介します。

## Sitecore コマンドライン インターフェイス

コマンドラインインターフェイスの使い方に関しては、以下のサイトでヘルプの文書を提供しています。

- [Sitecore コマンド ライン インターフェイス](https://doc.sitecore.com/xp/ja/developers/101/developer-tools/sitecore-command-line-interface.html)

また、下記のブログでも検証手順を紹介しています。

- [Sitecore CLI を使用する パート１ インストール](https://www.pine4.net/Memo2/Article/Archive/use-sitecore-cli-part1-installation)
- [Sitecore CLI を使用する パート 2 動作確認](https://www.pine4.net/Memo2/Article/Archive/use-sitecore-cli-part2-verification)

これだけで十分ではありますが、今回は macOS の環境においてのセットアップの手順を紹介していきます。

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

### Sitecore CLI のインストール
