import React, { useState, useEffect, useContext, } from "react";

import './main.css';
import Header from './Header';
import { Link } from "@reach/router";

import { Popconfirm, Modal, Button } from 'antd';

import ApiClient from "../context/ApiClient";

import { GlobalContext } from '../context/globalState';







function Home() {
  const { addProspecto} = useContext(GlobalContext);
  const { prospectos } = useContext(GlobalContext);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [nombre, handleChangeNombre] = useState('');
  const [apellido, handleChangeApellido] = useState('');
  const [segundoApellido, handleChangeSegundoApellido] = useState('');
  const [calle, handleChangeCalle] = useState('');
  const [numeroCasa, handleChangeNumeroCasa] = useState('');
  const [colonia, handleChangeColonia] = useState('');
  const [codigoPostal, handleChangeCodigoPostal] = useState('');
  const [telefono, handleChangeTelefono] = useState('');
  const [rfc, handleChangeRFC] = useState('');
  const [files, handleChangeFiles] = useState('');


  useEffect(() => {
    if (prospectos.length == 0) {
      ApiClient.getProspects()
      .then(data => data.map(item => { 
          addProspecto(item);
        } )); // eslint-disable-next-line
    }
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const text = 'Ningún dato será guardado, ¿Desea continuar?';
  function confirm() {
    setIsModalVisible(false);
    handleChangeFiles('');
  }

  const onSubmit = e => {
    e.preventDefault();
    const newItem = {}
    newItem.key = prospectos.length + 1;
    newItem.nombre = nombre;
    newItem.apellido = apellido;
    newItem.segundoApellido = segundoApellido;
    newItem.calle = calle;
    newItem.numeroCasa = numeroCasa;
    newItem.colonia = colonia;
    newItem.codigoPostal = codigoPostal;
    newItem.telefono = telefono;
    newItem.rfc = rfc;
    newItem.estatus = 'Enviado';
    newItem.observaciones = "";
    let filePath = files;
    let splFileName = filePath.split("\\")
    let fileName = splFileName[2];;
    newItem.documentos = fileName;

    const URL = "http://localhost:3201/prospecto/";
    fetch(URL,
      { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        method: "post", body: JSON.stringify(newItem)
      })
        .then(res => res.text())
        .then(res => console.log(res))

    handleChangeFiles('');
    addProspecto(newItem);  
    setIsModalVisible(false);
  }

  return (
    <>
      <Header />
      <div className="container">
        <Button type="primary" onClick={showModal}>+ Agregar Prospecto</Button>
        <Modal title="Captura de Prospecto" visible={isModalVisible} footer={[
          <Popconfirm
            placement="topRight"
            title={text}
            onConfirm={confirm}
            okText="Salir"
            cancelText="Cancelar"
          ><Button>Salir</Button>
          </Popconfirm>
        ]}
        >
          <form onSubmit={onSubmit} encType="multipart/form/data">
            <div className="agregar-input">
              <p>Nombre</p><input type="text" name="nombre" value={nombre} onChange={(e) => handleChangeNombre(e.target.value)} placeholder="Nombre..." ></input>
            </div>
            <div className="agregar-input">
              <p>Apellido</p><input type="text" name="apellido" value={apellido} onChange={(e) => handleChangeApellido(e.target.value)} placeholder="Apellido..." ></input>
            </div>
            <div className="agregar-input">
              <p>Segundo Apellido</p><input type="text" name="segundoApellido" value={segundoApellido} onChange={(e) => handleChangeSegundoApellido(e.target.value)} placeholder="Apellido..." ></input>
            </div>
            <div className="agregar-input">
              <p>Calle</p><input type="text" name="calle" value={calle} onChange={(e) => handleChangeCalle(e.target.value)} placeholder="Calle..." ></input>
            </div>
            <div className="agregar-input">
              <p>Numero</p><input type="text" name="numeroCasa" value={numeroCasa} onChange={(e) => handleChangeNumeroCasa(e.target.value)} placeholder="Numero de Casa..." ></input>
            </div>
            <div className="agregar-input">
              <p>Colonia</p><input type="text" name="colonia" value={colonia} onChange={(e) => handleChangeColonia(e.target.value)} placeholder="Colonia..." ></input>
            </div>
            <div className="agregar-input">
              <p>Codigo Postal</p><input type="text" name="codigoPostal" value={codigoPostal} onChange={(e) => handleChangeCodigoPostal(e.target.value)} placeholder="Codigo Postal..." ></input>
            </div>
            <div className="agregar-input">
              <p>Telefono</p><input type="text" name="telefono" value={telefono} onChange={(e) => handleChangeTelefono(e.target.value)} placeholder="Telefono..." ></input>
            </div>
            <div className="agregar-input">
              <p>RFC</p><input type="text" name="rfc" value={rfc} onChange={(e) => handleChangeRFC(e.target.value)} placeholder="RFC..." ></input>
            </div>
            <div className="form-group">
              <label for="file">+ Subir Documento</label>
              <input type="file" name="file" value={files} onChange={(e) => handleChangeFiles(e.target.value)} id="file" className="form-control-file" multiple></input>
            </div>
            <div className='form-button-container'>
              <button type="submit" value="Submit" className='boton-registrar'>Registrar</button>
            </div>
          </form>
        </Modal>
        <Link to="/verProspectos">Ver Prospectos</Link>
        <Link to="/evaluarProspectos">Evaluar Prospectos</Link>
      </div>
    </>
  );
}

export default Home;







