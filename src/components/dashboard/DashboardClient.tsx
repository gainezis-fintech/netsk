"use client";

import type { UserData } from '@/lib/data';
import { BankAccounts } from './BankAccounts';
import { CryptoWallet } from './CryptoWallet';
import { VPNConnection } from './VPNConnection';
import { FraudDetectionCard } from './FraudDetectionCard';

export function DashboardClient({ user }: { user: UserData }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 xl:grid-cols-4">
      <div className="space-y-6 lg:col-span-2 xl:col-span-3">
        <BankAccounts accounts={user.bankAccounts} />
        <CryptoWallet wallet={user.cryptoWallet} />
      </div>
      <div className="space-y-6 lg:col-span-1 xl:col-span-1">
        <VPNConnection />
        <FraudDetectionCard user={user} />
      </div>
    </div>
  );
}
