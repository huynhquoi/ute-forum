import { ApolloWrapper } from "@/lib/ApolloWrapper";
import MainHeader from "@/components/layout/main-header";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainHeader inUser={true} />
      <ApolloWrapper>
        <div className="h-[calc(100vh-56px)]">{children}</div>
        <Toaster />
      </ApolloWrapper>
    </>
  );
}
