import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Account, AccountSnapshot } from "../../types/types";
import { useEffect, useState } from "react";

interface SnowballAmortizationTableProps {
  account: Account;
}

export function SnowballAmortizationTable({
  account,
}: SnowballAmortizationTableProps) {
  const [snapshots, setSnapshots] = useState<AccountSnapshot[]>([]);
  const [accountKeys, setAccountKeys] = useState<string[]>([]);

  useEffect(() => {
    if (account.liabilities.length >= 1) {
      const firstMonth = {
        date: new Date(),
        dateStr: `${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
        ...account,
      } as AccountSnapshot;
      firstMonth.liabilities.forEach((liability) => {
        firstMonth[liability.name] = liability.principal;
      });
      const __snapshots = [firstMonth];
      while (__snapshots[__snapshots.length - 1].totalDebt > 0) {
        const prevSnapshot = __snapshots[__snapshots.length - 1];
        __snapshots.push(new AccountSnapshot(prevSnapshot.date, prevSnapshot));
      }
      setSnapshots(__snapshots);
      setAccountKeys(
        Object.keys(__snapshots[0]).filter((key) => {
          switch (key) {
            case "date":
              return false;
            case "dateStr":
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
        }),
      );
    }
  }, [account]);

  return (
    <DataTable value={snapshots} scrollable scrollHeight="90%">
      <Column field="dateStr" header="Month / Year" />
      {accountKeys.map((accountKey) => (
        <Column field={accountKey} header={accountKey} key={accountKey} />
      ))}
      <Column field="totalDebt" header="Total Owed" />
      <Column field="extraPayment" header="Extra Payment Per Month" />
      <Column field="snowballBonus" header="Snowball Bonus" />
    </DataTable>
  );
}
