import {
  Button,
  TextInput,
  Textarea,
  MultiSelect,
  Select,
  TagsInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { UploadImage } from "../../../components/UploadImage";
import { DateInput } from "@mantine/dates";
import moment from "moment";
import { MovieFormProvider, useMovieForm } from "../FormProvider/FormProvider";
import { movieServices } from "../../../services";
import { loadingApi } from "../../../untils/loadingApi";
import { useMovie } from "../../Provider/MovieProvider/MovieProvider";
import classes from "./FormEditMovie.module.css";
import {
  IconBadgeCc,
  IconFlag,
  IconLanguage,
  IconList,
} from "@tabler/icons-react";

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
].map((item) => ({
  value: item,
  label: item,
}));

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
].map((item) => ({
  value: item,
  label: item,
}));

// interface dataSelectProps {
//   value: string;
//   label: string;
//   disabled?: boolean;
// }

interface MovieData {
  id?: string;
  title: string;
  description: string;
  directors: string[];
  actors: string[];
  ageRequire: string;
  releaseDate: Date | string;
  endDate: Date | string;
  duration: string;
  language: string;
  country: string;
  subtitle: string;
  genre: string[];
  images: File[] | { imageName: string; imageUrl: string }[] | undefined;
  imagesDelete?: string | string[];
}

interface FormEditMovieProps {
  dataMovie: MovieData;
  onClose: () => void;
}

const FormEditMovie = ({ dataMovie, onClose }: FormEditMovieProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { activePage, getLimitMovies } = useMovie();

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

  const form = useMovieForm({
    initialValues: {
      title: dataMovie.title,
      description: dataMovie.description,
      directors: [""],
      actors: [""],
      ageRequire: dataMovie.ageRequire,
      releaseDate: new Date(dataMovie.releaseDate),
      endDate: new Date(dataMovie.endDate),
      duration: dataMovie.duration,
      language: "",
      country: "",
      subtitle: "",
      genre: [""],
      images: [],
      imagesDelete: [],
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
    },
    // validateInputOnChange: true,
  });

  async function handleSubmit(dataForm: typeof form.values) {
    // console.log("datamovie", dataMovie);
    console.log("dataForm: ", dataForm);
    setIsLoading(true);
    const api = movieServices.editMovie(dataForm, dataMovie.id as string);
    const res = await loadingApi(api, "Chỉnh sửa phim");
    setIsLoading(false);
    if (res) {
      getLimitMovies(activePage);
      onClose();
    }

    return res;
  }

  useEffect(() => {
    if (dataMovie) {
      const directorsExisted = dataMovie.directors.map((director) => ({
        value: director,
        disabled: false,
        label: director,
      }));

      const actorsExisted = dataMovie.actors.map((actor) => ({
        value: actor,
        disabled: false,
        label: actor,
      }));
      setDataDirectors((prev) => [...prev, ...directorsExisted]);
      setDataActors((prev) => [...prev, ...actorsExisted]);
    }
  }, [dataMovie]);

  useEffect(() => {
    if (dataMovie) {
      form.setFieldValue("language", dataMovie.language);
      form.setFieldValue("country", dataMovie.country);
      form.setFieldValue("subtitle", dataMovie.subtitle);
      form.setFieldValue(
        "directors",
        dataMovie.directors.map((g) => g)
      );
      form.setFieldValue(
        "actors",
        dataMovie.actors.map((ac) => ac)
      );
      form.setFieldValue(
        "genre",
        dataMovie.genre.map((g) => g)
      );
    }
  }, [dataMovie]);

  return (
    <MovieFormProvider form={form}>
      <div className="h-full">
        {/* {console.log("form img delete", form.values.imagesDelete)} */}
        <form onSubmit={form.onSubmit(() => handleSubmit(form.values))}>
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

                  <TagsInput
                    radius="md"
                    label="Đạo diễn"
                    withAsterisk
                    description="Tối đa 3 người"
                    placeholder="Enter để thêm đạo diễn"
                    {...form.getInputProps("directors")}
                    data={dataDirectors}
                    maxTags={3}
                    classNames={{
                      dropdown: classes.dropdownMenu,
                    }}
                  />

                  <TagsInput
                    radius="md"
                    label="Diễn viên"
                    withAsterisk
                    description="Tối đa 10 người"
                    placeholder="Enter để thêm diễn viên"
                    {...form.getInputProps("actors")}
                    data={dataActors}
                    maxTags={10}
                    classNames={{
                      dropdown: classes.dropdownMenu,
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
                  <Select
                    label="Ngôn ngữ"
                    className="w-1/2"
                    {...form.getInputProps("language")}
                    placeholder="Chọn ngôn ngữ"
                    leftSection={<IconLanguage size={"20px"}></IconLanguage>}
                    data={dataSubtitle}
                    radius={"md"}
                    classNames={{
                      dropdown: classes.dropdownMenu,
                    }}
                  />

                  <Select
                    label="Quốc gia"
                    className="w-1/2"
                    leftSection={<IconFlag size={"20px"}></IconFlag>}
                    {...form.getInputProps("country")}
                    placeholder="Chọn quốc gia"
                    data={dataSubtitle}
                    radius={"md"}
                    classNames={{
                      dropdown: classes.dropdownMenu,
                    }}
                  />
                </div>

                <Select
                  label="Phụ đề"
                  leftSection={<IconBadgeCc size={"20px"}></IconBadgeCc>}
                  {...form.getInputProps("subtitle")}
                  placeholder="Chọn phụ đề"
                  data={dataSubtitle}
                  radius={"md"}
                  classNames={{
                    dropdown: classes.dropdownMenu,
                  }}
                />

                <MultiSelect
                  label="Thể loại"
                  placeholder="Chọn thể loại cho bộ phim"
                  leftSection={<IconList size={"20px"}></IconList>}
                  data={dataGenreMovie}
                  {...form.getInputProps("genre")}
                  searchable
                  radius={"md"}
                  nothingFoundMessage="Không tìm thấy"
                  classNames={{
                    dropdown: classes.dropdownMenu,
                  }}
                  maxValues={3}
                />

                <div className="w-full">
                  <UploadImage
                    setIsResetImg={() => undefined}
                    images={dataMovie.images}
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
              Lưu thay đổi
            </Button>
            <Button
              radius="md"
              w={"50%"}
              type="reset"
              variant="light"
              loading={isLoading}
              onClick={() => onClose()}
            >
              Huỷ
            </Button>
          </div>
        </form>
      </div>
    </MovieFormProvider>
  );
};

export default FormEditMovie;
