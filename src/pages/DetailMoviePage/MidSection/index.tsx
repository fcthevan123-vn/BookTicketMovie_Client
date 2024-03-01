import { Badge, Divider, SegmentedControl } from "@mantine/core";

import ChartCustom from "../../../components/ChartCustom";
import { DataTableMoviesProps } from "../../../components/Provider/MovieProvider/MovieProvider";
import moment from "moment";
import ReviewsOfMovie from "./ReviewsOfMovie";

type Props = {
  dataMovie: DataTableMoviesProps;
};

function MidSection({ dataMovie }: Props) {
  return (
    <div className="p-3 flex flex-col gap-8">
      <div>
        <div>
          <h3 className="text-lg leading-6 font-medium text-blue-500">
            Thông tin chi tiết
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Những thông tin bạn nên lưu ý
          </p>
        </div>
        <div className="mt-5 border-t border-gray-200">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Đạo diễn</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {dataMovie.directors.join(" - ")}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Diễn viên</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {dataMovie.actors.join(" - ")}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Quốc gia</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {dataMovie.country}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Ngôn ngữ</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {dataMovie.language}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Thời lượng</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {dataMovie.duration} phút
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Phụ đề</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Tiếng {dataMovie.subtitle}
              </dd>
            </div>

            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">
                Ngày chiếu phim
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex gap-2">
                {moment(dataMovie.releaseDate).format("DD - MM - YYYY")}
                <p>đến</p>
                {moment(dataMovie.endDate).format("DD - MM - YYYY")}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <Divider mx={10} my={30} size={"sm"} label="Thống kê" />
      <div>
        <div className="flex justify-between items-center mb-10">
          <Badge variant="dot" color="blue">
            Thống kê nhanh
          </Badge>
        </div>

        <div className="flex justify-center items-center gap-8">
          <div className="w-1/2">
            <ChartCustom></ChartCustom>
          </div>
          <div className="w-1/2">
            <ChartCustom></ChartCustom>
          </div>
        </div>
      </div>

      <Divider mx={10} my={30} size={"sm"} label="Đánh giá" id={"reviews"} />

      <div className="">
        <ReviewsOfMovie dataMovie={dataMovie}></ReviewsOfMovie>
      </div>
    </div>
  );
}

export default MidSection;
