import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MembersTableAction from "./members-table-action";

interface MembersTableProps {
  members: Array<{
    id: string;
    role: string | null;
    organizationId: string;
    user: { id: string; name: string; email: string; image: string | null };
  }>;
}

export default function MembersTable({ members }: MembersTableProps) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead className="w-[100px]">Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead className="text-right">Ação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell>
              <Avatar>
                <AvatarImage src={member.user.image ?? undefined} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell className="font-medium">{member.user.name}</TableCell>
            <TableCell>{member.user.email}</TableCell>
            <TableCell>{member.role}</TableCell>
            <TableCell className="text-right">
              <MembersTableAction
                organizationId={member.organizationId}
                memberIdOrEmail={member.user.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
