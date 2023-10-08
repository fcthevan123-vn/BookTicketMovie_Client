import { Text, Avatar, Group } from "@mantine/core";

type Props = {};

function Comment({}: Props) {
  return (
    <div
      style={{
        borderLeft: "6px solid var(--mantine-color-orange-6)",
        padding: "0 8px",
      }}
    >
      <Group>
        <Avatar
          src={
            "https://cdn.pixabay.com/photo/2016/06/02/02/33/triangles-1430105_1280.png"
          }
          alt="Lai The Van"
          radius="xl"
        />
        <div>
          <Text size="sm" fw={500}>
            Lai The Van
          </Text>
          <Text size="xs" c="dimmed">
            10 phút trước
          </Text>
        </div>
      </Group>
      <Text pl={54} pt="sm" size="sm">
        Phần tiếp theo của bộ phim năm 1973 kể về một cô bé 12 tuổi bị một thực
        thể ma quỷ bí ẩn chiếm hữu, buộc mẹ cô phải tìm đến sự giúp đỡ của hai
        linh mục để cứu cô.
      </Text>
    </div>
  );
}

export default Comment;
