import { PropsWithChildren } from "react";

export default function LayoutEditor({ children }: PropsWithChildren) {
  return (
    <div className="relative flex min-h-bodyMobile overflow-x-hidden sm:min-h-body">
      {children}
    </div>
  );
}
