import NextImage from "next/image"
import Link from "next/link"
import { MDXComponents } from "mdx/types"

export const mdxComponents: MDXComponents = {
  // Override the default <a> element to use the next/link component.
  a: ({ href, children }) => (
    <Link
      className={
        "text-primary focus:ring-primary font-medium underline underline-offset-4 transition-colors hover:opacity-80 focus:ring-2"
      }
      href={href as string}
    >
      {children}
    </Link>
  ),
  h1: (props) => (
    <h1
      className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="font-display mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="[&>*]:text-muted-foreground mt-6 border-l-2 pl-6 italic"
      {...props}
    />
  ),
  p: (props) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
  ),
  table: (props) => (
    <table
      className="[&>thead>tr]:border-muted-foreground [&>tbody>tr]:border-muted-foreground w-full table-auto border-separate border-spacing-0 [&>tbody>tr]:border-b [&>thead>tr]:border-b"
      {...props}
    />
  ),
  ul: (props) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />,
  li: (props) => <li className="my-6 ml-6 list-disc" {...props} />,
  Image: (props) => <NextImage {...props} />,
  // Add a custom component.
  MyComponent: () => <div>Hello World!</div>,
}
