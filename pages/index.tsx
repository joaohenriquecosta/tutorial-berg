import Head from "next/head";
import Nav from "../components/nav";
import LoginBtn from "../components/login-btn";

export default function Home(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Tutorial Berg</title>
      </Head>

      <Nav />

      <LoginBtn />
    </div>
  );
}
