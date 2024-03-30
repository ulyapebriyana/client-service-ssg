import React from 'react'

const Dashboard = () => {
  return (
    <div>Dashboard bang</div>
  )
}

export default Dashboard

// "use client";

// import { Button, buttonVariants } from "@/components/ui/button";
// import Link from "next/link";
// import FormRegistration from "@/components/registration-member";
// import { useEffect } from "react";

// declare global {
//   interface Window {
//       snap: any
//   }
// }

// const Dashboard = () => {
//   useEffect(() => {
//     const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
//     const myMidtransClientKey = process.env.CLIENT_KEY as string;

//     let scriptTag = document.createElement("script");
    
//     scriptTag.src = midtransScriptUrl;
//     scriptTag.setAttribute("data-client-key", myMidtransClientKey);
//     scriptTag.async = true

//     document.body.appendChild(scriptTag);

//     return () => {
//       document.body.removeChild(scriptTag);
//     };
//   }, []);

//   const handlePay = async () => {
//     const getToken = await fetch(`http://localhost:3000/api/payment`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         order_id: "121212hfdf",
//         gross_amount: 20000,
//       }),
//     });

//     const data = await getToken.json();
//     console.log(data);

//     window.snap.pay(data.data.token);
//   };

//   return (
//     <main className="h-screen w-full">
//       <div className="flex items-center justify-center h-full">
//         <FormRegistration />
//       </div>
//       <Button onClick={handlePay}>here</Button>
//     </main>
//   );
// };

// export default Dashboard;
