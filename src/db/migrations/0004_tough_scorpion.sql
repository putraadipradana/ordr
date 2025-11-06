CREATE TYPE "public"."material_status" AS ENUM('Suplied', 'Order');--> statement-breakpoint
ALTER TABLE "materials" ADD COLUMN "status" "material_status" DEFAULT 'Order' NOT NULL;