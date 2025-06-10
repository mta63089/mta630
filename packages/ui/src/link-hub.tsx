import * as React from "react";
import { Icons } from "./icons";
import { Card, CardContent } from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface LinkItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const linkItems: LinkItem[] = [
  {
    href: "https://twitter.com",
    label: "Twitter",
    icon: <Icons.twitter className="size-6" />,
  },
  {
    href: "https://facebook.com",
    label: "Facebook",
    icon: <Icons.facebook className="size-6" />,
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: <Icons.instagram className="size-6" />,
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: <Icons.linkedin className="size-6" />,
  },
  {
    href: "https://github.com",
    label: "GitHub",
    icon: <Icons.gitHub className="size-6" />,
  },
  {
    href: "https://youtube.com",
    label: "YouTube",
    icon: <Icons.youtube className="size-6" />,
  },
  {
    href: "https://twitch.tv",
    label: "Twitch",
    icon: <Icons.twitch className="size-6" />,
  },
  {
    href: "https://slack.com",
    label: "Slack",
    icon: <Icons.slack className="size-6" />,
  },
  {
    href: "https://figma.com",
    label: "Figma",
    icon: <Icons.figma className="size-6" />,
  },
];

interface LinkHubProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  links?: LinkItem[];
}

export function LinkHub({ links = linkItems, ...props }: LinkHubProps) {
  return (
    <section className="container py-16" {...props}>
      <Card className="mx-auto py-16">
        <CardContent className="p-6">
          <h2 className="mb-10 text-center text-2xl font-bold">
            Connect With Us
          </h2>
          <TooltipProvider>
            <div className="mx-auto grid max-w-2xl grid-cols-5 gap-4 sm:grid-cols-10">
              {links.map((link) => (
                <Tooltip key={link.href}>
                  <TooltipTrigger asChild>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-12 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10 p-2 text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      {link.icon}
                      <span className="sr-only">{link.label}</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{link.label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>
    </section>
  );
}
