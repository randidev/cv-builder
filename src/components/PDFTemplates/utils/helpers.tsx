import { View, Text, Image } from "@react-pdf/renderer";

const convertStringToComponents = (str: string, styles: any) => {
  const paragraphs = str.trim().split("\n\n"); // Split paragraphs by double newlines
  const components = paragraphs.map((paragraph, index) => {
    if (paragraph.trim().startsWith("-")) {
      const items = paragraph.split(/(?=- )/g).map((item, index) => {
        const trimmedItem = item.trim().replace(/^-\s*/, ""); // Remove leading dash and whitespace
        return (
          <View key={index} style={styles.listItem}>
            <Text style={{ ...styles.text }}>•</Text>
            <Text style={{ ...styles.text, textAlign: "left", width: "100%" }}>
              {trimmedItem}
            </Text>
          </View>
        );
      });
      return <View key={index}>{items}</View>;
    } else {
      return (
        <Text key={index} style={styles.text}>
          {paragraph.trim()}
        </Text>
      );
    }
  });
  return components;
};

const renderWatermark = (watermark: string, styles: any) =>
  watermark && watermark !== "" ? (
    <View style={styles.watermark}>
      <Image
        src={watermark}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </View>
  ) : null;

export { convertStringToComponents, renderWatermark };
