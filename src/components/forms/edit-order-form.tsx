"use client";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function EditOrderForm() {
  return (
    <DrawerContent>
      <DrawerHeader className="gap-1">
        <DrawerTitle>Edit order</DrawerTitle>
        <DrawerDescription>Edit Your Order</DrawerDescription>
      </DrawerHeader>
      <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
        <Separator />
      </div>
      <DrawerFooter>
        <Button type="submit" form="create-order-form">
          Update order
        </Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
}
