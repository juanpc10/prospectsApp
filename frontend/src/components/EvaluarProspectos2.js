



import React, { useState, useEffect, useContext, } from "react";

import Header from './Header';
import "./evaluarProspectos.css";


import 'antd/dist/antd.css';
import { Table, Input, InputNumber, Form, } from 'antd';

import ApiClient from "../context/ApiClient";

import { GlobalContext } from '../context/globalState';




function EvaluarProspectos() {

  const { prospectos, addProspecto, deleteProspecto, evaluandoProspectos, addEvaluandoProspecto, deleteEvaluandoProspecto } = useContext(GlobalContext);
  // let observaciones;
  // evaluandoProspectos.map(prospecto => {

    const [observaciones, handleObservaciones] = useState('');
  // })

  useEffect(() => {
    if (evaluandoProspectos.length == 0) {
      ApiClient.getProspects()
      .then(data => {
        if(prospectos.length == 0) {
          data.map(item => { 
            addProspecto(item);
          })
        }
        let prospectosSinCalificar = data.filter((item) => item.estatus.includes("Enviado"));
        prospectosSinCalificar.map(item => { 
          addEvaluandoProspecto(item);
        })
      })
    }   // eslint-disable-next-line
  }, []);
  // console.log(evaluandoProspectos);
  
  const autorizar = (id, i, prospecto) => {
    // console.log(i);
    // console.log(prospecto);
    const URL = "http://localhost:3201/prospecto/autorizar/";
    fetch(URL + id, { method: 'put' })
      .then(res => res.text())
      .then(res => console.log(res))

    for(let j = 0; j <prospectos.length; j++) {
      if (prospectos[j]._id == id) {
        deleteProspecto(j);
        prospecto.estatus = "Autorizado"
        addProspecto(prospecto);
      }
    }
    deleteEvaluandoProspecto(i);
  }

  const onSubmit = (e, i, prospecto) => {
    e.preventDefault();
    // const URL = "http://localhost:3201/prospecto/rechazar/";
    // fetch(URL + id + "/" + e, { method: 'put' })
    //   .then(res => res.text())
    //   .then(res => console.log(res))
    // console.log(observaciones);
  }
  
  
  let prospectosSinCalificar = evaluandoProspectos.filter((item) => item.estatus.includes("Enviado"));
  prospectosSinCalificar.map((prospecto, i) => {
    prospecto.accion = 
    <>
      <button value={prospecto._id} onClick={(a) => autorizar(a.target.value, i, prospecto)}>Autorizar</button>
      {/* <form onSubmit={onSubmit}>
        <button type="submit" value="Submit" >Rechazar</button>
        <input type="text" name="observaciones" value={observaciones} onChange={(e) => handleObservaciones(e.target.value)} placeholder="Observaciones..." ></input>
      </form> */}
      <EditableCell />

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



