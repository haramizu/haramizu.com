---
title: Sitecore JSS - React SDK を利用してサンプルサイトを構築 - Part.1
date: '2021-04-21'
tags: ['JSS', 'React']
draft: false
summary: これまで何回かに分けて Next.js のアプリに関して紹介をしていました。Next.js は React を利用して構築されたフレームワークで、React に関しても理解しておくほうが良いです。ということで、このブログでは基本に立ち戻って、しばらく React に関しての紹介をしていきます。今回は、React のアプリを起動するところまで進めます。
images: ['/static/images/2021/04/create02.png ']
---

これまで何回かに分けて Next.js のアプリに関して紹介をしていました。Next.js は React を利用して構築されたフレームワークで、React に関しても理解しておくほうが良いです。ということで、このブログでは基本に立ち戻って、しばらく React に関しての紹介をしていきます。今回は、React のアプリを起動するところまで進めます。

## はじめに

今回紹介をする流れは、Sitecore JavaScript Services のドキュメントをベースに紹介をしていきます。英語が苦にならない方は、ぜひ以下のサイトをご覧ください。

* [Sitecore JSS Documentation](https://jss.sitecore.com)

最初は、サンプルのアプリを動かすところが定番です。これで進めていきましょう。

## サンプルアプリの起動

サンプルアプリを起動するために、以下の手順を実行します。

* [Quick Start](https://jss.sitecore.com/docs/client-frameworks/getting-started/quick-start)

すでに私の環境では jss のコマンドをインストール済みとなりますので、サンプルアプリをまずは作成します。

```
jss create react-app react
```

![create](/static/images/2021/04/create01.png "create")

![create](/static/images/2021/04/create02.png "create")

実際に作成されたアプリを起動するために、ディレクトリを移動して実行します。

```
cd react-app
jss start
```

しばらくすると、ブラウザが立ち上がりサンプルのアプリが起動します。

![create](/static/images/2021/04/create03.png "create")

これでサンプルのアプリのダウンロード、実行できることを確認することができました。

## JSS サイトの作成

Sitecore のモジュール集と同じ様に JSS のアプリを管理することができる機能を提供しています。

* [SXA による JSS アプリの管理](https://doc.sitecore.com/ja/developers/sxa/101/sitecore-experience-accelerator/managing-jss-apps-with-sxa.html)

今回はこの手順で、作成をしたアプリを Sitecore に展開します。

### 環境について

手順で紹介をする環境は、Microsoft Azure の上に仮想マシンを立ち上げ、手元の react-app を展開します。仮想マシンだけで作業をすると楽なのですが、設定ファイルの場所を理解しやすいため、リモートのサーバーとの連携となります。

### JSS テナントの作成

コンテンツエディターを立ち上げて、Sitecore - Content のアイテムを右クリックしてください。JSS テナントの項目が表示されます。

![jss tenant](/static/images/2021/04/jsstenant01.png "jss tenant")

JSS テナントを選択すると、ダイアログが表示されます。今回はデモ用ということで、demo と入力してテナントを完成させます。

![jss tenant](/static/images/2021/04/jsstenant02.png "jss tenant")

しばらくすると、テナントのアイテムが作成されます。

![jss tenant](/static/images/2021/04/jsstenant03.png "jss tenant")

### JSS サイトの作成

続いてサイトを作成します。上記のテナントを右クリックすると、JSS サイトが候補として表示されます。

![jss tenant](/static/images/2021/04/jsstenant04.png "jss tenant")

作成のためのダイアログが表示されます。サイト名にはアプリ名を今回入力しました。また言語に関しては今回は英語のまま進めます。

![jss tenant](/static/images/2021/04/jsstenant05.png "jss tenant")

Site Settings のタブを開くと以下の様になっています。

![jss tenant](/static/images/2021/04/jsstenant06.png "jss tenant")

配置シークレット（Deployment Secret）に関しては後で入力できるため、デフォルトの設定のままサイトの作成を実行します。しばらくすると、サイトのテンプレートが作成されます。

![jss tenant](/static/images/2021/04/jsstenant07.png "jss tenant")

## API キーの作成

Sitecore と接続するための API キーを作成します。手順に関しては以前のブログ記事 [API Key の準備](/blog/2021/04/16/nextjs-sdk-part-2#api-key-の準備) に記載していますので、そちらを参考にしてください。

## 権限の変更

JSS のインポートに関しては、sitecore¥jssImport というユーザーの権限を利用してインポートを実行します。このユーザーは、sitecore¥JSS Import Service Users に所属していますが、今回作成したテナントに対してデフォルトではアクセス権限を持っていません。ロールマネージャーから対象ロールを選択し、アクセスビューアーを開くと以下の様になっています。

![jss tenant](/static/images/2021/04/jsstenant08.png "jss tenant")

セキュリティエディターを立ち上げて、書き込み、作成などの権限を付与してください。

![jss tenant](/static/images/2021/04/jsstenant09.png "jss tenant")

今回は全部の権限を付与しました。

![jss tenant](/static/images/2021/04/jsstenant10.png "jss tenant")

## react-app の準備

テンプレートから生成した react-app を作成した JSS のサイトに接続するための手続きを進めていきます。まず、該当ディレクトリに戻って、以下のコマンドを実行します。

```
jss setup
```

実行すると、以下の質問が表示されます。

* Sitecore のインスタンスにネットワーク共有でアクセスできるか？ 今回は n を選択
* サーバー名を入力します
* サーバー名 + Import の URL が表示されます。デフォルトではこのまま Enter を押してデフォルトのままで
* API キーを聞かれます、上記で作成済みの GUID をキーとして設定してください
* 最後に配置シークレットを聞かれますが、何も入力しなければランダムな文字列が自動生成されます

![jss tenant](/static/images/2021/04/jsstenant11.png "jss tenant")

入力したパラメーターは、scjssconfig.json のファイルに保存されていますので、いつでも参照できます。

## Sitecore に設定を反映させる

### 配置シークレットを設定する

続いて、**jss setup** で作成した配置シークレットのキーを事前に作成している JSS サイトに設定をします。コンテンツエディターを開いて、/sitecore/content/demo/react-app/Settings の設定アイテムを選択します。このアイテムのコンテンツエリアを下にスクロールすると、配置シークレットの項目があります。

![jss tenant](/static/images/2021/04/jsstenant12.png "jss tenant")

ここに、作成したキーを設定して、アイテムの保存をします。

### config ファイルの作成

配置シークレットのキーを JSS のサイトに適用しただけでは GraphQL が有効にならないため、config ファイルを作成する必要があります。
サンプルのコードは以下のサイトで提供されています。

* [JSS アプリを JSS サイトにインポートする](https://doc.sitecore.com/ja/developers/sxa/101/sitecore-experience-accelerator/import-a-jss-app-into-your-jss-site.html)

Sitecore のインスタンスのディレクトリで、 App_Config\Include に zzz というフォルダを作成して、react-app.config を作成してください。このファイルのコードとしては、上記のページ 5 の項目にあるコードをコピーします。

このコードはあくまでサンプルとなるため、実際に作成をした GraphQL の Endpoint およびテンプレートのパスを変更する必要があります。設定に関しては、JSS サイトの settings のアイテムに記載されている項目を参考にしてください。

今回は以下の２つの変更をしました。

```
<carsGraphQLEndpoint url="/api/cars" type="Sitecore.Services.GraphQL.Hosting.DatabaseAwareGraphQLEndpoint, Sitecore.Services.GraphQL.NetFxHost" resolve="true">

...

</carsGraphQLEndpoint>
```

GraphQL のエンドポイントは以下のように設定されています。

![jss tenant](/static/images/2021/04/jsstenant13.png "jss tenant")

サンプルでは cars と設定されているので、cars を react-app に変更します（３箇所変更）。

```
<react-appGraphQLEndpoint url="/api/react-app" type="Sitecore.Services.GraphQL.Hosting.DatabaseAwareGraphQLEndpoint, Sitecore.Services.GraphQL.NetFxHost" resolve="true">

...

</react-appGraphQLEndpoint>
```

またテンプレートに関しての記述はサイトでは以下のようになっています。

![jss tenant](/static/images/2021/04/jsstenant14.png "jss tenant")

このため、項目を以下の様に変更します。

```
<paths hint="list:AddIncludedPath">
    <templates>/sitecore/templates/Project/demo/JSS Site</templates>
</paths>
```

これで設定ファイルは完了となります。

## JSS アプリを展開する

ここから先は、普通に検証をしたい方のみがご利用ください。サンプルのアプリのデータを極力削減した形の手順は、[Sitecore JSS - React SDK を利用してサンプルサイトを構築 - Part.2](/blog/2021/04/22/react-sdk-part-2) で紹介しています。

今回はリモートの環境に展開するため、以下の手順で進めていきます。

### アイテムを同期させる

まず、アイテムを同期します。コマンドとしては以下のコマンドを実行します。

```
jss deploy items -c -d
```

![jss tenant](/static/images/2021/04/jsstenant15.png "jss tenant")

インポートが完了すると、警告が表示されますが今回は警告ですので特に気にせず進めていきます。
インポート完了後、Sitecore に作成していた JSS のテナントにアイテムが作成されます。

![jss tenant](/static/images/2021/04/jsstenant16.png "jss tenant")

### ファイルを展開する

続いて JSS で利用するレイアウト情報を Sitecore のインスタンスにコピーをする必要があります。まず、コマンドで、ファイルを作成します。

```
jss build
```

このコマンドを実行したあとでは、build フォルダが作成されて、ファイルが生成されています。

![jss tenant](/static/images/2021/04/jsstenant17.png "jss tenant")

続いて、JSS サイトで設定されているファイルシステムパスを確認します。

![jss tenant](/static/images/2021/04/jsstenant18.png "jss tenant")

上記で指定されているパスに、build の中にあるファイルをすべてコピーしてください。

![jss tenant](/static/images/2021/04/jsstenant19.png "jss tenant")

## Sitecore での動作確認

インポートをした Home アイテムを選択、パブリッシュタブからエクスペリエンスエディターを開いてください。

![jss tenant](/static/images/2021/04/jsstenant20.png "jss tenant")

エクスペリエンスエディターで編集をすると、アイテムの情報も変わっていることがわかります。これで JSS アプリを Sitecore に展開することができました。合わせて、JSS サイトにインポートをする手順を紹介しました。

次回は、サンプルアプリから不要なデータを削除して、日本語リソースの追加に関して紹介をします。

* [Sitecore JSS - React SDK を利用してサンプルサイトを構築 - Part.2](/blog/2021/04/22/react-sdk-part-2)