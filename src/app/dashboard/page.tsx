import { DashboardClient } from '@/components/dashboard/DashboardClient';
import { TransactionHistory } from '@/components/dashboard/TransactionHistory';
import { userData } from '@/lib/data';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardClient user={userData} />
      <TransactionHistory transactions={[]} />
    </div>
  );
}
