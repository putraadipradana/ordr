import AppLayout from "@/components/app-layout";
import { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Customers",
    href: "/customers",
  },
];

export default function Page() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">This is customers page</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
