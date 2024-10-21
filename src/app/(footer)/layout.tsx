import Footer from "@/app/(footer)/_components/Footer";
import CheckLogin from "./_components/CheckLogin";
import CheckResult from "./_components/CheckResult";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CheckLogin>
      <CheckResult>
        {children}
        <Footer />
      </CheckResult>
    </CheckLogin>
  );
}
