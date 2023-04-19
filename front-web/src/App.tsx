import { useState } from 'react';
import './App.css';
import Filter from './components/filter';
import Header from './components/header';
import SalesByStore from './components/sales-by-store/indes';
import { FilterData } from './types';

function App() {
  const [filterData, setFilterData] = useState<FilterData>();

  const handleSubmitFilter = (data: FilterData) => {
    setFilterData(data);
  };

  return (
    <div className="App">
      <>
        <Header />
        <div className="app-container">
          <Filter onSubmitFilter={handleSubmitFilter} />
          <SalesByStore filterData={filterData} />
        </div>
      </>
    </div>
  );
}

export default App;
