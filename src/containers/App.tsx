import { useState } from "react";
import { Card } from "primereact/card";
import AccountsForm from "../components/AccountsForm";
import { Account, ITableRow } from "../types";

function App() {
  const [formData, setFormData] = useState<any>([]);
  const [accounts, setAccounts] = useState<Account>(new Account());
  const [tableData, setTableData] = useState<ITableRow[]>([]);
  return (
    <div className="flex w-screen h-screen">
      <Card title="Account Input" className="w-4 m-2">
        <AccountsForm formController={{accounts, setAccounts}} />
      </Card>

      <Card title="Snowball Amoritization" className=" w-8 m-2"></Card>
    </div>
  );
}

export default App;
