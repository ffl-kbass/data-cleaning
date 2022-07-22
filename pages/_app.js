import '../styles/globals.css'
import Sidebar from "../components/Sidebar"
import Layout from "../components/Layout"
import Content from "../components/Content"
import Head from 'next/head'
import { useState } from 'react'
import { createClient, Provider } from 'urql';
import { FilterContext } from '../Context/context'
import { ToastProvider, useToasts } from "../Context/ToastContext";

function MyApp({ Component, pageProps }) {
  const [dark, setDark] = useState(false)
  const [filter, setFilter] = useState({
		allocations_missing: false,
		allocations_source: false,
		dirty_services: false,
		districts_missing_ia: false,
		isp_missing: false,
		surplus_ia: false,
		upstream_missing: false,
		outlier_change_in_bw: false,
		outlier_change_in_cost_per_mbps: false,
		outlier_change_num_students: false,
		outlier_ia_bandwidth_per_student: false,
		outlier_ia_monthly_cost_per_mbps: false,
		outlier_increase_cost_per_mbps_rule: false,
		outlier_not_meeting_connectivity_rule: false,
	})

  const client = createClient({
    url: 'http://localhost/gqlapi/',
  });

	const dispatchFilterEvent = (payload) => {
		const items = {...filter};
		items[payload.target.value] = payload.target.checked;

    setFilter(items)
	};

  return (
    <FilterContext.Provider value={{ filter, dispatchFilterEvent }}>
      <ToastProvider>
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
      </ToastProvider>
    </FilterContext.Provider>
  )
}

export default MyApp
