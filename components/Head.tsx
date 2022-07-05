/* eslint-disable @next/next/no-page-custom-font */
import NextHead from 'next/head';

type P = { title: string; description: string };

function Head(params: P) {
  const { title, description } = params;

  return (
    <NextHead>
      <title>{`${title} | Hero Spin`}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400&family=Prata&family=Tajawal&display=swap" rel="stylesheet" />
    </NextHead>
  );
}
export default Head;
