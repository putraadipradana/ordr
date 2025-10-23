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
import { Checkbox } from "@/components/ui/checkbox";
import z from "zod";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteOrder } from "@/server/orders";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import Link from "next/link";
import { format } from "date-fns";

export const schema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  status: z.enum(["Done", "In Progress", "Not Started"]),
  priority: z.enum(["Low", "Medium", "High"]),
  amount: z.string(),
  createdAt: z.date(),
  user: z.object({
    name: z.string(),
  }),
});

export const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderNumber",
    header: "Order Number",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.orderNumber}</span>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
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
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return <span>{format(new Date(date), "dd MMMM, yyyy")}</span>;
    },
  },
  {
    accessorKey: "submited by",
    header: "Submited by",
    cell: ({ row }) => {
      const user = row.original.user;
      return <span>{user.name}</span>;
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
  const [deleteDialog, setDeleteDialog] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await deleteOrder(item.id);

      if (response.success) {
        toast.success("Order deleted successfully");
        router.refresh();
        setDeleteDialog(false);
      }
    } catch {
      toast.error("Failed to delete order");
    }
  };

  const copyOrderNumber = async () => {
    try {
      navigator.clipboard.writeText(item.orderNumber);
    } catch {
      toast.error("Failed to copy order number");
    } finally {
      toast.success("Copied");
    }
  };

  return (
    <>
      <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              order from our servers.
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
          <DropdownMenuItem onSelect={copyOrderNumber}>
            Copy order number
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/orders/${item.id}`} className="absolute inset-0" />
            Details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => setDeleteDialog(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
