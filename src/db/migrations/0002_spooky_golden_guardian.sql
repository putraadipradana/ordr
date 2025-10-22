ALTER TABLE "order" RENAME TO "orders";--> statement-breakpoint
ALTER TABLE "materials" DROP CONSTRAINT "materials_order_id_order_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "order_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "materials" ADD CONSTRAINT "materials_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;