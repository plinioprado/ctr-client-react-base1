import { Button, Form, Modal, Row } from 'react-bootstrap';

import FieldBoolean from '../fields/FieldBoolean';
import FieldEmail from '../fields/FieldEmail';
import FieldKeySerial from '../fields/FieldKeySerial';
import FieldSelect from '../fields/FieldSelect';
import FieldText from '../fields/FieldText';
import FieldAdress1 from '../fields/FieldAddress1'

import validateEmail from '../fields/fieldEmailValidate';
import validateText from '../fields/fieldTextValidate';
import { validateAddress1Country, validateAddress1Line3 } from '../fields/fieldAddress1Validate'
import validateBoolean from '../fields/fieldBooleanValidate';

function PersonItem({
  accessDelete,
  accessSubmit,
  fieldChangeValue,
  handleClose,
  handleDelete,
  handleSubmit,
  item
}) {

  const submitValidate = () => {
    try {
      if (!accessSubmit) throw new Error('access');
      if (validateText(item.name_entity, item.entity) !== '') throw new Error('entity name');
      if (validateText(item.name_first, !item.entity) !== '') throw new Error('first name');
      if (validateText(item.name_last, !item.entity) !== '') throw new Error('last name');
      if  (validateBoolean(item.entity) !== '') throw new Error('entity');

      if (validateAddress1Country(item.addressList[0], 'error') !== '') throw new Error('address country');
      if (validateAddress1Line3(item.addressList[0], 'error') !== '') throw new Error('address line 1');
      if (validateEmail(item.email, true) !== '') throw new Error('email');
      return true;
    } catch (err) {
      return false;
    }
  };

  const showSubmit = submitValidate();

  return (
    item &&
    <div className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Person</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { item &&
          <Form noValidate >
            <Row className="mb-3">
              <FieldKeySerial
                fieldLabel="Id"
                fieldMd="4"
                fieldName="id"
                fieldOpNew={item.opNew}
                fieldValue={item.id}
              />
              <FieldBoolean
                fieldChangeValue={fieldChangeValue}
                fieldDisabled={!accessSubmit || !item.opNew}
                fieldLabel="Entity"
                fieldMd="4"
                fieldName="entity"
                fieldValue={item.entity}
              />
              <FieldBoolean
                fieldChangeValue={fieldChangeValue}
                fieldDisabled={!accessSubmit}
                fieldLabel="Active"
                fieldMd="4"
                fieldName="active"
                fieldValue={item.active}
              />
            </Row>
            { item.entity ?
            <Row className="mb-3">
              <FieldText
                fieldChangeValue={fieldChangeValue}
                fieldDisabled={!accessSubmit}
                fieldLabel="Name"
                fieldMd="12"
                fieldName="name"
                fieldRequired={item.entity}
                fieldValue={item.name}
              />
            </Row>
            :
            <Row className="mb-3">
              <FieldText
                fieldChangeValue={fieldChangeValue}
                fieldDisabled={!accessSubmit}
                fieldLabel="First Name"
                fieldMd="3"
                fieldName="name_first"
                fieldRequired={!item.entity}
                fieldValue={item.name_first}
              />
              <FieldText
                fieldChangeValue={fieldChangeValue}
                fieldDisabled={!accessSubmit}
                fieldLabel="Middle Name"
                fieldMd="3"
                fieldName="name_middle"
                fieldValue={item.name_middle}
              />
              <FieldText
                fieldChangeValue={fieldChangeValue}
                fieldDisabled={!accessSubmit}
                fieldLabel="Last Name"
                fieldMd="6"
                fieldName="name_last"
                fieldRequired={!item.entity}
                fieldValue={item.name_last}
              />
            </Row>
            }
            <Row>
              <FieldAdress1
                fieldChangeValue={fieldChangeValue}
                fieldDisabled={!accessSubmit}
                fieldLabel="Address"
                fieldMd="12"
                fieldName="address"
                fieldValue={item.addressList[0]}
              />
            </Row>
            <Row className="mb-3">
              <FieldEmail
                fieldChangeValue={fieldChangeValue}
                fieldDisabled={!accessSubmit}
                fieldLabel="Email"
                fieldMd="12"
                fieldName="email"
                fieldRequired={true}
                fieldValue={item.email}
              />
              <FieldSelect
                fieldChangeValue={fieldChangeValue}
                fieldDisabled={!accessSubmit && item.opNew}
                fieldLabel="Tenant"
                fieldMd="4"
                fieldName="tenant_cod"
                fieldOptions={[{ value: 'default', text: 'default' }]}
                fieldRequired={true}
                fieldValue={item.tenant_cod}
              />
            </Row>
          </Form>
          }
        </Modal.Body>

      <Modal.Footer>
        {
          accessDelete &&
          <Button variant="secondary" onClick={() => handleDelete(item.id)}>Delete</Button>
        }
        {
          accessSubmit &&
          <Button
            variant="primary"
            disabled={!showSubmit}
            onClick={() => handleSubmit(item)}>Submit
          </Button>
        }
      </Modal.Footer>
    </Modal.Dialog>
  </div>)
}

export default PersonItem;
