import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

interface VerificationEmailProps {
  username?: string
  url?: string
}

export const VerificationEmail = ({
  username,
  url,
}: VerificationEmailProps) => {
  const previewText = `Verify your email to activate your BeatShare account`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-4 font-sans">
          <Container className="mx-auto my-10 max-w-xl rounded-md border border-solid border-[#eaeaea] p-6">
            <Heading className="mb-4 text-center text-2xl font-bold text-black">
              Verify your email address
            </Heading>

            <Text className="text-base leading-relaxed text-black">
              Hi {username ?? "there"},
            </Text>

            <Text className="text-base leading-relaxed text-black">
              Thank you for signing up for <strong>mta630.com</strong>. To get
              started, please verify your email address by clicking the button
              below.
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-sm font-medium text-white no-underline"
                href={url}
              >
                Verify Email
              </Button>
            </Section>

            <Text className="text-base leading-relaxed text-black">
              If the button above doesn&apos;t work, copy and paste the
              following link into your browser:
            </Text>
            <Text className="text-sm break-words text-blue-600">
              <Link href={url}>{url}</Link>
            </Text>

            <Hr className="my-6 border-t border-gray-300" />

            <Text className="text-xs leading-relaxed text-gray-600">
              This email was sent to{" "}
              <span className="text-black">{username ?? "your address"}</span>.
              If you didn&apos;t sign up for mta630.com, you can safely ignore
              this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export function reactVerificationEmail(props: VerificationEmailProps) {
  return <VerificationEmail {...props} />
}
