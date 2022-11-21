import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton(): JSX.Element {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <>
        Signed in as {session?.user?.email}
        <button
          className="text-1xl bg-blue-400 text-white font-bold py-1 px-4 rounded"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    );
  }

  if (status === "loading") {
    return <div className="bg-yellow-400 text-black text-2xl">Loading...</div>;
  }

  return (
    <>
      Not signed in <br />
      <button
        className="text-1xl bg-blue-400 text-white font-bold py-1 px-4 rounded"
        onClick={() => signIn("auth0")}
      >
        Sign in
      </button>
    </>
  );
}
