import { Link } from "react-router-dom";

function HeroHome() {
  return (
    <div>
      <div className="lg:flex my-10">
        <div className="flex items-center justify-center w-full px-6 py-8 lg:h-[32rem] lg:w-1/2">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold text-gray-800  lg:text-4xl">
              Cùng khám phá <span className="text-sky-500">Show Booking</span>
            </h2>

            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 lg:text-base">
              Kho phim đa dạng thể loại, phù hợp với mọi lứa tuổi và mọi sở
              thích. Hãy tham gia cùng chúng tôi và trải nghiệm thế giới của
              điện ảnh tại Show Booking.
            </p>

            <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
              <Link
                to="/movie"
                className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-700"
              >
                Khám phá ngay
              </Link>
              <Link
                to="/about"
                className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md lg:mx-4 hover:bg-gray-300"
              >
                Tìm hiểu thêm
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full h-64 lg:w-1/2 lg:h-auto">
          <div
            className="w-full h-full bg-cover rounded-2xl overflow-hidden"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1535540674795-d2e704953bf1?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            }}
          >
            <div className="w-full h-full bg-black opacity-25"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroHome;
