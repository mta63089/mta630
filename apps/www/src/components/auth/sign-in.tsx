"use client"

import { useState } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"

import { signIn } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Icons } from "../icons"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <Card className="mx-auto max-w-md flex-1 justify-center">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              value={email}
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>

            <Input
              id="password"
              type="password"
              placeholder="password"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              onClick={() => {
                setRememberMe(!rememberMe)
              }}
            />
            <Label htmlFor="remember">Remember me</Label>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            onClick={async () => {
              await signIn.email(
                {
                  email,
                  password,
                },
                {
                  onRequest: () => {
                    setLoading(true)
                  },
                  onResponse: () => {
                    setLoading(false)
                  },
                }
              )
            }}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <p> Login </p>
            )}
          </Button>

          <div
            className={cn(
              "flex w-full items-center gap-2",
              "flex-col justify-between"
            )}
          >
            <Button
              variant="outline"
              className={cn("w-full gap-2")}
              disabled={loading}
              onClick={async () => {
                await signIn.social(
                  {
                    provider: "google",
                    callbackURL: "/dashboard",
                  },
                  {
                    onRequest: () => {
                      setLoading(true)
                    },
                    onResponse: () => {
                      setLoading(false)
                    },
                  }
                )
              }}
            >
              <Icons.google />
              Sign in with Google
            </Button>
            <Button
              variant="outline"
              className={cn("w-full gap-2")}
              disabled={loading}
              onClick={async () => {
                await signIn.social(
                  {
                    provider: "github",
                    callbackURL: "/dashboard",
                  },
                  {
                    onRequest: () => {
                      setLoading(true)
                    },
                    onResponse: () => {
                      setLoading(false)
                    },
                  }
                )
              }}
            >
              <Icons.gitHub />
              Sign in with Github
            </Button>
            <Button
              variant="outline"
              className={cn("w-full gap-2")}
              disabled={loading}
              onClick={async () => {
                await signIn.social(
                  {
                    provider: "discord",
                    callbackURL: "/dashboard",
                  },
                  {
                    onRequest: () => {
                      setLoading(true)
                    },
                    onResponse: () => {
                      setLoading(false)
                    },
                  }
                )
              }}
            >
              <Icons.discord />
              Sign in with Discord
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
