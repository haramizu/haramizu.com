---
title: Sitecore on Azure Kubernetes Service - macOS からの展開
date: '2022-07-08'
tags: ['AKS', 'インストール']
draft: false
summary: Sitecore を Azure Kubernetes Service に展開する手順を紹介してきました。今回は、macOS において同様の処理ができる環境を整える手順を確認していきます。
images: ['/static/images/2022/07/macos01.png']
---

Sitecore を Azure Kubernetes Service に展開する手順を紹介してきました。今回は、macOS において同様の処理ができる環境を整える手順を確認していきます。

詳細は以前の記事を参考にするため、以下の記事と合わせて今回の内容を確認してください。

- [環境を整える](/blog/2022/07/04/sitecorek8s-part1)
- [展開前の設定](/blog/2022/07/05/sitecorek8s-part2)
- [AKS に展開](/blog/2022/07/06/sitecorek8s-part3)

## 各種ツールのインストール

まず作業をする上で、Windows と同様の環境にするために PowerShell を macOS にインストールします。手順は以下の通りです。

- [macOS への PowerShell のインストール](https://docs.microsoft.com/ja-jp/powershell/scripting/install/installing-powershell-on-macos?view=powershell-7.2)

続いて Azure CLI のインストールを実行します。インストールは macOS で利用できるパッケージマネージャーの Homebrew を利用します。

- [macOS での Azure CLI のインストール](https://docs.microsoft.com/ja-jp/cli/azure/install-azure-cli-macos)

```
brew update && brew install azure-cli
```

![AKS](/static/images/2022/07/macos01.png)

最後に helm をインストールします。このコマンドも Homebrew でインストールすることができます。

- [Installing Helm](https://helm.sh/docs/intro/install/)

```
brew install helm
```

![AKS](/static/images/2022/07/macos02.png)

##　展開する

前回の記事に記載した手順を進めていきます。まず利用をするサブスクリプションに切り替えます。

```
az login
az account list --output table
az account set --subscription "YourSubscriptionName"
```

リソースグループを作成します。

```
az group create --name jpn-tokyo-shin-aksxm1 --location japaneast
```

以下、省略しますが前回の記事の手順をそのまま macOS 上で実行していきます。基本的には Windows 環境で展開したデータを利用することでインスタンスが起動して、DNS の設定を反映させることで利用することができるようになります。

## まとめ

今回は macOS 上での展開に関して紹介をしましたが、Azure CLI や PowerShell に関しては Linux でも利用することができます。
