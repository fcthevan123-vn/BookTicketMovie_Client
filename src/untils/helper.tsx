import axios from "axios";
import apiProvinceVietNam from "./apiProvinceVietNam";
import { ErrToast } from "../components/AllToast/NormalToast";

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

export async function getAllCountry() {
  try {
    const res = await axios.get(
      "https://restcountries.com/v3.1/independent?status=true&fields=name"
    );
    const convertData = console.log("res", res);

    console.log(convertData, res);
  } catch (error) {
    ErrToast(error as Error, "getAllCountry");
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
