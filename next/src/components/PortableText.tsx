// components/PortableText.tsx
"use client"

import { PortableText as PT } from "@portabletext/react"
import Image from "next/image"

export function PortableText({ value }: { value: any }) {
  return (
    <PT
      value={value}
      components={{
        types: {
          image: ({ value }: any) => (
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
