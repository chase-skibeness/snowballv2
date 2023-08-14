import { Edit, Save } from "@mui/icons-material";
import {
  IconButton,
  TableCell,
  TableRow,
  TextField,
  InputAdornment,
} from "@mui/material";
import { BaseSyntheticEvent, useState } from "react";
import Account from "../../types/Account";

interface IAccountDataRowProps {
  account: Account;
  updateAccounts: Function;
  accounts: Account[];
}

export default function AccountDataRow({
  account,
  updateAccounts,
  accounts,
}: IAccountDataRowProps) {
  const [isReadOnly, setReadOnly] = useState(true);
  const [localAccountInput, setLocalAccount] = useState(
    new Account(
      account.name,
      account.balanceDue,
      account.minPaymentDue,
      account.apr,
    ),
  );

  function handleAccountEditSave(event: BaseSyntheticEvent) {
    event.preventDefault();
    if (!isReadOnly) {
      let changedAccounts = [...accounts];
      let match = changedAccounts.findIndex((findAccount) => {
        return account.name === findAccount.name;
      });
      changedAccounts[match] = localAccountInput;
      updateAccounts(changedAccounts);
    }
    setReadOnly(!isReadOnly);
  }

  function handleAccountEdit(event: BaseSyntheticEvent, type: string) {
    let newLocalAccount = localAccountInput;
    newLocalAccount[type] =
      event.target.value && !isNaN(event.target.value)
        ? parseFloat(event.target.value)
        : event.target.value;
    setLocalAccount(newLocalAccount);
  }

  return (
    <TableRow key={account.name}>
      <TableCell>
        <form id={account.name + "Form"}>
          {isReadOnly ? (
            localAccountInput.name
          ) : (
            <TextField
              variant="standard"
              onChange={(e) => handleAccountEdit(e, "name")}
              defaultValue={localAccountInput.name}
              /*@ts-ignore I'm not sure why it's complaining here*/
              form={account.name + "Form"}
            />
          )}
        </form>
      </TableCell>
      <TableCell>
        {isReadOnly ? (
          localAccountInput.balanceDue
        ) : (
          <TextField
            variant="standard"
            /*@ts-ignore I'm not sure why it's complaining here*/
            form={account.name + "Form"}
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            onChange={(e) => handleAccountEdit(e, "balanceDue")}
            defaultValue={localAccountInput.balanceDue}
          />
        )}
      </TableCell>
      <TableCell>
        {isReadOnly ? (
          localAccountInput.apr
        ) : (
          <TextField
            variant="standard"
            /*@ts-ignore I'm not sure why it's complaining here*/
            form={account.name + "Form"}
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              ),
            }}
            onChange={(e) => handleAccountEdit(e, "APR")}
            defaultValue={localAccountInput.apr}
          />
        )}
      </TableCell>
      <TableCell>
        {isReadOnly ? (
          localAccountInput.minPaymentDue
        ) : (
          <TextField
            variant="standard"
            /*@ts-ignore I'm not sure why it's complaining here*/
            form={account.name + "Form"}
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            onChange={(e) => handleAccountEdit(e, "minPaymentDue")}
            defaultValue={localAccountInput.minPaymentDue}
          />
        )}
      </TableCell>
      <TableCell>
        {/* @ts-ignore I'm not sure why it's complaining here */}
        <IconButton
          variant="contained"
          form={account.name + "Form"}
          type="submit"
          onClick={(e) => handleAccountEditSave(e)}
        >
          {isReadOnly ? <Edit /> : <Save />}
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
