import Catalog from "./sections/Catalog"
import Footer from "./sections/Footer"
import Hero from "./sections/Hero"
import Navbar from "./sections/Navbar"
import Why from "./sections/Why"

function App() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <Catalog/>
      <Why/>
      <Footer/>
    </>
  )
}

export default App