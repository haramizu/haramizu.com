---
title: Azure Container Registry を利用する - チュートリアル
date: '2022-07-08'
tags: ['Docker', 'Azure チュートリアル']
draft: true
summary: Docker のコンテナ管理をすることができる Azure の機能である　Azure Container Registry に関して、今回はチュートリアルを実施していきます。詳しくは、マイクロソフトのサイトで掲載されていますのでこちらを参照していただきつつ、今回のブログではダイジェストで実施していきます。
images: ['/static/images/2022/07/acr02.png']
---

Docker のコンテナ管理をすることができる Azure の機能である　Azure Container Registry に関して、今回はチュートリアルを実施していきます。詳しくは、マイクロソフトのサイトで掲載されていますのでこちらを参照していただきつつ、今回のブログではダイジェストで実施していきます。

- [Azure Container Registry を使用してコンテナー イメージをビルドして格納する](https://docs.microsoft.com/ja-JP/learn/modules/build-and-store-container-images/)

## Azure Container Registry を展開する

展開をするにあたって、チュートリアルを実行するためのリソースグループを準備します。今回は `learn-deploy-acr-rg` というリソースグループを作成します。

```
az login
az group create --name learn-deploy-acr-rg --location japaneast
```

![ACR](/static/images/2022/07/acr01.png)

続いて、Azure Container Registry を作成します。今回は、`name` に関してはユニークな値が必要となるため、他のユーザーが使っている名前を利用することはできません。また、文字はすべて小文字で設定する必要があります。

```
az acr create --resource-group learn-deploy-acr-rg --name REGISTRYNAME --sku Premium
```

![ACR](/static/images/2022/07/acr02.png)

今回利用するレジストリの作成が出来ました。

## コンテナイメージのビルド



## まとめ

コンテナイメージを Azure の環境で Build することが出来ました。