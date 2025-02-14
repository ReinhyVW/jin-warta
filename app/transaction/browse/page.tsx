"use client";

import dynamic from "next/dynamic";

const TableComponent = dynamic(() => import("./components/TransactionsTable"), { ssr: false });

export default function Page() {
  return <TableComponent />;
}
