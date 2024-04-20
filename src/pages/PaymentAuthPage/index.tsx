import { ReactElement, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import QueryString from "qs";
import { Button, Card, Group, Text, ThemeIcon } from "@mantine/core";
import { IconCheck, IconExclamationCircle } from "@tabler/icons-react";
import { paymentServices } from "../../services";
import { ErrToast } from "../../components/AllToast/NormalToast";
import { useAuthenticate } from "../../hooks";

type ResponseInfoTs = {
  label: string;
  title: string;
  message: string;
  status: string;
  statusCode: string;
  icon: ReactElement;
  action: ReactElement;
};

type CardInfoPayMentProps = {
  data: ResponseInfoTs;
};

function CardInfoPayMent({ data }: CardInfoPayMentProps) {
  return (
    <Card shadow="sm" padding="lg" radius="lg" withBorder w={500}>
      <Card.Section>
        <div className="flex justify-center items-center py-5 ">
          <ThemeIcon size="60" radius={"lg"}>
            {data.icon}
          </ThemeIcon>
          <p className="text-lg font-semibold ms-3">{data.label}</p>
        </div>
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{data.title}</Text>
        <Button color="pink" size="compact-sm" radius={"md"}>
          {data.status}
        </Button>
      </Group>

      <Text size="sm" c="dimmed">
        {data.message}
      </Text>

      {data.action}
    </Card>
  );
}

function PaymentAuthPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState<ResponseInfoTs>({
    title: "Thanh toán lỗi",
    message:
      "Có vẻ như bạn đã gặp lỗi trong quá trình thanh toán hoặc giao dịch này đã bị huỷ.",
    icon: <IconExclamationCircle style={{ width: "70%", height: "70%" }} />,
    action: (
      <Button mt="md" radius="md" component="a" href="/">
        Trở về trang chủ
      </Button>
    ),
    label: "Thanh toán thất bại",
    status: "Thất bại",
    statusCode: "07",
  });

  const [, , dataUser] = useAuthenticate();

  const vnp_TmnCode = searchParams.get("vnp_TmnCode");
  const vnp_Amount = searchParams.get("vnp_Amount");
  const vnp_BankCode = searchParams.get("vnp_BankCode");
  const vnp_BankTranNo = searchParams.get("vnp_BankTranNo");
  const vnp_CardType = searchParams.get("vnp_CardType");
  const vnp_OrderInfo = searchParams.get("vnp_OrderInfo");
  const vnp_PayDate = searchParams.get("vnp_PayDate");
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
  const vnp_TransactionNo = searchParams.get("vnp_TransactionNo");
  const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");
  const vnp_TxnRef = searchParams.get("vnp_TxnRef");
  const vnp_SecureHash = searchParams.get("vnp_SecureHash");

  const signData = QueryString.stringify(
    {
      vnp_TmnCode,
      vnp_Amount,
      vnp_BankCode,
      vnp_BankTranNo,
      vnp_CardType,
      vnp_OrderInfo,
      vnp_PayDate,
      vnp_ResponseCode,
      vnp_TransactionNo,
      vnp_TransactionStatus,
      vnp_TxnRef,
      vnp_SecureHash,
    },
    { encode: false }
  );

  const returnUrl = useCallback(async () => {
    try {
      const res = await paymentServices.returnURL(signData);

      if (res.statusCode == 0) {
        setPaymentInfo({
          title: "Tạo vé thành công",
          message:
            "Hệ thống đã tạo vé cho bạn thành công. Hy vọng bạn có những phút giây trải nghiệm thật vui vẻ với dịch vụ của chúng tôi.",
          icon: <IconCheck style={{ width: "70%", height: "70%" }} />,
          action: (
            <Button
              mt="md"
              radius="md"
              component="a"
              href={`/user/${dataUser.id}/all-tickets`}
            >
              Xem vé của bạn
            </Button>
          ),
          label: "Thanh toán thành công",
          status: "Thành công",
          statusCode: "00",
        });
      }
    } catch (error) {
      console.log("error", error);

      ErrToast(error as Error, "Thanh toán thất bại");
    }
  }, [signData]);

  useEffect(() => {
    returnUrl();
  }, [returnUrl]);

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-violet-200 to-pink-200">
      <div className="flex justify-center h-full items-center">
        {paymentInfo && <CardInfoPayMent data={paymentInfo}></CardInfoPayMent>}
      </div>
    </div>
  );
}

export default PaymentAuthPage;
