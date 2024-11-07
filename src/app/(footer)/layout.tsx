import Footer from "@/app/(footer)/_components/Footer";
import CheckResult from "./_components/CheckResult";
import CheckLogin from "./_components/CheckLogin";

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
