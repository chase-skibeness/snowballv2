import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Account, AccountSnapshot } from "../../types/types";

interface SnowballAmortizationTableProps {
  account: Account;
}

export function SnowballAmortizationTable({
  account,
}: SnowballAmortizationTableProps) {
  const snapshots = [new AccountSnapshot(new Date(), account)];
  const accountKeys = Object.keys(snapshots[0]).filter((key) => {
    switch (key) {
      case "date":
        return false;
      case "id":
        return false;
      case "totalDebt":
        return false;
      case "liabilities":
        return false;
      case "extraPayment":
        return false;
      case "snowballBonus":
        return false;
      case "sortType":
        return false;
      default:
        return true;
    }
  });

  // create next month
  // progress date forward one month
  // apply monthly interest to each principal
  // subtract

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
