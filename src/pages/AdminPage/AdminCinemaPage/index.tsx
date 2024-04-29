import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Image,
  Select,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { useCallback, useEffect, useState } from "react";
import FormAddCinema from "../../../components/Forms/FormCinema/FormAddCinema";
import { useTableCustom } from "../../../components/Provider/TableFilterProvider";
import { cinemaServices } from "../../../services";
import TableFilter from "../../../components/TableFilter";
import { IconPencil, IconSearch, IconTrash } from "@tabler/icons-react";
import {
  getAllCity,
  getAllNameProvince,
  getDistrictFromCity,
} from "../../../untils/helper";
import { useSetState } from "@mantine/hooks";
import { ErrToast } from "../../../components/AllToast/NormalToast";
import { Cinema } from "../../../types";

// type cinemaProps = {
//   name: string;
//   location: string[];
//   detailLocation: string;
//   User?: UserTS;
//   status: string;
// };

// type cinemaRows = {
//   name: React.ReactNode;
//   location: React.ReactNode;
//   detailLocation: React.ReactNode;
// };

// type Props = {};

function AdminCinemaPage() {
  const [data, setData] = useState<Cinema[]>();
  const [queryData, setQueryData] = useSetState({
    city: null,
    district: null,
    name: "",
  });
  const [selectData, setSelectData] = useSetState({
    city: [],
    district: [],
  });

  const {
    setRows,
    headers,
    setHeaders,

    setIsLoading,
  } = useTableCustom();

  const openModalAdd = () => {
    modals.open({
      title: (
        <Text fw={500} size="lg" c={"violet"}>
          Tạo rạp phim mới
        </Text>
      ),
      size: "lg",
      children: (
        <FormAddCinema
          isUpdate={false}
          cinemaData={null}
          getAllCinema={getLimitCinemas}
        ></FormAddCinema>
      ),
      radius: "md",
      lockScroll: false,
    });
  };

  const openModalUpdate = (data: Cinema) => {
    modals.open({
      title: (
        <Text fw={500} size="lg" c={"violet"}>
          Chỉnh sửa rạp phim
        </Text>
      ),
      size: "lg",
      children: (
        <FormAddCinema
          isUpdate={true}
          cinemaData={data}
          getAllCinema={getLimitCinemas}
        ></FormAddCinema>
      ),
      radius: "md",
      lockScroll: false,
    });
  };

  const filterCinema = useCallback(
    async (data: typeof queryData) => {
      setIsLoading(true);
      try {
        const res = await cinemaServices.searchCinema(data);
        if (res.statusCode == 0) {
          setData(res.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    },
    [setIsLoading]
  );

  async function getProvince(codes: string[]) {
    setIsLoading(true);
    try {
      const result = await getAllNameProvince(codes, " - ");
      setIsLoading(false);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  const getCity = useCallback(async () => {
    try {
      const data = await getAllCity();
      setSelectData({
        city: data,
      });
    } catch (error) {
      ErrToast(error as Error, "getCity");
    }
  }, [setSelectData]);

  const getDistrict = useCallback(
    async (city: string) => {
      try {
        const data = await getDistrictFromCity(city);
        setSelectData({
          district: data,
        });
      } catch (error) {
        ErrToast(error as Error, "getCity");
      }
    },
    [setSelectData]
  );

  useEffect(() => {
    getCity();
  }, [getCity]);

  useEffect(() => {
    if (queryData.city) {
      getDistrict(queryData.city);
    }
  }, [getDistrict, queryData.city]);

  useEffect(() => {
    filterCinema(queryData);
  }, [filterCinema, queryData]);

  // render table
  useEffect(() => {
    if (data) {
      const fetchData = async () => {
        const rowRender = await Promise.all(
          data.map(async (row) => {
            try {
              const generateStatus =
                row.status == "open" ? "Hoạt động" : "Đã đóng cửa";
              const provinceName = await getProvince(row.location as string[]);
              return {
                name: <p className="">{row.name}</p>,
                detail: (
                  <div>
                    <Text fz="sm">{row.detailLocation}</Text>
                    <Text fz="sm">{provinceName}</Text>
                    <Text fz="sm">{row.hotline}</Text>
                  </div>
                ),
                image: (
                  <div>
                    <Image radius="md" w={150} src={`${row.image}`} />
                  </div>
                ),
                staff: (
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold">{row.User?.fullName}</p>
                    <p className="text-xs">{row.User?.email}</p>
                    <p className=" text-xs">{row.User?.phone}</p>
                  </div>
                ),
                status: (
                  <Badge
                    color={`${row.status == "open" ? "violet" : "red"}`}
                    variant="light"
                    size="md"
                    radius="md"
                  >
                    {generateStatus}
                  </Badge>
                ),
                action: (
                  <Group gap={5} justify="center">
                    <ActionIcon
                      onClick={() => openModalUpdate(row)}
                      variant="light"
                      radius={"md"}
                    >
                      <IconPencil
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                    <ActionIcon variant="light" color="red" radius={"md"}>
                      <IconTrash
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </Group>
                ),
              };
            } catch (error) {
              console.log(error);
              return null;
            }
          })
        );

        setRows(rowRender);

        setHeaders([
          {
            label: "Tên rạp phim",
            value: "name",
            isSortable: true,
          },
          {
            label: "Thông tin cụ thể",
            value: "detail",
            isSortable: false,
          },

          {
            label: "Hình ảnh",
            value: "image",
            isSortable: false,
          },

          {
            label: "Nhân viên quản lý",
            value: "staff",
            isSortable: false,
          },
          {
            label: "Trạng thái",
            value: "status",
            isSortable: false,
          },
          {
            label: "#",
            value: "action",
            isSortable: false,
          },
        ]);
      };

      fetchData();
    }
  }, [data]);

  const getLimitCinemas = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await cinemaServices.getLimitCinemas(1, 100);

      setIsLoading(false);
      if (res.statusCode === 0) {
        // setData(res.data);

        setData(res.data);
        // const totalRows = Math.ceil(res.rows / 100);

        // setTotalPagination(totalRows);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setIsLoading]);

  useEffect(() => {
    getLimitCinemas();
  }, [getLimitCinemas]);

  return (
    <div>
      <div className="flex justify-between my-5">
        <div className="flex gap-6">
          <Select
            size="xs"
            label="Thành phố/ Tỉnh"
            data={selectData.city}
            onChange={(e) => {
              setQueryData({
                district: null as unknown as undefined,
                city: e as unknown as undefined,
              });
            }}
            value={queryData.city}
            radius={"md"}
            clearable
            searchable
            nothingFoundMessage="Không tìm thấy dữ liệu"
            placeholder="Chọn thành phố/ tỉnh"
          />

          <Select
            size="xs"
            label="Quận/ Huyện"
            radius={"md"}
            clearable
            searchable
            placeholder="Chọn quận/ huyện"
            onChange={(e) => {
              setQueryData({
                district: e as unknown as undefined,
              });
            }}
            value={queryData.district}
            data={selectData.district}
            nothingFoundMessage="Không tìm thấy dữ liệu"
          />

          <TextInput
            size="xs"
            label="Tìm kiếm"
            radius={"md"}
            value={queryData.name}
            onChange={(e) => setQueryData({ name: e.target.value })}
            placeholder="Tìm kiếm tên rạp"
            rightSection={<IconSearch size={18}></IconSearch>}
          />
        </div>

        <div className="flex items-end">
          <Button size="xs" radius={"md"} onClick={openModalAdd}>
            Thêm rạp phim mới
          </Button>
        </div>
      </div>

      <TableFilter headers={headers}></TableFilter>
    </div>
  );
}

export default AdminCinemaPage;
