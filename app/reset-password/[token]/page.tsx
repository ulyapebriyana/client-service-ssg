import ResetPasswordForm from "@/components/reset-password-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const ResetPasswordPage = async ({ params }: { params: { token: string } }) => {
  const session = await auth();
  if (session) return redirect("/");
  return (
    <section className="h-[90vh] w-full flex items-center justify-center">
      <div className="w-[500px] rounded-lg md:border bg-card text-card-foreground md:shadow-sm">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm token={params.token} />
        </CardContent>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
