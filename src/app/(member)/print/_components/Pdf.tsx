"use client";
import {
  Page,
  View,
  Document,
  StyleSheet,
  Text,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useChildHomeworks } from "../../children/[id]/_hooks/useChildHomeworks";
Font.register({
  family: "NotoSansJP",
  fonts: [
    {
      src: "/fonts/NotoSansJP-Regular.ttf",
    },
    {
      src: "/fonts/NotoSansJP-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});
interface Props {
  childId: string;
}
export const Pdf: React.FC<Props> = ({ childId }) => {
  const { data, error } = useChildHomeworks({ childId });
  if (!data) return <Skeleton width="100%" height={300} />;
  if (error) return <div className="text-center pt-20">データ取得に失敗</div>;
  const styles = StyleSheet.create({
    page: {
      fontFamily: "NotoSansJP",
      flexDirection: "column",
      backgroundColor: "#E4E4E4",
      padding: 20,
    },
    section: {
      margin: 10,
      padding: 10,
      flexDirection: "row",
      flexWrap: "wrap",
    },
    title: {
      fontSize: 16,
      marginBottom: 10,
      paddingLeft: "5%",
    },
    homeworkContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      border: "1px solid #000",
      padding: 10,
      borderRadius: 5,
      marginBottom: 5,
      width: "48%",
      margin: "1%",
    },
    homeworkContent: {
      display: "flex",
      flexDirection: "column",
      width: "70%",
    },
    homeworkTitle: {
      fontWeight: "bold",
      fontSize: 18,
    },
    homeworkDescription: {
      fontSize: 8,
    },
    stickerArea: {
      width: 50,
      height: 50,
      border: "1px solid #000",
      borderRadius: 25,
    },
  });

  return (
    <PDFViewer width="100%" height="100%">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.title}>
            <Text>{data.child.name}の宿題一覧</Text>
          </View>
          <View style={styles.section}>
            {data.homeworks.map(homework => (
              <View key={homework.id} style={styles.homeworkContainer}>
                <View style={styles.homeworkContent}>
                  <View style={styles.homeworkTitle}>
                    <Text>{homework.title}</Text>
                  </View>
                  <View style={styles.homeworkDescription}>
                    <Text>{homework.description}</Text>
                  </View>
                </View>
                <View style={styles.stickerArea}></View>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
