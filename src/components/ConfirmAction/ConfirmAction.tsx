import { Text, TextInput } from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
  setDisable: React.Dispatch<React.SetStateAction<boolean>>;
  textCheck: string;
};

function ConfirmAction({ setDisable, textCheck }: Props) {
  const [value, setValues] = useState("");

  const checkConfirm = useCallback(
    (value: string, textCheck: string) => {
      if (value !== textCheck) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    },
    [setDisable]
  );

  useEffect(() => {
    checkConfirm(value, textCheck);
  }, [checkConfirm, textCheck, value]);

  return (
    <div>
      <Text
        mt={"xs"}
        size="xs"
        fw={700}
      >{`Nhập "${textCheck}" để xác nhận thực hiện hành động"`}</Text>
      <TextInput
        withAsterisk
        radius={"md"}
        value={value}
        onPaste={(e) => {
          e.preventDefault();
          return false;
        }}
        onChange={(e) => setValues(e.target.value)}
        placeholder="Nhập đúng chữ yêu cầu"
      />
    </div>
  );
}

export default ConfirmAction;
