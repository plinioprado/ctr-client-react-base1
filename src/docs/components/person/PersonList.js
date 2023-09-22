import { useState, useEffect, useContext } from 'react';
import { Button, Container, Table } from 'react-bootstrap';

import { BaseContext } from '../../../base/BaseContext';
import FieldFilter from '../../../base/components/field/FieldFilter';
import FieldFilterValue from '../../../base/components/field/FieldFilterValue';

import PersonItem from './PersonItem';

function AuxList() {

  // To use the Aux crud functions in context/reducer
  const table = 'person';

  const { accessJSON, list, item, getList, getItem, clearItem, updateField, createItem, updateItem, deleteItem } = useContext(BaseContext);

  useEffect(
    () => {
      async function fetchData() {
        await getList('person');
      };
      fetchData()
    },
    []);

  // list

  const primaryField = 'id';

  const columnList = [
    {value: 'id', text: 'Id'},
    {value: 'name', text: 'Name'},
    {value: 'email', text: 'E-mail'},
    {value: 'entity', text: 'Entity'},
    {value: 'active', text: 'Active'}
  ];

  // access

  const access = JSON.parse(accessJSON)[table];
  const accessDelete = item && !item.opNew && /d/.test(access);
  const accessSubmit = item && ((item.opNew && /c/.test(access)) || (!item.opNew && /u/.test(access)));
  const accessNew = /c/.test(access);

  // order

  const [order, setOrder] = useState({field: primaryField, asc: true});
  const orderHandleField = (field) => {
    if (field === order.field) setOrder({ field, asc: !order.asc});
    else setOrder({ field, asc: order.asc});
  }

  // filter

  const [filter, setFilter] = useState({field: primaryField, value: ''});
  const filterHandleField = (field) => setFilter({ field: field, value: filter.value})
  const filterHandleValue = (value) => setFilter({ field: filter.field, value})
  const filterApply = (item) => {
    if (!item || !filter || !item[filter.field]) return true;
    return item[filter.field].toString().toLowerCase().includes(filter.value.toLowerCase())
  };

  // handlers - item

  const handleShowModal = async (cod) => {
    await getItem(table, cod);
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

  // handlers - field

  const fieldChangeValue = (name,value) => {
    updateField({name, value});
  };

  return (
    <main className='dataList'>
      {
      !list ?
      <Container><p>Loading</p></Container>
      :
      <Container>
        <h2>Persons</h2>
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
              <td colSpan={columnList.length}>
                <div className='table-filter'>
                  <div>
                    <span>Filter:</span>
                    <FieldFilter
                      filter={filter}
                      filterHandleField={filterHandleField}
                      filterList={columnList}
                    />
                    <span>contains</span>
                    <FieldFilterValue
                    value={filter.value}
                    onChange={filterHandleValue}
                  />
                  </div>
                  <div>&nbsp;</div>
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <a href='/' onClick={(e) => { e.preventDefault(); orderHandleField('id') }}>Id {(order.field === 'id') && (order.asc ? '▲' : '▼')}</a>
              </th>
              <th>
              <a href='/' onClick={(e) => { e.preventDefault(); orderHandleField('name') }}>Name {(order.field === 'name') && (order.asc ? '▲' : '▼')}</a>
              </th>
              <th>
                <a href='/' onClick={(e) => { e.preventDefault(); orderHandleField('email') }}>E-mail {(order.field === 'email') && (order.asc ? '▲' : '▼')}</a>
              </th>
              <th>
                <a href='/' onClick={(e) => { e.preventDefault(); orderHandleField('active') }}>Entity{(order.field === 'entity') && (order.asc ? '▲' : '▼')}</a>
              </th>
              <th>
                <a href='/' onClick={(e) => { e.preventDefault(); orderHandleField('active') }}>Active{(order.field === 'email') && (order.asc ? '▲' : '▼')}</a>
              </th>
            </tr>
          </thead>
          <tbody>
          {
            Array.isArray(list) &&
            list
              .map(it => ({
                ...it,
                name: it.entity ? it.name_entity : `${it.name_last}, ${it.name_first}${(it.name_middle ? ' ' : '')}${it.name_middle}`,
                entity: it.entity ? 'Yes' : 'No',
                active: it.active ? 'Yes' : 'No'
              }))
              .filter(filterApply)
              .sort((a, b) => (a[order.field] < b[order.field] ? -1 : 1) * (order.asc ? 1 : -1 ))
              .map((item, index) => (
              <tr key={index}>
                <td key="cod" onClick={(e) => {e.preventDefault(); handleShowModal(item.id)}}><a href='/#'>{item.id}</a></td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.entity}</td>
                <td>{item.active}</td>
              </tr>))
          }
          </tbody>
        </Table>

        {
          Object.keys(item).length > 0  &&
          <PersonItem
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
};

export default AuxList;
