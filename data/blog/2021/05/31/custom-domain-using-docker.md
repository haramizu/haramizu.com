---
title: Docker で展開しているサイトのドメイン名を変更する 
date: '2021-05-31'
lastmod: '2021-05-31'
tags: ['Sitecore','Demo']
draft: true
summary: Sitecore のデモの構築に関して2回ほど手順を紹介していきました。どちらの手順でも、Docker の環境ファイルとして .env ファイルに値が設定して動作するようにしています。今回は、この項目の変更として、ドメインに関する部分を変更する手順を紹介します。
images: ['/static/images/2021/05/openssl.png']
---

Sitecore のデモの構築に関して2回ほど手順を紹介していきました。どちらの手順でも、Docker の環境ファイルとして .env ファイルに値が設定して動作するようにしています。今回は、この項目の変更として、ドメインに関する部分を変更する手順を紹介します。

## ホスト名の変更

コンテナに割り当てているホスト名に関しては、以下の値で設定をしています。

```
CD_HOST=cd.lighthouse.localhost
CM_HOST=cm.lighthouse.localhost
ID_HOST=id.lighthouse.localhost
TS_HOST=ts.lighthouse.localhost
SH_HOST=sh.lighthouse.localhost
```

これを今回は、lighthouse.localhost をドメイン名に変更します。

```
CD_HOST=cd.cmsdemo.jp
CM_HOST=cm.cmsdemo.jp
ID_HOST=id.cmsdemo.jp
TS_HOST=ts.cmsdemo.jp
SH_HOST=sh.cmsdemo.jp
```

この値でアクセスすることができるように、 C:\windows\system32\drivers\etc\hosts のファイルも更新してください。

```
127.0.0.1	cd.cmsdemo.jp
127.0.0.1	sh.cmsdemo.jp
127.0.0.1	ts.cmsdemo.jp
127.0.0.1	cm.cmsdemo.jp
127.0.0.1	id.cmsdemo.jp
```

これで動作環境としてドメイン名の変更が完了しました。

## 証明書の割り当て

Docker では証明書のファイルは pfx 型式ではなく pem 型式にする必要があります。
init.ps1 で自動的に生成する証明書に関しては、Configure TLS/HTTPS certificates の項目でスクリプトで生成していることがわかります。

今回は、Let's Encrypt で作成しているワイルドカードの証明書を利用します。自己証明書で問題ない場合は、init.ps1 のスクリプトを参照しながら、ドメイン名飲み変更して作成してください。

まず、以下のフォルダに pfx 型式のファイルをコピーします。

* C:\projects\Sitecore.Demo.Platform\data\traefik\certs

pfx 型式から pem 型式に変更するために、openssl をインストールします。

```
choco install openssl
```

![openssl](/static/images/2021/05/openssl.png)

環境変数に openssl のコマンドのパスが記載されるので、一度ログインし直してください。

C:\projects\certs のフォルダを作成して、そこにワイルドカードの証明書をコピーして、次の手順で処理をしていきます。

```
PS C:\projects\certs> openssl pkcs12 -in cmsdemo20210302.pfx -clcerts -nokeys -out _wildcard.cmsdemo.jp.pem
Enter Import Password:
PS C:\projects\certs> openssl pkcs12 -in cmsdemo20210302.pfx -nocerts -nodes -out _wildcard.cmsdemo.jp-key.pem
Enter Import Password:
```

Import Password を聞いてくるときは、pfx 型式のファイルのパスワードを入力してください。

## 変更を反映させる

すでに実行している場合は、コンテナを停止させて、サンプルで提供されているスクリプトでデータを消去します。実際に実行している環境のデータは data フォルダに配置されているため、このデータを削除する形となります。

```
docker-compose down
.\CleanDockerData.ps1
```

続いて、事前に準備しておいた証明書のファイルを C:\projects\Sitecore.Demo.Platform\data\traefik\certs にコピーします。
これで準備が完了しました、コンテナを改めて起動して、データの初期化を待ってください。

```
docker-compose up -d 
docker-compose logs -f init
```

## 確認をする

実際に動かしている環境が動作しているのか、２つのサイトにアクセスをして確認をしてください。

* https://cd.cmsdemo.jp
* https://cm.cmsdemo.jp/sitecore 

上記の URL にアクセスをして参照することができ、かつ証明書が適用できていれば設定が完了した形となります。

## まとめ

今回はドメイン名を変更してインスタンスを立ち上げる手順を紹介しました。Wildcard に対応した証明書を利用しているので、同じドメイン名で設定をするのであれば簡単にできる形です。