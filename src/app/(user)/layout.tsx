import { ApolloWrapper } from "@/lib/ApolloWrapper";
import MainHeader from "@/components/layout/main-header";

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
      </ApolloWrapper>
    </>
  );
}
