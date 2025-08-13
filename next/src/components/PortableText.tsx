// components/PortableText.tsx
"use client"

import { PortableText as PT, PortableTextBlock } from "@portabletext/react"
import Image from "next/image"

type Props = {
    value: PortableTextBlock[]
}

type SanityImageValue = {
  asset: {
    url: string
  }
  alt?: string
}

export function PortableText({ value }: Props) {
  return (
    <PT
      value={value}
      components={{
        types: {
          image: ({ value }: { value: SanityImageValue }) => (
            <div style={{ margin: "2rem 0" }}>
              <Image
                src={value.asset.url}
                alt={value.alt || " "}
                width={800}
                height={600}
              />
            </div>
          ),
        },
      }}
    />
  )
}
