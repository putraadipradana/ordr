import AppLayout from "@/components/app-layout";
import { getOrderById } from "@/server/orders";
import { BreadcrumbItem } from "@/types";

type Params = Promise<{
  orderId: string;
}>;

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Orders",
    href: "/orders",
  },
  {
    title: "Order by ID",
    href: "/orders",
  },
];

export default async function OrderPage({ params }: { params: Params }) {
  const { orderId } = await params;
  const { order } = await getOrderById(orderId);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div>
        <h1>{order?.name}</h1>
      </div>
    </AppLayout>
  );
}
