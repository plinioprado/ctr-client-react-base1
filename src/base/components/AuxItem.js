import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import FieldBoolean from './field/FieldBoolean';
import FieldSelect from './field/FieldSelect';
import FieldSerial from './field/FieldSerial';
import FieldPassword from './field/FieldPassword';
import FieldText from './field/FieldText';

function AuxItemModal({
    accessDelete,
    accessSubmit,
    item,
    header,
    fields,
    itemValidate,
    primaryFieldName,
    handleFieldChange,
    handleFieldChangeBoolean,
    handleClose,
    handleSubmit,
    handleDelete
  }) {

  const errorMessages = itemValidate();

  return (
    <div className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      {
      item &&
      <Modal.Dialog>
        <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate>
          <Row className="mb-3">
            {
              fields &&
              fields.map(el => {
                return (
                  <Form.Group as={Col} md={el.fieldMd} controlId={el.name} key={el.name}>
                  <Form.Label>{el.label}</Form.Label>
                  {
                  el.type === 'boolean' ?
                    <FieldBoolean
                      accessSubmit={accessSubmit}
                      itemFormat={el}
                      itemData={item}
                      handleFieldChange={handleFieldChangeBoolean}
                      errorMessage={errorMessages[el.name]}
                    />
                    :
                    el.type === 'select' ?
                    <FieldSelect
                      accessSubmit={accessSubmit}
                      itemFormat={el}
                      itemData={item}
                      handleFieldChange={handleFieldChange}
                      errorMessage={errorMessages[el.name]}
                    />
                    :
                    el.type === 'serial' ?
                    <FieldSerial
                      accessSubmit={accessSubmit}
                      itemFormat={el}
                      itemData={item}
                      handleFieldChange={handleFieldChange}
                      errorMessage={errorMessages[el.name]}
                    />
                    :
                    el.type === 'password' ?
                    <FieldPassword
                      accessSubmit={accessSubmit}
                      itemFormat={el}
                      itemData={item}
                      handleFieldChange={handleFieldChange}
                      errorMessage={errorMessages[el.name]}
                    />
                    :
                    <FieldText
                    accessSubmit={accessSubmit}
                    itemFormat={el}
                    itemData={item}
                    handleFieldChange={handleFieldChange}
                    errorMessage={errorMessages[el.name]}
                  />
                  }
                  <Form.Text className="text-error">{errorMessages[el.name]}</Form.Text>
                  </Form.Group>
                  )
              })
            }
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        {
          accessDelete &&
          <Button variant="secondary" onClick={() => handleDelete(item[primaryFieldName])}>Delete</Button>
        }
        {
        accessSubmit &&
        <Button variant="primary" onClick={() => handleSubmit(item)}>Submit</Button>
        }
      </Modal.Footer>
    </Modal.Dialog>
  }
  </div>)
}

export default AuxItemModal;