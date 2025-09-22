import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Import design components
import ModernDesign from './ResumeDesigns/ModernDesign';
import ClassicDesign from './ResumeDesigns/ClassicDesign';
import CreativeDesign from './ResumeDesigns/CreativeDesign';

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    borderBottom: '1px solid #FFE8B4',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6B3226',
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#B85D34',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#6B3226',
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  skill: {
    fontSize: 10,
    padding: 5,
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: '#FFE8B4',
    color: '#6B3226',
    borderRadius: 3,
  },
});

// PDF Document component
const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>{data.name}</Text>
        <Text style={styles.text}>{data.location}</Text>
        <Text style={styles.text}>{data.email} | {data.phone}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subheading}>Summary</Text>
        <Text style={styles.text}>{data.summary}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subheading}>Skills</Text>
        <View style={styles.skills}>
          {data.skills.map((skill, index) => (
            <Text key={index} style={styles.skill}>{skill}</Text>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subheading}>Experience</Text>
        {data.experience.map((exp, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#6B3226' }}>{exp.title}</Text>
            <Text style={{ fontSize: 12, fontStyle: 'italic', color: '#B85D34' }}>{exp.company}</Text>
            <Text style={{ fontSize: 10, color: '#6B3226' }}>{exp.period}</Text>
            {exp.details.map((detail, i) => (
              <Text key={i} style={{ fontSize: 10, marginLeft: 10, marginTop: 2, color: '#6B3226' }}>• {detail}</Text>
            ))}
          </View>
        ))}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subheading}>Education</Text>
        {data.education.map((edu, index) => (
          <View key={index} style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#6B3226' }}>{edu.degree}</Text>
            <Text style={{ fontSize: 10, color: '#6B3226' }}>{edu.institution}, {edu.year}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subheading}>Languages</Text>
        {data.languages.map((lang, index) => (
          <Text key={index} style={{ fontSize: 10, marginBottom: 2, color: '#6B3226' }}>{lang}</Text>
        ))}
      </View>
    </Page>
  </Document>
);

const ResumePDF = ({ data, templateNumber = 0 }) => {
  const componentRef = useRef();
  const templates = [ModernDesign, ClassicDesign, CreativeDesign];
  const SelectedTemplate = templates[templateNumber];

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${data.name}_resume`,
  });

  // For @react-pdf/renderer
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            {/* Only show initials circle if not using ClassicDesign (template 1) */}
            {templateNumber !== 1 && (
              <View style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: templateNumber === 0 ? '#B85D34' : '#6B3226',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10
              }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                  {data.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
            )}
            <View>
              <Text style={styles.heading}>{data.name}</Text>
              <Text style={styles.text}>{data.location}</Text>
              <Text style={styles.text}>{data.email} | {data.phone}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.subheading}>Summary</Text>
          <Text style={styles.text}>{data.summary}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.subheading}>Skills</Text>
          <View style={styles.skills}>
            {data.skills.map((skill, index) => (
              <Text key={index} style={styles.skill}>{skill}</Text>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.subheading}>Experience</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#6B3226' }}>{exp.title}</Text>
              <Text style={{ fontSize: 12, fontStyle: 'italic', color: '#B85D34' }}>{exp.company}</Text>
              <Text style={{ fontSize: 10, color: '#6B3226' }}>{exp.period}</Text>
              {exp.details.map((detail, i) => (
                <Text key={i} style={{ fontSize: 10, marginLeft: 10, marginTop: 2, color: '#6B3226' }}>• {detail}</Text>
              ))}
            </View>
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.subheading}>Education</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={{ marginBottom: 5 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#6B3226' }}>{edu.degree}</Text>
              <Text style={{ fontSize: 10, color: '#6B3226' }}>{edu.institution}, {edu.year}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.subheading}>Languages</Text>
          {data.languages.map((lang, index) => (
            <Text key={index} style={{ fontSize: 10, marginBottom: 2, color: '#6B3226' }}>{lang}</Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDF;