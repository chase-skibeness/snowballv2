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
    { liabilities, extraPayment, snowballBonus }: Account,
  ) {
    super();
    this.date = `${date.getMonth() + 1}/${date.getFullYear()}`;
    this.extraPayment = extraPayment;
    this.snowballBonus = snowballBonus;
    liabilities = liabilities.map((liability) => {
      liability.principal += liability.principal * (liability.apr / 12);
      liability.principal -= liability.minPayment;
      return liability;
    });
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
    // find first liability that's not already paid fully
    const paymentIndex = this.liabilities.findIndex(
      (liability) => liability.principal > 0,
    );
    if (paymentIndex > 0) {
      //apply extra payment
      if (this.extraPayment > this.liabilities[paymentIndex].principal) {
        this.liabilities[paymentIndex].principal = 0;
        this.extraPayment += this.liabilities[paymentIndex].minPayment;
        this.snowballBonus += this.liabilities[paymentIndex].minPayment;
        const leftovers =
          this.extraPayment - this.liabilities[paymentIndex].principal;
        if (leftovers > 0 && this.liabilities[paymentIndex + 1]) {
          if (this.liabilities[paymentIndex + 1].principal < leftovers) {
            this.liabilities[paymentIndex + 1].principal = 0;
          } else {
            this.liabilities[paymentIndex + 1].principal -= leftovers;
          }
        }
      } else {
        this.liabilities[paymentIndex].principal -= this.extraPayment;
      }
    }
    this.totalDebt = this.liabilities
      .map((liability) => liability.principal)
      .reduce((prev, curr) => (curr += prev));

    this.liabilities.forEach((liability) => {
      this[liability.name] = liability.principal;
    });
    console.log(this);
  }
}
