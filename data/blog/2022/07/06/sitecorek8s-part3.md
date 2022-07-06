---
title: Sitecore on Azure Kubernetes Service - AKS に展開
date: '2022-07-08'
tags: ['AKS', 'インストール']
draft: false
summary: Sitecore を Azure Kubernetes Service に展開するための準備としてこれまで2回に分けて紹介をしてきました。今回は準備が整っている状況ですので、Sitecore を Azure 上に展開していきます。
images: ['/static/images/2022/07/sitecoreaks27.png']
---

Sitecore を Azure Kubernetes Service に展開するための準備としてこれまで 2 回に分けて紹介をしてきました。今回は準備が整っている状況ですので、Sitecore を Azure 上に展開していきます。

これまでの記事は以下の通りです。

- [環境を整える](/blog/2022/07/04/sitecorek8s-part1)
- [展開前の設定](/blog/2022/07/05/sitecorek8s-part2)

まず最初に AKS クラスターを作成していきます。以前にチュートリアルに関して紹介しているので、手順に関しては以下の記事を参考にしてください。

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
az group create --name jpn-tokyo-shin-aksxm1 --location japaneast
```

Azure ポータルでアクセスをすると、リソースグループが作成できていることを確認できます。

![AKS](/static/images/2022/07/sitecoreaks08.png)

## AKS クラスターの作成

続いて AKS クラスターを作成します。ユーザー名を指定します。

```
az aks create --resource-group jpn-tokyo-shin-aksxm1 --name SitecoredemoCluster --node-count 2 --enable-addons monitoring --generate-ssh-keys --windows-admin-username aksdemo --vm-set-type VirtualMachineScaleSets --network-plugin azure
```

上記のコマンドを実行すると、パスワードの入力、および確認が実行されます。パスワードは 14 文字以上となっているため、多少長いパスワードを設定してください。コマンドが正しく実行されると、Running という形で作成となるため、数分完了するのを待ちます。

![AKS](/static/images/2022/07/sitecoreaks09.png)

完了すると、リソースグループに Kubernetes サービスが追加されています。

![AKS](/static/images/2022/07/sitecoreaks10.png)

このタイミングで、リソースグループ一覧を見に行くと MC\_ がついているリソースグループが追加されています。

![AKS](/static/images/2022/07/sitecoreaks12.png)

リソースグループの中を見ると、いくつかのリソースが追加されているのがわかります。

![AKS](/static/images/2022/07/sitecoreaks13.png)

## Windows Server ノードプールの作成

展開する予定のノードプールを作成します。引き続きコマンドで実行する場合は次のようになります。

```
az aks nodepool add --resource-group jpn-tokyo-shin-aksxm1 --cluster-name SitecoredemoCluster --os-type Windows --name npwin --node-count 3
```

しばらくするとノードプールが追加されます。Azure ポータルサイトに行くと、以下のように確認ができます。

![AKS](/static/images/2022/07/sitecoreaks11.png)

作成をした設定を、ローカルで利用できるようにクレデンシャルを取得します。

```
az aks get-credentials --resource-group jpn-tokyo-shin-aksxm1 --name SitecoredemoCluster
```

これにより Kubectl が作成をした AKS クラスターを利用することができるようになりました。

## Ingress コントローラーの展開

Kubernetes 環境用ロードバランサーとして利用できる Ingress コントローラーを展開していきます。ここでは `helm` コマンドを利用していきます。

```
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
```

続いて、 NGINX ingress コントローラーをインストールします。インストール前の設定は以下の通りです。

![AKS](/static/images/2022/07/sitecoreaks14.png)

インストールは以下のコマンドを実行します。

```
helm install nginx-ingress ingress-nginx/ingress-nginx --set controller.replicaCount=2 --set controller.nodeSelector."kubernetes\.io/os"=linux --set defaultBackend.nodeSelector."kubernetes\.io/os"=linux --set controller.admissionWebhooks.patch.nodeSelector."kubernetes\.io/os"=linux
```

インストール完了後、管理画面に行くと `サービスとイングレス` の中に項目が増えているのがわかります。

![AKS](/static/images/2022/07/sitecoreaks15.png)

最後にホスト名などの値を設定するために、以下のコマンドを実行します。

```
kubectl apply -k ./ingress-nginx/
```

結果としては、構成の中に２つのレコードが増えていることがわかります。sitecore-hostnames にはサーバーのホスト名が記載されていることも確認出来ます。

![AKS](/static/images/2022/07/sitecoreaks16.png)

最後に、設定をしている各種パラメーターを適用します。

```
kubectl apply -k ./secrets/
```

![AKS](/static/images/2022/07/sitecoreaks17.png)

## 非本番環境向けの External Service の起動

本番環境の場合は別途 SQL Database などを準備する必要がありますが、今回は展開の練習でもあるため個別に準備しないで展開したいと思います。まず External の構成ファイルを使用して、選択したノードにスケジューリングされる Pod を作成します。

```
kubectl apply -k ./external/
```

![AKS](/static/images/2022/07/sitecoreaks18.png)

Pod が選択したノード上で実行されているをことを確認します。

```
kubectl get pods -o wide
```

ステータスが Running になっていれば完了です。

![AKS](/static/images/2022/07/sitecoreaks19.png)

完了に関して確認をするためのコマンドは以下の通りです。

```
kubectl wait --for=condition=Available deployments --all --timeout=900s
kubectl wait --for=condition=Ready pods --all
```

管理画面を見ると、サービスとイングレスに項目が増えているのを確認することができます。

![AKS](/static/images/2022/07/sitecoreaks20.png)

続いて初期データを適用していきます。

```
kubectl apply -k ./init/
```

Job の状況は以下のコマンドで確認することができます。

```
kubectl get jobs -o wide
```

![AKS](/static/images/2022/07/sitecoreaks21.png)

完了を確認する際には以下のコマンドで簡単に確認ができます。

```
kubectl wait --for=condition=Complete job.batch/solr-init --timeout=900s
kubectl wait --for=condition=Complete job.batch/mssql-init --timeout=900s
```

永続的ストレージをマウントする記載は以下の通りとなります。

```
kubectl apply -f ./volumes/azurefile
```

ストレージを確認しに行くと、作成されていることがわかります。

![AKS](/static/images/2022/07/sitecoreaks22.png)

## Sitecore を起動する

一通り準備が完了したところで、Sitecore の Pod を展開していきます。コマンドは以下の通りです。

```
kubectl apply -k ./
```

![AKS](/static/images/2022/07/sitecoreaks23.png)

展開状況に関しては、これまでと同じように以下のコマンドになります。

```
kubectl get pods -o wide
```

![AKS](/static/images/2022/07/sitecoreaks24.png)

以下のコマンドで起動状況を確認することもできます。

```
kubectl wait --for=condition=Available deployments --all --timeout=1800s
```

すべて起動するとコマンドラインは以下のように表示されます。

![AKS](/static/images/2022/07/sitecoreaks25.png)

## テスト環境にアクセスする

すでに Sitecore が起動している状況です。とはいえ接続するためのサーバーの情報をまずは確認します。

```
kubectl get ingress
```

以下のように結果が返ってきました。

![AKS](/static/images/2022/07/sitecoreaks26.png)

localhost に IP アドレスとサーバー名を記載してください。記載後、ブラウザで https://cm.sitecoredemo.jp/sitecore にアクセスをします。以下のようにログイン画面が表示されます。

![AKS](/static/images/2022/07/sitecoreaks27.png)

ログインをすると Sitecore の管理画面が表示されます。

![AKS](/static/images/2022/07/sitecoreaks28.png)

これでインストールが完了です。

## まとめ

Docker を利用してコンテナベースで Sitecore を動かす手順をこれまで紹介していましたが、3 回に分けて手順を紹介していきましたが Azure Kubernetes Service で動作させることが出来ました。まず起動するところまで、というところで３回目で区切りをつけますが、今後は起動している環境を利用して構成をすこしづつ変更していきたいと思います。
