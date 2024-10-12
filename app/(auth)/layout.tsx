import Footer from "@/components/layout/footer";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <div className="h-1 bg-primary"></div>
      <div className="fixed h-screen w-full bg-gradient-to-br from-gray-50 via-white to-emerald-100 dark:bg-gradient-to-br dark:from-gray-800 dark:via-emerald-950 dark:to-slate-950" />

      <main className="z-10 flex h-[calc(100vh-80px)] min-h-[600px]  w-full flex-col items-center justify-center py-16">
        {children}
      </main>

      <Footer />
    </>
  );
}
