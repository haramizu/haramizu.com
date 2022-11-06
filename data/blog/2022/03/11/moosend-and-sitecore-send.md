---
title: Moosend と Sitecore Send の紹介
date: '2022-03-11'
tags: ['Sitecore Send', 'Moosend']
draft: false
summary: 昨年、このブログでも紹介をした Moosend のサービスを、Sitecore としてのサービスとして Sitecore Send という形で企業向けのサービスとして展開を開始しました。改めて製品の紹介と2つの製品の違いは何か？というのを今回は紹介します。
images: ['/static/images/2022/03/moosend01.png']
---

昨年、このブログでも紹介をした Moosend のサービスを、Sitecore としてのサービスとして Sitecore Send という形で企業向けのサービスとして展開を開始しました。改めて製品の紹介と 2 つの製品の違いは何か？というのを今回は紹介します。

## Moosend のサービス

Moosend はメール配信サービスでマーケティングオートメーションの機能を提供しています。申し込みをすると 30 日間限定で Pro と同じ機能を提供しています。サービスの便利な機能を上げていくと以下のような感じです。

公式サイトは以下の通り。

- [Moosend](https://moosend.com/)

機能一覧としては Product のメニューを開くと表示されます。

![moosend](/static/images/2022/03/moosend01.png)

機能は今後随時紹介していきますが、サービスの特徴は以下のような形です。

- メール配信数ではなく、メール購読者数をベースとした料金体系
- ランディングページ・購読フォーム機能の提供
- 使いやすいメール作成ツール
- 画像の切り取り、リサイズツール
- カウントダウンタイマー
- メールの開封・クリック・開封地域などのレポート
- メールのヒートマップ
- A/B テスト
- API 連携

想定しているお客様像は上の画像の右側に記載されているように、

- E コマース
- エージェンシー
- 旅行
- 出版社
- SaaS サービスを提供

エージェンシー以外においては API 連携の機能をうまく使っていくシナリオになっています。エージェンシーに関しては、近々別の記事で紹介をさせていただきます。

価格に関して分かりやすく Web サイトで掲載されています。30 日間無料プランを提供しているため、実際のサービスの評価をすることも可能です。

- [Pricing](https://moosend.com/pricing/)

Pro 版に関してはクレジットカードおよび PayPal での支払いをすることができます。

Moosend の 30 日期間限定と Pro、Enterprise に関する機能の違いは以下の通りとなっています。

|                        | 30 日間無料 | Pro | Enterprise |
|------------------------|-------------|-----|------------|
| 購読者数               | ○           | ○   | ○          |
| メールキャンペーン     | ○           | ○   | ○          |
| トランザクションメール | -           | ○   | ○          |
| ランディングページ     | ○           | ○   | ○          |
| カスタムレポート       | 1           | ○   | ○          |
| アカウントマネージャー | -           | -   | ○          |
| チームメンバー         | 1           | 5   | 10+        |
| プライオリティサポート | -           | -   | ○          |
| SMTP Server            | -           | ○   | ○          |
| SSO & SAML             | -           | -   | ○          |
| SLA                    | -           | -   | ○          |
| Dedicated IP           | -           | -   | ○          |

100 万を超える購読者数になる場合は Enterprise 版という形で個別にお問合せいただくことができます。Pro 版にはない SSO なども提供しています。もちろん、この Enterprise 版にしかないサービスを利用したい場合は Enterprise 版で申し込みができるようになっています。

## インテグレーション

他のシステムとの連携に関して、Moosend の Integration のページを参照するといろいろなサービスがあります。

- [Tools Integrated With Your Favourite Marketing Platform](https://moosend.com/integrations/)

主な機能として以下のような連携があります。

- [Wordpress](https://wordpress.org/plugins/moosend/)
- [Mailchimp Synchronizer](https://help.moosend.com/hc/en-us/articles/4404920087826-The-Mailchimp-Synchronizer-and-how-you-can-use-it)
- [Magento](https://moosend.com/ecommerce/magento/)
- [Drupal](https://www.drupal.org/project/moosend)
- [Google Contacts](https://help.moosend.com/hc/en-us/articles/4407352214290-The-Google-Contacts-Plugin-and-how-you-can-use-it)
- [Salesforce CRM](https://help.moosend.com/hc/en-us/articles/213863485-What-is-the-Salesforce-Plugin-and-how-can-I-use-it-)

## Sitecore Send のサービス

Moosend のサービスを Sitecore ブランドで提供しているのが Sitecore Send になります。こちらのサービスはオンラインで申し込みをする形ではなく、契約をして利用してもらう企業向けのものとなります。

内容に関しては以下のような形です。

- Moosend Enterprise と同じサービスで提供（規模は 20万～選択可能）
- 編集ユーザー数は制限無し
- 企業向けのためオンボーディングサービスの提供
- 支払いは請求書払いに対応
- 将来的な他の Sitecore 製品との連携ツールの提供

ある程度の導入規模になると Sitecore Send が企業としては導入しやすい形となっています。

## Sitecore Send のニュース

プレス向けのイベントを 3 月 10 日に実施して、いくつかのメディアで取り上げられました。

- [サイトコア、メールマーケティングを支援する新ツール--消費者を購読者に](https://japan.zdnet.com/article/35184718/)
- [サイトコア、SaaS ベースのメール配信ツール「Sitecore Send」](https://news.mynavi.jp/techplus/article/20220311-2290514/)

## まとめ

今回は昨年買収をした Moosend および Sitecore Send に関しての違いという点を紹介しました。Sitecore Send に関して追って色々と紹介をしていきたいと思います。