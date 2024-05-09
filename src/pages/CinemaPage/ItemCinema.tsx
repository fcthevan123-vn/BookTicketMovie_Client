import { Badge, Divider, Text, ThemeIcon } from "@mantine/core";
import { PreviewImages } from "../../components/PreviewImage";
import { Cinema } from "../../types";
import {
  IconHome,
  IconLocation,
  IconMail,
  IconMap,
  IconPhone,
  IconTheater,
  IconUser,
} from "@tabler/icons-react";

type Props = {
  data: Cinema;
};

function ItemCinema({ data }: Props) {
  return (
    <div>
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-2">
          <PreviewImages
            img={
              data.image
                ? data.image
                : "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png"
            }
            height={280}
            width={"100%"}
          ></PreviewImages>
        </div>
        <div className="col-span-2 h-full">
          <div className="shadow py-2 h-full px-4 rounded-lg border bg-white flex flex-col gap-2">
            <div className="flex gap-1 items-end">
              <ThemeIcon variant="light" size="md" color="violet" radius={"md"}>
                <IconTheater style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
              <Text size="lg" fw={600} tt={"capitalize"}>
                {data.name}
              </Text>
            </div>

            <div className="flex gap-1 items-end">
              <ThemeIcon variant="light" size="md" color="violet" radius={"md"}>
                <IconLocation style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
              <Text size="sm" c={"dimmed"} fw={500} tt={"capitalize"}>
                {data.detailLocation}
              </Text>
            </div>

            <div className="flex gap-1 items-end">
              <ThemeIcon variant="light" size="md" color="violet" radius={"md"}>
                <IconMap style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
              <Text
                size="sm"
                c={"dimmed"}
                lineClamp={1}
                fw={500}
                tt={"capitalize"}
              >
                {data.locationName}
              </Text>
            </div>

            <div className="flex gap-1 items-end">
              <ThemeIcon variant="light" size="md" color="violet" radius={"md"}>
                <IconPhone style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
              <Text size="sm" fw={500} c={"dimmed"} tt={"capitalize"}>
                {data.hotline}
              </Text>
            </div>

            <div className="flex  col-span-2">
              <div>
                <Text size="sm" fw={500} tt={"capitalize"}>
                  <ThemeIcon
                    me={"4px"}
                    variant="light"
                    size="md"
                    color="violet"
                    radius={"md"}
                  >
                    <IconHome style={{ width: "70%", height: "70%" }} />
                  </ThemeIcon>
                  Các phòng chiếu
                </Text>
                <div className="pt-2 grid grid-cols-2 gap-2">
                  {data.MovieHalls &&
                    data.MovieHalls.map((movieHall) => (
                      <Badge key={movieHall.id} radius={"sm"} variant="outline">
                        {movieHall.name}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="shadow py-2 px-4 rounded-lg border bg-white flex flex-col gap-2">
          <Text size="lg" fw={600} tt={"capitalize"} td={"underline"}>
            Nhân viên quản lý
          </Text>
          <div className="flex gap-1 items-end">
            <ThemeIcon variant="light" size="md" color="violet" radius={"md"}>
              <IconUser style={{ width: "70%", height: "70%" }} />
            </ThemeIcon>
            <Text size="md" c={"violet.7"} fw={600} tt={"capitalize"}>
              {data.User?.fullName}
            </Text>
          </div>

          <div className="flex gap-1 items-end">
            <ThemeIcon variant="light" size="md" color="violet" radius={"md"}>
              <IconMail style={{ width: "70%", height: "70%" }} />
            </ThemeIcon>
            <Text size="sm" c={"dimmed"}>
              {data.User?.email}
            </Text>
          </div>

          <div className="flex gap-1 items-end">
            <ThemeIcon variant="light" size="md" color="violet" radius={"md"}>
              <IconPhone style={{ width: "70%", height: "70%" }} />
            </ThemeIcon>
            <Text size="sm" c={"dimmed"}>
              {data.User?.phone}
            </Text>
          </div>
        </div>
      </div>
      <Divider my="lg" size={"sm"} mx={"xl"} />
    </div>
  );
}

export default ItemCinema;
