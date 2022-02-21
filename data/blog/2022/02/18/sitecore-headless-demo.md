---
title: Sitecore Headless - Next.js 評価環境の構築
date: '2022-02-18'
tags: ['Sitecore','Headless','Next.js']
draft: false
summary: ブログでこれまでヘッドレスに関しての情報を提供していました。手順に関してはリンクを貼りながら紹介していきつつ、テスト環境を素早く立ち上げる手順について今回は紹介をします。
images: ['/static/images/2022/02/nextjs12.png']
---

ブログでこれまでヘッドレスに関しての情報を提供していましたが、手順は以前の記事を参考にしつつ（少し補足を入れることもあります）、Next.js でのデモサイト構築の手順を今回紹介していきます。

## 前提条件

今回は前提条件として以下のように設定をしておきます。

* [GitHub](https://github.com) のアカウントを持っていること
* [Vercel](https://vercel.com) のアカウントを持っていること、GitHub のアカウントで作成をしておくと便利です
* XM のサーバーをインターネット上に立ち上げることが可能なこと

手順に関して途中で詳細はリンクを、と記載していますがそれを[省略して進めるための手順](#環境を最短で準備する)も掲載しています。

## Sitecore XM の準備

今回の環境としては Sitecore XM を準備してサーバーとして立ち上げます。手元で動かすだけであれば仮想マシン上に展開するだけで問題ありませんが、今回はインターネット上に公開をして Vercel と接続するため、AWS や Azure などでマシンの準備をしてください。作業をするときのみ、立ち上げていれば良いです。

* [Sitecore XM セットアップ](/blog/2021/09/22/xm-setup-part-1)
* [Sitecore Headless Rendering インストール](/blog/2021/09/29/xm-setup-part-4)

## Next.js SDK を利用してサンプルサイトを構築

この手順は長いのでショートカットをする手順を紹介しますが、どういうことをやっているのか？を明確にするために紹介をしておきます。

まず、Next.js の空っぽのサイトを作成してください。Part 1 の日本語コンテンツのところは省略しても大丈夫です。

* [Next.js SDK を利用してサンプルサイトを構築 - Part.1](/blog/2021/04/13/nextjs-sdk-part-1)

次のステップでは、すでに XM を準備している形（今回の記事の最初のステップ）のため、前半は不要で後半の手順だけ進める形です。

* [Next.js SDK を利用してサンプルサイトを構築 - Part.2](/blog/2021/04/16/nextjs-sdk-part-2)

次のステップでは Sitecore とデモ環境をつなげます。

* [Next.js SDK を利用してサンプルサイトを構築 - Part.3](/blog/2021/04/19/nextjs-sdk-part-3)

最後にローカルで Sitecore につなげている環境を整備します。

* [Next.js SDK を利用してサンプルサイトを構築 - Part.4](/blog/2021/04/20/nextjs-sdk-part-4)

上記の手順を進めていくことで、デモを手元で動かすことができるようになりました。最後に Vercel と接続をします。

* [Sitecore ヘッドレス と Next.js でサイト構築 - 環境の構築](/blog/2021/09/09/nextjs-vercel-part-1)

上記の手順を丁寧にしていくことで Sitecore XM と Vercel の環境がつながり、編集環境としても Experience Editor を利用することができます。

この手順は正直長いので、もう少し短い手順を紹介していきます。

## 環境を最短で準備する

### 前提条件

すでに Sitecore XM の環境の準備ができており、API Key を準備できている状況を前提とします。
またインターネットを通じて管理サーバーにアクセスできるようになっているとします。

### リポジトリの準備

GitHub の以下のリポジトリからコードをダウンロードして、自分のリポジトリを作成してください。Step 1 として用意しています。

* https://github.com/SitecoreJapan/sitecoredemo-jp/tree/step-1 

リポジトリが Step 1 になっているのを確認してください。

![nextjs demo](/static/images/2022/02/nextjs01.png)

ダウンロードしたファイルを利用して自分の GitHub にリポジトリを作成してください。

### ローカルでの実行

ローカルの環境に展開されている状況で実行をしてみます。まずは以下のコマンドを実行します。

```
npm install
```

これで準備ができたので、実行します。

```
jss start
```

この状態で http://localhost:3000 にアクセスして画面が表示されればローカルでの実行は完了となります。

![nextjs demo](/static/images/2022/02/nextjs02.png)

### Sitecore XM の API キーでのアクセス確認

Sitecore XM の環境にアクセスをして、キーが正しく動作しているかを確認していきます。`/sitecore/system/Settings/Services/API Keys` の下に新しいキーの作成する形になります。それぞれの値は以下の通りです。

| 項目 | 値 |
|---|---|
| COROS Origins | * |
| 認められたコントローラー | * |
| 偽装ユーザー | extranet\Anonymous |

ハマりどころとしては、`extranet¥Anonymous` としてしまうところですが、ここはバックスラッシュで区切っているので気をつけてください。ちなみに偽装ユーザーは空欄でも問題ありません。

作成された API キーのアイテム ID を利用して、以下の URL　にアクセスをして JSON のデータが返ってくるか確認をしてください。

```
https://yourhostname/sitecore/api/layout/render/jss?item=/&sc_apikey={YOUR_API_KEY_ID} 
```

![nextjs demo](/static/images/2022/02/nextjs03.png)

結果が表示されれば、次のステップに進めていきます。表示されない場合は、キーをパブリッシュしているかどうか確認をしてください。

### Sitecore XM と連携する

続いて Sitecore XM につなげるための手順として、セットアップファイルを作成します。

```
jss setup
```

今回はサンプルとして、以下のような形で進めました。まず最初の回答としては、サーバーはインターネット上で用意をしているので **n** を選びます。

```
Is your Sitecore instance on this machine or accessible via network share? [y/n]: n
```

続いてサーバーの名前を指定します。

```
Sitecore hostname (e.g. http://myapp.local.siteco.re; see /sitecore/config; ensure added to hosts): https://test.cmsdemo.jp
```

インポートサービスの URL はサーバーの名前と同じであれば、そのまま Enter を押すだけで進めます。

```
Sitecore import service URL [https://test.cmsdemo.jp/sitecore/api/jss/import]: 
```

すでに起動している XM の環境の API Key を設定します。

```
Sitecore API Key (ID of API key item): {110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}
```

最後に Deployment secret を指定しますが、特に指定のコードがなければ Enter を入力することで自動的に生成します。

```
Please enter your deployment secret (32+ random chars; or press enter to generate one): 
```

実行結果の画面は参考までに以下の通りです。

![nextjs demo](/static/images/2022/02/nextjs04.png)

上記の手順を実施することで２つのファイルが生成されています。

* scjssconfig.json
* sitecore/config/sitecoredemo-jp.deploysecret.config

このうち、sitecore/config/ にある２つの config ファイルを XM のインストールされているディレクトリの `App_Config\Include\zzz` にコピーしてください。

### XM の権限を編集する

XM の環境にデータをインポートする前に、インポートのためのユーザーを有効にする必要があります。ユーザーマネージャーにアクセスをして JssImport のアカウントを選択、有効を実行してアカウントを利用できるようにします。

![nextjs demo](/static/images/2022/02/nextjs05.png)

続いてロールマネージャーを開いて、`sitecore\JSS Import Service Users` を選択、セキュリティエディターを開きます。開くとこのロールに関する権限の設定ができるようになりますが、/content の直下にアイテムを展開することになるため、以下の手順を進めます。

1. Sitecore/Content コンテンツアイテムを選択
2. アイテム保護の解除をクリックする
3. 現在選択しているロールでアイテムを追加削除できるように、権限を付与する

![nextjs demo](/static/images/2022/02/nextjs06.png)

これで XM に対してインポートが可能となりました。

### XM にコンテンツを展開する

上記に記載されていますが、あらためて以下の２点を確認してください。

* config ファイルを `App_Config\Include\zzz` に展開しているか
* API キーでアクセスすることができるか

これがクリアになっていれば、まずはコンテンツやテンプレートなどを Sitecore に展開をします。展開をするのは以下のコマンドを実行するだけで、Sitecore 側にアイテムが生成されます。

```
jss deploy items -c -d
```

![nextjs demo](/static/images/2022/02/nextjs07.png)

展開が完了すると、以下のようにコンテンツエディターにてアイテムを確認することができます。

![nextjs demo](/static/images/2022/02/nextjs08.png)

### Config ファイルの調整 その１

次のステップで Vercel と接続するために、config ファイルを利用して以下の項目を変更していきます。対象となるファイルは `App_Config\Include\zzz\sitecoredemo-jp.config` です。

まず最初に `JSS EDITING SECRET` の項目を変更します。この項目は **デフォルトではコメントアウト** されていますので、コメントを修復してキーを設定する必要があります。設定例は以下のようになります（キーはランダムなものを16文字以上で作ってください）。

```xml
<setting name="JavaScriptServices.ViewEngine.Http.JssEditingSecret" value="PEygKc5QcGWbTYPsta2A692w7" />
```

続いてサイトの情報を掲載します。hostName には本番環境として公開をするドメイン名を指定してください。CM サーバーの名前ではありません。

```xml
<sites>
    <!--
    JSS Site Registration
    This configures the site with Sitecore - i.e. host headers, item paths.
    If your JSS app lives within an existing Sitecore site, this may not be necessary.

    IMPORTANT: JSS sites ship in 'live mode', which makes development and testing easy,
    but disables workflow and publishing. Before going to production, change the `database`
    below to `web` instead of `master`.
    -->
    <site patch:before="site[@name='website']"
        inherits="website"
        name="sitecoredemo-jp"
        hostName="cmsdemo.jp"
        rootPath="/sitecore/content/sitecoredemo-jp"
        startItem="/home"
        database="master" />
</sites>
```

この段階でまずは Vercel に展開するための手順が終わりました。

### Vercel への展開

すでにサンプルのリポジトリができていて、Vercel のアカウントと GitHub のアカウントが連携できている形とします。それでは実際に、展開の手続きを進めていきます。

1. Vercel の管理画面から New Project で新しいプロジェクトを作成する
2. 対象となるリポジトリを選択して Import のボタンをクリックします

![nextjs demo](/static/images/2022/02/nextjs09.png)

3. Environment Valiable の項目を追加していきます。以下の表のうち、２〜４番目の値を今回は設定します。

| 項目 | 値 |
|---|---|
| PUBLIC_URL | 公開用 URL （今回は省略） |
| SITECORE_API_KEY | API キーを設定します |
| SITECORE_API_HOST | Sitecore のホスト名を指定します（ https://test.cmsdemo.jp ) |
| JSS_EDITING_SECRET | JSS EDITING SECRET で設定をした 16文字以上の文字数字の組み合わせ |
| GRAPH_QL_ENDPOINT | Experience Edge を利用する際には設定は必須です。今回は XM のデフォルトで動作するため省略。 |

![nextjs demo](/static/images/2022/02/nextjs10.png)

4. Deploy ボタンを押すと展開が始まります

![nextjs demo](/static/images/2022/02/nextjs11.png)

5. しばらくすると展開が完了します

![nextjs demo](/static/images/2022/02/nextjs12.png)

## 展開後の動作確認

まず最初に Vercel で展開されたサイトにアクセスをします。以下のように、ローカルで実施したコンテンツが展開されていることがわかります。

![nextjs demo](/static/images/2022/02/nextjs13.png)

今回展開したインスタンスの名前を Sitecore XM 側に設定をします。対象となるファイルは `App_Config\Include\zzz\sitecoredemo-jp.config` です。

app の値を変更します。`serverSideRenderingEngineEndpointUrl` および `serverSideRenderingEngineApplicationUrl` には、Vercel で展開したホスト名を設定してください。以下はサンプルのため、みなさんの手元で展開しているホスト名を設定する必要があります。

```xml
<app name="sitecoredemo-jp"
    layoutServiceConfiguration="default"
    sitecorePath="/sitecore/content/sitecoredemo-jp"
    useLanguageSpecificLayout="true"
    graphQLEndpoint="/sitecore/api/graph/edge"
    inherits="defaults"
    serverSideRenderingEngine="http"
    serverSideRenderingEngineEndpointUrl="https://sitecoredemo-jp.vercel.app/api/editing/render"
    serverSideRenderingEngineApplicationUrl="https://sitecoredemo-jp.vercel.app"
/>
```

これで XM サーバーの設定が完了しました。

動作確認としてコンテンツエディターで `/sitecore/content/sitecoredemo-jp/home` のアイテムを選択、エクスペリエンスエディターを開いてください。

![nextjs demo](/static/images/2022/02/nextjs14.png)

ページの編集をすることができるのがわかります。続いて Sitecore 管理画面で文字を変更して保存をしてください。Vercel でホスティングしているページにアクセス、リロードをすると（１回目はキャッシュが出るかもしれません、必要に応じて数回りロードしてください）ページが更新されていることがわかります。

![nextjs demo](/static/images/2022/02/nextjs15.png)

## まとめ

今回は XM + Vercel + Sitecore XM の環境を用意しました。次回はもう少し、検証をするために構成を少し変更してテスト中、公開中という形の環境を用意したいと思います。