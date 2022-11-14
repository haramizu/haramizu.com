---
title: XM Cloud Deploy プロジェクトの作成
date: '2022-11-29'
tags: ['XM Cloud', 'XM Cloud Deploy']
draft: false
summary: Sitecore XM Cloud の利用をする際の最初のツールとなる XM Cloud Deploy ツールを今回は紹介します。このツールを利用することで、GitHub のリポジトリと連携している Sitecore XM Cloud のプロジェクトを作成することができます。
images: ['/static/images/2022/11/portal01.png']
---

Sitecore XM Cloud の利用をする際の最初のツールとなる XM Cloud Deploy ツールを今回は紹介します。このツールを利用することで、GitHub のリポジトリと連携している Sitecore XM Cloud のプロジェクトを作成することができます。

## プロジェクトの作成

XM Cloud Deploy の画面に移動をすると、すでに作成されているプロジェクト、新規にプロジェクトの作成ができる画面が用意されています。この作成できるプロジェクトの数は、XM Cloud の契約によって異なる形となります。

![deploy](/static/images/2022/11/deploy01.png)

Create new Project をクリックすると、以下のようにダイアログが表示されます。

![deploy](/static/images/2022/11/deploy02.png)

今回は **Start from a starter template** を選択して **Next** のボタンをクリックします。

![deploy](/static/images/2022/11/deploy03.png)

画面ではテンプレートの数が表示されています。現状はまだテンプレートが一つだけという形ですので、選択をして Next をクリックします。画面が切り替わると、プロジェクト名を設定する形になります。この名前は XM Cloud Deploy の画面で利用する名前となりますので、プロジェクトにあった名前を設定してください。

![deploy](/static/images/2022/11/deploy04.png)

次の画面では、ソースコードを展開するツールが表示されます。

![deploy](/static/images/2022/11/deploy05.png)

現状は GitHub に対応している形ですので、Continue with GitHub をクリックして実行をします。続いて接続先の GitHub のリポジトリが表示されます。一覧に表示されない場合は、Create a new GitHub connection をクリックして作成をします。

![deploy](/static/images/2022/11/deploy06.png)

リポジトリの名前を作成して、プロジェクトの作成を完了させます。

![deploy](/static/images/2022/11/deploy07.png)

![deploy](/static/images/2022/11/deploy08.png)

準備が完了です。ここで Create and Deploy をクリックすると、環境の構築が始まります。

![deploy](/static/images/2022/11/deploy09.png)

## 展開後の確認

![deploy](/static/images/2022/11/deploy10.png)

![deploy](/static/images/2022/11/deploy11.png)

## まとめ

今回は XM Cloud Deploy の管理画面から新しいプロジェクトの作成、および最初のインスタンスの起動まで紹介をしました。Sitecore の CMS に関して、特にインストール作業はなく、かつテンプレートを使ったサイトの起動に関しても完了しています。SaaS ならではの便利な展開方法という形になります。

上記の内容をダイジェストで紹介している動画を YouTube にアップしています。

[![](https://img.youtube.com/vi/NEIqE7haIdk/0.jpg)](https://www.youtube.com/watch?v=NEIqE7haIdk)
