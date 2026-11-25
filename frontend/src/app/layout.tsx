import Layout from "@/src/shared/ui/layout/Layout";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({ children, params }: LayoutProps<"/">) {
  return (<html lang="en" className={cn("h-full antialiased", "font-sans", geist.variable)}>
    <body className="min-h-full flex flex-col">
      <Layout>{children}</Layout>
    </body>
  </html>)
}
