---
title: Sitecore Demo Platform - デモの日本語化
date: '2021-06-29'
lastmod: '2021-06-29'
tags: ['Sitecore','Demo']
draft: false
summary: 以前に Sitecore のデモ環境を動かすための手順として、Sitecore Demo Platform を動かすを紹介しました。今回は日本語環境を整備する手順を紹介して行きます。
images: ['/static/images/2021/06/jaresource14.png']
---

以前に Sitecore のデモ環境を動かすための手順として、Sitecore Demo Platform を動かすを紹介しました。今回は日本語環境を整備する手順を紹介して行きます。今回の対象となるバージョンは 10.1 を対象としてまとめています。

* [Sitecore Demo Platform を動かす](/blog/2021/05/28/sitecore-demo-platform)

![jaresource](/static/images/2021/06/jaresource01.png)

## 日本語リソースの追加

まず最初に、管理画面のリソースを追加するために Core データベースに日本語に関する定義を追加します。他の言語でもリソースの追加手順は同じですので、他の言語を追加する場合はローケルの画面が変わると考えてください。

管理画面からデスクトップを開き、右下にあるデータベースを選択する場所で Core を選択してください。

![jaresource](/static/images/2021/06/jaresource02.gif)

続いてコントロールパネルを開いて、言語の追加をおこないます。コントロールパネルを開いて、Localization - Add a new language を選択します。ここでは Japanese (Japan) を選択して、言語の追加の手順を完了させます。

![jaresource](/static/images/2021/06/jaresource03.png)

Core データベースに関する作業はこれで完了です。続いて、言語の追加が終わったところで、https://dev.sitecore.net から対象の日本語リソースをダウンロードします。今回のファイル名は Sitecore 10.1.0 rev. 005207 (ja-JP).zip になります。手順としては、コントロールパネルから Localization - Import languages を選択をします。

![jaresource](/static/images/2021/06/jaresource04.png)

続いて、ファイルをアップロードしますが、10.1 からは手順が異なります。アップロード先として App_Data を選択してします。

![jaresource](/static/images/2021/06/jaresource05.png)

Upload のボタンをクリックしてください。

![jaresource](/static/images/2021/06/jaresource06.png)

アップロードの際に、Zip をサーバーで解凍するをチェックします。

![jaresource](/static/images/2021/06/jaresource07.png)

正しく解凍されているかを確認するためにフォルダを見ると、app_data¥ocalization の下に texts-ja-JP.xml が追加されています。これでインポートは完了となるので、ダイアログを閉じてください。

![jaresource](/static/images/2021/06/jaresource08.png)

アップロードをしたリソースを有効にするために、PowerShell ISE を開いて、以下のコマンドを実行してアプリケーションの再起動を実行します。実行をするにあたって、パスワードの入力ダイアログが表示されますので、パスワードを入れた上で作業を完了させてください。

```
Restart-Application
```

![jaresource](/static/images/2021/06/jaresource09.png)

インポートが完了となりました。一度ログアウトをして入り直すか、デスクトップを開いて Core データベースから Master データベースに切り替えて、通常の作業モードに戻します。

## ユーザーの表示言語を切り替える

ユーザーの言語を切り替えるためには、以下の手順で変更することができます。

1. Controle Panel を開きます
2. My Settings の中にある Region and language options を開きます
3. Display language を Japanese (Japan) に変更をします

変更を完了すると、下記の画面のように日本語のリソースが追加されます。

![jaresource](/static/images/2021/06/jaresource10.png)

## デモ向けリソースの追加

上記の画面でもまだリソースが不足していることがわかります。リソースがいくつか不足しているため、Github の以下のリポジトリからファイルをダウンロードしてください。

* https://github.com/SitecoreJapan/InstallScript/
    * 101/powershell-report-ja-jp.xml
    * 101/horizon-ja-jp.xml
    * 101/SXA-ja-JP-update.xml
    * demo/LighthouseLifestyle/lighthouse-ja-jp.xml
    * xGenerator/xGenerator-ja-jp.xml

上記のファイルをすべて temp にアップロードをして行きます。インポートの画面に切り替えて、/temp を指定してください。

![jaresource](/static/images/2021/06/jaresource11.png)

アップロードボタンをクリックして、上記のファイルをアップロードします。

![jaresource](/static/images/2021/06/jaresource12.png)

アップロードが完了したあと、/temp の下にあるファイルを指定してインポートをして行きます。最初に、/temp/SXAtranslations/ja-JP.xml のファイルを指定します。その後、インポートの手順を進めて行きます。

![jaresource](/static/images/2021/06/jaresource13.gif)

この手順を以下のファイルに対して、順に進めてください。

* 101/powershell-report-ja-jp.xml
* 101/horizon-ja-jp.xml
* 101/SXA-ja-JP-update.xml
* demo/LighthouseLifestyle/lighthouse-ja-jp.xml
* xGenerator/xGenerator-ja-jp.xml

上記のリソースのインポートが完了すると、日本語リソースのインポートが完了となります。管理画面に戻ると以下のようになっています。

![jaresource](/static/images/2021/06/jaresource14.png)

エクスペリエンスエディターを開いて、日本語のリソースに切り替えると、日本語のリソースが追加されていることがわかります。

![jaresource](/static/images/2021/06/jaresource15.png)

## ユーザーのコンテンツ言語を切り替える

日本語のリソースのインポートが完了したため、管理する言語を英語から日本語に切り替えます。この設定は以下の手順で切り替えることができます。

1. **ユーザーマネージャー**を開きます
2. 対象となるユーザーをダブルクリックして設定画面を開きます
3. 言語設定のタブを開き、コンテンツの言語を **Japanese (Japan) : 日本語（日本）**に切り替えます。

![jaresource](/static/images/2021/06/jaresource16.png)

OK をクリックして、コンテンツ言語を切り替えました。

## 一部リソースの削除

Sitecore Demo Platform のデモは、以前に利用していた古い日本語リソースが若干残っており、これを手作業で一度削除、新しいリソースを追加という手順を進めて行きます。以下の作業はすべてマーケぃングコントロールパネルで作業をおこないます。

### プロファイルの調整

プロファイルの日本語リソースが含まれている場合は、バージョン - 削除を実行して、英語のリソースのみにして行きます。対象のアイテムは ???? などで表示されているものがほとんどです。

![jaresource](/static/images/2021/06/jaresource17.gif)

以下のアイテムおよびサブアイテムから日本語のリソースが削除できていれば大丈夫です。

```
/sitecore/system/Marketing Control Panel/Profiles/LighthouseLifestyle/Fitness and Trainers
/sitecore/system/Marketing Control Panel/Profiles/LighthouseLifestyle/Product Interests
/sitecore/system/Marketing Control Panel/Profiles/Templates/Focus
```

### 成果の調整

成果のリソースもすべて正しいデータとなっておらず、日本語のリソースを削除していく必要があります。

/sitecore/system/Marketing Control Panel/Outcomes のアイテムを選択して、日本語リソースを削除して行きます。

上記２つ以外にも、??? と表示されているリソースは日本語のデータとして正しくないため削除をして行きます。すべてフォールバック言語で英語のデータを利用して動くようになっているため、日本語リソース飲みを削除していくことでデモ環境が整う形となります。

## まとめ

Sitecore Demo Platform の日本語リソースの調整に関して紹介をしました。実際の製品には、デモのリソースが含まれていないため、アップロードをして完了、また PowerShell / Horizon / SXA に関してのリソースはモジュールで提供されているものであり、デモ以外でも個別に使えるように提供しているものとなります。用途にあわせて利用してください。