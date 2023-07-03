---
title: Moosend - 初期設定を進めていく 前編
date: '2021-05-11'
tags: ['Moosend']
draft: true
summary: 無料のアカウントが出来上がったので、続いて初期設定をしていきます。もちろん、色々な設定項目は後で変更していくことができますが、画面に従って初期に必要とされる設定を入れていきましょう。
images: ['/static/images/2021/05/moosendoverview27.png']
---

無料のアカウントが出来上がったので、続いて初期設定をしていきます。もちろん、色々な設定項目は後で変更していくことができますが、画面に従って初期に必要とされる設定を入れていきましょう。

**注意** 無料プランは 2022年1月の段階で廃止され、機能制限のないサービスを30日限定で利用することができるようになりました。詳細は後日別途紹介します。


## メールアドレスの追加

ログインをすると、Αdd a new “from” name and email address というメッセージと共にダイアログが表示されます。

![Moosend](/static/images/2021/05/moosendoverview14.png "Moosend")

アカウントとは別のメールアドレスを利用したいので、**Yes** をクリックします。すると次の画面に切り替わります。

![Moosend](/static/images/2021/05/moosendoverview15.png "Moosend")

右上にある **Add new sender** をクリックして入力画面に移動します。

![Moosend](/static/images/2021/05/moosendoverview16.png "Moosend")

Sender （送信元）としてはビジネスで利用するメールアドレスを指定してください。フリーのメールアドレスは利用できない、と警告があるので、きちんと着信できるメールアドレスにしましょう。入力すると以下のように画面が切り替わります。

![Moosend](/static/images/2021/05/moosendoverview17.png "Moosend")

右下のダイアログでは、メールボックスにメールを送っているので確認を、という風に表示されています。しばらくするとメールが届きます。

![Moosend](/static/images/2021/05/moosendoverview18.png "Moosend")

Click here をクリックして進めていきます。ブラウザが開いて、確認されました。

![Moosend](/static/images/2021/05/moosendoverview19.png "Moosend")

左側にあるダッシュボードをクリックすると、設定が進んだことがわかります。

![Moosend](/static/images/2021/05/moosendoverview20.png "Moosend")

## DNS の更新

追加した送信メールアドレスが迷惑メールとして送信することがないように、DNS のレコードを追加していきます。

ログインをしている画面の右上の歯車のマークをクリック、Sender の項目を選択します。

![Moosend](/static/images/2021/05/moosenddns01.png "Moosend")

追加したメールアドレスをクリックすると以下の画面に切り替わります。

### DKIM の設定

DKIM - Domain Keys Identified Mail の設定として、DNS のレコードに 2 つのテキストを追加する必要があります。

![Moosend](/static/images/2021/05/moosenddns02.png "Moosend")

私は Netlify の DNS を利用しているので、それぞれの項目を以下のように入力しておきます。

![Moosend](/static/images/2021/05/moosenddns03.png "Moosend")

### SPF の設定

SPF - Sender Policy Framework に関しても同様に設定する必要があります。

![Moosend](/static/images/2021/05/moosenddns04.png "Moosend")

このデータに関しても、DKIM の設定と同様に入力してレコードをチェックします。

なお、SPF を複数設定する場合は、複数のレコードを作成せずに、１つのレコードにまとめてください。

```
haramizu.com TXT v=spf1 include:spfa.mailendo.com ~all
haramizu.com TXT v=spf1 include:otheremail.com ~all
```

と２つのレコードにならないようにして、２つを１つのレコードにまとめてください。

```
TXT haramizu.com v=spf1 include:spfa.mailendo.com include:otheremail.com ~all
```

### DMARC の設定

SPF および DKIM の設定のあと、DMARC の設定になります。設定方法は以下のページが参考になります。

* [DMARCとは？](https://sendgrid.kke.co.jp/blog/?p=3137)

今回も DNS に TXT のレコードを追加する形となります。

```
v=DMARC1;p=none;rua=mailto:dmarc-ra@yourdomain.com;ruf=mailto:dmarc-ra@yourdomain.com;rf=afrf;pct=100
```

### GoDaddy を利用している場合

上記２つの設定に関して、GoDaddy での設定に関してのサポートが記載されていました。ドメインおよび DNS を GoDaddy を利用している場合は参考にしてください。

* [How can I set up SPF & DKIM on my GoDaddy provider?](https://help.moosend.com/hc/en-us/articles/115000369885-How-can-I-set-up-SPF-DKIM-on-my-GoDaddy-provider-)

### Verify DNS records

DNS のレコードを更新したあと、しばらくは認証をすることができません。私の場合は TTL を 3600 に設定をしているため、1 時間ほど待ちました。時間が経ってから、DKIM および SPF それぞれの画面で **Verify DNS records** のボタンをクリックしてください。

![Moosend](/static/images/2021/05/moosenddns05.png "Moosend")

情報が更新されると TXT records verification succeeded. という形で、設定が完了したことを確認できます。また、Sender 一覧のページでも、DKIM / SPF に関しての設定が完了しているのかどうかも確認できます。

![Moosend](/static/images/2021/05/moosenddns06.png "Moosend")

### DNS 設定の確認

DNS のレコードが正しく設定できているかは、以下のサイトで確認をすると便利です。

* https://mxtoolbox.com/emailhealth/

ドメイン名を入れると、レコードを確認して正しく設定されていればエラーになることなく Passed と表示されます。

![Moosend](/static/images/2021/05/dnscheck.png "Moosend")

## 最初のメーリングリストを作成する

続いて、メーリングリストを作成します。手持ちのアカウントとかをいくつかご用意ください。上記の画面になっているようであれば、*Create a new mailing list* のエリアにある **Yes** ボタンをクリックしてください。もしくは、左側のメニューにある Mailing lists をクリックしても同じ画面に切り替わります。

![Moosend](/static/images/2021/05/moosendoverview21.png "Moosend")

### メンバーを手作業で追加する

すでに最初のメーリングリストが作成されています。作成されているメーリングリストの **Name** をクリックして開きます。

![Moosend](/static/images/2021/05/moosendoverview22.png "Moosend")

メーリングリストのダッシュボードを見ると、まだ新規に作成しただけということもあり、全て空欄です。メーリングリストの名前を変更するのであればこの画面で変更できます。今回はメンバーを追加するため、左側のメニューにある **Members** をクリックしてください。

![Moosend](/static/images/2021/05/moosendoverview23.png "Moosend")

もちろん新規に作成をしたので、リストの中身は空っぽです。**Add Member** のボタンをクリックします。

![Moosend](/static/images/2021/05/moosendoverview24.png "Moosend")

画面では受信者のメールアドレス、名前（オプション）および携帯番号（オプション）を入力する項目があります。今回はテストなので手作業で数名追加していきます。

今回は４つほどのメールアドレスを追加しました（メールアドレスの部分は黒くしてあります）。

![Moosend](/static/images/2021/05/moosendoverview25.png "Moosend")

### バッチ処理の実施

左側のメニューに、**Batch Actions** という項目があります。これをクリックすると、以下のようなメニューに切り替わります。

![Moosend](/static/images/2021/05/moosendoverview26.png "Moosend")

手作業で入力していくのはミスも発生するので、リストの管理に関してはどこかから正確な一覧を入手するのが一番です。そのデータをインポートする場合は、上記の画面で Import Members into List をクリックしてください。画面が下のように変わります。

![Moosend](/static/images/2021/05/moosendoverview27.png "Moosend")

CSV ファイルや Excel のファイル、テキストの貼り付けなどに対応しています。システム連携をしておけば、Google Contacts からデータを取得したり、Salesforce CRM のコンタクトとの連携もできます。この連携に関しては時間があればデモ環境とかを作ってみたいと思いますが、今回は、そういうオプションがありますよ、ということの紹介までとします。

## その他の項目

今回は説明を省略しますが、以下の項目が追加の設定としてあります。

### 設定

購読停止した場合にリダイレクトで表示するページの URL を入力することができます。例えば購読停止したあと、ページでその理由を聞きたい、というときに利用できます。

### カスタムフィールド

コンタクトに対するカスタムのフィールドを作ることができます。標準ではメールアドレス、名前、携帯電話番号が用意されている形です。

### セグメント

メーリングリストのメンバーの中でセグメントを切ることができます。これも利用するシナリオの話の時に改めて説明できれば、と考えています。

## まとめ

今回は送信アドレスの設定、リストの作成まで進めていきました。次回はテンプレートからメールの作成、メールの送信まで進めていきたいと思います。

