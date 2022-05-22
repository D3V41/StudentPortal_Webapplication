import React, { useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import logo from "../../mortarboard (1).png";

export function GeneratePDF(props) {
  function searchNor(results) {
    return results.filter((result) => result.examType === "Nor");
  }

  function searchRem(results) {
    return results.filter((result) => result.examType === "Rem");
  }

  function searchRerem(results) {
    return results.filter((result) => result.examType === "Rerem");
  }

  function searchSemester(results) {
    return results.filter(
      (result) => result.subjectSemester === props.semester
    );
  }

  return (
    <Document>
      <Page style={styles.page} size="A4" wrap>
        <Image style={styles.logo} src={logo} />
        <Text style={styles.title}>StudentPortal</Text>
        <View style={styles.row}>
          <Text style={[styles.information, styles.id]}>
            Id : {props.student.studentId}
          </Text>
          <Text style={[styles.information, styles.name]}>
            Name : {props.student.studentName}
          </Text>
          <Text style={[styles.information, styles.semester]}>
            Semester : {props.semester}
          </Text>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.container}>
            <Text style={styles.subjectid}>SubjectId</Text>
            <Text style={styles.subjectname}>SubjectName</Text>
            <Text style={styles.examtype}>ExamType</Text>
            <Text style={styles.internalmark}>InternalMark</Text>
            <Text style={styles.externalmark}>ExternalMark</Text>
            <Text style={styles.attendance}>Attendance</Text>
          </View>
          {searchSemester(searchNor(props.result)).map((result) => (
            <View style={styles.container}>
              <Text style={styles.subjectid}>{result.subjectId}</Text>
              <Text style={styles.subjectname}>{result.subjectName}</Text>
              <Text style={styles.examtype}>{result.examType}</Text>
              <Text style={styles.internalmark}>{result.examInternalMark}</Text>
              <Text style={styles.externalmark}>{result.examExternalMark}</Text>
              <Text style={styles.attendance}>
                {result.attendance}
                {" %"}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.row}>
          <Text style={[styles.information, styles.cpi]}>
            CPI : {props.cpi}
          </Text>
          <Text style={[styles.information, styles.spi]}>
            SPI : {props.spi}
          </Text>
        </View>
      </Page>
      <Page style={styles.page} size="A4" wrap>
        <Image style={styles.logo} src={logo} />
        <Text style={styles.title}>StudentPortal</Text>
        <View style={styles.row}>
          <Text style={[styles.information, styles.id]}>
            Id : {props.student.studentId}
          </Text>
          <Text style={[styles.information, styles.name]}>
            Name : {props.student.studentName}
          </Text>
          <Text style={[styles.information, styles.semester]}>
            Semester : {props.semester}
          </Text>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.container}>
            <Text style={styles.subjectid}>SubjectId</Text>
            <Text style={styles.subjectname}>SubjectName</Text>
            <Text style={styles.examtype}>ExamType</Text>
            <Text style={styles.internalmark}>InternalMark</Text>
            <Text style={styles.externalmark}>ExternalMark</Text>
            <Text style={styles.attendance}>Attendance</Text>
          </View>
          {searchSemester(searchRem(props.result)).map((result) => (
            <View style={styles.container}>
              <Text style={styles.subjectid}>{result.subjectId}</Text>
              <Text style={styles.subjectname}>{result.subjectName}</Text>
              <Text style={styles.examtype}>{result.examType}</Text>
              <Text style={styles.internalmark}>{result.examInternalMark}</Text>
              <Text style={styles.externalmark}>{result.examExternalMark}</Text>
              <Text style={styles.attendance}>
                {result.attendance}
                {" %"}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.row}>
          <Text style={[styles.information, styles.cpi]}>
            CPI : {props.cpi}
          </Text>
          <Text style={[styles.information, styles.spi]}>
            SPI : {props.spi}
          </Text>
        </View>
      </Page>
      <Page style={styles.page} size="A4" wrap>
        <Image style={styles.logo} src={logo} />
        <Text style={styles.title}>StudentPortal</Text>
        <View style={styles.row}>
          <Text style={[styles.information, styles.id]}>
            Id : {props.student.studentId}
          </Text>
          <Text style={[styles.information, styles.name]}>
            Name : {props.student.studentName}
          </Text>
          <Text style={[styles.information, styles.semester]}>
            Semester : {props.semester}
          </Text>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.container}>
            <Text style={styles.subjectid}>SubjectId</Text>
            <Text style={styles.subjectname}>SubjectName</Text>
            <Text style={styles.examtype}>ExamType</Text>
            <Text style={styles.internalmark}>InternalMark</Text>
            <Text style={styles.externalmark}>ExternalMark</Text>
            <Text style={styles.attendance}>Attendance</Text>
          </View>
          {searchSemester(searchRerem(props.result)).map((result) => (
            <View style={styles.container}>
              <Text style={styles.subjectid}>{result.subjectId}</Text>
              <Text style={styles.subjectname}>{result.subjectName}</Text>
              <Text style={styles.examtype}>{result.examType}</Text>
              <Text style={styles.internalmark}>{result.examInternalMark}</Text>
              <Text style={styles.externalmark}>{result.examExternalMark}</Text>
              <Text style={styles.attendance}>
                {result.attendance}
                {" %"}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.row}>
          <Text style={[styles.information, styles.cpi]}>
            CPI : {props.cpi}
          </Text>
          <Text style={[styles.information, styles.spi]}>
            SPI : {props.spi}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: { flexDirection: "column", padding: 25, fontSize: 11 },
  logo: {
    width: 74,
    height: 66,
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    letterSpacing: 3,
    fontSize: 25,
    fontWeight: "extrabold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  information: {
    marginTop: 15,
    letterSpacing: 0.5,
    fontSize: 10,
    textTransform: "uppercase",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
    borderWidth: 1,
  },
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  subjectid: {
    width: "16%",
    borderRightWidth: 1,
  },
  subjectname: {
    width: "17%",
    borderRightWidth: 1,
  },
  examtype: {
    width: "17%",
    borderRightWidth: 1,
  },
  internalmark: {
    width: "17%",
    borderRightWidth: 1,
  },
  externalmark: {
    width: "17%",
    borderRightWidth: 1,
  },
  attendance: {
    width: "16%",
  },
  cpi: {
    width: "50%",
  },
  spi: {
    width: "50%",
  },
  id: {
    width: "30%",
  },
  name: {
    width: "40%",
  },
  semester: {
    width: "30%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    fontStyle: "bold",
  },
});
