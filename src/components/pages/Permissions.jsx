import React, { useEffect } from "react";
import styled from "styled-components";
import CheckBox from "../CheckBox";
import { ReactComponent as Arrow } from "../assets/arrow-down-svgrepo-com.svg";

const selectionarray = {
  name: "Todos",
  subselections: [
    {
      name: "Analíse",

      subselections: [
        {
          name: "Analise de contas",
          permissions: {
            "Ver listagem": false,
            "Ver detalhes": false,
            Criar: false,
            Editar: false,
            Deletar: false,
          },
        },
        {
          name: "Análisá de transações",
          permissions: {
            "Ver listagem": false,
            "Ver detalhes": false,
            Criar: false,
            Editar: false,
            Deletar: false,
          },
        },
      ],
      permissions: {
        "Ver listagem": false,
        "Ver detalhes": false,
        Criar: false,
        Editar: false,
        Deletar: false,
      },
    },

    {
      name: "Contas",

      subselections: [
        {
          name: "Cliente",
          permissions: {
            "Ver listagem": false,
            "Ver detalhes": false,
            Criar: false,
            Editar: false,
            Deletar: false,
          },
        },
        {
          name: "Transações",
          permissions: {
            "Ver listagem": false,
            "Ver detalhes": false,
            Criar: false,
            Editar: false,
            Deletar: false,
          },
        },
        {
          name: "Contas digitais",
          permissions: {
            "Ver listagem": false,
            "Ver detalhes": false,
            Criar: false,
            Editar: false,
            Deletar: false,
          },
        },
      ],
      permissions: {
        "Ver listagem": false,
        "Ver detalhes": false,
        Criar: false,
        Editar: false,
        Deletar: false,
      },
    },

    {
      name: "Customização",

      subselections: [
        {
          name: "Limites e horários",
          permissions: {
            "Ver listagem": false,
            "Ver detalhes": false,
            Criar: false,
            Editar: false,
            Deletar: false,
          },
        },
        {
          name: "Tarifas",
          permissions: {
            "Ver listagem": false,
            "Ver detalhes": false,
            Criar: false,
            Editar: false,
            Deletar: false,
          },
        },
        {
          name: "Tarifas personalizadas",
          permissions: {
            "Ver listagem": false,
            "Ver detalhes": false,
            Criar: false,
            Editar: false,
            Deletar: false,
          },
        },
        {
          name: "Conta",
          permissions: {
            "Ver listagem": false,
            "Ver detalhes": false,
            Criar: false,
            Editar: false,
            Deletar: false,
          },
        },
      ],
      permissions: {
        "Ver listagem": false,
        "Ver detalhes": false,
        Criar: false,
        Editar: false,
        Deletar: false,
      },
    },
    {
      name: "Financeiro",

      subselections: [
        {
          name: "Entradas",
          permissions: {
            "Ver listagem": false,
            "Ver detalhes": false,
            Criar: false,
            Editar: false,
            Deletar: false,
          },
        },
      ],
      permissions: {
        "Ver listagem": false,
        "Ver detalhes": false,
        Criar: false,
        Editar: false,
        Deletar: false,
      },
    },
  ],
  permissions: {
    "Ver listagem": false,
    "Ver detalhes": false,
    Criar: false,
    Editar: false,
    Deletar: false,
  },
};

const Permissions = () => {
  const [select, setSelect] = React.useState();
  const [refresh, setRefresh] = React.useState(false);

  useEffect(() => setSelect(selectionarray));

  function handleChange({ target }) {
    let tempSelectionArray = select;
    let newpermissionskey = (key, value, obj) => {
      obj[key] = value;
      return obj;
    };
    let newsubs = (subs, permissionsnow) =>
      subs.map((item) => {
        item.permissions = permissionsnow;
        return item.hasOwnProperty("subselections")
          ? ((item.subselections = newsubs(item.subselections, permissionsnow)),
            item)
          : item;
      });
    let tempSubSelection = (sublist, state) => {
      return sublist.map((sub) => {
        return sub.name === target.id
          ? ((sub.permissions = newpermissionskey(
              target.name,
              state,
              sub.permissions
            )),
            sub.hasOwnProperty("subselections")
              ? ((sub.subselections = newsubs(
                  sub.subselections,
                  sub.permissions
                )),
                sub)
              : sub)
          : sub;
      });
    };

    let tempsub = (objlist, name) => {
      name = objlist.filter((fil) => {
        return fil.name === target.id ? fil : null;
      });
      return name[0];
    };

    let childs = (objlist, name) => {
      name = objlist.map((item) => {
       name = item.subselections.filter((fil)=>{return fil.name === target.id? fil : null});
       return name[0].hasOwnProperty("name")?  (name[0].name === target.id ? item : null): null})
      return name[0]
    };
    if (target.checked) {
      if (tempSelectionArray.name === target.id) {
        tempSelectionArray.permissions = newpermissionskey(
          target.name,
          true,
          tempSelectionArray.permissions
        );
        tempSelectionArray.subselections = newsubs(
          tempSelectionArray.subselections,
          tempSelectionArray.permissions
        );
      }

      if(childs(tempSelectionArray.subselections).name === target.id){
        console.log("ativou")
      }

      if (tempsub(tempSelectionArray.subselections).name === target.id) {
        tempSelectionArray.subselections = tempSubSelection(
          tempSelectionArray.subselections,
          true
        );
      }
    } else {
      if (tempSelectionArray.name === target.id) {
        tempSelectionArray.permissions = tempSelectionArray.permissions =
          newpermissionskey(target.name, false, tempSelectionArray.permissions);
        tempSelectionArray.subselections = newsubs(
          tempSelectionArray.subselections,
          tempSelectionArray.permissions
        );
      } else if (tempsub(tempSelectionArray.subselections).name === target.id) {
        tempSelectionArray.subselections = tempSubSelection(
          tempSelectionArray.subselections,
          false
        );
      }
    }
    setSelect(tempSelectionArray);
    setRefresh(!refresh);
  }

  function GenerateCheckbox(target) {
    var allcheckbox = [];
    Object.keys(selectionarray.permissions).map((item) => {
      return (allcheckbox = [
        ...allcheckbox,
        <CheckBox
          id={target.name}
          name={item}
          handleChange={handleChange}
          state={target.permissions[item]}
        />,
      ]);
    });
    return allcheckbox.map((item, id) => {
      return <td key={id}>{item}</td>;
    });
  }

  if (select) {
    return (
      <PermissionsStyle className="container">
        <table>
          <thead>
            <tr>
              <th className="first"></th>
              {Object.keys(select.permissions).map((item, id) => {
                return <th key={id}>{item}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            <tr className="selectionTitle">
              <td>
                <div>
                  {select.name} <Arrow />
                </div>
              </td>
              {GenerateCheckbox(select)}
            </tr>
            {select.subselections.map((select, id) => {
              return (
                <React.Fragment key={id}>
                  <tr className="selectionTitle">
                    <td>
                      <div>
                        {select.name}
                        <Arrow />
                      </div>
                    </td>
                    {GenerateCheckbox(select)}
                  </tr>
                  {select.subselections.map((subselect, id) => {
                    return (
                      <tr key={id}>
                        <td>{subselect.name}</td>
                        {GenerateCheckbox(subselect)}
                      </tr>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        <button>Cadastrar</button>
      </PermissionsStyle>
    );
  } else {
    return <h2>Error</h2>;
  }
};

const PermissionsStyle = styled.section`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 40px;
    overflow-x: hidden;
    @media screen and (max-width: 680px) {
      max-width: 90%;
    }
  }

  .first {
    width: 150px;
  }

  th,
  td {
    width: 100px;
    height: 40px;
    text-align: center;
    border: none;
  }

  .selection {
    background-color: #f8f8f8;
  }

  .selectionTitle {
    font-weight: bold;
  }

  .selectionTitle:nth-child(1) {
    background-color: #eff1f1;
  }
  .selectionTitle:nth-child(1) svg {
    display: none;
  }

  .selectionTitle div {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .selectionSub {
    background-color: #f8f8f8;
  }

  button {
    width: 200px;
    height: 40px;
    background-color: #6b7375;
    border: none;
    border-radius: 20px;
    color: white;
    font-size: 1.2rem;
    transition: 0.5s;
    cursor: pointer;
    &:hover {
      background-color: #494f50;
    }
  }
`;
export default Permissions;
