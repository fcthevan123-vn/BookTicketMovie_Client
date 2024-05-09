import { Image, Skeleton } from "@mantine/core";
import { useState } from "react";

type Props = {
  img: File | string;
  width: number | string;
  height: number | string;
  radius?: string | number;
};

export function PreviewImages({ img, width, height, radius }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  let imageUrl;

  if (typeof img == "string") {
    imageUrl = img;
  } else {
    imageUrl = URL.createObjectURL(img as Blob);
  }

  return (
    <div className="">
      {isLoading ? null : <Skeleton h={height} w={width} radius={"md"} />}
      <Image
        radius={radius ? radius : "md"}
        h={height}
        w={width}
        style={isLoading ? {} : { display: "none" }}
        fit="cover"
        src={imageUrl}
        // onLoad={() => URL.revokeObjectURL(imageUrl)}
        onLoad={() => setIsLoading(true)}
      />
    </div>
  );
}
