---
title: Sitecore on Azure Kubernetes Service - AKS に展開
date: '2022-07-06'
tags: ['AKS', 'インストール']
draft: true
summary: Sitecore を AKS を利用して展開するための設定手順について、今回は各種設定ファイルの中のデータを作成していきます。設定ファイルのデータは実際に展開する際のデータとして利用するものになります。
images: ['/static/images/2022/07/sitecoreaks07.png']
---

これまで2回に分けて準備を進めてきたデータを利用して、Sitecore を Azure 上に展開したいと思います。これまでの記事は以下の通りです。

- [環境を整える](/blog/2022/07/04/sitecorek8s-part1)
- [展開前の設定](/blog/2022/07/05/sitecorek8s-part2)

以前に AKS クラスターを作成していきます。以前にチュートリアルに関して紹介しているので、手順に関しては以下の記事を参考にしてください。

- [Azure Kubernetes Service (AKS) - チュートリアル](/blog/2022/07/01/Kubernetes)

今回は Azure CLI を利用してコマンドラインで作業をしていくため若干手順が異なります。参考となるページは [Azure CLI](https://docs.microsoft.com/ja-jp/azure/aks/learn/quick-windows-container-deploy-cli) となります。

## リソースグループの作成

まず最初にリソースをまとめるためのリソースグループを作成します。コマンドラインでログインをして、利用したいサブスクリプションを指定します。

```powershell
az login
az account set --subscription "Your Subscription"
```

続いてリソースグループを作成します。リソースグループおよびデータセンターは利用したい値を記載してください。

```
az group create --name jpn-osaka-shin-aksdemo --location japaneast
```

Azure ポータルでアクセスをすると、リソースグループが作成できていることを確認できます。

![AKS](/static/images/2022/07/sitecoreaks08.png)

## AKS クラスターの作成

続いて AKS クラスターを作成します。ユーザー名を指定します。

```
az aks create --resource-group jpn-osaka-shin-aksdemo --name sitecorejpdemoAKSCluster --node-count 2 --enable-addons monitoring --generate-ssh-keys --windows-admin-username aksdemo --vm-set-type VirtualMachineScaleSets --network-plugin azure
```

上記のコマンドを実行すると、パスワードの入力、および確認が実行されます。パスワードは 14 文字以上となっているため、多少長いパスワードを設定してください。コマンドが正しく実行されると、Running という形で作成となるため、数分完了するのを待ちます。

![AKS](/static/images/2022/07/sitecoreaks09.png)

完了すると、リソースグループに Kubernetes サービスが追加されています。

![AKS](/static/images/2022/07/sitecoreaks10.png)



