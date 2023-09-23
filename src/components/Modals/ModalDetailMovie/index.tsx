import { Modal } from "@mantine/core";
import FormEditMovie from "../../Forms/FormEditMovie";

interface RowData {
  stt?: number;
  id: string;
  title: string;
  description: string;
  directors: string[];
  actors: string[];
  language: string;
  country: string;
  subtitle: string;
  releaseDate: string;
  endDate: string;
  images: { imageName: string; imageUrl: string }[];
  genre: string[];
  duration: string;
  ageRequire: string;
  price: number;
  createdAt?: string;
  updatedAt?: string;
}

type Props = {
  opened: boolean;
  onClose: () => void;
  dataMovie: RowData;
};

const ModalDetailMovie = ({ opened, onClose, dataMovie }: Props) => {
  return (
    <div>
      <Modal
        size="xl"
        fullScreen
        styles={{
          header: {
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          },
        }}
        opened={opened}
        onClose={onClose}
        title={
          <p className="text-sky-500 font-bold text-lg">{dataMovie?.title}</p>
        }
        centered
      >
        <FormEditMovie onClose={onClose} dataMovie={dataMovie}></FormEditMovie>
      </Modal>
    </div>
  );
};

export default ModalDetailMovie;
