import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Account, Liability, SortType } from "../../types/types";

interface SnowballAmortizationTableProps {
  account: Account;
}

function highAPRSortFunc(a: Liability, b: Liability) {
  if (a.apr > b.apr) return 1;
  else return -1;
}

function highMinPaymentSortFunc(a: Liability, b: Liability) {
  if (a.minPayment > b.minPayment) return 1;
  else return -1;
}

function lowPrincipalSortFunc(a: Liability, b: Liability) {
  if (a.principal < b.principal) return 1;
  else return -1;
}

function ratioSortFunc(a: Liability, b: Liability) {
  const ratioA = a.minPayment / a.principal;
  const ratioB = b.minPayment / b.principal;

  if (ratioA > ratioB) return 1;
  else return -1;
}

class AccountSnapshot extends Account {
  [key: string]: any;
  "date": Date | string;

  constructor(
    date: Date,
    { liabilities, totalDebt, extraPayment, snowballBonus }: Account,
  ) {
    super();
    this.date = `${date.getMonth() + 1}/${date.getFullYear()}`;
    switch (this.sortType) {
      case SortType.highAPR:
        this.liabilities = liabilities.sort(highAPRSortFunc);
      case SortType.highMinPayment:
        this.liabilities = liabilities.sort(highMinPaymentSortFunc);
      case SortType.lowPrincipal:
        this.liabilities = liabilities.sort(lowPrincipalSortFunc);
      case SortType.lowPrincipalPaymentRatio:
        this.liabilities = liabilities.sort(ratioSortFunc);
      default:
        this.liabilities = liabilities.sort(lowPrincipalSortFunc);
    }
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
