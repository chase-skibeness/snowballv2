import { useState } from "react";
import { Card } from "primereact/card";
import { Account, ITableRow } from "../types";

function App() {
  const [formData, setFormData] = useState<any>([]);
  const [accounts, setAccounts] = useState<Account>();
  const [tableData, setTableData] = useState<ITableRow[]>([]);
  return (
    <div className="flex w-screen h-screen">
      <Card title="Account Input" className="h-full w-4 mx-2"></Card>

      <Card title="Snowball Amoritization" className="h-full w-8 mx-2"></Card>
    </div>
  );
}

export default App;
