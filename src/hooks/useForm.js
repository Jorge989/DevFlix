import { useState } from 'react';

function useForm(valoresIniciais) {
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

 function clearForm() {
  setValues(valoresIniciais);
 }
 return {
  values,
  handleChange,
  clearForm,

 }
}

export default useForm;