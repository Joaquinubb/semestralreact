import React, { Fragment, useState, useEffect } from "react";
import { Header, Sidebar } from "../components/index";
import { Link } from "react-router-dom";
export function Arbitros() {
  //Obtenemos los datos
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const apiUrl = process.env.REACT_APP_API;

      let data = await fetch(`${apiUrl}/arbitros`, {
        method: "GET",
      }).then((response) => response.json());

      setData(data);
    }

    fetchData();
  }, []);

  const handleChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm === "") {
      let response = fetch(`${process.env.REACT_APP_API}/arbitros`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    } else {
      const filteredData = data.filter((arbitros) =>
        arbitros.apellido_arbitro.toLowerCase().includes(searchTerm)
      );
      setData(filteredData);
    }
  };
  //Retorno del componente
  return (
    <Fragment>
      <div className="container-fluid d-flex flex-column vh-100">
        <Header></Header>
        <div className="row flex-grow-1">
          <div className="col-sidebar blue d-flex flex-column sidebar-container">
            <Sidebar></Sidebar>
          </div>
          <div className="col mt-5 pt-4 content-container">
            <div className="bg-white p-3">
              <div className="d-flex justify-content-between">
                <h2 className="red-text bold text-20">
                  Árbitros de la Chilean Premier League
                </h2>
                <input
                  placeholder="Buscar por apellido"
                  className="form-control w-fit border-red-2 rounded-4 red-text px-3 py-1 text-15 focus"
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div className="arbitros-list mt-4">
                {data &&
                  data.map((arbitros) => (
                    <div
                      className="red-text text-12 decoration-none medium text-center"
                      key={arbitros.id_arbitro}
                    >
                      <div className="custom-border-type-arbitro hover-bg-gray">
                        <div className="arbitro">
                          <div className="foto-arbitro">
                            <img
                              src="images/Group.png"
                              alt="Foto del arbitro"
                            />
                          </div>
                          <div className="info-arbitro">
                            <div className="">
                              {arbitros.nombre_arbitro}{" "}
                              {arbitros.apellido_arbitro}
                            </div>
                            <div className="semibold">{arbitros.edad} años</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
