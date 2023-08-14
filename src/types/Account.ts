class Account {
  name: string;
  "balanceDue": number;
  "minPaymentDue": number;
  "apr": number;
  [key: string]: string | number;
  constructor(
    name: string,
    balanceDue: number,
    minimumPaymentDue: number,
    apr: number,
  ) {
    this.name = name;
    this.balanceDue = balanceDue;
    this.minPaymentDue = minimumPaymentDue;
    this.apr = apr;
  }
}

export default Account;
