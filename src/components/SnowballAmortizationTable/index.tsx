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
    liabilities.forEach((liability) => {
      this[liability.name] = liability.principal;
    });
  }
}

export function SnowballAmortizationTable({
  account,
}: SnowballAmortizationTableProps) {
  const snapshots = [new AccountSnapshot(new Date(), account)];
  const accountKeys = Object.keys(snapshots[0]).filter((key) => {
    switch (key) {
      case "date":
        return false;
      case "totalDebt":
        return false;
      case "liabilities":
        return false;
      case "extraPayment":
        return false;
      case "snowballBonus":
        return false;
      default:
        return true;
    }
  });

  return (
    <DataTable value={snapshots}>
      <Column field="date" header="Month / Year" />
      {accountKeys.map((accountKey) => (
        <Column field={accountKey} header={accountKey} key={accountKey} />
      ))}
      <Column field="totalDebt" header="Total Owed" />
      <Column field="extraPayment" header="Extra Payment Per Month" />
      <Column field="snowballBonus" header="Snowball Bonus" />
    </DataTable>
  );
}
