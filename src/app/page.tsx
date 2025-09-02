
"use client";

import LoginForm from '@/components/auth/LoginForm';
import { FinClubLogo } from '@/components/logo/FinClubLogo';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-slate-900 animate-gradient-xy"></div>
      </div>
      <style jsx global>{`
        @keyframes gradient-xy {
          0%, 100% {
            background-size: 400% 400%;
            background-position: 10% 0%;
          }
          50% {
            background-size: 200% 200%;
            background-position: 91% 100%;
          }
        }
        .animate-gradient-xy {
          animation: gradient-xy 15s ease infinite;
        }
      `}</style>
      <div className="relative w-full max-w-md space-y-6">
        <div className="flex justify-center mb-6">
          <div className="bg-card/80 backdrop-blur-sm rounded-full p-4 border shadow-lg flex items-center justify-center">
            <FinClubLogo className="h-12 w-auto" />
          </div>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-slate-400">
          Powered by FinClub Mauritius
        </p>
      </div>
    </div>
  );
}
