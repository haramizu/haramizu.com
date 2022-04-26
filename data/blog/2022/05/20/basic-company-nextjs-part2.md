---
title: Sitecore Helix の Next.js サンプルを動かす - コンテナを起動する
date: '2022-05-20'
tags: ['デモ', 'Next.js', 'Docker']
draft: true
summary: 前回は環境を準備するところまでとして、コンテナを起動することはありませんでした。今回は、サンプルを実行するためのスクリプト up.ps1 を参考にしながらどういう形でコンテナを起動することになるのかを確認していきます。
images: ['/static/images/2022/03/component06.gif']
---

前回はデモ環境の構築だけということで、準備が完了するところまでの紹介でした。今回は具体的に Sitecore の環境を立ち上げてデモが動くようにしたいと思います。

## インストール前の準備を進める

デモは Sitecore のコンテナを動かす際のデモと同様のスクリプトが `C:\projects\Helix.Examples\examples\helix-basic-nextjs` のフォルダに準備されています。

![sample](/static/images/2022/05/sample10.png)

ここで、init.ps1 を実行して、必要なプログラムのインストールそしてコンテナのダウンロードなどを進めていきます。

```ps1
.\init.ps1 -InitEnv -LicenseXmlPath "C:\projects\license\license.xml" -AdminPassword "DesiredAdminPassword"
```

実行すると以下のように環境のセットアップが進んでいきます。途中、NuGet の provider に関する質問が出てくるためここでは Yes を選択します。

![sample](/static/images/2022/05/sample11.png)

証明書ツールに関するダイアログが表示されますが、Yes を選択してください。

![sample](/static/images/2022/05/sample12.png)

しばらくすると、以下のような形でスクリプトが終了します。

![sample](/static/images/2022/05/sample13.png)

このスクリプトに記載している証明書へのパスを設定するために、表示されているコマンドをそのまま実行してください。

![sample](/static/images/2022/05/sample14.png)

一度、シェルスクリプトを終了させたあと反映されるため、この画面は一度閉じてください。これで準備が完了となりました。

## コンテナイメージのダウンロードと起動

上記まで設定が完了している状況で、以下のコマンドを実行するとコンテナのダウンロード、起動まで進めていきます。

```
.\up.ps1
```

イメージのダウンロードなども込みで、それなりに時間がかかりますのでのんびり終了するのを待ちましょう。

![sample](/static/images/2022/05/sample15.png)

実際に起動しているかどうかを確認したいと思います。

## まとめ

前回は環境の設定、今回は実際に Sitecore が起動するところまでの紹介となりました。次回は、どういう構成でデモサイトが動いているのかについて確認をしていきたいと思います。
