import { useEffect, useMemo, useState } from 'react';
import { FilterData, PieChartConfig, SalesByGender } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { buildFilterParams, makeRequest } from '../../utils/request';
import PieChartCard from '../pie-chart-card';
import './styles.css';
import { buildSalesByGenderChart, sumSalesByGender } from './helpers';

type Props = {
  filterData?: FilterData;
};

function SalesByStore({ filterData }: Props) {
  const [salesSummary, setSalesSummary] = useState(0);
  const [salesByGender, setsalesByGender] = useState<PieChartConfig>();

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    makeRequest.get<SalesByGender[]>('/sales/by-gender', { params }).then((response) => {
      const newSalesSummary = sumSalesByGender(response.data);
      setSalesSummary(newSalesSummary);
      const newSalesByGender = buildSalesByGenderChart(response.data);
      setsalesByGender(newSalesByGender);
      console.log(newSalesByGender);
    });
  }, [params]);

  return (
    <div className="base-card sales-by-store-container">
      <div className="sales-by-store-data">
        <div className="sales-by-store-quantity-container">
          <h2 className="sales-by-store-quantity">{formatPrice(salesSummary)}</h2>
          <span className="sales-by-store-quantity-label">Total de vendas</span>
        </div>
        <div className="sales-by-store-chart">
          <PieChartCard name="" labels={salesByGender?.labels} series={salesByGender?.series} />
        </div>
      </div>
    </div>
  );
}

export default SalesByStore;
