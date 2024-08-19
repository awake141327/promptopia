"use client";

import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";

const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <Suspense>{children}</Suspense>
    </SessionProvider>
  );
};

export default Provider;
