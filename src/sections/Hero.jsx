import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase/config";
import EditableText from "./EditableText";


const Hero = ({isAdmin}) => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const heroRef = doc(db, "siteContent", "hero");
        const heroSnap = await getDoc(heroRef);

        if (heroSnap.exists()) {
          setHero(heroSnap.data());
        }
      } catch (error) {
        console.error("Gagal mengambil data Hero:", error);
      }
    };

    fetchHero();
  }, []);

  if (!hero) {
    return null;
  }
  
  const renderFeatureIcon = (icon) => {
    const commonProps = {
      width: 21,
      height: 21,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.5,
    };

    switch (icon) {
      case "shield":
        return (
          <svg {...commonProps}>
            <path d="M12 3 20 7v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Z" />
          </svg>
        );

      case "leaf":
        return (
          <svg {...commonProps}>
            <path d="M20 4C11 4 5 8 4 17c5-1 10-4 13-9" />
            <path d="M4 17c2-2 4-4 7-5" />
          </svg>
        );

      case "family":
        return (
          <svg {...commonProps}>
            <circle cx="9" cy="8" r="2.5" />
            <circle cx="17" cy="9" r="2" />
            <path d="M4 19c0-3 2-5 5-5s5 2 5 5" />
            <path d="M15 14c3 0 5 2 5 5" />
          </svg>
        );

      case "heart":
        return (
          <svg {...commonProps}>
            <path d="M20.8 8.8c0 5.5-8.8 10.2-8.8 10.2S3.2 14.3 3.2 8.8A4.8 4.8 0 0 1 12 6a4.8 4.8 0 0 1 8.8 2.8Z" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <section className="bg-[#f1f2f3]">

      {/* ================= HERO ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 p-5 -mb-10">

        {/* Left - Content */}
        <div className="flex flex-col justify-center px-8 py-16 md:px-[10%] md:py-20">

          {/* Eyebrow */}
          <EditableText
            value={hero.eyebrow}
            field="eyebrow"
            collection="siteContent"
            document="hero"
            title="Eyebrow"
            isAdmin={isAdmin}
            className="mb-2 md:mb-8"
          >
            {(value) => (
              <span className="block text-[10px] tracking-[0.25em] text-[#1d1d1f] md:text-[14px]">
                {value}
              </span>
            )}
          </EditableText>


          {/* Title */}
          <EditableText
            value={hero.title}
            field="title"
            collection="siteContent"
            document="hero"
            title="Title"
            isAdmin={isAdmin}
            multiline
            className="max-w-162.5"
          >
            {(value) => (
              <h1 className="whitespace-pre-line font-serif text-[42px] leading-[0.95] tracking-[-2px] text-[#1d1d1f] md:text-[64px] lg:text-[68px]">
                {value}
              </h1>
            )}
          </EditableText>


          {/* Description */}
          <EditableText
            value={hero.description}
            field="description"
            collection="siteContent"
            document="hero"
            title="Description"
            isAdmin={isAdmin}
            multiline
            className="mt-5 max-w-150 md:mt-10"
          >
            {(value) => (
              <p className="text-[16px] leading-[1.55] text-[#1d1d1f] md:text-[18px]">
                {value}
              </p>
            )}
          </EditableText>


          {/* Button */}
          <EditableText
            value={hero.buttonText}
            field="buttonText"
            collection="siteContent"
            document="hero"
            title="Button Text"
            isAdmin={isAdmin}
            className="mt-14"
          >
            {(value) => (
              <a
                href={hero.buttonLink}
                className="flex h-14 w-36 items-center justify-center rounded-lg bg-[#1d1d1f] text-[18px] text-white transition-colors duration-300 hover:bg-black md:h-16 md:w-40 md:text-[21px]"
              >
                {value}
              </a>
            )}
          </EditableText>

        </div>

        {/* Right - Image */}
        <div className="h-[70vh] min-h-125 md:h-auto p-5 md:p-15">
          <img
            src="/hero.png"
            alt="Sloeskin Gentle Facial Wash"
            className="h-full w-full object-cover"
          />
        </div>

      </div>




      <div className="mx-auto flex max-w-225 flex-col gap-4 md:flex-row md:items-center md:justify-center md:gap-5 mt-10 md:mt-0">
      {hero.phills?.map((pill, index) => (
        <div
          key={index}
          className="flex h-9 w-fit shrink-0 m-auto items-center justify-center gap-4 rounded-full border border-[#1d1d1f] px-7 text-[14px] text-[#1d1d1f] md:h-12 md:px-8"
        >

          {renderFeatureIcon(pill.icon)}

          <EditableText
            value={pill.text}
            field="text"
            collection="siteContent"
            document="hero"
            title={`Pill ${index + 1}`}
            isAdmin={isAdmin}
            arrayField="phills"
            arrayIndex={index}
            arrayProperty="text"
          >
            {(value) => (
              <span>
                {value}
              </span>
            )}
          </EditableText>

        </div>
    ))}
    </div>

    <div className="mx-auto flex max-w-225 flex-col gap-4 md:flex-row items-center justify-center md:gap-5 border-y py-5 mt-10 border-slate-400">
    {hero.infos?.map((info, index) => (
      <EditableText
        key={index}
        value={info}
        field="info"
        collection="siteContent"
        document="hero"
        title={`Info ${index + 1}`}
        isAdmin={isAdmin}
        arrayField="infos"
        arrayIndex={index}
        arrayProperty={null}
      >
        {(value) => (
          <span>{value}</span>
        )}
      </EditableText>
    ))}
    </div>

    </section>
  );
};

export default Hero;