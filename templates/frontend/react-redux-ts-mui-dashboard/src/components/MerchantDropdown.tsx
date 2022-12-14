import type { SyntheticEvent } from 'react';
import { useAppSelector, useAppDispatch } from 'redux/redux-hooks';
import { contextActions } from 'redux/actions';
import {
  Autocomplete,
  TextField,
} from '@mui/material';

const MerchantDropdown = () => {
  const dispatch = useAppDispatch();
  const {
    merchant,
    allCustomers,
  } = useAppSelector(({ context }) => context);

  const handleChange = (event: SyntheticEvent, value) => {
    dispatch(contextActions.setMerchant(value));
  };

  return (
    <Autocomplete
      value={merchant}
      disablePortal
      disableClearable
      id="combo-box-dropdown"
      options={allCustomers}
      sx={{ width: 200 }}
      onChange={handleChange}
      size="small"
      // eslint-disable-next-line react/jsx-props-no-spreading
      renderInput={(props) => <TextField {...props} label="Customers" />}
    />
  );
};

export default MerchantDropdown;
