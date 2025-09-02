"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { BiometricLogin } from './BiometricLogin';
import { KeyRound, Loader2, LogIn, Mail, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { generatePassword } from '@/app/actions';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSigningIn(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Login Successful',
        description: 'Welcome to FinClub!',
      });
      router.push('/dashboard');
      setIsSigningIn(false);
    }, 1500);
  }

  const handleBiometricSuccess = () => {
    setIsSigningIn(true);
    setTimeout(() => {
      toast({
        title: 'Biometric Auth Successful',
        description: 'Welcome back to FinClub!',
      });
      router.push('/dashboard');
      setIsSigningIn(false);
    }, 1000);
  };
  
  const handleGeneratePassword = async () => {
    setIsGenerating(true);
    setGeneratedPassword(null);
    const result = await generatePassword();
    if (result.password) {
      setGeneratedPassword(result.password);
      toast({
        title: 'AI Password Generated',
        description: 'Your new secure password is ready.',
      });
    } else {
       toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: result.error || 'Could not generate a password at this time.',
      });
    }
    setIsGenerating(false);
  };
  
  const isLoading = isSigningIn || isGenerating;

  return (
    <Card className="w-full max-w-md shadow-2xl bg-card/80 backdrop-blur-sm border-white/20">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-primary">Welcome Back</CardTitle>
        <CardDescription>Sign in to access your FinClub account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input placeholder="patrick.bernard@example.com" {...field} className="pl-10" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                     <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} className="pl-10" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isSigningIn ? <Loader2 className="animate-spin" /> : <LogIn />}
              Sign In
            </Button>
          </form>
        </Form>
        <Separator className="my-6 bg-white/20" />
        <div className="space-y-4">
          <BiometricLogin onAuthSuccess={handleBiometricSuccess} disabled={isLoading} />
           <Button variant="outline" onClick={handleGeneratePassword} className="w-full" disabled={isLoading}>
             {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles />}
            Generate Password with AI
          </Button>
        </div>
        {generatedPassword && (
          <Alert className="mt-4 bg-blue-900/50 border-blue-400/50 text-slate-200">
            <KeyRound className="h-4 w-4 text-blue-300" />
            <AlertTitle className="text-blue-200">Generated Secure Password</AlertTitle>
            <AlertDescription>
              Please save this password securely: <br />
              <strong className="font-mono break-all text-white">{generatedPassword}</strong>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-center text-slate-400 w-full">
          This is a simulated demo for investors. All data is mock.
        </p>
      </CardFooter>
    </Card>
  );
}
