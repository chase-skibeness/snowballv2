export class Liability {
  minPayment: number;
  principalOwed: number;
  apr: number;
  name: string;
  constructor(
    name: string,
    apr: number,
    principalOwed: number,
    minPayment: number,
  ) {
    this.minPayment = minPayment;
    this.principalOwed = principalOwed;
    apr > 1 ? (this.apr = apr / 100) : (this.apr = apr);
    this.name = name;
  }
}

enum SortType {
  "highMinPayment",
  "lowPrincipal",
  "highAPR",
}

export const highAPRSortFunc = (a: Liability, b: Liability) => {
  if (a.apr > b.apr) {
    return 1;
  } else if (a.apr < b.apr) {
    return -1;
  } else {
    return 0;
  }
};

export const lowPrincipalSortFunc = (a: Liability, b: Liability) => {
  if (a.principalOwed > b.principalOwed) {
    return -1;
  } else if (a.principalOwed < b.principalOwed) {
    return 1;
  } else {
    return 0;
  }
};

export const highMinPaymentSortFunc = (a: Liability, b: Liability) => {
  if (a.minPayment > b.minPayment) {
    return 1;
  } else if (a.minPayment < b.minPayment) {
    return -1;
  } else {
    return 0;
  }
};

export class Account {
  liabilities: Liability[];
  totalDebt: number;
  surplusPayment: number;
  snowballBonus: number;

  constructor() {
    this.liabilities = [];
    this.totalDebt = 0;
    this.surplusPayment = 0;
    this.snowballBonus = 0;
  }

  addLiability(liability: Liability) {
    this.liabilities.push(liability);
  }

  removeLiability(liability: Liability) {
    this.liabilities = this.liabilities.filter(
      (currentLiability) =>
        !(
          currentLiability.name === liability.name &&
          currentLiability.apr === liability.apr
        ),
    );
  }

  sortLiabilities(sortType: SortType) {
    switch (sortType) {
      case SortType.highAPR:
        this.liabilities = this.liabilities.sort(highAPRSortFunc);
      case SortType.highMinPayment:
        this.liabilities = this.liabilities.sort(highMinPaymentSortFunc);
      default:
        this.liabilities = this.liabilities.sort(lowPrincipalSortFunc);
    }
  }
}

export interface ITableRow {
  date: string;
}
