---
title: Headstart デモ環境を構築する - Part 6 Sendgrid にサンプルのメールを設定する
date: '2022-02-09'
tags: ['Sitecore','OrderCloud']
draft: true
summary: Sitecore Headstart のデモは Sendgrid を利用してメールを送信する形で構築されています。この部分は将来的には Sitecore Send に置き換えることも可能ですが、現状では Sendgrid のメールをセットアップしておくことでいくつかのメールが自動的に動くようになっています。今回はこれのセットアップに関して説明をします。
images: ['/static/images/2022/02/sendgrid08.png']
---

Sitecore Headstart のデモは Sendgrid を利用してメールを送信する形で構築されています。この部分は将来的には Sitecore Send に置き換えることも可能ですが、現状では Sendgrid のメールをセットアップしておくことでいくつかのメールが自動的に動くようになっています。今回はこれのセットアップに関して説明をします。

## Sendgrid のアカウントを用意する

メールサービスとして Sendgrid と連携することができるようになっており、これも設定ファイルにキーを記載することで利用できるようになります。

```
  "SendGridSettings:ApiKey": "",
  "SendgridSettings:FromEmail": "",
  "SendgridSettings:CriticalSupportEmails": "",
  "SendgridSettings:SupportCaseEmail": "",
  "SendgridSettings:BillingEmail": "",
  "SendgridSettings:OrderSubmitTemplateID": "",
  "SendgridSettings:OrderApprovalTemplateID": "",
  "SendgridSettings:LineItemStatusChangeTemplateID": "",
  "SendgridSettings:QuoteOrderSubmitTemplateID": "",
  "SendgridSettings:NewUserTemplateID": "",
  "SendgridSettings:ProductInformationRequestTemplateID": "",
  "SendgridSettings:PasswordResetTemplateID": "",
  "SendgridSettings:CriticalSupportTemplateID": "",
```

上記の項目を順に設定をしていきます。

### ApiKey 

この項目は、Sendgrid の管理画面 Settings - API Keys の画面に移動をして新規に作成をすることで生成されます。

![OrderCloud](/static/images/2022/02/sendgrid01.png)

Create API Key のボタンを押すと以下の画面となります。

![OrderCloud](/static/images/2022/02/sendgrid02.png)

新しく生成された API キーが画面に表示されますが、このキーはこの時のみ表示されます。コピーをして保存してください。

### メールアドレスの設定

以下の項目には、実際に利用するメールアドレスを設定してください。

```
  "SendgridSettings:FromEmail": "",
  "SendgridSettings:CriticalSupportEmails": "",
  "SendgridSettings:SupportCaseEmail": "",
  "SendgridSettings:BillingEmail": "",
```

### メールテンプレートの登録

以下の項目にはメールテンプレートを登録して、その ID を記載する必要があります。

```
  "SendgridSettings:OrderSubmitTemplateID": "",
  "SendgridSettings:OrderApprovalTemplateID": "",
  "SendgridSettings:LineItemStatusChangeTemplateID": "",
  "SendgridSettings:QuoteOrderSubmitTemplateID": "",
  "SendgridSettings:NewUserTemplateID": "",
  "SendgridSettings:ProductInformationRequestTemplateID": "",
  "SendgridSettings:PasswordResetTemplateID": "",
  "SendgridSettings:CriticalSupportTemplateID": "",
```

メールのテンプレートは、以下のフォルダにサンプルが入っています。

src/Middleware/src/Headstart.Common/Assets/EmailTemplates

作成方法は以下の通りです。

1. Email API メニューを開く
2. Dynamic Templates を開く
3. Create a Dynamic Template をクリックする
4. テンプレート名を入力する

![OrderCloud](/static/images/2022/02/sendgrid03.png)

5. 作成されたテンプレートに Add Version のボタンをクリックする

![OrderCloud](/static/images/2022/02/sendgrid04.png)

6. Blank Template を選択する

![OrderCloud](/static/images/2022/02/sendgrid05.png)

7. Code Editor を選択する

![OrderCloud](/static/images/2022/02/sendgrid06.png)

8. コードをペーストする

![OrderCloud](/static/images/2022/02/sendgrid07.png)

9. 保存して画面に戻る

![OrderCloud](/static/images/2022/02/sendgrid08.png)

これで１つのテンプレートの登録が完了となります。サンプルの HTML を登録して ID を設定してください。

## Azure App Configuration にアップロードする

上記の設定ファイルを Azure の環境にインポートをします。これで Sendgrid に関する設定が完了となります。

