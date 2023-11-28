ALTER TABLE plans
DROP CONSTRAINT FK_PLANS_ON_GAME,
ADD CONSTRAINT fk_plans_on_game FOREIGN KEY (game_id) REFERENCES games (id) ON DELETE CASCADE;

ALTER TABLE plans
DROP CONSTRAINT FK_PLANS_ON_USER,
ADD CONSTRAINT fk_plans_on_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

ALTER TABLE gatherings
DROP CONSTRAINT FK_GATHERINGS_ON_PLAN,
ADD CONSTRAINT fk_gatherings_on_plan FOREIGN KEY (plan_id) REFERENCES plans (id) ON DELETE CASCADE;

ALTER TABLE comments
DROP CONSTRAINT FK_COMMENTS_ON_PLAN,
ADD CONSTRAINT fk_comments_on_plan FOREIGN KEY (plan_id) REFERENCES plans (id) ON DELETE CASCADE;

ALTER TABLE comments
DROP CONSTRAINT FK_COMMENTS_ON_USER,
ADD CONSTRAINT fk_comments_on_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

ALTER TABLE gathering_users
DROP CONSTRAINT fk_gatuse_on_gathering,
ADD CONSTRAINT fk_gatuse_on_gathering FOREIGN KEY (gathering_id) REFERENCES gatherings (id) ON DELETE CASCADE;

ALTER TABLE gathering_users
DROP CONSTRAINT fk_gatuse_on_user,
ADD CONSTRAINT fk_gatuse_on_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

ALTER TABLE gathering_guests
DROP CONSTRAINT fk_gatgue_on_gathering,
ADD CONSTRAINT fk_gatgue_on_gathering FOREIGN KEY (gathering_id) REFERENCES gatherings (id) ON DELETE CASCADE;

ALTER TABLE gathering_guests
DROP CONSTRAINT fk_gatgue_on_guest,
ADD CONSTRAINT fk_gatgue_on_guest FOREIGN KEY (guest_id) REFERENCES guests (id) ON DELETE CASCADE;

ALTER TABLE user_games
DROP CONSTRAINT fk_usegam_on_game,
ADD CONSTRAINT fk_usegam_on_game FOREIGN KEY (game_id) REFERENCES games (id) ON DELETE CASCADE;

ALTER TABLE user_games
DROP CONSTRAINT fk_usegam_on_user,
ADD CONSTRAINT fk_usegam_on_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

