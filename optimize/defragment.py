# check_fragment() checks for anby fragmentation in the database
def check_fragment():
    import mysql.connector
    
    con = mysql.connector.connect(user='webapp', password='cs348user',
                                  host='129.153.61.57',
                                  database='cs348')
    c = con.cursor()
    spaces = []    
    # display how much unused space are available in every table
    # display list of all tables that has minimum of 500MB of unused space
    c.execute("""select table_name, data_length, data_free, 
              round(data_length/1024/1024) as data_length_mb, 
              round(data_free/1024/1024) as data_free_mb 
              from information_schema.tables
              where round(data_free/1024/1024) > 500 
              order by data_free_mb;""")
    
    # append info about every defragemented table into a list 
    for row in c:
        spaces.append(row) 
        # print(row)
    # print(len(spaces))
    
    c.close()
    return spaces

def defragment_table(table):
    import mysql.connector
    
    con = mysql.connector.connect(user='webapp', password='cs348user',
                                  host='129.153.61.57',
                                  database='cs348')
    c = con.cursor()
    
    sql = "OPTIMIZE TABLE"
    sql += str(table)
    print(sql)
    c.execute(sql)
    c.close()
    return 1

def defragment(fragmented):
    if (len(fragmented) == 0):
        # print("Nothing to defragment")
        return 0
    else:
        ctr = 0
        for i in range(len(fragmented)):
            ctr += defragment_table(fragmented[i][0])  
        return ctr 
            
gaps = check_fragment()
print("Tables optimized: ", defragment(gaps))
