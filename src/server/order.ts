"use server"

import { db } from "@/db/drizzle";
import { InsertOrder, order } from "@/db/schema";
import { eq } from "drizzle-orm"

export const createOrder = async (values: InsertOrder) => {
    try {
        await db.insert(order).values(values)
        return { success: true, message: "Order created successfully" };
    } catch {
        return { success: false, message: "Failed to create order" };
    }
}

export const getOrders = async () => {
    const orders = await db.query.order.findMany({
        columns: {
            id: true,
            orderNumber: true,
            name: true,
            amount: true,
            status: true,
            priority: true,
            createdAt: true
        },
    })

    return orders
}

export const deleteOrder = async (id: string) => {
    await db.delete(order).where(eq(order.id, id))

    return { success: true, message: "Order deleted" }
}