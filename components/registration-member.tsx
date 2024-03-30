// "use client";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Button } from "./ui/button";

// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useTransition } from "react";
// import { registerMember } from "@/lib/actions";

// const formSchema = z.object({
//   name: z.string().min(1).max(30),
//   email: z.string().email(),
//   telegramId: z.string().min(10),
//   memberPeriod: z.string().min(1),
// });

// const FormRegistration = () => {
//   const [isPending, startTransition] = useTransition();

//   // 1. Define your form.
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       telegramId: "",
//       memberPeriod: "",
//     },
//   });

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     startTransition(() => {
//       registerMember(values);
//     });
//     console.log(values);
//   }

//   return (
//     <Card className="w-[450px]">
//       <CardHeader>
//         <CardTitle>Registration Member</CardTitle>
//         <CardDescription>this form required to recap data SSG</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Nama</FormLabel>
//                   <FormControl>
//                     <Input placeholder="shadcn" {...field} />
//                   </FormControl>
//                   <FormDescription>
//                     This is your public display name.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input placeholder="shadcn" {...field} />
//                   </FormControl>
//                   <FormDescription>
//                     This is your public display name.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="telegramId"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Id Telegram</FormLabel>
//                   <FormControl>
//                     <Input placeholder="shadcn" {...field} />
//                   </FormControl>
//                   <FormDescription>
//                     This is your public display name.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="memberPeriod"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Periode Membership</FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Pilih masa periode member" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="1">1 Bulan</SelectItem>
//                       <SelectItem value="3">3 Bulan</SelectItem>
//                       <SelectItem value="6">6 Bulan</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormDescription>
//                     You can manage email addresses in your
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit" disabled={isPending}>
//               {isPending ? "Submit..." : "Submit"}
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//       <CardFooter></CardFooter>
//     </Card>
//   );
// };

// export default FormRegistration;
import React from 'react'

const RegisterMember = () => {
  return (
    <div>RegisterMember</div>
  )
}

export default RegisterMember