import AppLayout from "@/components/app-layout";
import { BreadcrumbItem } from "@/types/index";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getOrders } from "@/server/orders";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Orders",
    href: "/orders",
  },
];

export const dynamic = "force-dynamic";

export default async function Page() {
  const orders = await getOrders();

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
              {orders && <DataTable columns={columns} data={orders} />}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
