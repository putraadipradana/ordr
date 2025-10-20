import AppLayout from "@/components/app-layout";
import { BreadcrumbItem } from "@/types/index";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Orders",
    href: "/orders",
  },
];
export default function Page() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
              <div>This is users page</div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
