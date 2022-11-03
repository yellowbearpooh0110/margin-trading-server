import { Server as SocketServer } from 'socket.io';
import 'colors';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

type DepositRequestType = {
  user_id: string;
  token_name: string;
  amount: string;
};

const initializeSocket = (
  server: Server<typeof IncomingMessage, typeof ServerResponse>
) => {
  const io = new SocketServer(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  // initializing the socket io connection
  io.on('connection', (socket) => {
    // for a new user joining the room
    socket.on('joinRoom', ({ username, roomname }) => {
      // * create user
      // const p_user = join_User(socket.id, username, roomname);
      // tslint:disable-next-line:no-console
      console.log(socket.id.green, '=id'.green);
      // socket.join(p_user.room);

      // display a welcome message to the user who have joined a room
      // socket.emit('message', {
      //   userId: p_user.id,
      //   username: p_user.username,
      //   text: `Welcome ${p_user.username}`,
      // });

      // displays a joined room message to all other room users except that particular user
      // socket.broadcast.to(p_user.room).emit('message', {
      //   userId: p_user.id,
      //   username: p_user.username,
      //   text: `${p_user.username} has joined the chat`,
      // });
    });

    socket.on(
      'deposit',
      ({ user_id, token_name, amount }: DepositRequestType) => {
        socket.emit('success');
      }
    );

    // user sending message
    socket.on('chat', (text) => {
      // gets the room user and the message sent
      // const p_user = get_Current_User(socket.id);
      // io.to(p_user.room).emit('message', {
      //   userId: p_user.id,
      //   username: p_user.username,
      //   text: text,
      // });
    });

    // when the user exits the room
    socket.on('disconnect', () => {
      // the user is deleted from array of users and a left room message displayed
      // const p_user = user_Disconnect(socket.id);
      // if (p_user) {
      //   io.to(p_user.room).emit('message', {
      //     userId: p_user.id,
      //     username: p_user.username,
      //     text: `${p_user.username} has left the room`,
      //   });
      // }
      // tslint:disable-next-line:no-console
      console.log('disconneted'.red);
    });
  });
};

export default initializeSocket;
