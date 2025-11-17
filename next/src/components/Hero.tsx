//import Link from "next/link";
import Image from "next/image";

import { greatVibes } from '@/app/layout'


//import { poppins } from "@/app/layout";

export default function Hero() {
  return (
    <section className="relative text-center pb-10 pt-22 px-4 bg-[#2e3b37] overflow-hidden">
      {/* Hero-bilde */}
      <Image
        src="/bg1.jpeg"
        alt="Bakgrunnsbilde for Monika Helgesen"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        style={{
          objectFit: "cover",
          objectPosition: "center center",
          mixBlendMode: "multiply", // matcher din CSS-blending
        }}
      />

      {/* Mørk fargetone bak innholdet */}
      <div className="absolute inset-0 bg-[#2e3b37]/60" />

      {/* Innhold */}
      <div className="relative z-10">
        <h1
          className={`${greatVibes.className} text-4xl md:text-8xl mb-4`}
          style={{
            background: "linear-gradient(90deg, #f0ead8, rgb(167 134 76))",
            WebkitBackgroundClip: "text",
            color: "transparent",
            lineHeight: "1.2",
          }}
        >
          Monika Helgesen
        </h1>

        <p className="text-lg md:text-2xl text-[#f0ead8] mt-4 leading-relaxed">
          Kitchmalerinne<br />
          <span className="text-yellow-200">Maleri · Tegning · Grafikk</span>
        </p>
      </div>
    </section>
  );
}
