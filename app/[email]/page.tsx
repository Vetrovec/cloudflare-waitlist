import { redirect } from "next/navigation";
import { getDB } from "../db";
import { UserDetails } from "../components/UserDetails";

export const runtime = "edge";

export default async function Email({ params }: { params: { email: string } }) {
  const email = decodeURIComponent(params.email);
  const row = await getDB()
    .selectFrom("Waitlist")
    .selectAll()
    .where("Email", "=", email)
    .executeTakeFirst();
  if (!row) {
    redirect("/?error=not-found");
  }
  return (
    <main className="h-full flex flex-col justify-center items-center gap-4">
      <UserDetails
        email={email}
        code={row.Code}
        createdAt={new Date(row.CreatedAt)}
      />
    </main>
  );
}
