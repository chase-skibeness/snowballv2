import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import AccountsForm from "../components/AccountsForm";
import { SnowballAmortizationTable } from "../components/SnowballAmortizationTable";
import { Account, Liability } from "../types/types";

function App() {
  const [account, setAccount] = useState<Account>(new Account());

  useEffect(() => {
    if (account.liabilities.length > 0) {
      const _account = account;
      _account.totalDebt = account.liabilities
        .map((liability) => liability.principal)
        .reduce((prev, curr) => (curr += prev));
    }
  }, [account]);

  console.log(account);
  return (
    <div className="flex w-screen h-screen">
      <Card title="Account Input" className="w-3 m-2">
        <AccountsForm account={account} setAccount={setAccount} />
      </Card>

      <Card title="Snowball Amoritization" className=" w-9 m-2">
        <div>
          <div className="flex justify-content-evenly w-full">
            <h2>Total Debt: {account.totalDebt}</h2>
            <h2>Extra Payment Per Month: {account.extraPayment}</h2>
          </div>
          <Card className="flex flex-column gap-2">
            <SnowballAmortizationTable account={account} />
          </Card>
        </div>
      </Card>
    </div>
  );
}

export default App;
