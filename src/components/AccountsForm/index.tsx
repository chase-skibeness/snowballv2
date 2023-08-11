import { useState, useEffect } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Account, Liability, SortType } from "../../types/types";

interface AccountsFormProps {
  account: Account;
  setAccount: any;
}

interface NumberFormField {
  value: number;
  invalid: boolean;
}

interface StringFormField {
  value: string;
  invalid: boolean;
}

export default function AccountsForm({
  account,
  setAccount,
}: AccountsFormProps) {
  const blankNumberFormField = {
    value: 0,
    invalid: false,
  };

  const blankStringFormField = {
    value: "",
    invalid: false,
  };

  const sortOptions = [
    { name: "Low Principal", code: SortType.lowPrincipal },
    { name: "High APR", code: SortType.highAPR },
    { name: "High Minimum Payment", code: SortType.highMinPayment },
    {
      name: "Principal To Payment Ratio",
      code: SortType.lowPrincipalPaymentRatio,
    },
  ];

  const [nameInput, setName] = useState<StringFormField>(blankStringFormField);
  const [principalInput, setPrincipal] =
    useState<NumberFormField>(blankNumberFormField);
  const [minPaymentInput, setMinPayment] =
    useState<NumberFormField>(blankNumberFormField);
  const [aprInput, setAPR] = useState<NumberFormField>(blankNumberFormField);
  const [surplusPaymentInput, setSurplusPayment] =
    useState<NumberFormField>(blankNumberFormField);
  const [selectedSortMethod, setSelectedSortMethod] = useState<{
    name: String;
    code: SortType;
  }>(sortOptions[0]);

  const resetFields = () => {
    setName(blankStringFormField);
    setPrincipal(blankNumberFormField);
    setMinPayment(blankNumberFormField);
    setAPR(blankNumberFormField);
  };

  const checkValidInput = () => {
    let result = true;
    if (!nameInput.value || nameInput.value.length < 1) {
      setName({ value: nameInput.value, invalid: true });
      result = false;
    }
    if (!principalInput.value || principalInput.value < 1) {
      setPrincipal({ ...principalInput, invalid: true });
      result = false;
    }
    if (!minPaymentInput.value || minPaymentInput.value < 0) {
      setMinPayment({ ...minPaymentInput, invalid: true });
      result = false;
    }
    if (
      aprInput.value === null ||
      (aprInput.value < 1 && aprInput.value > 0) ||
      aprInput.value < 0
    ) {
      setAPR({ ...aprInput, invalid: true });
      result = false;
    }

    return result;
  };

  return (
    <div className="card flex flex-wrap gap-3 p-fluid">
      <div className="flex-auto">
        <div className="my-4">
          <label htmlFor="account-name" className="font-bold block mb-2">
            Account Name
          </label>
          <input
            id="account-name"
            type="text"
            value={nameInput.value}
            onChange={(e: any) =>
              setName({ value: e.target.value, invalid: false })
            }
            className={`p-inputtext p-component p-filled ${
              nameInput.invalid ? "p-invalid" : ""
            }`}
            placeholder="What would you like to call this debt?"
          />
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
            value={principalInput.value}
            onValueChange={(e: any) =>
              setPrincipal({ value: e.target.value, invalid: false })
            }
            mode="currency"
            currency="USD"
            locale="en-US"
            placeholder="How much is owed?"
            className={principalInput.invalid ? "p-invalid" : ""}
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
            value={minPaymentInput.value}
            onValueChange={(e: any) =>
              setMinPayment({ value: e.target.value, invalid: false })
            }
            mode="currency"
            currency="USD"
            locale="en-US"
            placeholder="How much is the monthly payment?"
            className={minPaymentInput.invalid ? "p-invalid" : ""}
          />
        </div>
        <div className="my-4">
          <label htmlFor="apr" className="font-bold block mb-2">
            APR
          </label>
          <InputNumber
            inputId="apr"
            value={aprInput.value}
            onValueChange={(e: any) =>
              setAPR({ value: e.target.value, invalid: false })
            }
            placeholder="What is the interest rate?"
            className={aprInput.invalid ? "p-invalid" : ""}
            maxFractionDigits={2}
          />
        </div>
        <div className="my-4">
          <Button
            label="Add Account"
            onClick={() => {
              if (checkValidInput()) {
                const _account = { ...account };
                _account.liabilities.push(
                  new Liability(
                    nameInput.value,
                    principalInput.value,
                    minPaymentInput.value,
                    aprInput.value,
                  ),
                );
                _account.totalDebt = account.liabilities
                  .map((liability) => liability.principal)
                  .reduce((prev, curr) => (curr += prev));
                setAccount(_account);
                resetFields();
              }
            }}
            raised
          />
        </div>
      </div>
      <Divider />
      <div className="flex flex-column gap-4 w-full">
        <div>
          <label htmlFor="methodSelect" className="font-bold block mb-2">
            Snowball Method
          </label>
          <Dropdown
            inputId="methodSelect"
            value={selectedSortMethod}
            onChange={(e) => {
              const _account = account;
              _account.sortType = e.value.code;
              setAccount(_account);
              setSelectedSortMethod(e.value);
            }}
            options={sortOptions}
            optionLabel="name"
          />
        </div>
        <div>
          <label htmlFor="surplusPayment" className="font-bold block mb-2">
            Extra Payment per month
          </label>
          <InputNumber
            inputId="surplusPayment"
            value={surplusPaymentInput.value}
            onValueChange={(e: any) => {
              if (surplusPaymentInput.value < 0) {
                setSurplusPayment({ value: e.value, invalid: true });
              } else {
                setSurplusPayment({ value: e.value, invalid: false });
                const _account = account;
                _account.extraPayment = e.value;
                setAccount(_account);
              }
            }}
            mode="currency"
            currency="USD"
            locale="en-US"
            placeholder="ex. $100 extra towards debt"
            className={surplusPaymentInput.invalid ? "p-invalid" : ""}
          />
        </div>
      </div>
    </div>
  );
}
