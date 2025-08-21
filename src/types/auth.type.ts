
 export interface ISendOtp{
  email:string;
 }
 
 export interface ILogin{
  email:string;
  Password:string
 }
 
export interface IVerifyOtp {
  email: string;
  otp: string;
}

