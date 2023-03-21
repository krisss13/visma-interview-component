import React, { useState } from 'react';
import './App.css';
import AddressBlock from './components/InviteToInterview/AddressBlock';

function App() {
    const [addressList, setAddressList] = useState([
        'Sporta iela 11, Rīga',
        'Maiduguns iela 2,Rīga',
        'Lindhagengatan 94, Stockholm'
    ]);
    return (
        <div className="App">
            <div className="panel">
                <div className="panel-body">
                    <AddressBlock addressList={addressList} setAddressList={setAddressList}/>
                </div>
            </div>
        </div>
    );
}

export default App;
