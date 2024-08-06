import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { convertStringToComponents } from "../utils/helpers";

const Template2 = ({ template, candidate }: TemplateProps) => {
  const fontSizePercentage = template.fontSize / 100;
  const marginSizePercentage = template.margin / 100;

  const baseFontSizes = {
    name: 20 * fontSizePercentage,
    title: 16 * fontSizePercentage,
    body: {
      title: 12 * fontSizePercentage,
      text: 8 * fontSizePercentage,
    },
  };

  const baseMarginSizes = {
    header: 45 * marginSizePercentage,
    headerSocmed: 10 * marginSizePercentage,
    headerSocmedItems: 2 * marginSizePercentage,
    small: 5 * marginSizePercentage,
    text: 15 * marginSizePercentage,
    section: 30 * marginSizePercentage,
    rightSide: 130 * marginSizePercentage,
  };

  const styles = StyleSheet.create({
    name: {
      textTransform: "uppercase",
      fontSize: `${baseFontSizes.name}pt`,
    },
    title: {
      fontSize: `${baseFontSizes.title}pt`,
      color: template.colourScheme,
    },
    titleText: {
      fontWeight: 500,
      fontSize: `${baseFontSizes.body.title}pt`,
    },
    text: {
      fontSize: `${baseFontSizes.body.text}pt`,
      lineHeight: "1.5pt",
    },
    listBetween: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    listDown: {
      display: "flex",
      flexDirection: "column",
      gap: "15pt",
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
      alignItems: "flex-start",
      flexWrap: "wrap",
    },
    icons: {
      width: `${10 * fontSizePercentage}pt`,
      height: `${10 * fontSizePercentage}pt`,
    },
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
    horizontalLine: {
      borderBottomWidth: 1,
      borderBottomColor: "#000",
      marginVertical: baseMarginSizes.headerSocmed,
    },
    horizontalLineWhite: {
      borderBottomWidth: 1,
      borderBottomColor: "#fff",
      marginVertical: baseMarginSizes.headerSocmed,
    },
  });

  const PDFDocument = () => (
    <Document>
      <Page>
        {template.watermark && template.watermark !== "" && (
          <View style={styles.watermark}>
            <Image
              src={template.watermark} // Replace with your watermark image URL
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </View>
        )}

        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ width: "65%", padding: "20pt" }}>
            <View style={{ marginBottom: `${baseMarginSizes.header}pt` }}>
              <Text style={styles.name}>
                {candidate.firstName} {candidate.lastName}
              </Text>
              <Text
                style={{
                  ...styles.title,
                  marginTop: `${baseMarginSizes.small}pt`,
                }}>
                {candidate.jobTitle}
              </Text>

              <View
                style={{
                  ...styles.socialMedia,
                  marginTop: `${baseMarginSizes.headerSocmed}pt`,
                }}>
                <View
                  style={{
                    ...styles.socialMedia,
                    gap: `2pt`,
                  }}>
                  <Image src={"/images/icons/email.png"} style={styles.icons} />
                  <Text style={styles.text}>{candidate.email}</Text>
                </View>

                <View
                  style={{
                    ...styles.socialMedia,
                    gap: `2pt`,
                  }}>
                  <Image src={"/images/icons/link.png"} style={styles.icons} />
                  <Text style={styles.text}>{candidate.linkedin}</Text>
                </View>

                <View
                  style={{
                    ...styles.socialMedia,
                    gap: `2pt`,
                  }}>
                  <Image src={"/images/icons/pin.png"} style={styles.icons} />
                  <Text style={styles.text}>{candidate.address}</Text>
                </View>
              </View>
            </View>

            <View>
              <Text style={styles.titleText}>SUMMARY</Text>
              <View style={styles.horizontalLine}></View>
              <Text style={styles.text}>{candidate.description}</Text>
            </View>

            <View style={{ marginTop: `${baseMarginSizes.section}pt` }}>
              <Text style={styles.titleText}>EXPERIENCE</Text>
              <View style={styles.horizontalLine}></View>
              <View style={styles.listDown}>
                {candidate.experiences.map((ex) => (
                  <View
                    key={ex.title}
                    style={{
                      ...styles.listDown,
                      gap: `${baseMarginSizes.small}pt`,
                    }}>
                    <View style={styles.listBetween}>
                      <Text style={styles.text}>{ex.title}</Text>
                      <Text style={styles.text}>
                        {ex.startDate} - {ex.endDate}
                      </Text>
                    </View>
                    <View style={styles.listBetween}>
                      <Text
                        style={{
                          ...styles.titleText,
                          color: template.colourScheme,
                        }}>
                        {ex.company}
                      </Text>
                      <Text style={styles.text}>{ex.location}</Text>
                    </View>
                    <View style={{ marginTop: "15pt" }}>
                      {convertStringToComponents(ex.description, styles)}
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View style={{ marginTop: `${baseMarginSizes.section}pt` }}>
              <Text style={styles.titleText}>EDUCATION</Text>
              <View style={styles.horizontalLine}></View>
              <View style={styles.listDown}>
                {candidate.education.map((ed) => (
                  <View
                    key={ed.major}
                    style={{
                      ...styles.listDown,
                      gap: `${baseMarginSizes.small}pt`,
                    }}>
                    <View style={styles.listBetween}>
                      <Text style={styles.text}>
                        {ed.degree} in {ed.major}
                      </Text>
                      <Text style={styles.text}>
                        {ed.startDate} - {ed.endDate}
                      </Text>
                    </View>
                    <View style={styles.listBetween}>
                      <Text
                        style={{
                          ...styles.titleText,
                          color: template.colourScheme,
                        }}>
                        {ed.university ?? ed.school}
                      </Text>
                      <Text style={styles.text}>{ed.location}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View
            style={{
              width: "35%",
              height: "100vh",
              backgroundColor: template.colourScheme,
            }}>
            <View
              style={{
                padding: `${baseMarginSizes.rightSide}pt 10pt`,
                display: "flex",
                height: "100%",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                color: "#fff",
              }}>
              <View style={{ width: "100%" }}>
                <Text style={styles.titleText}>SKILLS</Text>
                <View style={styles.horizontalLineWhite}></View>
                <View style={styles.listDown}>
                  {candidate.skills.map((skill) => (
                    <Text style={styles.text} key={skill.name}>
                      {skill.name}
                    </Text>
                  ))}
                </View>
              </View>

              <View
                style={{
                  marginTop: `${baseMarginSizes.section}pt`,
                  width: "100%",
                }}>
                <Text style={styles.titleText}>CERTIFICATION</Text>
                <View style={styles.horizontalLineWhite}></View>
                <View style={styles.listDown}>
                  {candidate.certifications.map((cert) => (
                    <View
                      key={cert.name}
                      style={{
                        ...styles.listDown,
                        gap: `${baseMarginSizes.small}pt`,
                      }}>
                      <View style={styles.listBetween}>
                        <Text style={styles.text}>{cert.name}</Text>
                        <Text style={styles.text}>{cert.date}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  return <PDFDocument />;
};

export default Template2;
