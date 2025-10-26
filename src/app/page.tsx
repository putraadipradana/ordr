import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 flex flex-col justify-center items-center h-screen">
      <div className="fixed top-0 py-4 w-full max-w-7xl sm:py-6 px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-end">
          <ModeToggle />
        </div>
      </div>
      <div>
        <Button className="relative">
          <Link href={"/dashboard"} className="absolute inset-0" />
          Dashboard
        </Button>
      </div>
    </div>
  );
}
