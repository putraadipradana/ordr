import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth.api.getSession;
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 flex flex-col justify-center items-center h-screen">
      <div className="fixed top-0 py-4 sm:py-6">
        <ModeToggle />
      </div>
      {!session ? (
        <div className="flex items-center space-x-2">
          <Button>
            <Link href={"/login"} className="absolute inset-0" />
            Login
          </Button>
          <Button variant={"outline"}>
            <Link href={"/signup"} className="absolute inset-0" />
            Sign up
          </Button>
        </div>
      ) : (
        <div>
          <Button>
            <Link href={"/dashboard"} className="absolute inset-0" />
            Dashboard
          </Button>
        </div>
      )}
    </div>
  );
}
