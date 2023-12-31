import mysql2 from "mysql2";
const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Up090859",
  database: "school",
  port: 3306,
});

const createClass = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name } = req.body;

    const schoolIdQuery = "SELECT id FROM schools WHERE created_by = ?";

    connection.query(
      schoolIdQuery,
      [userId],
      (schoolIdError, schoolIdResults) => {
        if (schoolIdError) {
          console.error("Error retrieving schoolId:", schoolIdError);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          //console.log(schoolIdResults[0].id)
          const insertClassQuery =
            "INSERT INTO class (created_by, name, school_id) VALUES (?, ?, ?)";
          connection.query(
            insertClassQuery,
            [userId, name, schoolIdResults[0].id],
            (insertError, insertResult) => {
              if (insertError) {
                console.error("Error inserting class:", insertError);
                res.status(500).json({ error: "Internal Server Error" });
              } else {
                console.log("Class created successfully:", insertResult);
                res.status(200).json({
                  msg: "Class created successfully!",
                  classId: insertResult.insertId,
                });
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
};

const getClass = async (req,res) => {
    try {
        const userId = req.params.id;
        const classesQuery = `
          SELECT class.*, schools.name AS school_name, users.name AS user_name
          FROM class
          INNER JOIN schools ON class.school_id = schools.id
          INNER JOIN users ON class.created_by = users.id
          WHERE class.created_by = ?
        `;
    
        connection.query(classesQuery, [userId], (classesError, classesResults) => {
          if (classesError) {
            console.error("Error retrieving classes:", classesError);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            res.status(200).json(classesResults);
          }
        });
      } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

export {
    createClass,
    getClass
}