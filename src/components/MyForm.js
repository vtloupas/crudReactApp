import React, {useEffect, useState} from 'react';
import {Container} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CustomTable from './CustomTable'
import AddGameForm from "./CustomAddForm";
import EditGameForm from "./CustomEditForm";
import QueriesFunctions from "./QueriesFunctions";

export default function MyForm(){
    // useState για την φόρμα
    const initialGameState = {
        id: null,
        title:'',
        company:'',
    }

    // useSate για το game που γίνεται update
    const [currentGame, setCurrentGame] = useState(initialGameState)

    //useState για τον πίνακα
    const [games, setGames] = useState({data:''})

    const getGames = async () => {
        let res = await QueriesFunctions.getGames();
        setGames((prevState) =>({
            ...prevState,
            data: res.data.rows
        }))
    };

    // useState για το edit εγγραφής του πίνακα

    const [editing, setEditing] = useState(false)

    const addGame = (game) => {
        setGames((prevState) => {
            const data = [...prevState.data]
            data.push(game)
            return{
                ...prevState,
                data
            }
        })
    }

    const updateGame = async (game) => {
        setEditing(true);
        setCurrentGame(game);
    }

    const saveUpdateGame = async (oldGame,game) => {
        setEditing(false)
        await QueriesFunctions.updateGame(oldGame,game);
        setGames((prevState) => {
            const data = [...prevState.data]
            data[data.indexOf(oldGame)]=game
            return {
                ...prevState,
                data
            }
        })
    }

    const deleteGame = async (game) => {
        await QueriesFunctions.deleteGame(game);
        setGames( (prevState) => {
            const data = [...prevState.data]
            data.splice(data.indexOf(game), 1);
            return {
                ...prevState,
                data
            }
        })
    }

    useEffect(() => {
        getGames();
    },[]);

    return (
        <Container>
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Paper>
                            {editing ? (
                                <EditGameForm gameForUpdate={currentGame} saveUpdateGame={saveUpdateGame} setEditing={setEditing}/>
                            ) : (
                                <AddGameForm addGame={addGame}/>
                            )}

                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>
                            <h3>Πίνακας παιχνιδιών</h3>
                            <CustomTable games={games.data} deleteGame={deleteGame} updateGame={updateGame}/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}

