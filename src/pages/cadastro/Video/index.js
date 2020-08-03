import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForm';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos'
import categoriaRepository from '../../../repositories/categorias';



function CadastroVideo() {
  const history = useHistory();
  const [categoria, setCategorias] = useState([]);
  const categoryTitles = categoria.map(({ titulo }) => titulo)
  const { handleChange, values } = useForm({
    titulo: 'Video padrão',
    url: 'https://www.youtube.com/watch?v=jOAU81jdi-c',
    categoria: 'Front-End',

  });

  useEffect(() => {
    categoriaRepository
      .getAll()
      .then((categoriasFromServer) => {
        setCategorias(categoriasFromServer);
      })
  }, []);

  console.log(categoryTitles);



  return (
    <PageDefault>
      <h1>Cadastro de Video</h1>


      <form onSubmit={(event) => {
        event.preventDefault();
        // alert('Vídeo Cadastrado com sucesso!')
        const categoriaEscolhida = categoria.find(() => {
          return categoria.titulo === values.categoria;
        });
        videosRepository.create({
          titulo: values.titulo,
          url: values.url,
          categoriaId: 1,
        })
          .then(() => {
            console.log('Cadastrou com sucesso!');
            history.push('/');
          });
      }}

      >
        <FormField
          label="Titulo do Vídeo"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />
        <FormField
          label="URL"
          name="url"
          value={values.url}
          onChange={handleChange}
        />
        <FormField
          label="Categoria"
          name="categoria"
          value={values.categoria}
          onChange={handleChange}
          suggestions={
            categoryTitles
          }
        />
        <Button type="submit">
          Cadastrar
        </Button>
      </form>

      <Link to="/cadastro/categoria">
        Cadastrar Categoria
      </Link>
    </PageDefault >
  )
}

export default CadastroVideo; 