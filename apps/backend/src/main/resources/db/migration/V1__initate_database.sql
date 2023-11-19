CREATE TABLE users (
  id UUID NOT NULL,
   username VARCHAR(50) NOT NULL,
   first_name VARCHAR(255) NOT NULL,
   last_name VARCHAR(255) NOT NULL,
   password_hash VARCHAR(255) NOT NULL,
   email VARCHAR(320) NOT NULL,
   date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   CONSTRAINT pk_users PRIMARY KEY (id)
);

ALTER TABLE users ADD CONSTRAINT uc_users_email UNIQUE (email);

CREATE TABLE guests (
  id UUID NOT NULL,
   name VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL,
   date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   CONSTRAINT pk_guests PRIMARY KEY (id)
);

CREATE TABLE games (
  id UUID NOT NULL,
   name VARCHAR(255) NOT NULL,
   description VARCHAR(4000),
   min_player INTEGER NOT NULL,
   max_player INTEGER,
   image_url VARCHAR(500),
   date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   CONSTRAINT pk_games PRIMARY KEY (id)
);

CREATE TABLE plans (
  id UUID NOT NULL,
   name VARCHAR(255) NOT NULL,
   is_private BOOLEAN NOT NULL,
   user_id UUID,
   game_id UUID,
   date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   CONSTRAINT pk_plans PRIMARY KEY (id)
);

ALTER TABLE plans ADD CONSTRAINT FK_PLANS_ON_GAME FOREIGN KEY (game_id) REFERENCES games (id);

ALTER TABLE plans ADD CONSTRAINT FK_PLANS_ON_USER FOREIGN KEY (user_id) REFERENCES users (id);

CREATE TABLE gatherings (
  id UUID NOT NULL,
   date date NOT NULL,
   start_time time WITHOUT TIME ZONE NOT NULL,
   end_time time WITHOUT TIME ZONE NOT NULL,
   plan_id UUID,
   date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   CONSTRAINT pk_gatherings PRIMARY KEY (id)
);

ALTER TABLE gatherings ADD CONSTRAINT FK_GATHERINGS_ON_PLAN FOREIGN KEY (plan_id) REFERENCES plans (id);

CREATE TABLE comments (
  id UUID NOT NULL,
   comment VARCHAR(4000),
   user_id UUID,
   plan_id UUID,
   date_created TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   last_updated TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   CONSTRAINT pk_comments PRIMARY KEY (id)
);

ALTER TABLE comments ADD CONSTRAINT FK_COMMENTS_ON_PLAN FOREIGN KEY (plan_id) REFERENCES plans (id);

ALTER TABLE comments ADD CONSTRAINT FK_COMMENTS_ON_USER FOREIGN KEY (user_id) REFERENCES users (id);

CREATE TABLE gathering_users (
  gathering_id UUID NOT NULL,
   user_id UUID NOT NULL,
   CONSTRAINT pk_gatheringusers PRIMARY KEY (gathering_id, user_id)
);

ALTER TABLE gathering_users ADD CONSTRAINT fk_gatuse_on_gathering FOREIGN KEY (gathering_id) REFERENCES gatherings (id);

ALTER TABLE gathering_users ADD CONSTRAINT fk_gatuse_on_user FOREIGN KEY (user_id) REFERENCES users (id);

CREATE TABLE gathering_guests (
  gathering_id UUID NOT NULL,
   guest_id UUID NOT NULL,
   CONSTRAINT pk_gatheringguests PRIMARY KEY (gathering_id, guest_id)
);

ALTER TABLE gathering_guests ADD CONSTRAINT fk_gatgue_on_gathering FOREIGN KEY (gathering_id) REFERENCES gatherings (id);

ALTER TABLE gathering_guests ADD CONSTRAINT fk_gatgue_on_guest FOREIGN KEY (guest_id) REFERENCES guests (id);

CREATE TABLE user_games (
  game_id UUID NOT NULL,
   user_id UUID NOT NULL,
   CONSTRAINT pk_usergames PRIMARY KEY (game_id, user_id)
);

ALTER TABLE user_games ADD CONSTRAINT fk_usegam_on_game FOREIGN KEY (game_id) REFERENCES games (id);

ALTER TABLE user_games ADD CONSTRAINT fk_usegam_on_user FOREIGN KEY (user_id) REFERENCES users (id);

