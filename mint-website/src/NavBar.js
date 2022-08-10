import React from 'react';

const NavBar = ({ accounts, setAccounts }) => {
    const isConnected = Boolean(accounts[0]);
    async function connectAccount() {
        if(window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccounts(accounts);
        }
    }
    return (
        <div>
            <div> Mint</div>
            {isConnected ? (
                <p>Connected to {accounts[0]}</p>
            ) : (
                <button onClick={connectAccount}>Connect</button>
            )}
        </div>
    );
};

export default NavBar;