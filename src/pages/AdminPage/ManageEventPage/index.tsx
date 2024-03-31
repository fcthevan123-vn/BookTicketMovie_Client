import { Button, FileInput, Image, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import EditorEvent from "./EditorEvent";
import { EventTS } from "../../../types";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";

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

  const form = useForm<EventTS>({
    initialValues: {
      content: "",
      discount: "",
      title: "",
      startDate: new Date(),
      endDate: new Date(),
      imageFile: null,
    },

    // functions will be used to validate values at corresponding key
  });

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title={
          <p className="text-violet-500 font-bold text-xl">Thêm sự kiện mới</p>
        }
        fullScreen
        radius={0}
      >
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <div>
            {/* Tìm hiểu form context để validate Editor Event */}
            <EditorEvent form={form}></EditorEvent>
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
                placeholder="Chọn ngày bắt đầu"
                withAsterisk
                description="Ngày bắt đầu áp dụng sự kiện"
                {...form.getInputProps("startDate")}
              />
              <DateInput
                label="Ngày kết thúc"
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
              <Button size="xs" type="submit">
                Lưu
              </Button>

              <Button size="xs" variant="light" onClick={close}>
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
    </div>
  );
}

export default ManageEventPage;
