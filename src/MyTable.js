import React from 'react';
import {useEffect} from 'react';
import MaterialTable from 'material-table';
import axios from "axios";


export const Table=() => {
    const columns = [
        { title: 'id', field: 'id', hidden:true },
        { title: 'Τίτλος', field: 'title' },
        { title: 'Εταιρεία', field: 'company' },
    ]

    const [tableData, setTableData] = React.useState({
        data: [],
    });

    const getGames = async () => {
        let res = await axios('http://localhost:3000/games');
        setTableData(prevState =>({
            ...prevState,
            data:res.data.rows
        }))
    };

    const putGame = async (newData) => {
        await axios.put('http://localhost:3000/games',newData);
        setTableData((prevState) => {
            const data = [...prevState.data];
            data.push(newData);
            return { ...prevState, data };
        });

    };

    const updateGame = async (newData, oldData) => {
        await axios.post(`http://localhost:3000/games/${oldData.id}`,newData);
        if (oldData) {
            setTableData((prevState) => {
                const data = [...prevState.data];
                data[data.indexOf(oldData)] = newData;
                return { ...prevState, data };
            });
        }

    };

    const deleteGame = async (oldData) => {
        await axios.delete(`http://localhost:3000/games/${oldData.id}`)
        setTableData((prevState) => {
            const data = [...prevState.data];
            data.splice(data.indexOf(oldData), 1);
            return { ...prevState, data };
        });
    };

    useEffect(() => {
        getGames();
    },[]);

    return (
        <MaterialTable
            title="Πίνακας παιχνιδιών"
            columns={columns}
            localization={{
                header: {
                    actions: ''
                },
            }}
            data={tableData.data}
            editable={{
                onRowAdd: async (newData) => {
                    await putGame(newData);
                },
                onRowUpdate: async (newData, oldData) =>{
                    await updateGame(newData, oldData);
                },
                onRowDelete: async (oldData) => {
                    await deleteGame(oldData);
                },
            }}
        />
    );
}

