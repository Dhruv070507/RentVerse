import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyRentals, getRentalRequests } from "../features/rental/rentalSlice";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";


const Home = () => {

  const dispatch = useDispatch();

  const {
    rentals,
    rentalRequests
} = useSelector(
    (state) => state.rental
);


  useEffect(() => {
    dispatch(getMyRentals());
    dispatch(getRentalRequests());
}, [dispatch]);


  return (
    <div className="min-h-screen bg-white relative overflow-hidden">

      {/* Background gradient */}

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

        {/* Blue - top right */}
        <div className="absolute -top-32 -right-20 w-[520px] h-[520px] rounded-full bg-blue-400/25 blur-[70px]" />

        {/* Purple - middle right */}
        <div className="absolute top-[35%] right-[25%] w-[420px] h-[420px] rounded-full bg-indigo-400/20 blur-[75px]" />

        {/* Pink */}
        <div className="absolute top-[25%] right-[5%] w-[300px] h-[300px] rounded-full bg-pink-400/20 blur-[65px]" />

        {/* Orange */}
        <div className="absolute top-[28%] right-[38%] w-[260px] h-[260px] rounded-full bg-orange-300/25 blur-[60px]" />

        {/* Bottom blue */}
        <div className="absolute bottom-[-100px] right-[30%] w-[500px] h-[400px] rounded-full bg-blue-400/20 blur-[80px]" />

      </div>


      {/* Everything above the gradient */}

      <div className="relative z-10">

        <Navbar />


        <main className="pt-32">

          {/* Hero */}

          <section className="max-w-5xl mx-auto px-6 text-center">

            <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-6">
              EQUIPMENT RENTAL PLATFORM
            </p>


            <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-[#0b1b34]">
              Rent what you need.
              <br />
              Without buying it.
            </h1>


            <p className="font-sans max-w-xl mx-auto mt-7 text-base md:text-lg text-gray-500 leading-relaxed">
              Discover equipment from people around you and rent it
              whenever you need it.
            </p>


            <div className="flex justify-center gap-3 mt-9">

                <Link
                  to="/equipments"
                  className="font-sans px-6 py-3 rounded-full bg-[#0b1b34] text-white text-sm hover:bg-[#142944] transition inline-block"
              >
                  Browse Equipments
              </Link>

              <Link
                  to="/my-equipments"
                  className="font-sans px-6 py-3 rounded-full bg-gray-200 text-[#0b1b34] text-sm hover:bg-gray-300 transition inline-block"
              >
                  View Your Equipment
              </Link>

            </div>

          </section>


          {/* My Rentals */}

          <section className="max-w-6xl mx-auto px-6 mt-28 pb-20">

            <div className="flex items-end justify-between mb-7">

              <div>

                <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-2 mt-10 ml-2">
                  YOUR ACTIVITY
                </p>

                <h2 className="font-display text-3xl md:text-4xl text-[#0b1b34] mt-2">
                  My Rentals
                </h2>

              </div>


              <button
                onClick={() => window.location.href = "/my-rentals"}
                className="font-sans text-sm text-[#0b1b34] hover:underline"
              >
                View All →
              </button>

            </div>


            {rentals.length === 0 ? (

              <div className="border border-gray-200 bg-white rounded-2xl p-10 text-center shadow-sm">

                <h3 className="font-display text-2xl text-[#0b1b34]">
                  No rentals yet
                </h3>

                <p className="font-sans text-sm text-gray-500 mt-2">
                  Start exploring equipment to make your first rental.
                </p>

              </div>

            ) : (

              <div className="flex gap-5 overflow-x-auto pb-4">

                {rentals.slice(0, 5).map((rental) => (

                  <div
                    key={rental._id}
                    className="min-w-[280px] md:min-w-[320px] border border-gray-200 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-gray-300 transition"
                  >

                    <h3 className="font-display text-2xl text-[#0b1b34]">
                      {rental.equipment?.name}
                    </h3>


                    <p className="font-sans text-sm text-gray-500 mt-1">
                      Owner: {rental.owner?.username}
                    </p>


                    <div className="mt-5">

                      <span
                        className={`font-sans text-xs px-3 py-1.5 rounded-full ${
                          rental.status === "pending"
                            ? "bg-yellow-50 text-yellow-700"
                            : rental.status === "approved"
                            ? "bg-green-50 text-green-700"
                            : rental.status === "rejected"
                            ? "bg-red-50 text-red-700"
                            : rental.status === "cancelled"
                            ? "bg-gray-100 text-gray-600"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {rental.status}
                      </span>

                    </div>


                    <div className="mt-6 pt-5 border-t border-gray-100">

                      <div className="flex justify-between">

                        <div>

                          <p className="font-sans text-xs text-gray-400">
                            PERIOD
                          </p>

                          <p className="font-sans text-sm text-[#0b1b34] mt-1">
                            {new Date(
                              rental.rentalStartDate
                            ).toLocaleDateString()}
                          </p>

                          <p className="font-sans text-sm text-[#0b1b34]">
                            →
                            {" "}
                            {new Date(
                              rental.rentalEndDate
                            ).toLocaleDateString()}
                          </p>

                        </div>


                        <div className="text-right">

                          <p className="font-sans text-xs text-gray-400">
                            TOTAL
                          </p>

                          <p className="font-sans text-sm text-[#0b1b34] mt-1">
                            ₹{rental.totalPrice}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </section>

          {/* Rental Requests */}

          <section className="max-w-6xl mx-auto px-6 pb-20">

              <div className="flex items-end justify-between mb-7">

                  <div>

                      <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase mb-2">
                          EQUIPMENT ACTIVITY
                      </p>

                      <h2 className="font-display text-3xl md:text-4xl text-[#0b1b34]">
                          Rental Requests
                      </h2>

                  </div>


                  <button
                      onClick={() => window.location.href = "/rental-requests"}
                      className="font-sans text-sm text-[#0b1b34] hover:underline"
                  >
                      View All →
                  </button>

              </div>


              {rentalRequests.length === 0 ? (

                  <div className="border border-gray-200 bg-white rounded-2xl p-10 text-center shadow-sm">

                      <h3 className="font-display text-2xl text-[#0b1b34]">
                          No rental requests
                      </h3>

                      <p className="font-sans text-sm text-gray-500 mt-2">
                          Requests for your equipment will appear here.
                      </p>

                  </div>

              ) : (

                  <div className="flex gap-5 overflow-x-auto pb-4">

                      {/* Display first 5 requests */}

                      {rentalRequests.slice(0, 5).map((request) => (

                          <div
                              key={request._id}
                              className="min-w-[280px] md:min-w-[320px] border border-gray-200 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-gray-300 transition"
                          >

                              <h3 className="font-display text-2xl text-[#0b1b34]">
                                  {request.equipment?.name}
                              </h3>


                              <p className="font-sans text-sm text-gray-500 mt-1">
                                  Requested by: {request.renter?.username}
                              </p>


                              <div className="mt-5">

                                  <span
                                      className={`font-sans text-xs px-3 py-1.5 rounded-full ${
                                          request.status === "pending"
                                              ? "bg-yellow-50 text-yellow-700"
                                              : request.status === "approved"
                                              ? "bg-green-50 text-green-700"
                                              : request.status === "rejected"
                                              ? "bg-red-50 text-red-700"
                                              : "bg-gray-100 text-gray-600"
                                      }`}
                                  >
                                      {request.status}
                                  </span>

                              </div>


                              <div className="mt-6 pt-5 border-t border-gray-100">

                                  <div className="flex justify-between">

                                      <div>

                                          <p className="font-sans text-xs text-gray-400">
                                              PERIOD
                                          </p>

                                          <p className="font-sans text-sm text-[#0b1b34] mt-1">
                                              {new Date(
                                                  request.rentalStartDate
                                              ).toLocaleDateString()}
                                          </p>

                                          <p className="font-sans text-sm text-[#0b1b34]">
                                              →
                                              {" "}
                                              {new Date(
                                                  request.rentalEndDate
                                              ).toLocaleDateString()}
                                          </p>

                                      </div>


                                      <div className="text-right">

                                          <p className="font-sans text-xs text-gray-400">
                                              TOTAL
                                          </p>

                                          <p className="font-sans text-sm text-[#0b1b34] mt-1">
                                              ₹{request.totalPrice}
                                          </p>

                                      </div>

                                  </div>

                              </div>

                          </div>

                      ))}

                  </div>

              )}

          </section>

        </main>

      </div>

    </div>
  );
};


export default Home;