import { Button, Form, Modal, Row } from 'react-bootstrap';

import FieldKeySerial from '../fields/FieldKeySerial';
import FieldSelect from '../fields/FieldSelect';
import FieldText from '../fields/FieldText';
import FieldAmount from '../fields/FieldAmount';

import validateText from '../fields/fieldTextValidate';

function InvoiceItem({
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
      if (validateText(item.dt.doc, true)) throw new Error('date');

        return true;
      } catch {
        return false;
      }
    }

  const showSubmit = submitValidate();

  return (
    item && Object.keys(item).length > 0  &&
    <div className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate >
            <Row className="mb-3">
              <FieldKeySerial
                fieldLabel="Id"
                fieldMd="3"
                fieldName="id"
                fieldOpNew={item.opNew}
                fieldValue={item.id}
              />
              <FieldText
                fieldChangeValue={fieldChangeValue}
                fieldDisabled={!accessSubmit}
                fieldLabel="Date"
                fieldMd="3"
                fieldName="date"
                fieldRequired
                fieldValue={item.dt.doc}
              />
              <FieldSelect
                fieldChangeValue={fieldChangeValue}
                fieldDisabled={!accessSubmit && item.opNew}
                fieldLabel="Currency"
                fieldMd="2"
                fieldName="value_doc_currency"
                fieldOptions={[{ value: 'CAD', text: 'CAD' }]}
                fieldRequired
                fieldValue={item.val.doc.currency}
              />
              <FieldAmount
                fieldChangeValue={fieldChangeValue}
                fieldDisabled={!accessSubmit}
                fieldLabel="Value"
                fieldMd="4"
                fieldName="amount"
                fieldRequired
                fieldValue={item.val.doc}
              />
              <FieldText
                fieldChangeValue={fieldChangeValue}
                fieldDisabled={!accessSubmit}
                fieldLabel="Descr."
                fieldMd="12"
                fieldName="descr"
                fieldValue={item.descr}
              />
            </Row>
          </Form>
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
    </div>
  )
}

export default InvoiceItem;
