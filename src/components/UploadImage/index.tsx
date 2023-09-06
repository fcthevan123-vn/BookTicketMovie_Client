import { useState } from "react";
import { Image, Button, ActionIcon, Modal, Tooltip } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { IconUpload, IconX } from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import NormalToast from "../AllToast/NormalToast";
import { IconArrowsMaximize } from "@tabler/icons-react";

export function UploadImage() {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [imgToViewFull, setImgToViewFull] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);

    return (
      <Carousel.Slide key={index}>
        <div className="relative w-full h-full flex  justify-center items-center">
          <div className="absolute top-0 z-10 cursor-pointer">
            <Image
              key={index}
              src={imageUrl}
              fit="contain"
              w={400}
              height={400}
              // imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
            />
          </div>
          <div className="absolute z-20 flex gap-3 top-2 right-2">
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
      </Carousel.Slide>
    );
  });

  return (
    <div>
      {files.length > 0 && (
        <div className="mb-8 p-2 boxshadow-custom rounded-xl">
          <Carousel
            draggable={false}
            loop
            mx="auto"
            withIndicators
            controlSize={35}
            height={400}
          >
            {previews}
          </Carousel>
        </div>
      )}

      <Dropzone
        maxSize={6000000}
        onFileDialogOpen={() => console.log("open modal")}
        radius="lg"
        accept={IMAGE_MIME_TYPE}
        onDrop={(f) => {
          if (files.length + f.length <= 6) {
            setFiles((prev) => [...prev, ...f]);
          } else {
            NormalToast({
              title: "Over size",
              message: "Please select less than 6 files",
              color: "red",
            });
            setFiles(files);
          }
        }}
      >
        <div className="flex justify-center flex-col gap-4 items-center">
          <ActionIcon color="blue" size="xl" radius="md" variant="outline">
            <IconUpload size="2.125rem" />
          </ActionIcon>
          <Button radius="xl">Upload images here!</Button>
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
