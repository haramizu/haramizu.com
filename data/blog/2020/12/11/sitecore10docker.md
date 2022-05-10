---
title: Sitecore 10 を Docker で実行する
date: '2020-12-11'
tags: ['Sitecore containers', 'Docker']
draft: false
summary: Sitecore Experience Platform 10.0 からは Docker のサポートが標準となりました。今回は Sitecore Experience Platform 10.0 を Docker で動かすための手順を紹介します。
images: ['/static/images/2020/12/launchpad.png']
---

> Docker 関連の記事は [Sitecore Docker シリーズ](/blog/sitecore-docker) にまとめています。

Sitecore Experience Platform 10.0 からは Docker のサポートが標準となりました。今回は Sitecore Experience Platform 10.0 を Docker で動かすための手順を紹介します。

## 環境の整備

デモ環境を作るために、以下のソフトウェアを利用していきます。エディターは好みで設定していただく形ですが、ここでは Visual Studio Code をインストールします。

- Windows Server 2019
- Chocolatey
- Visual Studio Code
- Git for Windows
- Docker Desktop

### Windows Server 2019 セットアップ

今回の環境は Microsoft Azure 上に立ち上げるために、Docker を利用することができる仮想マシンを準備しました。今回利用するインスタンスは Standard D8s v3 (8 vcpu 数、32 GiB メモリ) を選択しています。また、説明を参照しやすいように、ということで管理画面の日本語化はすでに実行しています。

インターネットからファイルをダウンロード、インストールすることができるように、Windows Server 2019 のサーバーのセキュリティを変更します。サーバーマネージャーを選択し、ローカルサーバーを指定、管理者に関してはダウンロードができるように、Internet Explorer のセキュリティ機能をオフにします。

![サーバーマネージャー](/static/images/2020/12/servermanager.gif 'サーバーマネージャー')

Internet Explorer を起動すると、プロテクトモードに関してのダイアログが表示されます。

![ダイアログ](/static/images/2020/12/internetexplorer.png 'ダイアログ')

ここではオンにします。この状態で、Google Chrome のダウンロード、インストールができていることを確認してください。

#### Hyper-V を有効にする

Docker では Windows コンテナを利用する際に Hyper-V を利用します。このため、Hyper-V を有効にする必要があります。有効にする手順としては、サーバーマネージャーを立ち上げて、Hyper-V とコンテナーを有効にしてください。

![HyperV](/static/images/2020/12/hyperv.gif 'HyperV')

Hyper-V を有効にするためには、マシンを再起動する必要がありますので、一度再起動してこの先の続きを進めていきます。

### Choco のインストール

さまざまなソフトウェアをインストールするのに便利なので、パッケージ管理ツールの Chocolatey のインストールをします。

- https://chocolatey.org/

ページの右上にある Install Now のボタンをクリックするとスクリプトが表示されます。そのスクリプトを PowerShell の管理者権限で実行することで、インストールが完了します。

インストールが完了したあと、まずは Git および vscode をインストールします。

```ps1
choco install git
choco install vscode
```

![Choco インストール](/static/images/2020/12/chocogitvscode.gif 'Choco インストール')

VS Code に関しては日本語の UI を追加でインストールすると便利です。

### Docker Desktop

Docker Desktop のインストールに関しても、コマンドラインでインストールできます。

```ps1
choco install docker-desktop
```

インストールの際に必要なコンポーネントがインストールされて、必要な場合は再起動を促します（以下のステップでは再起動が必要となっています）。

![Docker Desktop インストール](/static/images/2020/12/dockerdesktop.gif 'Docker Desktop インストール')

ログインをすると右下のタスクトレイで docker が起動していることを確認できます。

![Docker アイコン](/static/images/2020/12/dockerdesktop.png 'Docker アイコン')

アイコンを右クリックして、Windows コンテナに切り替えてください。

![Windows コンテナに切り替え](/static/images/2020/12/switchwindows.gif 'Windows コンテナに切り替え')

次のようにダイアログが表示されるので、切り替えをします。

![Windows コンテナに切り替え](/static/images/2020/12/switchwindows.png 'Windows コンテナに切り替え')

### Sitecore Docker Tool のインストール

インストールをする時に便利な支援ツールとして、 Sitecore Docker Tools をインストールします。Sitecore Gallery からダウンロードすることができるため、以下のコマンドを実行してインストールしてください。

```ps1
Register-PSRepository -Name "SitecoreGallery" -SourceLocation "https://sitecore.myget.org/F/sc-powershell/api/v2"
Install-Module SitecoreDockerTools
```

コマンドプロンプトで確認が来た際には Y もしくは A で進めていきます。

![SitecoreDockerTools インストール](/static/images/2020/12/sitecoredockertools.gif 'SitecoreDockerTools インストール')

## インストールの準備を始める

ツールの準備が一通りできたあと、ツールを使いながらインストールを進めていきます。

### 展開用のパッケージの準備

インストールに必要な展開パッケージは [Sitecore Experience Platform 10.0](https://dev.sitecore.net/Downloads/Sitecore_Experience_Platform/100/Sitecore_Experience_Platform_100.aspx)のサイトにある、Container Deployment Package をダウンロードしてください。

![ダウンロード](/static/images/2020/12/deploymentpackage.png 'ダウンロード')

今回ダウンロードしたファイル名は SitecoreContainerDeployment.10.0.0.004346.184.zip になります。このファイルを c:¥projects に zip ファイルを解凍して、以下のようなフォルダ構成としました。

![解凍](/static/images/2020/12/projectfolder.png '解凍')

フォルダの中には、compose フォルダ、k8s フォルダの２つが準備されています。今回は手元で実行するだけなので compose フォルダの ltsc2019 - xp0 を利用します。

### ライセンスファイルの準備

サイトコアのライセンスファイルを準備します。今回は上記に作ったフォルダ c:¥projects にコピします。

![ライセンス](/static/images/2020/12/license.png 'ライセンス')

## 環境設定

作業環境として、今回は xp0 を展開するために、 c:¥projects¥compose¥ltsc2019¥xp0 のフォルダにて作業を進めていきます。

このフォルダには、.env ファイル、docker-compose.yml ファイルが配置されているだけです。今回起動する Sitecore の環境を作るために、.env ファイルの値を設定していきます。

ファイルを確認すると以下の様になっています。

```
COMPOSE_PROJECT_NAME=sitecore-xp0
SITECORE_DOCKER_REGISTRY=scr.sitecore.com/sxp/
SITECORE_VERSION=10.0.0-ltsc2019
SITECORE_ADMIN_PASSWORD=
SQL_SA_PASSWORD=
TELERIK_ENCRYPTION_KEY=
SITECORE_IDSECRET=
SITECORE_ID_CERTIFICATE=
SITECORE_ID_CERTIFICATE_PASSWORD=
SITECORE_LICENSE=
CM_HOST=xp0cm.localhost
ID_HOST=xp0id.localhost
TRAEFIK_IMAGE=traefik:v2.2.0-windowsservercore-1809
TRAEFIK_ISOLATION=hyperv
ISOLATION=default
```

プロジェクト名は **sitecore-xp0** 、Docker のレジストリは Sitecore が提供するイメージを利用します。標準的なパラメータは設定されていますが、空欄となっている部分を埋めていく必要があります。

| パラメーター                     | 値                                    |
| -------------------------------- | ------------------------------------- |
| COMPOSE_PROJECT_NAME             | sitecore-xp0                          |
| SITECORE_DOCKER_REGISTRY         | scr.sitecore.com/sxp/                 |
| SITECORE_VERSION                 | 10.0.0-ltsc2019                       |
| SITECORE_ADMIN_PASSWORD          |                                       |
| SQL_SA_PASSWORD                  |                                       |
| TELERIK_ENCRYPTION_KEY           |                                       |
| SITECORE_IDSECRET                |                                       |
| SITECORE_ID_CERTIFICATE          |                                       |
| SITECORE_ID_CERTIFICATE_PASSWORD |                                       |
| SITECORE_LICENSE                 |                                       |
| CM_HOST                          | xp0cm.localhost                       |
| ID_HOST                          | xp0id.localhost                       |
| TRAEFIK_IMAGE                    | traefik:v2.2.0-windowsservercore-1809 |
| TRAEFIK_ISOLATION                | hyperv                                |
| ISOLATION                        | default                               |

### SITECORE_ADMIN_PASSWORD

Sitecore の管理者が利用するパスワードを設定します。このため、一般的な管理者が使うパスワードを設定してください。

### SQL_SA_PASSWORD

SQL Server が利用するパスワードを設定します。今回はツールを利用してパスワードを設定します。

```ps1
Set-DockerComposeEnvFileVariable "SQL_SA_PASSWORD" -Value (Get-SitecoreRandomString 19 -DisallowSpecial -EnforceComplexity)
```

PowerShell で上記のコマンドを実行すると、SQL_SA_PASSWORD にパスワードが設定されます。

### TELERIK_ENCRYPTION_KEY

ここには、64 文字〜128 文字のランダムな文字列を設定する必要があります。これに関しても、ツールを利用すると自動的に設定をします。

```ps1
Set-DockerComposeEnvFileVariable "TELERIK_ENCRYPTION_KEY" -Value (Get-SitecoreRandomString 128)
```

### Identity Server に関する設定

ログインをするための Identity Server に関する設定として、以下の３つの項目を設定する必要があります。

- SITECORE_IDSECRET : 64 文字のランダムな文字列
- SITECORE_ID_CERTIFICATE :
- SITECORE_ID_CERTIFICATE_PASSWORD

これに関しても上記と同じ様に、コマンドを実行して設定す流ことができます。今回は localhost というドメイン名で作業をしていきますので、以下の様に作成をしていきます。

```ps1
Set-DockerComposeEnvFileVariable "SITECORE_IDSECRET" -Value (Get-SitecoreRandomString 64 -DisallowSpecial)

$idCertPassword = Get-SitecoreRandomString 8 -DisallowSpecial
Set-DockerComposeEnvFileVariable "SITECORE_ID_CERTIFICATE" -Value (Get-SitecoreCertificateAsBase64String -DnsName "localhost" -Password (ConvertTo-SecureString -String $idCertPassword -Force -AsPlainText))

Set-DockerComposeEnvFileVariable "SITECORE_ID_CERTIFICATE_PASSWORD" -Value $idCertPassword
```

ここまで進めると、残りはライセンスの項目だけとなります。

![.envファイル](/static/images/2020/12/envfile.png '.envファイル')

### SITECORE_LICENSE

ライセンスファイルを利用してこの環境変数を定義します。これに関してもツールを利用することで簡単に設定することができます。

```ps1
Set-DockerComposeEnvFileVariable "SITECORE_LICENSE" -Value (ConvertTo-CompressedBase64String -Path "C:\projects\license.xml")
```

### ホスト名

今回は、ホスト名としては XP0 の構成になるため CM １台、Identity Server １台というシンプルな構成となっています。今回はもともと記載されているこの名前のまま進めていきます。

```
CM_HOST=xp0cm.localhost
ID_HOST=xp0id.localhost
```

なお、上記のホストをローカルで判別できる必要があるため、localhost に記述する必要があります。処理としては、PowerShell で以下の２行を実行すると完了します。

```ps1
Add-HostsEntry "xp0cm.localhost"
Add-HostsEntry "xp0id.localhost"
```

全て実行をしてパラメーターが埋まっている形で、準備は完了です。

![実行結果](/static/images/2020/12/dockertoollog.png '実行結果')

## 証明書の準備

Sitecore は https 通信が標準となるため、証明書を準備する必要があります。今回は localhost というドメイン名で作業を進めているため、自己証明書を作成していきます。

まず、証明書を作成するツールとして mkcert.ext をダウンロードします

- https://github.com/FiloSottile/mkcert/releases/ にアクセスします
- Windows のツールをダウンロードします（今回は mkcert-v1.4.3-windows-amd64.exe ）
- mkcert.exe にファイル名を変更して C:\projects\compose\ltsc2019\xp0\traefik にコピーします
- mkcert.exe のプロパティを開いて、ダイアログの下部に記載されているセキュリティの項目をチェックして利用できる様に許可します
  ![mkcert](/static/images/2020/12/mkcert.png 'mkcert')
- mkcert -install を実行、ダイアログで **はい** をクリックします
  ![mkcert](/static/images/2020/12/mkcert2.png 'mkcert')

これで準備が完了しました。あとはこのツールを利用して証明書の設定に必要となる、クライアント認証とキーファイルを作成します。

```ps1
./mkcert -cert-file certs\xp0cm.localhost.crt -key-file certs\xp0cm.localhost.key "xp0cm.localhost"
./mkcert -cert-file certs\xp0id.localhost.crt -key-file certs\xp0id.localhost.key "xp0id.localhost"
```

上記の手順を完了させると、必要となるファイルが certs の下に作成されています。

![mkcert](/static/images/2020/12/certs.png 'mkcert')

C:\projects\compose\ltsc2019\xp0\traefik\config\dynamic のフォルダの中に、certs_config.yaml というファイルが準備されています。

```yaml
tls:
  certificates:
    - certFile: C:\etc\traefik\certs\xp0cm.localhost.crt
      keyFile: C:\etc\traefik\certs\xp0cm.localhost.key
    - certFile: C:\etc\traefik\certs\xp0id.localhost.crt
      keyFile: C:\etc\traefik\certs\xp0id.localhost.key
```

今回作成をしている証明書のファイルのファイル名と同じため、このまま進めていきます。

## コンテナを利用して Sitecore を起動

C:\projects\compose\ltsc2019\xp0\ のフォルダに移動をして、以下のコマンドを実行してください。

```ps1
docker-compose up -d
```

docker-compose.yml のファイルの定義にしたがって、イメージをダウンロードが始まります。初回はこのダウンロード、展開に時間がかかると思います。ダウンロードが終わったあと、定義に合わせたコンテナが展開される形です。

![dockercompose](/static/images/2020/12/dockercompose.png 'dockercompose')

### VSCode Docker 拡張機能

しばらく時間がかかるので、Visual Studio Code で利用できる Docker の拡張機能をインストールします。Visual Studio Code の拡張機能にて、Docker と検索すると対象のツールが表示されます。

![Docker拡張機能](/static/images/2020/12/vsdocker.png 'Docker拡張機能')

インストールが完了すると、左側に Docker のアイコンが表示されます。このアイコンをクリックすると、イメージ、コンテナなどを参照、操作することができる様になります。

![Docker拡張機能](/static/images/2020/12/vsdocker2.png 'Docker拡張機能')

### アクセステスト

実際に docker-compose の処理が終わった際には、以下の様な画面が表示されます。

![dockercompose](/static/images/2020/12/dockercompose2.png 'dockercompose')

Visual Studio Code の Docker 拡張機能を参照すると、以下のような画面になっています。

![Docker拡張機能](/static/images/2020/12/vsdocker3.png 'Docker拡張機能')

実際に起動しているサーバーにアクセスするために、ブラウザで以下の URL にアクセスしてください。

- https://xp0cm.localhost

以下の様に、Sitecore の Welcome ページが表示されます。

![welcome](/static/images/2020/12/welcome.png 'welcome')

URL に /sitecore を追加してログイン画面に移動します。Admin のパスワードは .env で定義しているパスワードになります。ログインに成功すると、管理画面が表示されます。

![welcome](/static/images/2020/12/launchpad.png 'welcome')

### フォルダの確認

実際にどのように動作しているのかを確認していきます。まず、SQL Server およびインデックスに関するデータは、それぞれ以下のフォルダに展開されています。

- C:\projects\compose\ltsc2019\xp0\mssql-data
- C:\projects\compose\ltsc2019\xp0\solr-data

つまり、コンテナの利用を停止、終了してもデータは保持されている形です。

:::note

SQL Server のパスワードを .env で定義しているため、パスワードを変更をした場合はコンテナを停止して終了したあと、削除して改めて展開する必要があります。

:::

## 停止、終了

コンテナを停止させる際には、以下のコマンドで停止します。

```ps1
docker-compose stop
```

この場合、コンテナが停止しているだけとなります。実際にコンテナを削除させる場合は、

```ps1
docker-compose down
```

を実行することで、コンテナが削除されます。改めて、docker-compose up -d を実行することで、初期起動と同じコンテナが作成されます。

## 参考情報

- [最初の Sitecore インスタンスの実行](https://containers.doc.sitecorejp.net/docs/run-sitecore)
- [Sitecore Experience Platform 10.0](https://dev.sitecore.net/Downloads/Sitecore_Experience_Platform/100/Sitecore_Experience_Platform_100.aspx)
