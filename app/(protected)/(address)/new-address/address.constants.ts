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
