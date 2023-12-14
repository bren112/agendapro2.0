import React, { useState } from 'react';
import "./areacliente.css"
import img from '../../img/calendario.jpg'
function PaginaCliente() {
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [horario, setHorario] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');

  // Definir o estado da tabela
  const [tabela, setTabela] = useState([]);

  const abrirModal = (dia) => {
    setDiaSelecionado(dia);
  };

  const fecharModal = () => {
    setDiaSelecionado(null);
  };

  const verificarDisponibilidade = () => {
    const dados = { dia: diaSelecionado, hora: horario, telefone: telefone, cliente: nomeCliente };

    // Verificar se o horário já existe na tabela
    if (tabela.some(item => item.dia === dados.dia && item.hora === dados.hora)) {
      alert("Este horário já foi marcado. Escolha outro horário.");
      return;
    }

    adicionarNaTabela(dados);

    // Limpar os campos após a verificação
    setHorario('');
    setTelefone('');
    setNomeCliente('');

    fecharModal();
  };

  const adicionarNaTabela = (dados) => {
    // Usar a função de atualização do estado para garantir que a tabela seja atualizada corretamente
    setTabela(prevTabela => [...prevTabela, dados]);

    const tabela = obterTabelaDoLocalStorage();
    tabela.push(dados);
    salvarTabelaNoLocalStorage(tabela);
    alert("Horário marcado com sucesso para " + dados.cliente);
  };

  const obterTabelaDoLocalStorage = () => {
    return JSON.parse(localStorage.getItem('tabela')) || [];
  };

  const salvarTabelaNoLocalStorage = (tabela) => {
    localStorage.setItem('tabela', JSON.stringify(tabela));
  };

  return (
    <>
            <h1>AGENDE AQUI SEU HORÁRIO!</h1>
            <p>Clique no dia da semana e agende <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
  <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
  <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
</svg></p>
    <div className="pagina-app">

        <div className='container'>
      <div className="calendario">
        
        <div className="dia-semana" id="segunda-feira" onClick={() => abrirModal('segunda-feira')}>SEGUNDA-FEIRA</div>
        <div className="dia-semana" id="terca-feira" onClick={() => abrirModal('terca-feira')}>TERÇA-FEIRA</div>
        <div className="dia-semana" id="quarta-feira" onClick={() => abrirModal('quarta-feira')}>QUARTA-FEIRA</div>
        <div className="dia-semana" id="quinta-feira" onClick={() => abrirModal('quinta-feira')}>QUINTA-FEIRA</div>
        <div className="dia-semana" id="sexta-feira" onClick={() => abrirModal('sexta-feira')}>SEXTA-FEIRA</div>
        <div className="dia-semana" id="sabado" onClick={() => abrirModal('sabado')}>SÁBADO</div>
        <div className="dia-semana" id="domingo" onClick={() => abrirModal('domingo')}>DOMINGO</div>
      </div>
      <div id="janela-modal" className="janela-modal" style={{ display: diaSelecionado ? 'block' : 'none' }}>
        <div className="modal-conteudo">
          <span className="fechar" onClick={fecharModal}>&times;</span>
          <p>Escolha o horário:</p>
          <input type="time" id="horario" min="13:00" max="20:00" step="3600" value={horario} onChange={(e) => setHorario(e.target.value)} />
          <p>Telefone:</p>
          <input type="tel" id="telefone" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
          <p>Nome do Cliente:</p>
          <input type="text" id="nomeCliente" placeholder="Nome do Cliente" value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} /><br/>
          <button onClick={verificarDisponibilidade}>Verificar Disponibilidade</button>
        </div>
      </div>
    </div>

    <div className='dir'>
<img src={img} alt='img' id='calendar' />
    </div>
    </div></>
  );
}

export default PaginaCliente;
