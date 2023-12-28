import React, { useContext, useState } from "react";
import Img from "../../../assets/Images/chatImage/img.png";
import Attach from "../../../assets/Images/chatImage/attach.png";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import io from 'socket.io-client';


const Input = ({userPrincipal, userToken, toPrincipal}) => {

  // taken from written code 
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [toPrincipal, setToPrincipal] = useState(''); // State for recipient's principal
  const [receivedMessages, setReceivedMessages] = useState([]);
  //ends here

  //me logged in yes!!

  useEffect(() => {
    //const newSocket = io('http://localhost:3000');

    const newSocket = io('http://localhost:3000', {
      query: { principal: userPrincipal }
    });


    setSocket(newSocket);

    newSocket.on('receiveMessage', (data) => {
      setReceivedMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => newSocket.close();
  }, [userToken]);

  const sendMessage = () => {
    if (socket && toPrincipal) {
      socket.emit('sendMessage', JSON.stringify({
        fromPrincipal: userPrincipal,
        toPrincipal: toPrincipal,
        message: message,
        privateToken: userToken
      }));
      setMessage('');
    }
  };


  
  // const [text, setText] = useState("");
  // const [recepientPrincipal, setRecepientPrincipal] = useState("");



  // const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);

  const { data } = useContext(ChatContext);


  // const handleSend = async () => {
  //   if (img) {
  //     const storageRef = ref(storage, uuid());

  //     const uploadTask = uploadBytesResumable(storageRef, img);

  //     uploadTask.on(
  //       (error) => {
  //         //TODO:Handle Error
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
  //           await updateDoc(doc(db, "chats", data.chatId), {
  //             messages: arrayUnion({
  //               id: uuid(),
  //               text,
  //               senderId: currentUser.uid,
  //               date: Timestamp.now(),
  //               img: downloadURL,
  //             }),
  //           });
  //         });
  //       }
  //     );
  //   } else {
  //     await updateDoc(doc(db, "chats", data.chatId), {
  //       messages: arrayUnion({
  //         id: uuid(),
  //         text,
  //         senderId: currentUser.uid,
  //         date: Timestamp.now(),
  //       }),
  //     });
  //   }

  //   await updateDoc(doc(db, "userChats", currentUser.uid), {
  //     [data.chatId + ".lastMessage"]: {
  //       text,
  //     },
  //     [data.chatId + ".date"]: serverTimestamp(),
  //   });

  //   await updateDoc(doc(db, "userChats", data.user.uid), {
  //     [data.chatId + ".lastMessage"]: {
  //       text,
  //     },
  //     [data.chatId + ".date"]: serverTimestamp(),
  //   });

  //   setText("");
  //   setImg(null);
  // };

  //input field needs to be connected


  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>


        {/* <button onClick={handleSend}>Send</button> */}
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Input;