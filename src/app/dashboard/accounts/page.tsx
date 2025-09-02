import { BankAccounts } from '@/components/dashboard/BankAccounts';
import { userData } from '@/lib/data';

export default function AccountsPage() {
  return <BankAccounts accounts={userData.bankAccounts} />;
}
