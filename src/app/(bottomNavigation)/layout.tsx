import BottomNavigation from "@/app/(bottomNavigation)/_components/BottomNavigation";
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
        <BottomNavigation />
      </CheckResult>
    </CheckLogin>
  );
}
