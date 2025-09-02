"use client";

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { DollarSign, Loader2, Send, ShieldAlert, ShieldCheck } from 'lucide-react';
import type { UserData } from '@/lib/data';
import { checkForFraud } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import type { DetectFraudOutput } from '@/ai/flows/fraud-detection';

const formSchema = z.object({
  amount: z.coerce.number().positive({ message: 'Amount must be positive.' }),
});

export function FraudDetectionCard({ user }: { user: UserData }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectFraudOutput | null>(null);
  const [showOtp, setShowOtp] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);

  const { toast } = useToast();

  const averageTransactionAmount = user.bankAccounts.reduce((acc, curr) => acc + curr.balance, 0) / user.bankAccounts.length / 1000; // Simplified average

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { amount: 100 },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    setGeneratedOtp(null);

    const fraudCheckResult = await checkForFraud({
      userId: user.userId,
      transactionAmount: values.amount,
      averageTransactionAmount: averageTransactionAmount,
    });
    
    if (fraudCheckResult.error) {
       toast({
        variant: 'destructive',
        title: 'Error',
        description: fraudCheckResult.error,
      });
      setLoading(false);
      return;
    }

    setResult(fraudCheckResult);

    if (fraudCheckResult?.confirmationRequired) {
      setGeneratedOtp(fraudCheckResult.otp || null);
      setShowOtp(true);
    } else if (!fraudCheckResult?.isFraud) {
       toast({
        title: 'Transaction Approved',
        description: 'The transaction was processed successfully.',
        className: 'bg-accent text-accent-foreground',
      });
    }

    setLoading(false);
    form.reset();
  }

  function handleOtpSubmit() {
    if (otpInput === generatedOtp) {
      toast({
        title: 'Transaction Confirmed',
        description: 'Your transaction has been verified and processed.',
        className: 'bg-accent text-accent-foreground',
      });
      setShowOtp(false);
      setResult(null);
      setOtpInput('');
      setGeneratedOtp(null);
    } else {
      toast({
        variant: 'destructive',
        title: 'Incorrect OTP',
        description: 'The OTP you entered is incorrect. Please try again.',
      });
    }
  }

  return (
    <>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck />
            <span>Fraud Detection</span>
          </CardTitle>
          <CardDescription>Simulate a transaction to test our AI-powered fraud detection.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction Amount (AUD)</FormLabel>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input type="number" placeholder="e.g. 50000" {...field} className="pl-10" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : <Send />}
                Simulate Transaction
              </Button>
            </form>
          </Form>

          {result?.isFraud && (
            <Alert variant="destructive" className="mt-4">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Potential Fraud Detected!</AlertTitle>
              <AlertDescription>{result.reason}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={showOtp} onOpenChange={setShowOtp}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Transaction</DialogTitle>
            <DialogDescription>
              An SMS with a One-Time Password (OTP) has been sent to {user.personalInfo.phone}. Please enter it below to confirm this transaction.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Input 
              placeholder="Enter OTP" 
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              className="font-mono text-center tracking-widest"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleOtpSubmit}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
