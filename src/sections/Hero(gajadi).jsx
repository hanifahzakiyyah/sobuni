import { motion } from "motion/react"
import { useState } from "react";

const images = [
  "/a.png",
  "/b.png",
  "/c.png",
  "/d.png"
];
const ornamen = [
  "/1.webp",
  "/2.webp",
  "/3.webp",
  "/4.webp",
  "/5.webp",
  "/6.webp",
  "/7.webp",
  "/8.webp",
]


function Hero() {

  const [rotation, setRotation] = useState(0);
  const handleDragEnd = (_, info) => {
    const swipeY = info.offset.y;

    // Swipe ke atas
    if (swipeY < -50) {
      setRotation((prev) => prev + 90);
    }

    // Swipe ke bawah
    if (swipeY > 50) {
      setRotation((prev) => prev - 90);
    }
  };
  
  return (
    <section className="min-h-screen bg-[#F7F2E8]">
      <div className="overflow-hidden mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex min-h-screen flex-col-reverse items-center gap-12 py-16 lg:flex-row lg:gap-8 lg:py-0">

          {/* LEFT */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-5xl font-bold leading-tight text-green-700 md:text-6xl lg:text-7xl">
              World's Best
              <br />
              Quality Juice.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates necessitatibus, eaque consequatur deserunt
              molestiae atque.
            </p>

            <button className="mt-10 rounded-full bg-green-600 px-10 py-4 text-lg font-semibold text-white shadow-lg transition hover:scale-105">
              Order Now
            </button>

            <div className="mt-14 flex gap-12">
              <div>
                <h3 className="text-4xl font-bold text-green-700">25+</h3>
                <p className="text-gray-600">Flavor's</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-green-700">20+</h3>
                <p className="text-gray-600">Expert's</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-green-700">70+</h3>
                <p className="text-gray-600">Shop's</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex w-full justify-center lg:w-1/2">
            <div className="relative">
              <div className="absolute w-125 h-125 -top-60 -left-60 rounded-full bg-green-200 blur-3xl" />

              {/* ornamen blur*/}
              <motion.div
                className="absolute w-44 h-44 flex items-center justify-center z-0 blur-xs"
                animate={{ rotate: rotation }}
                transition={{ duration: 1 }}
              >
                <motion.div
                  animate={{ rotate: -rotation }}
                  transition={{ duration: 0.8 }}
                  className="absolute -top-60 -right-4"
                >
                  <img src={ornamen[0]} className="w-44 h-44 pointer-events-none" />
                </motion.div>
                <motion.div
                  animate={{ rotate: -rotation }}
                  transition={{ duration: 0.8 }}
                  className="absolute top-9 -left-60"
                >
                  <img src={ornamen[1]} className="w-44 h-44 pointer-events-none" />
                </motion.div>
                <motion.div
                  animate={{ rotate: -rotation }}
                  transition={{ duration: 0.8 }}
                  className="absolute bottom-0 -right-70"
                >
                  <img src={ornamen[2]} className="w-44 h-44 pointer-events-none" />
                </motion.div>
                <motion.div
                  animate={{ rotate: -rotation }}
                  transition={{ duration: 0.8 }}
                  className="absolute -bottom-80 -left-10"
                >
                  <img src={ornamen[3]} className="w-44 h-44 pointer-events-none" />
                </motion.div>
              </motion.div>


              {/* ornamen depan*/}
              <motion.div
                className="absolute w-44 h-44 flex items-center justify-center z-30 pointer-events-none"
                animate={{ rotate: rotation }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{ rotate: -rotation }}
                  transition={{ duration: 0.8 }}
                  className="absolute -top-10 right-4"
                >
                  <img src={ornamen[4]} className="w-44 h-44 pointer-events-none" />
                </motion.div>
                <motion.div
                  animate={{ rotate: -rotation }}
                  transition={{ duration: 0.8 }}
                  className="absolute top-9 -left-60"
                >
                  <img src={ornamen[5]} className="w-44 h-44 pointer-events-none" />
                </motion.div>
                {/* <motion.div
                  animate={{ rotate: -rotation }}
                  transition={{ duration: 0.8 }}
                  className="absolute bottom-0 -right-70"
                >
                  <img src={ornamen[6]} className="w-44 h-44 pointer-events-none" />
                </motion.div>
                <motion.div
                  animate={{ rotate: -rotation }}
                  transition={{ duration: 0.8 }}
                  className="absolute -bottom-80 -left-10"
                >
                  <img src={ornamen[7]} className="w-44 h-44 pointer-events-none" />
                </motion.div> */}
              </motion.div>

              <motion.div 
                className="absolute w-96 h-96 flex items-center justify-center z-10"
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                onDragEnd={handleDragEnd}
                animate={{ rotate: rotation }}
                transition={{ duration: 0.5 }}
              >
                {/* produk */}
                <motion.div
                  animate={{ rotate: -rotation }}
                  transition={{ duration: 0.5 }}
                  className="absolute -top-60 -right-60"
                >
                  <img src={images[1]} className="w-96 h-96 pointer-events-none" />
                </motion.div>

                <motion.div
                  animate={{ rotate: -rotation }}
                  transition={{ duration: 0.5 }}
                  className="absolute -top-60 -left-60"
                >
                  <img src={images[0]} className="w-96 h-96 pointer-events-none" />
                </motion.div>

                <motion.div
                  animate={{ rotate: -rotation }}
                  transition={{ duration: 0.5 }}
                  className="absolute -bottom-60 -right-60"
                >
                  <img src={images[2]} className="w-96 h-96 pointer-events-none" />
                </motion.div>

                <motion.div
                  animate={{ rotate: -rotation }}
                  transition={{ duration: 0.5 }}
                  className="absolute -bottom-60 -left-60"
                >
                  <img src={images[3]} className="w-96 h-96 pointer-events-none" />
                </motion.div>

              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;