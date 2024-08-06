import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { convertStringToComponents, renderWatermark } from "../utils/helpers";

const Template2: React.FC<TemplateProps> = ({ template, candidate }) => {
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
      opacity: 0.2,
      zIndex: -1,
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

  const renderSocialMedia = () => (
    <View
      style={{
        ...styles.socialMedia,
        marginTop: `${baseMarginSizes.headerSocmed}pt`,
      }}>
      {[
        { src: "/images/icons/email.png", text: candidate.email },
        { src: "/images/icons/link.png", text: candidate.linkedin },
        { src: "/images/icons/pin.png", text: candidate.address },
      ].map(({ src, text }) => (
        <View key={src} style={{ ...styles.socialMedia, gap: `2pt` }}>
          <Image src={src} style={styles.icons} />
          <Text style={styles.text}>{text}</Text>
        </View>
      ))}
    </View>
  );

  const renderSectionWithHorizontalLine = (title: string, content: any) => (
    <View style={{ marginTop: `${baseMarginSizes.section}pt` }}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.horizontalLine}></View>
      {content}
    </View>
  );

  const renderExperience = (experience: Experience) => (
    <View
      key={experience.title}
      style={{ ...styles.listDown, gap: `${baseMarginSizes.small}pt` }}>
      <View style={styles.listBetween}>
        <Text style={styles.text}>{experience.title}</Text>
        <Text style={styles.text}>
          {experience.startDate} - {experience.endDate}
        </Text>
      </View>
      <View style={styles.listBetween}>
        <Text style={{ ...styles.titleText, color: template.colourScheme }}>
          {experience.company}
        </Text>
        <Text style={styles.text}>{experience.location}</Text>
      </View>
      <View style={{ marginTop: "15pt" }}>
        {convertStringToComponents(experience.description, styles)}
      </View>
    </View>
  );

  const renderEducation = (edu: Education) => (
    <View
      key={edu.major}
      style={{ ...styles.listDown, gap: `${baseMarginSizes.small}pt` }}>
      <View style={styles.listBetween}>
        <Text style={styles.text}>
          {edu.degree} in {edu.major}
        </Text>
        <Text style={styles.text}>
          {edu.startDate} - {edu.endDate}
        </Text>
      </View>
      <View style={styles.listBetween}>
        <Text style={{ ...styles.titleText, color: template.colourScheme }}>
          {edu.university ?? edu.school}
        </Text>
        <Text style={styles.text}>{edu.location}</Text>
      </View>
      <View style={{ marginTop: "15pt" }}>
        {convertStringToComponents(edu.description, styles)}
      </View>
    </View>
  );

  const renderSkills = (skills: Skill[]) => (
    <View style={styles.listDown}>
      {skills.map((skill) => (
        <Text key={skill.name} style={styles.text}>
          {skill.name}
        </Text>
      ))}
    </View>
  );

  const renderCertifications = (certifications: Certification[]) => (
    <View style={styles.listDown}>
      {certifications.map((cert) => (
        <View
          key={cert.name}
          style={{ ...styles.listDown, gap: `${baseMarginSizes.small}pt` }}>
          <View style={styles.listBetween}>
            <Text style={styles.text}>{cert.name}</Text>
            <Text style={styles.text}>{cert.date}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <Document>
      <Page>
        {renderWatermark(template.watermark ?? "", styles)}

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
              {renderSocialMedia()}
            </View>

            {renderSectionWithHorizontalLine(
              "SUMMARY",
              <View style={styles.text}>
                {convertStringToComponents(candidate.description, styles)}
              </View>
            )}

            {renderSectionWithHorizontalLine(
              "EXPERIENCE",
              <View style={styles.listDown}>
                {candidate.experiences.map(renderExperience)}
              </View>
            )}

            {renderSectionWithHorizontalLine(
              "EDUCATION",
              <View style={styles.listDown}>
                {candidate.education.map(renderEducation)}
              </View>
            )}
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
                color: "#fff",
                height: "100%",
              }}>
              <View style={{ width: "100%" }}>
                <Text style={styles.titleText}>SKILLS</Text>
                <View style={styles.horizontalLineWhite}></View>
                {renderSkills(candidate.skills)}
              </View>

              <View
                style={{
                  marginTop: `${baseMarginSizes.section}pt`,
                  width: "100%",
                }}>
                <Text style={styles.titleText}>CERTIFICATION</Text>
                <View style={styles.horizontalLineWhite}></View>
                {renderCertifications(candidate.certifications)}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template2;
