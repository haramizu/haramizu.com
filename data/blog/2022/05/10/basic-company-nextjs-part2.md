---
title: Sitecore Helix の Next.js サンプルを動かす - デモ環境の構築
date: '2022-05-10'
tags: ['デモ', 'Next.js']
draft: true
summary: 前回はデモ環境の構築だけということで、準備が完了するところまでの紹介でした。今回は具体的に Sitecore の環境を立ち上げてデモが動くようにしたいと思います。
images: ['/static/images/2022/03/component06.gif']
---

前回はデモ環境の構築だけということで、準備が完了するところまでの紹介でした。今回は具体的に Sitecore の環境を立ち上げてデモが動くようにしたいと思います。

## インストール前の準備を進める

デモは Sitecore のコンテナを動かす際のデモと同様のスクリプトが `C:\projects\Helix.Examples\examples\helix-basic-nextjs` のフォルダに準備されています。

![sample](/static/images/2022/05/sample09.png)

ここで、init.ps1 を実行して、必要なプログラムのインストールそしてコンテナのダウンロードなどを進めていきます。

```powershell
.\init.ps1 -InitEnv -LicenseXmlPath "C:\projects\license\license.xml" -AdminPassword "DesiredAdminPassword"
```

実行すると以下のように環境のセットアップが進んでいきます。途中、証明書ツールに関するダイアログが表示されますが、Yes を選択してください。

![sample](/static/images/2022/05/sample10.png)

しばらくすると、以下のような形で手続きが完了となります。

![sample](/static/images/2022/05/sample11.png)

これで準備が完了となりました。

## コンテナイメージのダウンロードと起動

上記まで設定が完了している状況で、以下のコマンドを実行するとコンテナのダウンロード、起動まで進めていきます。

```
.\up.ps1
```
