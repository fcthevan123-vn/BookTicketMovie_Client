import { IconStarFilled } from "@tabler/icons-react";
import React from "react";

type Props = {};

const reviews = [
  {
    id: 1,
    title: "Phim rất hay",
    rating: 5,
    content: `

        <p>Chất lượng sản phẩm thật tuyệt vời, nó trông và cảm giác thậm chí còn tốt hơn tôi mong đợi. Những thứ tuyệt vời! Tôi sẵn sàng giới thiệu cửa hàng này cho bạn bè của tôi. Và bây giờ tôi nghĩ về nó... thực sự tôi đã nhiều lần!</p>
      `,
    author: "Lai The Van",
    date: "26 Tháng 11 2023",
    datetime: "2021-01-06",
  },
  {
    id: 2,
    title: "Tuyệt vời",
    rating: 5,
    content: `
        <p>Phim này rất hay, mọi người có thể xem nhé!</p>
       
      `,
    author: "Lai The Van",
    date: "16 Tháng 11 2023",
    datetime: "2021-01-06",
  },
  // More reviews...
];

function classNames(...classes: unknown[]) {
  return classes.filter(Boolean).join(" ");
}

function UserAllReviews({}: Props) {
  return (
    <div>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-lg font-medium text-gray-900">
            Những đánh giá gần đây
          </h2>
          <div className="mt-6 pb-10 border-t border-b border-gray-200 divide-y divide-gray-200 space-y-10">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
              >
                <div className="lg:col-start-5 lg:col-span-8 xl:col-start-4 xl:col-span-9 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:items-start">
                  <div className="flex items-center xl:col-span-1">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <IconStarFilled
                          key={rating}
                          className={classNames(
                            review.rating > rating
                              ? "text-yellow-400"
                              : "text-gray-200",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="ml-3 text-sm text-gray-700">
                      {review.rating}
                      <span className="sr-only"> out of 5 stars</span>
                    </p>
                  </div>

                  <div className="mt-4 lg:mt-6 xl:mt-0 xl:col-span-2">
                    <h3 className="text-sm font-medium text-gray-900">
                      {review.title}
                    </h3>

                    <div
                      className="mt-3 space-y-6 text-sm text-gray-500"
                      dangerouslySetInnerHTML={{ __html: review.content }}
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center text-sm lg:mt-0 lg:col-start-1 lg:col-span-4 lg:row-start-1 lg:flex-col lg:items-start xl:col-span-3">
                  <p className="font-medium text-gray-900">{review.author}</p>
                  <time
                    dateTime={review.datetime}
                    className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                  >
                    {review.date}
                  </time>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAllReviews;
