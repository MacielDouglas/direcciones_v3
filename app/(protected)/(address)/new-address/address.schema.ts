import { z } from "zod";
import { ADDRESS_TYPES, AddressFormField } from "./address.constants";
import { sanitizeAddressInfo } from "./address.sanitizer";

export const addressSchema = z.object({
  type: z.enum(ADDRESS_TYPES),
  street: z.string().min(2, "Rua muito curta"),
  number: z.string().min(1, "Obrigatório"),
  neighborhood: z.string().min(2, "Bairro obrigatório"),
  city: z.string().min(3, "Cidade obrigatória"),
  latitude: z
    .number()
    .min(-90, "Latitude inválida")
    .max(90, "Latitude inválida"),
  longitude: z
    .number()
    .min(-180, "Longitude inválida")
    .max(180, "Longitude inválida"),
  image: z.string().optional(),
  info: z
    .string()
    .max(300)
    .optional()
    .transform((val) => {
      if (!val) return val;
      return sanitizeAddressInfo(val);
    }),

  businessName: z.string().max(40).optional(),
  active: z.boolean().default(true),
  confirmed: z.boolean().default(false),
  organizationId: z.string().min(10),
  createdUserId: z.string(),
});

export type AddressFormData = z.infer<typeof addressSchema>;

export const addressFormFields: AddressFormField[] = [
  {
    kind: "select",
    name: "type",
    label: "Tipo de endereço",
    options: [
      { value: "House", label: "Casa" },
      { value: "Apartment", label: "Apartamento" },
      { value: "Store", label: "Loja" },
      { value: "Hotel", label: "Hotel" },
      { value: "Restaurant", label: "Restaurante" },
    ],
  },

  {
    kind: "text",
    name: "businessName",
    label: "Nome do estabelecimento",
    placeholder: "Ex: Hotel Verde Mar",
  },

  {
    kind: "text",
    name: "street",
    label: "Rua",
    placeholder: "Ex: Rua Enseada dos Corais",
  },

  {
    kind: "group",
    fields: [
      {
        kind: "text",
        name: "number",
        label: "Número",
      },
      {
        kind: "text",
        name: "neighborhood",
        label: "Bairro",
      },
    ],
  },

  {
    kind: "text",
    name: "city",
    label: "Cidade",
    placeholder: "Ex: Ipojuca",
  },

  {
    kind: "text",
    name: "info",
    label: "Informações adicionais",
    placeholder: "Apto 10, casa amarela",
  },

  {
    kind: "switch",
    name: "active",
    label: "Endereço ativo",
  },

  {
    kind: "switch",
    name: "confirmed",
    label: "Endereço confirmado",
  },
];
