// database.js
import * as SQLite from "expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";
import { Exercise } from "./types";

const openDatabaseAsync = async (dbName: string) => {
  return SQLite.openDatabaseAsync(dbName);
};

// Function to create a table
export const createTableAsync = async (db: SQLiteDatabase) => {
  try {
    await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS exercises (
                id INTEGER PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                type TEXT,
                variations TEXT,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            );
        `);

    // return await db.execAsync(`
    //     DROP TABLE IF EXISTS exercises;
    //   `);

    console.log("Table created successfully");
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

// Function to add an exercise
export const addExerciseAsync = async (
  db: SQLiteDatabase,
  exercise: Exercise
) => {
  const { name, type, variations } = exercise;

  const variationsString = variations
    ? JSON.stringify(variations)
    : JSON.stringify([]);

  const timestamp = new Date().toISOString();

  try {
    return await db.execAsync(`
          INSERT INTO exercises (name, type, variations, created_at, updated_at) VALUES ('${name}', '${type}', '${variationsString}', '${timestamp}', '${timestamp}');

    `);
  } catch (error) {
    console.error("Error adding exercise:", error);
  }
};

// // Function to update an exercise with the updated_at timestamp
// export const updateExerciseAsync = async (db: SQLite.WebSQLDatabase, id: number, exercise: { name: string, type: string | null, variations?: string[] }) => {
//     const { name, type, variations } = exercise;
//     const variationsString = variations ? JSON.stringify(variations) : JSON.stringify([]);
//     const timestamp = new Date().toISOString();
//     try {
//       await db.execAsync(`
//         UPDATE exercises SET name = ?, type = ?, variations = ?, updated_at = ? WHERE id = ?;
//       `, [name, type, variationsString, timestamp, id]);
//       console.log("Exercise updated successfully");
//     } catch (error) {
//       console.error("Error updating exercise:", error);
//     }
//   };

export const getExercisesAsync = async (db: SQLiteDatabase) => {
  try {
    const result = await db.getAllAsync(`
        SELECT * FROM exercises;
      `);

    const exercises: Exercise[] = result.map((item: any) => ({
      ...item,
      variations: JSON.parse(item.variations || "[]"),
    }));

    return exercises;
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};

export const exerciseExistsAsync = async (
  db: SQLiteDatabase,
  name: string
): Promise<boolean> => {
  try {
    const result = await db.getFirstAsync(`
        SELECT * FROM exercises WHERE name = '${name}';
      `);
    return !!result;
  } catch (error) {
    console.error("Error checking exercise existence:", error);
    return false;
  }
};

export default openDatabaseAsync;
