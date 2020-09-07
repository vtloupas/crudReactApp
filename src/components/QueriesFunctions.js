import axios from "axios";

const { REACT_APP_API_URL } = process.env;

const getGames = async () => {
    let res = await axios(REACT_APP_API_URL);
    return res;
}

const putGame = async (newData) => {
    let res = await axios.put(REACT_APP_API_URL,newData);
    return res;
}

const updateGame = async (oldData,newData) => {
    let res = await axios.post(`${REACT_APP_API_URL}/${oldData.id}`,newData);
    return res;
}

const deleteGame = async (oldData) => {
    let res = await axios.delete(`${REACT_APP_API_URL}/${oldData.id}`)
    return res;
}

export default {getGames, putGame, updateGame, deleteGame}