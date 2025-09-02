"use client";

import type { CryptoWallet as CryptoWalletData } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Bitcoin, Copy, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { fetchCryptoPrice } from '@/app/actions';
import { Skeleton } from '../ui/skeleton';

export function CryptoWallet({ wallet }: { wallet: CryptoWalletData }) {
  const { toast } = useToast();
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsdValueVisible, setIsUsdValueVisible] = useState(false);

  useEffect(() => {
    async function loadPrice() {
      setIsLoading(true);
      const result = await fetchCryptoPrice({ symbol: 'BTC' });
      if (result.price) {
        setBtcPrice(result.price);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error || 'Could not fetch BTC price.',
        });
      }
      setIsLoading(false);
    }
    loadPrice();
  }, [toast]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(wallet.walletAddress);
    toast({
      title: 'Copied to Clipboard',
      description: 'The wallet address has been copied.',
    });
  };

  const totalUsdValue = btcPrice ? wallet.bitcoinBalance * btcPrice : 0;

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
        <div className="grid grid-cols-2 gap-4">
            <div>
                <p className="text-sm text-muted-foreground">Total BTC</p>
                <p className="text-2xl font-bold">{wallet.bitcoinBalance.toLocaleString()} BTC</p>
            </div>
             <div>
                <p className="text-sm text-muted-foreground">Live BTC Price (USD)</p>
                 {isLoading ? (
                    <Skeleton className="h-8 w-32 mt-1" />
                 ) : (
                    <p className="text-2xl font-bold">
                        {btcPrice ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(btcPrice) : 'N/A'}
                    </p>
                 )}
            </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Current Value (USD)</p>
          <div className="flex items-center gap-2">
            {isLoading ? (
                <Skeleton className="h-8 w-48 mt-1" />
            ) : (
                <p className="text-2xl font-bold text-accent">
                    {isUsdValueVisible 
                        ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalUsdValue)
                        : '********'
                    }
                </p>
            )}
             <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setIsUsdValueVisible(!isUsdValueVisible)}
                disabled={isLoading}
            >
                {isUsdValueVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
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
