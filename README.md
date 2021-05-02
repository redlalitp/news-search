# news-search

The database consists of 50,000 records of news headlines from india newspapers.
You can find the source csv in repo.
In application, when type in query, you get suggestions for headlines and if you press enter, matching search results are shown.

Demo:
![alt text](./news-search-home.png){:height="30%" width="30%"}
![alt text](./news-search-suggestion.png){:height="30%" width="30%"}
![alt text](./news-search-results-page1.png){:height="30%" width="30%"}
![alt text](./news-search-results-page2.png){:height="30%" width="30%"}

This application uses:
1. Java Spring Boot for backend
2. ReactJS for frontend
3. HSQLDB as database

Requirements:

    jdk 1.8
    npm
    hsqldb


## **To run the application:** 
Clone the repository on your machine

A. Start the HSQL server

1. Download HSQLDB if not have already
        https://sourceforge.net/projects/hsqldb/files/latest/download
        and extract to a folder
2. copy files from hsql/ to your extracted hsqldb directory hsqldb/data/ directory
3. In your hsqldb directory create `server.properties` file and add following lines
   
    `server.database.0 = file:data/mydb`
   
    `server.dbname.0 = mydb`
4. To start server run following command:
   
   `java -cp lib/hsqldb.jar org.hsqldb.server.Server --database.0 file:data/mydb;hsqldb.lock_file=false --dbname.0 mydb --silent=false`
   
    you should see something similar output like this:
   
    `Lalits-MacBook-Pro-2:hsqldb redworld$ java -cp lib/hsqldb.jar org.hsqldb.server.Server --database.0 file:data/mydb;hsqldb.lock_file=false --dbname.0 mydb --silent=false`

    `[Server@57855c9a]: Startup sequence initiated from main() method`
   
    `[Server@57855c9a]: Loaded properties from [/Users/redworld/hsqldb-2.6.0/hsqldb/server.properties]`

    `[Server@57855c9a]: Initiating startup sequence...`

    `[Server@57855c9a]: Server socket opened successfully in 24 ms.`

    `[Server@57855c9a]: Database [index=0, id=0, db=file:data/mydb, alias=mydb] opened successfully in 954 ms.`

    `[Server@57855c9a]: Startup sequence completed in 1008 ms.`

    `[Server@57855c9a]: 2021-04-30 19:40:48.018 HSQLDB server 2.6.0 is online on port 9001`

    `[Server@57855c9a]: To close normally, connect and execute SHUTDOWN SQL`

    `[Server@57855c9a]: From command line, use [Ctrl]+[C] to abort abruptly`

B. Start backend server:

1. Goto `news-search` directory
2. Run following command to start spring boot application
   
    `./mvnw spring-boot:run`

C. Start frontend application
1.  Goto news-search/gui/ directory
2.  run following command
    `npm start`
    
Application should be running at http://localhost:3000
