import Footer from "@/components/layouts/Footer";
import CheckLogin from "./_components/layout/CheckLogin";
import CheckResult from "./_components/layout/CheckResult";

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
