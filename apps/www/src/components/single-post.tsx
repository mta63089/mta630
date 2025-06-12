// import Image from "next/image"
// import { MessageSquare, MoreHorizontal, Share2, ThumbsUp } from "lucide-react"

// import { authors } from "@/config/authors"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"

// interface Post {
//   title: string
//   author: string
//   date: string
//   imageSrc: string
// }

// const comments = [
//   {
//     id: 1,
//     author: "Dr. Hiroki Sato",
//     avatar:
//       "https://placehold.co/900/EBEDED/C3C9C9?text=O&font=poppins.svg?height=32&width=32",
//     date: "May 10, 2024",
//     content:
//       "Excellent article, Dr. Thorne! The clarity with which you explain complex quantum concepts is invaluable. I appreciate the focus on rigorous testing and simulation.",
//     likes: 25,
//   },
//   {
//     id: 2,
//     author: "Lena Petrova",
//     avatar:
//       "https://placehold.co/900/EBEDED/C3C9C9?text=O&font=poppins.svg?height=32&width=32",
//     date: "May 11, 2024",
//     content:
//       "As someone relatively new to quantum computing, I found the best practices section incredibly helpful. I'm particularly excited about the automated programming tools mentioned.",
//     likes: 18,
//   },
//   {
//     id: 3,
//     author: "Jamal Abdi",
//     avatar:
//       "https://placehold.co/900/EBEDED/C3C9C9?text=O&font=poppins.svg?height=32&width=32",
//     date: "May 11, 2024",
//     content:
//       "I'm keen to learn more about how to optimize quantum algorithms for specific quantum hardware. Could you provide additional resources on hardware-specific optimization?",
//     likes: 12,
//   },
// ]

// const relatedArticles = [
//   {
//     title: "Quantum Supremacy and Beyond: The Future of Computation",
//     image: "https://placehold.co/900/EBEDED/C3C9C9?text=O&font=poppins.svg",
//     excerpt:
//       "Exploring the implications of achieving quantum supremacy and the challenges ahead.",
//     readTime: "5 minutes",
//   },
//   {
//     title: "Quantum Error Correction: The Key to Reliable Quantum Computing",
//     image: "https://placehold.co/900/EBEDED/C3C9C9?text=O&font=poppins.svg",
//     excerpt:
//       "An in-depth look at techniques for mitigating errors in quantum computations.",
//     readTime: "8 minutes",
//   },
//   // Add more related articles as needed
// ]

// export function SinglePost(post: Post) {
//   const authorImageSrc = authors[post.author] || "/placeholder.png"
//   return (
//     <div className="container mx-auto py-8">
//       <main className="flex flex-col gap-8 lg:flex-row">
//         <article className="lg:w-2/3">
//           <header className="not-format mb-4 lg:mb-6">
//             <address className="mb-6 flex items-center not-italic">
//               <div className="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white">
//                 <Image
//                   className="ring-primary mr-4 h-16 w-16 rounded-full ring-2"
//                   src={post.imageSrc}
//                   alt={post.author}
//                   height={64}
//                   width={64}
//                 />
//                 <div>
//                   <a
//                     href="#"
//                     rel="author"
//                     className="text-xl font-bold text-gray-900 dark:text-white"
//                   >
//                     {BlogPost.author}
//                   </a>
//                   <p className="text-base text-gray-500 dark:text-gray-400">
//                     <time dateTime="2024-05-10">{BlogPost.date}</time>
//                   </p>
//                 </div>
//               </div>
//             </address>
//             <h1 className="mb-4 text-3xl leading-tight font-extrabold text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
//               {BlogPost.title}
//             </h1>
//           </header>
//           <div
//             className="prose dark:prose-invert prose-img:aspect-video prose-img:object-cover max-w-none"
//             dangerouslySetInnerHTML={{ __html: BlogPost.content }}
//           ></div>
//           <div className="mt-8 flex items-center justify-between">
//             <div className="flex space-x-4">
//               <Button variant="outline" size="sm">
//                 <ThumbsUp className="mr-2 h-4 w-4" />
//                 Like
//               </Button>
//               <Button variant="outline" size="sm">
//                 <MessageSquare className="mr-2 h-4 w-4" />
//                 Comment
//               </Button>
//               <Button variant="outline" size="sm">
//                 <Share2 className="mr-2 h-4 w-4" />
//                 Share
//               </Button>
//             </div>
//           </div>
//           <section className="not-format mt-8">
//             <h2 className="mb-6 text-2xl font-bold">
//               Discussion ({comments.length})
//             </h2>
//             <form className="mb-6">
//               <div className="mb-4 rounded-lg rounded-t-lg border">
//                 <label htmlFor="comment" className="sr-only">
//                   Your comment
//                 </label>
//                 <Textarea
//                   id="comment"
//                   rows={6}
//                   placeholder="Write a comment..."
//                   required
//                 />
//               </div>
//               <Button type="submit">Post comment</Button>
//             </form>
//             {comments.map((comment) => (
//               <Card key={comment.id} className="mb-6">
//                 <Card.Content className="p-6">
//                   <footer className="mb-2 flex items-center justify-between">
//                     <div className="flex items-center">
//                       <Avatar className="mr-3 h-8 w-8">
//                         <AvatarImage
//                           src={comment.avatar}
//                           alt={comment.author}
//                         />
//                         <AvatarFallback>{comment.author[0]}</AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <span className="font-semibold">{comment.author}</span>
//                         <p className="text-sm">
//                           <time dateTime="2024-05-10">{comment.date}</time>
//                         </p>
//                       </div>
//                     </div>
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="sm">
//                           <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem>Edit</DropdownMenuItem>
//                         <DropdownMenuItem>Remove</DropdownMenuItem>
//                         <DropdownMenuItem>Report</DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </footer>
//                   <p className="text-gray-500 dark:text-gray-400">
//                     {comment.content}
//                   </p>
//                   <div className="mt-4 flex items-center space-x-4">
//                     <Button variant="ghost" size="sm">
//                       <ThumbsUp className="mr-1 h-3 w-3" />
//                       {comment.likes}
//                     </Button>
//                     <Button variant="ghost" size="sm">
//                       <MessageSquare className="mr-1 h-3 w-3" />
//                       Reply
//                     </Button>
//                   </div>
//                 </Card.Content>
//               </Card>
//             ))}
//           </section>
//         </article>
//         <aside className="lg:w-1/3">
//           <Card>
//             <Card.Content className="p-6">
//               <h3 className="mb-4 text-lg font-semibold">Related articles</h3>
//               {relatedArticles.map((article, index) => (
//                 <div key={index} className="mb-4">
//                   <Image
//                     width={32}
//                     height={32}
//                     src="https://placehold.co/900/EBEDED/C3C9C9?text=O&font=poppins.svg"
//                     alt={article.title}
//                     className="mb-2 h-48 w-full rounded-lg object-cover"
//                   />
//                   <h4 className="mb-2 text-xl leading-tight font-bold">
//                     <a href="#">{article.title}</a>
//                   </h4>
//                   <p className="mb-2">{article.excerpt}</p>
//                   <a
//                     href="#"
//                     className="inline-flex items-center font-medium hover:underline"
//                   >
//                     Read in {article.readTime}
//                   </a>
//                 </div>
//               ))}
//             </Card.Content>
//           </Card>
//           <Card className="mt-6">
//             <Card.Content className="p-6">
//               <h3 className="mb-4 text-lg font-semibold">
//                 Sign up for our newsletter
//               </h3>
//               <p className="mb-4">
//                 Stay informed about the latest advancements and insights from
//                 QuantumLeap AI. Sign up with your email below.
//               </p>
//               <form>
//                 <div className="mb-4">
//                   <Input
//                     type="email"
//                     placeholder="Your email address"
//                     required
//                   />
//                 </div>
//                 <Button type="submit" className="w-full">
//                   Subscribe
//                 </Button>
//               </form>
//             </Card.Content>
//           </Card>
//         </aside>
//       </main>
//     </div>
//   )
// }
