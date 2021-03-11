import React, { useEffect, useContext } from "react";
import "./verProspectos.css";

import Header from './Header';

import 'antd/dist/antd.css';
import { Table } from 'antd';

import ApiClient from "../context/ApiClient";
import { GlobalContext } from '../context/globalState';


const columns = [
  { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
  { title: 'Apellido', dataIndex: 'apellido', key: 'apellido' },
  { title: 'Segundo Apellido', dataIndex: 'segundoApellido', key: 'segundoapellido' },
  { title: 'Estatus', dataIndex: 'estatus' , key: 'estatus',},
];


function VerProspectos() {
  const { prospectos, addProspecto } = useContext(GlobalContext);

  useEffect(() => {
    if (prospectos.length == 0) {
      ApiClient.getProspects()
      .then(data => data.map(item => { 
          addProspecto(item);
        } )); // eslint-disable-next-line
    }
  }, []);


  return (
    <>
      <Header />
      <div className="table-container">
        <h4>Listado de Prospectos</h4>
        <Table
          columns={columns}
          expandable={{
            expandedRowRender: record => (
              <>
                <div className="info-prospecto">
                  <p>Calle: {record.calle}</p>
                  <p>Numero de Casa: {record.numeroCasa}</p>
                  <p>Colonia: {record.colonia}</p>
                  <p>Codigo Postal: {record.codigoPostal}</p>
                  <p>Telefono: {record.telefono}</p>
                  <p>RFC: {record.rfc}</p>
                </div>
                <div>
                  <p>Documentos: {record.documentos}</p>
                </div>
                <div>
                  <p>Observaciones: {record.observaciones}</p>
                </div>
              </>
            ),
          }}
          dataSource={prospectos}
        />
      </div>
    </>
  );
  }

export default VerProspectos;


