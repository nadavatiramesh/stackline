import React, { useEffect, useState } from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import DataTable from 'react-data-table-component';
import Reviews from './components/Reviews';
import Header from './components/Header';
import Loader from './components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGraphData } from './actions/actionFetchGraphData';
import './App.css';


interface SaleItem {
  retailSales: number
  retailerMargin: number
  unitsSold: number
  weekEnding: string
  wholesaleSales: number
}

interface GraphOptionsData {
  chart: {
    type: string
  },
  title: {
    text: string
  },
  yAxis: {
    title: {
        text: string,
        type: string
    }
  },
  xAxis: {
    categories: any
  },
  series: any
}


const options:any = {
  chart: {
    type: "spline"
  },
  title: {
    text: "Stackline Sales chart"
  },
  yAxis: {
    title: {
        text: 'Sales Value'
    }
  },
  xAxis: {
    categories: []
  },
  series: [
    {
      data: []
    },
    {
      data: []
    }
  ],
  colors: ["#052849", "#46a8f6"]
};

function App(props: any) {
  const dispatch = useDispatch();
  const appData = useSelector((state:any) => state.appData);

  const [graphOptions, setGraphOptions] = useState(options);
  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    dispatch(fetchGraphData());
  }, []);

  useEffect(() => {
    if (appData && appData.graphListData) {
      const { reviews, sales } = appData.graphListData;
      let xAxisCategories = [...graphOptions.xAxis.categories];
      let yAxisData = [...graphOptions.series]
      sales.forEach((saleItem:SaleItem) => {
        xAxisCategories.push(saleItem.weekEnding);
        yAxisData[0].data.push(saleItem.wholesaleSales);
        yAxisData[1].data.push(saleItem.retailSales);
      });
      yAxisData[0].name = "Wholesale sales";
      yAxisData[1].name = "Retail Sales";
      setGraphOptions({
        ...graphOptions,
        xAxis: {
          categories: xAxisCategories
        },
        series: yAxisData
      });
      setShowGraph(true);
    }
  }, [appData?.graphListData?.sales]);

  const columns = [
    {
        name: 'Week Ending',
        selector: (row: any) => row.weekEnding,
        sortable: true
    },
    {
        name: 'Retail sales',
        selector: (row: any) => row.retailSales,
        sortable: true
    },
    {
      name: 'Wholesale sales',
      selector: (row: any) => row.wholesaleSales,
      sortable: true
    },
    {
      name: 'Units sold',
      selector: (row: any) => row.unitsSold,
      sortable: true
    },
    {
      name: 'Retailer margin',
      selector: (row: any) => row.retailerMargin,
      sortable: true
    }
];

  return (
    <div className="app-wrapper">
      <div className='app-wrapper-text'>
        <Header />
        {
              appData.isInitialLoading && (
                <div className='chart-loader'>
                  <Loader />  
                </div>
              )
            }
        <div className='app-container d-flex'>
            <div className='charts-container'>
              {
                showGraph && <HighchartsReact highcharts={Highcharts} options={graphOptions} />
              }
              {
                showGraph && (
                  <DataTable
                      columns={columns}
                      data={appData?.graphListData?.sales || []}
                  />
                )
              }
            </div>
            <div className='reviews-container'>
              <Reviews reviews={appData?.graphListData?.reviews || []} />
            </div>
        </div>
      </div>
    </div>
  );
}



export default App;
