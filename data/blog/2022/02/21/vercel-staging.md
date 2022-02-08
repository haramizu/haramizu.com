---
title: Sitecore Headless - Next.js ステージングの追加
date: '2022-02-21'
tags: ['Sitecore','Headless','Next.js']
draft: true
summary: 前回の記事で、Next.js のサンプルを Sitecore に展開、また実際のデリバリーとして Vercel と連携する形まで用意をしました。今回は、もう少しテスト、検証をしやすくするためにプロダクションとステージング環境を分けて、ローカルでもテストする手順を紹介をしていきます。
images: ['/static/images/2022/02/release27.png']
---

前回の記事で、Next.js のサンプルを Sitecore に展開、また実際のデリバリーとして Vercel と連携する形まで用意をしました。今回は、もう少しテスト、検証をしやすくするためにプロダクションとステージング環境を分けて、ローカルでもテストする手順を紹介をしていきます。

## ドメインの設定

今回のサンプルとしては、ドメインを以下のように設定したいと思います。

* sitecoredemo.jp 公開用サーバー
* www.sitecoredemo.jp sitecoredemo.jp へのリダイレクト
* staging.sitecoredemo.jp 動作環境の検証として

上記の設定は、Vercel の管理画面で Settings - Domains を追加すると、ドメインを追加することが可能となっています。上記の設定が完了している画面は以下の通りです（なお、DNS の CNAME の作業をする必要があります。これは別途設定方法が画面に出てきますので、それを参考に変更してください）。

![vercel](/static/images/2022/02/vercel01.png)

## コンテンツのパブリッシュ

Sitecore にインポートをしたアイテムはまだ Master データベースに展開されているだけとなっています。このアイテムを、まずは Web データベースで参照できるようにします。

なお参考までに、Web データベースに切り替えた時に以下のようにアイテムがまだないことがわかります（画面の右下が web になっています）。

![vercel](/static/images/2022/02/vercel02.png)

インポートをしたデータに関しては、ワークフロー JSS Deveploment Workflow の中に含まれている形です。ワークボックスを開いて、対象のワークフローを開くと以下のようにアイテムが複数展開されています。

![vercel](/static/images/2022/02/vercel03.png)

対象となるアイテムを **To Content Mode（すべて）** のボタンをクリックして、インポートされたデータからコンテンツに変更をします。すると以下のように、Content Mode のワークフローにアイテムが移動します。

![vercel](/static/images/2022/02/vercel04.png)
　
この画面で **Publish（すべて）** のボタンをクリックすると、ワークフローが完了となります。続いてコンテンツエディターに移動をして、/sitecore/content/sitecoredemo-jp/home のアイテムを選択、パブリッシュメニューからサイトのパブリッシュを選択して公開処理を実行します。

![vercel](/static/images/2022/02/vercel05.png)

上記手順が終わると、以下のように Web データベースに切り替えることでアイテムを見ることが可能となりました。

![vercel](/static/images/2022/02/vercel06.png)

## 公開サーバーへの設定変更

今回は XM1 をサーバーにインストールをしているため、編集サーバーと配信サーバーが分かれている形となります。設定の変更に関しては以下の手順で進めていきます。

1. 編集サーバーの App_Config\Include\zzz にある sitecoredemo-jp.config のファイルを編集サーバーの同じフォルダにコピーをします
2. sites の設定のなかにある database を web に変更する。

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
        hostName="sitecoredemo.jp"
        rootPath="/sitecore/content/sitecoredemo-jp"
        startItem="/home"
        database="web" />
</sites>
```

これで配信サーバーは Web データベースに公開されているコンテンツを参照することができるようになります。

## ローカルでのテスト 

ローカルの環境にて Sitecore に接続をして動作させるように環境を変更します。この変更は .env ファイルに値を入れていくことで対応できます。

```
PUBLIC_URL=http://localhost:3000
JSS_EDITING_SECRET=利用しているJSS EDIT KEY を記載します
SITECORE_API_KEY=API キーを設定します
SITECORE_API_HOST=編集サーバーのホスト名を入れます（最後に / を入れないように気をつけてください）
```

これで、編集サーバーに設定されているコンテンツを取得してページの表示をすることができます。今回はわかりやすくするために、編集サーバーのにてコンテンツを編集しておきます。

![vercel](/static/images/2022/02/vercel07.png)

保存をしている状態で、ローカルで起動をします。

```
jss start
```

この状態で、http://localhost:3000 にアクセスをすると、以下のように CMS からデータを取得してページを表示していることがわかります。

![vercel](/static/images/2022/02/vercel08.png)

念の為、Build を実行しましょう。

```
jss build
```

これで .next/server/pages/en.html に HTML ファイルが生成されていることを確認できます。コードの中で **編集サーバー** を検索すると出てきていれば、build が成功する形を確認できました。

続いて配信サーバーに対してテストをします。その前に、Web データベースのコンテンツも確認をしやすくするために、以下の手順で Web データベースの中身のデータを直接コンテンツエディターで変更しておきます。

1. デスクトップにアクセスする
2. 右下にあるデータベースの表示を Web に切り替える
3. 左下の Sitecore ロゴをクリックしてコンテンツエディターを開く
4. /sitecore/content/sitecoredemo-jp/home/Page Components/home-jss-main-ContentBlock-1 のアイテムを開く
5. タイトルを変更する

![vercel](/static/images/2022/02/vercel09.png)

続いて、**.env** ファイルを開いて、**SITECORE_API_HOST** の値を公開しているサーバーの URL に変更をします。変更が終わったら改めて

```
jss start
```

でローカルで起動します。以下のように先ほどと違うコンテンツが表示されていれば、Web データベースの中を参照している公開サーバーのコンテンツにアクセスできていることを確認することができます。

![vercel](/static/images/2022/02/vercel10.png)

念の為、ビルドを実行してもエラーが出ないことを確認してください。

```
jss build
```

エラーが出ない形になったところで、次のステップに進みます。

## Vercel 環境に反映させる

ここからは Vercel の設定へと進んでいきます。今回のプロジェクトの Settings - Environment Variables に記載されている設定を変更していく形となります。

前回は SITECORE_API_HOST には CM サーバーのホスト名を指定するように記載していました。これを公開用のサーバーに変更をします。すでに登録しているホストメインの項目に関して、Environment としては Preview のチェックのみとして更新をします。

![vercel](/static/images/2022/02/vercel11.png)

続いて、同じ SITECORE_API_HOST のキーを指定しますが、Production のみをチェックして追加します。

![vercel](/static/images/2022/02/vercel12.png)

結果、SITECORE_API_HOST は２つになりますが、Production と Preview で別々のサーバーを参照する設定ができました。

![vercel](/static/images/2022/02/vercel13.png)

プロジェクトの Deployments のメニューにいくと前回の展開の結果が表示されています。設定を変更した状況を反映して動作するかを確認するために、Redepoy を実行します。

![vercel](/static/images/2022/02/vercel14.png)

展開が完了すると、以下のようにサイトが更新されます。Web データベースのデータを利用してサイトがビルドされていることを確認することができました。

![vercel](/static/images/2022/02/vercel15.png)

続いて GitHub に移動をして、development のブランチを作成します。

![vercel](/static/images/2022/02/vercel16.png)

development のブランチを Vercel のドメインに関して反映させていきます。Vercel の Settings - Domains からステージングのドメインに関する設定を開きます。Git Branch に作成をしたブランチを設定します。

![vercel](/static/images/2022/02/vercel17.png)
　
これで設定が完了しました。ここでブランチに対して何かファイルの変更、もしくは追加をして新しく pull リクエストを送って更新をします。development のブランチに変更があると自動的にビルドが実行されます。

![vercel](/static/images/2022/02/vercel18.png)

Build が完了したあと、サイトにアクセスをすると以下のようにページが表示されます。

![vercel](/static/images/2022/02/vercel19.png)

これで環境の整備ができました。

## まとめ

今回は XM のデリバリーサーバーの設定、Vercel と GitHub の連携に関する手順を紹介しました。結果、CMS で公開されたページは本番の環境に展開される形となり（ web データベースを参照している）、手元での開発をする際には Sitecore のコンテンツを参照しつつ、development のブランチに展開をしてテストをする、ということができるようになりました。ここまで整備できれば、あとは手元でコンポーネントの作成を実施、ページの編集は Sitecore CMS　でということができるようになります。