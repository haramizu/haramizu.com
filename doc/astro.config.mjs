// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import starlightBlog from 'starlight-blog';
import starlightImageZoom from 'starlight-image-zoom';

const GTM_ID = process.env.GTM_ID;

// https://astro.build/config
export default defineConfig({
  site: 'https://doc.haramizu.com',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'Haramizu.com',
      defaultLocale: 'root',
      editLink: {
        baseUrl: 'https://github.com/haramizu/haramizu.com/edit/main/doc/',
      },
      social: {
        github: 'https://github.com/haramizu/haramizu.com',
        'x.com': 'https://x.com/haramizu',
        linkedin: 'https://www.linkedin.com/in/haramizu/',
      },
      locales: {
        root: {
          label: '日本語',
          lang: 'ja',
        },
        en: {
          label: 'English',
          lang: 'en',
        },
      },
      sidebar: [
        {
          label: 'About',
          autogenerate: { directory: 'about' },
        },
        {
          label: 'Cloud Portal',
          collapsed: true,
          autogenerate: { directory: 'cloud-portal' },
        },
        // {
        //   label: 'Stream',
        //   collapsed: true,
        //   autogenerate: { directory: 'stream' },
        // },
        {
          label: `Content`,
          collapsed: true,
          items: [
            {
              label: `XM Cloud`,
              collapsed: true,
              items: [
                {
                  label: '基礎',
                  translations: {
                    en: 'Fundamentals',
                  },
                  collapsed: true,
                  autogenerate: { directory: 'xmc' },
                },
                {
                  label: '開発者',
                  translations: {
                    en: 'Developer',
                  },
                  collapsed: true,
                  autogenerate: { directory: 'xmcdeveloper' },
                },
              ],
            },
            {
              label: 'Content Hub',
              collapsed: true,
              autogenerate: { directory: 'ch' },
            },
            {
              label: 'Search',
              collapsed: true,
              autogenerate: { directory: 'search' },
            },
          ],
        },
        {
          label: `Engamenent`,
          collapsed: true,
          items: [
            {
              label: 'CDP + Personalize 概要',
              translations: {
                en: 'CDP + Personalize Overview',
              },
              link: 'cdp-personalize/overview',
            },
            {
              label: 'Personalize',
              collapsed: true,
              autogenerate: { directory: 'personalize' },
            },
            {
              label: 'CDP',
              collapsed: true,
              autogenerate: { directory: 'cdp' },
            },
            {
              label: 'Moosend / Send',
              collapsed: true,
              autogenerate: { directory: 'send' },
            },
          ],
        },
        // {
        //   label: 'Connect',
        //   collapsed: true,
        //   autogenerate: { directory: 'connect' },
        // },
        {
          label: `Technologies`,
          collapsed: true,
          items: [
            {
              label: 'Tools',
              collapsed: true,
              autogenerate: { directory: 'tools' },
            },
            {
              label: 'Frameworks',
              collapsed: true,
              items: [
                {
                  label: 'Next.js',
                  collapsed: true,
                  autogenerate: { directory: 'nextjs' },
                },
                {
                  label: 'Astro',
                  collapsed: true,
                  autogenerate: { directory: 'astro' },
                },
              ],
            },
            // {
            //   label: 'Hosting',
            //   collapsed: true,
            //   items: [
            //     {
            //       label: 'Vercel',
            //       collapsed: true,
            //       autogenerate: { directory: 'vercel' },
            //     },
            //     {
            //       label: 'Netlify',
            //       collapsed: true,
            //       autogenerate: { directory: 'netlify' },
            //     },
            //   ],
            // },
          ],
        },
        {
          label: 'Update',
          collapsed: true,
          autogenerate: { directory: 'update' },
        },
      ],
      head: [
        {
          tag: 'script',
          attrs: {
            async: true,
            src: `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`,
          },
        },
        {
          tag: 'script',
          content: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        },
      ],
      customCss: ['./src/tailwind.css'],
      plugins: [starlightBlog(), starlightImageZoom()],
      lastUpdated: true,
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});

