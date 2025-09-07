import type { ComponentType } from 'react';

export type { ISendOtp,ILogin,IVerifyOtp } from './auth.type';
export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}
export interface ISidebarItem {
  title: string;
  url?: string;                 
  Component?: ComponentType;    
  items?: ISidebarItem[];       
}
export type TRole = 'SUPER_ADMIN' | 'ADMIN'|'USER'