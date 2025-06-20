import Image from "next/image"
import { Mail } from "lucide-react"

import { Icons } from "./icons"

export default function About() {
  return (
    <section className="mx-8 py-4 md:py-8">
      <div className="mb-12 grid flex-1 grid-cols-2 gap-8">
        <div className="flex flex-1 flex-col gap-8">
          <h2 className="tracking-tights mb-6 text-3xl font-bold md:text-5xl">
            <span className="text-foreground">Welcome to </span>
            <span className="text-primary">mta630.com</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            a space for building fast, modular software without the bloat. We
            dont do bloated frameworks or corporate buzzwords. We craft
            high-performance tools and products that are actually enjoyable to
            use - both for users and developers.
          </p>

          <p className="text-muted-foreground text-lg leading-relaxed">
            At the core of everything we make is our custom-built system of
            composable blocks. Think of it like digital infrastructure LEGO -
            pre-built, tested, and ready to snap into place. Whether it's an
            admin dashboard, e-commerce flow, or user auth - if it's repetitive,
            we've likely automated it already.
          </p>

          <p className="text-muted-foreground text-lg leading-relaxed">
            This lets us go from idea to production in days, not months —
            without sacrificing structure or scale. It's how we've helped solo
            founders ship polished MVPs and helped larger teams modernize legacy
            systems without throwing everything away.
          </p>

          <p className="text-muted-foreground text-lg leading-relaxed">
            If you're tired of over-engineered tech or starting from scratch
            every time — you're in the right place. We're here to build smarter,
            move faster, and keep it simple.
          </p>
        </div>

        <div className="space-y-8">
          <div className="relative flex h-96 w-full items-center justify-center border-4 shadow-2xl">
            <Image
              src="https://cdn.pixabay.com/photo/2018/04/06/15/17/pattern-3296033_960_720.png"
              alt="koi fish"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="text-foreground space-y-2 text-sm">
              <p className="flex items-center">
                <Mail className="text-primary mr-2 size-4" /> Mike@ddubb.net
              </p>
              <p className="flex items-center">
                <Icons.gitHub className="text-primary mr-2 size-4" /> @mta63089
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex h-[800px] items-center justify-center border-4 shadow-2xl">
        <Image
          src="https://cdn.pixabay.com/photo/2023/10/14/09/19/sunset-8314419_960_720.png"
          alt="BlockCraft Studios team collaborating"
          fill
          className="object-cover"
        />
      </div>
    </section>
  )
}
