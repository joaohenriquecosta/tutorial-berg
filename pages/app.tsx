import Head from "next/head";
import Layout from "../components/layout";

export default function App(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Tutorial - APP</title>
      </Head>
      <Layout>
        <h1>This is the APP page</h1>
      </Layout>
    </div>
  );
}
