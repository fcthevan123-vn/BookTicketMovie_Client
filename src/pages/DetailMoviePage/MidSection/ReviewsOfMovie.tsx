import { Textarea, Rating, Modal, Button, Divider } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCircleCheck, IconStarFilled } from "@tabler/icons-react";
import { DataTableMoviesProps } from "../../../components/Provider/MovieProvider/MovieProvider";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useAuthenticate } from "../../../hooks";
import { reviewServices } from "../../../services";
import { notifications } from "@mantine/notifications";
import { loadingApi } from "../../../untils/loadingApi";
import { ReviewTS } from "../../../types";
import moment from "moment";

const reviews = {
  average: 4,
  totalCount: 1624,
  counts: [
    { rating: 5, count: 1019 },
    { rating: 4, count: 162 },
    { rating: 3, count: 97 },
    { rating: 2, count: 199 },
    { rating: 1, count: 147 },
  ],
  featured: [
    {
      id: 1,
      rating: 4,
      content: `
        <p>Đây là chiếc túi trong mơ của tôi. Tôi đã mang nó vào kỳ nghỉ vừa qua của mình và có thể mang theo một lượng đồ ăn nhẹ vô lý cho nhiều chuyến bay dài và đói.</p>
      `,
      author: "The Van",
      avatarSrc:
        "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      rating: 3,
      content: `
          <p>Đây là chiếc túi trong mơ của tôi. Tôi đã mang nó vào kỳ nghỉ vừa qua của mình và có thể mang theo một lượng đồ ăn nhẹ vô lý cho nhiều chuyến bay dài và đói.</p>
        `,
      author: "Bui Kiet",
      avatarSrc:
        "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
};

type Props = {
  dataMovie: DataTableMoviesProps;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ReviewsOfMovie({ dataMovie }: Props) {
  const [reviewContent, setReviewContent] = useState("");
  const [star, setStar] = useState(3);
  const [allReview, setAllReview] = useState<ReviewTS[]>();
  const [opened, { open, close }] = useDisclosure(false);
  const [, , dataUser] = useAuthenticate();

  async function createReview(reviewContent: string, star: number) {
    const data = {
      userId: dataUser.id,
      movieId: dataMovie.id,
      star: star,
      content: reviewContent,
    };
    const api = reviewServices.createReview(data);

    const res = await loadingApi(api, "Đánh giá");

    if (res) {
      getAllReviews(dataMovie.id);
      close();
    }

    return res;
  }

  async function getAllReviews(movieId: string) {
    try {
      const res = await reviewServices.getALLReview(movieId);
      if (res.statusCode === 0) {
        setAllReview(res.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    getAllReviews(dataMovie.id);
  }, [dataMovie.id]);

  return (
    <div className="bg-white">
      <Modal
        opened={opened}
        radius={"lg"}
        onClose={close}
        size={"lg"}
        title={<p className="font-bold text-md text-blue-500">Viết đánh giá</p>}
      >
        <div>
          <div className="flex flex-col gap-4">
            <Textarea
              radius="sm"
              label="Đánh giá của bạn"
              withAsterisk
              resize="vertical"
              description="Chúng tôi cảm ơn và trân trọng những góp ý của bạn về bộ phim này."
              error={
                reviewContent.length > 5
                  ? ""
                  : "Đánh giá phải lớn hơn 5 ký tự và nhỏ hơn 250 ký tự"
              }
              value={reviewContent}
              onChange={(event) => setReviewContent(event.currentTarget.value)}
              placeholder="Nhập đánh giá của bạn ở đây"
            />
            <div>
              <p className="text-sm mb-1">Mức độ hài lòng của bạn về phim</p>
              <Rating value={star} onChange={(e) => setStar(e)} />
            </div>
          </div>
          <div className="mt-5 flex gap-3 justify-end">
            <Button
              onClick={close}
              variant="outline"
              color="gray"
              size="xs"
              radius="md"
            >
              Huỷ
            </Button>

            <Button
              onClick={() => createReview(reviewContent, star)}
              variant="filled"
              disabled={reviewContent.length > 5 ? false : true}
              size="xs"
              radius="md"
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </Modal>
      <div className="max-w-2xl mx-auto  lg:max-w-7xl  lg:grid lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-4">
          <h2 className="text-lg font-medium tracking-tight text-gray-900">
            Đánh giá của người xem
          </h2>

          <div className="mt-3 flex items-center">
            <div>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <IconStarFilled
                    key={rating}
                    className={classNames(
                      reviews.average > rating
                        ? "text-yellow-400"
                        : "text-gray-300",
                      "flex-shrink-0 h-5 w-5"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{reviews.average} out of 5 stars</p>
            </div>
            <p className="ml-2 text-sm text-gray-900">
              Dựa trên {reviews.totalCount} đánh giá
            </p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Review data</h3>

            <dl className="space-y-3">
              {reviews.counts.map((count) => (
                <div key={count.rating} className="flex items-center text-sm">
                  <dt className="flex-1 flex items-center">
                    <p className="w-3 font-medium text-gray-900">
                      {count.rating}
                      <span className="sr-only"> star reviews</span>
                    </p>
                    <div
                      aria-hidden="true"
                      className="ml-1 flex-1 flex items-center"
                    >
                      <IconStarFilled
                        className={classNames(
                          count.count > 0 ? "text-yellow-400" : "text-gray-300",
                          "flex-shrink-0 h-5 w-5"
                        )}
                        aria-hidden="true"
                      />

                      <div className="ml-3 relative flex-1">
                        <div className="h-3 bg-gray-100 border border-gray-200 rounded-full" />
                        {count.count > 0 ? (
                          <div
                            className="absolute inset-y-0 bg-yellow-400 border border-yellow-400 rounded-full"
                            style={{
                              width: `calc(${count.count} / ${reviews.totalCount} * 100%)`,
                            }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </dt>
                  <dd className="ml-3 w-10 text-right tabular-nums text-sm text-gray-900">
                    {Math.round((count.count / reviews.totalCount) * 100)}%
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900">
              Chia sẻ cảm nhận của bạn
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Nếu bạn đã xem phim này, hãy chia sẻ suy nghĩ của bạn với những
              người khác.
            </p>

            <p
              onClick={open}
              className="cursor-pointer mt-6 inline-flex w-full bg-white border border-gray-300 rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
            >
              Viết đánh giá
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Divider size="sm" orientation="vertical" className="my-7" />
        </div>

        <div className="mt-16 lg:mt-0 lg:col-start-6 lg:col-span-7">
          <h3 className="sr-only">Recent reviews</h3>

          <div className="flow-root">
            <div className="mt-4 divide-y divide-gray-200 max-h-[480px] overflow-y-auto">
              {allReview && allReview.length > 0
                ? allReview.map((review: ReviewTS) => (
                    <div key={review.id} className="py-12">
                      <div className="flex items-center">
                        <img
                          src={
                            "https://i.pinimg.com/564x/68/7e/b4/687eb4f4e53653e2e9231ccc085c59ec.jpg"
                          }
                          alt={`${review.User?.fullName}.`}
                          className="h-12 w-12 rounded-full"
                        />
                        <div className="ml-4">
                          <h4 className="text-sm font-bold text-gray-900">
                            {review.User?.fullName}
                          </h4>
                          <div className="mt-1 flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <IconStarFilled
                                key={rating}
                                className={classNames(
                                  review.star > rating
                                    ? "text-yellow-400"
                                    : "text-gray-300",
                                  "h-5 w-5 flex-shrink-0"
                                )}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                          <p className="sr-only">
                            {review.star} out of 5 stars
                          </p>
                        </div>
                      </div>

                      <div
                        className="mt-4 space-y-6  text-gray-700"
                        dangerouslySetInnerHTML={{ __html: review.content }}
                      />
                      <p className="text-xs text-gray-500">
                        {moment(review.updatedAt).format("L")}
                      </p>
                    </div>
                  ))
                : "Phim này chưa có đánh giá nào. Chúng tôi đang chờ đợi những đánh giá của bạn"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
