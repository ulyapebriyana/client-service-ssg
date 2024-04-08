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
import { formatToRupiah, getAllTransactions } from "@/lib/admin-actions";
import moment from "moment";
import Sharelink from "./sharelink";

const TransactionDetail = async () => {
  const transactions = await getAllTransactions();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="">Transaction Id</TableHead>
            <TableHead className="">Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Telegram Id</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment Url</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{transaction.id}</TableCell>
              <TableCell>
                {moment(transaction.updatedAt).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell>{transaction.user.name}</TableCell>
              <TableCell>{transaction.user.telegramId}</TableCell>
              <TableCell>{formatToRupiah(transaction.price)}</TableCell>
              <TableCell>{transaction.status}</TableCell>
              <TableCell>
                <Sharelink link={transaction.snapRedirectUrl as string} />
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

export default TransactionDetail;
