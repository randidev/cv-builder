import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { convertStringToComponents } from "../utils/helpers";

const Template1 = ({ template, candidate }: TemplateProps) => {
  const fontSizePercentage = template.fontSize / 100;
  const marginSizePercentage = template.margin / 100;

  const baseFontSizes = {
    header: 30 * fontSizePercentage,
    body: {
      title: 14 * fontSizePercentage,
      text: 10 * fontSizePercentage,
    },
  };

  const baseMarginSizes = {
    body: 30 * marginSizePercentage,
    text: 15 * marginSizePercentage,
    section: 20 * marginSizePercentage,
  };

  const styles = StyleSheet.create({
    page: {
      padding: "10pt",
    },
    header: {
      fontSize: `${baseFontSizes.header}pt`,
      textAlign: "center",
      backgroundColor: template.colourScheme,
      padding: "20pt",
      color: "white",
    },
    body: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "10pt",
      marginTop: `${baseMarginSizes.body}pt`,
    },
    titleText: {
      fontWeight: 500,
      fontSize: `${baseFontSizes.body.title}pt`,
    },
    text: {
      fontSize: `${baseFontSizes.body.text}pt`,
      lineHeight: "1.5pt",
    },
    listItem: {
      display: "flex",
      alignItems: "flex-start",
      flexDirection: "row",
      gap: "5pt",
    },
    socialMedia: {
      display: "flex",
      flexDirection: "row",
      gap: "10pt",
      alignItems: "center",
    },
    icons: { width: "10pt", height: "10pt" },
    skills: {
      display: "flex",
      flexDirection: "column",
      gap: "10pt",
    },
    watermark: {
      position: "absolute",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      opacity: 0.2, // Adjust opacity as needed
      zIndex: -1, // Place behind other content
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  const PDFDocument = () => (
    <Document>
      <Page style={styles.page}>
        {template.watermark && template.watermark !== "" && (
          <View style={styles.watermark}>
            <Image
              src={template.watermark} // Replace with your watermark image URL
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </View>
        )}

        <View style={styles.header}>
          <Text>
            {candidate?.firstName} {candidate?.lastName}
          </Text>
        </View>
        <View style={styles.body}>
          <View style={{ width: "60%" }}>
            <View>
              <Text style={styles.titleText}>SUMMARY</Text>
              <Text
                style={{
                  ...styles.text,
                  marginTop: `${baseMarginSizes.text}pt`,
                }}>
                {candidate.description}
              </Text>
            </View>

            <View style={{ marginTop: `${baseMarginSizes.section}pt` }}>
              <Text style={styles.titleText}>PROFESSIONAL EXPERIENCE</Text>

              {candidate.experiences.map((ex) => (
                <View
                  style={{ marginTop: `${baseMarginSizes.section}pt` }}
                  key={ex.title}>
                  <Text style={{ ...styles.text }}>
                    {ex.startDate}-{ex.endDate} | {ex.company}, {ex.location}
                  </Text>
                  <Text style={{ ...styles.text, fontWeight: "bold" }}>
                    {ex.title}
                  </Text>
                  <View
                    style={{
                      marginTop: "15pt",
                    }}>
                    {convertStringToComponents(ex.description, styles)}
                  </View>
                </View>
              ))}

              {/* <View style={{ marginTop: `${baseMarginSizes.section}pt` }}>
                <Text style={{ ...styles.text }}>
                  September 2019-Present | Westbrook Logistics, LLC, Middleton,
                  MI
                </Text>
                <Text style={{ ...styles.text, fontWeight: "bold" }}>
                  WAREHOUSE ASSOCIATE II
                </Text>
                <View
                  style={{
                    marginTop: "15pt",
                  }}>
                  <View style={styles.listItem}>
                    <Text style={{ ...styles.text }}>•</Text>
                    <Text style={{ ...styles.text, fontWeight: "bold" }}>
                      Created a new inventory system using Capterra that
                      streamlined processing and sped up warehouse operations by
                      8% over 3 months Oversee integrity and accuracy of all
                      product leaving the warehouse during active shifts
                    </Text>
                  </View>

                  <View style={styles.listItem}>
                    <Text style={{ ...styles.text }}>•</Text>
                    <Text style={{ ...styles.text, fontWeight: "bold" }}>
                      Document and report on all damaged product using
                      appropriate paperwork and procedures Trained and
                      supervised over 20 new hires during initial 3-month
                      probation period
                    </Text>
                  </View>

                  <View style={styles.listItem}>
                    <Text style={{ ...styles.text }}>•</Text>
                    <Text style={{ ...styles.text, fontWeight: "bold" }}>
                      Ensured safety protocols were observed throughout loading
                      and unloading over 100 pallets each day September
                    </Text>
                  </View>
                </View>
              </View> */}
            </View>
          </View>
          <View style={{ width: "40%" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10pt",
                width: "100%",
              }}>
              <View style={styles.socialMedia}>
                <Image
                  src={"/images/icons/phone-call.png"}
                  style={styles.icons}
                />
                <Text style={{ ...styles.text }}>{candidate.phoneNumber}</Text>
              </View>

              <View style={styles.socialMedia}>
                <Image src={"/images/icons/email.png"} style={styles.icons} />
                <Text style={{ ...styles.text }}>{candidate.email}</Text>
              </View>

              <View style={styles.socialMedia}>
                <Image
                  src={"/images/icons/linkedin.png"}
                  style={styles.icons}
                />
                <Text style={{ ...styles.text }}>{candidate.linkedin}</Text>
              </View>
            </View>

            <View style={{ marginTop: `${baseMarginSizes.section}pt` }}>
              <Text style={styles.titleText}>EDUCATION</Text>
              {candidate.education.map((edu) => (
                <View
                  key={edu.major}
                  style={{ marginTop: `${baseMarginSizes.text}pt` }}>
                  <Text style={styles.text}>
                    {edu.startDate}
                    {edu.endDate && edu.endDate !== ""
                      ? `- ${edu.endDate}`
                      : ""}
                  </Text>
                  <Text style={styles.text}>
                    {edu.university ?? edu.school}
                  </Text>
                  <Text style={styles.text}>{edu.location}</Text>
                  <Text style={styles.text}>{edu.degree},</Text>
                  <Text style={styles.text}>{edu.major}</Text>
                </View>
              ))}
            </View>

            <View style={{ marginTop: `${baseMarginSizes.section}pt` }}>
              <Text style={styles.titleText}>RELEVANT SKILLS</Text>
              <View
                style={{
                  ...styles.skills,
                  marginTop: `${baseMarginSizes.text}pt`,
                }}>
                {candidate.skills.map((skill) => (
                  <Text key={skill.name} style={{ ...styles.text }}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  return <PDFDocument />;
};

export default Template1;
