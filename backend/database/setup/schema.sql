-- order matters for setting FK relations

-- ski resort
CREATE TABLE "location" (
    "id" serial   PRIMARY KEY,
    "name" text   NOT NULL,
    "longitude" float   NOT NULL,
    "latitude" float   NOT NULL,
    "city" text   NOT NULL,
    "state" text   NOT NULL,
    "active" boolean   NOT NULL,
    "featured" boolean   NOT NULL,
    "cover_image" text   NOT NULL,
    "description" text   NOT NULL,
    "notable_features" text   NOT NULL,
    "links" text   NOT NULL
);

CREATE TABLE "snome_user" (
    "id" serial PRIMARY KEY,
    "location_id" int REFERENCES "location",
    "name" text   NOT NULL,
    "travel_start" varchar   NOT NULL,  -- should be nullable
    "travel_end" varchar   NOT NULL,    -- should be nullable
    "age" int   NOT NULL,
    "user_phone" bigint   NOT NULL,
    "user_photo" text   NOT NULL,  -- should be nullable
    "video_tour" text   NOT NULL,  -- should be nullable
    "about" text   NOT NULL,
    "email" text   NOT NULL,
    "mailing_address" text   NOT NULL,  -- separate into address fields (separate)  
    "residential_address" text   NOT NULL  -- separate into address fields (separate)
    -- add password
    -- is active flag
);

CREATE TABLE "snome" (
    "id" serial PRIMARY KEY,
    "owner_id" int  NOT NULL REFERENCES "snome_user",
    "location_id" int NOT NULL REFERENCES "location",
    "header" text   NOT NULL,
    "time_to_mountain" text   NOT NULL,
    "mountain_access" text   NOT NULL,
    "availability_start" varchar   NOT NULL,  -- should be date values, a series of dates
    "availability_end" varchar   NOT NULL,
    "address" text   NOT NULL,
    "bedrooms" numeric(3,1)   NOT NULL,
    "bathrooms" numeric(3,1)   NOT NULL,
    "number_of_beds" int   NOT NULL,
    "perks" text   NOT NULL,
    "description" text   NOT NULL
);

CREATE TABLE "snome_like" (
    "id" serial PRIMARY KEY,
    "snome_user_id" int NOT NULL REFERENCES "snome_user",
    "snome_id" int NOT NULL REFERENCES "snome",
    "has_been_read" boolean  DEFAULT false NOT NULL
);

CREATE TABLE "match" (
    "id" serial PRIMARY KEY,
    "snome_user_id" int NOT NULL REFERENCES "snome_user",
    "snome_id" int NOT NULL REFERENCES "snome",
    "has_been_read" boolean  DEFAULT false NOT NULL
);

CREATE TABLE "message" (
    "id" serial PRIMARY KEY,
    "recipient_id" int NOT NULL REFERENCES "snome_user",
    "sender_id" int NOT NULL REFERENCES "snome_user",
    "time" timestamp   NOT NULL,
    "message_text" text   NOT NULL,
    "has_been_read" boolean   NOT NULL
);

CREATE TABLE "trip" (
    "id" serial PRIMARY KEY,
    "trip_start" date   NOT NULL,
    "trip_end" date   NOT NULL,
    "snome_user_id" int NOT NULL REFERENCES "snome_user",
    "snome_id" int NOT NULL REFERENCES "snome"
);

CREATE TABLE "snome_photo" (
    "id" serial PRIMARY KEY,
    "snome_id" int  NOT NULL REFERENCES "snome",
    "url" text   NOT NULL
);

CREATE TABLE "review" (
    "id" serial PRIMARY KEY,
    "snome_user_id" int NOT NULL REFERENCES "snome_user",
    "snome_id" int NOT NULL REFERENCES "snome",
    "date" date   NOT NULL,
    "stars" int   NOT NULL,
    "review" text   NOT NULL
);

CREATE TABLE "location_media" (
    "id" serial PRIMARY KEY,
    "location_id" int NOT NULL REFERENCES "location",
    "type" text   NOT NULL,
    "file_name" text   NOT NULL,
    "caption" text   NOT NULL
);
