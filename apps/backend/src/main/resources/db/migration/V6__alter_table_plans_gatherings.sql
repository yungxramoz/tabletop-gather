ALTER TABLE plans
  ADD COLUMN description TEXT,
  ADD COLUMN player_limit INT;

ALTER TABLE gatherings
  DROP COLUMN end_time;
