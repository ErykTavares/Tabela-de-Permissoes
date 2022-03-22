import React, { useEffect } from "react";
import styled from "styled-components";
import CheckBox from "../CheckBox";
import Arrow from "../Arrow";
import Button from "../ButtonSubmit";

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

let obj = {};
selectionarray.subselections.map((item) => {
  return (obj[item.name] = true);
});

const Permissions = () => {
  const [select, setSelect] = React.useState();
  const [collapsed, setCollapsed] = React.useState();
  const [refresh, setRefresh] = React.useState(false);

  React.useEffect(() => {
    setSelect(selectionarray);
    setCollapsed(obj);
  });

  function handleChange({ target }) {
    let tempSelectionArray = select;
    let tempSubselections = tempSelectionArray.subselections;
    let tempSub = tempSubselections.filter((item) => {
      let obj;
      item.subselections.filter((fil) => {
        if (fil.name === target.id) {
          obj = item;
        } else {
          return null;
        }
      });
      return obj;
    })[0];
    let tempChilds = tempSubselections.filter((fil) => {
      let list;
      fil.subselections.filter((sub) => {
        return sub.name === target.id ? (list = fil) : null;
      });
      return list;
    })[0];

    let setpermissions = (permissions, state) => {
      Object.keys(permissions).filter((fil) =>
        fil === target.name ? (permissions[fil] = state) : null
      );
      return permissions;
    };

    let setSubselectionPermissions = (subs, state) => {
      return subs.map((item) => {
        item.permissions = setpermissions(item.permissions, state);
        return item.hasOwnProperty("subselections")
          ? ((item.subselections = setSubselectionPermissions(
              item.subselections,
              state
            )),
            item)
          : item;
      });
    };

    let catchSubselect = (objlist, obj) => {
      return (obj = objlist.filter((fil) => {
        return fil.name === target.id ? fil : null;
      })[0]);
    };

    let setSubselection = (objlist, obj) => {
      return objlist.filter((fil) => {
        return fil.name === obj.name ? (fil = obj) : fil;
      });
    };

    let setnewchild = (obj, childnew) => {
      obj.subselections = obj.subselections.map((child) => {
        return child.name === childnew.name ? (child = childnew) : child;
      });
      return obj;
    };

    let allchildsSelect = (obj) => {
      obj.permissions[target.name] = obj.subselections.every((item) => {
        return item.permissions[target.name] === true;
      });
      return obj;
    };

    if (target.checked) {
      if (tempSelectionArray.name === target.id) {
        tempSelectionArray.subselections = setSubselectionPermissions(
          tempSubselections,
          true
        );
        tempSelectionArray.permissions = setpermissions(
          tempSelectionArray.permissions,
          true
        );
      } else if (catchSubselect(tempSubselections)) {
        let selectnow = catchSubselect(tempSubselections);
        selectnow.permissions = setpermissions(selectnow.permissions, true);
        tempSelectionArray = allchildsSelect(tempSelectionArray);
        selectnow.subselections = setSubselectionPermissions(
          selectnow.subselections,
          true
        );
        tempSubselections = setSubselection(tempSubselections, selectnow);
      } else if (catchSubselect(tempChilds.subselections)) {
        let child = catchSubselect(tempChilds.subselections);
        child.permissions = setpermissions(child.permissions, true);
        tempSub = allchildsSelect(tempSub);
        tempSubselections = setSubselection(
          tempSubselections,
          setnewchild(tempSub, child)
        );
      }
    } else {
      if (tempSelectionArray.name === target.id) {
        tempSelectionArray.subselections = setSubselectionPermissions(
          tempSubselections,
          false
        );
        tempSelectionArray.permissions = setpermissions(
          tempSelectionArray.permissions,
          false
        );
      } else if (catchSubselect(tempSubselections)) {
        let selectnow = catchSubselect(tempSubselections);
        selectnow.permissions = setpermissions(selectnow.permissions, false);
        tempSelectionArray = allchildsSelect(tempSelectionArray);
        selectnow.subselections = setSubselectionPermissions(
          selectnow.subselections,
          false
        );
        tempSubselections = setSubselection(tempSubselections, selectnow);
      } else if (catchSubselect(tempChilds.subselections)) {
        let child = catchSubselect(tempChilds.subselections);
        child.permissions = setpermissions(child.permissions, false);
        tempSub = allchildsSelect(tempSub);
        tempSubselections = setSubselection(
          tempSubselections,
          setnewchild(tempSub, child)
        );
      }
    }

    tempSelectionArray.subselections = tempSubselections;
    setRefresh(!refresh);
    return setSelect(tempSelectionArray);
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

  function handleClickArrow(name) {
    let newobj = collapsed;
    if (collapsed[name]) {
      Object.keys(newobj).filter((fil) => {
        return fil === name
          ? ((newobj[fil] = false), console.log(newobj))
          : null;
      });
    } else if (!collapsed[name]) {
      Object.keys(newobj).filter((fil) => {
        return fil === name ? (newobj[fil] = true) : null;
      });
    }
    setCollapsed(newobj);
    setRefresh(!refresh)
  }

  function handleSubmit(){
      select.subselections.map((item)=>{
       console.log(item.name, item.permissions)
       return item.subselections? item.subselections.map((sub)=>{return console.log(sub.name, sub.permissions)}) : null 
      })

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
                <div>{select.name}</div>
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
                        <Arrow name={select.name} handleClickArrow={handleClickArrow} collapsed={collapsed} />
                      </div>
                    </td>
                    {GenerateCheckbox(select)}
                  </tr>
                  {collapsed[select.name]
                    ? select.subselections.map((subselect, id) => {
                        return (
                          <tr key={id}>
                            <td>{subselect.name}</td>
                            {GenerateCheckbox(subselect)}
                          </tr>
                        );
                      })
                    : null}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        <Button text="Cadastrar" handleSubmit={handleSubmit} />
      </PermissionsStyle>
    );
  } else {
    return <h1>Error 404</h1>;
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
`;
export default Permissions;
