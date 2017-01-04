



objective: Node.JS and Socket.IO consume data directly from Web
and broadcast to connected clients
using Twitter streaming API

Twitter standard API:
1. open conn to API server
2. send request for data
3. receive data from API
4. conn is closed


Twitter streaming API:
1. open conn to API server
2. send request for some data
3. API pushes data to you
4. conn is remained open
5. API pushes more data as it becomes available

