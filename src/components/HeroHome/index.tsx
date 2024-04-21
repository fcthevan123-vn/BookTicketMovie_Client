import { Link } from "react-router-dom";

function HeroHome() {
  return (
    <div>
      <div className="grid grid-cols-5 pt-16">
        <div className="flex justify-center items-center px-6 py-8 lg:h-[32rem] col-span-2">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold text-gray-800  lg:text-4xl">
              Cùng khám phá{" "}
              <span className="text-violet-500">Show Booking</span>
            </h2>

            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 lg:text-base">
              Kho phim đa dạng thể loại, phù hợp với mọi lứa tuổi và mọi sở
              thích. Hãy tham gia cùng chúng tôi và trải nghiệm thế giới của
              điện ảnh tại Show Booking.
            </p>

            <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
              <Link
                to="/movie"
                className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-white transition-colors duration-300 transform bg-violet-500 rounded-xl hover:bg-violet-700"
              >
                Khám phá ngay
              </Link>
              <Link
                to="/about"
                className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-xl lg:mx-4 hover:bg-gray-300"
              >
                Tìm hiểu thêm
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full h-64 lg:h-auto col-span-3 rounded-l-lg overflow-hidden">
          <div className="w-full h-full grid grid-cols-4">
            <div
              className="w-full h-full bg-cover overflow-hidden"
              style={{
                backgroundImage:
                  "url(https://img.freepik.com/free-photo/rows-red-seats-theater_53876-64710.jpg?t=st=1713671425~exp=1713675025~hmac=357019608520e7bcb14d224ef6b15bf663701900e95415070b982745e1317a4c&w=1060)",
              }}
            ></div>

            <div
              className="w-full h-full bg-cover overflow-hidden"
              style={{
                backgroundImage:
                  "url(https://img.freepik.com/free-photo/clapperboard-near-popcorn-bucket-3d-glasses_23-2147698988.jpg?t=st=1713671471~exp=1713675071~hmac=9000fc60e4d372ecc15b732410e3abbe78a9d99c7e3b2406499e655473e56ee1&w=1060)",
              }}
            ></div>

            <div
              className="w-full h-full bg-cover overflow-hidden"
              style={{
                backgroundImage:
                  "url(https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg)",
              }}
            ></div>

            <div
              className="w-full h-full bg-cover overflow-hidden"
              style={{
                backgroundImage:
                  "url(https://cdn.pixabay.com/photo/2015/12/09/17/12/popcorn-1085072_1280.jpg)",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroHome;
