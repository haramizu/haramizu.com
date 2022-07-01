---
title: Azure Container Registry を利用する - チュートリアル
date: '2022-07-08'
tags: ['Docker', 'Azure チュートリアル']
draft: true
summary: Docker のコンテナ管理をすることができる Azure の機能である　Azure Container Registry に関して、今回はチュートリアルを実施していきます。詳しくは、マイクロソフトのサイトで掲載されていますのでこちらを参照していただきつつ、今回のブログではダイジェストで実施していきます。
images: ['/static/images/2022/07/acr03.png']
---

Docker のコンテナ管理をすることができる Azure の機能である　 Azure Container Registry に関して、今回はチュートリアルを実施していきます。詳しくは、マイクロソフトのサイトで掲載されていますのでこちらを参照していただきつつ、今回のブログではダイジェストで実施していきます。

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

作成をしたコンテナレジストリでコンテナーイメージを作成します。今回は Azure Cloud Shell にて Docker ファイルを作成します。`code` を実行するとテキストエディタが開くので、以下のコードを設定して Dockerfile として保存（Ctrl+S もしくは Cmd+S)します。

```dockerfile
FROM    node:9-alpine
ADD     https://raw.githubusercontent.com/Azure-Samples/acr-build-helloworld-node/master/package.json /
ADD     https://raw.githubusercontent.com/Azure-Samples/acr-build-helloworld-node/master/server.js /
RUN     npm install
EXPOSE  80
CMD     ["node", "server.js"]
```

![ACR](/static/images/2022/07/acr03.png)

ビルドの実行は Azure CLI で実行します。

```
az acr build --registry REGISTRYNAME --image helloacrtasks:v1 .
```

![ACR](/static/images/2022/07/acr04.png)

Build が完了したあと、イメージの確認をします。

```
az acr repository list --name $ACR_NAME --output table
```

これで `helloacrtasks` のイメージができました。

![ACR](/static/images/2022/07/acr05.png)

Azure ポータルからアクセスをしても作成されているのを確認することができます。

![ACR](/static/images/2022/07/acr06.png)

## レジストリからイメージを展開する

Azure Container Registry は認証されていないアクセスはサポートしていません。まずレジストリの管理者アカウントを有効にします。

```
az acr update -n $ACR_NAME --admin-enabled true
```

続いて管理者のユーザー名、パスワードを取得します。

```
az acr credential show --name $ACR_NAME
```

![ACR](/static/images/2022/07/acr07.png)

パスワードとユーザー名が表示されますので、これを今後利用していきます。イメージを利用して、コンテナーを作成します。`location`、`username`、`password` や必要に応じて ACR の名前などを変更してください。

```
az container create --resource-group learn-deploy-acr-rg --name acr-tasks --image $ACR_NAME.azurecr.io/helloacrtasks:v1 --registry-login-server $ACR_NAME.azurecr.io --ip-address Public --location <location> --registry-username [username] --registry-password [password]
```

![ACR](/static/images/2022/07/acr08.png)

コマンドが完了すると、acr-tasks という名前のコンテナが起動しています。

![ACR](/static/images/2022/07/acr09.png)

起動した後の IP アドレスを取得します。

```
az container show --resource-group  learn-deploy-acr-rg --name acr-tasks --query ipAddress.ip --output table
```

取得した IP アドレスに対してブラウザでアクセスをすると以下のようにページが表示されます。

![ACR](/static/images/2022/07/acr10.png)

## レジストリを異なるリージョンにリプリケートする

今回作成をしたイメージは東日本のデータセンターにて展開されています。これを今回は別のデータセンターにも作成していきます。

```
az acr replication create --registry $ACR_NAME --location japanwest
```

完了したあと、データセンター一覧を以下のコマンドで表示します。

```
az acr replication list --registry $ACR_NAME --output table
```

![ACR](/static/images/2022/07/acr11.png)

リソースグループを見ると、リソースが追加されています。

![ACR](/static/images/2022/07/acr12.png)

## まとめ

コンテナイメージを管理するためのレジストリを作成して、Azure の環境でコンテナの Build 、そして展開するところまで実施しました。この仕組みを利用することで、利用をしたいコンテナイメージをレジストリで管理して、展開することが可能となります。
