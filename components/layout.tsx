import Header from "./header"
//import Footer from "./footer"
import NavBar from "./nav"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}