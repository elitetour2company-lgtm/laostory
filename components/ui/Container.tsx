import { ReactNode } from "react";

export default function Container({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={`mx-auto w-full max-w-[1280px] px-5 md:px-8 ${className}`}>
      {children}
    </div>
  );
}
