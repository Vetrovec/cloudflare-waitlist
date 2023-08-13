import { redirect } from "next/navigation";
import { getDB } from "../db";
import UserDetails from "../components/UserDetails";
import { SubmitEmailError } from "../constants/enums";

export const runtime = "edge";

interface EmailProps {
  params: {
    email: string;
  };
  searchParams: {
    error?: string;
  };
}

export default async function Email({ params, searchParams }: EmailProps) {
  const welcomeEmailError =
    searchParams["error"] === SubmitEmailError.emailFailed;
  const email = decodeURIComponent(params.email);
  const row = await getDB()
    .selectFrom("waitlist_entries")
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();
  if (!row) {
    redirect(`/?error=${SubmitEmailError.notFound}`);
  }
  return (
    <main className="grid h-full">
      <div className="flex p-10 justify-center items-center">
        <UserDetails
          welcomeEmailError={welcomeEmailError}
          email={email}
          referralCode={row.code}
          createdAt={new Date(row.created_at)}
        />
      </div>
    </main>
  );
}
