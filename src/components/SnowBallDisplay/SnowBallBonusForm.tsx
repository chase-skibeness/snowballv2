import { TextField } from "@mui/material";

interface ISnowBallBonusFormProps {
  bonusPayment: number;
  setBonusPayments: Function;
}

export default function SnowBallBonusForm({
  bonusPayment,
  setBonusPayments,
}: ISnowBallBonusFormProps) {
  return (
    <TextField
      value={bonusPayment}
      onChange={(e) => setBonusPayments(parseFloat(e.target.value))}
      label="Extra Monthly Payments"
      type="number"
      helperText="How much extra per month can you put towards the SnowBall?"
      InputLabelProps={{ shrink: true }}
    />
  );
}
