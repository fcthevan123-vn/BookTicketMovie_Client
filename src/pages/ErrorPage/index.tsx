import {
  Title,
  Text,
  Button,
  Container,
  SimpleGrid,
  Image,
} from "@mantine/core";

import classes from "./ErrorPage.module.css";
import { Link } from "react-router-dom";
import errorImage from "../../assets/Image/errorImage.svg";

export default function ErrorPage() {
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={errorImage} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Có gì đó không ổn !!!</Title>
          <Text c="dimmed" size="lg">
            Bạn đang truy cập vào một trang bị lỗi hoặc bạn không có quyền truy
            cập vào trang này. Chúng tôi sẽ cố gắng khắc phục nếu như bị lỗi.
            Hãy nhất nút bên dưới để trở về trang chủ.
          </Text>
          <Link to="/">
            <Button
              variant="outline"
              size="md"
              mt="xl"
              radius={"lg"}
              className={classes.control}
            >
              Trở về trang chủ
            </Button>
          </Link>
        </div>
        <Image src={errorImage} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}
