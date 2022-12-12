import { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import WalletContextProvider from '../components/WalletContextProvider'
import { AppBar } from '../components/AppBar'
import { BalanceDisplay } from '../components/BalanceDisplay'
import { SendSolForm } from '../components/SendSolForm'
import Head from 'next/head'

const Home: NextPage = (props) => {

  return (
    <div className={styles.App}>
      <Head>
        <title style={{fontFamily: 'sans-serif'}}>Wallet-Adapter</title>
        <meta
          name="description"
          content="Wallet-Adapter Example"
        />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <div className={styles.AppBody}>
          <BalanceDisplay />
          <SendSolForm />
        </div>
      </WalletContextProvider >
      <footer>
        <p className={styles.AppBody}>Made by <a style={{textDecoration: 'none', color: 'cyan'}} href='https://twitter.com/tomarpari90'>Pari Tomar</a></p>
      </footer>
    </div>

  );
}

export default Home;