import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button'


function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  }
  const [categoria, setCategorias] = useState([]);
  const [values, setValues] = useState(valoresIniciais);

  function setValue(chave, valor) {
    //chave: nome, descricao, bla bli
    setValues({
      ...values,
      [chave]: valor,// nome: 'valor'

    })
  }



  function handleChange(infosDoEvento) {
    const { name, value } = infosDoEvento.target;
    setValue(name, value);
  }

  useEffect(() => {
    console.log('alo alo brasil');
    const URL_TOP = "http://localhost:8080/categorias";
    fetch(URL_TOP)
      .then(async (respostaDoServidor) => {
        const resposta = await respostaDoServidor.json();
        setCategorias(resposta);


      });

  }, []);

  return (
    <PageDefault>
      <h1>Cadastro de Categoria: {values.nome}</h1>

      <form onSubmit={function handleSubmit(infosDoEvento) {
        infosDoEvento.preventDefault();
        setCategorias([
          ...categoria,
          values
        ]);
        setValues({ valoresIniciais })
      }}>

        <FormField
          label="Nome da Categoria"
          type="textarea"
          name="nome"
          value={values.nome}
          onChange={handleChange}
        />


        <FormField
          label="Descrição"
          type="text"
          name="descricao"
          placeholder="Digite aqui"
          value={values.descricao}
          onChange={handleChange}
        />
        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <Button>
          Cadastrar
        </Button>
      </form >

      {categoria.length === 0 && (
        <div>
          Loading...
        </div>

      )}
      <ul>
        {categoria.map((categoria, indice) => {
          return (
            <li key={`${categoria}${indice}`}>
              {categoria.nome}
            </li>
          )

        })}
      </ul>


      <Link to="/">
        Ir para home
      </Link>
    </PageDefault >
  )
}


export default CadastroCategoria;