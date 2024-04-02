import {
  Button,
  FileInput,
  Image,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import EditorEvent from "./EditorEvent";
import { EventTS } from "../../../types";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import moment from "moment";
import { useEffect, useState } from "react";
import { eventServices } from "../../../services";
import { loadingApi } from "../../../untils/loadingApi";
import { useTableCustom } from "../../../components/Provider/TableFilterProvider";
import TableFilter from "../../../components/TableFilter";
import { modals } from "@mantine/modals";

interface PreviewImagesProps {
  img: File;
}

function PreviewImages({ img }: PreviewImagesProps) {
  const imageUrl = URL.createObjectURL(img as Blob);
  return (
    <div className="mt-5">
      <Image
        radius="md"
        h={170}
        w="auto"
        fit="contain"
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    </div>
  );
}

function ManageEventPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [allEvents, setAllEvents] = useState<EventTS[]>([]);
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const { setRows, headers, setHeaders } = useTableCustom();

  const form = useForm<EventTS>({
    initialValues: {
      content:
        '<h2 style="text-align: center;">Tiêu đề</h2><p> Thêm sự kiện mới </p>',
      discount: "",
      title: "",
      startDate: new Date(),
      endDate: moment(new Date()).add(1, "day").toDate(),
      imageFile: null,
    },

    validate: {
      content: (value) =>
        value.length < 20 ? "Nội dung của sự kiện phải lớn hơn 20 ký tự" : null,
      discount: (value) =>
        value && value.length > 3 ? null : "Mã giảm giá phải lớn hơn 3 ký tự",
      title: (value) =>
        value && value.length > 3 ? null : "Tiêu đề phải lớn hơn 3 ký tự",
      startDate: (value) => (value ? null : "Ngày bắt đầu trống"),
      endDate: (value) => (value ? null : "Ngày bắt đầu trống"),
      imageFile: (value) => (value == null ? "Ảnh thumbnail trống" : null),
    },
  });

  // get all events
  async function getAllEvents() {
    try {
      const res = await eventServices.getAllEvents();

      if (res.statusCode === 0) {
        setAllEvents(res.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  // handle submit form
  async function handleSubmit(data: EventTS) {
    setLoading(true);
    const api = eventServices.createEvent(data);

    const res = await loadingApi(api, "Tạo sự kiện mới");

    setLoading(false);
    if (res) {
      getAllEvents();
      form.reset();
      close();
    }

    return res;
  }

  // control create or update events
  async function controlCallApi(isUpdate: boolean, data: EventTS) {
    if (isUpdate) {
      await handleUpdateEvent(data);
    } else {
      await handleSubmit(data);
    }
  }

  // handle delete event
  async function handleDeleteEvent(id: string) {
    setLoading(true);
    const api = eventServices.deleteEvent(id);

    const res = await loadingApi(api, "Xoá sự kiện");

    setLoading(false);

    if (res) {
      getAllEvents();
    }

    return res;
  }

  // handle update event
  async function handleUpdateEvent(data: EventTS) {
    setLoading(true);
    const api = eventServices.updateEvent(data);

    const res = await loadingApi(api, "Cập nhật sự kiện");

    setLoading(false);
    setIsUpdate(false);

    if (res) {
      getAllEvents();
    }

    return res;
  }

  // Pass data event existed into modal to show detail
  async function viewDetail(dataEvent: EventTS) {
    setIsUpdate(true);
    let fileConverted;
    if (dataEvent.thumbnail) {
      const response = await fetch(dataEvent.thumbnail);
      const blob = await response.blob();
      const file = new File([blob], "img");
      fileConverted = file;
    }

    const convertData = {
      ...dataEvent,
      startDate: new Date(dataEvent.startDate),
      endDate: new Date(dataEvent.endDate),
      imageFile: fileConverted,
    };
    form.setValues(convertData);

    open();
  }

  // modal confirm delete event
  const openModal = (id: string) =>
    modals.openConfirmModal({
      title: <p className="font-bold text-lg text-red-500">Xoá sự kiện này</p>,
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
      onConfirm: () => handleDeleteEvent(id),
    });

  useEffect(() => {
    getAllEvents();
  }, []);

  // render tabler of all events
  useEffect(() => {
    if (allEvents) {
      const rowRender = allEvents.map((row) => {
        return {
          title: <Text fz="sm">{row.title}</Text>,
          discount: <Text fz="sm">{row.discount}</Text>,
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
                onClick={() => viewDetail(row)}
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
          label: "Tiêu đề",
          value: "title",
          isSortable: false,
        },
        {
          label: "Mã giảm giá",
          value: "discount",
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
  }, [allEvents]);

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          form.reset();
          setIsUpdate(false);
        }}
        title={
          <p className="text-violet-500 font-bold text-xl">Thêm sự kiện mới</p>
        }
        fullScreen
        radius={0}
      >
        <form
          onSubmit={form.onSubmit((values) => controlCallApi(isUpdate, values))}
        >
          <div>
            <EditorEvent form={form}></EditorEvent>
            {form.errors.content && (
              <span className="text-xs text-red-600">
                {form.errors.content}
              </span>
            )}
            <div className="grid grid-cols-5 gap-8 mt-7">
              <TextInput
                label="Tiêu đề"
                withAsterisk
                description="Tiêu đề được hiển thị ở trang chủ"
                placeholder="Nhập tiêu đề ở đây"
                {...form.getInputProps("title")}
              />

              <TextInput
                label="Mã giảm giá"
                description="Nếu không có xin hãy bỏ qua"
                placeholder="Nhập mã giảm giá ở đây"
                {...form.getInputProps("discount")}
              />

              <FileInput
                accept="image/png,image/jpeg"
                label="Hình ảnh thumbnail"
                withAsterisk
                clearable
                description="Ảnh sẽ được hiển thị ở trang chủ"
                placeholder="Nhấn để chọn ảnh"
                {...form.getInputProps("imageFile")}
              />

              <DateInput
                label="Ngày bắt đầu"
                minDate={new Date()}
                placeholder="Chọn ngày bắt đầu"
                withAsterisk
                description="Ngày bắt đầu áp dụng sự kiện"
                {...form.getInputProps("startDate")}
              />
              <DateInput
                label="Ngày kết thúc"
                minDate={moment(new Date()).add(1, "day").toDate()}
                placeholder="Chọn ngày kết thúc"
                withAsterisk
                description="Ngày kết thúc áp dụng sự kiện"
                {...form.getInputProps("endDate")}
              />
            </div>

            {form.values.imageFile && (
              <div>
                <PreviewImages img={form.values.imageFile}></PreviewImages>
              </div>
            )}

            <div className="flex  w-full mt-7 gap-3">
              <Button loading={loading} size="xs" type="submit">
                Lưu
              </Button>

              <Button
                size="xs"
                loading={loading}
                variant="light"
                onClick={() => {
                  close();
                  setIsUpdate(false);
                }}
              >
                Huỷ
              </Button>
            </div>
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
          Thêm sự kiện
        </Button>
      </div>
      <TableFilter headers={headers}></TableFilter>
    </div>
  );
}

export default ManageEventPage;
