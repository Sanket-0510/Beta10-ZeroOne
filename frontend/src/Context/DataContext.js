import React, { useState } from 'react'
import NewContext from './NewContext'
import axios from 'axios'

const DataContext = (props) => {
  
    const Host = process.env.REACT_APP_HOST || `http://${process.env.URL}:8000`;
    const [Notes, setNotes] = useState(null);
    const [TopComm, setTopComm] = useState(null);
    const [SelectedNote, setSelectedNote] = useState(null);
    const [SelectedList, setSelectedList] = useState([]);
    const [progress, setProgress] = useState(0);
    const [selectedCrop, setselectedCrop] = useState("")
    const [selectedState, setselectedState] = useState("")
    const [filterData, setfilterData] = useState('')
    const [foreCasting, setforeCasting] = useState([23,45,12])



    const FetchGenData = async (state, comm) => {
        setProgress(30);
        const payload = {
            state: state,
            commodity: comm
        }

        const url = `${Host}/crop/web/getCropData`

        const res = axios({
            method: 'post',
            url: '/user/12345',
            data: JSON.stringify(payload), // you are sending body instead
            headers: {
                // 'Authorization': `bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        setProgress(70);
        const data = await res.json();
        setProgress(90);
        setTopComm(data);
        setProgress(100);
    }
    const CreateNote = async (title, description, tag) => {
        let sts = false;
        const url = `${Host}/api/notes/create-note`
        try {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("Token")
                },
                body: JSON.stringify({ title, description, tag })
            })
            const resjson = await response.json();
            let newnote = Notes.concat(resjson);
            if (response.ok) {

                setNotes(newnote);
            }
            sts = response.ok;
        } catch (error) {
            console.log(error);
        }
        return sts;
    }
    const UpdateNote = async (title, description, tag, note_id) => {
        let sts = false;
        const url = `${Host}/api/notes/update-note/${note_id}`

        try {

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("Token")
                },
                body: JSON.stringify({ title, description, tag })
            })
            let resjson = await response.json();
            await FetchGenData();
            sts = { resjson, success: response.ok };
        } catch (error) {
            console.log(error);
        }
        return sts.success;
    }
    const DeleteNote = async (note_id) => {
        let sts = false;
        const url = `${Host}/api/notes/delete-note/${note_id}`

        try {

            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("Token")
                },
            })
            let resjson = await response.json();
            if (response.ok) {
                let newnote = Notes.filter((Notes) => { return Notes._id !== note_id })
                setNotes(newnote);
            }

            sts = { resjson, success: response.ok };
        } catch (error) {
            console.log(error);
        }
        return sts.success;
    }
    const MultiDelete = async () => {
        setProgress(30);
        for (let index = 0; index < SelectedList.length; index++) {
            const element = SelectedList[index];
            await DeleteNote(element);
        }
        setProgress(60);
        setSelectedList([]);
        setProgress(80);
        await FetchGenData();
        setProgress(100);
    }
    const addSelected = (id) => {
        let ap = true;
        let list = SelectedList;
        for (let index = 0; index < SelectedList.length; index++) {
            const element = SelectedList[index];
            if (element === id) {
                ap = false;

            }

        }
        if (ap) {

            list.push(id);
        }
        setSelectedList(list);
    }
    const deleteSelected = (id) => {
        let list = [];
        SelectedList.forEach(element => {
            if (element !== id) {
                list.push(element);
            }
        });
        setSelectedList(list);
    }
    const deleteClear = () => {
        let list = [];
        setSelectedList(list);
    }

    const SignUp = async (name, email, password) => {
        setProgress(30);
        let sts = false;
        const url = `${Host}/api/auth/create-user/`
        try {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            })
            setProgress(60);
            const resjson = await response.json();
            setProgress(80);
            sts = { resjson, success: response.ok };
        } catch (error) {
            console.log(error);
        }
        setProgress(100);
        return sts;
    }
    const Login = async (email, password) => {
        setProgress(30);
        let sts = false;
        const url = `${Host}/api/auth/login-user/`
        try {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            setProgress(60);
            const resjson = await response.json();
            setProgress(80);
            sts = { resjson, success: response.ok };
        } catch (error) {
            console.log(error);
        }
        setProgress(100);
        return sts;
    }
    return (
        <NewContext.Provider value={{foreCasting:foreCasting, setforeCasting:setforeCasting, filterData: filterData, setfilterData:setfilterData,  selectedCrop: selectedCrop, selectedState: selectedState, setselectedState: setselectedState, setselectedCrop: setselectedCrop, FetchGenData: FetchGenData, CreateNote: CreateNote, UpdateNote: UpdateNote, setSelectedNote: setSelectedNote, SelectedNote: SelectedNote, DeleteNote: DeleteNote, append: addSelected, delete: deleteSelected, MultiDelete: MultiDelete, deleteClear: deleteClear, SignUp: SignUp, Login: Login, progress: progress, setProgress: setProgress }}>
            {props.children}
        </NewContext.Provider>
    )
}

export default DataContext;