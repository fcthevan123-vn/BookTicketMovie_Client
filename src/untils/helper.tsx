import apiProvinceVietNam from "./apiProvinceVietNam";
import NormalToast from "../components/AllToast/NormalToast";

export function dateAdd(date: Date, interval: string, units: number) {
  if (!(date instanceof Date)) return undefined;
  let ret = new Date(date); //don't change original date
  const checkRollover = function () {
    if (ret.getDate() != date.getDate()) ret.setDate(0);
  };
  switch (String(interval).toLowerCase()) {
    case "year":
      ret.setFullYear(ret.getFullYear() + units);
      checkRollover();
      break;
    case "quarter":
      ret.setMonth(ret.getMonth() + 3 * units);
      checkRollover();
      break;
    case "month":
      ret.setMonth(ret.getMonth() + units);
      checkRollover();
      break;
    case "week":
      ret.setDate(ret.getDate() + 7 * units);
      break;
    case "day":
      ret.setDate(ret.getDate() + units);
      break;
    case "hour":
      ret.setTime(ret.getTime() + units * 3600000);
      break;
    case "minute":
      ret.setTime(ret.getTime() + units * 60000);
      break;
    case "second":
      ret.setTime(ret.getTime() + units * 1000);
      break;
    default:
      ret = new Date();
      break;
  }
  return ret;
}

export async function getAllNameProvince(codes: string[], spaceSymbol: string) {
  try {
    let resultProvince = "";
    const resWard = await apiProvinceVietNam.callApiCity(`ward/${codes[1]}`);
    const resDistrict = await apiProvinceVietNam.callApiCity(
      `district/${codes[0]}`
    );
    const resCity = await apiProvinceVietNam.callApiCity("");

    const allName = {
      city: resCity.results.find(
        (item: { province_id: string }) => item.province_id == codes[0]
      ).province_name,
      district: resDistrict.results.find(
        (item: { district_id: string }) => item.district_id == codes[1]
      ).district_name,
      ward: resWard.results.find(
        (item: { ward_id: string }) => item.ward_id == codes[2]
      ).ward_name,
    };

    resultProvince =
      allName.ward +
      `${spaceSymbol}` +
      allName.district +
      `${spaceSymbol}` +
      allName.city;

    return resultProvince;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllCity() {
  try {
    const res = await apiProvinceVietNam.callApiCity("");

    const convertData = res.results.map(
      (item: { province_id: string; province_name: string }) => {
        return { value: item.province_id, label: item.province_name };
      }
    );

    return convertData;
  } catch (error) {
    NormalToast({
      title: "Lỗi lấy api tỉnh thành",
      message: "Đã có lỗi xảy ra trong quá trình gọi api lấy tỉnh thành",
      color: "red",
    });
  }
}

export async function getDistrictFromCity(city: string) {
  try {
    const res = await apiProvinceVietNam.callApiCity(`district/${city}`);

    const convertData = res.results.map(
      (item: { district_id: string; district_name: string }) => {
        return { value: item.district_id, label: item.district_name };
      }
    );

    return convertData;
  } catch (error) {
    NormalToast({
      title: "Lỗi lấy api tỉnh thành",
      message: "Đã có lỗi xảy ra trong quá trình gọi api lấy tỉnh thành",
      color: "red",
    });
  }
}

export async function getWardFromDistrict(district: string) {
  try {
    const res = await apiProvinceVietNam.callApiCity(`ward/${district}`);
    const convertData = res.results.map(
      (item: { ward_id: string; ward_name: string }) => {
        return { value: item.ward_id, label: item.ward_name };
      }
    );

    return convertData;
  } catch (error) {
    NormalToast({
      title: "Lỗi lấy api tỉnh thành",
      message: "Đã có lỗi xảy ra trong quá trình gọi api lấy phường/xã",
      color: "red",
    });
  }
}

export const dataSelectOfMovie = {
  genre: [
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
  ],
  country: [
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
  ],
};

export const selectAgeRequire = [
  {
    label: "T18",
    value: "T18",
    detail: "Phim được phổ biến đến người xem từ đủ 18 tuổi trở lên (18+).",
  },
  {
    label: "T16",
    value: "T16",
    detail: "Phim được phổ biến đến người xem từ đủ 16 tuổi trở lên (16+).",
  },
  {
    label: "T13",
    value: "T13",
    detail: "Phim được phổ biến đến người xem từ đủ 13 tuổi trở lên (13+).",
  },
  {
    label: "K",
    value: "K",
    detail:
      "Phim được phổ biến đến người xem dưới 13 tuổi và có người giám hộ đi kèm.",
  },
  {
    label: "P",
    value: "P",
    detail: "Phim được phép phổ biến đến người xem ở mọi độ tuổi.",
  },
];

export async function convertImgLinkToFile(imgLink: string, name: string) {
  try {
    const response = await fetch(imgLink);

    const blob = await response.blob();
    const file = new File([blob], name);
    return file;
  } catch (error) {
    console.log("error", error);
  }
}
