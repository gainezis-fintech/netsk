"use client";

import { CryptoWallet } from '@/components/dashboard/CryptoWallet';
import { userData } from '@/lib/data';

export default function CryptoPage() {
  return <CryptoWallet wallet={userData.cryptoWallet} />;
}