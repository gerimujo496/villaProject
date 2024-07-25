import {z} from "zod"
 
export const schema = z.object({
   email: z.string().min(5, "Email is required").email(),
   password: z.string().min(8, "Password should be at minimum length of 8"),
  
 });