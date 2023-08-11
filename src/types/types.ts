import uniqid from "uniqid";

export class Liability {
  name: string;
  id: string;
  principal: number;
  minPayment: number;
  apr: number;
  aprStr: string;

  constructor(
    name: string,
    principal: number,
    minPayment: number,
    apr: number,
  ) {
    this.name = name;
    this.principal = principal;
    this.minPayment = minPayment;
    this.apr = apr;
    this.id = uniqid();
    this.aprStr = `${apr}%`;
  }
}

export enum SortType {
  highAPR,
  lowPrincipal,
  lowPrincipalPaymentRatio,
  highMinPayment,
}

export class Account {
  liabilities: Liability[];
  totalDebt: number;
  extraPayment: number;
  snowballBonus: number;
  id: string;
  sortType: SortType;

  constructor() {
    this.liabilities = [];
    this.totalDebt = 0;
    this.extraPayment = 0;
    this.snowballBonus = 0;
    this.id = uniqid();
    this.sortType = SortType.lowPrincipal;
  }
}

function highAPRSortFunc(a: Liability, b: Liability) {
  if (a.apr > b.apr) return 1;
  else return -1;
}

function highMinPaymentSortFunc(a: Liability, b: Liability) {
  if (a.minPayment > b.minPayment) return 1;
  else return -1;
}

function lowPrincipalSortFunc(a: Liability, b: Liability) {
  if (a.principal < b.principal) return 1;
  else return -1;
}

function ratioSortFunc(a: Liability, b: Liability) {
  const ratioA = a.minPayment / a.principal;
  const ratioB = b.minPayment / b.principal;

  if (ratioA > ratioB) return 1;
  else return -1;
}

export class AccountSnapshot extends Account {
  [key: string]: any;
  "date": Date | string;

  constructor(
    date: Date,
    { liabilities, totalDebt, extraPayment, snowballBonus }: Account,
  ) {
    super();
    this.date = `${date.getMonth() + 1}/${date.getFullYear()}`;
    switch (this.sortType) {
      case SortType.highAPR:
        this.liabilities = liabilities.sort(highAPRSortFunc);
      case SortType.highMinPayment:
        this.liabilities = liabilities.sort(highMinPaymentSortFunc);
      case SortType.lowPrincipal:
        this.liabilities = liabilities.sort(lowPrincipalSortFunc);
      case SortType.lowPrincipalPaymentRatio:
        this.liabilities = liabilities.sort(ratioSortFunc);
      default:
        this.liabilities = liabilities.sort(lowPrincipalSortFunc);
    }
    this.totalDebt = totalDebt;
    this.extraPayment = extraPayment;
    this.snowballBonus = snowballBonus;
    liabilities.forEach((liability) => {
      this[liability.name] = liability.principal;
    });
  }
}
