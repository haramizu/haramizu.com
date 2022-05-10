---
title: Sitecore OrderCloud Headstart - Part 5 Azure への展開
date: '2021-09-14'
tags: ['OrderCloud', 'デモ', 'Headstart']
draft: false
summary: 前回まで、ローカルでインスタンスが起動するところを紹介していました。今回は、Azure に展開をして OrderCloud Headstart のデモが立ち上がるまで進めていきましょう。
images: ['/static/images/2021/09/ordercloud75.png']
---

前回まで、ローカルでインスタンスが起動するところを紹介していました。今回は、Azure に展開をして OrderCloud Headstart のデモが立ち上がるまで進めていきましょう。

## Azure DevOps を利用して展開する

### 事前準備

展開をする前に、以下の２つのファイルを変更していきます。まず最初に Azure Pipeline に関する設定ファイル **azure-pipelines.yml** を開きます。Publish Middleware の表示名になっている Task の zipAfterPublish の項目を true に変更します

```yaml
- task: DotNetCoreCLI@2
  displayName: Publish Middleware
  inputs:
    command: publish
    publishWebProjects: false
    projects: '**/Headstart.API.csproj'
    arguments: --configuration Release --output middleware
    zipAfterPublish: true
```

続いて **version.yml** ファイルに middleware の URL が設定されているのを確認します。

![OrderCloud](/static/images/2021/09/ordercloud47.png)

これで下準備は完了です。

### パイプラインの作成

まず Azure DevOps にプロジェクトを作成します、

![OrderCloud](/static/images/2021/09/ordercloud43.png)

左側のメニュー、Pipelines を選択、Create Pipeline のボタンをクリックして新しいパイプラインを選択します。

![OrderCloud](/static/images/2021/09/ordercloud44.png)

Code に関しては、今回は自分の GitHub のリポジトリを指定するため、GitHub を選択します。

![OrderCloud](/static/images/2021/09/ordercloud45.png)

Headstart のリポジトリを選択します。

![OrderCloud](/static/images/2021/09/ordercloud46.png)

選択をした後、Run - Save で保存をします。

![OrderCloud](/static/images/2021/09/ordercloud48.png)

Run Pipleline のボタンをクリックして、右下に表示される Run のボタンをクリックします。

![OrderCloud](/static/images/2021/09/ordercloud49.png)

**注意**：ここで、以下のようなエラーが表示される場合があります。

```
No hosted parallelism has been purchased or granted. To request a free parallelism grant, please fill out the following form https://aka.ms/azpipelines-parallelism-request
```

![OrderCloud](/static/images/2021/09/ordercloud51.png)

これは Azure DevOps の設定が不足しているためです。指定された URL をクリックするとフォームが表示されて、リクエストをすると、私の場合は 3 日で設定が完了して利用できるようになりました。

問題なく動作するようになった場合、パイプラインの実行に関しては 10 分ちょっとで完了します。全てを動画として YouTube にアップロードしてみました。

[![](https://img.youtube.com/vi/gUdmVrY_nm0/0.jpg)](https://www.youtube.com/watch?v=gUdmVrY_nm0)

ダイジェストとしては以下の画面が参考になります。

![OrderCloud](/static/images/2021/09/ordercloud52.gif)

Pipeline が最後まで完了すれば、次はリリースの作成です。

### リリースの作成

左側のメニューの Releases を選択します。

![OrderCloud](/static/images/2021/09/ordercloud53.png)

New Pipleline をクリックしてパイプラインを選択します。

![OrderCloud](/static/images/2021/09/ordercloud54.png)

右側に出てきた選択肢を一度閉じて、左側に表示されている Add an artifact をクリックします。右側に表示される項目に、Source を選択 Add のボタンを押してください（下図は Add をクリックする前）。

![OrderCloud](/static/images/2021/09/ordercloud55.png)

続いて +Add a stage をクリックして、Azure App Service Deployment を選択します。

![OrderCloud](/static/images/2021/09/ordercloud56.png)

Stage name を **Middleware Test** に変更します。

![OrderCloud](/static/images/2021/09/ordercloud57.png)

Middleware Test の下に表示されている 1 job, 1 task をクリックします。画面が切り替わり、Azure Subscription の選択、展開をする App service name を指定してください。

![OrderCloud](/static/images/2021/09/ordercloud58.png)

続いて左側に表示されている Deploy Azure App Service を選択すると以下の画面に切り替わります。

![OrderCloud](/static/images/2021/09/ordercloud59.png)

Deploy to Slot or App Service Environment のチェックマークを選択してリソースグループ、スロットを選択します。

![OrderCloud](/static/images/2021/09/ordercloud60.png)

Save ボタンをクリックして、ここまでの設定を保存します。続いて、タブから改めて Pipeline を選択、Middleware Test のあたりにマウスカーソルを揃えると、Clone のボタンが表示されます。

![OrderCloud](/static/images/2021/09/ordercloud61.png)

Clone をクリックして Stage の名前を Seller Test に変更、1 Job 1 Task をクリックをすると Stage の設定となります。ここでは、App Service name を seller の項目に変更をします。

![OrderCloud](/static/images/2021/09/ordercloud62.png)

続いて、左側に表示されている Run on agent の項目にある + のボタンをクリックしてください。

![OrderCloud](/static/images/2021/09/ordercloud63.png)

bash を検索して候補を表示します。マウスカーソルを合わせると Add のボタンが表示されます。

![OrderCloud](/static/images/2021/09/ordercloud64.png)

Add のボタンをクリックすると左側に Bash Script の項目が追加されます。

![OrderCloud](/static/images/2021/09/ordercloud65.png)

この項目の Type を Script を選択し、Script は以下のコードを記載してください。

```
node inject-appconfig defaultadmin-test
```

Deploy Azure App Service の上に移動をして、 seller のフォルダを Advanced を開き、フォルダとして Seller のフォルダを選択します。

![OrderCloud](/static/images/2021/09/ordercloud66.gif)

続いて、左側に表示されている Deploy Azure App Service をクリックして、設定画面を切り替えます。リソースグループ、Slot およびパッケージフォルダを指定してください。

![OrderCloud](/static/images/2021/09/ordercloud67.png)

改めて、Pipeline の画面に戻って、Seller Test の上にマウスカーソルを合わせて、clone のボタンをクリックしてください。

![OrderCloud](/static/images/2021/09/ordercloud68.png)

Stage の名前を Buyer Test に変更、ステージの設定では、App service name を buyer の App Service を指定します。

![OrderCloud](/static/images/2021/09/ordercloud69.png)

Bash のスクリプトを以下のように書き換えます。

```
node inject-css defaultbuyer-test && node inject-appconfig defaultbuyer-test
```

また Advanced の Working Directory を変更して以下のような画面となります。

![OrderCloud](/static/images/2021/09/ordercloud70.gif)

左側の Deploy Azure App Service をクリックして、リソースグループ、スロット、Packing or Folder を指定します。

![OrderCloud](/static/images/2021/09/ordercloud71.png)

ここまでで以下のような画面となりました。

![OrderCloud](/static/images/2021/09/ordercloud72.png)

Seller Test の S の左にあるアイコンをクリックして、次の画面を表示します。Gates をクリック、時間を 1 分に変更をします。

![OrderCloud](/static/images/2021/09/ordercloud73.png)

Buyer Test に関しても同様の設定を入れます。

![OrderCloud](/static/images/2021/09/ordercloud74.png)

上記の設定が終わったら、Create release のボタンをクリックします。

![OrderCloud](/static/images/2021/09/ordercloud75.png)

Pipeline としては Middleware Test を選択、あとは Create ボタンをクリックして作成、Middleware Test  の上にマウスカーソルを合わせた際に、Deploy のボタンが表示されます。クリックをすると、展開が開始します。

![OrderCloud](/static/images/2021/09/ordercloud76.png)

[![](https://img.youtube.com/vi/qfZNBO19cxo/0.jpg)](https://www.youtube.com/watch?v=qfZNBO19cxo)

しばらくすると、展開が完了しました。

## まとめ

長くなったので今回は展開までとします。実際に展開した後に Azure Portal にて実施する設定に関しては次回の記事で紹介をします。

## 参考情報

- [GitHub ordercloud-api / Headstart](https://github.com/ordercloud-api/Headstart)
- [Exploration of Four51 OrderCloud, its architecture, and Headstart setup](https://himadritechblog.wordpress.com/2021/05/04/exploration-of-four51-ordercloud-its-architecture-and-Headstart-setup/)
