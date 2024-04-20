import { Image, Rating, ActionIcon } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

// type dataShowType = {
//   cinema: Cinema;
//   allShowsMovieHall: allShowsMovieHallType[];
// };

// type allShowsMovieHallType = {
//   allShows: Show[];
//   movieHall: MovieHall;
// };

function SelectShowPage() {
  const location = useLocation();
  const pathname = location.pathname;
  const id = pathname.substring(pathname.lastIndexOf("/") + 1);

  return (
    <div className="container">
      <div className="relative">
        <div className="absolute z-20 top-5 left-3">
          <Link to={`/movie/${id}`}>
            <ActionIcon
              variant="transparent"
              color="white"
              aria-label="Settings"
              size={"xl"}
            >
              <IconArrowLeft
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
          </Link>
        </div>
        <div className="absolute  bg-gradient-to-r from-fuchsia-500 to-cyan-500 h-max w-screen z-10 ">
          <div className="grid grid-cols-4 gap-8 py-6 backdrop-blur-sm bg-black/25 xl:px-52 px-16 ">
            <div className="xl:col-span-1 col-span-2 flex justify-center">
              <Image
                radius="md"
                h={320}
                w={280}
                fit="cover"
                src="https://show-booking.s3.amazonaws.com/5dbc3db0427f8af1e797"
              />
            </div>

            <div className="xl:col-span-3 col-span-2 flex flex-col gap-1 text-white">
              <p className="text-3xl font-semibold">
                Godzilla x Kong: Đế Chế Mới
              </p>

              <p className="text-md">HÀNH ĐỘNG - KỊCH TÍNH - GIẢ TƯỞNG</p>

              <div>
                <Rating value={3.5} fractions={2} readOnly />
                <p className="text-xs font-extralight italic text-gray-200/75">
                  Dựa trên 300 đánh giá
                </p>
              </div>

              <div className="py-1">
                <p className="text-sm font-thin flex gap-1">
                  <p className="text-gray-200/75 font-semibold">
                    Ngày khởi chiếu:
                  </p>{" "}
                  29/03/2024
                </p>
                <p className="text-sm font-thin flex gap-1 mt-1">
                  <p className="text-gray-200/75 font-semibold">
                    Ngày kết thúc:
                  </p>{" "}
                  29/03/2024
                </p>
              </div>

              <div className="py-1">
                <p className="text-sm font-thin flex gap-1">
                  <p className="text-gray-200/75 font-semibold">Đạo diễn:</p>{" "}
                  Adam Wingard
                </p>
                <p className="text-sm font-thin flex gap-1 mt-1">
                  <p className="text-gray-200/75 font-semibold">Diễn viên:</p>{" "}
                  Rebecca Hall - Brian Tyree Henry - Dan Stevens - Kaylee Hottle
                </p>
              </div>

              <div className="py-1">
                <p className="text-sm font-thin flex gap-1">
                  <p className="text-gray-200/75 font-semibold">Ngôn ngữ:</p>{" "}
                  Tiếng Việt
                </p>
                <p className="text-sm font-thin flex gap-1 mt-1">
                  <p className="text-gray-200/75 font-semibold">Quốc gia:</p> Mỹ
                </p>
              </div>

              <div className="py-1">
                <p className="text-sm font-thin flex gap-1">
                  <p className="text-gray-200/75 font-semibold">
                    Độ tuổi yêu cầu:
                  </p>{" "}
                  15
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>bottom</div>
    </div>
  );
}

export default SelectShowPage;
