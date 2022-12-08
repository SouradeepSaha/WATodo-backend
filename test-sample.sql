--feature 1: insert a new member at sign up
INSERT INTO Users (username, email, password, name) VALUES
("johnsmith", "johnsmith@gmail.com", PasS@Wor93v, "John Smith");
 
--feature 2: check whether user with credentials exists at log in
SELECT username FROM Users where username like "andrewdawson178908";

--feature 3: delete tasks
DELETE FROM cs348.Tasks WHERE task_id= "1435";

--feature 4: update the user in
UPDATE cs348.Tasks SET task_name = 'modified task name' WHERE task_id = 1435;
UPDATE cs348.Tasks SET task_name = 'modified task name' WHERE task_id = 1436;

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
) and UserUserId = 103;

