"use client";

import { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Wifi, Send, CameraOff } from 'lucide-react';
import { Badge } from '../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from '../ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const ScanToPayDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const handleScan = (data: any) => {
    if (data) {
      onOpenChange(false);
      
      // Simulate parsing QR code data
      let parsedData;
      try {
        parsedData = JSON.parse(data.text);
      } catch (e) {
        parsedData = { text: data.text };
      }

      toast({
        title: 'QR Code Scanned Successfully',
        description: (
          <div className="text-sm">
            <p><strong>Bank:</strong> {parsedData.bank || 'MCB Mauritius'}</p>
            <p><strong>Account:</strong> {parsedData.account || '000448971253'}</p>
            <p><strong>Reference:</strong> {parsedData.ref || 'CafePayment'}</p>
          </div>
        ),
        className: 'bg-accent text-accent-foreground',
      });
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      setError('Camera access was denied. Please enable camera permissions in your browser settings.');
    } else {
      setError('An error occurred while accessing the camera.');
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Scan QR Code</DialogTitle>
        <DialogDescription>
          Point your camera at a merchant's QR code to proceed with the payment.
        </DialogDescription>
      </DialogHeader>
      <div className="relative flex items-center justify-center bg-muted rounded-md overflow-hidden aspect-video">
        {error ? (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 p-4">
             <CameraOff className="h-12 w-12 text-destructive mb-4" />
             <Alert variant="destructive">
                <AlertTitle>Camera Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
             </Alert>
          </div>
        ) : (
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
            constraints={{ video: { facingMode: 'environment' } }}
          />
        )}
      </div>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
    </DialogContent>
  );
};


export function InStorePayments() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>In-Store Payments</CardTitle>
        <CardDescription>
          Quick and secure ways to pay with your phone.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-2">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Card className="flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:shadow-lg transition-shadow">
              <QrCode className="h-12 w-12 mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Scan to Pay</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Scan a merchant's QR code to pay instantly.
              </p>
              <Button>Scan Code</Button>
            </Card>
          </DialogTrigger>
          {isDialogOpen && <ScanToPayDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />}
        </Dialog>
        <Card className="flex flex-col items-center justify-center p-6 text-center">
          <Wifi className="h-12 w-12 mb-4 text-primary" />
          <h3 className="font-semibold mb-2">PayPass (Tap to Pay)</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Enable PayPass on your virtual card to tap and pay.
          </p>
          <Badge variant="secondary">See Virtual Card</Badge>
        </Card>
        <Card className="sm:col-span-2 flex flex-col items-center justify-center p-6 text-center">
          <Send className="h-12 w-12 mb-4 text-primary" />
          <h3 className="font-semibold mb-2">Send to Mobile</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Send money directly to a mobile number.
          </p>
          <div className="flex items-center gap-2">
            <Button>Send Money</Button>
            <Badge variant="outline">Coming Soon to Mauritius</Badge>
          </div>
        </Card>
      </CardContent>
    </Card>
  );
}
