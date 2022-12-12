import {FC, useState} from "react"


export const SendSol: FC = () => { 
    const [balance, setBalance] = useState(0)

    return (
        <div>
            <p>Balance: {balance}</p>
        </div>
    )
}