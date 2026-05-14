import { dbKysely } from "./database/kysely/db";
import type { Session } from "@auth/core/types";

declare global {
  namespace Vike {
    interface PageContext {
      session?: Session | null;
    }
  }
}

declare global {
  namespace Vike {
    interface PageContextServer {
      db: ReturnType<typeof dbKysely>;
    }
  }
}
