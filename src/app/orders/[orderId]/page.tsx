import AppLayout from "@/components/app-layout";
import { getOrderById } from "@/server/orders";
import { BreadcrumbItem } from "@/types";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

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
              {order && (
                <div className="flex flex-col sm:flex-row sm:space-y-0 space-y-2 items-center sm:items-start justify-between py-4">
                  <div className="text-center sm:text-left">
                    <div className="text-lg">{order?.name}</div>
                    <div className="text-muted-foreground font-mono">
                      {order?.orderNumber}
                    </div>
                  </div>
                  <div className="sm:text-right text-center">
                    <div className="font-mono text-muted-foreground text-sm">
                      {format(new Date(order?.createdAt), "dd MMM yyy")}
                    </div>
                  </div>
                </div>
              )}

              <Separator />

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
