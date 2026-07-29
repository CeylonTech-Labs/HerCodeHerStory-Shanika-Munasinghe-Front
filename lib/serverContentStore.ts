import mysql, { type RowDataPacket } from "mysql2/promise";

const CONTENT_ID = "main";

function getDatabaseUrl() {
  return process.env.DATABASE_URL;
}

async function getConnection() {
  const databaseUrl = getDatabaseUrl();

  if (!databaseUrl) {
    return null;
  }

  return mysql.createConnection(databaseUrl);
}

export async function readSharedContent() {
  const connection = await getConnection();

  if (!connection) {
    return null;
  }

  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS frontend_content_store (
        id VARCHAR(64) PRIMARY KEY,
        data LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    const [rows] = await connection.execute<RowDataPacket[]>(
      "SELECT data FROM frontend_content_store WHERE id = ? LIMIT 1",
      [CONTENT_ID]
    );

    if (!rows.length) {
      return null;
    }

    return JSON.parse(String(rows[0].data));
  } finally {
    await connection.end();
  }
}

export async function writeSharedContent(data: unknown) {
  const connection = await getConnection();

  if (!connection) {
    throw new Error("DATABASE_URL is not configured.");
  }

  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS frontend_content_store (
        id VARCHAR(64) PRIMARY KEY,
        data LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.execute(
      `INSERT INTO frontend_content_store (id, data)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE data = VALUES(data)`,
      [CONTENT_ID, JSON.stringify(data)]
    );
  } finally {
    await connection.end();
  }
}
