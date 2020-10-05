module.exports = {
  title: 'Shinichi Haramizu',
  tagline: '原水のメモサイト',
  url: 'https://www.haramizu.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'haramizu', // Usually your GitHub org/user name.
  projectName: 'haramizu.com', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: '原水商店',
      logo: {
        alt: '原水商店',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: '技術メモ',
          position: 'left',
        },
        {to: 'blog', label: 'ブログ', position: 'left'},
        {
          href: 'https://github.com/haramizu/haramizu.com',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '技術メモ',
          items: [
            {
              label: 'Sitecore',
              to: 'docs/Sitecore/',
            },
            {
              label: 'Docusaurus',
              to: 'docs/Docusaurus',
            },
            {
              label: 'Netlify',
              to: 'docs/Netlify/',
            },
          ],
        },
        {
          title: 'コミュニティ',
          items: [
            {
              label: '個人サイト',
              href: 'https://haramizu.jp',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/haramizu',
            },
          ],
        },
        {
          title: 'その他',
          items: [
            {
              label: 'ブログ',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/haramizu/haramizu.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Shinichi Haramizu, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/haramizu/haramizu.com/edit/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/haramizu/haramizu.com/edit/main/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
