import { useState, useEffect } from "react";
import {
  Image,
  Button,
  ActionIcon,
  Modal,
  Tooltip,
  SimpleGrid,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { IconX } from "@tabler/icons-react";
import NormalToast from "../AllToast/NormalToast";
import { IconArrowsMaximize } from "@tabler/icons-react";

interface Props {
  form: unknown | any;
  isResetImg: boolean;
  setIsResetImg(value: boolean): void;
}

export function UploadImage({ form, isResetImg, setIsResetImg }: Props) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [imgToViewFull, setImgToViewFull] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);

    return (
      <div
        key={index}
        className="relative w-full h-full flex boxshadow-custom rounded-lg justify-center items-center"
      >
        <div className="cursor-pointer">
          <Image
            key={index}
            src={imageUrl}
            radius={"md"}
            fit="cover"
            w={80}
            height={80}
          />
          <div className="absolute z-10 flex gap-3 top-1 right-1">
            <Tooltip label="Delete" withArrow radius="md">
              <ActionIcon
                className="shadow-lg"
                radius="md"
                color="blue"
                variant="filled"
                onClick={() => {
                  setFiles((prev) => [
                    ...prev.slice(0, index),
                    ...prev.slice(index + 1),
                  ]);
                  form.setFieldValue("images", [
                    ...files.slice(0, index),
                    ...files.slice(index + 1),
                  ]);
                  URL.revokeObjectURL(imageUrl);
                }}
              >
                <IconX size="0.9rem" />
              </ActionIcon>
            </Tooltip>

            <Tooltip label="View full screen" withArrow radius="md">
              <ActionIcon
                className="shadow-lg"
                radius="md"
                color="blue"
                variant="filled"
                onClick={() => {
                  setImgToViewFull(imageUrl);
                  setIsOpenModal(true);
                }}
              >
                <IconArrowsMaximize size="0.9rem" />
              </ActionIcon>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    if (isResetImg) {
      form.setFieldValue("images", []);
      setFiles([]);
      setIsResetImg(false);
    }
  }, [isResetImg]);

  return (
    <div>
      {files.length > 0 && (
        <div className="mb-8 p-2  rounded-xl">
          <SimpleGrid
            cols={3}
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            mt={previews.length > 0 ? "xl" : 0}
          >
            {previews}
          </SimpleGrid>
        </div>
      )}
      <Dropzone
        maxSize={6000000}
        onFileDialogOpen={() => console.log("open modal")}
        radius="lg"
        accept={IMAGE_MIME_TYPE}
        sx={{
          width: "100%",
          height: "45px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onDrop={(f) => {
          if (files.length + f.length <= 6) {
            setFiles((prev) => [...prev, ...f]);
            form.setFieldValue("images", [...files, ...f]);
          } else {
            NormalToast({
              title: "Over size",
              message: "Please select less than 6 files",
              color: "red",
            });
            setFiles(files);
            form.setFieldValue("images", files);
          }
        }}
      >
        <div>
          <Button size="sm" compact radius="xl">
            Thêm hình ảnh
          </Button>
        </div>
      </Dropzone>

      <Modal
        opened={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        size="xl"
        title={<p className="font-medium">Full image</p>}
        radius="lg"
        centered
      >
        <div className="rounded-lg overflow-hidden shadow-md">
          <Image src={imgToViewFull} fit="fill" w={800} height={600} />
        </div>
      </Modal>
    </div>
  );
}
