import { AddressFormData } from "@/app/(protected)/(address)/new-address/address.schema";
import prisma from "../prisma";

export async function createAddress(data: AddressFormData) {
  return prisma.address.create({
    data: {
      type: data.type,
      street: data.street,
      number: data.number,
      neighborhood: data.neighborhood,
      latitude: data.latitude,
      longitude: data.longitude,
      active: data.active,
      confirmed: data.confirmed,
      businessName: data.businessName || null,
      createdUserId: data.createdUserId,
      organizationId: data.organizationId,
      image: data.image.imageUrl,
      info: data.info,
    },
  });
}
