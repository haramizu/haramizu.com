---
title: Content Hub - スクリプトを利用したメールの送信
date: '2020-10-10'
tags: ['Content Hub']
draft: true
summary: Sitecore Content Hub のメールテンプレートの利用して、スクリプトでメールを送信する手順を紹介しています。
images: ['/static/images/2020/10/emailtemplatebuild.png']
---

Sitecore Content Hub では、メールのテンプレートを利用することが可能です。また、スクリプトを利用してメールを制御することもできます。ここでは、既存のメールのテンプレートの利用方法を紹介します。

## メールアドレスの確認

以下の検証をするために、利用しているアカウントのメールアドレスを確認してください。管理者権限があれば、以下の手順で確認することができます。

1. `管理`のアイコンで管理ツールに移動します
2. `ユーザー` のツールをクリックします
3. 対象となるアカウントを開きます
4. `プロファイルの編集` をクリックします
5. `電子メール` に記載されているメールアドレスを変更します

上記の手順で、以下の手続きを確認することができます。

![メールアドレス確認](/static/images/2020/10/emailaddresscheck.gif "メールアドレス確認")

##  電子メールテンプレート

管理画面の項目として、`電子メールテンプレート` が用意されています。このツールを利用して、サイトで展開するメールのテンプレートを管理することができます。

![テンプレート一覧](/static/images/2020/10/emailtemplatelist.png "テンプレート一覧")

`Forgot password` のテンプレートを開くと以下のようになります。この画面では標準で設定されている英語のテンプレートを選択しています。

![パスワードリセット](/static/images/2020/10/forgotpassword.png "パスワードリセット")

実際にテストメールを送信する際には、テンプレートの右上にある `テストメールの送信` をクリックすると、該当するメールテンプレートを利用したメールの送信が実行されます。

![テストメール](/static/images/2020/10/sendtestmail.gif "テストメール")

## スクリプトを利用してメールの送信

Sitecore Content Hub のシステムの中で簡単に処理をすることができる仕組みとして、スクリプトが提供されています。ここでは C# のスクリプトを登録してみます。

### 新規スクリプトの登録

新しいスクリプトを登録する際には、管理画面から `スクリプト` を選択し、その上でスクリプトを登録していく形となります。手順としては以下の通りです。

1. 管理画面を開く
2. `スクリプト` を開く
3. 画面の右上にある `+ スクリプト` のボタンをクリックします
4. スクリプトの名前、タイプと概要を記載して保存します

上記の手順で、新しいスクリプトが作成されます。

![スクリプトの登録](/static/images/2020/10/createnewscript.gif "スクリプトの登録")

### テンプレート作成のコード

今回は、メールを送信するためのスクリプトを作成します（上記の Forget Password のメールを送ります）。参考にするページは以下の通りです。

* [通知クライアント](https://docs.stylelabs.com/ja-jp/contenthub/4.0.x/content/integrations/script-common-documentation/clients/notifications-client.html?rp=true&rv=true)
* [Notifications Client](https://docs.stylelabs.com/content/3.4.x/integrations/script-common-documentation/clients/notifications-client.html)

テンプレートを取得するのは、以下のコードになります。

```
IMailTemplate template = await client.Notifications.GetMailTemplateAsync("ForgotPassword");
```

この IMailTemplate に関しては、[メールテンプレート](https://docs.stylelabs.com/ja-jp/contenthub/4.0.x/content/integrations/sdk-common-documentation/strongly-typed-entities/mail-template.html?rp=true&rv=true) のように、namespace としては `Stylelabs.M.Sdk.Contracts.Notifications` を利用します。この namespace で定義されているインターフェイスなどは [Namespace Stylelabs.M.Sdk.Contracts.Notifications](https://docs.stylelabs.com/ja-jp/contenthub/4.0.x/content/api-reference/sdk/Stylelabs.M.Sdk.Contracts.Notifications.html?rp=true&rv=true) で定義されています。

前述のページでは、テンプレートを作成するためのサンプルコードも用意されています。今回はこれをベースのメールを作成します。

```
CultureInfo enUs = CultureInfo.GetCultureInfo("en-US");
IMailTemplate template = await client.EntityFactory.CreateAsync(Constants.MailTemplate.DefinitionName) as IMailTemplate;
template.Name = "Hello world template";
template.SetSubject(enUs, "Hello there!");
template.SetBody(enUs, "Hello {{Username}}!");
var templateVariable = new TemplateVariable
{
    Name = "Username",
    VariableType = TemplateVariableType.String
};

template.SetTemplateVariables(new[] { templateVariable });

await client.Entities.SaveAsync(template);
```

CultureInfo クラスは C# が標準で提供しているライブラリで、namespace としては System.Globalization となります。このため、コードとしては以下のようになります。

```
using System.Globalization;

using Stylelabs.M.Sdk;
using Stylelabs.M.Sdk.Models.Notifications;
using Stylelabs.M.Sdk.Contracts.Notifications;

CultureInfo enUs = CultureInfo.GetCultureInfo("en-US");
IMailTemplate template = await client.EntityFactory.CreateAsync(Constants.MailTemplate.DefinitionName) as IMailTemplate;
template.Name = "Hello world template";
template.SetSubject(enUs, "Hello there!");
template.SetBody(enUs, "Hello {{Username}}!");
var templateVariable = new TemplateVariable
{
    Name = "Username",
    VariableType = TemplateVariableType.String
};

template.SetTemplateVariables(new[] { templateVariable });

await client.Entities.SaveAsync(template);
```

上記のコードをそのまま登録するとどうなるでしょうか？以下の画面のように、ビルドを実行すると、 client の定義でエラーが表示されます。

![エラーが表示される](/static/images/2020/10/errorclientdoesnotexist.png "エラーが表示される")

Sitecore Content Hubスクリプトを実行する際には 2 つのオブジェクトが用意されています。MClient および Context です。今回はメールの送信をするので、MClient を利用します。なお、それぞれのプロパティに関しては以下のページで紹介しています。

* [スクリプトのプロパティ](hhttps://docs.stylelabs.com/ja-jp/contenthub/4.0.x/content/integrations/scripting-api/script-context-variables.html?rp=true&rv=true)

ということがわかれば、client と定義されている部分を MClient に書き換えて保存、ビルドを実行します。以下のコードはビルドに成功します。

```
using System.Globalization;

using Stylelabs.M.Sdk;
using Stylelabs.M.Sdk.Models.Notifications;
using Stylelabs.M.Sdk.Contracts.Notifications;

CultureInfo enUs = CultureInfo.GetCultureInfo("en-US");
IMailTemplate template = await MClient.EntityFactory.CreateAsync(Constants.MailTemplate.DefinitionName) as IMailTemplate;
template.Name = "Hello world template";
template.SetSubject(enUs, "Hello there!");
template.SetBody(enUs, "Hello {{Username}}!");
var templateVariable = new TemplateVariable
{
    Name = "Username",
    VariableType = TemplateVariableType.String
};

template.SetTemplateVariables(new[] { templateVariable });

await MClient.Entities.SaveAsync(template);
```

![ビルド成功](/static/images/2020/10/emailtemplatebuild.png "ビルド成功")

### メールの送信コード

続いてテンプレートを利用して、メールを送信するコードを確認します。改めて、以下のページを確認してください。

* [通知クライアント](https://docs.stylelabs.com/ja-jp/contenthub/4.0.x/content/integrations/script-common-documentation/clients/notifications-client.html?rp=true&rv=true)

メール送信のためのスクリプトが記載されています。コードは以下の通りです。

```
var request = new MailRequestBroadcast
{
    MailTemplateName = "Hello world template"
};
request.Variables.Add("Username", "world");

await client.Notifications.SendEmailNotificationAsync(request);
```

このコードはすでに作成したコードを利用して、以下のような処理をしています。

1. テンプレート名 *Hello world template* を指定
2. 変数として定義した *Username* に対して、*World* を割り当てています

これをテンプレート作成のコードの後ろにつけてください。もちろん、client に関しては変更する形となります。

```
using System.Globalization;

using Stylelabs.M.Sdk;
using Stylelabs.M.Sdk.Models.Notifications;
using Stylelabs.M.Sdk.Contracts.Notifications;

CultureInfo enUs = CultureInfo.GetCultureInfo("en-US");
IMailTemplate template = await MClient.EntityFactory.CreateAsync(Constants.MailTemplate.DefinitionName) as IMailTemplate;
template.Name = "Hello world template";
template.SetSubject(enUs, "Hello there!");
template.SetBody(enUs, "Hello {{Username}}!");
var templateVariable = new TemplateVariable
{
    Name = "Username",
    VariableType = TemplateVariableType.String
};

template.SetTemplateVariables(new[] { templateVariable });

await MClient.Entities.SaveAsync(template);

var request = new MailRequestBroadcast
{
    MailTemplateName = "Hello world template"
};
request.Variables.Add("Username", "world");

await MClient.Notifications.SendEmailNotificationAsync(request);
```

ビルドが成功したあとは、このスクリプトを利用できるように `公開` ボタンを押します。

![スクリプトの公開](/static/images/2020/10/scriptbuid.gif "スクリプトの公開")

## スクリプトの実行

今回はアセットの内容が変更された場合にトリガーが起動、指定したアクションを利用して、スクリプトを実行する形で、サンプルのメールを受け取るようにします。

### アクションの作成

作成したスクリプトを利用するために、今回はアセットが登録されたらメールが送信される、という形とトリガーとアクションに紐付けで動作確認を行います。トリガーとアクションに関しては、すでに紹介しているページがありますので参考にしてください。

* [トリガーとアクション](https://haramizu.com/blog/2020/03/24/sitecore-content-hub-trigger-action)

まず最初に、アクションで利用できるように、作成したスクリプトを有効にします。スクリプト一覧のページで、作成したばかりのスクリプトを参照すると、有効になっていないことがわかります。

![スクリプト一覧](/static/images/2020/10/demoscriptdisable.png "スクリプト一覧")

まずはスクリプトを選択できるように、有効にします。手順は簡単で、クリック一つです。

![スクリプト一覧](/static/images/2020/10/demoscriptenable.png "スクリプト一覧")

続いて、管理画面のアクションから、新規アクションを作成、今回作成したスクリプトを指定します。

![スクリプト一覧](/static/images/2020/10/createdemoaction.gif "スクリプト一覧")

これでアクションが出来上がりました。

### トリガーの作成

トリガーに関しては、簡単なルールで今回は処理するようにします。このため、テストが終わったタイミングでトリガー自体は無効にしてください。

まずトリガーの項目に関しては、以下画面のように新規のトリガーの基本項目を設定します。

![トリガー基本](/static/images/2020/10/triggerstandard.png "トリガー基本")

条件に関しては、新規にタクソノミーが追加された時、という処理にするため、*M.Tag* を選択、条件は特に設定しません。

![条件](/static/images/2020/10/triggercondision.png "アクション")

そしてアクションの項目に、先ほど作成をしたアクションを指定します。

![条件](/static/images/2020/10/triggeraction.png "アクション")

これで準備ができました。

### 実際にテストをする

今回は新しく M.Tag - タクソノミー に新規作成をすると、トリガーが起動して指定したアクション、アクションに設定されているスクリプトを動かす、ということになります。ということで、実際に新しくタクソノミーを実行します。アクションの監査を見ると、実行されていることがわかります。結果、メールボックスにもメールが届いています。

一連の動作は、以下の画像でデモをご覧いただけます。

![メール送信デモ](/static/images/2020/10/scriptsendemail.gif "メール送信デモ")

## まとめ

今回の記事では、スクリプトを作成、トリガーとアクションを組み合わせて、変更が発生したらメールを出すというサンプルまで紹介をしました。アクションはページに配置したボタンに対して適用することも可能なため、効率よく運用するための仕組みとして、スクリプトを作成するとより使いやすくなる、というイメージをもてたかと思います。

## 関連情報

* [通知クライアント](https://docs.stylelabs.com/ja-jp/contenthub/4.0.x/content/integrations/script-common-documentation/clients/notifications-client.html?rp=true&rv=true)
* [メール テンプレート](https://docs.stylelabs.com/ja-jp/contenthub/4.0.x/content/integrations/sdk-common-documentation/strongly-typed-entities/mail-template.html?rp=true&rv=true)
* [Namespace Stylelabs.M.Sdk.Contracts.Notifications](https://docs.stylelabs.com/ja-jp/contenthub/4.0.x/content/api-reference/sdk/Stylelabs.M.Sdk.Contracts.Notifications.html?rp=true&rv=true)
* [トリガーとアクション](https://haramizu.com/blog/2020/03/24/sitecore-content-hub-trigger-action)