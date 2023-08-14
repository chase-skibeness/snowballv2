import { Grid } from "@mui/material";
import { useState } from "react";
import SnowBallAmortizationTable from "./SnowBallAmortizationTable";
import SnowBallBonusForm from "./SnowBallBonusForm";
import SnowBallStartForm from "./SnowBallStartForm";
import Account from "../../types/Account";

interface ISnowBallDisplayProps {
  accounts: Account[];
}

export default function SnowBallDisplay({ accounts }: ISnowBallDisplayProps) {
  const [bonusPayment, setBonusPayments] = useState<number>(0);
  const [startPayment, setStartPayments] = useState<number>(0);

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={4}>
        <SnowBallBonusForm
          bonusPayment={bonusPayment}
          setBonusPayments={setBonusPayments}
        />
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={4}>
        <SnowBallStartForm
          startPayment={startPayment}
          setStartPayments={setStartPayments}
        />
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={12}>
        <SnowBallAmortizationTable
          bonusPayment={bonusPayment}
          startPayment={startPayment}
          accounts={accounts}
        />
      </Grid>
    </Grid>
  );
}
