---
id: Netlify-domain
title: ドメインの割り当て
sidebar_label: ドメインの割り当て
description: Netlify で立ち上げたサイトに、独自ドメインを割り当てる手順に関して紹介をしています。
slug: /Netlify/domain
---

Netlify で立ち上げたサイトに、独自ドメインを割り当てる方法について、このページでは紹介をします。ドメインの設定に関してある程度知識がある人であればスムーズに進めることができます。手順としては、DNS のサーバーを Netlify に変更してあとはお任せ、という感じの設定にしました。

## ドメインの設定に関して

### DNS サーバーの設定

DNS のレコードを書き換えることで、Netlify において独自ドメインで Web サイトの運用をすることができます。ドメイン名を入力したあと、以下のような画面になります。

![DNS のチェック](/static/images/netlify/domainharamizujp1.png "DNS のチェック")

**Check DNS configuration** の項目をチェックすると、レコードとして登録する情報が表示されます。

![DNSレコードに関して](/static/images/netlify/domainharamizujp2.png "DNSレコードに関して")

ここで表示されているのは 2 つのタイプです。1 つ目は ALIAS のレコードの追加となります。

```
haramizu.jp ALIAS brave-curran-5af078.netlify.app.
```

この ALIAS の指定ができると CDN も含めた機能を利用することができます。ドメインの管理先によっては、この ALIAS のレコードを追加できない場合があります。その際には、 A レコードに IP アドレスを指定することで独自ドメイン名を利用できます。あとは www に関するレコードを追加したあと、次の証明書の手続きに進んでください。

A レコードを指定した場合に関しては、継続して **Check DNS configuration** の警告が引き続き出ますが、動作していれば問題ありません。

![警告](/static/images/netlify/domainharamizujp3.png "警告")

### DNS サーバーごと移管

サイトを立ち上げると、新しく作成したサイトの Overview の画面に、*Set up a custom domain* というメニューが表示されているのがわかります。

![img](/static/images/netlify/netlify09.png)

クリックをすると、ドメイン名を入力するだけの入力ボックスが表示されます。自分の持っているドメイン名を指定しましょう。

![img](/static/images/netlify/netlify10.png)

すでに自分で持っているドメイン名なので、確認の画面では *Yes, add domain* を指定して次に進みます。

![img](/static/images/netlify/netlify11.png)

すると Custom Domains の画面で、黄色いアラートと合わせて Check DNS configuration という表示されているのがわかるかと思います。

![img](/static/images/netlify/netlify12.png)

Check DNS Configuration をクリックすると、以下のような DNS の設定に関する画面が表示されます。

![img](/static/images/netlify/netlify13.png)

DNS サーバーを別のものに切り替えましょう、ということですね。以下の 4 つのサーバーを指定しておきます。

```
dns1.p01.nsone.net
dns2.p01.nsone.net
dns3.p01.nsone.net
dns4.p01.nsone.net
```

私はドメインの管理として GoDaddy を利用しているので、ドメインマネージャーを立ち上げて、DNS サーバーの設定を変更しました。変更は比較的早く反映されました。

![img](/static/images/netlify/netlify14.png)

変更が確認できると、以下のように *Netlify DNS* という表示とともに、緑色で正しく動いているのを確認することができます。

![img](/static/images/netlify/netlify15.png)

## 証明書を更新する

独自ドメインの設定をしたのであれば、証明書に関しても合わせて登録をしましょう。

![img](/static/images/netlify/netlify16.png)

証明書を持っている場合は、証明書をアップロードしてその証明書を利用することができます。 *Provide your own certificate* をクリックしてアップロードすれば、設定した証明書がアップロードされる形です。証明書を持っていなくても大丈夫です、Let's Encrypt のサービスと連携していて、無料で証明書を利用することも可能になっています。その場合は、Verify DNS configuration のボタンを押すだけで完了です。

![img](/static/images/netlify/netlify17.png)

しばらくすると、設定が完了して *DNS Verification was successful* という風に表示され、証明書の設定が完了したことを確認できます。

![img](/static/images/netlify/netlify18.png)

今回、このサイトに関しては証明書は Let's Encrypt のサービスを利用することにしています。もちろん、無料で証明書を利用できるのと、自動更新の機能も提供されているので、証明書に関する部分は特に意識することなく利用できます。

![img](/static/images/netlify/netlify19.png)

証明書の設定まで完了すると、Overview の画面に表示されていたカスタムドメイン、HTTPS の設定に関する項目の表示は消えて、日頃の運用で必要となる項目にアクセスできるようになります。

![img](/static/images/netlify/netlify20.png)

## まとめ

単にサイトを立ち上げるだけでなく、独自ドメインを設定することができました。これまでブログといえば Wordpress という感じで使っていたのですが、最近の新しいバージョンがいまいち使い勝手がなじまず、かつ独自ドメインでの運用は有料だったのでどうしたものか、と思っていたところで、今回思い切って Docusaurus + Netlify にすることができました。独自ドメインが無料で使える、というのは個人用途としては本当に助かります。

これでサイトの設定、独自ドメインの設定まで完了しました。せっかくですので、続いてステージングサーバーに関して設定をしたいと思います。

