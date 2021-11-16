-- insert test data from .csv files into testdb

-- \copy <target_table>
-- from <file.csv>

BEGIN;
\copy snome from '/setup/test_data/snome.csv' delimiter ',' csv header;
\copy snome_user from '/setup/test_data/user.csv' delimiter ',' csv header;
\copy snome_like from '/setup/test_data/like.csv' delimiter ',' csv header;
COMMIT;
