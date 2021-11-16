-- insert test data from .csv files into testdb

-- TEMPLATE
-- \copy <target_table>
-- from <file.csv>

-- order is important to satisfy FK constraints

BEGIN;
\copy location from '/setup/test_data/location.csv' delimiter ',' csv header;
\copy snome_user from '/setup/test_data/snome_user.csv' delimiter ',' csv header;
\copy snome from '/setup/test_data/snome.csv' delimiter ',' csv header;
\copy snome_like from '/setup/test_data/snome_like.csv' delimiter ',' csv header;
\copy match from '/setup/test_data/match.csv' delimiter ',' csv header;
\copy message from '/setup/test_data/message.csv' delimiter ',' csv header;
\copy trip from '/setup/test_data/trip.csv' delimiter ',' csv header;
\copy snome_photo from '/setup/test_data/snome_photo.csv' delimiter ',' csv header;
\copy review from '/setup/test_data/review.csv' delimiter ',' csv header;
\copy location_media from '/setup/test_data/location_media.csv' delimiter ',' csv header;
COMMIT;

