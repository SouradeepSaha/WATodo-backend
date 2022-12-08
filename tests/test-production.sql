--feature 1: insert a new member at sign up
INSERT INTO cs348.Users (username, email, password, name) VALUES
("johnbaker23", "johnbaker23@gmail.com", "PasS@Wor93,v," "John Baker");

--feature 2: check whether user with credentials exists at log in
SELECT * FROM Users
WHERE email = “richarddavison566872@yahoo.com” AND password = “$2a$08$VaBjCFUh.559weL1BG9Uu.QDfFNhCcskTX2w3jHmjGflFhTnfzcIW”;

--feature 3: delete tasks
DELETE FROM cs348.Tasks WHERE task_id= “11000”;

--feature 4: update the task in Tasks
UPDATE Tasks SET task_name = 'NoFrills shoppings' WHERE task_id = 12367;

--feature 5: display tasks with specific tag
create view feature5TasksWithTag AS
select TaskTaskId
from TagTasks
where TagTagId = 3969;

select * from Tasks, feature5TasksWithTag
where Tasks.Task_id = feature5TasksWithTag.TaskTaskId;

--feature 6: display tasks without any tag
select * from Tasks
where task_id not in (
select TaskTaskId as task_id from TagTasks
) and UserUserId = 436;
