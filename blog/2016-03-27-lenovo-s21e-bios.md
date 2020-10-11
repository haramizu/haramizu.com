---
title: Lenovo s21e の BIOS を操作してみる
author: Shinichi Haramizu
author_title: Sitecore Japan
author_url: https://haramizu.jp/
author_image_url: https://avatars3.githubusercontent.com/u/5026348?s=400&v=4
tags: [Gadget]
description: 色々と基本機能を評価した後は他の使い道を考えたいということで、Ubuntu でも動かしてみようか？ということでまずは USB からブートする環境を作りたいと思います。そのためには、BIOS の設定を変更する必要があります。
slug: 2016/03/27/lenovo-s21e-bios
---

色々と基本機能を評価した後は他の使い道を考えたいということで、Ubuntu でも動かしてみようか？ということでまずは USB からブートする環境を作りたいと思います。そのためには、BIOS の設定を変更する必要があります。

<!--truncate-->

BIOS を立ち上げるには、電源が切れている状況で Fn キーと ESC キーを押しながら電源を入れると以下のような画面が起動します。

![](img/2016/03/img_1897.jpg "")

もちろん選択するのは BIOS setup の項目ですね。選んだら ENTER を押します。すると次の画面に。 

![](img/2016/03/img_1898.jpg "")

右のほうにある boot のメニューを開いて boot mode を選んでENTERを押すと、選択肢として legacy support の項目が出ます。

![](img/2016/03/img_1899.jpg "")

選択すると項目が変更されていることがわかります。これでexit を選択して設定を保存すれば普通のUSBブートもできるようになります。

Fn キーを押しながら F12キーを押すと、以前と違ってブートのメニューが増えていることがわかります。

![](img/2016/03/img_1900.jpg "")

これで USB メモリからブートできるようになりました。いろいろと遊べる形ですね。

