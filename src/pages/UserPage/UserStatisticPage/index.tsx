import React, { useCallback, useEffect, useState } from "react";
import classes from "./UserStatisticPage.module.css";
import { Text } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import NormalToast from "../../../components/AllToast/NormalToast";
import bookingServices from "../../../services/bookingServices";
import { BookingTypeTS } from "../../../types";
import { useAuthenticate } from "../../../hooks";
import { Link } from "react-router-dom";
type Props = {};

const data = [
  {
    title: "Page views",
    stats: "456,133",
    description:
      "24% more than in the same month last year, 33% more that two years ago",
  },
  {
    title: "New users",
    stats: "2,175",
    description:
      "13% less compared to last month, new user engagement up by 6%",
  },
  {
    title: "Completed orders",
    stats: "1,994",
    description: "1994 orders were completed this month, 97% satisfaction rate",
  },
];

function UserStatisticPage({}: Props) {
  const [, , dataUser] = useAuthenticate();

  const [data, setData] = useState<BookingTypeTS[] | null>(null);

  const getAllBookings = useCallback(async () => {
    try {
      const res = await bookingServices.getBookingByUserId(dataUser.id);
      if (res.statusCode === 0) {
        setData(res.data);
      }
    } catch (error) {
      const err = error as Error;
      NormalToast({
        title: "getAllBookings",
        color: "red",
        message: err.message,
      });
    }
  }, [dataUser.id]);

  useEffect(() => {
    getAllBookings();
  }, [getAllBookings]);
  return (
    <div className="relative bg-white mt-4">
      <div className="h-56  sm:h-72 lg:absolute lg:left-0 lg:h-full lg:w-1/2">
        <img
          className="w-full h-full object-cover rounded-2xl "
          src="https://images.unsplash.com/photo-1559570278-eb8d71d06403?auto=format&fit=crop&q=80&w=1852&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Support team"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:py-16">
        <div className="max-w-2xl mx-auto lg:max-w-none lg:mr-0 lg:ml-auto lg:w-1/2 lg:pl-10">
          <div>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
              <IconUser className="h-6 w-6" aria-hidden="true" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Cùng xem những thống kê thú vị về bạn
          </h2>
          <p className="mt-6 text-lg text-gray-500">
            Trang thống kê của ShowBooking là một công cụ quan trọng giúp quản
            lý và chủ sở hữu trang web hiểu rõ hơn về cách người dùng tương tác
            với dịch vụ của họ. Trang thống kê cung cấp một loạt thông tin cụ
            thể và các chỉ số quan trọng để đo lường hiệu suất và hiểu rõ nguồn
            khách hàng của họ.
          </p>
          <div className="mt-8 overflow-hidden">
            <dl className="-mx-8 -mt-8 flex flex-wrap">
              <div className="flex flex-col px-8 pt-8">
                <dt className="order-2 text-base font-medium text-gray-500">
                  Lượng truy cập
                </dt>
                <dd className="order-1 text-2xl font-extrabold text-blue-600 sm:text-3xl">
                  {console.log("dataUser.count", dataUser.count)}
                  {dataUser.count}
                </dd>
              </div>
              <div className="flex flex-col px-8 pt-8">
                <dt className="order-2 text-base font-medium text-gray-500">
                  Lượt đặt vé
                  <Link to={`/user/${dataUser.id}/all-tickets`}>
                    <p className="text-sm text-blue-500 cursor-pointer hover:text-blue-400">
                      Xem ngay
                    </p>
                  </Link>
                </dt>
                <dd className="order-1 text-2xl font-extrabold text-blue-600 sm:text-3xl">
                  {data?.length}
                </dd>
              </div>
              <div className="flex flex-col px-8 pt-8">
                <dt className="order-2 text-base font-medium text-gray-500">
                  Đánh giá
                  <Link to={`/user/${dataUser.id}/all-reviews`}>
                    <p className="text-sm text-blue-500 cursor-pointer hover:text-blue-400">
                      Xem ngay
                    </p>
                  </Link>
                </dt>
                <dd className="order-1 text-2xl font-extrabold text-blue-600 sm:text-3xl">
                  0
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserStatisticPage;
