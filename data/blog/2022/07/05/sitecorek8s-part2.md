---
title: Sitecore on Azure Kubernetes Service - 展開前の設定
date: '2022-07-05'
tags: ['AKS', 'インストール']
draft: true
summary: Sitecore を AKS を利用して展開するための設定手順について、今回は各種設定ファイルの中のデータを作成していきます。設定ファイルのデータは実際に展開する際のデータとして利用するものになります。
images: ['/static/images/2022/07/sitecoreaks06.png']
---

Sitecore を AKS を利用して展開するための設定手順について、今回は各種設定ファイルの中のデータを作成していきます。設定ファイルのデータは実際に展開する際のデータとして利用するものになります。

## Kubernates シークレットの作成

Kubernates の各種設定をパラメーターとして持つことができるように、`secrets` というフォルダにテキストファイル、それに伴う設定を入れていく必要があります。この手順に関しては展開ガイドの 1.3.4 に設定に関して記載されていますが、詳細は 4.5 のリストを見るとわかります。XM1 の場合に設定が必要なファイルは以下通りです。

| ファイル名                                          | 概要                             | デフォルトの値                                                       |
|-----------------------------------------------------|----------------------------------|----------------------------------------------------------------------|
| sitecore-license.txt                                | ライセンスファイル               |                                                                      |
| sitecore-adminpassword.txt                          | 管理者パスワード                 |                                                                      |
| sitecore-telerikencryptionkey.txt                   | Telerik Web キー                 |                                                                      |
| sitecore-identitycertificate.txt                    | Identity Server 証明書           |                                                                      |
| sitecore-identitycertificatepassword.txt            | Identity Server 証明書パスワード |                                                                      |
| sitecore-identitysecret.txt                         | シークレットキー                 |                                                                      |
| sitecore-solr-connection-string.txt                 | Solr の接続文字列                | http://solr:8983/solr;solrCloud=true                                 |
| sitecore-solr-core-prefix-name.txt                  | 共通の Prefix                    | sitecore                                                             |
| sitecore-databaseusername.txt                       | 管理者名                         | sa                                                                   |
| sitecore-databaseservername.txt                     | データベース名                   | mssql                                                                |
| sitecore-databasepassword.txt                       | データベースパスワード           |                                                                      |
| sitecore-database-elastic-pool-name.txt             | データベース Elastic Pool 名     |                                                                      |
| sitecore-core-database-username.txt                 | Core データベースユーザー名      | coreuser                                                             |
| sitecore-core-database-password.txt                 | Core データベースパスワード      |                                                                      |
| sitecore-master-database-username.txt               | Master データベースユーザー名    | masteruser                                                           |
| sitecore-master-database-password.txt               | Master データベースパスワード    |                                                                      |
| sitecore-web-database-username.txt                  | Web データベースユーザー名       | webuser                                                              |
| sitecore-web-database-password.txt                  | Web データベースパスワード       |                                                                      |
| sitecore-forms-database-username.txt                | Form データベースユーザー名      | formsuser                                                            |
| sitecore-forms-database-password.txt                | Form データベースパスワード      |                                                                      |
| sitecore-media-request-protection-shared-secret.txt | メディアリクエスト用シークレット | CoreHQ(NjM(u6_5koVlacTf4ta8x1h6Sb+ZcUQrULUz-0Afpx0cx- NuMtIoQkpDFmX5 |

このうち、以下のファイルはパスワードやキーを指定する形で設定ができます。

- sitecore-adminpassword.txt
- sitecore-telerikencryptionkey.txt (64-128 の文字数)
- sitecore-databasepassword.txt
- sitecore-database-elastic-pool-name.txt
- sitecore-core-database-password.txt
- sitecore-master-database-password.txt
- sitecore-web-database-password.txt
- sitecore-forms-database-password.txt
- sitecore-media-request-protection-shared-secret.txt （デフォルトの値がありますが、変更が推奨のため）

残りのファイルに関して、手順を紹介していきます。

### sitecore-license.txt

Sitecore のライセンスに関する情報をテキストに設定する必要があります。ここでは SitecoreDockerTools のモジュールを利用して作成するのが簡単なため、まず `C:\Projects\aksxm1\secrets` のフォルダに `.env` ファイルを作成します。ファイルの中は1行だけ記載してください。

```
SITECORE_LICENSE=
```

続いて上記の Path に移動をして、以下のコマンドを実行します（ライセンスファイルに関してはパスを確認してください）。以下のコマンドは管理者権限でターミナルを開いて実行します。

```
cd C:\Projects\aksxm1\secrets
Install-Module SitecoreDockerTools
Set-DockerComposeEnvFileVariable "SITECORE_LICENSE" -Value (ConvertTo-CompressedBase64String -Path "C:\Projects\license\license.xml")
```

![AKS](/static/images/2022/07/sitecoreaks07.png)

実行をすると以下のように .env の後ろにデータが出来ています。最初の **SITECORE_LICENSE=** を削除して、sitecore-license.txt のファイルにテキストデータをコピーして作業が完了となります。

### Identity Server 関連ファイル

上記の手順と同じように、SitecoreDockerTools を利用してキーを生成していきます。まず、.env ファイルを以下のように書き換えてください。ライセンスの部分はすでに作業済なので削除して問題ありません。

```
SITECORE_IDSECRET=
SITECORE_ID_CERTIFICATE=
SITECORE_ID_CERTIFICATE_PASSWORD=
```

下記のキーを生成するためには、以下のコードを実行してください。

```
Import-Module SitecoreDockerTools
Set-DockerComposeEnvFileVariable "SITECORE_IDSECRET" -Value (Get-SitecoreRandomString 64 -DisallowSpecial)
$idCertPassword = Get-SitecoreRandomString 12 -DisallowSpecial
Set-DockerComposeEnvFileVariable "SITECORE_ID_CERTIFICATE" -Value (Get-SitecoreCertificateAsBase64String -DnsName "localhost" -Password (ConvertTo-SecureString -String $idCertPassword -Force -AsPlainText))
Set-DockerComposeEnvFileVariable "SITECORE_ID_CERTIFICATE_PASSWORD" -Value $idCertPassword
```

それぞれの値が .env ファイルに生成されています。生成された値を以下のファイルにコピーしてください。

| ファイル名                               | 項目                             |
|------------------------------------------|----------------------------------|
| sitecore-identitysecret.txt              | SITECORE_IDSECRET                |
| sitecore-identitycertificate.txt         | SITECORE_ID_CERTIFICATE          |
| sitecore-identitycertificatepassword.txt | SITECORE_ID_CERTIFICATE_PASSWORD |

行ごとコピーをして、項目名と = を削除する形で作業は完了です。作業が完了したところで .env ファイルは削除しても問題ありません。

## ホスト名の変更

展開をするにあたって、Sitecore のそれぞれのインスタンスのホスト名を設定する必要があります。それぞれ、以下のファイルになります。

- configmaps\cd-hostname
- configmaps\cm-hostname
- configmaps\id-hostname

なお、前回のブログ記事で証明書に関しての手順は記載しているため、この部分は省略します。

## まとめ

これで AKS に Sitecore を展開するための準備が完了しました。次回は、非本番環境としての AKS の展開を実行します。
