import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMemberDetail } from "@/lib/admin-actions";
import moment from "moment";

const MemberDetail = async () => {
  const members = await getMemberDetail();

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>A list of your recent membership.</TableCaption>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead>Telegram Id</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead className="text-right">Expire Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">
                {member.name}
              </TableCell>
              <TableCell>{member.telegramId}</TableCell>
              <TableCell>
                {moment(member.createdAt).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell className="text-right">
                {moment(member.expireAt).format("DD/MM/YYYY")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default MemberDetail;
