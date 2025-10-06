import { poppins } from "@/app/layout";
import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string; // Hvis den skal være en lenke
  onClick?: () => void;
as?: "link" | "button" | "div"; // styrer hva som rendres
  variant?: "accent" | "secondary"; // du kan utvide senere
  className?: string; // for spesialtilfeller
};

export default function Button({
  children,
  href,
  onClick,
as = "button",
  variant = "accent",
  className = "",
}: ButtonProps) {
const baseClasses = `${poppins.className} mt-3 inline-block px-4 py-2 rounded-lg font-semibold text-sm transition ${className}`;
  const variantClasses =
    variant === "accent"
      ? "bg-[var(--accent)] text-black hover:bg-yellow-300"
      : "bg-gray-200 text-gray-900 hover:bg-gray-300";

  if (as === "link" && href) {
    return (
      <Link href={href} className={`${baseClasses} ${variantClasses}`}>
        {children}
      </Link>
    );
  }

  if (as === "div") {
    return <div className={`${baseClasses} ${variantClasses}`}>{children}</div>;
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
      {children}
    </button>
  );
}
