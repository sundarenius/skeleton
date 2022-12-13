import type { SyntheticEvent } from 'react';
import { useAppSelector, useAppDispatch } from 'redux/redux-hooks';
import { contextActions } from 'redux/actions';
import {
  Autocomplete,
  TextField,
} from '@mui/material';

const MerchantDropdown = () => {
  const dispatch = useAppDispatch();
  const merchant = useAppSelector(({ context }) => context.merchant);

  const handleChange = (event: SyntheticEvent, value) => {
    dispatch(contextActions.setMerchant(value.label));
  };

  return (
    <Autocomplete
      value={{ label: merchant }}
      disablePortal
      disableClearable
      id="combo-box-dropdown"
      options={customers}
      sx={{ width: 200 }}
      onChange={handleChange}
      size="small"
      // eslint-disable-next-line react/jsx-props-no-spreading
      renderInput={(props) => <TextField {...props} label="Customers" />}
    />
  );
};

const customers = [
  {
    label: 'Apotea',
  },
  {
    label: 'Apoteket',
  },
  {
    label: 'Snusbolaget',
  },
];

export default MerchantDropdown;
