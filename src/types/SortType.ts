import Account from "./Account";

export function highAPRSortFunc(a: Account, b: Account) {
  if (a.apr < b.apr) return 1;
  else return -1;
}

export function highMinPaymentDueSortFunc(a: Account, b: Account) {
  if (a.minPaymentDue < b.minPaymentDue) return 1;
  else return -1;
}

export function lowBalanceDueSortFunc(a: Account, b: Account) {
  if (a.balanceDue < b.balanceDue) return -1;
  else return 1;
}

export function ratioSortFunc(a: Account, b: Account) {
  const ratioA = a.minPaymentDue / a.balanceDue;
  const ratioB = b.minPaymentDue / b.balanceDue;

  if (ratioA > ratioB) return 1;
  else return -1;
}

export enum SortType {
  highAPR,
  lowPrincipal,
  lowPrincipalPaymentRatio,
  highMinPayment,
}
