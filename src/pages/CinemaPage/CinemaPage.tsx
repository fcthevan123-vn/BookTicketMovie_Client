import { Container, Select, Text, TextInput, Transition } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import ItemCinema from "./ItemCinema";
import { useDebouncedState, useSetState } from "@mantine/hooks";
import { getAllCity, getDistrictFromCity } from "../../untils/helper";
import { ErrToast } from "../../components/AllToast/NormalToast";
import { cinemaServices } from "../../services";
import { Cinema } from "../../types";

type queryDataType = {
  city: string | null;
  district: string | null;
};

type selectDataType = {
  city:
    | {
        value: string;
        label: string;
      }[]
    | null;
  district:
    | {
        value: string;
        label: string;
      }[]
    | null;
};

function CinemaPage() {
  const [queryData, setQueryData] = useSetState<queryDataType>({
    city: null,
    district: null,
  });

  const [selectData, setSelectData] = useSetState<selectDataType>({
    city: null,
    district: null,
  });
  const [valueCinema, setValueCinema] = useDebouncedState("", 300);

  const getCity = useCallback(async () => {
    const res = await getAllCity();
    setSelectData({
      city: res,
    });
  }, [setSelectData]);

  const [data, setData] = useState<Cinema[]>();

  const [isMount, setIsMount] = useState(false);

  const getDistrict = useCallback(
    async (city: string) => {
      const res = await getDistrictFromCity(city);
      setSelectData({
        district: res,
      });
    },
    [setSelectData]
  );

  const filterCinema = useCallback(
    async (data: queryDataType, cinema: string) => {
      setIsMount(false);
      try {
        const dataPass = { ...data, cinema };
        const res = await cinemaServices.filterCinema(dataPass);
        setData(res.cinemaDoc);
      } catch (error) {
        ErrToast(error as Error, "filterCinema");
      } finally {
        setTimeout(() => {
          setIsMount(true);
        }, 200);
      }
    },
    []
  );

  useEffect(() => {
    getCity();
  }, [getCity]);

  useEffect(() => {
    filterCinema(queryData, valueCinema);
  }, [filterCinema, queryData, valueCinema]);

  useEffect(() => {
    getDistrict(queryData.city as string);
  }, [getDistrict, queryData.city]);

  return (
    <Container size={"xl"} py={"sm"}>
      <div className="flex justify-between  p-5 ">
        <TextInput
          label="Nhập tên rạp"
          defaultValue={valueCinema}
          onChange={(e) => setValueCinema(e.target.value)}
          radius="md"
          placeholder="Tìm tên rạp"
        ></TextInput>
        <div className="flex gap-3">
          <Select
            radius="md"
            label="Thành phố/ Tỉnh"
            placeholder="Thành phố/ Tỉnh"
            value={queryData.city}
            clearable
            onChange={(e) => {
              setQueryData({
                district: null,
              });
              setQueryData({
                city: e,
              });
            }}
            data={selectData.city!}
            searchable
          ></Select>
          <Select
            radius="md"
            clearable
            placeholder="Quận/ Huyện"
            label="Quận/ Huyện"
            value={queryData.district}
            onChange={(e) => {
              setQueryData({
                district: e,
              });
            }}
            nothingFoundMessage="Không có dữ liệu"
            data={selectData.district!}
            searchable
          ></Select>
        </div>
      </div>

      <div className="mt-6  rounded-lg p-5 flex flex-col gap-3 bg-gray-50">
        <Transition
          mounted={isMount}
          transition="pop-top-left"
          exitDuration={300}
          duration={500}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles}>
              {data && data.length > 0 ? (
                data.map((cinema) => (
                  <ItemCinema data={cinema} key={cinema.id}></ItemCinema>
                ))
              ) : (
                <Text size="xl" ta={"center"} py={"lg"} fw={500} c={"dimmed"}>
                  Không tìm thấy dữ liệu
                </Text>
              )}
            </div>
          )}
        </Transition>
      </div>
    </Container>
  );
}

export default CinemaPage;
