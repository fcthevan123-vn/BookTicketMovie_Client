import { useState, useEffect, Fragment } from "react";
import {
  Image,
  Button,
  ActionIcon,
  Modal,
  Tooltip,
  SimpleGrid,
  Skeleton,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { IconX } from "@tabler/icons-react";
import NormalToast from "../AllToast/NormalToast";
import { IconArrowsMaximize } from "@tabler/icons-react";
import { useMovieFormContext } from "../Forms/FormProvider/FormProvider";

interface Props {
  isResetImg?: boolean;
  setIsResetImg(value: boolean): void | undefined;
  images?: File[] | { imageName: string; imageUrl: string }[];
}

export function UploadImage({ isResetImg, setIsResetImg, images }: Props) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [imgToViewFull, setImgToViewFull] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
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
        className="relative w-full h-full flex shadow-md rounded-lg justify-center items-center"
      >
        <div>
          <Image
            key={index}
            src={imageUrl}
            width={"100%"}
            radius={"md"}
            height={80}
            fit="contain"
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

  function handleFile(f: FileWithPath[]) {
    if (files.length + f.length <= 6) {
      const fileMerge = [...files, ...f];
      setFiles(fileMerge);
      form.setFieldValue("images", fileMerge);
    } else {
      NormalToast({
        title: "Over quantity files",
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
      setLoading(false);
      setFiles(imgFiles);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching and converting images:", error);
    }
  };

  useEffect(() => {
    if (images) {
      fetchAndConvertImages(
        images as { imageName: string; imageUrl: string }[]
      );
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
        <div className="mb-8 p-2 rounded-xl">
          <SimpleGrid
            cols={4}
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            mt={previews.length > 0 ? "xl" : 0}
          >
            {previews}
          </SimpleGrid>
        </div>
      )}

      {files.length === 0 && images && images?.length > 0 && loading && (
        <div className="mb-8 p-2 rounded-xl">
          <SimpleGrid
            cols={4}
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            mt={previews.length > 0 ? "xl" : 0}
          >
            {images.map((image, index: number) => (
              <Fragment key={index}>
                <Skeleton height={70} radius="md" />
              </Fragment>
            ))}
          </SimpleGrid>
        </div>
      )}

      <Dropzone
        maxSize={5 * 1000000}
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
        onReject={() => {
          NormalToast({
            title: "Over size fille",
            message: "Please select image less than 5MB",
            color: "red",
          });
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
