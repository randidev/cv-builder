import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { convertStringToComponents, renderWatermark } from "../utils/helpers";

const Template1: React.FC<TemplateProps> = ({ template, candidate }) => {
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
      opacity: 0.2,
      zIndex: -1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  const renderExperience = (experience: Experience) => (
    <View
      key={experience.title}
      style={{ marginTop: `${baseMarginSizes.section}pt` }}
    >
      <Text style={styles.text}>
        {experience.startDate}-{experience.endDate} | {experience.company},{" "}
        {experience.location}
      </Text>
      <Text style={[styles.text, { fontWeight: "bold" }]}>
        {experience.title}
      </Text>
      <View style={{ marginTop: "15pt" }}>
        {convertStringToComponents(experience.description, styles)}
      </View>
    </View>
  );

  const renderEducation = (edu: Education) => (
    <View key={edu.major} style={{ marginTop: `${baseMarginSizes.text}pt` }}>
      <Text style={styles.text}>
        {edu.startDate}
        {edu.endDate && edu.endDate !== "" ? `- ${edu.endDate}` : ""}
      </Text>
      <Text style={styles.text}>{edu.university ?? edu.school}</Text>
      <Text style={styles.text}>{edu.location}</Text>
      <Text style={styles.text}>{edu.degree},</Text>
      <Text style={styles.text}>{edu.major}</Text>
    </View>
  );

  const renderSkills = (skills: Candidate["skills"]) => (
    <View style={[styles.skills, { marginTop: `${baseMarginSizes.text}pt` }]}>
      {skills.map((skill) => (
        <Text key={skill.name} style={styles.text}>
          {skill.name}
        </Text>
      ))}
    </View>
  );

  return (
    <Document>
      <Page style={styles.page}>
        {renderWatermark(template.watermark ?? "", styles)}

        <View style={styles.header}>
          <Text>
            {candidate?.firstName} {candidate?.lastName}
          </Text>
        </View>

        <View style={styles.body}>
          <View style={{ width: "55%" }}>
            <View>
              <Text style={styles.titleText}>SUMMARY</Text>
              <View
                style={[
                  styles.text,
                  { marginTop: `${baseMarginSizes.text}pt` },
                ]}
              >
                {convertStringToComponents(candidate.description, styles)}
              </View>
            </View>

            <View style={{ marginTop: `${baseMarginSizes.section}pt` }}>
              <Text style={styles.titleText}>PROFESSIONAL EXPERIENCE</Text>
              {candidate.experiences.map(renderExperience)}
            </View>
          </View>

          <View style={{ width: "40%" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10pt",
                width: "100%",
              }}
            >
              <View style={styles.socialMedia}>
                <Image
                  src={"/images/icons/phone-call.png"}
                  style={styles.icons}
                />
                <Text style={styles.text}>{candidate.phoneNumber}</Text>
              </View>

              <View style={styles.socialMedia}>
                <Image src={"/images/icons/email.png"} style={styles.icons} />
                <Text style={styles.text}>{candidate.email}</Text>
              </View>

              <View style={styles.socialMedia}>
                <Image
                  src={"/images/icons/linkedin.png"}
                  style={styles.icons}
                />
                <Text style={styles.text}>{candidate.linkedin}</Text>
              </View>
            </View>

            <View style={{ marginTop: `${baseMarginSizes.section}pt` }}>
              <Text style={styles.titleText}>EDUCATION</Text>
              {candidate.education.map(renderEducation)}
            </View>

            <View style={{ marginTop: `${baseMarginSizes.section}pt` }}>
              <Text style={styles.titleText}>RELEVANT SKILLS</Text>
              {renderSkills(candidate.skills)}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template1;
