import {
  AppBar,
  Container,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Grid,
  Card,
  Input,
} from "@mui/material";
import {
  useState,
  useEffect,
  useRef,
  BaseSyntheticEvent,
  MutableRefObject,
} from "react";
import { Upload, Download, Menu } from "@mui/icons-material";
import AccountsDisplay from "../components/AccountsDisplay/AccountsDisplay";
import SnowBallDisplay from "../components/SnowBallDisplay/SnowBallDisplay";
import Account from "../types/Account";

function App() {
  let [accounts, updateAccounts] = useState<Account[]>([]);
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
      .catch((err: any) => console.log(err));

    event.target.value = null;
  }

  useEffect(() => {
    let sortedAccounts = accounts.sort(
      (firstAccount: Account, secondAccount: Account) =>
        firstAccount.balanceDue <= secondAccount.balanceDue ? -1 : 1,
    );
    updateAccounts(sortedAccounts);
  }, [accounts]);

  return (
    <Container maxWidth="lg">
      <Grid container rowSpacing={4} component={Card}>
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
              >
                <Menu />
              </IconButton>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                SnowBall
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
                SnowBall Amoritization
              </Typography>
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
