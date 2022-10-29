import requests
import json
import datetime
from random import randint

TODO_API = 'https://jsonplaceholder.typicode.com/todos'

todos = requests.get(TODO_API).json()
status=["COMPLETED", "IN PROGRESS", "NOT STARTED"]

def get_random_date(YYYY, MM, DD):
	startdate=datetime.date(YYYY,MM,DD)
	return startdate+datetime.timedelta(randint(1,365))

f = open("task.sql", "w")
f.write("INSERT INTO todo_task (task_name, task_description, status, task_created, task_started, task_due, priority, user_id)\nVALUES")
for ind,todo in enumerate(todos):
	f.write("(")
	f.write(f"'My Task {ind}', '{todo['title']}', '{status[randint(0,2)]}', '{get_random_date(1990, 1, 2)}', '{get_random_date(1990, 3, 2)}', '{get_random_date(1990, 4, 5)}', {randint(1,5)}, '{todo['userId']}'")
	f.write(")")
	if ind != len(todos)-1:
		f.write(",\n")
f.close()