"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { LockKeyhole, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginAdmin } from "@/lib/api";
import { setSession } from "@/lib/auth";

const schema = z.object({
  email: z.string().email("Enter a valid email."),
  password: z.string().min(1, "Password is required.")
});

type FormValues = z.infer<typeof schema>;

function AdminLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await loginAdmin(values);
      setSession(response.token, response.user);
      toast.success("Welcome back, Shanika.");
      router.replace(params.get("next") || "/admin/dashboard");
    } catch {
      toast.error("Login failed. Check your email and password.");
    }
  };

  return (
    <div className="-mt-20 grid min-h-screen place-items-center px-4">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Card>
          <CardContent className="p-8">
            <div className="mb-8 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Admin Login</p>
              <h1 className="mt-2 text-3xl font-black gradient-text">HerCodeHerStory</h1>
              <p className="mt-2 text-sm text-muted-foreground">Secure access for Shanika Munasinghe.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Email</span>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input className="pl-10" type="email" {...register("email")} />
                </div>
                {errors.email ? <p className="mt-1 text-xs text-destructive">{errors.email.message}</p> : null}
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Password</span>
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input className="pl-10" type="password" {...register("password")} />
                </div>
                {errors.password ? <p className="mt-1 text-xs text-destructive">{errors.password.message}</p> : null}
              </label>
              <Button className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminLoginForm />
    </Suspense>
  );
}
