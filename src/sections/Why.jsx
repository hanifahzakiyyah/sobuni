import EditableImage from "./EditableImage";
import EditableText from "./EditableText";

const Why = ({ isAdmin }) => {
  return (
    <section className="bg-[#f1f2f3] px-6 py-20 md:px-10 md:py-24" id="why">
      <div className="mx-auto grid max-w-312.5 grid-cols-1 md:grid-cols-2">

        {/* Image */}
        <EditableImage
          value="/hero.png"
          field="image"
          collection="siteContent"
          document="why"
          title="Why Image"
          isAdmin={isAdmin}
          className="aspect-square w-full overflow-hidden"
        >
          {(value) => (
            <img
              src={value}
              alt="Sbcskin skincare"
              className="h-full w-full object-cover"
            />
          )}
        </EditableImage>


        {/* Content */}
        <div className="flex flex-col justify-center px-6 py-12 md:px-12 lg:px-16">

          {/* EYEBROW */}
          <EditableText
            value="KENAPA SBCSKIN"
            field="eyebrow"
            collection="siteContent"
            document="why"
            title="Eyebrow"
            isAdmin={isAdmin}
          >
            {(value) => (
              <p className="text-[12px] tracking-[0.25em] text-[#1d1d1f] md:text-[14px]">
                {value}
              </p>
            )}
          </EditableText>


          {/* TITLE */}
          <EditableText
            value="Skincare nggak harus keras buat bekerja."
            field="title"
            collection="siteContent"
            document="why"
            title="Title"
            isAdmin={isAdmin}
            className="mt-7 max-w-175"
          >
            {(value) => (
              <h2 className="font-serif text-[38px] leading-[1.05] tracking-[-1.5px] text-[#1d1d1f] md:text-[48px]">
                {value}
              </h2>
            )}
          </EditableText>


          {/* PARAGRAPHS */}
          <div className="mt-8 max-w-175 space-y-7 text-[16px] leading-[1.7] text-[#1d1d1f] md:text-[18px]">

            {/* PARAGRAPH 1 */}
            <EditableText
              value="Kami percaya kulit yang sehat dimulai dari skin barrier yang dirawat, bukan dipaksa. Karena itu semua formula Sbcskin dibuat tanpa pewangi, tanpa alkohol, dan low-irritant — cukup lembut untuk kulit paling sensitif di rumah, dari anak sampai orang tua."
              field="paragraph1"
              collection="siteContent"
              document="why"
              title="Paragraph 1"
              isAdmin={isAdmin}
              multiline={true}
              className="w-full"
            >
              {(value) => (
                <p>
                  {value}
                </p>
              )}
            </EditableText>


            {/* PARAGRAPH 2 */}
            <EditableText
              value="Satu botol yang sama, bisa dipakai sekeluarga. Pelan-pelan, tapi pasti."
              field="paragraph2"
              collection="siteContent"
              document="why"
              title="Paragraph 2"
              isAdmin={isAdmin}
              multiline={true}
              className="w-full"
            >
              {(value) => (
                <p>
                  {value}
                </p>
              )}
            </EditableText>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Why;