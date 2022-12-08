--feature 1: insert a new member at sign up
INSERT INTO Users (username, email, password, name) VALUES
("johnsmith", "johnsmith@gmail.com", PasS@Wor93v, "John Smith");

--feature 2: check whether user with credentials exists at log in
SELECT * FROM Users
WHERE email = "elijones662283@gmail.com" AND password = "$2a$08$yPa4CGd1Injn8ebfJjQeoeAWAXqcoh4ggZ79FG5YuH15xZ.ZkEc.m";

--feature 3: delete tasks
DELETE FROM cs348.Tasks WHERE task_id= "60";

--feature 4: update the task in Tasks
UPDATE cs348.Tasks SET task_name = 'modified task name' WHERE task_id = 123;
UPDATE cs348.Tasks SET task_name = 'modified task name' WHERE task_id = 124;

--feature 5: display tasks with specific tag
create view TasksWithTag AS
select TaskTaskId
from TagTasks
where TagTagId = 10;

select * from Tasks, TasksWithTag
where Tasks.Task_id = TasksWithTag.TaskTaskId;

--feature 6: display tasks without any tag
select * from Tasks
where task_id not in (
select TaskTaskId as task_id from TagTasks
) and UserUserId = 97;
