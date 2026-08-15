import EditableImage from "./EditableImage";
import EditableText from "./EditableText";

const Footer = ({ isAdmin }) => {
  return (
    <footer className="rounded-t-md bg-cyan-700 px-6 py-16 text-white md:py-20">

      {/* Logo */}
      <div className="flex justify-center">
        <EditableImage
          value="/logo.png"
          field="logo"
          collection="siteContent"
          document="footer"
          title="Footer Logo"
          isAdmin={isAdmin}
          className="w-36 md:w-40"
        >
          {(value) => (
            <img
              src={value}
              alt="Sbcskin"
              className="h-auto w-full"
            />
          )}
        </EditableImage>
      </div>


      {/* Tagline */}
      <EditableText
        value="Lembut yang menenangkan."
        field="tagline"
        collection="siteContent"
        document="footer"
        title="Tagline"
        isAdmin={isAdmin}
        className="mt-8 w-full"
      >
        {(value) => (
          <p className="text-center font-serif text-[20px] italic text-white/90 md:text-[24px]">
            {value}
          </p>
        )}
      </EditableText>


      {/* Navigation */}
      <nav className="mt-12 flex items-center justify-center gap-10 md:gap-12">

        {/* Produk - STATIC */}
        <a
          href="#catalog"
          className="text-[16px] text-white/90 transition-opacity hover:opacity-60 md:text-[18px]"
        >
          Produk
        </a>


        {/* Tentang - STATIC */}
        <a
          href="#why"
          className="text-[16px] text-white/90 transition-opacity hover:opacity-60 md:text-[18px]"
        >
          Tentang
        </a>


        {/* Instagram - TEXT STATIC, URL EDITABLE */}
        <EditableText
          value="https://www.instagram.com/"
          field="instagramUrl"
          collection="siteContent"
          document="footer"
          title="Instagram URL"
          isAdmin={isAdmin}
        >
          {(value) => (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[16px] text-white/90 transition-opacity hover:opacity-60 md:text-[18px]"
            >
              Instagram
            </a>
          )}
        </EditableText>

      </nav>


      {/* Claims */}
      <div className="mt-14 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-center text-[11px] tracking-[0.2em] text-white/70 md:text-[14px]">

        <EditableText
          value="0% FRAGRANCE"
          field="claim1"
          collection="siteContent"
          document="footer"
          title="Claim 1"
          isAdmin={isAdmin}
        >
          {(value) => <span>{value}</span>}
        </EditableText>

        <span>·</span>

        <EditableText
          value="0% ALCOHOL"
          field="claim2"
          collection="siteContent"
          document="footer"
          title="Claim 2"
          isAdmin={isAdmin}
        >
          {(value) => <span>{value}</span>}
        </EditableText>

        <span>·</span>

        <EditableText
          value="BPOM"
          field="claim3"
          collection="siteContent"
          document="footer"
          title="Claim 3"
          isAdmin={isAdmin}
        >
          {(value) => <span>{value}</span>}
        </EditableText>

        <span>·</span>

        <EditableText
          value="HALAL"
          field="claim4"
          collection="siteContent"
          document="footer"
          title="Claim 4"
          isAdmin={isAdmin}
        >
          {(value) => <span>{value}</span>}
        </EditableText>

      </div>


      {/* Copyright */}
      <div className="mt-12 text-center text-[13px] text-white/50 md:text-[16px] m-auto flex justify-center items-center flex-col">

        <EditableText
          value="© 2026 Sobuni"
          field="copyright"
          collection="siteContent"
          document="footer"
          title="Copyright"
          isAdmin={isAdmin}
        >
          {(value) => (
            <span>{value}</span>
          )}
        </EditableText>

        <span className="mx-2">·</span>

        <EditableText
          value="sobuni.vercel.app"
          field="website"
          collection="siteContent"
          document="footer"
          title="Website"
          isAdmin={isAdmin}
        >
          {(value) => (
            <span>{value}</span>
          )}
        </EditableText>

      </div>

    </footer>
  );
};

export default Footer;