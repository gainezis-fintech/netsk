import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Smartphone, Wifi, Send } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Badge } from '../ui/badge';

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
        <Card className="flex flex-col items-center justify-center p-6 text-center">
          <QrCode className="h-12 w-12 mb-4 text-primary" />
          <h3 className="font-semibold mb-2">Scan to Pay</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Scan a merchant's QR code to pay instantly.
          </p>
          <Button>Scan Code</Button>
        </Card>
        <Card className="flex flex-col items-center justify-center p-6 text-center">
          <Wifi className="h-12 w-12 mb-4 text-primary" />
          <h3 className="font-semibold mb-2">PayPass (Tap to Pay)</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Tap your phone on any PayPass-enabled terminal.
          </p>
          <Button>Enable PayPass</Button>
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
