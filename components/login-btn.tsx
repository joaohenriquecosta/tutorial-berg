import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton(): JSX.Element {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button
          className="text-1xl bg-blue-400 text-white font-bold py-1 px-4 rounded"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    );
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
