import AppLayout from "@/components/app-layout";
import { getOrderById } from "@/server/orders";
import { BreadcrumbItem } from "@/types";
import { DataTable } from "./data-table";
import { columns } from "./columns";

type Params = Promise<{
  orderId: string;
}>;

export default async function OrderPage({ params }: { params: Params }) {
  const { orderId } = await params;
  const { order } = await getOrderById(orderId);

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Orders",
      href: "/orders",
    },
    {
      title: `${order?.orderNumber}`,
      href: "/orders",
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6 space-y-4">
              <div>
                <div>{order?.name}</div>
                <div className="text-muted-foreground font-mono">
                  {order?.orderNumber}
                </div>
              </div>

              {order?.materials && (
                <DataTable
                  columns={columns}
                  data={order?.materials}
                  orderId={orderId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
