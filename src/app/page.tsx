import { ModeToggle } from "@/components/mode-toggle";
import { getServerSession } from "@/lib/get-session";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession();
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 flex flex-col justify-center h-screen">
      <div className="fixed top-0 py-4 sm:py-6">
        <ModeToggle />
      </div>
      <div className="text-3xl sm:text-4xl font-bold">
        <div className="text-muted-foreground space-y-8">
          <div>
            <span className="text-foreground">Ordr</span> is the app for making
            an parts order and you can track your order here also.{" "}
          </div>
          {!session ? (
            <div>
              <p>
                If you already register you can{" "}
                <Link href={"/login"} className="hover:underline">
                  <span className="text-foreground">login</span>
                </Link>{" "}
                here.
              </p>
            </div>
          ) : (
            <div>
              <p>
                Its look like youre already login. Check your{" "}
                <Link href={"/dashboard"} className="hover:underline">
                  <span className="text-foreground">dashboard</span>
                </Link>{" "}
                here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
