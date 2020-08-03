import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button'
import useForm from '../../../hooks/useForm';


function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  }
  const { handleChange, values, clearForm } = useForm(valoresIniciais)

  const [categoria, setCategorias] = useState('localhost')






  useEffect(() => {
    console.log('alo alo brasil');
    const URL_TOP = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      : 'https://jorgedevflix.herokuapp.com/categorias';
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
        clearForm();
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
        {categoria.map((categoria) => (
          <li key={`${categoria.titulo}`}>
            {categoria.titulo}
          </li>
        ))}


      </ul>


      <Link to="/">
        Ir para home
      </Link>
    </PageDefault >
  )
}


export default CadastroCategoria;