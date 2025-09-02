"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Globe, Loader2, Power, Wifi } from 'lucide-react';
import { Badge } from '../ui/badge';

export function VPNConnection() {
  const [vpnConnected, setVpnConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ip, setIp] = useState<string | null>(null);

  useEffect(() => {
    const storedStatus = sessionStorage.getItem('vpnConnected');
    const storedIp = sessionStorage.getItem('simulatedIP');
    if (storedStatus === 'true' && storedIp) {
      setVpnConnected(true);
      setIp(storedIp);
    }
  }, []);

  const simulateVPNConnection = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newIp = '203.0.113.42';
      sessionStorage.setItem('vpnConnected', 'true');
      sessionStorage.setItem('simulatedIP', newIp);
      setVpnConnected(true);
      setIp(newIp);
      setIsLoading(false);
    }, 2000);
  };

  const disconnectVPN = () => {
    sessionStorage.removeItem('vpnConnected');
    sessionStorage.removeItem('simulatedIP');
    setVpnConnected(false);
    setIp(null);
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-6 w-6" />
          <span>Australian Network</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        {vpnConnected ? (
          <div className="space-y-3">
            <Wifi className="h-16 w-16 text-accent mx-auto" />
            <p className="font-semibold text-accent">Securely Connected</p>
            <Badge variant="outline">IP: {ip}</Badge>
            <Button onClick={disconnectVPN} variant="destructive" className="w-full">
              <Power />
              Disconnect
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <Wifi className="h-16 w-16 text-muted-foreground mx-auto" />
            <p className="font-semibold text-muted-foreground">Not Connected</p>
            <p className="text-sm text-muted-foreground">Connect for secure access.</p>
            <Button onClick={simulateVPNConnection} className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Power />
              )}
              Connect to AU Network
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
