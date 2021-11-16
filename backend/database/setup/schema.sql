-- execute schema initialization as all or nothing db transactions
BEGIN;

CREATE TABLE "snome" (
    "id" serial   NOT NULL,
    "owner_id" int   NOT NULL,
    "location_id" int   NOT NULL,
    "header" text   NOT NULL,
    "time_to_mountain" text   NOT NULL,
    "mountain_access" text   NOT NULL,
    "availability_start" varchar   NOT NULL,
    "availability_end" varchar   NOT NULL,
    "address" text   NOT NULL,
    "bedrooms" numeric(3,1)   NOT NULL,
    "bathrooms" numeric(3,1)   NOT NULL,
    "number_of_beds" int   NOT NULL,
    "perks" text   NOT NULL,
    "description" text   NOT NULL
);

CREATE TABLE "snome_user" (
    "id" serial   NOT NULL,
    "location_id" int   NOT NULL,
    "name" text   NOT NULL,
    "travel_start" varchar   NOT NULL,
    "travel_end" varchar   NOT NULL,
    "age" int   NOT NULL,
    "user_phone" int   NOT NULL,
    "user_photo" text   NOT NULL,
    "video_tour" text   NOT NULL,
    "about" text   NOT NULL,
    "email" text   NOT NULL,
    "mailing_address" text   NOT NULL,
    "residential_address" text   NOT NULL,
    CONSTRAINT "pk_snome_user" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "location" (
    "id" serial   NOT NULL,
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
    "links" text   NOT NULL,
    CONSTRAINT "pk_location" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "snome_like" (
    "id" serial   NOT NULL,
    "snome_user_id" int   NOT NULL,
    "snome_id" int   NOT NULL,
    "has_been_read" boolean  DEFAULT false NOT NULL,
    CONSTRAINT "pk_snome_like" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "match" (
    "id" serial   NOT NULL,
    "snome_user_id" int   NOT NULL,
    "snome_id" int   NOT NULL,
    "has_been_read" boolean  DEFAULT false NOT NULL,
    CONSTRAINT "pk_match" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "message" (
    "id" serial   NOT NULL,
    "recipient" int   NOT NULL,
    "sender" int   NOT NULL,
    "time" timestamp   NOT NULL,
    "message_text" text   NOT NULL,
    "has_been_read" boolean   NOT NULL,
    CONSTRAINT "pk_message" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "trip" (
    "id" serial   NOT NULL,
    "trip_start" date   NOT NULL,
    "trip_end" date   NOT NULL,
    "snome_user_id" int   NOT NULL,
    "snome_id" int   NOT NULL,
    CONSTRAINT "pk_trip" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "snome_photo" (
    "id" serial   NOT NULL,
    "snome_id" int   NOT NULL,
    "filename" text   NOT NULL,
    "caption" varchar   NOT NULL,
    CONSTRAINT "pk_snome_photo" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "review" (
    "id" serial   NOT NULL,
    "snome_user_id" int   NOT NULL,
    "snome_id" int   NOT NULL,
    "date" date   NOT NULL,
    "stars" int   NOT NULL,
    "review" text   NOT NULL,
    CONSTRAINT "pk_review" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "location_media" (
    "id" serial   NOT NULL,
    "location_id" int   NOT NULL,
    "type" text   NOT NULL,
    "file_name" text   NOT NULL,
    "caption" text   NOT NULL,
    CONSTRAINT "pk_location_media" PRIMARY KEY (
        "id"
     )
);

COMMIT;

BEGIN;

ALTER TABLE "snome" ADD CONSTRAINT "fk_snome_owner_id" FOREIGN KEY("owner_id")
REFERENCES "snome_user" ("id");

ALTER TABLE "snome" ADD CONSTRAINT "fk_snome_location_id" FOREIGN KEY("location_id")
REFERENCES "location" ("id");

ALTER TABLE "snome_like" ADD CONSTRAINT "fk_snome_like_snome_user_id" FOREIGN KEY("snome_user_id")
REFERENCES "snome_user" ("id");

ALTER TABLE "snome_like" ADD CONSTRAINT "fk_snome_like_snome_id" FOREIGN KEY("snome_id")
REFERENCES "snome" ("id");

ALTER TABLE "match" ADD CONSTRAINT "fk_match_snome_user_id" FOREIGN KEY("snome_user_id")
REFERENCES "snome_user" ("id");

ALTER TABLE "match" ADD CONSTRAINT "fk_match_snome_id" FOREIGN KEY("snome_id")
REFERENCES "snome" ("id");

ALTER TABLE "message" ADD CONSTRAINT "fk_message_recipient" FOREIGN KEY("recipient")
REFERENCES "snome_user" ("id");

ALTER TABLE "message" ADD CONSTRAINT "fk_message_sender" FOREIGN KEY("sender")
REFERENCES "snome_user" ("id");

ALTER TABLE "trip" ADD CONSTRAINT "fk_trip_snome_user_id" FOREIGN KEY("snome_user_id")
REFERENCES "snome_user" ("id");

ALTER TABLE "trip" ADD CONSTRAINT "fk_trip_snome_id" FOREIGN KEY("snome_id")
REFERENCES "snome" ("id");

ALTER TABLE "snome_photo" ADD CONSTRAINT "fk_snome_photo_snome_id" FOREIGN KEY("snome_id")
REFERENCES "snome" ("id");

ALTER TABLE "review" ADD CONSTRAINT "fk_review_snome_user_id" FOREIGN KEY("snome_user_id")
REFERENCES "snome_user" ("id");

ALTER TABLE "review" ADD CONSTRAINT "fk_review_snome_id" FOREIGN KEY("snome_id")
REFERENCES "snome" ("id");

ALTER TABLE "location_media" ADD CONSTRAINT "fk_location_media_location_id" FOREIGN KEY("location_id")
REFERENCES "location" ("id");

COMMIT;