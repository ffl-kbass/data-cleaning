import '../styles/globals.css'
import Sidebar from "../components/Sidebar"
import Layout from "../components/Layout"
import Content from "../components/Content"
import Head from 'next/head'
import { useState } from 'react'
import { createClient, Provider } from 'urql';

function MyApp({ Component, pageProps }) {
  const [dark, setDark] = useState(false)

  const client = createClient({
    url: 'http://localhost/gqlapi/',
  });

  return (
    <Provider value={client}>
      <Layout darkMode={dark}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        </Head>
        <Sidebar setDark={setDark} dark={dark} />
        <Content>
          <Component {...pageProps} />
        </Content>
      </Layout>
    </Provider>
  )
}

export default MyApp
