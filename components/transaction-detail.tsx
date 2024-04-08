"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatToRupiah } from "@/lib/admin-actions";
import moment from "moment";
import Sharelink from "./sharelink";
import ReactPaginate from "react-paginate";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";

const TransactionDetail = ({ data }: { data: any }) => {
  const [page, setPage] = useState(0);
  const [filterData, setFilterData] = useState<any[]>([]);

  const n = 10;

  useEffect(() => {
    setFilterData(
      data.filter((item: any, index: any) => {
        return index >= page * n && index < (page + 1) * n;
      })
    );
  }, [data, page]);

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
            <TableHead className="text-center">Payment Url</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterData &&
            filterData.map((transaction: any) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>
                  {moment(transaction.updatedAt).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>{transaction.user.name}</TableCell>
                <TableCell>{transaction.user.telegramId}</TableCell>
                <TableCell>{formatToRupiah(transaction.price)}</TableCell>
                <TableCell>{transaction.status}</TableCell>
                <TableCell className="text-center">
                  <Sharelink link={transaction.snapRedirectUrl as string} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>
              <ReactPaginate
                containerClassName={"flex items-center justify-end mx-10"}
                activeClassName={"text-red-500"}
                pageClassName={"p-2 mx-2"}
                onPageChange={(event) => setPage(event.selected)}
                breakLabel="..."
                pageCount={Math.ceil(data.length / n)}
                previousLabel={
                  <div className="border p-2">
                    <ChevronLeft />
                  </div>
                }
                nextLabel={
                  <div className="border p-2">
                    <ChevronRight />
                  </div>
                }
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default TransactionDetail;
