
"use client"
import { ConvexProvider, ConvexReactClient } from "convex/react";

type Props = {
  children: React.ReactNode;
}

const Provider = ({children}: Props) => {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  return (
    <div>
<ConvexProvider client={convex}>{children}</ConvexProvider>;
    </div>
  )
}

export default Provider