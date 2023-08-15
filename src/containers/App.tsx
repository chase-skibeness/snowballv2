import {
  AppBar,
  Container,
  Toolbar,
  Button,
  Typography,
  Grid,
  Card,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
} from "@mui/material";
import { useState, useEffect, useRef, BaseSyntheticEvent } from "react";
import { Upload, Download } from "@mui/icons-material";
import AccountsDisplay from "../components/AccountsDisplay/AccountsDisplay";
import SnowBallDisplay from "../components/SnowBallDisplay/SnowBallDisplay";
import Account from "../types/Account";
import {
  SortType,
  lowBalanceDueSortFunc,
  highAPRSortFunc,
  highMinPaymentDueSortFunc,
  ratioSortFunc,
} from "../types/SortType";

function App() {
  let [accounts, updateAccounts] = useState<Account[]>([]);
  let [sortType, setSortType] = useState<SortType | string>(SortType[1]);
  const importFileInput = useRef<any>(null);

  function exportAccounts(event: BaseSyntheticEvent) {
    event.preventDefault();
    let dataStr = JSON.stringify(accounts);
    let dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    let exportFileDefaultName = "SnowBallAccounts.json";
    let linkElement = document.createElement("a");

    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  }

  function importAccounts(event: BaseSyntheticEvent) {
    let rawData = event.target.files[0];

    rawData
      .text()
      .then((value: string) => {
        let parsedData = JSON.parse(value);
        updateAccounts(parsedData);
      })
      .catch((err: any) => console.error(err));

    event.target.value = null;
  }

  function sortAccounts() {
    const sortedAccounts = [...accounts];
    switch (sortType) {
      case "lowPrincipal":
        sortedAccounts.sort(lowBalanceDueSortFunc);
        break;
      case "highAPR":
        sortedAccounts.sort(highAPRSortFunc);
        break;
      case "highMinPayment":
        sortedAccounts.sort(highMinPaymentDueSortFunc);
        break;
      case "lowPrincipalPaymentRatio":
        sortedAccounts.sort(ratioSortFunc);
        break;
    }
    updateAccounts(sortedAccounts);
  }

  useEffect(() => {
    sortAccounts();
  }, [accounts, sortType]);

  const handleSortTypeSelect = (event: SelectChangeEvent) => {
    //@ts-ignore events man, they always throw errors
    setSortType(SortType[event.target.value]);
  };

  return (
    <Container maxWidth="xl">
      <Grid container rowSpacing={4} component={Card}>
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                Snowball It!
              </Typography>
              <Button
                color="inherit"
                onClick={(e) => exportAccounts(e)}
                endIcon={<Download />}
              >
                Export Accounts
              </Button>
              <Button
                color="inherit"
                onClick={() => importFileInput.current.click()}
                endIcon={<Upload />}
              >
                Import Accounts
              </Button>
              <input
                ref={importFileInput}
                type="file"
                style={{ display: "none" }}
                onChange={(e) => importAccounts(e)}
              />
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={12}>
          <AccountsDisplay
            accounts={accounts}
            updateAccounts={updateAccounts}
          />
        </Grid>
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                align="justify"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                SnowBall Amoritization Table
              </Typography>
              <InputLabel
                id="snowball-select-helper-label"
                sx={{ color: "white" }}
              >
                Snowball Type:
              </InputLabel>
              <Select
                value={SortType[sortType as SortType]}
                label="Snowball type"
                labelId="snowball-select-helper-label"
                onChange={handleSortTypeSelect}
                sx={{ color: "white", m: 1 }}
                variant="standard"
              >
                <MenuItem value={SortType.lowPrincipal}>
                  Low Principal First
                </MenuItem>
                <MenuItem value={SortType.highAPR}>High APR First</MenuItem>
                <MenuItem value={SortType.highMinPayment}>
                  High Min Payment First
                </MenuItem>
                <MenuItem value={SortType.lowPrincipalPaymentRatio}>
                  Low Ratio First
                </MenuItem>
              </Select>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={12}>
          <SnowBallDisplay accounts={accounts} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
