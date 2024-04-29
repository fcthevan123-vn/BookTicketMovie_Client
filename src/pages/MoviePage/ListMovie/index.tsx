import { Grid, SimpleGrid } from "@mantine/core";
import { DataTableMoviesProps } from "../../../components/Provider/MovieProvider/MovieProvider";
import MovieSmallPreview from "../../../components/MovieSmallPreview";
import { AnimatePresence, motion } from "framer-motion";
type Props = {
  dataMovies: DataTableMoviesProps[];
};

function ListMovie({ dataMovies }: Props) {
  return (
    <div className="mt-4 relative">
      <Grid>
        <Grid.Col span={12}>
          <SimpleGrid cols={4} spacing={"xl"}>
            <AnimatePresence mode="popLayout">
              {dataMovies.map((movie, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 60, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    // delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    duration: 1,
                    delay: index * 0.1,
                  }}
                  exit={{ opacity: 0, y: 60, scale: 0.8 }}
                  viewport={{ once: true }}
                  // className="col-span-12 md:col-span-6 lg:col-span-3"
                  key={movie.id}
                >
                  <MovieSmallPreview
                    key={index}
                    dataMovie={movie}
                  ></MovieSmallPreview>
                </motion.div>
              ))}
            </AnimatePresence>
          </SimpleGrid>
        </Grid.Col>
      </Grid>

      {/* <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.5,
              }}
              exit={{ opacity: 0, x: 60 }}
              className="p-5 text-xl font-medium text-center min-h-screen"
            >
              <Chip
                color="warning"
                variant="flat"
                startContent={<NotificationIcon size={20} />}
              >
                Không tìm thấy cơ sở y tế phù hợp!
              </Chip>
            </motion.div>
          </AnimatePresence> */}
    </div>
  );
}

export default ListMovie;
