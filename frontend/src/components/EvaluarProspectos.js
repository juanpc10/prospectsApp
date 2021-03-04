
import React, { useState, useEffect, useContext, } from "react";

import Header from './Header';
import "./evaluarProspectos.css";


import 'antd/dist/antd.css';
import { Table } from 'antd';

import ApiClient from "../context/ApiClient";

// import { GlobalContext } from '../context/globalState';


function EvaluarProspectos() {

  const [prospectData, setData] = useState([]);
  const [observaciones, handleObservaciones] = useState('');

  useEffect(() => {
    ApiClient.getProspects()
      .then((data) => setData(data))
  }, []);
  
  const autorizar = (e, i) => {
    const URL = "http://localhost:3201/prospecto/autorizar/";
    fetch(URL + e, { method: 'put' })
      .then(res => res.text())
      .then(res => console.log(res))
      console.log(prospectosSinCalificar);
      console.log(i);
      // let newArray1 = prospectosSinCalificar.slice(0, i);
      // console.log(newArray1);
      // let newArray2 = prospectosSinCalificar.slice(i+1, prospectosSinCalificar.length);
      // console.log(newArray2);
      // let newProspectsEnviados = newArray1 + newArray2;
      // console.log(JSON.stringify(newProspectsEnviados));
      // setData(newProspectsEnviados);
  }

  const onSubmit = (id, e) => {
    e.preventDefault();
    const URL = "http://localhost:3201/prospecto/rechazar/";
    fetch(URL + id + "/" + e, { method: 'put' })
      .then(res => res.text())
      .then(res => console.log(res))
      // console.log(prospectosSinCalificar);
      // console.log(id);
  }
  
  // let prospectosSinCalificar;
  // if(prospectData.length == 0) {
  //   prospectosSinCalificar = prospectData;
  // }

  let prospectosSinCalificar = prospectData.filter((item) => item.estatus.includes("Enviado"));
  prospectosSinCalificar.map((prospecto, i) => {
    prospecto.accion = 
    <>
      <button value={prospecto._id} onClick={(a) => autorizar(a.target.value, i)}>Autorizar</button>
      <form onSubmit={onSubmit}>
        <button type="submit" value="Submit" >Rechazar</button><input type="text" name="observaciones" value={observaciones} onChange={(e) => handleObservaciones(e.target.value)} placeholder="Observaciones..." ></input>
      </form>
    </>
  })

  const columns = [
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Apellido', dataIndex: 'apellido', key: 'apellido' },
    { title: 'Segundo Apellido', dataIndex: 'segundoApellido', key: 'segundoapellido' },
    { title: 'Acción', dataIndex: 'accion', key: 'accion',  },
  ];
  return (
    <>
      <Header />
      <div className="table-container">
        <h4>Evaluación de Prospectos</h4>
        <Table 
          columns={columns}
          dataSource={prospectosSinCalificar}
        />
      </div>
    </>
  );
}

export default EvaluarProspectos;
