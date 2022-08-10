import {useState} from 'react';
import {ethers } from 'ethers';
import dalleArt from './DalleArt.json';

const dalleArtAddress = "0x8e6A9f6F31113a9346C662641FC34CBf9099d667";

const MainMint = ({accounts, setAccounts}) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint(){
        if(window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(dalleArtAddress, dalleArt.abi, signer);
            try {
                const response = await contract.mint({value: ethers.utils.parseEther((0.02).toString())});
                console.log("response", response);
            } catch(err) {
                console.log("error", err);
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    }

    const handleIncrement = () => {
        if (mintAmount >= 1) return;
        setMintAmount(mintAmount + 1);
    };

    return (
        <div>
            <h1>DalleArt</h1>
            <p>A collection of art created by OpenAI Dall-e</p>
            {isConnected ? (
               <div>
                <div>
                    <button onClick={handleDecrement}>-</button>
                    <input type="number" value={mintAmount} />
                    <button onClick={handleIncrement}>+</button>
                </div>
                <button onClick={handleMint}>Mint your Art</button>
               </div> 
            ) : (
                <p>You must be connected to mint.</p>
            )}
            
        </div>

    )
}

export default MainMint;