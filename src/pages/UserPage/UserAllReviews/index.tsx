import { IconStarFilled } from "@tabler/icons-react";
import { useAuthenticate } from "../../../hooks";
import { reviewServices } from "../../../services";
import { useCallback, useEffect, useState } from "react";
import { ReviewTS } from "../../../types";
import { Divider } from "@mantine/core";
import moment from "moment";

function classNames(...classes: unknown[]) {
  return classes.filter(Boolean).join(" ");
}

function UserAllReviews() {
  const [, , dataUser] = useAuthenticate();
  const [reviews, setReviews] = useState<ReviewTS[]>([]);

  const getReviews = useCallback(async (userId: string) => {
    try {
      const res = await reviewServices.getAllReviewsOfUser(userId);

      if (res.statusCode === 0) {
        setReviews(res.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  useEffect(() => {
    getReviews(dataUser.id);
  }, [dataUser.id, getReviews]);

  return (
    <div>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-lg font-medium text-gray-900 ">
            Những đánh giá gần đây
          </h2>
          <Divider size={"sm"} mt={"md"} />
          <div className="mt-6 pb-10 border-gray-200 divide-y  space-y-10">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8 "
                >
                  <div className="lg:col-start-5 lg:col-span-8 xl:col-start-6 xl:col-span-9 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:items-start">
                    <div className="flex items-center xl:col-span-1">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <IconStarFilled
                            key={rating}
                            className={classNames(
                              review.star > rating
                                ? "text-yellow-400"
                                : "text-gray-200",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 lg:mt-6 xl:mt-0 xl:col-span-2">
                      <h3 className="text-sm font-medium text-gray-900">
                        {review.Movie?.title}
                      </h3>

                      <p className="mt-3 space-y-6 text-sm text-gray-500">
                        {review.Movie?.genre.join(" - ")}
                      </p>

                      <p className="mt-3 space-y-6 text-sm text-gray-500">
                        {review.Movie?.duration} phút
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center text-sm lg:mt-0 lg:col-start-1 lg:col-span-6 lg:row-start-1 lg:flex-col lg:items-start xl:col-span-5">
                    <p className="font-medium text-gray-900">
                      {dataUser.fullName}
                    </p>
                    <time
                      dateTime={review.createdAt}
                      className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                    >
                      {moment(review.createdAt).format("DD - MM - YYYY")}
                    </time>

                    <div
                      className="mt-3 space-y-6 text-sm text-gray-500"
                      dangerouslySetInnerHTML={{ __html: review.content }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p>
                  Bạn chưa có đánh giá nào, hãy cùng đặt vé và cho chúng tôi ý
                  kiến của bạn nhé!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAllReviews;
