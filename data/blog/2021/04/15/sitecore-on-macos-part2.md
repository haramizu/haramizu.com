---
title: macOS + VMWare Fusion を組み合わせて Sitecore の環境を整える - その２
date: '2021-04-15'
tags: ['Sitecore', 'VMWare Fusion']
draft: false
summary: 前回は Sitecore をインストールするための環境として、 VMware Fusion で仮想マシンを構築しました。今回は、Sitecore Experience Platform 10.1 をインストール、最終的に macOS からアクセスできるようにします。
---

[前回](/blog/2021/04/14/sitecore-on-macos-part1) は Sitecore をインストールするための環境として、 VMware Fusion で仮想マシンを構築しました。今回は、Sitecore Experience Platform 10.1 をインストール、最終的に macOS からアクセスできるようにします。

## Sitecore Experience Platform 10.1 インストール

今回、インストールを実施するにあたって以下のファイルを準備しています。

* Sitecore 10.1.0 rev. 005207 (Setup XP0 Developer Workstation rev. 1.2.2-r1).zip
* Sitecore.PowerShell.Extensions-6.2.zip
* Sitecore Experience Accelerator 10.1.0.3751.zip
* Sitecore Headless Services Server for Sitecore 10.1.0 XP 16.0.0 rev. 210223.zip
* Sitecore 10.1.0 rev. 005207 (ja-JP).zip
* ライセンスファイル

### ファイルの展開

まず最初に、**Sitecore 10.1.0 rev. 005207 (Setup XP0 Developer Workstation rev. 1.2.2-r1).zip** のファイルを c:¥project¥sif のフォルダに展開をします。

![Sitecore](/static/images/2021/04/sia01.png "Sitecore")

展開したフォルダに license.xml をコピーしてください（最後のインストールの前でも良いですが、忘れないうちに）。

### インストールアシスタントを実行する

フォルダの中に入っている setup.exe を実行してください。Sitecore Install Assistant のウィンドウが開きます。

![Sitecore](/static/images/2021/04/sia02.png "Sitecore")

**Start** のボタンをクリックすると、画面が切り替わって Install Prerequisites が表示されます。この画面では、 Sitecore Install Framework および Windows Server で必要となる項目をインストールすることが可能です。**Install** のボタンをクリックしてください。

![Sitecore](/static/images/2021/04/sia03.png "Sitecore")

しばらくの間、Sitecore が必要とする Windows のコンポーネント、機能のインストールが進みます。

![Sitecore](/static/images/2021/04/sia04.png "Sitecore")

インストールが完了したところで、一度再起動する必要が出ますので、再起動してください。

![Sitecore](/static/images/2021/04/sia05.png "Sitecore")

### Solr のインストール

Sitecore のインストールの前に、検索エンジンの Solr のインストールをする必要があります。Solr のインストールに関してはインストールアシスタントを使う方法もありますが、Sitecore Install Framework のコマンドを利用してスクリプトでインストールすることも可能ですので、今回はこれを利用してインストールを進めます。

インストールをする際には、PowerShell を管理者の権限で開き、 c:¥projects¥sif に移動します。続いて、以下のコマンドで Solr のインストールを実行してください。

```
Install-SitecoreConfiguration Solr-SingleDeveloper.json
```

![Solr](/static/images/2021/04/solr01.png "Solr")

![Solr](/static/images/2021/04/solr02.png "Solr")

上記のコマンドは Solr のモジュールのダウンロード、インストール、サービス化まで実行するものとなっており、今回の様に仮想マシンを利用した開発環境を準備する際には非常に便利です。

### Sitecore のインストール

コンポーネントのインストール、SQL Server のインストールおよび Solr のインストールが完了していれば、あとは Sitecore のインストールとなります。インストールのスクリプトは c:¥projects¥sif のフォルダに入っている *XP0-SingleDeveloper.ps1* の中に記載されているパラメータを変更して、実行するだけとなります。以下のパラメーターに関して変更をしてください。

| 項目名 | 役割 | 補足 |
|-|-|-|
| $SitecoreAdminPassword | 管理者パスワード | 空欄の場合はランダムに作成、ログに記載されます |
| $SCInstallRoot | インストールパス | 例： c:¥projects¥sif |
| $XConnectSiteName | xConnect のサイト名 | 例： xconnect.dev.local |
| $SitecoreSiteName | サイト名 | 例： sample.dev.local |
| $IdentityServerSiteName | Identityサーバー名 | 例： login.dev.local |
| $SolrUrl | Solr の URL | スクリプトを実行していれば変更不要 |
| $SolrRoot | Solr のパス | スクリプトを実行していれば変更不要 |
| $SolrService | Solr サービス名 | スクリプトを実行していれば変更不要 |
| $SqlAdminPassword | SQL Server パスアワード | sa のパスワードを設定 |

パラメータを設定したあと、スクリプトを実行します。

```
XP0-SingleDeveloper.ps1
```

![Sitecore](/static/images/2021/04/sia06.png "Sitecore")

エラーなくインストールが完了していれば、Sitecore Experience Platform にアクセスできます。設定をしたサイト名に /sitecore の URL を追加して、admin のパスワードでログインできることを確認してください。

![Sitecore](/static/images/2021/04/sia07.png "Sitecore")

![Sitecore](/static/images/2021/04/sia08.png "Sitecore")

## macOS から仮想マシンの Sitecore にアクセスできるようにする

仮想マシンに割り当てられている IP アドレスを調べます。手元の環境はこういう形です。

```
PS C:\projects\sif> ipconfig

Windows IP Configuration


Ethernet adapter Ethernet0:

   Connection-specific DNS Suffix  . :
   IPv6 Address. . . . . . . . . . . : 240d:1a:82b:3800:55e3:2646:20f9:3bde
   Link-local IPv6 Address . . . . . : fe80::55e3:2646:20f9:3bde%4
   IPv4 Address. . . . . . . . . . . : 192.168.0.129
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : fe80::e67e:66ff:fe35:74db%4
                                       192.168.0.1
PS C:\projects\sif>
```

ブラウザで IP アドレスに対してアクセスすると、以下の様な画面が表示されます。

![network](/static/images/2021/04/network01.png "network")

仮想マシンの IIS にアクセスできることを確認しました。仮想マシンの中では複数のインスタンスが起動しており、それぞれを認識させるために、**$SitecoreSiteName** と **$IdentityServerSiteName** を名前で参照できるように、hosts ファイルを書き換えます。hosts ファイルは **/private/etc/hosts** に配置されており、管理者のみが編集可能です。

少し遠回りですが、VS Code で host ファイルの編集をできるようにします。

### Visual Studio Code のコマンドパスを追加する

host ファイルの編集ツールとして、Visual Studio Code を利用できるようにします。コマンドラインから code と入力すると起動する形は、この手順はスキップして次のステップに移動してください。

まず、Visual Studio Code を立ち上げて、Command + Shift + P でコマンドパレットを開きます。

![network](/static/images/2021/04/network02.png "network")

**Install Command** と入力すると、コマンドラインのパスを追加する項目が表示されます。

![network](/static/images/2021/04/network03.png "network")

選択すると、パスが追加されます。

![network](/static/images/2021/04/network04.png "network")

コマンドとして、code と入力すると Visual Studio Code が起動すれば、設定は完了です。

### hosts ファイルを書き換える

hosts ファイルを書き換えるために、ターミナルを起動して以下のコマンドを実行してください。

```
code /private/etc/hosts
```

管理者権限のパスワードを要求されるので、入力をすると host ファイルを Visual Studio Code で参照できるようになります。

![network](/static/images/2021/04/network05.png "network")

編集したファイルを保存する時に、権限が不足しているため右下に以下のダイアログが表示されます。

![network](/static/images/2021/04/network06.png "network")

**sudo 権限で再施行** をクリックするとパスワードを入力するダイアログが表示されます。ここでマシンの管理者権限のあるパスワードを入力してください。

![network](/static/images/2021/04/network07.png "network")

保存が完了すれば、設定は完了です。設定をしたホスト名でアクセスをしてください。Sitecore のインストール後の画面を参照することができます。

![network](/static/images/2021/04/network08.png "network")

## モジュールのインストール

各種モジュールをインストールしていきます。今回は、Sitecore Experience Accelerator および Sitecore Headless Services のインストールを進めていきますが、この際に必要なモジュールは以下の３つとなります。

* Sitecore.PowerShell.Extensions-6.2.zip
* Sitecore Experience Accelerator 10.1.0.3751.zip
* Sitecore Headless Services Server for Sitecore 10.1.0 XP 16.0.0 rev. 210223.zip

今回は仮想マシン上に直接アクセスできるため、c:¥inetpub¥wwwroot¥yourhostname¥App_Data¥packages のフォルダにファイルをコピーします（ yourhostname は設定をした Sitecore のインスタンスになります）。

![module](/static/images/2021/04/module01.png "module")

続いて Sitecore にログインをして、Control Panel - Install a package を選択します。ダイアログで Choose Package を選択すると、以下の画面に切り替わります。

![module](/static/images/2021/04/module02.png "module")

ここから最初は Sitecore PowerShell Extension を選択してパッケージをインストールします。パッケージをインストールする手順は以下の順番で進めてください。

* Sitecore.PowerShell.Extensions-6.2.zip
* Sitecore Experience Accelerator 10.1.0.3751.zip
* Sitecore Headless Services Server for Sitecore 10.1.0 XP 16.0.0 rev. 210223.zip

なお、Sitecore Headless Services に関しては Sitecore Experience Accelerator と共通モジュールが多いため、重複しているファイルなどは上書きでインストールを進める形で問題ありません。 

## 日本語環境の整備

モジュールのインストールが完了したあとは、日本語のリソースを適用します。

### 管理画面の日本語リソースの追加

まず最初に、管理画面から Desktop を選択します。Desktop の右下にデータベースを切り替える項目がありますので、Master をクリックして Core に変更してください。

![lang](/static/images/2021/04/lang01.png "lang")

続いて左下にあるサイトコアのロゴをクリックして、Control Panel を開いてください。

![lang](/static/images/2021/04/lang02.png "lang")

Localization の項目に **Add a new Language** がありますので、これをクリックして言語の追加を実行します。言語としては、Japanese Japan を選択したあと、各項目はデフォルトのまま進めて言語の追加を完了させます。

![lang](/static/images/2021/04/lang03.png "lang")

Sitecore 10.1 からは日本語のリソース適用方法が変わりました。日本語リソースファイル　**Sitecore 10.1.0 rev. 005207 (ja-JP).zip** を解凍すると、items および localization のフォルダが表示されます。この２つのフォルダを、Sitecore をインストールしているディレクトリの App_Data にそのままコピーしてください。

![lang](/static/images/2021/04/lang04.png "lang")

コピーが完了したあと、インスタンスを再起動すると日本語のリソースが適用されます。

![lang](/static/images/2021/04/lang05.png "lang")

### 日本語コンテンツの追加

続いて日本語のコンテンツを管理できる様に、日本語のリソースを追加します。改めて Admin でログインをして、Control Panel を開きます。

１つ前の管理画面と同様に、Localization の項目に **Add a new Language** をクリックして、Japanese - Japan を追加してください。

![lang](/static/images/2021/04/lang03.png "lang")

これで管理画面、コンテンツの管理対象として日本語を追加することができました。

### ユーザーの言語設定を変更する

今回は開発環境のみのため、管理者のユーザープロファイルを変更して管理画面、コンテンツの日本語を標準に切り替えます。

管理画面トップの **Access Management** にある **User Manager** を開きます。

![lang](/static/images/2021/04/lang06.png "lang")

一覧に表示されている Admin をダブルクリックすると、ダイアログが表示されます。表示されたダイアログの Language Settings を開くと以下の様になります。

![lang](/static/images/2021/04/lang07.png "lang")

Sitecore Client - Client Language の項目は、管理画面の言語設定、Content - Default Content Language は標準で利用するコンテンツの言語を選択する形となります。この両方の項目の設定を Japanese(Japan) に変更します。

![lang](/static/images/2021/04/lang08.png "lang")

一度ログアウトして、ログインをすると以下の様に管理画面が日本語になりました。

![lang](/static/images/2021/04/lang09.png "lang")

### Sitecore Experience Accelerator のリソースインポート

最後に、すでにインストールしているモジュールの Sitecore Experience Accelerator の日本語リソースをインポートします。

インポートの手順は以下の通りです。

1. **コントロールパネル**を開く
2. **グローバリゼーション - 言語ファイルをインポートする** を開く
3. 対象のリソースとして /temp/SXAtranslations/ja-JP.xml を選択します

![lang](/static/images/2021/04/lang10.png "lang")

4. ダイアログをそのまま進めて、インポートを実行します

インポートが完了すると今回の環境整備は完了となります。

## まとめ

今回の手順で、Sitecore Headless Services を利用することができる環境を仮想マシンに準備をしました。次回はもう一度、Next.js で作成しているアプリの環境に戻して、Sitecore と連携させるところを紹介します。