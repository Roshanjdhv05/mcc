-- Create visitor counter table
CREATE TABLE IF NOT EXISTS site_visitors (
  id INTEGER PRIMARY KEY DEFAULT 1,
  count BIGINT NOT NULL DEFAULT 1147,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert initial row if it doesn't exist
INSERT INTO site_visitors (id, count)
VALUES (1, 1147)
ON CONFLICT (id) DO NOTHING;

-- Create an RPC function for atomic increment (prevents race conditions)
CREATE OR REPLACE FUNCTION increment_visitor_count()
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_count BIGINT;
BEGIN
  UPDATE site_visitors
  SET count = count + 1,
      updated_at = NOW()
  WHERE id = 1
  RETURNING count INTO new_count;
  
  RETURN new_count;
END;
$$;

-- Allow public (anon) to call this function and read the table
GRANT EXECUTE ON FUNCTION increment_visitor_count() TO anon;
GRANT SELECT ON site_visitors TO anon;
GRANT UPDATE ON site_visitors TO anon;
