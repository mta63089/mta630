import { Icons } from "./icons"
import { Button } from "./ui/button"

export function Portfolio() {
  const skills = [
    {
      display: "TypeScript",
      icon: () => <Icons.typescript />,
    },
    {
      display: "JavaScript",
      icon: () => <Icons.javascript />,
    },
    {
      display: "Python",
      icon: () => <Icons.python />,
    },
    {
      display: "C#",
      icon: () => <Icons.csharp />,
    },
    {
      display: "CypressIO",
      icon: () => <Icons.cypress />,
    },
    {
      display: "AWS",
      icon: () => <Icons.aws />,
    },
    {
      display: "TailwindCSS",
      icon: () => <Icons.tailwind />,
    },
    {
      display: "Nextjs",
      icon: () => <Icons.nextjs />,
    },
    {
      display: "PostgreSQL",
      icon: () => <Icons.postgresql />,
    },
    {
      display: "MySQL",
      icon: () => <Icons.mysql />,
    },
    {
      display: "Google Cloud",
      icon: () => <Icons.gcloud />,
    },
    {
      display: "React",
      icon: () => <Icons.react />,
    },
    {
      display: "Bash",
      icon: () => <Icons.bash />,
    },
  ]

  const Skills = () => (
    <>
      {skills.map((skill) => (
        <div
          key={skill.display}
          className="border-4 border-black bg-white p-4 text-center text-2xl font-bold shadow-[8px_8px_0_0_#000] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none dark:border-white dark:bg-zinc-900 dark:text-white dark:shadow-[8px_8px_0_0_#fff] dark:hover:shadow-none"
        >
          <skill.icon /> {skill.display}
        </div>
      ))}
    </>
  )

  return (
    <>
      <section className="pt-4">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-block border-4 border-black bg-red-500 px-4 py-2 font-bold text-white shadow-[8px_8px_0_0_#000] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none dark:border-white dark:shadow-[8px_8px_0_0_#fff] dark:hover:shadow-none">
                Full-Stack Developer
              </div>
              <h1 className="text-4xl leading-tight font-black tracking-tighter uppercase md:text-6xl">
                Crafting Digital Experiences
              </h1>
              <p className="border-l-4 border-red-500 pl-4 text-lg text-gray-600 dark:text-gray-300">
                Hi, i&apos;m Michael Albert. I&apos;m an experienced Full Stack
                Developer and Software Engineer and i&apos;m commited to making
                interesting and useful tools for the modern web.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button>View Projects</Button>
                <Button>Contact Me</Button>
              </div>
            </div>
            <div className="relative h-[400px] w-2/3 border-4 border-black shadow-[8px_8px_0_0_#000] dark:border-white dark:shadow-[8px_8px_0_0_#fff]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-accent/30 py-4 dark:bg-zinc-800">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-center text-4xl font-black tracking-tighter uppercase dark:text-white"></h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <Skills />
          </div>
        </div>
      </section>
      <section></section>
    </>
  )
}
