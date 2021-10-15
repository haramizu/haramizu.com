---
title: Global Link モジュールのインストール
date: '2021-10-30'
tags: ['Sitecore','MultiLanguage','GlobalLink']
draft: false
summary: 今回は Stiecore と連携が可能な翻訳サービス、TransPerfect 社の GlobalLink 翻訳管理システムと Sitecore の連携モジュールのインストール手順を紹介します。サービスの詳細は、TransPerfect までデモリクエストが可能ですので、直接お問い合わせください。
images: ['/static/images/2021/10/GlobalLink13.png']
---

今回は Stiecore と連携が可能な翻訳サービス、TransPerfect 社の GlobalLink 翻訳管理システムと Sitecore の連携モジュールのインストール手順を紹介します。サービスの詳細は、以下のサイトから参照してください。

* [TransPerfect 公式サイト](https://www.transperfect.com/ja/home)
* [デモの申し込み](https://www.transperfect.com/ja/technology)

なお今回はデモ・検証用ということで TransPerfect 社から特別にアカウントを発行していただくことができました。このため、実際に評価したいという場合は、上記のページからお問い合わせください。

## モジュールのインストール

システムを連携するためのモジュールをインストールする必要があります。このツールはコンテンツ管理サーバーにて動作するだけで良いため、以下の手順でモジュールをインストールしていきます。

1. コントロールパネルを開く
2. 管理 - パッケージをインストールする を選択
3. モジュールをアップロードして、インストールを進める

![GlobalLinkModule](/static/images/2021/10/GlobalLink01.png)

モジュールのインストールが完了したあと、以下の手順を進めていきます。

## データベースの作成

モジュールが処理をする上で必要となるデータベースを作成していきます。今回はデータベースは (local) となりますが、別のサーバーで運用している場合は SQL Server に管理ツールから接続して作業を進めてください。

1. SQL Serer Management Studio して、データベースに接続します
2. App_Data フォルダにある GlobalLink_Extension_DB_Script_9.3.6.sql を開きます
3. 対象となるデータベースは Sitecore のマスターデータベースを指定します（今回は XM1_Master)

![GlobalLinkModule](/static/images/2021/10/GlobalLink02.png)

完了すると、GlobalLink 関連のデータベーステーブルが追加されています。

![GlobalLinkModule](/static/images/2021/10/GlobalLink03.png)

これで Sitecore のサーバーに関しての設定は完了です。

## モジュールの設定ファイルを更新

続いて、Sitecore と GlobalLink を接続する形となります。連携をするための設定ファイルは、 **\App_Config\Include\TranslateApp.config** を編集することになります。このファイルは、以下の項目を編集することになります。

```xml
<setting name="GlobalLink_connection_string" value=""/>
```

この項目は、Master データベースにアクセスすることができれば問題ないため、\App_Config\ConnectionStrings.config のファイルに定義されている Master データベースの接続文字列を参考にして、以下の接続文字列を完成させてください。

```xml
<setting name="GlobalLink_connection_string" value="user id=username;password=password;Data Source=localhost;Database=XM1_Master;MultipleActiveResultSets=True;"/>"/>
```

続いてもう一つの設定ファイル、**\App_Config\Include\Translate.config** を確認します。設定項目は以下の３つです。

* **RetrieveAgent** 翻訳されたデータを Sitecore にダウンロードするための頻度を設定します。デフォルトでは 5 分に設定されています。
* **ExportLowPriorityAgent** 優先順位が中および低となっているアイテムを GlobalProtect に送信します。デフォルトでは 3 分に設定されています。
* **ExportHighPriorityAgent** 優先順位が高となっているアイテムを GlobalProtect に送信をします。デフォルトでは 5 分に設定されています。

設定としては hh:mm:ss という形で記載します。今回はデフォルトのままで進めるため、特に変更せず確認だけしました。

## 日本語リソースのインストール

モジュールには日本語のリソースが含まれていないため、日本語の管理画面ではメニューが表示されない形となります。今回テストをしたモジュールに関しての日本語リソースを作成して、GitHub にリソースファイルをアップロードしておきました。

* https://github.com/SitecoreJapan/InstallScript/tree/master/demo/TransPerfect

上記にアップロードされている TransPerfect-ja-JP.xml をインポートしてください。

![GlobalLinkModule](/static/images/2021/10/GlobalLink04.png)

インポートが完了すると、コンテンツエディターに GlobalLink のメニューが表示されています。

![GlobalLinkModule](/static/images/2021/10/GlobalLink05.png)

これでサーバー側の設定は完了となります。

## 実際に利用してみる

Sitecore の Home アイテムが英語のみとなるため、これを日本語にする手順を紹介します。

1. Globallink のタブを開く
2. セットアップを開く
3. GlobalLink との接続情報を入力する

![GlobalLinkModule](/static/images/2021/10/GlobalLink06.png)

4. Locale Map として、Sitecore の言語と翻訳するロケールを記載します（今回は、 en:en-US,ja-JP:ja-JP とする）
4. Save Parameters のボタンをクリックします

これでアカウントを利用してサーバーとの接続ができるようになりました。

翻訳の手順を確認していきます。今回は Home のアイテムを選択している形で、設定をクリックすると翻訳対象となるフィールドを選択することができます。Select All をクリックして保存します。

![GlobalLinkModule](/static/images/2021/10/GlobalLink07.png)

続いて、アイテムとしては英語のコンテンツに切り替えて、メニューに表示されている**翻訳**ボタンをクリックします。 Submission Name など必要な情報を入れて翻訳ボタンをクリックします。

![GlobalLinkModule](/static/images/2021/10/GlobalLink08.png)

データに関してはバックグラウンドで送信されます。

![GlobalLinkModule](/static/images/2021/10/GlobalLink09.png)

ダッシュボードを開くと、プロジェクトの中身を確認することができます。

![GlobalLinkModule](/static/images/2021/10/GlobalLink10.png)

しばらくすると、翻訳サービス側にプロジェクトが送信されます。今回は、機械翻訳で翻訳が終わる形となっているため、完了となりました。

![GlobalLinkModule](/static/images/2021/10/GlobalLink11.png)

インポートのボタンをクリックすると、バッチでのタイミングではなくその場でデータを取得しにいきます。

![GlobalLinkModule](/static/images/2021/10/GlobalLink12.png)

データのインポートが完了すると、以下のように日本語のデータが設定されていることがわかります。

![GlobalLinkModule](/static/images/2021/10/GlobalLink13.png)

実際に翻訳作業に関して、翻訳支援サービスとの連携ができていることを確認することができました。

## まとめ

Sitecore は多言語でのサイト運用という点では非常によくできた CMS で、多くの多言語サイトで導入されています。次は翻訳プロセスの改善ということになりますが、翻訳サービスを提供している会社との連携が今回のように実現が可能です。あとは、翻訳会社には翻訳業務における最適化のノウハウがあります。ぜひ、その内容に関しては TransPerfect 社にお問い合わせください。

* [Transperfect 公式サイト](https://www.transperfect.com/ja/home)