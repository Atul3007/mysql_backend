import mysql2 from "mysql2";
const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Up090859",
  database: "school",
  port: 3306,
});

const createStudent = async (req,res) => {
    try {
        const userId = req.params.id;
        const { name, photo, class_name, school_name } = req.body;
  
  
        const classIdQuery = "SELECT id FROM class WHERE name = ?";
        connection.query(
          classIdQuery,
          [class_name],
          (classIdError, classIdResults) => {
            if (classIdError) {
              console.error("Error retrieving class_id:", classIdError);
              res.status(500).json({ error: "Internal Server Error" });
            } else {
              const classId = classIdResults[0] ? classIdResults[0].id : null;
              const schoolIdQuery = "SELECT id FROM schools WHERE name = ?";
              connection.query(
                schoolIdQuery,
                [school_name],
                (schoolIdError, schoolIdResults) => {
                  if (schoolIdError) {
                    console.error("Error retrieving school_id:", schoolIdError);
                    res.status(500).json({ error: "Internal Server Error" });
                  } else {
                    const schoolId = schoolIdResults[0]
                      ? schoolIdResults[0].id
                      : null;
  
                    const insertStudentQuery =
                      "INSERT INTO students (name, photo, class_id, school_id, created_by) VALUES (?, ?, ?, ?, ?)";
                    connection.query(
                      insertStudentQuery,
                      [name, photo, classId, schoolId, userId],
                      (insertError, insertResult) => {
                        if (insertError) {
                          console.error("Error inserting student:", insertError);
                          res
                            .status(500)
                            .json({ error: "Internal Server Error" });
                        } else {
                          console.log(
                            "Student created successfully:",
                            insertResult
                          );
                          res
                            .status(200)
                            .json({
                              msg: "Student created successfully!",
                              studentId: insertResult.insertId,
                            });
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

const getStudent = async (req,res) => {
    try {
        const userId = req.params.id;
    
    const studentsQuery = `
      SELECT students.id, students.name, students.photo, schools.name AS school_name, class.name AS class_name, users.name AS created_by_name
      FROM students
      INNER JOIN schools ON students.school_id = schools.id
      INNER JOIN class ON students.class_id = class.id
      INNER JOIN users ON students.created_by = users.id
      WHERE students.created_by = ?
    `;
    
        connection.query(studentsQuery, [userId], (studentsError, studentsResults) => {
          if (studentsError) {
            console.error('Error retrieving students:', studentsError);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            res.status(200).json(studentsResults);
          }
        });
      } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const getAllClassSameStudent = async (req,res) => {
    try {
        const userId = req.params.id; 
    
        const query = `
          SELECT students.name AS student_name, students.photo, 
                 GROUP_CONCAT(class.name) AS assigned_classes
          FROM students
          INNER JOIN class ON students.class_id = class.id
          WHERE students.created_by = ?
          GROUP BY students.id
          HAVING COUNT(DISTINCT students.class_id) = (SELECT COUNT(DISTINCT id) FROM class WHERE created_by = ?);
        `;
    
        connection.query(query, [userId, userId], (error, results) => {
          if (error) {
            console.error('Error retrieving students:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            res.status(200).json(results);
          }
        });
      } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const getClassMates = async (req, res) => {
  const { student_id } = req.params.id;
  try {
    
  } catch (error) {
    console.log(error)
  }
 
};



export {
    createStudent,
    getStudent,
    getAllClassSameStudent,
    getClassMates
}