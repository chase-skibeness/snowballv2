import { Add } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { BaseSyntheticEvent, useState } from "react";
import Account from "../../types/Account";

interface IAddAccountFormProps {
  accounts: Account[];
  updateAccounts: Function;
}

export default function AddAccountForm({
  accounts,
  updateAccounts,
}: IAddAccountFormProps) {
  const [newAccountInput, setNewAccount] = useState({
    name: "",
    balanceDue: 0,
    minPaymentDue: 0,
    apr: 0,
  } as Account);

  function handleAddAccount(event: BaseSyntheticEvent) {
    event.preventDefault();
    updateAccounts([...accounts, newAccountInput]);
    setNewAccount(new Account("", 0, 0, 0));
  }
  return (
    <TableRow key="inputRow">
      <TableCell>
        <form id="accountAddForm">
          <TextField
            variant="standard"
            label="Account Name"
            InputLabelProps={{ shrink: true }}
            autoFocus={true}
            required={true}
            value={newAccountInput["name"]}
            onChange={(e) =>
              setNewAccount({ ...newAccountInput, name: e.target.value })
            }
          />
        </form>
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          label="Account Balance"
          /*@ts-ignore I'm not sure why it's complaining here*/
          form="accountAddForm"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          required={true}
          value={newAccountInput.balanceDue}
          onChange={(e) =>
            setNewAccount({
              ...newAccountInput,
              balanceDue: parseFloat(e.target.value),
            })
          }
          type="number"
          step={0.01}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          label="Account APR"
          /*@ts-ignore I'm not sure why it's complaining here*/
          form="accountAddForm"
          InputProps={{
            startAdornment: <InputAdornment position="start">%</InputAdornment>,
          }}
          required={true}
          value={newAccountInput.apr}
          onChange={(e) =>
            setNewAccount({
              ...newAccountInput,
              apr: parseFloat(e.target.value),
            })
          }
          type="number"
          step={0.01}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          label="Minimum Payment Due"
          /*@ts-ignore I'm not sure why it's complaining here*/
          form="accountAddForm"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          required={true}
          value={newAccountInput.minPaymentDue}
          onChange={(e) =>
            setNewAccount({
              ...newAccountInput,
              minPaymentDue: parseFloat(e.target.value),
            })
          }
          type="number"
          step={0.01}
        />
      </TableCell>
      <TableCell>
        {/*@ts-ignore I'm not sure why it's complaining here*/}
        <IconButton
          variant="contained"
          form="accountAddForm"
          type="submit"
          onClick={(e) => handleAddAccount(e)}
        >
          <Add />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
