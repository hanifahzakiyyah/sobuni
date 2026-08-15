import EditableImage from "./EditableImage";

const Navbar = ({isAdmin}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-[#f1f2f3]">
      <nav className="mx-auto flex h-25.5 max-w-300 items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <div className="flex flex-col leading-none">
          <EditableImage
            value="/logo.png"
            field="logo"
            collection="siteContent"
            document="navbar"
            title="Navbar Logo"
            isAdmin={isAdmin}
            className="w-34 md:w-40"
          >
            {(value) => (
              <img
                src={value}
                alt="Sloeskin"
                className="h-auto w-full"
              />
            )}
          </EditableImage>
        </div>

        {/* CTA */}
        <a
          href="#belanja"
          className="flex h-12 w-30 items-center justify-center bg-[#1d1d1f] text-[14px] text-white transition-colors duration-300 hover:bg-black md:h-14 md:w-40.75 md:text-[18px] rounded-lg"
        >
          Belanja
        </a>
      </nav>
    </header>
  );
};

export default Navbar;