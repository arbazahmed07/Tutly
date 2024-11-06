/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    user:
      | (import("@prisma/client").User & {
          profile: import("@prisma/client").Profile;
        })
      | null;
    session:
      | (import("@prisma/client").Session & {
          user: import("@prisma/client").User & {
            profile: import("@prisma/client").Profile;
          };
        })
      | null;
  }
}
