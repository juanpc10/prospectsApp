
import React, { useState, useEffect, useContext, } from "react";

import Header from './Header';
import "./evaluarProspectos.css";


import 'antd/dist/antd.css';
import { Table } from 'antd';

import ApiClient from "../context/ApiClient";

import { GlobalContext } from '../context/globalState';



function EvaluarProspectos() {
  const { todosProspectos, addToTodosProspectos, enviadosProspectos, addToEnviadosProspectos, deleteFromEnviadosProspectos } = useContext(GlobalContext);


  const [prospectData, setData] = useState([]);
  const [autorizarID, clickAutorizar] = useState('');
  const [prospectosEnviados, setProspectosEnviados] = useState([]);

  // useEffect(() => {
  //   ApiClient.getProspects()
  //     .then((data) => setData(data))
  // }, []);
  console.log(`quees ${enviadosProspectos}`);
  useEffect(() => {
    // if (todosProspectos.length == 0) {
      ApiClient.getProspects()
        // .then(data => data.map(item => addToTodosProspectos(item)));
        .then(data => {
          let prospectosSinCalificar = data.filter(item => item.estatus.includes("Enviado"))
          addToEnviadosProspectos(prospectosSinCalificar);
          // if(prospectosSinCalificar != 0) {
          //   prospectosSinCalificar.map(item => addToEnviadosProspectos(item))
          // }
        })
    // }
  }, []);
  console.log(`quees ${enviadosProspectos}`);
  // const prospectosSinCalificar = prospectData.filter((item) => item.estatus.includes("Enviado"));
  // setProspectosEnviados(prospectosSinCalificar);
  // console.log(prospectosSinCalificar);


  const autorizar = (e, i) => {
    // e.preventDefault();
    // console.log(e);
    // autorizarID = e;
    const URL = "http://localhost:3201/prospecto/autorizar/";
    fetch(URL + e, { method: 'put' })
      .then(res => res.text())
      .then(res => console.log(res))
    deleteFromEnviadosProspectos(i);
    // clickAutorizar(e);
    // setIsModalVisible(false);
  }




  todosProspectos.map((prospecto, i) => {
    prospecto.accion = 
      <>
        <button value={prospecto._id} onClick={(a) => autorizar(a.target.value, i)}>Autorizar</button>
        {/* <form onSubmit={rechazar}>
          <button index={i}>Rechazar</button><input placeholder="Observaciones"></input>
        </form> */}
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
          dataSource={enviadosProspectos}
        />
      </div>
    </>
  );
}

export default EvaluarProspectos;















const prospectData2 = [
  {
    nombre: 'Juan',
    apellido: 'Guzman',
    segundoApellido: 'Gonza',
    accion:  
      <>
        <button>Autorizar</button>
        <button>Rechazar</button><input placeholder="Observaciones"></input>
      </>,
  },
  {
    nombre: 'Juan2',
    apellido: 'Guzman2',
    segundoApellido: 'Gonza2',
    accion: 'render2',
  },
];
prospectData2[1].accion = <p>nice</p>




// useEffect(() => {
//   ApiClient.getProspects()
//     .then((data) => setData(data))
// }, []);