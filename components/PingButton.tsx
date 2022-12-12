import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { Connection } from "@solana/web3.js";
import { Transaction } from "@solana/web3.js";
import { FC, useState } from "react";
import styles from "../styles/PingButton.module.css";

const PROGRAM_ID = `ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa`;
const DATA_ACCOUNT_PUBKEY = `Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod`;

export const PingButton: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [balance, setBalance] = useState();
  const [amount, setAmount] = useState(0)
  const [address, setAddress] = useState('')
  // console.log('connection', publicKey)


  // acc setup
  const initializeKeypair = (): web3.Keypair => {
	const secret = JSON.parse(process.env.PRIVATE_KEY?? "") as number[]
	const secretKey = Uint8Array.from(secret)
	const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey)
	return keypairFromSecretKey
  }

  // send SOL
  async function sendSol (connection: web3.Connection, sender: web3.Keypair) {
	const transaction = new Transaction()
	const sendSolInstruction = web3.SystemProgram.transfer({
		fromPubkey: sender.publicKey,
		toPubkey: to,
		lamports: amount
	})

	transaction.add(sendSolInstruction)
	const sig = await web3.sendAndConfirmTransaction(connection, transaction, [sender])
	console.log(`You can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${sig}?cluster=devnet`);

  } 


  const handleSubmit = async (e) => {
	// console.log("Amount", amount)
	// console.log("Address", amount)
	e.preventDefault()
	const payer = initializeKeypair()
	const connection = new Connection(web3.clusterApiUrl('devnet'))
    await sendSol(connection, 0.1*web3.LAMPORTS_PER_SOL, payer)

  }
 const onAmountChange = (event) => {
	setAmount(event.target.value)
 }
 const onAddressChange = (event) => {
	setAddress(event.target.value)
 }
  const onClick = () => {
    if (!connection || !publicKey) {
      return;
    }

	
    // const programId = new web3.PublicKey(PROGRAM_ID);
    // const programDataAccount = new web3.PublicKey(DATA_ACCOUNT_PUBKEY);
    const transaction = new web3.Transaction();

    const instruction = new web3.TransactionInstruction({
      keys: [
        {
          pubkey: address,
          isSigner: false,
          isWritable: true,
        },
      ],
      programId,
    });

    transaction.add(instruction);
    sendTransaction(transaction, connection).then((sig) => {
      console.log(sig);
    });
  };

  return (
    <div className={styles.buttonContainer} onClick={onClick}>
		<form onSubmit={handleSubmit}>
			<label>
				Amount
			</label>
			<input type="number" value={amount} onChange={onAmountChange} />
			<label>
				Address
			</label>
			<input type="address" value={address} onChange={onAddressChange} />
			<input type="submit" value="Submit" />
		</form>
      <button className={styles.button}>Ping!</button>
    </div>
  );
};
