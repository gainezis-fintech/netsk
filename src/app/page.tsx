"use client";

import LoginForm from '@/components/auth/LoginForm';
import { FinClubLogo } from '@/components/logo/FinClubLogo';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4 pattern-bg">
       <style jsx global>{`
        .pattern-bg {
          background-color: hsl(var(--background));
          opacity: 1;
          background-image: radial-gradient(hsl(var(--primary)), hsl(var(--primary)) 1px, hsl(var(--background)) 1px);
          background-size: 20px 20px;
        }
      `}</style>
      <div className="relative w-full max-w-md space-y-6">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 transform">
          <div className="bg-card rounded-full p-4 border shadow-lg flex items-center justify-center">
            <FinClubLogo className="h-12 w-auto" />
          </div>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-muted-foreground">
          Powered by Finclub Mauritius
        </p>
      </div>
    </div>
  );
}
