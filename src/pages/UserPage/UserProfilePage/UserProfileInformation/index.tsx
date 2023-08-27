import { Divider, Grid } from "@mantine/core";
import React from "react";

type Props = {};

const UserProfileInformation = (props: Props) => {
  return (
    <div className="mx-20">
      <div className="mx-4 mb-8">
        <Grid>
          <Grid.Col span="auto">
            <p className="font-normal text-lg text-left">Personal ID</p>
          </Grid.Col>
          <Grid.Col span="auto">
            <p className=" text-left">7nnxash9213mmaX</p>
          </Grid.Col>
          <Grid.Col span="auto">
            <p className=" text-right">Edit</p>
          </Grid.Col>
        </Grid>
        <Divider color="gray.2" my="sm" />
      </div>

      <div className="mx-4 mb-8">
        <Grid>
          <Grid.Col span="auto">
            <p className="font-normal text-lg text-left">Personal ID</p>
          </Grid.Col>
          <Grid.Col span="auto">
            <p className=" text-left">7nnxash9213mmaX</p>
          </Grid.Col>
          <Grid.Col span="auto">
            <p className=" text-right">Edit</p>
          </Grid.Col>
        </Grid>
        <Divider color="gray.2" my="sm" />
      </div>

      <div className="mx-4 mb-8">
        <Grid>
          <Grid.Col span="auto">
            <p className="font-normal text-lg text-left">Personal ID</p>
          </Grid.Col>
          <Grid.Col span="auto">
            <p className=" text-left">7nnxash9213mmaX</p>
          </Grid.Col>
          <Grid.Col span="auto">
            <p className=" text-right">Edit</p>
          </Grid.Col>
        </Grid>
        <Divider color="gray.2" my="sm" />
      </div>
    </div>
  );
};

export default UserProfileInformation;
