import { Alert, Modal } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

type Props = {
  opened: boolean;
  close: () => void;
};

function ViewDetailAgeRequire({ opened, close }: Props) {
  return (
    <div>
      <Modal
        centered
        radius={"md"}
        opened={opened}
        onClose={close}
        size={"lg"}
        title={
          <p className="font-semibold text-lg text-gray-500">
            Phân loại phim theo độ tuổi{" "}
          </p>
        }
      >
        <div className="px-4 pb-4">
          <ul className="list-disc list-inside">
            <li className="my-2">
              <span className="font-extrabold underline">T18</span> - Phim được
              phổ biến đến người xem từ đủ 18 tuổi trở lên (18+).
            </li>
            <li className="my-2">
              <span className="font-extrabold underline">T16</span> - Phim được
              phổ biến đến người xem từ đủ 16 tuổi trở lên (16+).
            </li>
            <li className="my-2">
              <span className="font-extrabold underline">T13</span> - Phim được
              phổ biến đến người xem từ đủ 13 tuổi trở lên (13+).
            </li>
            <li className="my-2">
              <span className="font-extrabold underline">K</span> - Phim được
              phổ biến đến người xem dưới 13 tuổi và có người giám hộ đi kèm.
            </li>
            <li className="my-2">
              <span className="font-extrabold underline">P</span> - Phim được
              phép phổ biến đến người xem ở mọi độ tuổi.
            </li>
          </ul>

          <div className="mt-4 flex ">
            <Alert
              variant="light"
              className="shadow-md"
              radius={"md"}
              color="orange"
              title="Lưu ý"
              icon={<IconAlertTriangle></IconAlertTriangle>}
            >
              <p className="text-xs">
                1. Quý Khách Hàng xem phim được phân loại T13, T16, T18 vui lòng
                mang theo giấy tờ tùy thân có ảnh nhận diện và ngày tháng năm
                sinh để đảm bảo việc tuân thủ theo quy định.{" "}
              </p>
              <p className="text-xs  mt-2">
                2. Ban Quản Lý Cụm Rạp Chiếu Phim Show Booking có quyền kiểm tra
                và từ chối Quý Khách Hàng nếu không tuân thủ đúng quy định về độ
                tuổi.
              </p>
            </Alert>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ViewDetailAgeRequire;
