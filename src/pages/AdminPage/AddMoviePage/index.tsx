import { Button, TextInput, Textarea, MultiSelect } from "@mantine/core";
import { useState } from "react";
import { UploadImage } from "../../../components/UploadImage";
import { DateInput } from "@mantine/dates";
import moment from "moment";
import { movieServices } from "../../../services";
import { loadingApi } from "../../../untils/loadingApi";
import {
  MovieFormProvider,
  useMovieForm,
} from "../../../components/Forms/FormProvider/FormProvider";

const dataGenreMovie = [
  "Hành động",
  "Hài kịch",
  "Kịch tính",
  "Khoa học viễn tưởng",
  "Fantasy",
  "Kinh dị",
  "Lãng mạn",
  "Phiêu lưu",
  "Kịch",
  "Hoạt hình",
  "Bí ẩn",
  "Tội phạm",
  "Tài liệu",
  "Miền Tây",
  "Âm nhạc",
  "Lịch sử",
  "Tiểu sử",
  "Chiến tranh",
  "Gia đình",
  "Thể thao",
  "Siêu anh hùng",
  "Ngày lễ",
  "Phim cổ điển đen trắng",
  "Tuổi teen",
  "Siêu thực",
  "Giả tưởng",
  "Thể loại giả tưởng",
  "Thử nghiệm",
  "Không tiếng",
  "Parody",
];

const dataSubtitle = [
  "Việt Nam",
  "Anh",
  "Trung Quốc",
  "Pháp",
  "Tây Ban Nha",
  "Bồ Đào Nha",
  "Ấn Độ",
  "Nhật Bản",
  "Hàn Quốc",
  "Indonesian",
  "Nga",
  "Thái Lan",
  "Mỹ",
];

// interface dataSelectProps {
//   value: string;
//   label: string;
//   disabled?: boolean;
// }

const AddMoviePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, onSearchChange] = useState("");
  const [searchValueSubtitle, onSearchChangeSubtitle] = useState("");
  const [isResetImg, setIsResetImg] = useState(false);

  const [dataActors, setDataActors] = useState([
    {
      value: "no",
      label: "Đang cập nhật diễn viên, hãy tạo mới",
      disabled: true,
    },
  ]);

  const [dataDirectors, setDataDirectors] = useState([
    {
      value: "no",
      label: "Đang cập nhật đạo diễn, hãy tạo mới",
      disabled: true,
    },
  ]);

  const [dataLanguage, setDataLanguage] = useState(
    dataSubtitle.map((data) => {
      return {
        value: data,
        label: data,
      };
    })
  );

  const [dataCountry, setDataCountry] = useState(
    dataSubtitle.map((data) => {
      return {
        value: data,
        label: data,
      };
    })
  );

  const form = useMovieForm({
    initialValues: {
      title: "",
      description: "",
      directors: [],
      actors: [],
      ageRequire: "",
      releaseDate: new Date(Date.now() + 3600 * 1000 * 24),
      endDate: new Date(Date.now() + 3600 * 1000 * 24 * 2),
      duration: "",
      language: "",
      country: "",
      subtitle: "",
      price: 0,
      genre: [],
      images: [],
    },

    // functions will be used to validate values at corresponding key
    validate: {
      title: (value) =>
        value.length > 3 && value.length < 100
          ? null
          : "Tên phải lớn hơn 4 và bé hơn 100 ký tự",
      description: (value) =>
        value.length > 3 && value.length < 500
          ? null
          : "Mô tả phải lớn hơn 10 và bé hơn 500 ký tự",
      directors: (value) =>
        value.length > 0 && value.length < 10
          ? null
          : "Đạo diễn phải lớn hơn 0 và 10 người",
      actors: (value) =>
        value.length > 0 && value.length < 20
          ? null
          : "Tên phải lớn hơn 0 và bé hơn 20 người",
      ageRequire: (value) =>
        value && parseInt(value) > 0 ? null : "Độ tuổi phải lớn hơn 0 ",
      releaseDate: (value, values) => {
        if (moment(value).isSameOrAfter(values.endDate)) {
          return "Ngày phát hành phải nhỏ hơn ngày kết thúc";
        } else if (value) {
          return null;
        } else {
          return "Chưa chọn ngày phát hành";
        }
      },
      endDate: (value, values) => {
        if (moment(value).isSameOrBefore(values.releaseDate)) {
          return "Ngày kết thúc phải lớn hơn ngày phát hành";
        } else if (value) {
          return null;
        } else {
          return "Chưa chọn ngày kết thúc";
        }
      },

      duration: (value) =>
        value && parseInt(value) > 20
          ? null
          : "Thời lượng phim phải lớn hơn 20 phút",
      language: (value) => (value.length > 0 ? null : "Chưa chọn ngôn ngữ"),
      country: (value) => (value.length > 0 ? null : "Chưa chọn quốc gia"),
      subtitle: (value) => (value.length <= 0 ? "Chưa nhập phụ đề" : null),

      genre: (value) => (value.length <= 0 ? "Chưa nhập thể loại" : null),
      price: (value) => (value ? null : "Chưa nhập giá tiền"),
      images: (value) =>
        value.length > 1 && value.length <= 6
          ? null
          : "Phải có nhiều hơn 1 và ít hơn 6 hình ảnh",
    },
    // validateInputOnChange: true,
  });

  async function handleSubmit(dataForm: typeof form.values) {
    setIsLoading(true);
    const api = movieServices.createMovie(dataForm);
    const res = await loadingApi(api, "Tạo phim mới");
    setIsLoading(false);
    if (res) {
      setIsResetImg(true);
      form.reset();
    }

    return res;
  }

  return (
    <div className="h-full">
      <MovieFormProvider form={form}>
        {/* {console.log("value", form.values.actors)} */}
        <form onSubmit={form.onSubmit(() => handleSubmit(form.values))}>
          <p className="text-xl font-medium text-sky-500 ms-6 mt-6">
            Thêm phim mới
          </p>

          <div className="flex justify-center p-5 gap-8">
            <div className="w-1/2 ">
              <div>
                <div className="flex flex-col  gap-3">
                  <TextInput
                    placeholder="Tên phim"
                    label="Tên phim"
                    radius="md"
                    withAsterisk
                    {...form.getInputProps("title")}
                  />

                  <Textarea
                    label="Mô tả"
                    placeholder="Mô tả"
                    autosize
                    withAsterisk
                    radius="md"
                    minRows={2}
                    maxRows={4}
                    {...form.getInputProps("description")}
                  />

                  <MultiSelect
                    label="Đạo diễn"
                    data={dataDirectors}
                    placeholder="Đạo diễn"
                    searchable
                    withAsterisk
                    radius="md"
                    creatable
                    clearable
                    {...form.getInputProps("directors")}
                    getCreateLabel={(query) => `+ Thêm ${query}`}
                    onCreate={(query) => {
                      const item = {
                        value: query,
                        label: query,
                        disabled: false,
                      };
                      setDataDirectors((current) => [...current, item]);
                      return item;
                    }}
                  />

                  <MultiSelect
                    label="Diễn viên"
                    data={dataActors}
                    placeholder="Diễn viên"
                    searchable
                    radius="md"
                    withAsterisk
                    {...form.getInputProps("actors")}
                    clearable
                    creatable
                    getCreateLabel={(query) => `+ Thêm ${query}`}
                    onCreate={(query) => {
                      const item = {
                        value: query,
                        label: query,
                        disabled: false,
                      };
                      setDataActors((current) => [...current, item]);
                      return item;
                    }}
                  />

                  <TextInput
                    placeholder="Độ tuổi yêu cầu"
                    label="Độ tuổi yêu cầu"
                    radius="md"
                    withAsterisk
                    type="number"
                    {...form.getInputProps("ageRequire")}
                  />

                  <DateInput
                    minDate={new Date(Date.now() + 3600 * 1000 * 24)}
                    label="Ngày phát hành"
                    placeholder="Ngày phát hành"
                    withAsterisk
                    clearable
                    radius="md"
                    {...form.getInputProps("releaseDate")}
                  />

                  <DateInput
                    minDate={new Date(Date.now() + 3600 * 1000 * 24)}
                    label="Ngày kết thúc"
                    placeholder="Ngày kết thúc"
                    withAsterisk
                    clearable
                    radius="md"
                    {...form.getInputProps("endDate")}
                  />

                  <TextInput
                    placeholder="Thời lượng phim"
                    label="Thời lượng phim"
                    radius="md"
                    withAsterisk
                    {...form.getInputProps("duration")}
                    type="number"
                    rightSection={
                      <p className="text-xs mb-0 bg-gray-200 p-1 mr-4 rounded-md">
                        Phút
                      </p>
                    }
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2 ">
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <MultiSelect
                    label="Ngôn ngữ"
                    className="w-1/2"
                    data={dataLanguage}
                    placeholder="Ngôn ngữ"
                    searchable
                    radius="md"
                    withAsterisk
                    maxSelectedValues={1}
                    {...form.getInputProps("language")}
                    clearable
                    creatable
                    getCreateLabel={(query) => `+ Thêm ${query}`}
                    onCreate={(query) => {
                      const item = {
                        value: query,
                        label: query,
                      };
                      setDataLanguage((current) => [...current, item]);
                      return item;
                    }}
                  />

                  <MultiSelect
                    label="Quốc gia"
                    className="w-1/2"
                    data={dataCountry}
                    placeholder="Quốc gia"
                    searchable
                    radius="md"
                    withAsterisk
                    maxSelectedValues={1}
                    {...form.getInputProps("country")}
                    clearable
                    creatable
                    getCreateLabel={(query) => `+ Thêm ${query}`}
                    onCreate={(query) => {
                      const item = {
                        value: query,
                        label: query,
                      };
                      setDataCountry((current) => [...current, item]);
                      return item;
                    }}
                  />
                </div>

                <MultiSelect
                  data={dataSubtitle}
                  label="Phụ đề"
                  placeholder="Chọn phụ đề"
                  searchable
                  searchValue={searchValueSubtitle}
                  onSearchChange={onSearchChangeSubtitle}
                  {...form.getInputProps("subtitle")}
                  clearable
                  radius="md"
                  maxSelectedValues={1}
                />

                <MultiSelect
                  data={dataGenreMovie}
                  label="Thể loại"
                  {...form.getInputProps("genre")}
                  placeholder="Chọn thể loại cho bộ phim"
                  searchable
                  searchValue={searchValue}
                  onSearchChange={onSearchChange}
                  nothingFound="Không tìm thấy"
                  clearable
                  radius="md"
                  maxSelectedValues={3}
                />

                <TextInput
                  placeholder="Giá"
                  label="Giá"
                  radius="md"
                  withAsterisk
                  {...form.getInputProps("price")}
                  type="number"
                  rightSection={
                    <p className="text-xs mb-0 bg-gray-200 p-1 mr-4 rounded-md">
                      VNĐ
                    </p>
                  }
                />

                <div className="w-full">
                  <UploadImage
                    isResetImg={isResetImg}
                    setIsResetImg={setIsResetImg}
                  ></UploadImage>
                  {form.errors.images ? (
                    <p className="error-form-auth">{form.errors.images}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 w-1/2  px-5 py-5">
            <Button loading={isLoading} radius="md" w={"50%"} type="submit">
              Lưu
            </Button>
            <Button
              radius="md"
              w={"50%"}
              type="reset"
              loading={isLoading}
              onClick={() => {
                setIsResetImg(true);
                form.reset();
              }}
            >
              Xoá tất cả
            </Button>
          </div>
        </form>
      </MovieFormProvider>
    </div>
  );
};

export default AddMoviePage;
