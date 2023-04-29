import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { FilterData, Store } from '../../types';
import { makeRequest } from '../../utils/request';
import { buildSelectStores } from './helpers';
import './styles.css';

type Props = {
  onSubmitFilter: (data: FilterData) => void;
};

function Filter({ onSubmitFilter }: Props) {
  const [selectStore, setSelectStore] = useState<Store[]>([]);

  const { setValue, getValues, control } = useForm<FilterData>();

  const handleChangeStore = (value: Store) => {
    setValue('store', value);

    const obj = {
      name: getValues('store.name'),
      store: getValues('store')
    };

    onSubmitFilter(obj);
  };

  useEffect(() => {
    makeRequest.get<Store[]>('/stores').then((response) => {
      const newSalesStores = buildSelectStores(response.data);
      setSelectStore(newSalesStores);
    });
  }, []);

  return (
    <div className="base-card filter-container">
      <div className="store-filter-select-container">
        <Controller
          name="store"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={selectStore}
              isClearable
              classNamePrefix="filter-store-select"
              onChange={(value) => handleChangeStore(value as Store)}
              getOptionLabel={(store: Store) => store.name}
              getOptionValue={(store: Store) => String(store.id)}
            />
          )}
        />
      </div>
    </div>
  );
}

export default Filter;
