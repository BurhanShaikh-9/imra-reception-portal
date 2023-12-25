import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { DashboardService } from '../../../services/dashboard';
import TokenService from '../../../services/tokenService';

export const Dashboard = () => {

  const { getCountRecep, getSearchCount } = DashboardService()
  const { getUserCookie } = TokenService()
  const [searchData, setSearchData] = useState('');
  const [countReceptData, setCountReceptData] = useState([]);

  const userId = getUserCookie()
  // console.log(userId, 'dashboard');
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    getSearchCount(userId).then((res) => {
      console.log(res.data.data, 'dash1');
      const response = res.data.data;
      const totalSearchCount = response.reduce((sum, entry) => sum + entry.searchCount, 0);
     console.log(totalSearchCount, 'searchssss');
      setSearchData(totalSearchCount)
    }).catch((res) => {
      console.log(res, 'error');
    })
    getCountRecep(userId).then((res) => {
      console.log(res.data.data, 'dash2');
      setCountReceptData(res.data.data)
    }).catch((res) => {
      console.log(res, 'error');
    })
  }


  const barChart = {
    chart: {
      type: 'bar'
    },
    series: [
      {
        name: 'Series 1',
        data: [searchData, countReceptData] || [0],
      }
    ],
    colors: ['#32C6C3'],
    xaxis: {
      categories: ['Searches Count', 'Medical Record Added',]
    },
    yaxis: {
      labels: {
        show: false
      }
    },
  };


  return (
    <React.Fragment>

      <section className='mainSection'>
        <div className="container">
          <div className="mainSectionWrapper">
            <div className="heading">
              <p>
                DASHBOARD
              </p>
            </div>
            <div className="card cardForm">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-12  ">
                    <div className="card">
                      <div className="card-body">
                        <div className="chart">
                          <div className="chartHeading">
                            <p>Total Users</p>
                            <small>Current</small>
                          </div>
                          {
                            (searchData || countReceptData) &&
                            <ReactApexChart options={barChart} series={barChart?.series} type="bar" height={245} />
                          }
                        </div>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </React.Fragment>
  )
}
