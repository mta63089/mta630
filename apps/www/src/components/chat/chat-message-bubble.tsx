import { cn } from "@/utils/cn"
import type { Message } from "ai/react"

export function ChatMessageBubble(props: {
  message: Message
  aiEmoji?: string
  sources: any[]
}) {
  return (
    <div
      className={cn(
        `mb-8 flex max-w-[80%] rounded-[24px]`,
        props.message.role === "user"
          ? "bg-secondary text-secondary-foreground px-4 py-2"
          : null,
        props.message.role === "user" ? "ml-auto" : "mr-auto"
      )}
    >
      {props.message.role !== "user" && (
        <div className="bg-secondary -mt-2 mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border">
          {props.aiEmoji}
        </div>
      )}

      <div className="flex flex-col whitespace-pre-wrap">
        <span>{props.message.content}</span>

        {props.sources && props.sources.length ? (
          <>
            <code className="bg-primary mt-4 mr-auto rounded px-2 py-1">
              <h2>🔍 Sources:</h2>
            </code>
            <code className="bg-primary mt-1 mr-2 rounded px-2 py-1 text-xs">
              {props.sources?.map((source, i) => (
                <div className="mt-2" key={"source:" + i}>
                  {i + 1}. &quot;{source.pageContent}&quot;
                  {source.metadata?.loc?.lines !== undefined ? (
                    <div>
                      <br />
                      Lines {source.metadata?.loc?.lines?.from} to{" "}
                      {source.metadata?.loc?.lines?.to}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </code>
          </>
        ) : null}
      </div>
    </div>
  )
}
