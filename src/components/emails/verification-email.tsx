import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface UserVerificationEmailProps {
  userName: string;
  userEmail: string;
  verificationUrl: string;
}

const UserVerificationEmail = (props: UserVerificationEmailProps) => {
  const { userName, userEmail, verificationUrl } = props;

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        Verify your email address to complete your account setup
      </Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[24px] font-bold text-gray-900 m-0 mb-[8px]">
                Verify Your Email Address
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                Welcome to Ordr! Please verify your email to get started.
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                Hi {userName},
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                Thanks for signing up for Ordr! To complete your account setup
                and ensure the security of your account, please verify your
                email address by clicking the button below.
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px]">
                This verification link will expire in 24 hours for security
                reasons.
              </Text>
            </Section>

            {/* Verification Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={verificationUrl}
                className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[6px] text-[16px] font-semibold no-underline box-border"
              >
                Verify Email Address
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                If the button above doesn&apos;t work, you can also verify your
                email by copying and pasting this link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 break-all">
                <Link
                  href={verificationUrl}
                  className="text-blue-600 underline"
                >
                  {verificationUrl}
                </Link>
              </Text>
            </Section>

            {/* Security Notice */}
            <Section className="bg-gray-50 p-[16px] rounded-[6px] mb-[32px]">
              <Text className="text-[14px] text-gray-700 leading-[20px] m-0">
                <strong>Security Notice:</strong> If you didn&apos;t create an
                account with Ordr, please ignore this email. Your email address
                will not be added to our system.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                This email was sent to {userEmail}
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                Ordr, 123 Business Street, Suite 100, Business City, BC 12345
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                © 2024 Ordr. All rights reserved. |
                <Link href="#" className="text-gray-500 underline ml-[4px]">
                  Unsubscribe
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

UserVerificationEmail.PreviewProps = {
  userEmail: "putraadi.pradana29@gmail.com",
  verificationUrl: "https://yourapp.com/verify?token=abc123xyz789",
  companyName: "YourApp",
};

export default UserVerificationEmail;
