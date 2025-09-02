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
import { FinClubLogo } from '../logo/FinClubLogo';

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
  const [cvvVisible, setCvvVisible] = useState(false);
  const [payPassEnabled, setPayPassEnabled] = useState(false);
  const { toast } = useToast();
  
  const [visaNumber] = useState(generateVisaNumber());
  const [expiryDate] = useState("10/28");
  const [cvv] = useState("352");

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
        <div className="relative aspect-[1.586] w-full max-w-sm mx-auto rounded-xl bg-gradient-to-br from-slate-900 via-blue-900 to-gray-800 text-slate-300 p-6 flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className='flex items-center gap-3'>
              <FinClubLogo className="w-auto h-8 text-blue-300" />
            </div>
            <Image src="/visa-logo.svg" alt="Visa" width={60} height={20} />
          </div>

          {/* Card Number */}
          <div className="space-y-1 text-center">
            <p className="font-mono text-xl md:text-2xl tracking-wider text-slate-200">
                {visaNumber}
            </p>
            <p className="text-xs text-slate-400">SBM (MAURITIUS) LTD</p>
          </div>
          
          {/* Expiry and CVV */}
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs text-slate-400">VALID THRU</p>
                <p className="font-mono text-slate-200">{expiryDate}</p>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-xs text-slate-400">CVV</p>
                  <p className="font-mono text-slate-200">{cvvVisible ? cvv : '•••'}</p>
                </div>
                 <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-300 hover:bg-white/10"
                  onClick={() => setCvvVisible(!cvvVisible)}
                >
                  {cvvVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </Button>
              </div>
            </div>
             <p className="font-semibold text-slate-200 self-end">PATRICK I BERNARD</p>
          </div>

           {/* NFC Icon */}
           <div className="absolute bottom-4 right-6">
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
