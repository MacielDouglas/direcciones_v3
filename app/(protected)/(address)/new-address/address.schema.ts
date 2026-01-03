import { z } from "zod";
import { ADDRESS_TYPES } from "./address.constants";

export const addressSchema = z.object({
  type: z.enum(ADDRESS_TYPES),
  street: z.string().min(2, "Rua muito curta"),
  number: z.string().min(1, "Obrigatório"),
  neighborhood: z.string().min(2, "Bairro obrigatório"),
  city: z.string().min(3, "Cidade obrigatória"),
  latitude: z.number(),
  longitude: z.number(),
  image: z.string().optional(),
  info: z.string().max(250).optional(),
  businessName: z.string().max(40).optional(),
  active: z.boolean().default(true),
  confirmed: z.boolean().default(false),
  organizationId: z.string().min(10),
  createdUserId: z.string(),
});

export type AddressFormData = z.infer<typeof addressSchema>;

export const addressFormFields = [
  {
    name: "type",
    label: "Tipo",
    placeholder: "Elija el tipo de negocio.",
    type: "select",
    options: [
      { value: "House", label: "Casa" },
      { value: "Apartment", label: "Apartamento" },
      { value: "Store", label: "Tienda" },
      { value: "Hotel", label: "Hotel" },
      { value: "Restaurant", label: "Restaurante" },
    ],
  },
  {
    name: "businessName",
    label: "Nombre de la empresa",
    placeholder: "Ej. Hotel Verde Mar",
    type: "text",
  },
  {
    name: "street",
    label: "Calle",
    placeholder: "Ej. Rua: Enseada dos corais",
    type: "text",
  },
  {
    name: "DuoInput",
    label: "Input",
    placeholder: "Dos inputs texto",
    type: "input",
    options: [
      {
        value: "number",
        label: "Número",
      },
      {
        value: "neighborhood",
        label: "Vecindario o Barrio",
      },
    ],
  },
  {
    name: "city",
    label: "Ciudad",
    placeholder: "Ej. Ipojuca",
    type: "text",
  },
  {
    name: "info",
    label: "Información adicional",
    placeholder: "Ej. Apto 10 o Casa amarilla",
    type: "text",
  },
  {
    name: "active",
    label: "Active",
    placeholder: "Direccción activa.",
    type: "switch",
  },
  {
    name: "confirmed",
    label: "Confirmado",
    placeholder: "Esta dirección esta confirmada?",
    type: "switch",
  },
];
