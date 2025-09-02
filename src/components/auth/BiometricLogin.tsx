"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Fingerprint } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BiometricLoginProps {
  onAuthSuccess: () => void;
  disabled?: boolean;
}

export function BiometricLogin({ onAuthSuccess, disabled }: BiometricLoginProps) {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function checkSupport() {
      if (
        window.PublicKeyCredential &&
        PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable
      ) {
        const isSupported =
          await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        setIsBiometricSupported(isSupported);
      }
    }
    checkSupport();
  }, []);

  const handleBiometricAuth = async () => {
    try {
      // The challenge should be a random buffer from the server
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      const credential = await navigator.credentials.get({
        publicKey: {
          challenge,
          // The allowCredentials should ideally be fetched from the server
          // For this demo, we are not restricting to any specific credential
          allowCredentials: [], 
          userVerification: 'required',
          timeout: 60000,
        },
      });

      if (credential) {
        // In a real app, you would send this credential to the server for verification
        onAuthSuccess();
      } else {
        toast({
          variant: 'destructive',
          title: 'Authentication Failed',
          description: 'No credential was returned.',
        });
      }
    } catch (error: any) {
      console.error('Biometric authentication failed:', error);
      toast({
        variant: 'destructive',
        title: 'Authentication Failed',
        description: error.message || 'Please try again or use your password.',
      });
    }
  };

  if (!isBiometricSupported) {
    return null;
  }

  return (
    <Button variant="secondary" className="w-full" onClick={handleBiometricAuth} disabled={disabled}>
      <Fingerprint />
      Use Fingerprint/Face ID
    </Button>
  );
}
