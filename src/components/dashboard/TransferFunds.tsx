"use client";

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRightLeft } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const TransferForm = ({ title }: { title: string }) => (
  <div className="space-y-4">
    <h3 className="font-semibold">{title}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="from-account">From Account</Label>
        <Select>
          <SelectTrigger id="from-account">
            <SelectValue placeholder="Select account..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cba">CBA (**** 1234)</SelectItem>
            <SelectItem value="bom">BoM (**** 5678)</SelectItem>
            <SelectItem value="nab">NAB (**** 9012)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="to-account">To Account / BSB</Label>
        <Input id="to-account" placeholder="Enter account or BSB" />
      </div>
    </div>
    <div>
      <Label htmlFor="amount">Amount (AUD)</Label>
      <Input id="amount" type="number" placeholder="0.00" />
    </div>
    <div>
      <Label htmlFor="reference">Reference</Label>
      <Input id="reference" placeholder="e.g., Dinner with friends" />
    </div>
    <Button className="w-full">
      <ArrowRightLeft className="mr-2" />
      Initiate Transfer
    </Button>
  </div>
);

export function TransferFunds() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowRightLeft />
          <span>Transfer Funds</span>
        </CardTitle>
        <CardDescription>
          Move money between your accounts or to other banks.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="inter-account" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inter-account">Inter-Account</TabsTrigger>
            <TabsTrigger value="other-bank">Other AU Bank</TabsTrigger>
            <TabsTrigger value="mauritian-bank">Mauritian Bank</TabsTrigger>
          </TabsList>
          <TabsContent value="inter-account" className="pt-4">
            <TransferForm title="Transfer Between Your Accounts" />
          </TabsContent>
          <TabsContent value="other-bank" className="pt-4">
            <TransferForm title="Transfer to Another Australian Bank" />
          </TabsContent>
          <TabsContent value="mauritian-bank" className="pt-4">
            <TransferForm title="Transfer to a Mauritian Bank" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
