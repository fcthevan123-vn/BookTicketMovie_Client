import {
  Title,
  Text,
  Button,
  Container,
  Image,
  Group,
  List,
  ThemeIcon,
  rem,
  useMantineTheme,
  Card,
  Badge,
  SimpleGrid,
  Accordion,
  Grid,
} from "@mantine/core";

import classes from "./AboutPage.module.css";
import { Link } from "react-router-dom";
import question from "../../assets/Image/question.svg";
import movie from "../../assets/Image/movie.svg";

import {
  IconGauge,
  IconUser,
  IconCookie,
  IconCheck,
} from "@tabler/icons-react";
import FooterComponent from "../../components/FooterComponent";

const mockdata = [
  {
    title: "Hiệu suất cực cao",
    description:
      "Hệ thống của chúng tôi được tối ưu hóa để đảm bảo bạn có thể truy cập và đặt vé một cách nhanh chóng, mà không gặp phải sự gián đoạn.",
    icon: IconGauge,
  },
  {
    title: "Đảm bảo quyền riêng tư",
    description:
      "Hệ thống bảo mật hàng đầu của chúng tôi đảm bảo rằng mọi thông tin cá nhân của bạn được bảo vệ an toàn và không bao giờ được chia sẻ với bất kỳ bên thứ ba nào",
    icon: IconUser,
  },
  {
    title: "Thông tin minh bạch",
    description:
      "Chúng tôi tự hào về sự minh bạch trong mọi giao dịch. ShowBooking cam kết cung cấp thông tin rõ ràng và chi tiết về các suất chiếu, giá vé và các ưu đãi đặc biệt.",
    icon: IconCookie,
  },
];

export default function AboutPage() {
  const theme = useMantineTheme();

  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.blue[6]}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <div>
      <Container size="xl">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Một <span className={classes.highlight}>Website</span> Đặt vé{" "}
              <br /> đỉnh cao
            </Title>
            <Text c="dimmed" mt="md">
              Thưởng thức sự thuận tiện khi đặt vé xem phim trực tuyến với
              ShowBooking - Phù hợp với mọi phong cách.
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Nhanh chóng và thuận tiện</b> – Giúp bạn đặt vé chỉ dưới hai
                phút mà không mất quá nhiều thao tác.
              </List.Item>
              <List.Item>
                <b>Bảo mật thông tin</b> – Chúng tôi cam kết bảo mật hoàn toàn
                thông tin của khách hàng.
              </List.Item>
              <List.Item>
                <b>Phản hồi nhanh chóng</b> – Bạn chỉ việc hỏi, chúng tôi sẽ trả
                lời một cách nhanh nhất có thể.
              </List.Item>
            </List>

            <Group mt={30}>
              <Link to={"/register"}>
                <Button radius="md" size="sm" className={classes.control}>
                  Đăng nhập
                </Button>
              </Link>
              <Link to={"/"}>
                <Button
                  variant="default"
                  radius="md"
                  size="sm"
                  className={classes.control}
                >
                  Trang chủ
                </Button>
              </Link>
            </Group>
          </div>
          <Image src={movie} className={classes.image} />
        </div>
      </Container>
      <Container size="xl" py="xl">
        <Group justify="center">
          <Badge variant="filled" size="xl">
            Trang website đặt vé xem phim tốt nhất
          </Badge>
        </Group>

        <Title order={2} className={classes.title} ta="center" mt="sm">
          Tích hợp mọi thứ bạn cần chỉ trong một hệ thống
        </Title>

        <Text c="dimmed" className={classes.description} ta="center" mt="md">
          Khám phá ngay khi mọi thứ đã sẵn sàng để phục vụ bạn. Hãy chọn những
          bộ phim cho riêng bản thân mình.
        </Text>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
          {features}
        </SimpleGrid>
      </Container>

      <Container size={"xl"} my={"xl"}>
        <section className="bg-white ">
          <div className="container px-6 py-12 mx-auto">
            <div>
              <p className="text-xl text-sky-500 font-bold ">Liên hệ</p>

              <h1 className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl ">
                Chúng tôi muốn nghe ý kiến từ bạn.
              </h1>

              <p className="mt-3 text-gray-500 ">
                Đội ngũ thân thiện của chúng tôi luôn ở đây để trò chuyện.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <div className="p-4 rounded-lg bg-blue-50 md:p-6 ">
                <span className="inline-block p-3 text-blue-500 rounded-lg bg-blue-100/80 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </span>

                <h2 className="mt-4 text-base font-medium text-gray-800 ">
                  Liên hệ để đặt vé
                </h2>
                <p className="mt-2 text-sm text-gray-500 ">
                  Nói chuyện với đội ngũ thân thiện của chúng tôi.
                </p>
                <p className="mt-2 text-sm text-blue-500 ">
                  fcthevan123@gmail.com
                </p>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 md:p-6 ">
                <span className="inline-block p-3 text-blue-500 rounded-lg bg-blue-100/80 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </span>

                <h2 className="mt-4 text-base font-medium text-gray-800 ">
                  Liên hệ nhờ trợ giúp
                </h2>
                <p className="mt-2 text-sm text-gray-500 ">
                  Chúng tôi luôn sẵn sàng để giúp đỡ bạn.
                </p>
                <p className="mt-2 text-sm text-blue-500 ">Bắt đầu ngay</p>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 md:p-6 ">
                <span className="inline-block p-3 text-blue-500 rounded-lg bg-blue-100/80 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </span>

                <h2 className="mt-4 text-base font-medium text-gray-800 ">
                  Tới với chúng tôi
                </h2>
                <p className="mt-2 text-sm text-gray-500 ">
                  Hãy đến thăm trụ sở văn phòng của chúng tôi.
                </p>
                <p className="mt-2 text-sm text-blue-500 ">
                  Khu II, Đ. 3 Tháng 2, Xuân Khánh, Ninh Kiều.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 md:p-6 ">
                <span className="inline-block p-3 text-blue-500 rounded-lg bg-blue-100/80 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </span>

                <h2 className="mt-4 text-base font-medium text-gray-800 ">
                  Gọi cho chúng tôi
                </h2>
                <p className="mt-2 text-sm text-gray-500 ">
                  Thứ Hai - Thứ Sáu từ 8 đến 17 giờ.
                </p>
                <p className="mt-2 text-sm text-blue-500 ">0399619422</p>
              </div>
            </div>
          </div>
        </section>
      </Container>

      <Container size="xl" mt={110}>
        <Grid id="faq-grid" gutter={50}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image src={question} alt="Frequently Asked Questions" />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title order={2} ta="left" className={classes.title2}>
              Các câu hỏi thường gặp
            </Title>

            <Accordion
              chevronPosition="right"
              defaultValue="reset-password"
              variant="separated"
            >
              <Accordion.Item className={classes.item} value="reset-password">
                <Accordion.Control>
                  Làm cách nào tôi có thể đổi mật khẩu của mình?
                </Accordion.Control>
                <Accordion.Panel>
                  Bạn vào trang cá nhân của mình và chọn mục đổi mật khẩu. Nhớ
                  điền đúng thông tin chúng tôi có yêu cầu trong đó.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="another-account">
                <Accordion.Control>
                  Tôi có thể tạo thêm một tài khoản đó không?
                </Accordion.Control>
                <Accordion.Panel>
                  Bạn có thể tạo nhiều tài khoản nhưng với cam kết là bạn sử
                  dụng nó đúng cách.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="newsletter">
                <Accordion.Control>
                  Làm cách nào tôi có thể đăng ký nhận bản tin hàng tháng?
                </Accordion.Control>
                <Accordion.Panel>
                  Hãy đăng ký trở thành thành viên của chúng tôi để nhận những
                  thông tin mới hàng tháng.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="credit-card">
                <Accordion.Control>
                  Bạn có lưu trữ thông tin cá nhân của tôi một cách an toàn
                  không?
                </Accordion.Control>
                <Accordion.Panel>
                  Chúng tôi cam kết bảo vệ mọi thông tin của khách hàng, điều
                  này là mục tiêu hàng đầu của hệ thống.
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Grid.Col>
        </Grid>
      </Container>

      <FooterComponent></FooterComponent>
    </div>
  );
}
