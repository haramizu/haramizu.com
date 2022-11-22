---
title: XM Cloud Deploy プロジェクトの作成
date: '2022-11-29'
tags: ['XM Cloud', 'XM Cloud Deploy']
draft: false
summary: Sitecore XM Cloud の利用をする際の最初のツールとなる XM Cloud Deploy ツールを今回は紹介します。このツールを利用することで、GitHub のリポジトリと連携している Sitecore XM Cloud のプロジェクトを作成することができます。
images: ['/static/images/2022/11/deploy11.png']
---

Sitecore XM Cloud の利用をする際の最初のツールとなる XM Cloud Deploy ツールを今回は紹介します。このツールを利用することで、GitHub のリポジトリと連携している Sitecore XM Cloud のプロジェクトを作成することができます。

## プロジェクトの作成

XM Cloud Deploy の画面に移動をすると、すでに作成されているプロジェクト、新規にプロジェクトの作成ができる画面が用意されています。この作成できるプロジェクトの数は、XM Cloud の契約によって異なる形となります。

![deploy](/static/images/2022/11/deploy01.png)

`Create new project` をクリックすると、プロジェクト作成のダイアログが以下のように表示されます。

![deploy](/static/images/2022/11/deploy02.png)

画面ではテンプレートの数が表示されています。このブログを書いているときにはテンプレートが一つだけという形です。 `Start from a starter template` を選択して **Next** のボタンをクリックします。

![deploy](/static/images/2022/11/deploy03.png)

画面が切り替わると、プロジェクト名を設定する形になります。この名前は XM Cloud Deploy の画面で利用する名前となりますので、プロジェクトにあった名前を設定してください。

![deploy](/static/images/2022/11/deploy04.png)

次の画面では、ソースコードを展開するツールが表示されます。

![deploy](/static/images/2022/11/deploy05.png)

続いて接続先の GitHub のリポジトリが表示されます。一覧に表示されない場合は、`Create a new GitHub connection` をクリックして作成をします。現状は GitHub に対応している形ですので、`Continue with GitHub` をクリックして実行をします。

![deploy](/static/images/2022/11/deploy06.png)

続いて GitHub で管理するためのリポジトリの名前を設定して、プロジェクトの作成を進めていきます。

![deploy](/static/images/2022/11/deploy07.png)

最後に、今回の作成しているプロジェクトの中の環境の名前、リポジトリが更新されたらそれをもとにトリガーを動かすのかどうかを設定することができます。なお、今回は新規作成となるため main ブランチが更新されたときにトリガーが動く形となります。

![deploy](/static/images/2022/11/deploy08.png)

準備が完了です。ここで `Create and Deploy` をクリックすると、環境の構築が始まります。

![deploy](/static/images/2022/11/deploy09.png)

## 展開後の確認

まずプロジェクトを作成している途中で GitHub の Connection 、コード管理の対象の設定がありました。実際に GitHub のリポジトリを見にいくと、Private リポジトリが新しく作成されているのがわかります。

![deploy](/static/images/2022/11/deploy10.png)

しばらくすると、展開が完了して以下のような画面となります。右上に Launchpad のボタンが出てくるのでこれをクリックすると、Sitecore の管理画面に入ることができます。

![deploy](/static/images/2022/11/deploy11.png)

右上に Launchpad のボタンが出てくるのでこれをクリックすると、Sitecore の管理画面に入ることができます。

![deploy](/static/images/2022/11/deploy12.png)

## まとめ

今回は XM Cloud Deploy の管理画面から新しいプロジェクトの作成、および最初のインスタンスの起動まで紹介をしました。Sitecore の CMS に関して、特にインストール作業はなく、かつテンプレートを使ったサイトの起動に関しても完了しています。SaaS ならではの便利な展開方法という形になります。

上記の内容をダイジェストで紹介している動画を YouTube にアップしています。参考にしてください。

[![](https://img.youtube.com/vi/NEIqE7haIdk/0.jpg)](https://www.youtube.com/watch?v=NEIqE7haIdk)
