---
title: Content Hub - Excel Export と Import の活用
date: '2021-11-23'
tags: ['Content Hub']
draft: true
summary: ファイルをアップロードしたと、メタデータを付与する際にさまざまな項目を入力したいケースがあると思います。Excel Import で新規にアセットを登録する機能も便利ですが、今回は一括変更を Excel Import と Export を利用することで、更新する手順を紹介します。
images: ['/static/images/2021/11/excel12.png']
---

ファイルをアップロードしたと、メタデータを付与する際にさまざまな項目を入力したいケースがあると思います。Excel Import で新規にアセットを登録する機能も便利ですが、今回は一括変更を Excel Import と Export を利用することで、更新する手順を紹介します。

## 前提条件

今回は Sitecore Content Hub をセットアップした後の環境で紹介をしていきます。また作業をしているバージョンは 4.1.5 ですが、この機能はこの製品の買収前から持っている機能になるため、バージョンに依存しない機能となります。

## Excel Import と Export の設定

今回はアセットアップロードの画面にて Excel Import と Export の項目を表示したいと思います。作業としては、Manage - Pages を開き、Create のページを選択します。

![excel](/static/images/2021/11/excel01.png)

ヘッダーの右エリアに Creation の項目があります。これが追加をするための制御をしているので、カスタマイズを有効にして詳細ページに移動します。

![excel](/static/images/2021/11/excel02.png)

左側の設定一覧に Import Excel の項目がありますので、これを利用してチェックして保存をすると Excel Import が有効になります。

続いて同じエリアにある Selection の項目をカスタマイズするために有効にします。

![excel](/static/images/2021/11/excel03.png)

設定画面に移動をすると、Enable export to Excel の項目があるため、これをチェックします。

![excel](/static/images/2021/11/excel04.png)

これで Excel のインポート、エクスポートの設定を Create のページに設定完了となります。

## エクスポートしたデータを確認する

Create のページに７つほどファイルを Drag & Drop でアップロードしています。これらを全て選択をして、・・・のメニュー項目をチェックすると Export to Excel の項目が表示されていることがわかります。

![excel](/static/images/2021/11/excel05.png)

ここで Export してファイルを開くと以下のような Excel ファイルになっています。

![excel](/static/images/2021/11/excel06.png)

タブの部分には M.Asset 、1 行目には M.Asset のどの項目なのかという定義がされています。1 行目で重要となるのは、id identifier の２つになります。特に identifier は Content Hub でのアセットの識別子となるユニークな値で、どのアセットに対してインポートをするのか？というのがわかるようになっています。

## データをインポートする

まずダウンロードをした Excel ファイルの Description に Demo Data を記載して Excel ファイルを保存して、これがインポートされるかどうかを確認していきます。

画面の右上の Add のボタンをクリックすると、Import Excel が追加されていることがわかります。

![excel](/static/images/2021/11/excel07.png)

メニューを選択して、ドラッグ & ドロップで編集済みの Excel ファイルをアップロードします。

![excel](/static/images/2021/11/excel08.png)

インポート処理が終わったあと、全てのアイテムを一括編集モードで開いてみると、インポートに成功していることがわかります。

![excel](/static/images/2021/11/excel09.png)

## 製品情報に紐づける

Excel のファイルに項目を追加することで、他のデータにも一括で値を設定することができます。今回は、製品情報となる PCMProductToAsset に製品情報を紐づけたいと思います。サンプルで作成してある製品情報の識別子 Identifier は CuacMlKhukCLR45FWDTV0Q になりますので、追加したデータは以下のような項目となります。

![excel](/static/images/2021/11/excel10.png)

しばらくすると、製品情報に紐づいたアセットの設定に更新されています。Product Detail に製品情報が紐付きました。

![excel](/static/images/2021/11/excel11.png)

また製品情報に対してもアセット一覧で紐づいているアセットの確認ができるようになっています。

![excel](/static/images/2021/11/excel12.png)

## 製品情報の識別子を探しやすくする

上記の手順では突然紐づける製品情報の識別子としましたが、これを製品情報に表示する手順を最後に紹介をしておきます。まず、Manage - Pages の管理ツールから、 Product Detail のページの編集画面に移動します。

![excel](/static/images/2021/11/excel13.png)

今回は常に表示されるように、Entity image viewer の下にコンポーネントを追加します。+ のボタンをクリックすると以下の画面に切り替わります。

![excel](/static/images/2021/11/excel14.png)

今回は Entity の値を表示するので Entity details を選択します。タイトルは今回は System とします。ちなみに項目として常に表示するかしないか、ということも設定することができます。今回はよく使うだろうということで Always のままで進めます。

![excel](/static/images/2021/11/excel15.png)

追加された画面は以下の通りです。System をクリックして設定を進めます。

![excel](/static/images/2021/11/excel16.png)

表示したい項目のみを選択したいので、System Properties を有効にして、Label を System とし、表示する項目を Identifier のみとします。

![excel](/static/images/2021/11/excel17.png)

実際に製品情報のページにいくと、左側に Identifier が表示されていることがわかります。

![excel](/static/images/2021/11/excel18.png)

ひとつ前の手順で突然値が出てきましたが、この手順を事前に済ませておけばどの製品に紐づけるか、というのを引っ張ることがわかります。値は分かりにくいものですが、紐付け自体はデータを利用してするため、確認できるようにしておくと簡単に作業ができます。

## まとめ

アセットをアップロードした後、ブラウザの画面以外でもエクスポートしたデータを Excel で編集をして更新することができるのを紹介しました。以前に紹介をした Excel エクスポートの項目の制御と併せて利用することで、編集作業をオフラインでできるようになります。

- [アセットに関する Excel エクスポートの項目を調整する](/blog/2021/11/01/ch-export-asset-excel)
