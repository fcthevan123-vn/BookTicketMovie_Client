import {
  Font,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { BookingTypeTS, SeatStatus, UserTS } from "../../../types";
import moment from "moment";

// Register font
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

type Props = {
  ticketData: BookingTypeTS;
  userData: UserTS;
};

const UserTicketPdf = ({ ticketData, userData }: Props) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header} fixed>
        Show Booking
      </Text>
      <View style={styles.divider}></View>

      <View style={styles.section}>
        <Text style={styles.title}>Chi tiết vé:</Text>
        <Text style={styles.text}>
          Giờ chiếu: {moment(ticketData.Show.startTime).format("LLL")} -{" "}
          {moment(ticketData.Show.endTime).format("LLL")}
        </Text>
        <Text style={styles.text}>Ngày chiếu: {ticketData.Show.date}</Text>
        <span style={{ marginBottom: "10px" }}></span>

        {ticketData.SeatStatuses.map((item: SeatStatus, index) => {
          return (
            <div style={styles.seatBox} key={index}>
              <span style={styles.dividerVertical}></span>
              <div>
                <Text style={styles.textSeat}>Ghế ngồi: {item.Seat.name}</Text>
                <Text style={styles.textSeat}>
                  Loại ghế: {item.Seat.SeatType.name}
                </Text>
                <Text style={styles.textSeat}>
                  Giá tiền: {item.Seat.SeatType.price} VND
                </Text>
              </div>
            </div>
          );
        })}

        <Text style={styles.text}>
          Tổng giá tiền: {ticketData.totalPrice} VND
        </Text>
        <Text style={styles.text}>Trạng thái vé: {ticketData.status}</Text>
        <Text style={styles.text}>
          Phước thức thanh toán:{" "}
          {ticketData.paymentMethod == "direct" ? "Trực tiếp" : "Online"}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Thông tin phim: </Text>
        <Text style={styles.text}>
          Tên phim: {ticketData.Show.Movie?.title}
        </Text>
        <Text style={styles.text}>
          Thể loại: {ticketData.Show.Movie?.genre.join(" - ")}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Thông tin khách hàng:</Text>
        <Text style={styles.text}>Họ và tên: {userData.fullName}</Text>
        <Text style={styles.text}>Số điện thoại: {userData.phone}</Text>
        <Text style={styles.text}>Email: {userData.email}</Text>
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: "Roboto",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    textDecoration: "underline",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  textSeat: {
    fontSize: 12,
    marginBottom: 2,
    marginLeft: 10,
  },
  textSeatSub: {
    fontSize: 10,
    marginBottom: 2,
    opacity: 0.8,
    marginLeft: 10,
  },
  seatBox: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginLeft: 50,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "black",
    opacity: 0.5,
    width: "100%",
    marginBottom: 20,
  },
  dividerVertical: {
    height: "100%",
    backgroundColor: "black",
    opacity: 0.5,
    width: 1,
  },
});

export default UserTicketPdf;
