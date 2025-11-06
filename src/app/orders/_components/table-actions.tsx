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
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";
import z from "zod";
import { useState } from "react";
import { deleteOrder } from "@/server/orders";
import { toast } from "sonner";
import { Drawer } from "@/components/ui/drawer";
import EditOrderForm from "@/components/forms/edit-order-form";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { schema } from "../columns";

export function TableActions({ item }: { item: z.infer<typeof schema> }) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editSheet, setEditSheet] = useState(false);

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
      <Drawer
        open={editSheet}
        onOpenChange={setEditSheet}
        direction={isMobile ? "bottom" : "right"}
      >
        <EditOrderForm />
      </Drawer>

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
          <DropdownMenuItem onSelect={() => setEditSheet(true)}>
            Edit
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
