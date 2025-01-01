import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_CLIENTID: z.string(),
    NEXT_PUBLIC_CLIENTSECRET: z.string(),
  },
  
  runtimeEnv: {
    NEXT_PUBLIC_CLIENTID: process.env.NEXT_PUBLIC_CLIENTID as string,
    NEXT_PUBLIC_CLIENTSECRET: process.env.NEXT_PUBLIC_CLIENTSECRET as string,
  },
  
});
