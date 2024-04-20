import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { eventServices } from "../../services";
import {
  Container,
  Divider,
  Image,
  TypographyStylesProvider,
} from "@mantine/core";
import { EventTS } from "../../types";
import moment from "moment";

function EventPage() {
  const { id } = useParams();
  const [eventData, setEventData] = useState<EventTS>();

  async function getEventData(id: string) {
    try {
      const res = await eventServices.getOneEvent(id);
      if (res.statusCode === 0) {
        setEventData(res.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    getEventData(id as string);
  }, [id]);

  return (
    <Container size={"xl"}>
      <div className="flex flex-col mt-5">
        <div className="grid sm:grid-cols-4 grid-cols-1 gap-6">
          <div className="col-span-3">
            <Image radius="md" h={350} src={eventData?.thumbnail} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-2xl uppercase font-bold">{eventData?.title}</p>
            {eventData?.discount && (
              <p className="font-medium">
                Mã giảm giá:
                <span className="text-violet-500 font-semibold">
                  {eventData?.discount}
                </span>
              </p>
            )}
            <p className="font-medium ">
              Bắt đầu từ:{" "}
              <span className="font-normal italic text-gray-500">
                {moment(eventData?.startDate).format("DD/MM/YYYY")}
              </span>
            </p>
            <p className="font-medium ">
              Kết thúc vào:{" "}
              <span className="font-normal italic text-gray-500">
                {moment(eventData?.endDate).format("DD/MM/YYYY")}
              </span>
            </p>
          </div>
        </div>
        <Divider my="xl" size={"sm"} />
        <div>
          <TypographyStylesProvider>
            <div
              dangerouslySetInnerHTML={{ __html: eventData?.content as string }}
            />
          </TypographyStylesProvider>
        </div>
      </div>
    </Container>
  );
}

export default EventPage;
