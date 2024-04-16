import { Button, Modal, NumberInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { DiscountTS } from "../../../types";
import moment from "moment";
import { DateInput } from "@mantine/dates";
import { discountServices } from "../../../services";
import { loadingApi } from "../../../untils/loadingApi";
import { ErrToast } from "../../../components/AllToast/NormalToast";
import { useEffect, useState } from "react";
import { useTableCustom } from "../../../components/Provider/TableFilterProvider";
import TableFilter from "../../../components/TableFilter";
import { modals } from "@mantine/modals";

function ManageDiscountPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [allDiscounts, setAllDiscounts] = useState<DiscountTS[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);

  const { setRows, headers, setHeaders } = useTableCustom();

  const form = useForm<DiscountTS>({
    initialValues: {
      id: "",
      nameDiscount: "",
      percentDiscount: 0,
      quantity: 0,
      startDate: new Date(),
      endDate: moment(new Date()).add(1, "day").toDate(),
    },

    validate: {
      nameDiscount: (value) =>
        value.length < 3 ? "Mã giảm giá phải lớn hơn 3 ký tự" : null,
      percentDiscount: (value) =>
        value && value > 2 ? null : "Phần trăm giảm giá phải lớn hơn 2%",
      quantity: (value) =>
        value && value > 3 ? null : "Số lượng mã giảm giá phải lớn hơn 3",
      startDate: (value) => {
        if (moment(value).isAfter(form.values.endDate)) {
          return "Ngày bắt đầu không được lớn hơn ngày kết thúc";
        }
      },
    },
  });

  async function handleSubmit(data: DiscountTS) {
    try {
      let api;
      let title;
      if (isUpdate) {
        title = "Sửa mã giảm giá";
        api = discountServices.updateDiscount(data);
      } else {
        const dataConvert = data;
        delete dataConvert.id;
        title = "Thêm mã giảm giá";
        api = discountServices.createDiscount(dataConvert);
      }

      const res = await loadingApi(api, title);

      if (res) {
        handleGetAllDiscount();
        form.reset();
        close();
      }

      return res;
    } catch (error) {
      ErrToast(error as Error, "handleSubmit");
    }
  }

  async function handleGetAllDiscount() {
    try {
      const res = await discountServices.getAllDiscount();

      if (res.statusCode == 0) {
        setAllDiscounts(res.data);
      }
    } catch (error) {
      ErrToast(error as Error, "handleGetAllDiscount");
    }
  }

  async function handleDeleteDiscount(id: string) {
    try {
      const api = discountServices.deleteDiscount(id);
      const res = await loadingApi(api, "Xoá mã giảm giá");
      if (res) {
        handleGetAllDiscount();
      }
    } catch (error) {
      ErrToast(error as Error, "handleDeleteDiscount");
    }
  }

  // modal confirm delete discount
  const openModal = (id: string) =>
    modals.openConfirmModal({
      title: (
        <p className="font-bold text-lg text-red-500">Xoá mã giảm giá này</p>
      ),
      children: (
        <Text size="sm">
          Khi xoá dữ liệu hệ thống không thể khôi phục lại dữ liệu được. Vui
          lòng xác nhận để xoá.
        </Text>
      ),
      radius: "md",
      confirmProps: { radius: "md", size: "compact-sm", color: "red" },
      cancelProps: { radius: "md", size: "compact-sm" },
      labels: { confirm: "Đồng ý", cancel: "Huỷ" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleDeleteDiscount(id),
    });

  useEffect(() => {
    handleGetAllDiscount();
  }, []);

  // render tabler of all discounts
  useEffect(() => {
    if (allDiscounts) {
      const rowRender = allDiscounts.map((row) => {
        return {
          nameDiscount: <Text fz="sm">{row.nameDiscount}</Text>,
          percentDiscount: <Text fz="sm">{row.percentDiscount}</Text>,
          quantityDiscount: <Text fz="sm">{row.quantity}</Text>,
          startDate: (
            <Text fz="sm">{moment(row.startDate).format("DD-MM-YYYY")}</Text>
          ),
          endDate: (
            <Text fz="sm">{moment(row.endDate).format("DD-MM-YYYY")}</Text>
          ),
          action: (
            <div className="flex gap-2">
              <Button
                size="compact-xs"
                radius={"md"}
                onClick={() => {
                  setIsUpdate(true);
                  form.setValues({
                    ...row,
                    startDate: new Date(row.startDate),
                    endDate: new Date(row.endDate),
                  });
                  open();
                }}
              >
                Xem chi tiết
              </Button>
              <Button
                size="compact-xs"
                color="red"
                radius={"md"}
                onClick={() => openModal(row.id as string)}
              >
                Xoá
              </Button>
            </div>
          ),
        };
      });

      setRows(rowRender);

      setHeaders([
        {
          label: "Tên mã giảm giá",
          value: "nameDiscount",
          isSortable: false,
        },
        {
          label: "Phần trăm giảm",
          value: "percentDiscount",
          isSortable: false,
        },
        {
          label: "Số lượng",
          value: "quantity",
          isSortable: false,
        },
        {
          label: "Ngày bắt đầu",
          value: "startDate",
          isSortable: false,
        },
        {
          label: "Ngày kết thúc",
          value: "endDate",
          isSortable: false,
        },
        {
          label: "#",
          value: "action",
          isSortable: false,
        },
      ]);
    }
  }, [allDiscounts, setHeaders, setRows]);

  return (
    <div>
      {/* Modal create discount */}
      <Modal
        opened={opened}
        onClose={() => {
          form.reset();
          close();
          setTimeout(() => {
            setIsUpdate(false);
          }, 300);
        }}
        title={
          <p className="text-violet-500 font-semibold text-lg">
            {!isUpdate ? "Thêm mã giảm giá" : "Cập nhật mã giảm giá"}
          </p>
        }
        size={"lg"}
        radius={"md"}
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <div className="grid grid-cols-2 gap-6">
            <TextInput
              label="Tên mã giảm giá"
              radius={"md"}
              withAsterisk
              description="Phải lớn hơn 3 ký tự"
              placeholder="Nhập tên mã giảm giá"
              {...form.getInputProps("nameDiscount")}
            />
            <NumberInput
              label="Phần trăm giảm"
              radius={"md"}
              min={0}
              withAsterisk
              description="Trừ trực tiếp vào tổng tiền (lớn hơn 2%)"
              placeholder="Nhập phần trăm giảm"
              {...form.getInputProps("percentDiscount")}
            />

            <DateInput
              radius={"md"}
              label="Ngày bắt đầu"
              minDate={new Date()}
              placeholder="Chọn ngày bắt đầu"
              withAsterisk
              description="Ngày bắt đầu áp dụng mã"
              {...form.getInputProps("startDate")}
            />
            <DateInput
              radius={"md"}
              label="Ngày kết thúc"
              minDate={moment(new Date()).add(1, "day").toDate()}
              placeholder="Chọn ngày kết thúc"
              withAsterisk
              description="Ngày kết thúc áp dụng mã"
              {...form.getInputProps("endDate")}
            />

            <NumberInput
              radius={"md"}
              min={0}
              label="Số lượng"
              placeholder="Nhập số lượng mã giảm giá"
              withAsterisk
              description="Số lượng mã giảm giá hợp lệ"
              {...form.getInputProps("quantity")}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" size="sm" mt={"sm"} radius={"md"}>
              Lưu
            </Button>
            <Button
              onClick={() => {
                form.reset();
                close();
                setTimeout(() => {
                  setIsUpdate(false);
                }, 300);
              }}
              size="sm"
              mt={"sm"}
              variant="light"
              radius={"md"}
            >
              Huỷ
            </Button>
          </div>
        </form>
      </Modal>
      <div className="flex justify-end">
        <Button
          size="xs"
          variant="filled"
          mb={"lg"}
          radius={"md"}
          onClick={open}
        >
          Thêm mã giảm giá
        </Button>
      </div>
      <TableFilter headers={headers}></TableFilter>
    </div>
  );
}

export default ManageDiscountPage;
