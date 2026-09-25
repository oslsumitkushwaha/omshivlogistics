CREATE TABLE IF NOT EXISTS lanes (
  id BIGSERIAL PRIMARY KEY,
  from_city TEXT NOT NULL,
  to_city TEXT NOT NULL,
  transit_days TEXT NOT NULL DEFAULT '',
  frequency TEXT NOT NULL DEFAULT '',
  vehicle TEXT NOT NULL DEFAULT '',
  note TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS inquiries (
  id BIGSERIAL PRIMARY KEY,
  reference TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',
  service TEXT NOT NULL DEFAULT '',
  vehicle TEXT NOT NULL DEFAULT '',
  from_city TEXT NOT NULL,
  to_city TEXT NOT NULL,
  load_details TEXT NOT NULL DEFAULT '',
  pickup_date TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  source TEXT NOT NULL DEFAULT 'landing-page-enquiry-form',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries (created_at DESC);
