/*INSERT INTO profile (...) VALUES (...);*/

CREATE TABLE IF NOT EXISTS profile (
  id SERIAL PRIMARY KEY,
  firebase_id VARCHAR(50) NOT NULL,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  userName VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(75) UNIQUE NOT NULL,
  homePhone BIGINT,
  mobile BIGINT,
  preferredContact INT DEFAULT 0,
  city VARCHAR(75) NOT NULL,
  state VARCHAR(5) NOT NULL,
  zip INT,
  address1 VARCHAR(255),
  address2 VARCHAR(255),
  role INT NOT NULL,
  organization VARCHAR(255)
);

CREATE INDEX profile_get ON profile (email) INCLUDE
(id, firebase_id, firstName, lastName, userName, email, homePhone,
mobile, preferredContact, city, state, zip, address1, address2, role, organization);

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  requestType INT NOT NULL,
  category VARCHAR(30) NOT NULL,
  title VARCHAR(50) NOT NULL,
  body VARCHAR(255),
  date BIGINT NOT NULL,
  city VARCHAR(50),
  state VARCHAR(5),
  photo VARCHAR(255),
  completed BOOLEAN DEFAULT false,
  recipient_id INT,
  reported BOOLEAN DEFAULT false,
  FOREIGN KEY (user_id)
    REFERENCES profile(id),
  FOREIGN KEY (recipient_id)
    REFERENCES profile(id)
);

CREATE INDEX posts_get ON posts(category) INCLUDE (
  id, title, body, user_id, date
);

CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  userName VARCHAR(50),
  post_id INT NOT NULL,
  thread_id INT,
  body VARCHAR(255),
  date BIGINT NOT NULL,
  reported BOOLEAN DEFAULT false,
  FOREIGN KEY (post_id)
    REFERENCES posts(id)
);

CREATE INDEX comments_get ON comments(post_id) INCLUDE (
  id, username, body, thread_id, date
);

