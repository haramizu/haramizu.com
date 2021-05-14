---
title: Drupal と Sitecore Content Hub - DAM の連携
date: '2020-12-16'
tags: ['Content Hub', 'drupal']
draft: false
summary: Sitecore Content Hub と Drupal の連携に関して、サンプルが提供されており動作確認をすることができる様になっています。今回はどういう形の連携になるのかについて、紹介をします。
---

Sitecore Content Hub と Drupal の連携に関して、サンプルが提供されており動作確認をすることができる様になっています。今回はどういう形の連携になるのかについて、紹介をします。

## Sitecore Content Hub 連携のおさらい

Sitecore Content Hub の DAM に関して、Sitecore Experience Platform （CMS）との連携はコネクタで提供をしています。このコネクタを利用することで、Sitecore CMS の管理画面から画像を利用する際に、ツールを切り替えることなく画像を指定することができます。

[![](https://img.youtube.com/vi/TcSlYh2Y918/0.jpg)](https://www.youtube.com/watch?v=TcSlYh2Y918)

この仕組みは Sitecore が提供しているコネクタを利用した形となりますが、他の CMS での連携も同様の連携ができる様になっています。

## Drupal との連携サンプル

Drupal と連携するためのコネクタを Sitecore Content Hub 3.2.1 向けに提供しています。

* [Drupal Connector (3.2.1)](https://docs.stylelabs.com/content/3.2.x/integrations/drupal-connector/drupal_connector.html)

これを利用するための前提条件としては、Drupal 8.x が対象となっています（ Drupal 9.x に関しては別のコネクタが必要となります）。今回は、新規に Drupal をインストールして動作させ、Sitecore Content Hub と連携するコネクタのインストール、設定まで紹介をしていきます。

## Drupal 8 の準備

### XAMPP のインストール

今回は手っ取り早く Drupal 8 をインストールするために、Chocoletey がインストールされている環境でセットアップを進めていきます。まず最初に、PowerShell の管理者権限を持っている状態で、以下のコマンドを実行します。

```
choco install bitnami-xampp
```

![xamppinstall](/static/images/2020/12/xamppinstall.gif "xamppinstall")

XAMPP というツールは、Drupal に限らず Wordpress などの環境を手軽にセットアップするためのツールです。インストールが完了すると、XAMPP Control Panel というツールがインストールされます。ツールを管理者の権限で起動した画面は以下の通りです。

![xamppapp](/static/images/2020/12/xamppapp.png "xamppapp")

コントロールパネルに表示されているツールのうち、今回利用するのは Apache および MySQL を利用する形となります。どちらも **Start** のボタンをクリックして起動してください。

![xamppapp](/static/images/2020/12/xamppapp2.png "xamppapp")

これで XAMPP の準備は完了しました。試しに http://localhost/ にアクセスすると以下のような画面が表示されます。

![welcome](/static/images/2020/12/welcomexampp.png "welcome")

### Drupal 8.x のファイルコピー

今回は [Drupal 8.9.11](https://www.drupal.org/project/drupal/releases/8.9.11) をインストールするために、zip ファイルをダウンロード、展開したあと c:¥xampp¥htdocs にコピーします。

![ファイルコピー](/static/images/2020/12/copydrupal.png "ファイルコピー")

### MySQL サーバーの設定

続いて Drupal が利用する MySQL の空データベースを準備します。XAMPP のコントロールパネルの MySQL の操作に Admin のボタンが用意されています。これをクリックすると、管理画面に移動します。

![xamppapp](/static/images/2020/12/xamppapp2.png "xamppapp")

開いた管理画面は以下の通りです。

![phpmyadmin](/static/images/2020/12/phpmyadmin.png "phpmyadmin")

メニューに表示されている **データベース** をクリックしてデータベース作成画面に移動します。

![phpmyadmin](/static/images/2020/12/createdatabase.png "phpmyadmin")

今回は drupaldemo という名前のデータベースを作成しました。

![phpmyadmin](/static/images/2020/12/drupaldemo.png "phpmyadmin")

作成すると、左側に drupaldemo のデータベースが表示されていれば、データベースの準備は完了となります。

![phpmyadmin](/static/images/2020/12/drupaldemo2.png "phpmyadmin")

### Drupal のインストール

上記の設定が完了したあと、http://localhost/drupal/ にアクセスすると、設定画面が表示されます。URL は htdoc の下にコピーをした際の Drupal のフォルダ名がそのまま URL になります（今回は Drupal で作成済み）。以下の画面ではまず言語の確認が表示されています。

![drupal](/static/images/2020/12/drupal1.png "drupal")

今回は日本語を選択して、次の画面に移動します。次の画面では、インストールプロフィールの選択となります。**標準**を選択してください。

![drupal](/static/images/2020/12/drupal2.png "drupal")

必要条件の検証が表示されます。以下の画面では PHP OPcode キャッシングを推奨されていますが、今回は検証用の環境なのであまり気にせず進めていきます。ページの下の方に記載されている **とりあえず進む** を選択します。

![drupal](/static/images/2020/12/drupal3.png "drupal")

続いてデータベースの構成に関して表示されます。先ほど作成をしたデータベースを指定（drupaldemo)、ユーザー名（root)を指定します。今回は検証環境のため、データベースのユーザーは root を、パスワードはデフォルトでは設定されていないため空欄で進めていきます。

![drupal](/static/images/2020/12/drupal4.png "drupal")

クリックをした後しばらくするとインストールが開始します。

![drupal](/static/images/2020/12/drupal5.png "drupal")

インストール後の設定として、サイト環境の設定が表示されます。

![drupal](/static/images/2020/12/drupal6.png "drupal")

ユーザー名、パスワードなど必要な項目を入れることで、設定が完了します。インストール後の環境は以下の通りです。

![drupal](/static/images/2020/12/drupal7.png "drupal")

クリーンインストールの Drupal が準備できました。続いて、コネクタをインストールしていきます。

## コネクタのインストール、設定

### インストール

コネクタに関しては、Sitecore Content Hub のサイトからダウンロードすることが可能です。

* [Drupal Connector (3.2.1)](https://docs.stylelabs.com/content/3.2.x/integrations/drupal-connector/drupal_connector.html)

ページで以下の様に Drupal Connector リンクを貼っているところをクリックすると zip ファイルをダウンロードすることができます。

![drupal connector](/static/images/2020/12/drupalconnector1.png "drupal connector")

ファイルを解凍すると、以下の様に 2 つの zip ファイルを見つけることができます。

![drupal connector](/static/images/2020/12/drupalconnector2.png "drupal connector")

例えば、libraries.zip を展開すると以下のように２つのフォルダが含まれていることがわかります。

![drupal connector](/static/images/2020/12/drupalconnector3.png "drupal connector")

このフォルダを、Drupal のインストールされているフォルダにコピーします。

![drupal connector](/static/images/2020/12/drupalconnector4.png "drupal connector")

同様に、modules の中にあるファイルもコピーします。

![drupal connector](/static/images/2020/12/drupalconnector5.png "drupal connector")

モジュールのコピーが終わったあと、Drupal の環境で有効にします。Drupal にログインをして、**機能拡張**を選択、**カスタム** の項目に２つのモジュールが準備されていることを確認します。

![drupal connector](/static/images/2020/12/drupalconnector6.png "drupal connector")

２つの項目をチェックして、ページの下の方にあるインストールをクリックすると、モジュールのインストールが完了します。

![drupal connector](/static/images/2020/12/drupalconnector7.png "drupal connector")

モジュールのインストールが完了すれば、あとは追加の設定となります。

### 設定

Drupal の管理画面で **環境設定** をクリッククリックして、テキストフォーマットとエディターを選択します。

![drupal 設定](/static/images/2020/12/drupalsetting1.png "drupal 設定")

ベーシック HTML およびフル HTML に、追加されている Sitecore のアイコンを追加します。この際、**このサイトにある画像に制限する** の項目のチェックを外してください。Sitecore Content Hub の画像の表示を有効にするためです。

![drupal 設定](/static/images/2020/12/drupalconfig.gif "drupal 設定")

続いて**開発**の設定にある **MConnector Settings** を開きます。

![drupal 設定](/static/images/2020/12/drupalsetting2.png "drupal 設定") 

設定としては、Sitecore Content Hub のインスタンスと URL を設定する画面が出てきます。

![drupal 設定](/static/images/2020/12/drupalsetting3.png "drupal 設定") 

URL は Sitecore のバージョンによって異なりますが、今回テストをした Sitecore Content Hub 3.3.4 では以下のように URL 
を入力します。

```
https://sitecore-content-hub/ja-jp/sitecore-dam-connect/approved-assets
```

これで Drupal の環境設定に関しては完了しました。

## Sitecore Content Hub の設定

今回、準備をしたサーバーが Sitecore Content Hub と連携することができる様に、 CORSConfiguration にホスト名を追加する必要があります。今回は、https://localhost を追加します。

1. 管理画面から設定を選択します
2. PortalConfiguration の詳細設定となる CORSConfiguration を選択します
3. https://localhost を追加します
4. 保存します。

今回はテスト環境となるため localhost で設定をしています。

![drupal 設定](/static/images/2020/12/contenthubcors.gif "drupal 設定") 

## 動作確認

動作確認としては、以下の様に進めていきます。

1. Sitecore Content Hub にログインする（ Drupal にログイン後でも OK です）
2. https://localhost/drupal/ にアクセスする
3. Drupal にログインする
4. **コンテンツ** をクリックする
5. **コンテンツを追加** をクリックする
6. **記事** をクリックする
7. 記事を書いていきます。画像を選択する際に、Sitecore のアイコンをクリックして、Content Hub のアセットを指定することができるのを確認してください
8. 保存 します
9. 記事に Sitecore Content Hub のアセットが設定されているのを確認できます

![drupal デモ](/static/images/2020/12/drupalwithchdam.gif "drupal デモ") 

## まとめ

Sitecore Content Hub - DAM で提供しているアセットに関して、CMS から直接選択して Web サイトの画像として利用できるようになります。これにより、DAM のデータを CMS にコピーする必要なく画像などを Web サイトで利用できるようになります。実はこの仕組みと同じようにして、Salesforce Marketing Cloud との連携を提供しています。

