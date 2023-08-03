import { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Liability } from "../../types";

export default function AccountsForm({ accounts, setAccounts }: any) {
  const [nameInput, setName] = useState<string>("");
  const [principalInput, setPrincipal] = useState<number>(0);
  const [minPayment, setMinPayment] = useState<number>(0);
  const [apr, setAPR] = useState<number>(0);
  return (
    <div className="card flex flex-wrap gap-3 p-fluid">
      <div className="flex-auto">
        <div className="my-4">
          <label htmlFor="account-name" className="font-bold block mb-2">
            Account Name
          </label>
          <InputText
            id="account-name"
            value={nameInput}
            onChange={(e: any) => setName(e.value)}
          />
          <Divider />
        </div>
        <div className="my-4">
          <label
            htmlFor="currency-us-principal"
            className="font-bold block mb-2"
          >
            Principal Owed
          </label>
          <InputNumber
            inputId="currency-us-principal"
            value={principalInput}
            onValueChange={(e: any) => setPrincipal(e.value)}
            mode="currency"
            currency="USD"
            locale="en-US"
          />
        </div>
        <div className="my-4">
          <label
            htmlFor="currency-us-min-payment"
            className="font-bold block mb-2"
          >
            Minimum Payment Due
          </label>
          <InputNumber
            inputId="currency-us-min-payment"
            value={minPayment}
            onValueChange={(e: any) => setMinPayment(e.value)}
            mode="currency"
            currency="USD"
            locale="en-US"
          />
        </div>
        <div className="my-4">
          <label htmlFor="apr" className="font-bold block mb-2">
            APR
          </label>
          <InputNumber
            inputId="apr"
            value={apr}
            onValueChange={(e: any) => setAPR(e.value)}
            min={1}
          />
        </div>
        <div className="my-4">
          <Button
            label="Add Account"
            onClick={() =>
              console.log(
                new Liability(nameInput, apr, principalInput, minPayment),
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
