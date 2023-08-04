import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Account, Liability } from "../../types/types";

interface SnowballAmortizationTableProps {
  account: Account;
}

class AccountSnapshot extends Account {
  [key: string]: any;
  "date": Date;

  constructor(
    date: Date,
    { liabilities, totalDebt, extraPayment, snowballBonus }: Account,
  ) {
    super();
    this.date = date;
    this.liabilities = liabilities;
    this.totalDebt = totalDebt;
    this.extraPayment = extraPayment;
    this.snowballBonus = snowballBonus;
  }
}

export function SnowballAmortizationTable({
  account,
}: SnowballAmortizationTableProps) {
  const firstSnapshot = new AccountSnapshot(new Date(), account);
  firstSnapshot.liabilities.forEach((liability) => {
    firstSnapshot[liability.name] = liability.principal;
  });
  console.log(firstSnapshot);
  return (
    <DataTable value={account.liabilities}>
      <Column field="name" header="Account Name" />
      <Column field="principal" header="Total Owed" />
      <Column field="minPayment" header="Payment Per Month" />
      <Column field="aprStr" header="Interest Rate" />
    </DataTable>
  );
}
