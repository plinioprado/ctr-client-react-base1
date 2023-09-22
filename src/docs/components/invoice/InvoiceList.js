import { useEffect, useContext } from 'react';
import { Button, Container, Table } from "react-bootstrap";

import { BaseContext } from '../../../base/BaseContext';
import InvoiceItem from './InvoiceItem';

function InvoiceList() {

  const { accessJSON, item, list, getList, clearItem, getItem, createItem, updateItem, deleteItem, updateField } = useContext(BaseContext);

  const table = 'invoice';

  useEffect(
    () => {
      async function fetchData() {
        await getList(table);
      };
      fetchData()
    },
    []);

  console.log(list)

  const columnList = [
    {value: 'id', text: 'Id' },
    {value: 'dt_doc', text: 'Date'},
    {value: 'descr', text: 'Description'},
    {value: 'currency', text: 'Curr.'},
    {value: 'val', text: 'Value'},
  ]

  // access

  const access = JSON.parse(accessJSON)['invoice'];
  const accessDelete = item && !item.opNew && /d/.test(access);
  const accessSubmit = item && ((item.opNew && /c/.test(access)) || (!item.opNew && /u/.test(access)));
  const accessNew = /c/.test(access);

  // handlers

  const handleShowModal = async (cod) => {
    await getItem('invoice', cod);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  };

  const handleCloseModal = () => clearItem();

  const handleDelete = (cod) => {
    deleteItem(table, cod)
    handleCloseModal();
  };

  const handleSubmit = async (item) => {
    let ok;
    if (item.opNew) {
      delete item.opNew;
      ok = await createItem(table, item);
    } else {
      delete item.opNew;
      ok = await updateItem(table, item);
    }
    if (ok) handleCloseModal();
  };

  const fieldChangeValue = (name,value) => {
    updateField({name, value});
  };

  return (
    <main className='dataList'>
      {
        !list.length
        ?
        <Container><p>Loading</p></Container>
        :
        <Container>
          <h2>Invoice</h2>
          <Table>
            <thead>
              <tr>
                <td colSpan={columnList.length} align='right'>
                  {
                    accessNew &&
                    <Button variant="primary" onClick={() => handleShowModal(0)}>New</Button>
                  }
                </td>
              </tr>
              <tr>
                {
                  columnList.map(it => (
                      <th key={it.value}>{it.text}</th>
                    ))
                }
              </tr>
            </thead>
            <tbody>
              {
                list.map(it => (
                    <tr key={it.id}>
                      <td className='number' onClick={(e) => {e.preventDefault(); handleShowModal(it.id)}}><a href='/#'>{it.id}</a></td>
                      <td>{it.dt.doc}</td>
                      <td>{it.descr}</td>
                      <td>{it.val.doc.currency}</td>
                      <td className='number'>{(it.val.doc.amount/100).toFixed(2)}</td>
                    </tr>
                  ))
              }
            </tbody>
          </Table>

          {
            item && Object.keys(item).length > 0  &&
            <InvoiceItem
              accessDelete={accessDelete}
              accessSubmit={accessSubmit}
              fieldChangeValue={fieldChangeValue}
              handleClose={handleCloseModal}
              handleDelete={handleDelete}
              handleSubmit={handleSubmit}
              item={item}
             />
          }

        </Container>
      }
    </main>
  )
}

export default InvoiceList;
