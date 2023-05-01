const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const { v4: uuidv4 } = require("uuid");

const documents = {};
const roomIds = [];
let userIds = [];

io.on("connection", (socket) => {
  const uuid = uuidv4();
  let previousId;

  const safeJoin = (currentId) => {
    socket.leave(previousId);
    socket.join(currentId, () => {
      console.log(
        `Socket ${socket.id} joined room ${currentId}, with uuid: ${uuid}`
      );
      if (!roomIds.includes(currentId)) {
        roomIds.push(currentId);
      }
    });
    previousId = currentId;
    const currentRoom = documents[currentId];
    if (!currentRoom.users.includes(uuid)) {
      currentRoom.users.push(uuid);
      currentRoom.currentUser = uuid;
    }

    if (!userIds.includes(uuid)) {
      userIds.push(uuid);
    }
  };

  socket.on("getDoc", (docId) => {
    safeJoin(docId);
    socket.emit("document", documents[docId]);
  });

  socket.on("addDoc", (doc) => {
    documents[doc.id] = doc;
    safeJoin(doc.id);
    io.emit("documents", Object.keys(documents));
    socket.emit("document", doc);
  });

  socket.on("editDoc", (doc) => {
    documents[doc.id] = doc;
    socket.to(doc.id).emit("document", doc);
  });

  io.emit("documents", Object.keys(documents));

  console.log(`Socket ${socket.id} has connected, with uuid: ${uuid}`);

  socket.on("disconnect", (closeEvent) => {
    roomIds.forEach((room) => {
      userIds = userIds.filter((id) => id !== uuid);
      documents[room].users = userIds.filter((id) => id !== uuid);
    });

    io.emit("documents", Object.keys(documents));
  });
});

const port = 4444;

http.listen(port, () => {
  console.log(`Socket server is listening on port ${port}`);
});
