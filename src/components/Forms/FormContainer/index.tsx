import { Button, SimpleGrid } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React from "react";
import { Fragment } from "react";
import * as Yup from "yup";
type Props = {
  columns: number;
  elements: {
    controlled: boolean;
    name: string;
    inputForm: React.ReactElement;
    controlledProps?: Record<string, unknown>;
  }[];
  initialValueForm: Record<string, unknown>;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
};

function FormContainer({
  columns,
  elements,
  initialValueForm,
  validationSchema,
}: Props) {
  const form = useForm({
    validate: yupResolver(validationSchema),
    initialValues: initialValueForm,
  });

  const columnsRender = elements.map((e, index) => {
    return (
      <Fragment key={index}>
        {e.controlled
          ? React.cloneElement(e.inputForm, ...[e.controlledProps])
          : React.cloneElement(e.inputForm, ...[form.getInputProps(e.name)])}
      </Fragment>
    );
  });

  return (
    <div className="mt-5">
      <form action="" onSubmit={form.onSubmit((values) => console.log(values))}>
        <SimpleGrid cols={columns}>{columnsRender}</SimpleGrid>
        <Button type="submit" mt="sm">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default FormContainer;
