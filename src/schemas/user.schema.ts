import { z } from "zod";

export const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(3).max(255),
  email: z.string().min(3).max(255).email(),
  password: z.string().min(3).max(8),
});

export const userRegisterBodySchema = userSchema.omit({ id: true });
export const userLoginBodySchema = userSchema.pick({
  email: true,
  password: true,
});
export const userReturnSchema = userSchema.omit({ password: true });

export type TUser = z.infer<typeof userSchema>;
export type TUserRegister = z.infer<typeof userRegisterBodySchema>;
export type TUserLoginBody = z.infer<typeof userLoginBodySchema>;
export type TUserReturn = z.infer<typeof userReturnSchema>;
export type TUserLoginReturn = {
  accessToken: string;
  user: TUserReturn;
};
