import ForgotPasswordForm from "@/components/forgot-password-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const ForgotPassword = async () => {
  const session = await auth();
  if (session) return redirect("/");
  return (
    <section className="h-[90vh] w-full flex items-center justify-center">
      <div className="w-[500px] rounded-lg md:border bg-card text-card-foreground md:shadow-sm">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </div>
    </section>
  );
};

export default ForgotPassword;
