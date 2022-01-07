import classNames from 'classnames';
import NextHeadSeo from 'next-head-seo';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import SITE from '../site.config';
import getOgImageUrl from '../utils/getOgImageUrl';

function Container({ children, padding = false, className = '', ...meta }) {
  const router = useRouter();
  const root = useMemo(() => router.pathname === '/', [router]);
  const siteUrl = useMemo(() => {
    if (meta?.from === 'profile') {
      return meta.id ? `${SITE.link}/profile/${meta.id}` : SITE.link;
    }
    if (meta?.from === 'plan') {
      return meta.id ? `${SITE.link}/plan/${meta.id}` : SITE.link;
    }
    if (meta?.from === 'group') {
      return meta.id ? `${SITE.link}/group/${meta.id}` : SITE.link;
    }
    return SITE.link;
  }, [meta]);

  const siteTitle = useMemo(() => meta.title ?? SITE.title, [meta]);

  return (
    <div>
      <NextHeadSeo
        canonical={siteUrl}
        customMetaTags={[
          {
            charSet: 'UTF-8',
          },
          {
            property: 'og:locale',
            content: SITE.lang,
          },
          {
            name: 'keywords',
            content: SITE.seo.keywords.join(', '),
          },
          {
            property: 'twitter:image',
            content: getOgImageUrl({
              title: siteTitle,
              root,
              twitter: true,
            }),
          },
        ]}
        description={meta.description}
        og={{
          title: meta.title,
          url: siteUrl,
          type: meta.type ?? 'website',
          description: meta.description,
          image: getOgImageUrl({
            title: siteTitle,
            root,
            twitter: false,
          }),
        }}
        robots="index, follow"
        title={meta.title}
        twitter={{
          card: 'summary_large_image',
        }}
      />
      <main
        className={classNames(
          'w-full flex flex-col m-auto bg-black min-h-screen',
          className,
          {
            'px-4 md:px-8': padding,
          },
        )}
      >
        {children}
      </main>
    </div>
  );
}

export default Container;
