import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import Account from "../../types/Account";

interface ISnowBallAmortizationTableProps {
  accounts: Account[];
  bonusPayment: number;
  startPayment: number;
}

export default function SnowBallAmortizationTable({
  accounts,
  bonusPayment,
  startPayment,
}: ISnowBallAmortizationTableProps) {
  const [totalDebt, setTotalDebt] = useState(0);
  let today = new Date();

  useEffect(() => {
    setTotalDebt(
      accounts.reduce(
        (balanceSum, account) => (balanceSum += account.balanceDue),
        0,
      ),
    );
  }, [accounts, bonusPayment, startPayment]);

  function calculateMonthInterest(principal: number, rate: number) {
    return principal + principal * rate;
  }

  function buildAmoritizationTableRow(
    accountsArray: Account[],
    monthsElapsed: number,
  ): ReactElement | null {
    if (accountsArray.every((account) => account.balanceDue <= 0)) {
      return null;
    }

    const appliedInterestAccountArray = accountsArray.map((account) => {
      const newBalanceWithInterest = calculateMonthInterest(
        account.balanceDue,
        account.apr / 100 / 12,
      );

      return new Account(
        account.name,
        newBalanceWithInterest,
        account.minPaymentDue,
        account.apr,
      );
    });

    let accountToPay = appliedInterestAccountArray.filter(
      (account) => account.balanceDue > 0,
    )[0];

    let paidOffAccountBonus = appliedInterestAccountArray
      .filter((account) => account.balanceDue <= 0)
      .reduce((bonus, account) => (bonus += account.minPaymentDue), 0);

    const appliedPaymentsAccountArray = appliedInterestAccountArray.map(
      (account, index) => {
        const payment = account.minPaymentDue;

        const paymentWithBonus =
          payment +
          (bonusPayment ? bonusPayment : 0) +
          (paidOffAccountBonus ? paidOffAccountBonus : 0);

        let appliedPaymentBalance = 0;
        if (
          account["name"] === accountToPay["name"] &&
          account.balanceDue === accountToPay.balanceDue
        ) {
          if (account.balanceDue < paymentWithBonus) {
            appliedPaymentBalance = 0;
            let remainder = paymentWithBonus - account.balanceDue;
            let payForwardIndex = index + 1;
            while (
              remainder > 0 &&
              payForwardIndex < appliedInterestAccountArray.length
            ) {
              if (
                appliedInterestAccountArray[payForwardIndex].balanceDue <
                remainder
              ) {
                appliedInterestAccountArray[payForwardIndex].balanceDue = 0;
                payForwardIndex++;
              } else {
                appliedInterestAccountArray[payForwardIndex].balanceDue -=
                  remainder;
              }
              remainder -=
                appliedInterestAccountArray[payForwardIndex].balanceDue;
            }
          } else {
            appliedPaymentBalance = account.balanceDue - paymentWithBonus;
          }
        } else {
          if (account.balanceDue > 0) {
            appliedPaymentBalance = account.balanceDue - payment;
          } else {
            appliedPaymentBalance = 0;
          }
        }

        return new Account(
          account.name,
          appliedPaymentBalance,
          account.minPaymentDue,
          account.apr,
        );
      },
    );

    let total = appliedPaymentsAccountArray.reduce(
      (totalDebt, account) => (totalDebt += account.balanceDue),
      0,
    );

    let thisMonth = new Date(today);
    thisMonth.setMonth(thisMonth.getMonth() + monthsElapsed);

    return (
      <>
        <TableRow>
          <TableCell>
            {thisMonth.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </TableCell>
          {appliedPaymentsAccountArray.map((account) => {
            return account.balanceDue <= 0 ? (
              <TableCell sx={{ backgroundColor: "#9effae" }}>
                {account.balanceDue.toFixed(2)}
              </TableCell>
            ) : (
              <TableCell>{account.balanceDue.toFixed(2)}</TableCell>
            );
          })}
          <TableCell>{total.toFixed(2)}</TableCell>
          <TableCell>
            {paidOffAccountBonus + bonusPayment > 0
              ? paidOffAccountBonus + bonusPayment
              : ""}
          </TableCell>
          <TableCell>
            {paidOffAccountBonus > 0 ? paidOffAccountBonus : ""}
          </TableCell>
        </TableRow>
        {buildAmoritizationTableRow(
          appliedPaymentsAccountArray,
          monthsElapsed + 1,
        )}
      </>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={accounts.length + 4} />
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell colSpan={accounts.length + 3}>
              Snowball Sorted Balances
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Time</TableCell>
            {accounts.map((account) => {
              return <TableCell key={Math.random()}>{account.name}</TableCell>;
            })}
            <TableCell>Total Debt</TableCell>
            <TableCell>Extra $ Monthly</TableCell>
            <TableCell>Snowball Bonus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              {today.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </TableCell>
            {accounts.map((account) => {
              return (
                <TableCell key={Math.random()}>{account.balanceDue}</TableCell>
              );
            })}
            <TableCell>{totalDebt}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
          {buildAmoritizationTableRow(accounts, 1)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
