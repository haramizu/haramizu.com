---
title: Sitecore Experience Commerce を動かす 
date: '2021-06-10'
lastmod: '2021-06-10'
tags: ['Sitecore','デモ','インストール','Commerce']
draft: false
summary: 今回は Sitecore が提供する Commerce 製品の一つ、Sitecore Experience Commerce のインストールに関する手順を紹介します。
images: ['/static/images/2021/06/commerce11.png']
---

今回は Sitecore が提供する Commerce 製品の一つ、Sitecore Experience Commerce のインストールに関する手順を紹介します。

## 前提条件

仮想マシンで Sitecore Experience Platform 10.1 が動作していることを前提として、紹介をしていきます。このため、前回の記事でインストールをしていた環境をそのまま利用します。

* [Sitecore Experience Platform を仮想マシンで動かす](/blog/2021/06/09/sitecore-experience-platform-101)

## 追加モジュールのインストール

Sitecore Experience Commerce は以下のモジュールを追加で必要とします。

### Redis

キャッシュとして Redis を利用しているので、以下のサイトからダウンロード、インストールをしてください。

* [Redis](https://github.com/microsoftarchive/redis/releases/tag/win-3.0.504) 

![commerce](/static/images/2021/06/commerce01.png)

### .Net Core 3.1.6

.NET Core のランタイムとして、3.1.6 以降のモジュールのインストールが必要となります。インストールをするのは **Hosting Bundle** です。

* [.NET Core 3.1](https://dotnet.microsoft.com/download/dotnet/3.1)

今回は、3.1.15 をインストールしました。

![commerce](/static/images/2021/06/commerce02.png)

### .Net Core 2.1.28

Sitecore Experience Platform 10.1 のインストールをしていると、 .Net Core 2.1.23 がインストールされていますが、少し古いバージョンとなるため、.NET Core 2.x のランタイムとして、2.1.28 に入れ替えます。古いバージョンは消しても大丈夫です。インストールをするのは **Hosting Bundle** です。

* [.Net Core 2.1.28](https://dotnet.microsoft.com/download/dotnet/2.1)

.NET Core の入れ替えなどをしているので、IIS リセット、もしくはサーバーを再起動してください。

## インストールの準備

Sitecore Experience Commerce 10.1 のモジュールをダウンロードします。

* [Sitecore Experience Commerce 10.1](https://dev.sitecore.net/Downloads/Sitecore_Commerce/101/Sitecore_Experience_Commerce_101.aspx)

*Download Options for On Premises Deployments* の中から *Packages for On Premises WDP 2021.02-7.0.162* をクリックしてダウンロードします。

* Sitecore.Commerce.WDP.2021.02-7.0.162.zip

ダウンロードしたファイルを、c:¥projects¥xc101 に展開します。

![commerce](/static/images/2021/06/commerce03.png)

SIF.Sitecore.Commerce.6.0.18.zip のファイルを展開します。

![commerce](/static/images/2021/06/commerce04.png)

展開をしたあとは不要なので削除します。

SXA のコンポーネントとなる *Sitecore.PowerShell.Extensions-6.2.zip* と *Sitecore Experience Accelerator 10.1.0.3751.zip* を c:¥projects¥xc101 にコピーします。

MSBuild Microsoft Visual Studio Web targets を利用するため、以下のサイトからファイルをダウンロードします。

* https://www.nuget.org/packages/MSBuild.Microsoft.VisualStudio.Web.targets/

サイトにアクセスすると下のような画面になります。

![commerce](/static/images/2021/06/commerce05.png)

右側に表示されている **Download Package** をクリックして、モジュールのダウンロードをします。ダウンロードをしたファイルのプロパティを参照すると、ファイルが念の為ブロックされている状態です。

![commerce](/static/images/2021/06/commerce06.png)

許可するをクリックしてローカルで利用できるようにします。またダウンロードファイルの拡張子を nupkg から zip に変更します。ファイルの拡張子を変更すると、エクスプローラでそのまま回答できるため、c:¥projects¥xc101 に展開します

![commerce](/static/images/2021/06/commerce07.png)

![commerce](/static/images/2021/06/commerce08.png)

以下のようなフォルダの構成になっていることを確認します。

```
PS C:\projects\xc101> dir


    ディレクトリ: C:\projects\xc101


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----       2021/06/04      8:47                msbuild.microsoft.visualstudio.web.targets.14.0.0.3
d-----       2021/06/04      8:38                SIF.Sitecore.Commerce.6.0.18
------       2019/03/29     15:35      278539353 Adventure Works Images.OnPrem.scwdp.zip
------       2021/02/18     16:42         556351 Sitecore Commerce Connect Core OnPrem 16.0.16.scwdp.zip
------       2021/02/18     16:42           8143 Sitecore Commerce Connect Schema Definitions for IndexWorker OnPrem 16
                                                 .0.16.scwdp.zip
------       2021/02/18     16:42          59235 Sitecore Commerce Connect Schema Definitions for xConnect OnPrem 16.0.
                                                 16.scwdp.zip
------       2021/02/22     12:43        1355220 Sitecore Commerce Engine Connect OnPrem 7.0.37.scwdp.zip
------       2021/02/22     12:43        2055735 Sitecore Commerce Experience Accelerator 6.0.17.scwdp.zip
------       2021/02/22     12:43           6409 Sitecore Commerce Experience Accelerator Habitat Catalog 6.0.17.scwdp.
                                                 zip
------       2021/02/22     12:43        5445159 Sitecore Commerce Experience Accelerator Storefront 6.0.17.scwdp.zip
------       2021/02/22     12:43        1403717 Sitecore Commerce Experience Accelerator Storefront Themes 6.0.17.scwd
                                                 p.zip
------       2021/02/18     16:42         337089 Sitecore Commerce ExperienceAnalytics Core OnPrem 16.0.16.scwdp.zip
------       2021/02/18     16:42         126798 Sitecore Commerce ExperienceProfile Core OnPrem 16.0.16.scwdp.zip
------       2021/02/18     16:42         104632 Sitecore Commerce Marketing Automation Core OnPrem 16.0.16.scwdp.zip
------       2021/02/18     16:41         107643 Sitecore Commerce Marketing Automation for AutomationEngine 16.0.16.zi
                                                 p
------       2021/02/18     16:42          85733 Sitecore Commerce Marketing Automation Scaled 16.0.16.scwdp.zip
-a----       2021/03/03     10:48       34016143 Sitecore Experience Accelerator 10.1.0.3751.zip
------       2021/02/16     19:53        3646879 Sitecore.BizFx.OnPrem.6.0.6.scwdp.zip
------       2021/02/16     19:44          71220 Sitecore.BizFX.SDK.6.0.6.zip
------       2021/02/22     12:44       16734047 Sitecore.Commerce.Engine.OnPrem.Solr.7.0.162.scwdp.zip
------       2021/02/22     12:43       29028232 Sitecore.Commerce.Engine.SDK.7.0.55.zip
------       2019/03/29     15:37      295313591 Sitecore.Commerce.Habitat.Images.OnPrem.scwdp.zip
------       2021/02/18     18:56           4085 Sitecore.Identity.Config.Commerce.6.0.18.scwdp.zip
-a----       2021/03/03     10:48        5178534 Sitecore.PowerShell.Extensions-6.2.zip
------       2021/02/18     18:56         123942 SolrSchemas.Sitecore.Commerce.6.0.18.zip
------       2021/02/22     12:43        3993490 speak-icon-fonts-1.1.0.tgz
------       2021/02/22     12:43         103085 speak-ng-bcl-2.0.0-r00116.tgz
------       2021/02/22     12:43         549593 speak-styling-1.0.0-r00110.tgz

```

## インストールスクリプトの調整

インストールスクリプトは、展開済みの *C:\projects\xc101\SIF.Sitecore.Commerce.6.0.18* のフォルダの中にある **Deploy-Sitecore-Commerce.ps1** のファイルになります。設定をする項目は以下の通りとなります。

| パラメータ | 設定値 |
|-|-|
| $SkipInstallDefaultStorefront | StoreFront （デモサイト）インストールスキップのフラグ |
| $SiteNamePrefix | Sitecore インストールで利用した Prefix を設定 |
| $SiteName | サイト名を設定 |
| $IdentityServerSiteName | Sitecore Identity Server のインスタンス名 |
| $SitecoreIdentityServerUrl | 上記の URL |
| $SiteHostHeaderName | Storefront サイトの URL |
| $XConnectInstallDir | xConnect インストールディレクトリ |
| $SqlUser | SQL Server のログイン ID |
| $SqlPass | SQL Server のパスワード |
| $SolrRoot | Solr をインストールしているディレクトリ |
| $SolrService | Solr のサービス名 |
| $CommerceServicesHostPostfix | Commerce Service のホスト名 |

Solr のポートがデフォルトで XP と XC で異なるので、XP のインストールをした時のポート番号を設定するのを忘れないでください。

また、決済に関する検証をするために Braintree に登録して Sandbox のキーを取得してください。

| パラメータ | 設定値 |
|-|-|
| $BraintreeMerchantId | MerchantId |
| $BraintreePublicKey | Public Key |
| $BraintreePrivateKey | Private Key |
| $BraintreeEnvironment | sandbox |

CommerceEngineConnectClientSecret のパラメーターに Client Secret を設定する必要がります。 ClientSecret の値を取得するために、以下のスクリプトを実行してください。

```powershell
$bytes = New-Object Byte[] 32
$rand = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rand.GetBytes($bytes)
$rand.Dispose()
$newClientSecret = [System.Convert]::ToBase64String($bytes)

Write-Host $newClientSecret
```

サンプルのファイルは、 https://github.com/SitecoreJapan/InstallScript/blob/master/XC100/GenerateClientSecret.ps1 に展開しています。

これでスクリプトの準備は完了しました。

## インストールの実行

インストールの前に、モジュールのインストールなども実施していたので、一度再起動しておきます。再起動後、インストールスクリプトを実行するだけです。

```
cd C:\projects\xc101\SIF.Sitecore.Commerce.6.0.18
.\XC100-Sitecore-Commerce.ps1
```

インストールが完了すると、インストール時間が表示されて完了となります。

![commerce](/static/images/2021/06/commerce09.png)

## 日本語リソースのインポート

Sitecore Experience Commerce 10.1 の[ファイルをダウンロード](https://dev.sitecore.net/Downloads/Sitecore_Commerce/101/Sitecore_Experience_Commerce_101.aspx)する一番下のエリアに Translations があります。ここから、Business Tools translations、SXA Storefront Translations および Commerce Connect translations をダウンロードしてください。

1. Sitecore のインスタンスがインストールされている temp フォルダに上記のファイルを展開します。
2. Sitecore のコントロールパネルを開きます
3. グローバリゼーション - 言語ファイルをインポート　を選択します
4. temp の下にあるリソースファイルを以下の順でインポートしていきます
    * SXAtranslations/ja-JP.xml
    * SXAStorefront.translations/translations/ja-JP.xml
    * CommerceConnect.translations/translations/ja-JP.xml
    * BusinessTools.translations/translations/ja-JP.xml
5. GitHub にある [PowerShell レポートのリソース](https://github.com/SitecoreJapan/InstallScript/blob/master/101/powershell-report-ja-jp.xml)をダウンロードする
6. 上記の言語インポートの手順と同様に、ダウンロードしたリソースをインポートする

![commerce](/static/images/2021/06/commerce10.png)

7. SXA のアップデートリソース **SXA-ja-JP-update.xml** を以下からダウンロードしてインポートします
    * https://github.com/SitecoreJapan/InstallScript/tree/master/101

8. Commerce のアップデートリソース、**BusinessTools-ja-JP-update.xml** と **Storefront-ja-JP-update.xml** をダウンロード、インポートします。
    * https://github.com/SitecoreJapan/InstallScript/tree/master/XC101

上記のリソースが全てインストールが終わると、日本語の画面になりました。

![commerce](/static/images/2021/06/commerce11.png)

## まとめ

今回は Sitecor Experience Platform 10.1 の環境に対して Sitecore Experience Commerce 10.1 をインストールする手順に関して紹介をしました。これで仮想マシン上で Sitecore Experience Commerce を動かすことができるようになりました。

次回はインストールした環境を少し確認していきます。

