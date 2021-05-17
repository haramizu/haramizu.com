---
title: Content Hub - シングルサインオンの検証
date: '2020-10-14'
tags: ['Content Hub']
draft: false
summary: Sitecore Content Hub にログインをして利用する際に、シングルサインオンの仕組みとの連携が可能となっています。ここでは、SSOCircle の仕組みを利用して、実際にシングルサインオンに関する検証手順について紹介をしています。
images: ['/static/images/2020/10/ssocirclemetadata1.png']
---

Sitecore Content Hub にログインをして利用する際に、シングルサインオンの仕組みとの連携が可能となっています。ここでは、SSOCircle の仕組みを利用して、実際にシングルサインオンに関する検証手順について紹介をしています。

## SSOCircle を利用して検証

今回は SSOCircle を利用することで、簡単に SAML 認証に関して検証をすることができます。

* [SSOCircle](https://www.ssocircle.com/en/)

### アカウントの作成

初めて利用する際にはアカウントを作成してください。

![ユーザー登録](/static/images/2020/10/ssocircleregist.gif "ユーザー登録")

登録を完了したあと、しばらくすると登録ユーザーのメールアドレスに、Activation のための URL が記述されたメールが送信されます。メールに含まれている URL をクリックすることで、アカウントがアクティベーションされます。

![Activation](/static/images/2020/10/ssocircleactivate.png "Activation")

アカウントが有効になったところで、実際にログインをしてください。

![ログイン](/static/images/2020/10/ssocirclelogin.gif "ログイン")

ログインができれば、アカウントの作成は完了となります。

### Meta data の登録

サービスプロバイダーに関する設定を進めていきます。ログインをしている画面の左側のメニューに `Manage Metadata` の項目があります。クリックをすると以下の画面になります。

![Manage Metadata](/static/images/2020/10/ssocirclemanagemetadata.png "Manage Metadata")

今回はサービスプロバイダーを追加するために、一番上に表示されている `Add new Service Provider` の項目をクリックしてください。

![登録画面](/static/images/2020/10/ssocirclemetadata1.png "登録画面")

この画面で表示されている内容としては、以下の 2 をまず入力してください。

* **FQDN** Sitecore Content Hub の FQDN を入力してください
* **Attributes sent in assertition** UserID と EmailAddresss の２つの項目をチェックしてください。

![登録画面](/static/images/2020/10/ssocirclemetadata2.gif "登録画面")

下に記載されている SAML Metaデータを提供する必要がありますが、このコードを生成する手順は画面に記載されている you can build it here をクリックすると画面が切り替わります。

画面が切り替わったところで、以下の２つの項目を入力するように表示されます。

* EntityID 
* ACS URL

EntityID にはサーバーの URL を入力してください。この際、最後に / を設定する必要があります。続いて ACS URL に関しては、EntityID の URL に対して、AuthServices/Acs を追加した URL を入力します。上記２つの項目を入力したあと、insert のボタンをクリックすると、Meta データが完成します。

出来上がったメタデータを、元のページに登録して、Submit ボタンを押すと、手続きが完了となります。

![メタデータ作成](/static/images/2020/10/ssocirclemetadata3.gif "メタデータ作成")

これで SSOCircle の設定が完了です

## Sitecore Content Hub の環境の準備

以下の手順で認証に関する仕組みを変更していきます。

### ログインモードを Active から Passive に変更

Sitecore Content Hub のサンドボックス環境では、標準で提供されているシングルサインオンのみで動作する形で展開されることがあります。

この設定を変更するために、以下の手順でパラメーターを変更してください。

1. 管理ツール *Manage* を開きます
2. 設定を確認する *Settings* を開きます
3. 検索ボックスに *Auth* と入力すると、PortalConfiguration の項目の下にある Authentication を見つけることができます
4. Authentication を開きます
5. 表示モードを Tree から Text に変更をします
6. `authentication_mode` が *Active* になっている場合、*Passive* に変更します

これにより、ログアウトをするとログインボックスが表示されるようになります。`authentication_mode` がすでに Passive になっている場合は、変更せずに次に進みます。

![Passive](/static/images/2020/10/ssopassivemode.gif "Passive")

設定を変更すると、ログインのダイアログが表示されるようになります。

![ログイン画面](/static/images/2020/10/ssologinbox.gif "ログイン画面")

### 管理者でログインができるか確認をする

管理者としてログインできるアカウントを作成します。すでに管理者として上記の画面からログインをしている場合は、この手順をパスすることができます。アカウントの作成、パスワードの設定に関しては、別途後日紹介をします。

### SSOCircle の設定を反映させる

すでに設定されている認証の設定を変更して、検証のための SSOCircle の設定に変更をしていきます。改めて Authentication の設定画面に移動して、コードを見ると以下のようになっています。

```Json
"Providers": [
  {
    "$type": "Stylelabs.M.Portal.Authentication.SamlAuthenticationProviderConfigurator, Stylelabs.M.Portal",
    "metadata_location": "https://stylelabs.eu.auth0.com/samlp/metadata/JyVO5bQjk6n3mrUJnUZ02vMuA1K4MiaY",
    "sp_entity_id": "urn:stylelabs.eu.auth0.com",
    "idp_entity_id": "urn:stylelabs.eu.auth0.com",
    "provider_name": "SSO",
    "authentication_mode": "Passive",
    "module_path": "AuthServices",
    "is_enabled": true
  }
],
```

この設定で提供されているログイン画面は以下の通りです。

![ログイン画面](/static/images/2020/10/ssologinbox1.png "ログイン画面")

SSOCircle と連携してログインの仕組みを利用するために、パラメーターに関しては以下の項目を変更します。

| パラメーター      | 値                                     |
|-------------------|----------------------------------------|
| metadata_location | https://idp.ssocircle.com/meta-idp.xml |
| sp_entity_id      | インスタンスの URL を記載します        |
| idp_entity_id     | SSOCircle のサイトから取得します       |
| provider_name     | SSOCircle に名前を変更します           |

idp_entity_id の値を取得するためには、*metadata_location* の URL にアクセスをして、XML の１行目に記載されている ipd_entity_id を引用する形となります。ここでは以下の値となりました。

![EntityID](/static/images/2020/10/ssoentityid.gif "EntityID")

結果、以下のパラメータを設定します。

| パラメーター      | 値                                      |
|-------------------|-----------------------------------------|
| metadata_location | https://idp.ssocircle.com/meta-idp.xml  |
| sp_entity_id      | https://jpntraining09.stylelabs.io/      |
| idp_entity_id     | https://idp.ssocircle.com               |
| provider_name     | SSOCircle                               |

```Json
{
  "$type": "Stylelabs.M.Portal.Authentication.SamlAuthenticationProviderConfigurator, Stylelabs.M.Portal",
  "metadata_location": "https://idp.ssocircle.com/meta-idp.xml",
  "sp_entity_id": "https://jpntraining09.stylelabs.io/",
  "idp_entity_id": "https://idp.ssocircle.com",
  "provider_name": "SSOCircle",
  "authentication_mode": "Passive",
  "module_path": "AuthServices",
  "is_enabled": true
}
```

また、SSOCircle と連携させるためには、以下の3つの項目を変更してください。

```Json
  "UsernameClaimType": "UserID",
  "EmailClaimType": "EmailAddress",
  "PostSignOutRedirectUrl": "/en-us/account",
```

![設定](/static/images/2020/10/ssosetssocircle.gif "設定")

設定が完了したあと、ログアウトをすると以下のようにログインボックスにボタンが追加されています。

![ログイン画面](/static/images/2020/10/ssologinbox2.png "ログイン画面")

## シングルサインオンの検証

シングルサインオンの検証をするために、SSOCircle にログインをしているブラウザがある場合は、ログオフをしてください（無料プランの場合は制限があるため）。

1. ログイン画面で、SSOCircle のボタンをクリックします
2. SSOCircle のログイン画面が表示されます
3. 事前に作成していたアカウントでログインをします
4. Sitecore Content Hub にログインできます

ログインをした段階では一般ユーザーの権限のみとなっているため、ユーザーの権限に関してはログイン後設定をしてください。

![ログイン](/static/images/2020/10/ssosignin.gif "ログイン")

## まとめ

今回はシングルサインオンの実装の検証、ということで SSOCircle を利用して、SSOCircle で作成したアカウントでログインができることを確認しました。実際の SSO の実装の場合は、利用している仕組みに合わせた実装をしていただく必要があります。

## 参考サイト

* [SSO](https://docs.stylelabs.com/content/3.4.x/user-documentation/administration/security/authentication/SSO.html)
* [SSO management](https://docs.stylelabs.com/content/3.4.x/integrations/web-sdk/sso-management.html)