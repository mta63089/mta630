import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

// export function cn(...inputs: ClassValue[]) {
//     return twMerge(clsx(inputs));
// }

const cn = (...inputs: Parameters<typeof cx>) => twMerge(cx(inputs));

export { cn };
