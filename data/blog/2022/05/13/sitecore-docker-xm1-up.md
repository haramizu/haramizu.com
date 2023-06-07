---
title: Sitecore XM 10.2 を Docker で実行する
date: '2022-05-13'
tags: ['Docker', 'Sitecore']
draft: true
summary: 前回は Docker の動く環境を整備するところまで紹介をしました。今回は、Sitecore XM 10.2 を Docker で動作させるところまで紹介をしていきます。
images: ['/static/images/2022/05/xm11.png']
---

前回は Docker の動く環境を整備するところまで紹介をしました。今回は、Sitecore XM 10.2 を Docker で動作させるところまで紹介をしていきます。

## 展開ファイルの準備

Sitecore をコンテナで動かすための展開ファイルは、Sitecore の公式 GitHub にて展開をしています。

- [Repository of Sitecore container deployment files](https://github.com/Sitecore/container-deployment)

今回はこのリポジトリをローカルに展開します。GitHub Desktop を利用して、`c:¥projects` の下に展開します。

![xmsetup](/static/images/2022/05/xm01.png)

Sitecore 10.2 XM1 の展開ファイルは、以下のフォルダに準備されています。

- C:\projects\container-deployment\compose\sxp\10.2\ltsc2019\xm1

毎回この階層に移動して作業をするのは面倒なので、`C:\projects\xm1-sample` にフォルダごとコピーします。

![xmsetup](/static/images/2022/05/xm02.png)

## 環境設定

Visual Studio Code を利用して、`C:\projects\xm1-sample` のフォルダを開きます。この際、管理者権限を取得していることを確認してください。

![xmsetup](/static/images/2022/05/xm03.png)

用意したフォルダには、 .env ファイル、docker-compose.yml ファイルがあります。今回起動する Sitecore の環境を作るために、.env ファイルの値を設定していきます。

```
COMPOSE_PROJECT_NAME=sitecore-xm1
SITECORE_DOCKER_REGISTRY=scr.sitecore.com/sxp/
SITECORE_VERSION=10.2-ltsc2019
SITECORE_ADMIN_PASSWORD=
SQL_SERVER=mssql
SQL_SA_LOGIN=sa
SQL_SA_PASSWORD=
TELERIK_ENCRYPTION_KEY=
SITECORE_IDSECRET=
SITECORE_ID_CERTIFICATE=
SITECORE_ID_CERTIFICATE_PASSWORD=
SITECORE_LICENSE=
CD_HOST=xm1cd.localhost
CM_HOST=xm1cm.localhost
ID_HOST=xm1id.localhost
TRAEFIK_IMAGE=traefik:v2.2.0-windowsservercore-1809
TRAEFIK_ISOLATION=hyperv
ISOLATION=default
SOLR_CORE_PREFIX_NAME=sitecore
# You should change the shared secret to a random string and not use the default value
MEDIA_REQUEST_PROTECTION_SHARED_SECRET=HQ(NjM(u6_5koVla-cTf4ta8x1h6Sb+ZcUQrULUz-0Afpx0cx-NuMtIoQkpDFmX5
```

ファイルを確認すると以下の様になっています。

プロジェクト名は **sitecore-xp0** 、Docker のレジストリは Sitecore が提供するイメージを利用します。標準的なパラメータは設定されていますが、空欄となっている部分を埋めていく必要があります。

| パラメーター                     | 値                                    |
| -------------------------------- | ------------------------------------- |
| COMPOSE_PROJECT_NAME             | sitecore-xm1                          |
| SITECORE_DOCKER_REGISTRY         | scr.sitecore.com/sxp/                 |
| SITECORE_VERSION                 | 10.2-ltsc2019                         |
| SITECORE_ADMIN_PASSWORD          |                                       |
| SQL_SA_PASSWORD                  |                                       |
| TELERIK_ENCRYPTION_KEY           |                                       |
| SITECORE_IDSECRET                |                                       |
| SITECORE_ID_CERTIFICATE          |                                       |
| SITECORE_ID_CERTIFICATE_PASSWORD |                                       |
| SITECORE_LICENSE                 |                                       |
| CD_HOST                          | xm1cd.localhost                       |
| CM_HOST                          | xm1cm.localhost                       |
| ID_HOST                          | xm1id.localhost                       |
| TRAEFIK_IMAGE                    | traefik:v2.2.0-windowsservercore-1809 |
| TRAEFIK_ISOLATION                | hyperv                                |
| ISOLATION                        | default                               |
| SOLR_CORE_PREFIX_NAME            | sitecore                              |

上記の設定は、`compose-init.ps1` のファイルの中身を書き換えることで一気に初期設定を作ることができますが、今回は手動で進めていきます。

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

![xmsetup](/static/images/2022/05/xm04.png)

ここまで進めると、残りはライセンスの項目だけとなります。

![xmsetup](/static/images/2022/05/xm05.png)

### SITECORE_LICENSE

ライセンスファイルを利用してこの環境変数を定義します。これに関してもツールを利用することで簡単に設定することができます。

```ps1
Set-DockerComposeEnvFileVariable "SITECORE_LICENSE" -Value (ConvertTo-CompressedBase64String -Path "C:\projects\license\license.xml")
```

![xmsetup](/static/images/2022/05/xm06.png)

### ホスト名

今回は、ホスト名としては XM1 の構成になるため CM/CD 各１台と Identity Server １台というシンプルな構成となっています。今回はもともと記載されているこの名前のまま進めていきます。

```
CD_HOST=xm1cd.localhost
CM_HOST=xm1cm.localhost
ID_HOST=xm1id.localhost
```

なお、上記のホストをローカルで判別できる必要があるため、localhost に記述する必要があります。処理としては、PowerShell で以下の２行を実行すると完了します。

```ps1
Add-HostsEntry "xm1cd.localhost"
Add-HostsEntry "xm1cm.localhost"
Add-HostsEntry "xm1id.localhost"
```

全て実行をしてパラメーターが埋まっている形で、準備は完了です。

## 証明書の準備

Sitecore は https 通信が標準となるため、ローカルで動かす際にも証明書を準備する必要があります。今回は localhost というドメイン名で作業を進めているため、自己証明書を作成していきます。証明書を作成するツールは mkcert を利用します。このコマンドはすでに環境を整備する時にインストール済みとなっています。

mkcert を利用して証明書の設定に必要となる、クライアント認証とキーファイルを作成します。ディレクトリとして `traefik` に移動したあと、以下のコマンドを実行してください。

```ps1
mkcert -cert-file certs\xm1cd.localhost.crt -key-file certs\xm1cd.localhost.key "xm1cd.localhost"
mkcert -cert-file certs\xm1cm.localhost.crt -key-file certs\xm1cm.localhost.key "xm1cm.localhost"
mkcert -cert-file certs\xm1id.localhost.crt -key-file certs\xm1id.localhost.key "xm1id.localhost"
```

![xmsetup](/static/images/2022/05/xm07.png)

上記の手順を完了させると、必要となるファイルが certs の下に作成されています。

![xmsetup](/static/images/2022/05/xm08.png)

C:\projects\xm1\traefik\config\dynamic のフォルダの中に、certs_config.yaml というファイルが準備されています。

```yaml
tls:
  certificates:
    - certFile: C:\etc\traefik\certs\xm1cd.localhost.crt
      keyFile: C:\etc\traefik\certs\xm1cd.localhost.key
    - certFile: C:\etc\traefik\certs\xm1cm.localhost.crt
      keyFile: C:\etc\traefik\certs\xm1cm.localhost.key
    - certFile: C:\etc\traefik\certs\xm1id.localhost.crt
      keyFile: C:\etc\traefik\certs\xm1id.localhost.key
```

今回作成をしている証明書のファイルのファイル名と同じため、このまま進めていきます。

## コンテナを起動する

`C:\projects\xm1-sample` のフォルダに移動して、以下のコマンドを実行してください。

```ps1
docker-compose up -d
```

![xmsetup](/static/images/2022/05/xm09.png)

しばらくすると、サーバーの起動が完了します。

## 動作確認

まず最初に CM サーバーにアクセスをしたいと思います。https://xm1cm.localhost/ にアクセスをすると、以下のように画面が表示されます。証明書が安全ではないと何度か警告が出てきますが、自己証明書なのでブラウザによっては警告が出ます。ここではそれを無視して進めていきます。

![xmsetup](/static/images/2022/05/xm10.png)

管理画面に移動するために、 /sitecore を追加してアクセスをするとログイン画面になりました。

![xmsetup](/static/images/2022/05/xm11.png)

ただし証明書が正しく認識できていないため、ブラウザがエラーを表示します。これに関しては次回独自ドメインを設定したいと思います。

実際に起動している状況は、Visual Studio Code のコンテナ一覧の画面で確認することができます。

![xmsetup](/static/images/2022/05/xm12.png)

## まとめ

今回は XM1 の環境をコンテナで起動しました。自己証明書に関しては取り扱いが面倒なところです。これに関しては自己証明書をパソコンに登録する手順で回避可能です（手順に関してはネットで別途調べてください）。このブログでは、次回はワイルドカード証明書を利用して立ち上げる手順を紹介します。

## 参考情報

- [Sitecore Docker シリーズ](/blog/sitecore-docker)
- [Sitecore XM を Docker で動かすための環境整備](/blog/2022/05/10/sitecore-docker-environment)
- [最初の Sitecore インスタンスを実行する](https://doc.sitecore.com/xp/ja/developers/101/developer-tools/run-your-first-sitecore-instance.html)
- [Sitecore 10 を Docker で実行する](/blog/2020/12/11/sitecore10docker)
