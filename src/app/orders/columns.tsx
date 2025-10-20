"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Circle,
  CircleCheck,
  MoreHorizontal,
  Timer,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import z from "zod";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteOrder } from "@/server/order";

export const schema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  status: z.enum(["Done", "In Progress", "Not Started"]),
  priority: z.enum(["Low", "Medium", "High"]),
  amount: z.string(),
  createdAt: z.date(),
});

export const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order Number",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.orderNumber}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="py-1 [&>svg]:size-3.5">
        {row.original.status === "Done" ? (
          <CircleCheck />
        ) : row.original.status === "In Progress" ? (
          <Timer />
        ) : (
          <Circle />
        )}
        <span className="capitalize">{row.original.status}</span>
      </Badge>
    ),
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => (
      <Badge variant="outline" className="py-1 [&>svg]:size-3.5">
        {row.original.priority === "High" ? (
          <ArrowUp />
        ) : row.original.priority === "Medium" ? (
          <ArrowRight />
        ) : (
          <ArrowDown />
        )}
        <span className="capitalize">{row.original.priority}</span>
      </Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat(["id"], {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(amount);

      return <span>{formatted}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <TableAction item={row.original} />;
    },
  },
];

function TableAction({ item }: { item: z.infer<typeof schema> }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await deleteOrder(item.id);

      if (response.success) {
        toast.success("Order deleted successfully");
        router.refresh();
        setIsOpen(false);
      }
    } catch {
      toast.error("Failed to delete order");
    }
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(item.orderNumber)}
          >
            Copy order number
          </DropdownMenuItem>
          <DropdownMenuItem>View item</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setIsOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
