"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { AddressFormData, addressFormFields } from "../address.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export default function AddressFormFields() {
  const { control } = useFormContext<AddressFormData>();

  const type = useWatch({ control, name: "type" });

  return (
    <>
      {addressFormFields.map((item, index) => {
        if (
          item.kind === "text" &&
          item.name === "businessName" &&
          type === "House"
        ) {
          return null;
        }

        if (item.kind === "group") {
          return (
            <div key={index} className="flex gap-3 ">
              {item.fields.map((sub) => (
                <FormField
                  key={sub.name}
                  control={control}
                  name={sub.name}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{sub.label}</FormLabel>
                      <FormControl>
                        <Input
                          value={String(field.value ?? "")}
                          onChange={(e) => field.onChange(e.target.value)}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          );
        }

        if (item.kind === "select") {
          return (
            <FormField
              key={item.name}
              control={control}
              name={item.name}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>{item.label}</FormLabel>
                  <div className="flex gap-3 flex-wrap justify-center">
                    {item.options.map((opt) => (
                      <Button
                        key={opt.value}
                        type="button"
                        variant={
                          formField.value === opt.value ? "default" : "outline"
                        }
                        onClick={() => formField.onChange(opt.value)}
                        className="w-32"
                      >
                        {opt.label}
                      </Button>
                    ))}
                  </div>
                </FormItem>
              )}
            />
          );
        }

        if (item.kind === "switch") {
          return (
            <FormField
              key={item.name}
              control={control}
              name={item.name}
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel>{item.label}</FormLabel>
                  <FormControl>
                    <Switch
                      checked={Boolean(field.value)}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          );
        }
        if (item.name === "info") {
          return (
            <FormField
              key={item.name}
              control={control}
              name={item.name}
              render={({ field }) => {
                const length = String(field.value ?? "").length;
                const max = 300;
                const warning = max - length <= 20;

                return (
                  <FormItem>
                    <FormLabel>{item.label}</FormLabel>

                    <FormControl>
                      <Textarea
                        placeholder={item.placeholder}
                        maxLength={max}
                        value={String(field.value ?? "")}
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>

                    {/* CONTADOR */}
                    <div className="flex justify-end text-xs text-muted-foreground mt-1">
                      <span
                        className={
                          length >= max
                            ? "text-destructive"
                            : warning
                            ? "text-yellow-500"
                            : "text-muted-foreground"
                        }
                      >
                        {length}/{max}
                      </span>
                    </div>
                  </FormItem>
                );
              }}
            />
          );
        }

        return (
          <FormField
            key={item.name}
            control={control}
            name={item.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{item.label}</FormLabel>
                <FormControl>
                  <Input
                    value={String(field.value ?? "")}
                    onChange={(e) => field.onChange(e.target.value)}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        );
      })}
    </>
  );
}
