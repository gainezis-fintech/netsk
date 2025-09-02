import type { BankAccount } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Landmark } from 'lucide-react';
import Image from 'next/image';

const bankLogos: { [key: string]: string } = {
  "Commonwealth Bank of Australia": "/banks/commbank.svg",
  "Bank of Melbourne": "/banks/melbourne.svg",
  "National Australia Bank": "/banks/nab.svg",
};

const BankCard = ({ account }: { account: BankAccount }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">{account.bank}</CardTitle>
        <Landmark className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-primary">
          {new Intl.NumberFormat('en-AU', {
            style: 'currency',
            currency: account.currency,
          }).format(account.balance)}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{account.accountNumber}</p>
      </CardContent>
    </Card>
  );
};

export function BankAccounts({ accounts }: { accounts: BankAccount[] }) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Australian Bank Accounts</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {accounts.map((account) => (
          <BankCard key={account.accountNumber} account={account} />
        ))}
      </CardContent>
    </Card>
  );
}
