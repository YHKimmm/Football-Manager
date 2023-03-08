CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_uuid UUID UNIQUE,
  fullname STRING UNIQUE,
  email STRING NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS coaches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_uuid UUID UNIQUE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  fullname STRING UNIQUE,
  bio STRING,
  profile_picture_url STRING
);

CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_uuid UUID UNIQUE,
  coach_id UUID NOT NULL REFERENCES coaches(id) ON DELETE CASCADE,
  name STRING NOT NULL,
  logo_url STRING
);

CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_uuid UUID UNIQUE,
  name STRING NOT NULL,
  position STRING NOT NULL,
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE
);