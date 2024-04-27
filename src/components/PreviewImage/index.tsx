import { Image } from "@mantine/core";

type Props = {
  img: File;
  width: number | string;
  height: number;
};

export function PreviewImages({ img, width, height }: Props) {
  const imageUrl = URL.createObjectURL(img as Blob);
  return (
    <div className="">
      <Image
        radius="md"
        h={height}
        w={width}
        fit="cover"
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    </div>
  );
}
