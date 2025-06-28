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

async function getKRecentMessages(k) {
    const res =  await api.get("/routes/sensors", { 
        params : { limit: k } 
    });
    return res.data;
}

async function getCount() {
    const res = await api.get("/routes/sensors/count");
    return res.data;
}
export { getAllMessages, getLatestMessage, getKRecentMessages, getCount };