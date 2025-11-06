"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Circle,
  CircleCheck,
  Timer,
} from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import z from "zod";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { format } from "date-fns";
import { TableActions } from "./_components/table-actions";

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
      <DataTableColumnHeader column={column} title="Priority" />
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
    header: "Created at",
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
      return <TableActions item={row.original} />;
    },
  },
];
