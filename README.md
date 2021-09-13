# My drive

## Installation Setup

```bash
# clone code
git clone https://github.com/OctupusPrime/my-keep-v2.git

# go to folder
cd my-keep-v2

# to start app you need 2 terminals for (client and server)
cd server

# install dependencies for server 
npm i

# serve with hot reload at localhost:3000
npm run dev

# on different terminal
cd client

# install dependencies for client 
npm i

# serve with hot reload at localhost:8080
npm run serve
```  
## Description   
Simple file manager like [Google drive](https://www.google.com/intl/ru_uA/drive/)
### Technical task
```
Make a file manager
It should be possible to "walk" through the folders

One click - select the file folder
By clicking on another file or area - deselection || highlighting a new file

When you double click on a folder, the folder opens and the contents of the folder are shown

There should be a "back" button if the folder is in a folder

There can be an infinite number of folders

Add the ability to copy, paste and cut files


Add file copy notification, add opacity 0.5 to cut file before moving it

To pull the data in some random way with json (simulate a request to the server) or make a server on node JS (will be a plus). In the case of node JS, you do not need to use the database and logic on the server.
The server just sends json

You don't need to bother with the layout, but the minimum adequate view should be


Stack:
JS, Vue, Node JS (Express || Nest), vuetify (not to typeset)
```
### CheckList : 
- [x] **It should be possible to "walk" through the folders**   
- [x] **By clicking on another file or area - deselection || highlighting a new file**   
With <kbd>Shift</kbd> you can select multiple files and folders
- [x] **When you double click on a folder, the folder opens and the contents of the folder are shown**   
When clicked, it is redirected to the folder page
- [x] **There should be a "back" button if the folder is in a folder**   
There not just simple back button but full path to folder
- [x] **There can be an infinite number of folders**  
Tired of creating folders to check
- [x] **Add the ability to copy, paste and cut files**  
First you need to select file and/or folders, then:
    - Copy - <kbd>Shift</kbd> + <kbd>C</kbd>
    - Paste - <kbd>Shift</kbd> + <kbd>S</kbd>
    - Cut - <kbd>Shift</kbd> + <kbd>X</kbd>
- [x] **Add file copy notification, add opacity 0.5 to cut file before moving it**  
A clipboard appears in the left column
- [x] **Make a server on node JS. The server just sends json**  
The server gives the date with a delay to simulate the backend
- [x] **You don't need to bother with the layout, but the minimum adequate view should be**  
I didn't bother myself ;)

## Documentation
### Plugins
#### Front End
| Name | Usage |
| --- | --- |
| [uuid](https://www.npmjs.com/package/uuid) | Used for create unique id for tree items |
| [axios](https://www.npmjs.com/package/axios) | Used for send asynchronous requests to the backend |
| [vuetify](https://www.npmjs.com/package/vuetify) | Used in order not to bother with the layout |
#### Back End
| Name | Usage |
| --- | --- |
| [express](https://www.npmjs.com/package/express) | Used to create server |
| [cors](https://www.npmjs.com/package/cors) | Used to send request for different domain |
| [dotenv](https://www.npmjs.com/package/dotenv) | Used in order to store app variables |
### Authors
[**Misha Sokil**](https://github.com/OctupusPrime)
### License
 MIT © Misha Sokil

**Thank you for your attention**
  
