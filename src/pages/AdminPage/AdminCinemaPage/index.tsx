import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useCallback, useEffect, useState } from "react";
import FormAddCinema from "../../../components/Forms/FormCinema/FormAddCinema";
import { useTableCustom } from "../../../components/Provider/TableFilterProvider";
import { cinemaServices } from "../../../services";
import TableFilter from "../../../components/TableFilter";
import apiProvinceVietNam from "../../../untils/apiProvinceVietNam";

type cinemaProps = {
  name: string;
  location: string[];
  detailLocation: string;
};

// type cinemaRows = {
//   name: React.ReactNode;
//   location: React.ReactNode;
//   detailLocation: React.ReactNode;
// };

// type Props = {};

function AdminCinemaPage() {
  const [data, setData] = useState<cinemaProps[]>();

  const {
    setRows,
    headers,
    setHeaders,
    limitRow,
    setIsLoading,
    activePage,
    dataGloBal,
    currentSearchValue,
    setDataGlobal,
    setTotalPagination,
  } = useTableCustom();

  const openModalAdd = () => {
    modals.open({
      title: (
        <Text fw={500} size="lg" c={"blue"}>
          Tạo rạp phim mới
        </Text>
      ),
      size: "lg",
      children: <FormAddCinema getAllCinema={getLimitCinemas}></FormAddCinema>,
      radius: "md",
      lockScroll: false,
    });
  };

  async function getProvince(codes: string[]) {
    setIsLoading(true);
    try {
      let resultProvince = "";
      const resWard = await apiProvinceVietNam.callApiCity(`w/${codes[2]}`);
      const resDistrict = await apiProvinceVietNam.callApiCity(`d/${codes[1]}`);
      const resCity = await apiProvinceVietNam.callApiCity(`p/${codes[0]}`);
      setIsLoading(false);

      resultProvince =
        resWard.name + " - " + resDistrict.name + " - " + resCity.name;
      return resultProvince;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (dataGloBal) {
      const fetchData = async () => {
        const rowRender = await Promise.all(
          dataGloBal.map(async (row) => {
            try {
              const provinceName = await getProvince(row.location);
              return {
                name: <Text fz="sm">{row.name}</Text>,
                detailLocation: <Text fz="sm">{row.detailLocation}</Text>,
                location: <Text fz="sm">{provinceName}</Text>,
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
            label: "Địa chỉ cụ thể",
            value: "detailLocation",
            isSortable: false,
          },
          {
            label: "Địa chỉ",
            value: "location",
            isSortable: false,
          },
        ]);
      };

      fetchData();
    }
  }, [dataGloBal]);

  const getLimitCinemas = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await cinemaServices.getLimitCinemas(activePage, limitRow);

      setIsLoading(false);
      if (res.statusCode === 0) {
        // setData(res.data);

        setDataGlobal(res.data);
        const totalRows = Math.ceil(res.rows / limitRow);

        setTotalPagination(totalRows);
      }
    } catch (error) {
      console.log(error);
    }
  }, [activePage, limitRow, setIsLoading, setTotalPagination]);

  useEffect(() => {
    getLimitCinemas();
  }, [getLimitCinemas]);

  useEffect(() => {
    if (!currentSearchValue) {
      getLimitCinemas();
    }
  }, [currentSearchValue]);

  return (
    <div>
      <div className="flex justify-end mb-3">
        <Button size="xs" radius={"md"} onClick={openModalAdd}>
          Thêm rạp phim mới
        </Button>
      </div>

      <TableFilter headers={headers}></TableFilter>
    </div>
  );
}

export default AdminCinemaPage;
