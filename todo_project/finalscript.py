from asyncio import tasks
import random 
from datetime import datetime
from datetime import date
from random import randint
import string
import secrets
import csv
from venv import create
import pandas as pd

# global variables - PKs
uid = 500
user_tasks = 12  # max tasks a user can have

# tables
user_name = []
users_table = []
tasks_table = []
tags_table = []

def get_username(char_num):
    return ''.join(random.choice(string.ascii_letters) for _ in range(char_num))
   
def get_tasks(char_num):
    tasks = string.ascii_letters + " "
    return (''.join(random.choice(tasks) for _ in range(char_num))).lower()

def set_username():
    for i in range(uid):
        new_user = []
        new_user.append(i)
        new_user.append(get_username(random.randint(4, 7)))
        user_name.append(new_user)
    
def get_pwd():
    letters = string.ascii_letters
    digits = string.digits
    special_chars = string.punctuation
    alphabet = letters + digits + special_chars
    pwd = ''
    pwd_length = random.randint(8, 16)
    for i in range(pwd_length):
        pwd += ''.join(secrets.choice(alphabet))
    return pwd

def createMembers():
    # uid, email, pwd,  
    for i in range(uid):
        user_row = []
        username_curr = user_name[i][1]
        user_row.append(username_curr)    # username
        user_row.append(username_curr+"@gmail.com")   # email
        first_name = str(get_username(random.randint(3, 10)))  # first name
        user_row.append(first_name)    # username
        last_name = str(get_username(random.randint(2, 11))) 
        user_row.append(last_name)    # last name
        user_row.append(get_pwd())    # pwd
        users_table.append(user_row)  # add the row to the table

tasks_per_user_all = []

def createTasks():
    tasks_id = 0
    # tasks per user: 
    for i in range(uid):
        tasks_per_user = random.randint(0, user_tasks)
        tasks_per_user_all_indiv = []
        tasks_per_user_all_indiv.append(user_name[i][1])        # add username
        tasks_per_user_all_indiv.append(tasks_per_user)         # add tasks per user
        task_names = []
        for j in range(tasks_per_user):
            task_row = []
            task_row.append(user_name[i][1]) # username
            task_row.append(tasks_id) # task_id
            task_row.append(random.randint(1, 10)) # priority
            task_row.append(None)
            task_row.append(None)
            task_row.append(None)
            task_row.append('') # status
            task_name_new = get_tasks(random.randint(7, 15))
            task_row.append(task_name_new) # task_name
            task_names.append(task_name_new)
            task_row.append(get_tasks(random.randint(10, 30))) # task_description
            tasks_table.append(task_row)
            tasks_id = tasks_id + 1
        tasks_per_user_all_indiv.append(task_names)
        tasks_per_user_all.append(tasks_per_user_all_indiv)
            
def createTags():
    for i in range(len(tasks_per_user_all)):            # go through every user
        # print("here")
        task_names_for_this_user = tasks_per_user_all[i][1]
        for j in range(task_names_for_this_user):  # go through each user's tasks
            # print("here")
            # tags_row = []                       
            if (random.randint(1, 7) < 4):              # gets a tag
                potential_tags = random.randint(0, 5)
                for k in range(potential_tags):         # random tag names
                    # print("here")
                    tags_row = []                       
                    # some tags this user can have:
                    some_tags = []
                    some_tags.append(get_tasks(random.randint(4, 10)))
                    # tags_row.append(tasks_per_user_all[i][0]) # add  uid
                    tags_row.append(user_name[i][1])                                    # add  username
                    tags_row.append(some_tags[random.randint(0, len(some_tags) - 1)])   # add tag
                    # get the task name:
                    tags_row.append(tasks_per_user_all[i][2][j])
                    tags_row.append("blue")                                             # colour
                    # print("tags_row", tags_row)
                tags_table.append(tags_row)

def print_to_csv_with_header(users, tasks, tags):
    users.insert(0, ['Username', 'Email', 'First Name', 'Last Name', 'Password'])
    df_users = pd.DataFrame(users)
    tasks.insert(0, ['Username', 'task_id', 'priority', 'date created', 'date started', 'date completed', 'status', 'task name', 'task description'])
    df_tasks = pd.DataFrame(tasks) 
    tags.insert(0, ['Username', 'tag', 'task name', 'colour'])
    df_tags = pd.DataFrame(tags) 
    df_users.to_csv('users_with_col_name.csv', index=False, header=True)
    df_tasks.to_csv('tasks_with_col_name.csv', index=False, header=True)
    df_tags.to_csv('tags_with_col_name.csv', index=False, header=True)

def print_to_csv_without(users, tasks, tags):
    df_users = pd.DataFrame(users)
    df_tasks = pd.DataFrame(tasks) 
    df_tags = pd.DataFrame(tags) 
    df_users.to_csv('users_without.csv', index=False, header=True)
    df_tasks.to_csv('tasks_without.csv', index=False, header=True)
    df_tags.to_csv('tags_without.csv', index=False, header=True)

# function calls
set_username()
createMembers()
createTasks()
createTags()

# prints
print("Users: ")
for i in range(uid):
    print(users_table[i])
    
print("Tasks: ")
for i in range(len(tasks_table)):
    print(tasks_table[i])
    
print("Tags: ")
for i in range(len(tags_table)):
    print(tags_table[i])
    
print_to_csv_without(users_table, tasks_table, tags_table)
print("Printed to CSV files without col names")

print_to_csv_with_header(users_table, tasks_table, tags_table)
print("Printed to CSV files with col names")
