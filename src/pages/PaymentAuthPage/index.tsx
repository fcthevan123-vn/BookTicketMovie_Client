import { ReactElement, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import QueryString from "qs";
import { Button, Card, Group, Paper, Text, ThemeIcon } from "@mantine/core";
import { IconCheck, IconExclamationCircle } from "@tabler/icons-react";

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
  const [paymentInfo, setPaymentInfo] = useState<ResponseInfoTs>();

  const navigate = useNavigate();

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

  useEffect(() => {
    if (vnp_ResponseCode == "00") {
      setPaymentInfo({
        title: "Tiến hành tạo vé",
        message:
          "Hệ thống đang tạo vé cho bạn, vui lòng đợi giây lát. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.",
        icon: <IconCheck style={{ width: "70%", height: "70%" }} />,
        action: (
          <Button mt="md" radius="md" disabled>
            Xem vé của bạn
          </Button>
        ),
        label: "Thanh toán thành công",
        status: "Thành công",
        statusCode: "00",
      });
    } else {
      setPaymentInfo({
        title: "Thanh toán lỗi",
        message:
          "Có vẻ như bạn đã gặp lỗi trong quá trình thanh toán hoặc giao dịch này đã bị huỷ.",
        icon: <IconExclamationCircle style={{ width: "70%", height: "70%" }} />,
        action: (
          <Button mt="md" radius="md">
            Trở về trang chủ
          </Button>
        ),
        label: "Thanh toán thất bại",
        status: "Thất bại",
        statusCode: "07",
      });
    }
  }, [vnp_ResponseCode]);

  // useEffect(() => {
  //   if (vnp_ResponseCode === "00") {
  //     setPaymentInfo
  //   }
  // }, [navigate, vnp_ResponseCode]);

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-violet-200 to-pink-200">
      <div className="flex justify-center h-full items-center">
        {paymentInfo && vnp_ResponseCode ? (
          <CardInfoPayMent data={paymentInfo}></CardInfoPayMent>
        ) : (
          <Paper shadow="xs" radius="md" p="xl">
            <div>
              <p className="text-2xl font-semibold">Có lỗi đã xảy ra</p>

              <p className="mt-3">
                Có vẻ như đã có lỗi xảy ra vui lòng liên hệ với quản trị viên
                thông qua email: fcthevan123@gmail.com
              </p>
              <p className="">Chúng tôi vô cùng xin lỗi vì sự bất tiện này.</p>
              <Button className="mt-3" radius={"md"} component="a" href="/">
                Trở về trang chủ
              </Button>
            </div>
          </Paper>
        )}
      </div>
    </div>
  );
}

export default PaymentAuthPage;
