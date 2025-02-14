"use client";

import { useEffect, useState } from "react";

import type { Selection } from "@heroui/react";
import {
  Button, DateInput, Input,
  Select, SelectItem
} from "@heroui/react";

import { SignOutButton } from "@clerk/nextjs";

import { DateValue, parseDate, getLocalTimeZone, today } from "@internationalized/date";

type SelectData = {
  id: number,
  label: string
}

export default function CreateTransactionPage() {
  const [transactionTypes, setTransactionTypes] = useState<SelectData[]>([]);

  getLocalTimeZone()
  const [date, setDate] = useState<DateValue | null>(parseDate(today(getLocalTimeZone()).toString()));
  const [transactionType, setTransactionType] = useState<Selection>(new Set([]));
  const [worldOrder, setWorldOrder] = useState<string>("");
  const [congregationExpenses, setCongregationExpenses] = useState<string>("");
  const [extraDescription1, setExtraDescription1] = useState<string>("");
  const [extraAmount1, setExtraAmount1] = useState<string>("");
  const [extraDescription2, setExtraDescription2] = useState<string>("");
  const [extraAmount2, setExtraAmount2] = useState<string>("");
  const [extraDescription3, setExtraDescription3] = useState<string>("");
  const [extraAmount3, setExtraAmount3] = useState<string>("");
  const [total, setTotal] = useState<string>("");
  const [filledBy, setFilledBy] = useState<string>("");
  const [verifiedBy, setVerifiedBy] = useState<string>("");

  useEffect(() => {
    const getTransactionTypes = async () => {
      const response = await fetch("/api/transaction-types");
      const result = await response.json();
      setTransactionTypes(result.data);
    }

    getTransactionTypes();
  }, [])

  useEffect(() => {
    setTotal(String(Number(worldOrder) + Number(congregationExpenses) + Number(extraAmount1) + Number(extraAmount2) + Number(extraAmount3)))
  }, [worldOrder, congregationExpenses, extraAmount1, extraAmount2, extraAmount3])

  const saveTransaction = async () => {
    const selectedTransactionType = Array.from(transactionType)[0]

    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date?.toString(),
          transaction_type: selectedTransactionType,
          world_order: worldOrder,
          congregation_expenses: congregationExpenses,
          extra_description1: extraDescription1,
          extra_amount1: extraAmount1,
          extra_description2: extraDescription2,
          extra_amount2: extraAmount2,
          extra_description3: extraDescription3,
          extra_amount3: extraAmount3,
          total: total,
          filled_by: filledBy,
          verified_by: verifiedBy,
        })
      })
      const transactionReceiptUrl = await response.json()
      window.open(transactionReceiptUrl.data, "_blank");
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-8" aria-label="Transaction Form Container">
      <form className="flex flex-col gap-4 w-1/3 mx-4" aria-label="Transaction Form">
        <h1 className="text-4xl font-bold">Create new Transaction</h1>
        <DateInput
          value={date}
          onChange={setDate}
          isRequired
          label="Date"
          labelPlacement="inside"
        />
        <Select label="Transaction Type" placeholder="Select a transaction type" selectedKeys={transactionType} onSelectionChange={setTransactionType}>
          {
            transactionTypes.map((type) => (
              <SelectItem key={type.id} aria-label={type.label}>{type.label}</SelectItem>
            ))
          }
        </Select>

        <Input label="World Order" placeholder="$ 1'000.000" value={worldOrder} onValueChange={setWorldOrder} type="number" />
        <Input label="Congregation Expenses" placeholder="$ 2'000.000" value={congregationExpenses} onValueChange={setCongregationExpenses} type="number" />

        <div className="flex gap-2">
          <Input label="Extra Description 1" placeholder="Cash Deposit" value={extraDescription1} onValueChange={setExtraDescription1} />
          <Input label="Extra Amount 1" placeholder="$ 2'000.000" value={extraAmount1} onValueChange={setExtraAmount1} type="number" />
        </div>
        <div className="flex gap-2">
          <Input label="Extra Description 2" placeholder="Cash Deposit" value={extraDescription2} onValueChange={setExtraDescription2} />
          <Input label="Extra Amount 2" placeholder="$ 2'000.000" value={extraAmount2} onValueChange={setExtraAmount2} type="number" />
        </div>
        <div className="flex gap-2">
          <Input label="Extra Description 3" placeholder="Cash Deposit" value={extraDescription3} onValueChange={setExtraDescription3} />
          <Input label="Extra Amount 3" placeholder="$ 2'000.000" value={extraAmount3} onValueChange={setExtraAmount3} type="number" />
        </div>

        <Input label="Total" placeholder="$ 3'000.000" isRequired value={total} type="number" isDisabled />

        <Input label="Filled By" placeholder="Account Servant" isRequired value={filledBy} onValueChange={setFilledBy} />
        <Input label="Verified By" placeholder="Cashier" isRequired value={verifiedBy} onValueChange={setVerifiedBy} />

        <div className="flex gap-2">
          <Button color="primary" className="max-w-xs w-full" size="lg" onPress={saveTransaction}>Create Transaction</Button>
          <Button color="secondary" className="max-w-xs w-full" size="lg">Restart</Button>
        </div>
      </form>

      <SignOutButton>
        <Button color="danger" className="max-w-xs w-full" size="lg">
          Sign Out
        </Button>
      </SignOutButton>
    </div>
  );
}
