import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Company</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to Company</h1>
        <p>Next.js와 Express로 구축한 웹 애플리케이션입니다.</p>
      </main>
    </div>
  );
}