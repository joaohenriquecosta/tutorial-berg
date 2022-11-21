import Head from "next/head";
import Layout from "../components/layout";

export default function Home(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Tutorial - HOME</title>
      </Head>
      <Layout>
        <h1>This is the HOME page</h1>
      </Layout>
    </div>
  );
}
