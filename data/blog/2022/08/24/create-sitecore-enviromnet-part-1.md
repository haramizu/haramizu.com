---
title: Sitecore Headless 開発、テスト環境の構築 Part 1 - サーバーの準備（サーバー編）
date: '2022-08-24'
tags: ['Headless']
draft: true
summary: １か月ほどブログの記事を掲載していませんでしたが、これまでの Tips を改めてまとめるシリーズを作成するために少し時間をいただきました。今回のシリーズで、Sitecore Headless を手元で動かし、サーバーに反映させて、実際に Web サーバーに展開するという形が可能な環境を構築していきたいと思います。
images: ['/static/images/2022/08/install01.png']
---

１か月ほどブログの記事を掲載していませんでしたが、これまでの Tips を改めてまとめるシリーズを作成するために少し時間をいただきました。今回のシリーズで、Sitecore Headless を手元で動かし、サーバーに反映させて、実際に Web サーバーに展開するという形が可能な環境を構築していきたいと思います。

## 前提条件

今回は以下のような環境を用意していきます。

- Microsoft Azure に Sitecore Experience Manager 10.2 をセットアップ
- ローカルの環境で Sitecore Experience Manager 10.2 を Docker の環境で動くようにする
- GitHub のリポジトリを利用して、いつでもローカルの環境を作ることができるようにする
- GitHub と Vercel を連携させて、スムーズに新しいコードを展開できるようにする

上記の内容を実施していく上での手順はすでにブログで紹介をしているため、手順を細かく説明するという形ではなく、過去のブログの記事を紹介していきながら、サーバーの環境、ローカルの環境を整えていく形で紹介を進めていきます。

## サーバーの準備

今回はサーバーの準備ということでまずは Azure の上に仮想マシンを立ち上げました。インストールに関しては以下の手順を参考に進めていきます。なお、バージョンに関しては最新版を利用していますので、その部分は新しいバージョンのファイルに合わせてセットアップを進めてください。

1. [Sitecore Experience Manager 10.2 のインストール](/blog/2021/09/22/xm-setup-part-1)
2. [Sitecore Experience Accelerator インストール](/blog/2021/09/27/xm-setup-part-2)
3. [Sitecore Headless Rendering インストール](/blog/2021/09/29/xm-setup-part-4)
4. [Sitecore Horizon](/blog/2022/03/23/install-horizon)

**注意** 当初 Content Hub のコネクタも紹介していましたが、一部うまく動かないケースがあったため外しておきます。回避方法が見つかったら改めてアップデートします。

- [Sitecore Connect for Content Hub 5.0 のインストール](/blog/2022/03/22/sitecore-connect-for-content-hub-5.0)

インストールをしたモジュールは以下の通りです。

- Sitecore Experience Manager 10.2
- Sitecore Experience Accelerator 10.2
- Sitecore Headless Rendering 20.0.0
- Sitecore Horizon 10.2
- Sitecore Management Service 

Sitecore Management Service のモジュールは、Sitecore CLI のページからダウンロードが可能です。

- https://dev.sitecore.net/Downloads/Sitecore_CLI/4x/Sitecore_CLI_421.aspx

## 動作確認

インストール後の動作確認として、以下のような手順で確認をしていきます。

1. コンテンツエディターを開きます
2. Sitecore - Content のアイテムを選択、右クリックします
3. 以下のようなダイアログが表示されれれば、SXA および Headless Rendering のインストールは完了しています

![install](/static/images/2022/08/install01.png)

4. sitecore - system - Settings - Services - API Keys の下に新しい API キーのアイテムを作成します
5. パブリッシュします
6. 作成した API を利用して、CM サーバー / CD サーバーの両方で API キーが有効になっていることを確認します

```
http://your-sitecore-instance/sitecore/api/layout/render/jss?item=/&sc_apikey=TEST
```

![install](/static/images/2022/08/install02.png)

7. Horizon を管理画面から起動することができるのを確認します。

上記が動けば、サーバーの準備は完了となります。

## まとめ

記事としては短いですが、ここがベースとなって今後進んでいきます。次回は、Docker コンテナを利用いしたいと思います。