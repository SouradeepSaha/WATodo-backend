--feature 1: insert a new member at sign up
INSERT INTO Members (email, username_id, password, first_name, last_name) values ('csuser@cs.com', 'myusername', 'sfs3r2', 'Bill', 'Musk');

--feature 2: check whether user with credentials exists at log in
SELECT * FROM Members WHERE first_name='Gch' AND last_name='viTwabHQ';

--feature 3: delete tasks
DELETE FROM Task WHERE task_id=3;

--feature 4: update the user in
UPDATE Task SET task_name='Better Name' WHERE task_id=7;
