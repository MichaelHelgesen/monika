//import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button"


//import { poppins } from "@/app/layout";

export default function BioSection ({
}) {
  return (
<section className="bg-[#44544d] py-12 px-4 text-center about">
  <div className="max-w-2xl mx-auto">
    {/* Bilde av kunstneren */}
    <Image
      src="/monika.gif"  // bytt ut med riktig sti til bildet ditt
      alt="Animasjon"
      width={600}
      height={600}
      className="mx-auto mb-6 w-100 h-100 object-cover rounded-full shadow-lg"
    />

    <p className="text-xl text-gray-200">
      Monika Helgesen arbeider med maleri, tegning og grafikk – ofte inspirert av natur, stillhet og det menneskelige. Hun er utdannet ved ... og har hatt utstillinger i ...
    </p>
      <Button href="/om-monika" as="link" variant="accent">Les mer om kunstneren →</Button>
  </div>
</section>
  );
}
