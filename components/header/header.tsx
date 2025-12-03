import { getOrganizations } from "@/server/organizations";
import { OrganizationSwitcher } from "../organization-switcher";

export default async function Header() {
  const organizations = await getOrganizations();
  return (
    <div className="absolute top-0 right-0 flex justify-between items-center p-4 w-full">
      <h1>Header</h1>
      <OrganizationSwitcher organizations={organizations} />
    </div>
  );
}
