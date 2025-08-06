import database from "infra/database.js";
import { version } from "react";

async function status(request, response) {
  const dbName = process.env.POSTGRES_DB;
  const updatedAt = new Date().toISOString();

  const dbVersionResult = await database.query("SHOW server_version;");
  const dbVersionValue = dbVersionResult.rows[0].server_version;

  const dbMaxConectionsResult = await database.query("SHOW max_connections;");
  const dbMaxConectionsValue = parseInt(
    dbMaxConectionsResult.rows[0].max_connections,
  );

  const dbUsedConectionsResult = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [dbName],
  });
  const dbUsedConectionsValues = dbUsedConectionsResult.rows[0].count;

  console.log(dbUsedConectionsValues);
  response.status(200).json({
    updated_at: updatedAt,
    dependecies: {
      database: {
        version: dbVersionValue,
        max_connections: dbMaxConectionsValue,
        used_connections: dbUsedConectionsValues,
      },
    },
  });
}

export default status;
