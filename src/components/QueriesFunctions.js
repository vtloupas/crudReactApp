import axios from "axios";

const getGames = async () => {
    let res = await axios('http://localhost:3000/games');
    return res;
}

const putGame = async (newData) => {
    let res = await axios.put('http://localhost:3000/games',newData);
    return res;
}

const updateGame = async (oldData,newData) => {
    let res = await axios.post(`http://localhost:3000/games/${oldData.id}`,newData);
    return res;
}

const deleteGame = async (oldData) => {
    let res = await axios.delete(`http://localhost:3000/games/${oldData.id}`)
    return res;
}

export default {getGames, putGame, updateGame, deleteGame}