import mysql2 from "mysql2";
const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "Up090859",
    database: "school",
    port: 3306,
  });

// -------------------create School---------------------

const createSchool = async (req,res)=>{
    try {
        const userId = req.params.id;
        const { name, photo } = req.body;
    
        const sqlQuery =
          "INSERT INTO schools (created_by, name, photo) VALUES (?, ?, ?)";
    
        connection.query(sqlQuery, [userId, name, photo], (err, result) => {
          if (err) {
            console.error("Error inserting data:", err);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            console.log("Data inserted successfully:", result);
            res.status(200).json({ msg: "School added successfully!!!", result });
          }
        });
      } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

// ------------------get schhool----------------------
const getMySchool = async (req,res) => {
    try {
        const userId = req.params.id;
    
        const schoolsQuery = "SELECT * FROM schools WHERE created_by = ?";
        connection.query(schoolsQuery, [userId], (schoolsError, schoolsResults) => {
          if (schoolsError) {
            console.error("Error retrieving schools:", schoolsError);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            const rolesQuery = "SELECT role FROM users WHERE id = ?";
            connection.query(rolesQuery, [userId], (rolesError, rolesResults) => {
              if (rolesError) {
                console.error("Error retrieving user roles:", rolesError);
                res.status(500).json({ error: "Internal Server Error" });
              } else {
                const response = {
                  schools: schoolsResults,
                  users_roles: rolesResults[0] ? rolesResults[0].role : null,
                };
                res.status(200).json(response);
              }
            });
          }
        });
      } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}



export {
    createSchool,
    getMySchool
}