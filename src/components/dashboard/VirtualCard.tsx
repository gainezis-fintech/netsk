"use client";

import { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

export function VirtualCard() {
  const [detailsVisible, setDetailsVisible] = useState(false);

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
                  ? '4912 3456 7890 1234'
                  : '**** **** **** 1234'}
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
                  {detailsVisible ? '12/28' : '**/**'}
                </p>
              </div>
              <div>
                <p className="text-xs">CVV</p>
                <p className="font-mono">{detailsVisible ? '123' : '***'}</p>
              </div>
            </div>
          </div>
          <p className="font-semibold">PATRICK IAN BERNARD</p>
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
    </Card>
  );
}
