import { AddressFormData } from "./address.schema";

export const ADDRESS_TYPES = [
  "House",
  "Apartment",
  "Store",
  "Hotel",
  "Restaurant",
] as const;

export type AddressType = (typeof ADDRESS_TYPES)[number];

export const ADDRESS_TYPE_LABEL: Record<AddressType, string> = {
  House: "Casa",
  Apartment: "Apartamento",
  Store: "Loja",
  Hotel: "Hotel",
  Restaurant: "Restaurante",
};

// types para formulário

export type FieldName = keyof AddressFormData;

export type BaseField = {
  label: string;
  description?: string;
};

export type TextField = BaseField & {
  kind: "text";
  name: FieldName;
  placeholder?: string;
};

export type SelectField = BaseField & {
  kind: "select";
  name: FieldName;
  options: { value: string; label: string }[];
};

export type SwitchField = BaseField & {
  kind: "switch";
  name: FieldName;
};

export type GroupField = {
  kind: "group";
  fields: TextField[];
};

export type AddressFormField =
  | TextField
  | SelectField
  | SwitchField
  | GroupField;
