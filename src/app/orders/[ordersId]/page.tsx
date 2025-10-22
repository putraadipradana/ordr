import AppLayout from "@/components/app-layout";
// import { getOrderById } from "@/server/order";
import { BreadcrumbItem } from "@/types";

// type Params = Promise<{
//   orderId: string;
// }>;

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

export default async function OrderPage() {
  // const { order } = await getOrderById(orderId);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div>
        test
        {/* <h1>{order?.name}</h1> */}
      </div>
    </AppLayout>
  );
}
