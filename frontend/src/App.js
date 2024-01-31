import './App.css';
import { useState } from 'react';
import contractABI from "./abi.json"
const { ethers } = require("ethers")

function App() {
  const contractAddress = "0x32871De03345ECfba742e1BC163E66C2903F7640"

  const [inputMessage, setInputMessage] = useState('');
  const [retrievedMessage, setRetrievedMessage] = useState('');
  const [popMessage, setPopMessage] = useState(false)

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }
  
  async function setMessage(newMessage) {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const myMessageContract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      const transaction = await myMessageContract.setMessage(newMessage);
      await transaction.wait();
      setPopMessage(true)
      console.log('Message set successfully');
    } catch (error) {
      console.error('Error setting message:', error);
    }
  }
}

  async function getMessage() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const myMessageContract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      const message = await myMessageContract.getMessage();
      // await transaction.wait();
      setRetrievedMessage(message);
      console.log('Message set successfully');
    } catch (error) {
      console.error('Error setting message:', error);
    }
  }
}

  return (
    <div className="App">
     <h1>Message Retrieval DApp</h1>
     <p>Send a messsage</p>
     <div>
     <input 
     type='text' 
     placeholder='Type a message'
     value={inputMessage}
     onChange={(e) => {
      e.preventDefault()
      setInputMessage(e.target.value)}}  />
     <button onClick={() => setMessage(inputMessage)}>Set Message</button>
     </div>
     <div>
      <button onClick={getMessage}>Get Message</button>
      <p>Retrieved Message: {retrievedMessage}</p>
     </div>
    {popMessage && ( <div className='pop-up'>
      <p>Message has been set successfully</p>
     </div>
     )}
    </div>
  );
}

export default App;
