"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

const formSchema = z.object({
  emails: z
    .array(
      z.object({
        address: z.string().email("Enter a valid email address."),
      })
    )
    .min(1, "Add at least one email address.")
    .max(5, "You can add up to 5 email addresses."),
});

export function InsertItemForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emails: [{ address: "" }, { address: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "emails",
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  return (
    <form id="form-rhf-array" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet className="gap-4 py-4">
        <FieldGroup className="gap-4">
          {fields.map((field, index) => (
            <Controller
              key={field.id}
              name={`emails.${index}.address`}
              control={form.control}
              render={({ field: controllerField, fieldState }) => (
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        {...controllerField}
                        id={`form-rhf-array-email-${index}`}
                        aria-invalid={fieldState.invalid}
                        placeholder="XX-XXXXX XXX-X"
                      />
                      {fields.length > 1 && (
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => remove(index)}
                            aria-label={`Remove email ${index + 1}`}
                          >
                            <XIcon />
                          </InputGroupButton>
                        </InputGroupAddon>
                      )}
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ address: "" })}
            disabled={fields.length >= 15}
          >
            Add Item
          </Button>
        </FieldGroup>
        {form.formState.errors.emails?.root && (
          <FieldError errors={[form.formState.errors.emails.root]} />
        )}
      </FieldSet>
    </form>
  );
}
