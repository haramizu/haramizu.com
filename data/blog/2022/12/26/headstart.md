---
title: Headstart と Next.js Commerce を連携させる
date: '2022-12-26'
tags: ['OrderCloud', 'Next.js', 'Headstart']
draft: false
summary: Next.js Commerce と OrderCloud を立ち上げただけでは EC サイトとしての機能は不足しており、管理画面として Headstart のプロジェクトを組み合わせるのが最適です。今回は、前回立ち上げた Next.js Commerce と連携する Headstart の管理画面を立ち上げていきます。
images: ['/static/images/2022/12/nextjscommerce18.png']
---

Next.js Commerce と OrderCloud を立ち上げただけでは EC サイトとしての機能は不足しており、管理画面として Headstart のプロジェクトを組み合わせるのが最適です。今回は、前回立ち上げた Next.js Commerce と連携する Headstart の管理画面を立ち上げていきます。

## Headstart とは？

Headstart は Sitecore OrderCloud を利用する上で便利なテンプレートで、Angular を利用した EC サイトおよび管理画面を提供しています。EC サイトとしては Next.js Commerce の選択をすることも可能で、管理画面としては Headstart の管理画面だけを利用する、ということもできます。Headstart のコードは以下のリポジトリで公開をしています。

- https://github.com/ordercloud-api/headstart

## リソースを準備していく

手順に関しては以前に作成している記事をベースに進めていきます。まず、Azure のリソースを作成していきます。

- [Part 3 Azure の環境を準備する（その１）](/blog/2022/02/04/headstartdemo-step3)
- [Part 4 ミドルウェアの起動](/blog/2022/02/07/headstartdemo-step4)

続いてのサンプルデータの準備に関しては、前回の記事で実施済みとなっています。**Azure App configuration の更新** 以降の設定は必要となるため、その部分だけ進めていきます。

- [Part 5 サンプルデータの準備](/blog/2022/02/08/headstartdemo-step5)
- [Part 6 Sendgrid にサンプルのメールを設定する](/blog/2022/02/09/headstartdemo-step6)

続いて次のステップでは、Buyer のサイトの作業は省略して、Seller の手続きだけを進めていきます。なお、Seller の管理画面は日本語のリソースが追加されているため、その設定に関しては更新しておきました。

- [Part 7 Buyer および seller サイトの起動](/blog/2022/02/10/headstartdemo-step7)

続いて Azure にリソースを追加していきますが、ここも Buyer に関しては省略することができます。Middleware および Seller のみ作業を進めていきます。

- [Part 8 Azure の環境を準備する（その２）](/blog/2022/02/14/headstartdemo-step8)

Azure に展開していくにあたって、 `azure-pipelines.yml` で build をするための定義が入っています。今回は buyer の部分が不要となるため、以下の job 配下を削除してください。

```yaml
- job: Build_Buyer
```

- [Part 9 Azure DevOps と GitHub 連携](/blog/2022/02/15/headstartdemo-step9)

![headstart](/static/images/2022/12/buildheadstart01.png)

続いてリリースの作成を準備します。今回も buyer の部分は Next.js Commerce で構築しているため、その部分を省略する形で進めてください。

- [Part 10 リリースの作成と動作確認](/blog/2022/02/16/headstartdemo-step10)

![headstart](/static/images/2022/12/buildheadstart02.png)

無事、完了したところで次のステップに入ります。下記のページでは Middleware の動作確認の前に、`APP_CONFIG_CONNECTION` の設定を先に実行してください。現在のバージョンでは設定が不足しているとエラーになります。

- [Part 11 環境のチェック](/blog/2022/02/17/headstartdemo-step11)

## まとめ

以前に紹介をしていた Next.js Commerce の展開手順に関して、また OrderCloud の Headstart が若干アップデートされていたこともあり、インストールの手順を改めて紹介をしました。

今年のブログの公開は今日で一旦終了とさせていただきます。年明けから改めて情報発信していきたいと考えています。引き続きよろしくお願いします。
