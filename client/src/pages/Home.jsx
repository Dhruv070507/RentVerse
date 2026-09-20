import Navbar from "../components/navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-32">
        <section className="max-w-5xl mx-auto px-6 text-center">

          {/* Small label */}
          <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-6">
            EQUIPMENT RENTAL PLATFORM
          </p>

          {/* Main headline */}
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-[#0b1b34]">
            Rent what you need.
            <br />
            Without buying it.
          </h1>

          {/* Description */}
          <p className="font-sans max-w-xl mx-auto mt-7 text-base md:text-lg text-gray-500 leading-relaxed">
            Discover equipment from people around you and rent it
            whenever you need it.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-3 mt-9">

            <button className="font-sans px-6 py-3 rounded-full bg-[#0b1b34] text-white text-sm hover:bg-[#142944] transition">
               Browse Equipments
            </button>

            <button className="font-sans px-6 py-3 rounded-full bg-gray-200 text-[#0b1b34] text-sm hover:bg-gray-300 transition">
              View Your Equipment
            </button>

          </div>

        </section>
      </main>
    </div>
  );
};

export default Home;