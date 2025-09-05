import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription,  CardFooter,  CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";


const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

const Verify = () => {
   const location = useLocation();
  const navigate = useNavigate();
    const [email] = useState(location.state);
    const [confirmed,setConfirmed] = useState(false)
    const [sendOtp] = useSendOtpMutation()
    const [verifyOtp] = useVerifyOtpMutation()
    const [timer,setTimer] = useState(120)


 const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })
  const handleSendOtp = async ()=>{
    const toastId = toast.loading('Sending OTP');

    try {
      const res = await sendOtp({email:email}).unwrap()
     if (res?.success) {
      toast.success("OTP Sent Successfully!", { id: toastId });
      setConfirmed(true);
      setTimer(120);
    } else {
      toast.error(res?.message || "Failed to send OTP", { id: toastId });
    }
      
    
    } catch (error: any) {
    toast.error(error?.data?.message || "Something went wrong!", { id: toastId });
    console.log(error);
  }
   

  }
  const onSubmit = async (data: z.infer<typeof FormSchema>)=>{
    const toastId = toast.loading('Sending OTP');

    const userInfo ={
      email,
      otp:data.pin,
    };
    try {
       const res = await verifyOtp(userInfo).unwrap()
      if(res.success){
        toast.success('OTP Verified',{id:toastId})
      }
       setConfirmed(true)
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    if(!email || !confirmed){
      return
    }
    const timerId = setInterval(()=>{
        if(email && confirmed){
      setTimer((prev) => prev > 0 ? prev -1 : 0)
    }

    }, 1000);
    return()=> clearInterval(timerId)
  },[email,confirmed])
  return (
    <div className="grid place-content-center h-screen ">
      {confirmed ?(<Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Varify your email address</CardTitle>
        <CardDescription>
           Please Enter the 6-Digit Code We  Send To <br />
           {email}
        </CardDescription>
      </CardHeader>
      <CardContent>
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                     <InputOTPSeparator />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                <Button onClick={handleSendOtp} type="button" variant="link" disabled ={timer !== 0}
                className={cn('p-0 m-0',{
                  'cursor-pointer':timer === 0,
                  'text-gray-500':timer !== 0
                })}
                >Resend OTP :{" "} </Button> {" "}
                {timer}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
      </CardContent>
    </Card>) : (<Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Varify your email address</CardTitle>
        <CardDescription>
          We Will Send you OTP At<br />
           {email}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={handleSendOtp} className=" w-[300px]">Confirmed</Button>
      </CardFooter>
    
    </Card>)}
        
      
    </div>
  );
};

export default Verify;