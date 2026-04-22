import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/students/")
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <header style={{
        backgroundColor: "#1976d2",
        color: "white",
        padding: "20px",
        textAlign: "center",
        fontSize: "32px",
        fontWeight: "bold"
      }}>
        Student Management System
      </header>

      {/* Student List */}
      <main style={{ padding: "20px" }}>
        <h2>Student List</h2>
        <p>Total Students: {students.length}</p>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {students.map(student => (
            <div key={student.id} style={{
              border: "1px solid #ccc",
              padding: "20px",
              width: "220px",
              borderRadius: "12px",
              textAlign: "center",
              cursor: "pointer",
              boxShadow: "2px 2px 12px rgba(0,0,0,0.15)"
            }}
              onClick={() => setSelectedStudent(student)}
            >
              <img
                src={student.photo}
                alt={student.name}
                width="140"
                height="140"
                style={{ borderRadius: "50%" }}
              />
              <h3 style={{ marginTop: "10px" }}>{student.name}</h3>
              <p>{student.branch}</p>
              <p>Semester: {student.semester}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Full Screen Modal */}
      {selectedStudent && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.9)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
          overflowY: "auto"
        }}>
          <div style={{
            backgroundColor: "#fff",
            width: "95%",
            height: "95%",
            padding: "40px",
            borderRadius: "12px",
            position: "relative",
            display: "flex",
            gap: "50px",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            overflowY: "auto"
          }}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedStudent(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                border: "none",
                background: "red",
                color: "white",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "20px"
              }}
            >
              ✕
            </button>

            {/* Student Full Details */}
            <img
              src={selectedStudent.photo}
              alt={selectedStudent.name}
              style={{
                borderRadius: "50%",
                width: "300px",
                height: "300px",
                objectFit: "cover"
              }}
            />
            <div style={{ fontSize: "20px", lineHeight: "1.8", flex: 1 }}>
              <h1>{selectedStudent.name}</h1>
              <p><b>USN:</b> {selectedStudent.usn}</p>
              <p><b>Branch:</b> {selectedStudent.branch}</p>
              <p><b>Year:</b> {selectedStudent.year}</p>
              <p><b>Semester:</b> {selectedStudent.semester}</p>
              <p><b>Phone:</b> {selectedStudent.phone}</p>
              <p><b>Email:</b> {selectedStudent.email}</p>
              <p><b>SGPA:</b> {selectedStudent.sgpa}</p>
              <p><b>CGPA:</b> {selectedStudent.cgpa}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}