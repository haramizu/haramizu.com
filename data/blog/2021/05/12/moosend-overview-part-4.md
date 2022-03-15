---
title: Moosend - 初期設定を進めていく 後編
date: '2021-05-12'
tags: ['Moosend']
draft: false
summary: 前回、送信者に関しての設定およびリストの作成まで進めました。今回はリストの作成、送信テストまで進めていきます。
images: ['/static/images/2021/05/moosendoverview43.png']
---

[前回](/blog/2021/05/11/moosend-overview-part-3)、送信者に関しての設定およびリストの作成まで進めました。今回はリストの作成、送信テストまで進めていきます。


## 最初のメールを送信する

上記の設定まで完了していると、以下のようにチェックマークが増えてメールの送信のみ、となります。

![Moosend](/static/images/2021/05/moosendoverview28.png "Moosend")

では早速メールを作成していきましょう。クリックをすると以下の画面に切り替わります。

![Moosend](/static/images/2021/05/moosendoverview29.png "Moosend")

### キャンペーンの作成

今回はレギュラーキャンペーンを作成します。ポップアップが表示されているボタンの **Create** をクリックします。キャンペーンを作成するために必要な項目が設定されます。項目は以下のような用途となります。

| 項目 | 概要 |
|-|-|
| Campaign Name | キャンペーンの名前、ツール内での管理用 |
| Subject | メールの件名 |
| Preview Text | 多くのメールアプリケーションで利用しているティザーテキスト部分 |
| Sender | メールを送信する際の From を指定します |
| Reply to | メールの返信先として利用する reply-to の項目になります |
| Send confirmation to | プラン名を選択 |

手始めに以下のように設定しました。

![Moosend](/static/images/2021/05/moosendoverview30.png "Moosend")

### リストの選択

**Next** のボタンをクリックするとメーリングリストの一覧が表示されます。

![Moosend](/static/images/2021/05/moosendoverview31.png "Moosend")

事前に作成をしておいたリストを選択して、**Next** をクリックします。

### メールのタイプを選択する

続いて表示されるのがメールのタイプです。HTML とプレーンメール、もしくはテキストのみのどちらかを選択できます。

![Moosend](/static/images/2021/05/moosendoverview32.png "Moosend")

今回は **HTML and plain text** を選択します。

### キャンペーンのテンプレート作成

次の画面では、キャンペーンの作成となります。

![Moosend](/static/images/2021/05/moosendoverview33.png "Moosend")

まだ初期設定で何もないので、**Take me to the Editor** をクリックします。するとメール編集画面に切り替わります。

![Moosend](/static/images/2021/05/moosendoverview34.png "Moosend")

左上のポップアップにあるように、Template Library があるので、これをクリックします。

![Moosend](/static/images/2021/05/moosendoverview35.png "Moosend")

数多くのテンプレートが表示されました。Preview Template をクリックすると画面上でサンプルのデータを入れたプレビューを見ることができます。

![Moosend](/static/images/2021/05/moosendoverview36.png "Moosend")

左側ではカテゴリが表示されています。今回は Blog のジャンルに切り替えました。

![Moosend](/static/images/2021/05/moosendoverview37.png "Moosend")

ここから、Typical Blog Newsletter のテンプレートを選択します。

![Moosend](/static/images/2021/05/moosendoverview38.png "Moosend")

User template をクリックすると下のように画面が切り替わります。

![Moosend](/static/images/2021/05/moosendoverview39.png "Moosend")

左側にある項目を必要に合わせてドラッグ＆ドロップで配置することができます。この画面はメールの編集もできるようになっています。テキストをクリックしてください。

![Moosend](/static/images/2021/05/moosendoverview40.png "Moosend")

リンクなどは左側の設定の項目が変更されて、値を設定することができます。

![Moosend](/static/images/2021/05/moosendoverview41.png "Moosend")

項目を設定していく必要がありますが、今回は手間なのでエレメントを削除しました。ということで１つの記事だけのメールということで、以下のような画面になります。

![Moosend](/static/images/2021/05/moosendoverview42.png "Moosend")

せっかくなので本文に名前を設定しましょう。リッチテキストを入力する項目に、*Recipient Name* の項目があるので、これを選択します。

![Moosend](/static/images/2021/05/moosendoverview43.png "Moosend")

あとはフッターのあたりを仕上げます。出来上がりに関しては上のメニューにある Preview をクリックすることで、画面で確認することができます。タブレット、スマホのプレビューも切り替えれます。

![Moosend](/static/images/2021/05/moosendoverview44.png "Moosend")

### メールのテスト

上のメニューに Send Test の項目があるのでクリックをします。すると左側にメールアドレスを入力する項目が表示されます。メールアドレスを入力して、+ のボタンをクリックすると、下のような画面になります（メールアドレスは画面からは削除しています）。

![Moosend](/static/images/2021/05/moosendoverview45.png "Moosend")

Send Text のボタンをクリックすると、作成したテンプレートで指定したメールアドレスにテストメールが送信されます。

![Moosend](/static/images/2021/05/moosendoverview46.png "Moosend")

作業が完了、ということでウィンドウの右上にある **Update Campaign & Continue** をクリックします。

## Span and Delivery Test

編集画面が切り替わると、下記のように画面が切り替わります。

![Moosend](/static/images/2021/05/moosendoverview47.png "Moosend")

今回はコンテンツのスパムテストを実行します。Content spam test のタブに切り替えます。タブを切り替えると、さまざまなメールサービスに対しての迷惑メール判定を実行している様子を確認することができます。

![Moosend](/static/images/2021/05/moosendoverview48.png "Moosend")

以下の画面は、SPF の設定がされていない場合に表示されるエラー画面になります。

![Moosend](/static/images/2021/05/moosendoverview49.png "Moosend")

SPF の項目は、DNS のレコードに追加するべき内容が含まれていない、ということになります。この設定は前回紹介していますので、このエラーが出た場合は DNS のレコードの追加をしてください。それ以外にいくつか警告が出ている場合に関しては、別途対処していきます。テストメールが出ていれば今回はこのまま進めていきます。

## 配信時間の設定

最後の設定項目は、配信時間の設定を入力します。画面は以下の通りです。

![Moosend](/static/images/2021/05/moosendoverview50.png "Moosend")

今回はすぐに送信したいので、デフォルトの設定のままとします。時間指定する場合は、Schedle thsi campaign to be sent out at a future datte and time を選択して時間を指定してください。

## 配信前の確認

最後に配信前の確認画面が表示されます。メールの内容、配信の設定、タイトルなどもろもろです。

![Moosend](/static/images/2021/05/moosendoverview51.png "Moosend")

今回は変更点はないので、このまま送信するため画面の一番下に配置されている **Send** のボタンをクリックして送信します。画面が切り替わり、送信状況の画面に切り替わります。

![Moosend](/static/images/2021/05/moosendoverview52.png "Moosend")

## 配信後の確認

配信が完了すると、完了メールの送信先に設定しているメールアドレスに送信されます。

![Moosend](/static/images/2021/05/moosendoverview53.png "Moosend")

ダッシュボードを参照しにいくと、チェックリストからレポートの画面に切り替わります。

![Moosend](/static/images/2021/05/moosendoverview54.png "Moosend")

Open レートは、HTML メールの画像をダウンロードすることで取得します。Link Clicks はメールに設定されている記事の URL をクリックするとカウントされます。また購読しないを選択した場合は、 Unsubscribed に追加されます。このように、メールを送るとどういう結果になったのか、というのがレポートで表示されるようになります。

![Moosend](/static/images/2021/05/moosendoverview54.png "Moosend")

左下にあるこれは最初のメールですの部分を見ると4名に配信済み、というのが確認できます。このレポートの Actions の中にある目のアイコンをクリックすると、ニュースレターのレポートを参照できます。以下がその画面です。

![Moosend](/static/images/2021/05/moosendoverview55.png "Moosend")

別のレポートとして Link Performance というレポートがあります。これはどういうリンクがクリックされたのか、がわかる形です。

![Moosend](/static/images/2021/05/moosendoverview56.png "Moosend")

またクリックしている人のロケーションも参照できます。

![Moosend](/static/images/2021/05/moosendoverview57.png "Moosend")

このように、メールを送った後にレポートをすぐ参照できるのは非常に便利ですね。

## まとめ

Moosend 概要シリーズとして、最初のニュースレターを配信するところまで紹介をしました。もう少しネタを集めて、活用シリーズを別途追加したいと思います。とはいえ、4回に分けて紹介をしましたが、非常に簡単に始めることができるニュースレターツールです。まずはスモールスタートで、という形であれば 1000 人までは無料で使えるので、設定、運用の確認なども踏まえて、無料版の評価はぜひしていただきたいところです。

**注意** 無料プランは 2022年1月の段階で廃止され、機能制限のないサービスを30日限定で利用することができるようになりました。詳細は後日別途紹介します。
