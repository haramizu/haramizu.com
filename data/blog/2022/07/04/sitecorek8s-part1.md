---
title: Sitecore on Azure Kubernetes Service - 環境を整える
date: '2022-07-04'
tags: ['AKS', 'インストール']
draft: true
summary: これまで Sitecore を Docker で利用する形で説明をしてきましたが、今回は Kubernetes を利用して展開する方法を取り上げます。Docker はあくまで手元で動かすには便利な仕組みですが、コンテナを利用して運用をするとなると、Azure Kubernetes を利用するのが便利です。
images: ['/static/images/2022/07/sitecoreaks05.png']
---

これまで Sitecore を Docker で利用する形で説明をしてきましたが、今回は Kubernetes を利用して展開する方法を取り上げます。Docker はあくまで手元で動かすには便利な仕組みですが、コンテナを利用して運用をするとなると、Azure Kubernetes を利用するのが便利です。

そこで Sitecore のガイドに沿って Kubernetes への展開の手順を確認していきます。公式の文書はこのブログ記事を書いている段階で 10.2 が最新版となっていますが、10.1 に関して日本語版も提供しています。ブログでは最新版を紹介するために英語版をベースに進めていきますが、日本語版の記載の違いなどがあればその点も気づいた点があれば記載したいと思います。

- [Installation Guide for Production Environment with Kubernetes](https://sitecoredev.azureedge.net/~/media/7C9507580CCC47E385ADAC44CD332418.ashx)
- [Kubernetes を使用した Sitecore 10.1.0 本番環境のデプロイへのインストール ガイド](https://doc.sitecore.com/xp/ja/resources/SC-XP-10.1-Production-Deployment-with%20Kubernetes-JA.pdf) PDF ダウンロード

関連ブログとしては、SB テクノロジーの神村さんが書いています。

- [Sitecore を AKS に展開する](https://www.softbanktech.co.jp/special/blog/dx_station/2021/0037/)

今回は XM Scaled (XM1) の環境を Azure Kubernates Service - AKS に展開して環境を整えるところまでとします。

## 作業環境の確認

実行するにあたってクライアントとしては以下の環境を必要としています。

- Windows 10 1909 以降
- Kubernetes 1.16x 以降
  - すでに Docker Desktop をインストールしていたのでインストール不要
  - `kubectl version --short` でバージョンの確認が可能
- Azure CLI 
    - インストール手順 https://docs.microsoft.com/ja-jp/cli/azure/install-azure-cli-windows?tabs=azure-cli
- Helm 3.0.x 以降
- Sitecore SXP 10.2.0 Container Deployment Package （Web サイトからダウンロード）

Helm のインストールをする場合は、このブログでよく利用している Choco を利用すると楽にインストールできます。

```
choco install kubernetes-helm
```

![AKS](/static/images/2022/07/sitecoreaks01.png)

続いて Azure が対応している Kubernetes のバージョンを確認します。まず、Azure CLI のコマンドでログインをして作業をするためのサブスクリプションに切り替えます。

```powershell
az login
az account list --output table
```

![AKS](/static/images/2022/07/sitecoreaks02.png)

一番右側に表示されている IsDefault が一番上が True になっていますが、以下のコマンドで切り替えることができます。

```
az account set --subscription "SA-APAC_JP-SE-DEMO-INT-NHE-2500"
```

![AKS](/static/images/2022/07/sitecoreaks03.png)

別のサブスクリプションに切り替えることが出来ました。このサブスクリプションで利用できるデータセンターを調べます。

```
az account list-locations --output table
```

![AKS](/static/images/2022/07/sitecoreaks04.png)

ほとんど利用することができます。今回は `japaneast` を利用します。

```
az aks get-versions --location japaneast --output table
```

![AKS](/static/images/2022/07/sitecoreaks05.png)

今回は KubernetesVersion と手元のバージョンを見るとプレビューで対応している状況です。

## パッケージの展開

作業に必要となるサンプルファイルをダウンロードして手元で準備をします。以下のページから、Container Deployment Package をダウンロードしてください。

- [Sitecore Experience Platform 10.2](https://dev.sitecore.net/Downloads/Sitecore_Experience_Platform/102/Sitecore_Experience_Platform_102.aspx)

注意：日本語版のガイドではこのリンクが 10.1 になっています。

ダウンロードした SitecoreContainerDeployment.10.2.0.006766.683.zip の中にある k8s\ltsc2019\xm1 を今回は利用します。このフォルダを c:\projects\k8sxm1 にコピーします。

## 証明書ファイルの展開

今回は証明書としてワイルドカードの証明書を準備して展開します。上記の展開したフォルダの `secrets\tls` の配下に、証明書のファイルを配置していきます。作り方は以前のブログ記事に記載しています。

今回は以下のコマンドでを実行しました。

```
cd C:\Projects\license
openssl pkcs12 -in sitecoredemo20220411.pfx -clcerts -nokeys -out C:\Projects\aksxm1\secrets\tls\global-cd\tls.crt
openssl pkcs12 -in "/projects/license/sitecoredemo20220411.pfx" -nocerts -nodes -out C:\Projects\aksxm1\secrets\tls\global-cd\tls.key
```

![AKS](/static/images/2022/07/sitecoreaks06.png)

作成されたファイルを、`global-cm` と `global-id` にコピーして作業は完了です。

## まとめ

今回は手順書の紹介、手元の環境の整備、作業をするためのファイルの準備まで進めました。証明書に関しては、利用できる環境に合わせて設定をしてください。次回は準備をしたファイルの設定方法に関して紹介をしていきます。
