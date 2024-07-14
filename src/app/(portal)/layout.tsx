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
      <MainHeader />
      <ApolloWrapper>
        <div className="grid grid-cols-7 h-[calc(100vh-72px)]">
          <div className="col-span-1"></div>
          <div className="col-span-5">{children}</div>
          <div className="col-span-1"></div>
        </div>
        <Toaster />
      </ApolloWrapper>
    </>
  );
}