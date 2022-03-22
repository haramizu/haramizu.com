---
title: Sitecore Horizon のインストール
date: '2022-03-23'
tags: ['Sitecore', 'Horizon']
draft: false
summary: これまで Sitecore の編集環境としてはコンテンツエディター、エクスペリエンスエディターと２つのツールを利用していました。全体を見渡すことができるコンテンツエディター、見たまま編集を実現するエクスペリエンスエディターという位置付けです。今回紹介をする Sitecore Horizon はその２つのいいところ取りの製品になります。
images: ['/static/images/2022/03/horizon07.png']
---

これまで Sitecore の編集環境としてはコンテンツエディター、エクスペリエンスエディターと２つのツールを利用していました。全体を見渡すことができるコンテンツエディター、見たまま編集を実現するエクスペリエンスエディターという位置付けです。今回紹介をする Sitecore Horizon はその２つのいいところ取りの製品になります。

## 前提条件

今回は以下の環境にインストールを進めていきます。

- Sitecore Experience Manager 10.2
- Sitecore Horizon 10.2

ドメインとしては、Sitecore の CM サーバーおよび Identity Server と同じサブドメインを割り当てるようにします。これは SameSite cookies に関しての条件があるためです。例としては以下のような感じです。

- Sitecore CM: https://cm.mycompany.com
- Sitecore identity: https://si.mycompany.com
- Horizon: https://horizon.mycompany.com

## インストール前の準備

Horizon は IIS の WebSocket Protocol を必要とします。このため、サーバーマネージャーから機能の追加をする必要があります。この機能は、IIS の機能として提供されているため、IIS 設定項目一覧に表示される WebSocket を設定してください。

![horizon](/static/images/2022/03/horizon01.png)

また Sitecore Horizon は以下のランタイムも必要とするため、インストールをしてください。

- [Asp.Net Core Runtime 2.2 Hosting Bundle](https://dotnet.microsoft.com/download/dotnet/2.2)

## インストール

まず最初に、以下の Web サイトからモジュールのダウンロードをしてください。

- [Sitecore Horizon 10.2.0](https://dev.sitecore.net/Downloads/Sitecore_Horizon/100/Sitecore_Horizon_1020.aspx)

今回は仮想マシンに対して適用するので以下のファイルとなります。

- Sitecore Horizon for On Premises deployment

ダウンロードした zip ファイルを `C:\projects\horizon` に展開します。

![horizon](/static/images/2022/03/horizon02.png)

展開後にある InstallHorizon.ps1 のファイルを編集していきます。設定項目は以下の通りです

+---------------------------+---------------------------------------+
| 項目 | 設定する値 |
+---------------------------+---------------------------------------+
| horizonInstanceName | インスタンスの名前を設定してください |
+---------------------------+---------------------------------------+
| sitecoreCmInstanceName | CM サーバーのインスタンス名 |
+---------------------------+---------------------------------------+
| sitecoreAdminPassword | 管理者のパスワード |
+---------------------------+---------------------------------------+
| identityServerPoolName | ID サーバーのアプリケーションプール名 |
+---------------------------+---------------------------------------+
| licensePath | ライセンスファイルのパス |
+---------------------------+---------------------------------------+
| enableContentHub | Content Hub とつなげる際には ture |
+---------------------------+---------------------------------------+
| enableSXA | SXA を利用する場合は true |
+---------------------------+---------------------------------------+
| [ValidateSet("XP", "XM")] | XP もしくは XM どちらかを残します |
+---------------------------+---------------------------------------+

設定が完了していれば、PowerShell を実行する形となります。この際、スクリプトに電子署名がされていないこともあり、環境によっては実行することができません。一時的に解除するために以下のコマンドを実行してください。

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Undefined -Force
```

これで動かすことができるようになります。以下のコマンドで実行をしてください。

```powershell
.\InstallHorizon.ps1
```

![horizon](/static/images/2022/03/horizon03.png)

途中、警告が出る場合でも R をクリックすることで進んでいきます。

![horizon](/static/images/2022/03/horizon04.png)

## 動作確認

インストール後に Sitecore の管理画面にログインをすると、Horizon のアイコンが追加されています。

![horizon](/static/images/2022/03/horizon05.png)

Horizon を起動すると、以下のような管理画面が表示されます。

![horizon](/static/images/2022/03/horizon06.png)

左側にコンテンツツリーではページ単位、コンテンツ単位での表示が可能です。また、右側にはアクションが表示され、編集する際には中央のエリアで編集をすることができます。また、プレビューの機能なども提供しています。使い方に関しては別途紹介するものを用意したいと思います。

## 追加の設定

### 管理画面の日本語化

管理画面は英語版となっていますが、以下のファイルを日本語のリソースに切り替えることで変更することができます。

`\sitecore\Sitecore.Horizon.Client\Client\dist\assets\i18n\en.json`

日本語リソースを適用した場合の管理画面は以下のようになります。

![horizon](/static/images/2022/03/horizon07.png)

### Sitecore Content Hub と連携をしている場合

新しいホスト名の上で Sitecore Content Hub と連携をさせることになります。このため CORS の設定を追加する必要があります。

1. **設定**を開く
2. **PortalConfiguration** - **CORSConfigration** を選択します
3. Horizon Editor が起動しているインスタンスを追加します
4. 保存します

これで Sitecore Content Hub との連携が完了しました。

![horizon](/static/images/2022/03/horizon08.png)

## まとめ

今回は Sitecore の新しい編集ツールとなる、Sitecore Horizon のインストール手順を紹介しました。コンテンツエディターとエクスペリエンスエディターのいいところ取りという感じで画面の遷移の回数を減らすことも可能です。
