/* eslint-disable @next/next/no-page-custom-font */
import NextHead from 'next/head';

type P = { title: string; meta: string };

function Head(params: P) {
  const { title, meta } = params;

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={meta} />
      <link rel="icon" href="/favicon.ico" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400&family=Prata&family=Tajawal&display=swap" rel="stylesheet" />
    </NextHead>
  );
}
export default Head;
