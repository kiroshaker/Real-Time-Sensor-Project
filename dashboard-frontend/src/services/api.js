import axios from 'axios';

const api = axios.create( { baseURL: "http://localhost:4000" } );

async function getAllMessages() {
    const res = await api.get("/routes/sensors");
    return res.data;
}

async function getLatestMessage() {
    const res = await api.get("/routes/sensors/latest");
    return res.data;
}

async function getKRecentMessages(since) {
    const res =  await api.get("/routes/sensors", { 
        params : { limit: since } 
    });
    return res.data;
}

async function getMessagesSince(sinceISOString) {
  const res = await api.get("/routes/sensors", {
    params: { since: sinceISOString }
  });
  return res.data;
}


export { getAllMessages, getLatestMessage, getKRecentMessages, getMessagesSince };