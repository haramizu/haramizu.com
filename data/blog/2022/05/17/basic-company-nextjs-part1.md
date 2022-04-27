---
title: Sitecore Helix の Next.js サンプルを動かす - 準備
date: '2022-05-17'
tags: ['デモ', 'Next.js', 'Docker']
draft: true
summary: Sitecore が提供しているデモ Sitecore Helix に、Next.js をベースにしたサンプルが含まれています。今回は、このサンプルを動かすところまでの手順を紹介していきます。なお、今回は設定までとして、実際にコンテナを起動するのは次回紹介する予定です。
images: ['/static/images/2022/05/sample04.png']
---

Sitecore が提供しているデモ Sitecore Helix に、Next.js をベースにしたサンプルが含まれています。今回は、このサンプルを動かすところまでの手順を紹介していきます。なお、今回は設定までとして、実際にコンテナを起動するのは次回紹介する予定です。

## Sitecore Helix とは？

Sitecore Helix は、CMS でサイトを構築するにあたって、継続して更新、機能強化をしていくという点で考慮すべきアーキテクチャガイドに関する名称となります。最初の頃にアーキテクチャに関して全く考慮していない場合、将来的の実装において互換性のないコンポーネントが多く出来上がってしまうなどの問題が起こりにくいように、最初から考慮すべき点を明確していく、その一手間が長期的にメンテナンスしやすいサイトの構築につながるため重要な要素です。

英語のページのみですが、以下のようにサイトを立ち上げています。

- [Sitecore Helix](https://helix.sitecore.com)

この Sitecore Helix のガイドに沿ったコンテンツとしてデモサイトなどもこれまで公開していましたが、従来のデモと異なるサンプルとして、Sitecore Helix Examples というリポジトリを公開しています。

- [Sitecore Helix Examples](https://github.com/Sitecore/Helix.Examples)

この中には、ASP.NET Core 、Next.js のサンプルおよび Sitecore TDS 、Unicorn などのサンプルが提供されています。今回はこの中の Next.js のサンプルを起動する手順を紹介するのがテーマとなります。

## 環境の準備

まず今回検証をする環境は Docker が動作することが前提となっています。このため、以下の手順を完了させていることを前提としています。

- [Sitecore XM を Docker で動かすための環境整備](/blog/2022/05/10/sitecore-docker-environment)

## リポジトリのクローンを作成

今回は、GitHub Desktop を利用して、以下のように `c:\projects` の配下にリポジトリを作成します。指定するリポジトリの URL は *https://github.com/Sitecore/Helix.Examples.git* です。

![sample](/static/images/2022/05/sample01.png)

作成されたフォルダの C:\projects\Helix.Examples\examples にある helix-basic-nextjs を C:\projects の直下にコピーをします。

![sample](/static/images/2022/05/sample02.png)

GitHub Desktop を立ち上げて Add local repository として新しく作成したフォルダをリポジトリとして管理するようにします。

![sample](/static/images/2022/05/sample03.png)

## init.ps1 の中身を確認する

Sitecore が提供しているサンプルには、`init.ps1` のように初期設定をするにあたって便利なスクリプトが含まれています。今回はこのファイルの中身を見ていきます。実行をするだけであれば、以下の１行で完了となります。

```ps1
.\init.ps1 -InitEnv -LicenseXmlPath "C:\path\to\license.xml" -AdminPassword "DesiredAdminPassword"
```

スクリプトの中身を見ていくのは、どういう動きをしているのかを理解するのを今回は目的とします。まず最初に３つのパラメータを設定しています。

```ps1
[CmdletBinding(DefaultParameterSetName = "no-arguments")]
Param (
    [Parameter(HelpMessage = "Enables initialization of values in the .env file, which may be placed in source control.",
        ParameterSetName = "env-init")]
    [switch]$InitEnv,

    [Parameter(Mandatory = $true,
        HelpMessage = "The path to a valid Sitecore license.xml file.",
        ParameterSetName = "env-init")]
    [string]$LicenseXmlPath,

    # We do not need to use [SecureString] here since the value will be stored unencrypted in .env,
    # and used only for transient local development environments.
    [Parameter(Mandatory = $true,
        HelpMessage = "Sets the sitecore\\admin password for this environment via environment variable.",
        ParameterSetName = "env-init")]
    [string]$AdminPassword
)
```

このうち２つ、LicenseXmlPath と AdminPassword は必須となっています。これは少し前に記載した init.ps1 で実行しているパラメータと同じなのがわかります。この２つのパラメータの処理に関しては、後ほど記載します。

続いて、Sitecore Docker Tools のインストール、証明書に関しての手順を実行しています。以前に他のプロジェクトなどでインストールをしている場合は、Sitecore Docker Tool のインストールは不要です。そして、証明書に関しても同様のことが言えます。

証明書、ホストの登録が終わったところで、**Populate the environment file** のエリアで各パラメータを設定していくのがわかります。つまり、この init.ps1 を利用することで、`.env` をなるべく自動的に設定できるようにしている形です。

さまざまなパラメーターを毎回設定するのも手間なので、一度 init.ps1 を実行したあと、 .env ファイルを書き換える手順で進めていきます。ということで、以下を実行します。

```ps1
.\init.ps1 -InitEnv -LicenseXmlPath "C:\projects\license\license.xml" -AdminPassword "DesiredAdminPassword"
```

![sample](/static/images/2022/05/sample04.png)

## ドメインを変更する

今回は、ドメインに関しては以下のように設定をします。`.env` ファイルに以下の記載をします。

```
CM_HOST=cm-basic-company-nextjs.sitecoredemo.jp
CD_HOST=cd-basic-company-nextjs.sitecoredemo.jp
ID_HOST=id-basic-company-nextjs.sitecoredemo.jp
RENDERING_HOST=www-basic-company-nextjs.sitecoredemo.jp
```

また証明書に関しては、以前作成をしたファイルをそのまま流用します。

- [Sitecore XM1 で起動しているドメインを変更する](/blog/2022/05/12/sitecore-docker-domain)

**C:\projects\helix-basic-nextjs\docker\traefik\certs** に証明書ファイルをコピー、**C:\projects\helix-basic-nextjs\docker\traefik\config\dynamic\certs_config.yaml** に記載されるファイルの名前を変更しておきます。

```yaml
tls:
  certificates:
    - certFile: C:\etc\traefik\certs\_wildcard.sitecoredemo.jp.pem
      keyFile: C:\etc\traefik\certs\_wildcard.sitecoredemo.jp-key.pem
```

localhost に以下のホストを追加するべく PowerShell でコマンドを実行します。

```
Add-HostsEntry "cm-basic-company-nextjs.sitecoredemo.jp"
Add-HostsEntry "cd-basic-company-nextjs.sitecoredemo.jp"
Add-HostsEntry "id-basic-company-nextjs.sitecoredemo.jp"
Add-HostsEntry "www-basic-company-nextjs.sitecoredemo.jp"
```

`.env` のファイルは以下のような感じでさまざまな値が設定されています。

![sample](/static/images/2022/05/sample05.png)

ここでポイントとしては、`JSS_EDITING_SECRET` の値がルートにある `.env` にも入っていますが、`src\Project\BasicCompany\nextjs\` にある `.env` にも同じ値が設定されています。必要な設定が一括で実行できた形です。

## まとめ

今回はコンテナを起動するにあたって必要となる準備を紹介しました。今回は少し踏み込んで、init.ps1 がどのような動きをしているのかを見てもらいました。次回は、手順に沿ってデモ環境を立ち上げたいと思います。

## 参考サイト

- [Troubleshooting unhealthy Sitecore containers on Docker](https://www.logicalfeed.com/posts/1249/troubleshooting-unhealthy-sitecore-containers-on-docker)
