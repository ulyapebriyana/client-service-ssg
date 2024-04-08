"use client";

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
import moment from "moment";
import ReactPaginate from "react-paginate";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";

const MemberDetail = ({ data }: { data: any }) => {
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
            <TableHead className="">Name</TableHead>
            <TableHead>Telegram Id</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead className="text-right">Expire Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterData &&
            filterData.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{member.name}</TableCell>
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

export default MemberDetail;
