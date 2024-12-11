/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    user:
      | (import("@prisma/client").User & {
          profile: import("@prisma/client").Profile;
          adminForCourses: import("@prisma/client").Course[];
        })
      | null;
    session:
      | (import("@prisma/client").Session & {
          user: import("@prisma/client").User;
        })
      | null;
    organization: import("@prisma/client").Organization | null;
    role: import("@prisma/client").Role | null;
  }
}
