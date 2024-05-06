import {
  Font,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import moment from "moment";
import { BookingTypeTS, SeatStatus, UserTS } from "../../../types";

// Đăng ký font Roboto
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: 600,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
      fontWeight: 500,
    },
  ],
});

type Props = {
  ticketData: BookingTypeTS;
  userData: UserTS;
};

const UserTicketPdf = ({ ticketData, userData }: Props) => (
  <Document>
    <Page style={styles.page}>
      {/* Tiêu đề */}
      <Text style={styles.header} fixed>
        VÉ ĐẶT CHỖ
      </Text>

      <View style={styles.divider}></View>

      <View style={styles.flexBetween}>
        <View style={styles.colNameTop}>
          <Text style={styles.title}>Mã đặt vé</Text>
          <Text style={styles.text}>{ticketData.id}</Text>
        </View>

        <View style={styles.colNameTop}>
          <Text style={styles.title}>Ngày đặt</Text>
          <Text style={styles.text}>
            {moment(ticketData.createdAt).format("DD/MM/YYYY")}
          </Text>
        </View>
      </View>

      <View style={styles.dividerHalf}></View>

      <View style={styles.flexBetween}>
        <View style={styles.colName}>
          <Text style={styles.title}>Tên phim</Text>
          <Text style={styles.text}>{ticketData.Show.Movie?.title}</Text>
        </View>

        <View style={styles.colName}>
          <Text style={styles.title}>Thể loại</Text>
          <Text style={styles.text}>
            {ticketData.Show.Movie?.genre.join(" - ")}
          </Text>
        </View>

        <View style={styles.colName}>
          <Text style={styles.title}>Độ tuổi yêu cầu</Text>
          <Text style={styles.text}>{ticketData.Show.Movie?.ageRequire}</Text>
        </View>
      </View>

      <View style={styles.dividerHalf}></View>

      {/* Phần thông tin khách hàng */}
      {/* <View style={styles.section}>
        <Text style={styles.title}>THÔNG TIN KHÁCH HÀNG</Text>
        <Text style={styles.text}>Họ và tên: {userData.fullName}</Text>
        <Text style={styles.text}>Số điện thoại: {userData.phone}</Text>
        <Text style={styles.text}>Email: {userData.email}</Text>
      </View> */}

      <View style={styles.flexBetween}>
        <View style={styles.colName}>
          <Text style={styles.title}>Họ Và Tên</Text>
          <Text style={styles.text}>{userData.fullName}</Text>
        </View>

        <View style={styles.colName}>
          <Text style={styles.title}>Số điện thoại</Text>
          <Text style={styles.text}>{userData.phone}</Text>
        </View>

        <View style={styles.colName}>
          <Text style={styles.title}>Email</Text>
          <Text style={styles.text}>{userData.email}</Text>
        </View>
      </View>

      <View style={styles.dividerHalf}></View>

      <View style={styles.flexBetween}>
        <View style={styles.colName}>
          <Text style={styles.title}>Thời gian chiếu</Text>
          <Text style={styles.text}>
            {moment(ticketData.Show.startTime).format("HH:mm")} {" - "}
            {moment(ticketData.Show.endTime).format("HH:mm")} {" | "}
            {moment(ticketData.Show.startTime).format("DD/MM")}
          </Text>
        </View>

        <View style={styles.colName}>
          <Text style={styles.title}>Trạng thái vé</Text>
          <Text style={styles.text}>{ticketData.status}</Text>
        </View>

        <View style={styles.colName}>
          <Text style={styles.title}>Thanh toán qua</Text>
          <Text style={styles.text}>VN Pay</Text>
        </View>
      </View>

      {/* Danh sách ghế đặt */}
      <View style={styles.seatContainer}>
        {ticketData.SeatStatuses.map((item: SeatStatus, index) => (
          <View style={styles.seatBox} key={index}>
            <View>
              <Text style={styles.title}>Ghế: {item.Seat.name}</Text>
              <Text style={styles.textSeat}>{item.Seat.SeatType.name}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.colName}>
        <Text style={styles.title}>Tổng giá tiền</Text>
        <Text style={styles.text}>
          {ticketData.totalPrice.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </Text>
      </View>

      <View style={styles.divider}></View>
      <Text style={{ fontSize: 12, textAlign: "center", margin: 10 }}>
        Quý khách lưu ý đến đúng thời gian đặt vé. ShowBooking xin cảm ơn quý
        khách đã sử dụng dịch vụ!
      </Text>
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
  flexBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "Roboto",
  },
  colName: {
    display: "flex",
    width: "28%",
    gap: "5px",
    flexDirection: "column",
    fontFamily: "Roboto",
  },
  colNameTop: {
    display: "flex",
    gap: "5px",
    flexDirection: "column",
    fontFamily: "Roboto",
  },
  header: {
    fontSize: 24,
    color: "#845EF7",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "30px",
    // marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
    // fontFamily: "Roboto",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  textSeat: {
    fontSize: 12,
    marginBottom: 2,
  },

  seatBox: {
    width: 90,
    textAlign: "center",
    borderRadius: 6,
    backgroundColor: "#EEEEEE",
    padding: 4,
    border: "1px solid #DDE6ED",
  },
  seatContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
    margin: "10px 0",
  },
  divider: {
    height: 1,
    backgroundColor: "#cbd0d9",
    marginTop: 10,
    width: "100%",
    marginBottom: 10,
  },
  dividerHalf: {
    height: 1,
    backgroundColor: "#cbd0d9",
    width: "85%",
    margin: "15px auto",
  },
  dividerVertical: {
    height: "100%",
    backgroundColor: "#845EF7",
    width: 4,
    marginRight: 7,
  },
});

export default UserTicketPdf;
