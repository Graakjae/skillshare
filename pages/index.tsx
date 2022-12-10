import type { NextPage } from "next";
import Head from "next/head";
import Users from "./users";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Impact Skillshare</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex"></meta>
      </Head>

      <main>
        <Users />
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
