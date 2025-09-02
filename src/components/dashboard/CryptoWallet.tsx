"use client";

import type { CryptoWallet } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Bitcoin, Copy } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';

export function CryptoWallet({ wallet }: { wallet: CryptoWallet }) {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(wallet.walletAddress);
    toast({
      title: 'Copied to Clipboard',
      description: 'The wallet address has been copied.',
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bitcoin className="h-6 w-6 text-yellow-500" />
          <span>Crypto Wallet</span>
        </CardTitle>
        <CardDescription>Provider: {wallet.provider}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Balance</p>
          <p className="text-2xl font-bold">{wallet.bitcoinBalance.toLocaleString()} BTC</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Current Value (USD)</p>
          <p className="text-2xl font-bold text-accent">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(wallet.currentValueUSD)}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Wallet Address</p>
          <div className="flex items-center gap-2">
            <p className="font-mono text-sm break-all">{wallet.walletAddress}</p>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={copyToClipboard}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
