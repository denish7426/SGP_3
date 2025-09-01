import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  initials: {
    width: 70,
    height: 70,
    backgroundColor: '#374151',
    color: '#fff',
    borderRadius: 35,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginRight: 24,
    paddingTop: 20,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  contact: {
    fontSize: 18,
    color: '#444',
    marginBottom: 2,
  },
  email: {
    fontSize: 16,
    color: '#444',
    marginBottom: 2,
  },
  badge: {
    marginLeft: 'auto',
    backgroundColor: '#2563eb',
    color: '#fff',
    borderRadius: 8,
    padding: '6px 20px',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
  },
  hr: {
    margin: '24px 0',
    borderTopWidth: 2,
    borderColor: '#e5e7eb',
  },
  sectionTitle: {
    fontSize: 22,
    color: '#2563eb',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
  },
  skillsRow: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: 10,
  },
  skillCol: {
    flex: 1,
  },
  skill: {
    fontSize: 16,
    color: '#222',
    marginBottom: 6,
  },
  expTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222',
  },
  expCompany: {
    fontSize: 16,
    color: '#444',
    marginBottom: 4,
  },
  expDetail: {
    fontSize: 16,
    color: '#222',
    marginLeft: 12,
    marginBottom: 4,
  },
  edu: {
    fontSize: 16,
    color: '#222',
    marginBottom: 6,
  },
  lang: {
    fontSize: 16,
    color: '#222',
    marginBottom: 4,
    marginLeft: 18,
  },
});

const ResumePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.initials}>{data.initials}</Text>
        <View>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.contact}>{data.location}</Text>
          <Text style={styles.email}>{data.email} | {data.phone}</Text>
        </View>
        <Text style={styles.badge}>Modern</Text>
      </View>
      <View style={styles.hr} />
      <Text style={styles.sectionTitle}>Summary</Text>
      <Text style={styles.section}>{data.summary}</Text>
      <View style={styles.hr} />
      <Text style={styles.sectionTitle}>Skills</Text>
      <View style={styles.skillsRow}>
        <View style={styles.skillCol}>
          {data.skills && data.skills.slice(0, Math.ceil(data.skills.length/2)).map((skill, idx) => (
            <Text key={idx} style={styles.skill}>{skill}</Text>
          ))}
        </View>
        <View style={styles.skillCol}>
          {data.skills && data.skills.slice(Math.ceil(data.skills.length/2)).map((skill, idx) => (
            <Text key={idx} style={styles.skill}>{skill}</Text>
          ))}
        </View>
      </View>
      <View style={styles.hr} />
      <Text style={styles.sectionTitle}>Experience</Text>
      {data.experience && data.experience.map((exp, idx) => (
        <View key={idx} style={styles.section}>
          <Text style={styles.expTitle}>{exp.title}</Text>
          <Text style={styles.expCompany}>{exp.company} ({exp.period})</Text>
          {exp.details.map((d, i) => (
            <Text key={i} style={styles.expDetail}>• {d}</Text>
          ))}
        </View>
      ))}
      <View style={styles.hr} />
      <Text style={styles.sectionTitle}>Education & Training</Text>
      {data.education && data.education.map((edu, idx) => (
        <Text key={idx} style={styles.edu}>{edu.degree} - {edu.institution} ({edu.year})</Text>
      ))}
      <View style={styles.hr} />
      <Text style={styles.sectionTitle}>Languages</Text>
      {data.languages && data.languages.map((lang, idx) => (
        <Text key={idx} style={styles.lang}>{lang}</Text>
      ))}
    </Page>
  </Document>
);

export default ResumePDF;
