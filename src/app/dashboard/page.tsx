import { DashboardClient } from '@/components/dashboard/DashboardClient';
import { userData } from '@/lib/data';

export default function DashboardPage() {
  return <DashboardClient user={userData} />;
}
