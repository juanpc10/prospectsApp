import React, { useState, useEffect, useContext, } from "react";
import "./evaluarProspectos.scss";

import Header from './Header';

import 'antd/dist/antd.css';
import { Table } from 'antd';

import ApiClient from "../context/ApiClient";
import { GlobalContext } from '../context/globalState';


function EvaluarProspectos() {

  const { prospectos, addProspecto, deleteProspecto, evaluandoProspectos, addEvaluandoProspecto, deleteEvaluandoProspecto } = useContext(GlobalContext);
  const [observaciones, handleChangeObservaciones] = useState('');
  const [isEditable, setEdit] = useState();

  useEffect(() => {
    if (evaluandoProspectos.length === 0) {
      ApiClient.getProspects()
      .then(data => {
        if(prospectos.length === 0) {  // eslint-disable-next-line
          data.map(item => {  
            addProspecto(item);
          })
        }
        let prospectosSinCalificar = data.filter((item) => item.estatus.includes("Enviado"));  // eslint-disable-next-line
        prospectosSinCalificar.map(item => { 
          addEvaluandoProspecto(item);
        })
      })
    }   // eslint-disable-next-line
  }, []);
  
  const autorizar = (id, i, prospecto) => {
    const URL = "http://localhost:3201/prospecto/autorizar/";
    fetch(URL + id, { method: 'put' })
      .then(res => res.text())
      .then(res => console.log(res))

    for(let j = 0; j <prospectos.length; j++) {
      if (prospectos[j]._id === id) {
        deleteProspecto(j);
        prospecto.estatus = "Autorizado"
        addProspecto(prospecto);
      }
    }
    deleteEvaluandoProspecto(i);
  }

  const rechazar = (id, i, prospecto) => {
    console.log(id);
    console.log(i)
    console.log(prospecto);

    const URL = "http://localhost:3201/prospecto/rechazar/";
    fetch(URL + id + "/" + observaciones, { method: 'put' })
      .then(res => res.text())
      .then(res => console.log(res))

    for(let j = 0; j <prospectos.length; j++) {
      if (prospectos[j]._id === id) {
        deleteProspecto(j);
        prospecto.estatus = "Rechazado"
        prospecto.observaciones = observaciones;
        addProspecto(prospecto);
      }
    }
    deleteEvaluandoProspecto(i);
    setEdit();
  }

  const editHandler = e => {
    console.log(e);
    if(e !== isEditable) {
      setEdit(e);
    } else if (e === isEditable) {
      setEdit();
    }
  }
  const submitHandler = (e) => {
    e.preventDefault();
    handleChangeObservaciones('');
  }
  
  let prospectosSinCalificar = evaluandoProspectos.filter((item) => item.estatus.includes("Enviado")); // eslint-disable-next-line
  prospectosSinCalificar.map((prospecto, i) => {
    prospecto.accion = 
    <>
      <button value={prospecto._id} onClick={(a) => autorizar(a.target.value, i, prospecto)}>Autorizar</button>
      {isEditable === i ? (
        <>
          <button onClick={() => editHandler(true)}>Cancelar</button>
          <form onSubmit={submitHandler}  >
            <input id='inputfield' type="text" name="inputfield" value={observaciones} onChange={(a) => handleChangeObservaciones(a.target.value)} placeholder="Observaciones..." />
            <button type="submit" value={prospecto._id} onClick={(a) => rechazar(a.target.value, i, prospecto)} >Reject</button> 
          </form>
        </>
        ) : ( 
        <button onClick={() => editHandler(i)}>Rechazar</button>
        )
      }
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



