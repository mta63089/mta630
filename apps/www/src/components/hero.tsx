"use client";

import { Button } from "@mta630/ui";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="prose relative w-full overflow-hidden py-16">
      <Image
        src="https://esosslfiles-a.akamaihd.net/uploads/wallpapers/b235f3550606917f73.jpg"
        alt="Three heroes readying for a battle in the desert"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/80" />
      <div className="container relative z-10 mx-auto flex h-full flex-col justify-end px-8">
        <div className="max-w-3xl space-y-8">
          <h1 className="motion-preset-slide-right motion-duration-1500 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Manage
            <span className="text-primary">
              {" "}
              and expand the reach of your guild
            </span>{" "}
            with our set of free tools
          </h1>
          <div className="motion-preset-slide-right motion-delay-1500 motion-duration-1500 text-xl text-foreground md:text-2xl">
            Create your guild&apos;s website, manage events, and connect with
            your members seamlessly. Our tools are designed to help you grow and
            engage your community effortlessly.
          </div>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              effect="ringHover"
              className="motion-preset-fade-lg motion-delay-3000 motion-duration-2000 bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <Link href="/trial">Get Started</Link>
            </Button>
            <Button
              variant="secondary"
              effect="ringHover"
              size="lg"
              className="motion-preset-fade-lg motion-delay-3500 motion-duration-2000"
              asChild
            >
              <Link href="/solutions">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
