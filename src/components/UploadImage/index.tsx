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
import { useMovieFormContext } from "../Forms/FormProvider/FormProvider";

interface Props {
  isResetImg?: boolean;
  setIsResetImg(value: boolean): void | undefined;
  images?: { imageName: string; imageUrl: string }[];
}

export function UploadImage({ isResetImg, setIsResetImg, images }: Props) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [imgToViewFull, setImgToViewFull] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const form = useMovieFormContext();

  function handleDeleteLocalImage(
    imageUrl: string,
    index: number,
    fileName: string
  ) {
    setFiles((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
    form.setFieldValue("images", [
      ...files.slice(0, index),
      ...files.slice(index + 1),
    ]);
    if (fileName.includes("AwsS3Storage")) {
      const convertFileName = fileName.replace(/AwsS3Storage/, "");

      let imgDelete;
      if (form.values.imagesDelete && form.values.imagesDelete?.length > 0) {
        imgDelete = [...form.values.imagesDelete, convertFileName];
      } else {
        imgDelete = [convertFileName];
      }

      form.setFieldValue("imagesDelete", imgDelete);
    }

    URL.revokeObjectURL(imageUrl);
  }

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
            fit="fill"
            w={"100%"}
            height={"100%"}
          />
          <div className="absolute z-10 flex gap-3 top-1 right-1">
            <Tooltip label="Delete" withArrow radius="md">
              <ActionIcon
                className="shadow-lg"
                radius="md"
                color="blue"
                variant="filled"
                onClick={() => {
                  handleDeleteLocalImage(imageUrl, index, file.name);
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

  function handleFile(f: File[]) {
    f.map((fs) => {
      if (fs.size > 5000000) {
        return NormalToast({
          title: "Over size",
          message: "Please select less than 6MB",
          color: "red",
        });
      }
    });
    if (files.length + f.length <= 6) {
      const fileMerge = [...files, ...f];
      setFiles(fileMerge);
      form.setFieldValue("images", [...fileMerge, ...f]);
    } else {
      NormalToast({
        title: "Over size",
        message: "Please select less than 6 files",
        color: "red",
      });
      setFiles(files);
      form.setFieldValue("images", files);
    }
  }

  const fetchAndConvertImages = async (
    images: { imageName: string; imageUrl: string }[]
  ) => {
    try {
      const imgFiles = await Promise.all(
        images.map(async (url) => {
          const response = await fetch(url.imageUrl);

          if (!response.ok) {
            throw new Error(`Failed to fetch image: ${url.imageUrl}`);
          }

          const contentType = response.headers.get("content-type") as string;
          const blob = await response.blob();
          const file = new File([blob], url.imageName + "AwsS3Storage", {
            type: contentType,
          });
          return file;
        })
      );
      console.log("image files", imgFiles);
      setFiles(imgFiles);
    } catch (error) {
      console.error("Error fetching and converting images:", error);
    }
  };

  useEffect(() => {
    if (images) {
      fetchAndConvertImages(images);
    }
  }, [images]);

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
            cols={4}
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            mt={previews.length > 0 ? "xl" : 0}
          >
            {previews}
          </SimpleGrid>
        </div>
      )}

      <Dropzone
        // maxSize={5 * 1000000}
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
          handleFile(f);
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
        title={<p className="font-medium text-sky-500">Full image</p>}
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
