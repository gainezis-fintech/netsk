"use client";

import { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Wifi } from 'lucide-react';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { useToast } from '@/hooks/use-toast';

// SBM BIN: 403281
function generateVisaNumber() {
    const bin = '403281';
    let randomNumber = '';
    for (let i = 0; i < 9; i++) {
        randomNumber += Math.floor(Math.random() * 10);
    }
    const cardNumberWithoutLuhn = bin + randomNumber;

    let sum = 0;
    let shouldDouble = true;
    for (let i = cardNumberWithoutLuhn.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumberWithoutLuhn.charAt(i));
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    const luhnDigit = (10 - (sum % 10)) % 10;
    return (cardNumberWithoutLuhn + luhnDigit).replace(/(.{4})/g, '$1 ').trim();
}


export function VirtualCard() {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [payPassEnabled, setPayPassEnabled] = useState(false);
  const { toast } = useToast();
  
  // We use useState to ensure the card number is only generated once per component mount
  const [visaNumber] = useState(generateVisaNumber());

  const handlePayPassToggle = (enabled: boolean) => {
    setPayPassEnabled(enabled);
    toast({
        title: `PayPass ${enabled ? 'Enabled' : 'Disabled'}`,
        description: `NFC payments are now ${enabled ? 'active' : 'inactive'}.`,
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Virtual Visa Card</CardTitle>
        <CardDescription>
          Your secure card for online and in-store payments.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative aspect-[1.586] w-full max-w-sm mx-auto rounded-xl bg-gradient-to-br from-primary via-blue-500 to-purple-600 text-white p-6 flex flex-col justify-between shadow-2xl">
          <div className="flex justify-between items-start">
            <span className="font-bold text-xl">Netskrill</span>
            <Image src="/visa-logo.svg" alt="Visa" width={60} height={20} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="font-mono text-lg tracking-wider">
                {detailsVisible
                  ? visaNumber
                  : `**** **** **** ${visaNumber.slice(-4)}`}
              </p>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={() => setDetailsVisible(!detailsVisible)}
              >
                {detailsVisible ? <EyeOff /> : <Eye />}
              </Button>
            </div>
            <div className="flex gap-4 text-sm">
              <div>
                <p className="text-xs">VALID THRU</p>
                <p className="font-mono">
                  {detailsVisible ? '10/28' : '**/**'}
                </p>
              </div>
              <div>
                <p className="text-xs">CVV</p>
                <p className="font-mono">{detailsVisible ? '352' : '***'}</p>
              </div>
            </div>
          </div>
           <div className="flex justify-between items-end">
             <p className="font-semibold">PATRICK IAN BERNARD</p>
             <Wifi className={`h-8 w-8 transition-colors ${payPassEnabled ? 'text-white' : 'text-white/30'}`} />
           </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button variant="outline" className="w-full">
            <Image
              src="/google-pay.svg"
              alt="Google Pay"
              width={24}
              height={24}
              className="mr-2"
            />
            Add to Google Pay
          </Button>
          <Button variant="outline" className="w-full">
            <Image
              src="/apple-pay.svg"
              alt="Apple Pay"
              width={24}
              height={24}
              className="mr-2"
            />
            Add to Apple Pay
          </Button>
        </div>
      </CardContent>
       <CardFooter>
        <div className="flex items-center space-x-2 w-full justify-center">
            <Switch 
                id="paypass-toggle" 
                checked={payPassEnabled}
                onCheckedChange={handlePayPassToggle}
            />
            <Label htmlFor="paypass-toggle">Enable PayPass (NFC)</Label>
        </div>
      </CardFooter>
    </Card>
  );
}
