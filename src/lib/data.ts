export type BankAccount = {
  bank: string;
  accountNumber: string;
  balance: number;
  currency: "AUD";
};

export type CryptoWallet = {
  provider: string;
  bitcoinBalance: number;
  walletAddress: string;
  currentValueUSD: number;
};

export type UserData = {
  userId: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
  bankAccounts: BankAccount[];
  cryptoWallet: CryptoWallet;
};

export const userData: UserData = {
  userId: "patrick-bernard-001",
  personalInfo: {
    fullName: "Patrick Ian Bernard",
    email: "patrick.bernard@example.com",
    phone: "+23054557219"
  },
  bankAccounts: [
    {
      bank: "Commonwealth Bank of Australia",
      accountNumber: "XXXX-XXXX-1234",
      balance: 11650977.34,
      currency: "AUD"
    },
    {
      bank: "Bank of Melbourne",
      accountNumber: "XXXX-XXXX-5678",
      balance: 18780004.40,
      currency: "AUD"
    },
    {
      bank: "National Australia Bank",
      accountNumber: "XXXX-XXXX-9012",
      balance: 980440.93,
      currency: "AUD"
    }
  ],
  cryptoWallet: {
    provider: "Chase JPM",
    bitcoinBalance: 910,
    walletAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    currentValueUSD: 910 * 67000 
  }
};
