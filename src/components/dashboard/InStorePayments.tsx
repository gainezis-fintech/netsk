"use client";

import { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Smartphone, Wifi, Send, CameraOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
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

const ScanToPayDialog = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (hasCameraPermission !== null) return; // Only run once

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();
    
    // Cleanup function to stop video stream
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    }
  }, [hasCameraPermission, toast]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Scan QR Code</DialogTitle>
        <DialogDescription>
          Point your camera at a merchant's QR code to proceed with the payment.
        </DialogDescription>
      </DialogHeader>
      <div className="relative flex items-center justify-center bg-muted rounded-md overflow-hidden aspect-video">
        <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted />
        {hasCameraPermission === false && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80">
             <CameraOff className="h-12 w-12 text-muted-foreground mb-4" />
             <p className="text-muted-foreground">Camera access is required.</p>
          </div>
        )}
      </div>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
    </DialogContent>
  );
};


export function InStorePayments() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>In-Store Payments</CardTitle>
        <CardDescription>
          Quick and secure ways to pay with your phone.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-2">
        <Dialog>
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
          <ScanToPayDialog />
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
