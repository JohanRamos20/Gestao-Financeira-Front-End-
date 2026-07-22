import { z } from 'zod';

const apiUserSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    createdAt: z.coerce.date().optional(),
  })
  .transform((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      criadoEm: user.createdAt,
    };
  });

const authResponseSchema = z.union([
  z.object({
    user: apiUserSchema,
    token: z.string(),
  }),
  z.object({
    usuario: apiUserSchema,
    token: z.string(),
  }).transform((data) => {
    return {
      user: data.usuario,
      token: data.token,
    };
  }),
]);

export type User = z.infer<typeof apiUserSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;

export function parseAuthResponse(data: unknown) {
  return authResponseSchema.parse(data);
}
