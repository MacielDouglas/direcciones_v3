"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddressFormData,
  addressFormFields,
  addressSchema,
} from "./address.schema";
import { startTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StepGps } from "./AddressSteps/steps/StepGps";

interface NewAddressProps {
  userId: string;
  organizationId: string;
}

export default function NewAddress({
  userId,
  organizationId,
}: NewAddressProps) {
  // const { control } = useFormContext<AddressFormData>();

  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      type: "House",
      street: "",
      number: "",
      neighborhood: "",
      latitude: 0,
      longitude: 0,
      image: "",
      info: "",
      businessName: "",
      active: true,
      confirmed: false,
      createdUserId: userId,
      organizationId: organizationId,
    },
    mode: "onChange",
  });

  console.log(organizationId);

  const onSubmit = (data: AddressFormData) => {
    console.log("SUCESSO:", data); // <-- Isso não está rodando
    startTransition(async () => {
      console.log("Foi aqui!!!", data);
    });
  };

  const onError = (errors: any) => {
    console.log("ERROS DE VALIDAÇÃO:", errors); // <-- Isso vai aparecer no console
  };

  const addressType = useWatch({
    control: form.control,
    name: "type",
    defaultValue: "House",
  });

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)}>
          <div>
            {addressFormFields.map((item) => {
              if (item.name === "businessName" && addressType === "House")
                return null;
              return item.type === "select" ? (
                <div key={item.name}>
                  {/* <p>{item.placeholder}</p> */}
                  <FormField
                    control={form.control}
                    name={item.name as keyof AddressFormData}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>{item.placeholder}</FormLabel>
                        <div className="flex gap-4 flex-wrap justify-center my-10">
                          {item.options?.map((opt) => {
                            const isSelected = field.value === opt.value;

                            return (
                              <FormControl key={opt.label}>
                                <Button
                                  variant={isSelected ? "default" : "outline"}
                                  key={opt.label}
                                  type="button"
                                  className="w-32"
                                  onClick={() => field.onChange(opt.value)}
                                >
                                  {opt.value}
                                </Button>
                              </FormControl>
                            );
                          })}
                        </div>
                        {/* <Input placeholder="Nova Organização" {...field} /> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : item.type === "text" ? (
                <div key={item.name}>
                  <FormField
                    control={form.control}
                    name={item.name as keyof AddressFormData}
                    render={({ field }) => (
                      <FormItem className="my-5">
                        <FormLabel>{item.label}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={item.placeholder}
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
                </div>
              ) : (
                <div key={item.name} className="flex justify-between gap-3">
                  {item.type === "input" &&
                    item.options?.map((opt) => (
                      <div key={opt.label}>
                        <FormField
                          control={form.control}
                          name={opt.value as keyof AddressFormData}
                          render={({ field }) => (
                            <FormItem className="my-5">
                              <FormLabel>{opt.label}</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={opt.label}
                                  value={String(field.value ?? "")}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                  onBlur={field.onBlur}
                                  name={field.name}
                                  ref={field.ref}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                </div>
              );
            })}
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Enviar dados GPS</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enviar dados GPS</DialogTitle>
                  <DialogDescription>
                    Criar uma nova organização.
                  </DialogDescription>
                </DialogHeader>
                <StepGps form={form} />
                {/* <CreateOrganizationForm /> */}
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-3 justify-between">
            <Button onClick={() => form.reset()}>Limpar Formulário</Button>

            <Button type="submit" className="btn-primary">
              Confirmar e Enviar
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
