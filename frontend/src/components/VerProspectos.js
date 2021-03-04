import React, { useState, useEffect } from "react";
import 'antd/dist/antd.css';
import "./verProspectos.css";

import ApiClient from "../context/ApiClient";

import { Table } from 'antd';
// import { Badge } from 'antd';

import Header from './Header';





const columns = [
  { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
  { title: 'Apellido', dataIndex: 'apellido', key: 'apellido' },
  { title: 'Segundo Apellido', dataIndex: 'segundoApellido', key: 'segundoapellido' },
  { title: 'Estatus', dataIndex: 'estatus' , key: 'estatus',},
];


function VerProspectos() {
  const [prospectData, setData] = useState([]);

  useEffect(() => {
    ApiClient.getProspects()
      .then((data) => setData(data))
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
                  <p>Observaciones: {record.observaciones}</p>
                </div>
              </>
            ),
          }}
          dataSource={prospectData}
        />
      </div>
    </>
  );
  }

export default VerProspectos;


