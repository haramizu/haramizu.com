---
title: Azure Kubernetes Service (AKS) - チュートリアル
date: '2022-07-01'
tags: ['AKS', 'Azure チュートリアル']
draft: false
summary: これまで数回に分けて Docker コンテナで Sitecore が動作する手順を紹介してきました。これまでの内容は手元で動かすための手順であって、実際にクラウドサービスに展開するための手順とは異なる形です。実際の運用という点では、 Azure Kubernetes Service と組み合わせた運用になってきます。今回は、Azure Kubernetes Service のチュートリアルのページを参照しながら、サンプルを動かしてみたいと思います。
images: ['/static/images/2022/07/aks14.png']
---

これまで数回に分けて Docker コンテナで Sitecore が動作する手順を紹介してきました。これまでの内容は手元で動かすための手順であって、実際にクラウドサービスに展開するための手順とは異なる形です。実際の運用という点では、 Azure Kubernetes Service と組み合わせた運用になってきます。今回は、Azure Kubernetes Service のチュートリアルのページを参照しながら、サンプルを動かしてみたいと思います。

このチュートリアルはマイクロソフトの Web サイトに詳細に掲載されています。

- [Azure Kubernetes Service (AKS)](https://docs.microsoft.com/ja-jp/azure/aks/)

## Azure Cloud Shell を開く

今回は作業環境は Azure ポータルで提供されている Cloud Shell を利用していきます。Cloud Shell を起動する方法は、Azure ポータルの上のメニューにある一番左のアイコンをクリックすることで起動します。

![AKS](/static/images/2022/07/aks01.png)

起動すると以下のようにウィンドウの下にターミナルが表示されます。初めて起動する場合はストレージを指定する画面が表示されるかもしれませんが、画面に沿って手続きを進めるか、わからない場合は手順をネットで確認してみてください。

![AKS](/static/images/2022/07/aks02.png)

これで準備が完了しました。今回は PowerShell を利用する手順で進めるのでこのままの画面で問題ありませんが、bash の場合は MS のチュートリアルを参照するか、今回の手順に沿って進めるために PowerShell に切り替えてください。

## Subscription アカウントの切り替え

利用するサブスクリプションを確認するために、以下のコマンドで利用できるサブスクリプションを確認します。

```powershell
Get-AzSubscription
```

以下のように一覧で表示されます。

![AKS](/static/images/2022/07/aks03.png)

利用したいサブスクリプションを指定します。

```powershell
Set-AzContext -SubscriptionId "yoursubscriptionid"
```

![AKS](/static/images/2022/07/aks04.png)

これで準備が終わりました。

## Windows コンテナの展開

今回は Windows コンテナの展開に関するチュートリアルを実行していきます。ASP.NET のサンプルアプリケーションを展開する形です。

- [PowerShell を使用して Azure Kubernetes Service (AKS) クラスター上に Windows Server コンテナーを作成する](https://docs.microsoft.com/ja-jp/azure/aks/learn/quick-windows-container-deploy-powershell)

### リソースグループの作成

まず最初にリソースグループを作成します。

```powershell
New-AzResourceGroup -Name jpn-ShinchiDemo -Location japaneast
```

![AKS](/static/images/2022/07/aks05.png)

ポータルを見るとリソースグループが出来上がっています。

![AKS](/static/images/2022/07/aks06.png)

### AKS クラスターを作成する

AKS クラスターを作成するにあたって、ssh-keygen コマンドを利用して SSH キーのペアを作成する必要があります。詳しい手順は以下のページに記載されています。

- [簡単な手順: Azure 内に Linux VM 用の SSH 公開/秘密キーのペアを作成して使用する](https://docs.microsoft.com/ja-jp/azure/virtual-machines/linux/mac-create-ssh-keys)

実際に実行をするのは以下のコマンドになります。

```
ssh-keygen -m PEM -t rsa -b 4096
```

![AKS](/static/images/2022/07/aks07.png)

続いて AKS クラスターを作成します。コマンドは以下の１行となりますが、以下の点を確認してください。

- リソースグループ名を上記で作成した名前とする
- クラスター名に関しては Name で指定することができます
- $Username と $Password には自分が設定したい値を設定

```powershell
$Username = Read-Host -Prompt 'ユーザー名の設定'
$Password = Read-Host -Prompt 'パスワードの設定' -AsSecureString
New-AzAksCluster -ResourceGroupName jpn-ShinchiDemo -Name myAKSCluster -NodeCount 2 -NetworkPlugin azure -NodeVmSetType VirtualMachineScaleSets -WindowsProfileAdminUserName $Username -WindowsProfileAdminUserPassword $Password
```

しばらくすると kubernates サービスの展開が完了となります。

![AKS](/static/images/2022/07/aks08.png)

![AKS](/static/images/2022/07/aks09.png)

### Windows Server ノードプールの作成

ノードプールの追加の際には標準では Linux タイプが作成されるため、OsType で Windows を選択する必要があります。コマンドのサンプルは以下のようになります。

- リソースグループ名はすでに作成している名前とする
- クラスター名はすでに作成された名前とする

```powershell
New-AzAksNodePool -ResourceGroupName jpn-ShinchiDemo -ClusterName myAKSCluster -VmSetType VirtualMachineScaleSets -OsType Windows -Name npwin
```

実行結果は以下の通りです。

![AKS](/static/images/2022/07/aks10.png)

### クラスターに接続する

クラスターに接続する際には、`kubectl` のコマンドを利用します。このコマンドを実行するにあたって、資格情報をダウンロードして利用できるように構成します。このためのコマンドは以下の通りです

- リソースグループ名はすでに作成している名前とする
- クラスター名はすでに作成された名前とする

```powershell
Import-AzAksCredential -ResourceGroupName jpn-ShinchiDemo -Name myAKSCluster
```

クラスターへの接続を確認する場合は、以下のコマンドでノードが表示されます。

```powershell
kubectl get nodes
```

![AKS](/static/images/2022/07/aks11.png)

### アプリケーションを展開する

```powershell
vi sample.yaml
```

以下のコードをペーストします。vi は `i` をタイプすると入力モードになるため、そのあとペーストするとコードがペーストができます。また、 `:` をタイプするとコマンドを実行できるようになるため、 `w` をタイプしてファイルを保存してください（キータイプとしては :w + Enter の順になります）。終了するときは、 `:q` で vi を終了できます。

```yaml:sample.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sample
  labels:
    app: sample
spec:
  replicas: 1
  template:
    metadata:
      name: sample
      labels:
        app: sample
    spec:
      nodeSelector:
        "kubernetes.io/os": windows
      containers:
      - name: sample
        image: mcr.microsoft.com/dotnet/framework/samples:aspnetapp
        resources:
          limits:
            cpu: 1
            memory: 800M
        ports:
          - containerPort: 80
  selector:
    matchLabels:
      app: sample
---
apiVersion: v1
kind: Service
metadata:
  name: sample
spec:
  type: LoadBalancer
  ports:
  - protocol: TCP
    port: 80
  selector:
    app: sample
```

この yaml ファイルは ASP.NET のサンプルアプリのコンテナをダウンロード、ネットワークの構成に関して設定をしている形です。これを適用する際には、以下のコマンドで実行できます。

```powershell
kubectl apply -f sample.yaml
```

![AKS](/static/images/2022/07/aks12.png)

## 動作確認

正しく展開できているかどうかを確認するためのコマンドとして以下のコマンドを実行します。

```
kubectl get service sample --watch
```

以下のように IP アドレスが表示されます。

![AKS](/static/images/2022/07/aks13.png)

このサーバーに対して http でアクセスをすると以下のようにページが表示されます。

![AKS](/static/images/2022/07/aks14.png)

## まとめ

今回は AKS を利用するための基本的な手順をチュートリアルに沿って進めていきました。Docker のコンテナを展開して Web サーバーとして起動することができた形です。
