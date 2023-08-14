import { TextField } from "@mui/material";

interface ISnowBallStartFormProps {
  startPayment: number;
  setStartPayments: Function;
}

export default function SnowBallStartForm({
  startPayment,
  setStartPayments,
}: ISnowBallStartFormProps) {
  return (
    <TextField
      value={startPayment}
      onChange={(e) => setStartPayments(parseFloat(e.target.value))}
      label="Extra Start Payment"
      type="number"
      helperText="How much in liquid savings can you put towards the beginning of the SnowBall?"
      InputLabelProps={{ shrink: true }}
    />
  );
}
