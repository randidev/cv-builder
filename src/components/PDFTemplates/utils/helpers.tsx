import { View, Text } from "@react-pdf/renderer";

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

export { convertStringToComponents };
