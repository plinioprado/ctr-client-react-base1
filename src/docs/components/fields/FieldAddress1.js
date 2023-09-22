import React, { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import { validateAddress1Country, validateAddress1Line3} from './fieldAddress1Validate';

import { BaseContext } from '../../../base/BaseContext';

const FieldText = ({
    fieldChangeValue,
    fieldDisabled,
    fieldLabel,
    fieldMd,
    fieldName,
    fieldValue
  }) => {

  const errorMessage = 'country and at least 2nd address line required (1st is for optional adressee complement)';

  const { getOptionList } = useContext(BaseContext);
  const [countryOptionList, setCountryOptionList] = useState([])

  useEffect(
    () => {
      async function fetchData() {
        const list = await getOptionList('country');
        setCountryOptionList(list)
      };
      fetchData()
    },
    [getOptionList]);

  const erroMessageAddress1Line3 = validateAddress1Line3(fieldValue, errorMessage);
  const errorMessageAddress1Country =  validateAddress1Country(fieldValue, errorMessage);

  const onChange = (e) => {
    const value = e.target.value.trim();
    const name = e.target.name;
    const addressList = [{
      ...fieldValue,
      [name]: value
    }];
    fieldChangeValue('addressList', addressList);
  }

  return (
  <div className="card">
  <Form.Group as={Col} md={fieldMd} controlId={fieldName} key={fieldName}>
    <Form.Label>{fieldLabel}</Form.Label>
    <Form.Control
      disabled={fieldDisabled}
      type="text"
      name="line2"
      maxLength={60}
      placeholder="Optional addressee complement"
      defaultValue={fieldValue.line2}
      onChange={onChange}
    />
    <div className="thin-line">&nbsp;</div>
    <Form.Control
      disabled={fieldDisabled}
      type="text"
      name="line3"
      maxLength={60}
      defaultValue={fieldValue.line3}
      onChange={onChange}
      className={erroMessageAddress1Line3 && "border-danger"}
    />
    <Form.Control
      disabled={fieldDisabled}
      type="text"
      name="line4"
      maxLength={60}
      defaultValue={fieldValue.line4}
      onChange={onChange}
    />
    <Form.Control
      as="select"
      name="country_cod"
      disabled={fieldDisabled}
      value={fieldValue.country_cod}
      onChange={onChange}
      className={errorMessageAddress1Country && "border-danger"}
    >
      <option value="">Select country...</option>
      {
        countryOptionList
          .filter(it => (it.active || it.value === fieldValue.country_cod))
          .map(it => <option key={it.value} value={it.value}>{it.text}</option>)
      }
    </Form.Control>
    <Form.Text className="text-error">
    {erroMessageAddress1Line3 || errorMessageAddress1Country}
    </Form.Text>
  </Form.Group>
  </div>
  );
};

export default FieldText;
