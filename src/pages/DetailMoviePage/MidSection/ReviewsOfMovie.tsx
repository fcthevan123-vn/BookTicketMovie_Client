import {
  Textarea,
  Rating,
  Modal,
  Button,
  Divider,
  Alert,
  Select,
  Badge,
  Tabs,
  ActionIcon,
} from "@mantine/core";
import {
  IconEdit,
  IconInfoCircle,
  IconMessageCircle,
  IconPhoto,
  IconStarFilled,
  IconTrash,
} from "@tabler/icons-react";
import { DataTableMoviesProps } from "../../../components/Provider/MovieProvider/MovieProvider";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useAuthenticate } from "../../../hooks";
import { reviewServices } from "../../../services";
import { loadingApi } from "../../../untils/loadingApi";
import { ReviewTS } from "../../../types";
import moment from "moment";
import { modals } from "@mantine/modals";

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
  const [openUpdateReview, setOpenUpdateReview] = useState(false);
  const [openAllReview, setOpenAllReview] = useState(false);
  const [userReview, setUserReview] = useState<ReviewTS[]>();
  const [idReviewToUpdate, setIdReviewToUpdate] = useState<string>();

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
      getUserReview(dataMovie.id, dataUser.id);
      close();
    }

    return res;
  }

  async function deleteReview(idReview: string) {
    console.log("idReview", idReview);
    const api = reviewServices.deleteReview(idReview);

    const res = await loadingApi(api, "Xoá đánh giá");

    if (res) {
      getAllReviews(dataMovie.id);
      getUserReview(dataMovie.id, dataUser.id);
    }

    return res;
  }

  async function updateReview(
    reviewContent: string,
    star: number,
    reviewId: string
  ) {
    const data = {
      id: reviewId,
      star: star,
      content: reviewContent,
    };
    const api = reviewServices.updateReview(data);

    const res = await loadingApi(api, "Chỉnh sửa đánh giá");

    if (res) {
      getAllReviews(dataMovie.id);
      getUserReview(dataMovie.id, dataUser.id);
      setOpenUpdateReview(false);
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

  async function getUserReview(movieId: string, userId: string) {
    try {
      const res = await reviewServices.getUserReview(movieId, userId);
      if (res.statusCode === 0) {
        setUserReview(res.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  const openModal = (idReview: string) =>
    modals.openConfirmModal({
      title: (
        <p className="text-red-500 font-bold text-md">Xác nhận xoá đánh giá</p>
      ),
      radius: "lg",
      children: (
        <div>
          <p>
            Đánh giá của bạn sẽ bị xoá vĩnh viễn và không thể khôi phục được.
            Bạn có muốn tiếp tục hay không?
          </p>
        </div>
      ),
      confirmProps: {
        color: "red",
        radius: "md",
        size: "xs",
      },
      cancelProps: {
        radius: "md",
        size: "xs",
      },
      labels: { confirm: "Đồng ý", cancel: "Huỷ bỏ" },

      onConfirm: () => deleteReview(idReview),
    });

  useEffect(() => {
    getAllReviews(dataMovie.id);
    getUserReview(dataMovie.id, dataUser.id);
  }, [dataMovie.id, dataUser.id]);

  return (
    <div className="bg-white">
      {/* modal review */}
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

      {/* modal update review */}
      <Modal
        opened={openUpdateReview}
        radius={"lg"}
        onClose={() => setOpenUpdateReview(false)}
        size={"lg"}
        title={
          <p className="font-bold text-md text-blue-500">
            Chỉnh sửa đánh giá của bạn
          </p>
        }
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
              onClick={() => setOpenUpdateReview(false)}
              variant="outline"
              color="gray"
              size="xs"
              radius="md"
            >
              Huỷ
            </Button>

            <Button
              onClick={() =>
                updateReview(reviewContent, star, idReviewToUpdate as string)
              }
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

      {/* modal show all review */}

      <Modal
        opened={openAllReview}
        onClose={() => setOpenAllReview(false)}
        title={
          <p className="text-xl text-blue-500 font-semibold">Tất cả đánh giá</p>
        }
        fullScreen
        radius={0}
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <div>
          <div className="flex ">
            <Select
              className="ms-12"
              label="Sắp xếp theo"
              placeholder="Pick value"
              radius={"md"}
              data={[
                {
                  value: "new",
                  label: "Mới nhất",
                },
                {
                  value: "old",
                  label: "Cũ nhất",
                },
              ]}
              defaultValue={"new"}
              allowDeselect={false}
            />
          </div>

          <div className="mt-5">
            <div className="my-4 divide-y divide-gray-200 mx-12 border rounded-2xl shadow-md">
              {allReview &&
                allReview.length > 0 &&
                allReview.map((review: ReviewTS) => (
                  <div key={review.id} className="py-5 px-8">
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
                        <p className="sr-only">{review.star} out of 5 stars</p>
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
                ))}
            </div>
          </div>
        </div>
      </Modal>
      <div className="mb-3 flex justify-between items-center">
        <Badge variant="dot" color="blue">
          Tất cả đánh giá
        </Badge>
      </div>
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

          <Tabs defaultValue="gallery">
            <Tabs.List grow>
              <Tabs.Tab value="gallery" leftSection={<IconPhoto />}>
                Tất cả đánh giá
              </Tabs.Tab>
              <Tabs.Tab value="messages" leftSection={<IconMessageCircle />}>
                Đánh giá của bạn
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="gallery">
              {" "}
              <div className="flow-root">
                <div className="mt-4 divide-y divide-gray-200 max-h-[580px] ">
                  {allReview && allReview.length > 0 ? (
                    allReview.slice(0, 3).map((review: ReviewTS) => (
                      <div key={review.id} className="py-6">
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
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-gray-500">
                            {moment(review.updatedAt).format("L")}
                          </p>
                          {review.userId == dataUser.id && (
                            <div className="flex gap-2">
                              <ActionIcon
                                radius={"md"}
                                variant="light"
                                onClick={() => {
                                  if (userReview && userReview.length > 0) {
                                    setReviewContent(userReview[0].content);
                                    setStar(userReview[0].star);
                                    setIdReviewToUpdate(userReview[0].id);
                                    setOpenUpdateReview(true);
                                  }
                                }}
                                aria-label="Settings"
                              >
                                <IconEdit
                                  style={{ width: "70%", height: "70%" }}
                                  stroke={1.5}
                                />
                              </ActionIcon>

                              <ActionIcon
                                radius={"md"}
                                variant="light"
                                color="red"
                                onClick={() => openModal(review.id as string)}
                                aria-label="Settings"
                              >
                                <IconTrash
                                  style={{ width: "70%", height: "70%" }}
                                  stroke={1.5}
                                />
                              </ActionIcon>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center">
                      <Alert
                        variant="light"
                        color="blue"
                        radius={"lg"}
                        title="Thông báo nhỏ"
                        icon={<IconInfoCircle></IconInfoCircle>}
                      >
                        Phim này hiện chưa có đánh giá nào. Chúng tôi đang mong
                        đợi đánh giá của bạn. <br></br> <br></br>Hãy xem phim và
                        đưa ra đánh giá để mọi người cùng biết nhé.
                      </Alert>
                    </div>
                  )}
                  {allReview && allReview.length > 0 && (
                    <div>
                      <p
                        onClick={() => {
                          setOpenAllReview(true);
                        }}
                        className="float-end mt-3 text-sm italic underline text-blue-400 cursor-pointer hover:text-blue-600"
                      >
                        Xem tất cả
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Tabs.Panel>

            <Tabs.Panel value="messages">
              <div className="flow-root">
                <div className="mt-4 divide-y divide-gray-200 max-h-[580px] ">
                  {userReview && userReview.length > 0 ? (
                    userReview.slice(0, 3).map((review: ReviewTS) => (
                      <div key={review.id} className="py-6">
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
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-gray-500">
                            {moment(review.updatedAt).format("L")}
                          </p>
                          <div className="flex gap-2">
                            <ActionIcon
                              radius={"md"}
                              variant="light"
                              aria-label="Settings"
                              onClick={() => {
                                if (userReview && userReview.length > 0) {
                                  setReviewContent(userReview[0].content);
                                  setStar(userReview[0].star);
                                  setIdReviewToUpdate(userReview[0].id);
                                  setOpenUpdateReview(true);
                                }
                              }}
                            >
                              <IconEdit
                                style={{ width: "70%", height: "70%" }}
                                stroke={1.5}
                              />
                            </ActionIcon>

                            <ActionIcon
                              radius={"md"}
                              variant="light"
                              color="red"
                              aria-label="Settings"
                              onClick={() => openModal(review.id as string)}
                            >
                              <IconTrash
                                style={{ width: "70%", height: "70%" }}
                                stroke={1.5}
                              />
                            </ActionIcon>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center">
                      <Alert
                        variant="light"
                        color="blue"
                        radius={"lg"}
                        title="Thông báo nhỏ"
                        icon={<IconInfoCircle></IconInfoCircle>}
                      >
                        Hiện tại bạn chưa đánh giá cho phim này.
                      </Alert>
                    </div>
                  )}
                </div>
              </div>
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
