import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import QueriesFunctions from "./QueriesFunctions";
import {Container} from "@material-ui/core";


export default function Table() {
    const columns = [
        { title: 'id', field: 'id', hidden:true },
        { title: 'Τίτλος', field: 'title' },
        { title: 'Εταιρεία', field: 'company' },
    ]

    const [tableData, setTableData] = React.useState({
        data: [],
    });

    const getGames = async () => {
        let res = await QueriesFunctions.getGames();
        setTableData(prevState =>({
            ...prevState,
            data:res.data.rows
        }))
    };

    const putGame = async (newData) => {
        let res = await QueriesFunctions.putGame(newData);
        setTableData((prevState) => {
            const data = [...prevState.data];
            data.push(res.data.rows);
            return { ...prevState, data };
        });

    };

    const updateGame = async (newData, oldData) => {
        await QueriesFunctions.updateGame(oldData, newData);
        if (oldData) {
            setTableData((prevState) => {
                const data = [...prevState.data];
                data[data.indexOf(oldData)] = newData;
                return { ...prevState, data };
            });
        }

    };

    const deleteGame = async (oldData) => {
        await QueriesFunctions.deleteGame(oldData);
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
        <Container>
            <MaterialTable
                title="Πίνακας παιχνιδιών"
                columns={columns}
                options={{
                    headerStyle: {
                        fontWeight:'bold'
                    },
                    rowStyle: {
                        backgroundColor: '#EEE',
                    }
                }}
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
        </Container>
    );
}

