import AddressSteps from "./AddressSteps/AddressSteps";

export default function NewAddressPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-6">
      <h1 className="mb-6 text-xl font-semibold">Novo endereço</h1>
      <AddressSteps />
    </main>
  );
}
