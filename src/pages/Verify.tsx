import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription,  CardFooter,  CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useSendOtpMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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


 const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })
  const handleConfirm = async ()=>{
    try {
      const res = await sendOtp({email:email}).unwrap()
      if(res.success){
        toast.success('otp send')
      }
       setConfirmed(true)
    
    } catch (error) {
      console.log(error);
      
    }
   

  }
  const onSubmit = (data: z.infer<typeof FormSchema>)=>{
    console.log(data);
  }
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
        <Button onClick={handleConfirm} className=" w-[300px]">Confirmed</Button>
      </CardFooter>
    
    </Card>)}
        
      
    </div>
  );
};

export default Verify;