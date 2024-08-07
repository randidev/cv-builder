import { PropsWithChildren } from "react";

export default function LayoutEditor({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-body relative overflow-x-hidden">{children}</div>
  );
}
