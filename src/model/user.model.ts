import z from 'zod';

// export class StoreUserRequest {
//   name: string;
//   email?: string;
//   age?: number;
// }

// export const storeUserRequest = z.object({
//   name: z.string().min(3).max(100),
//   email: z.string().optional(),
//   age: z.number().optional(),
// });

export class LoginUserRequest {
  email: string;
  password: string;
}

export const loginUserRequest = z.object({
  email: z.string().min(5).max(255),
  password: z.string().min(8).max(255),
});
