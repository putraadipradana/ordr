"use server"
import { db } from "@/db/drizzle"

export const getCustomers = async () => {
    const users = await db.query.user.findMany({
        columns: {
            id: true,
            name: true
        }
    })

    return users
}