const { sql } = require("@vercel/postgres");

const SEEDED_LANES = [
  { from_city: "Gandhidham", to_city: "Ahmedabad", transit_days: "1-2 days", frequency: "Daily", vehicle: "32FT SXL / MXL, 10-tyre", note: "Hub-to-hub, ICD & warehouse movement" },
  { from_city: "Kandla / Mundra Port", to_city: "Delhi NCR", transit_days: "4-5 days", frequency: "Weekly", vehicle: "32FT MXL, Trailer", note: "Port-linked container & bulk cargo" },
  { from_city: "Gandhidham", to_city: "Mumbai / JNPT", transit_days: "2-3 days", frequency: "3-4 per week", vehicle: "32FT MXL, Multi-axle", note: "Export-import and distribution freight" },
  { from_city: "Kutch (Bhuj / Anjar)", to_city: "Jaipur / North India", transit_days: "3-4 days", frequency: "Weekly", vehicle: "Open-body, Trailer", note: "Manufacturing raw material & machinery" },
  { from_city: "Gandhidham", to_city: "Hyderabad / Bengaluru", transit_days: "5-6 days", frequency: "Weekly", vehicle: "32FT MXL, Trailer", note: "Long-haul heavy-duty movement" },
  { from_city: "Gandhidham", to_city: "Kolkata", transit_days: "7-8 days", frequency: "Fortnightly", vehicle: "Trailer, Multi-axle", note: "Pan India bulk dispatch" }
];

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const requestedLimit = Number.parseInt(req.query.limit, 10);
  const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 100) : 100;

  try {
    const result = await sql`
      SELECT id, from_city, to_city, transit_days, frequency, vehicle, note
      FROM lanes
      ORDER BY id ASC
      LIMIT ${limit}
    `;
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    // The static seed keeps the public lanes section useful until Postgres is connected.
    return res.status(200).json({ data: SEEDED_LANES, source: "seed" });
  }
};
