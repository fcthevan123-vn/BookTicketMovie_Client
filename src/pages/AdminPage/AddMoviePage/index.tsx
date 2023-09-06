import { Button, TextInput, Textarea, MultiSelect } from "@mantine/core";
import { useState } from "react";
import { UploadImage } from "../../../components/UploadImage";
import { DateInput } from "@mantine/dates";

const dataGenreMovie = [
  "Action",
  "Comedy",
  "Drama",
  "Science Fiction",
  "Fantasy",
  "Horror",
  "Romance",
  "Adventure",
  "Thriller",
  "Animation",
  "Mystery",
  "Crime",
  "Documentary",
  "Western",
  "Musical",
  "Historical",
  "Biography",
  "War",
  "Family",
  "Sports",
  "Superhero",
  "Music",
  "Holiday",
  "Film Noir",
  "Teen",
  "Surreal",
  "Mockumentary",
  "Experimental",
  "Silent",
  "Parody",
];

const dataSubtitle = ["Vietnamese", "English"];

const dataDubbing = ["Vietnamese", "English"];

type Props = {};

const AddMoviePage = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, onSearchChange] = useState("");

  return (
    <div className="h-full">
      <div className="flex justify-center p-5 gap-8">
        <div className="top w-1/2 ">
          <p className="text-xl font-medium text-sky-500">Add a new movie</p>
          <div>
            <div className="flex flex-col gap-3">
              <TextInput
                placeholder="Title"
                label="Title"
                radius="md"
                withAsterisk

                // {...form.getInputProps("oldPassword")}
              />

              <Textarea
                label="Description"
                placeholder="Description"
                autosize
                withAsterisk
                radius="md"
                minRows={2}
                maxRows={4}
              />
              <TextInput
                placeholder="Director"
                label="Director"
                radius="md"
                withAsterisk

                // {...form.getInputProps("oldPassword")}
              />

              <TextInput
                placeholder="Actors"
                label="Actors"
                radius="md"
                withAsterisk

                // {...form.getInputProps("oldPassword")}
              />

              <div className="flex gap-2">
                <TextInput
                  className="w-1/2"
                  placeholder="Language"
                  label="Language"
                  radius="md"
                  withAsterisk
                />

                <TextInput
                  className="w-1/2"
                  placeholder="Country"
                  label="Country"
                  radius="md"
                  withAsterisk
                />
              </div>
              <div className="flex gap-2">
                <MultiSelect
                  data={dataSubtitle}
                  className="w-1/2"
                  label="Subtitle"
                  placeholder="Pick subtitle"
                  clearable
                  radius="md"
                  maxSelectedValues={1}
                />

                <MultiSelect
                  data={dataDubbing}
                  className="w-1/2"
                  label="Dubbing"
                  placeholder="Pick dubbing"
                  clearable
                  radius="md"
                  maxSelectedValues={1}
                />
              </div>

              <DateInput
                minDate={new Date()}
                label="Release Date"
                placeholder="Release Date"
                withAsterisk
                clearable
                radius="md"
              />

              <MultiSelect
                data={dataGenreMovie}
                label="Genre"
                placeholder="Pick genre of the movie"
                searchable
                searchValue={searchValue}
                onSearchChange={onSearchChange}
                nothingFound="Nothing found"
                clearable
                radius="md"
                maxSelectedValues={3}
              />

              <TextInput
                placeholder="Duration"
                label="Duration"
                radius="md"
                withAsterisk
                type="number"
                rightSection={
                  <p className="text-xs mb-0 bg-gray-200 p-1 mr-4 rounded-md">
                    Mins
                  </p>
                }
              />

              <TextInput
                placeholder="Age Require"
                label="Age Require"
                radius="md"
                withAsterisk
                type="number"
              />
            </div>
            <div className="flex gap-2 mt-5">
              <Button loading={isLoading} radius="md" w={"50%"} type="submit">
                Save
              </Button>
              <Button
                radius="md"
                w={"50%"}
                type="reset"
                loading={isLoading}
                //   onClick={() => form.reset()}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
        <div className="w-2/3 flex justify-center items-center">
          <div className="w-full">
            <UploadImage></UploadImage>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMoviePage;
