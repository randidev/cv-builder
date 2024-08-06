import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import useAppSelector from "@/hooks/useAppSelector";
import { selectors } from "@/redux/candidate";

export default function ResumePreview() {
  const candidate = useAppSelector(selectors.candidate);

  const styles = StyleSheet.create({
    header: {
      fontSize: 12,
      textAlign: "center",
      margin: 20,
    },
    body: {
      margin: 10,
    },
    footer: {
      fontSize: 12,
      textAlign: "center",
      margin: 20,
    },
  });

  const ResumeDocument = () => (
    <Document>
      <Page>
        <View style={styles.header}>
          <Text>header</Text>
        </View>
        <View style={styles.body}>
          <Text>Name: {candidate.firstName}</Text>
          <Text>Contact: -</Text>
          <Text>Experience: -</Text>
        </View>
        <View style={styles.footer}>
          <Text>footer</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <>
      <div className="bg-dot bg-repeat bg-left-top bg-fixed">
        <div className="p-6 h-full">
          <div className="bg-white shadow-lg h-full">
            <PDFViewer width={"100%"} height={"100%"} showToolbar={false}>
              <ResumeDocument />
            </PDFViewer>
          </div>
        </div>
      </div>
    </>
  );
}
