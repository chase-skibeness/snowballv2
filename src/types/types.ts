import uniqid from "uniqid";

export class Liability {
  name: string;
  id: number;
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
