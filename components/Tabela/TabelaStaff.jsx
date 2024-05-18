import React, { useState } from 'react';
import "./TabelaStaffStyle.css";

function TabelaStaff( { regears, token }) {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina, setItensPorPagina] = useState(12);

    const chamarRegear = (solicitacao) => {
        const url = `/pedido?q=${token}&id=${solicitacao._id}`;
        window.open(url, '_blank');
    };

    // Cálculo de páginas
    const indexOfLastItem = paginaAtual * itensPorPagina;
    const indexOfFirstItem = indexOfLastItem - itensPorPagina;
    const solicitaçõesAtuais = regears.slice(indexOfFirstItem, indexOfLastItem);

    const totalPaginas = Math.ceil(regears.length / itensPorPagina);

    const mudarPagina = (numeroPagina) => {
        setPaginaAtual(numeroPagina);
    };

    return (
        <div className="containerTabelaStaff">
            <table className='tabelaStaff'>
                <thead>
                    <tr>
                        <th className="tabelaTitle">Data</th>
                        <th className="tabelaTitle">Nome</th>
                        <th className="tabelaTitle">Responsável</th>
                        <th className="tabelaTitle">Classe</th>
                        <th className="tabelaTitle">Status</th>
                        <th className="tabelaTitle">Link</th>
                    </tr>
                </thead>
                <tbody>
                {solicitaçõesAtuais
                        .filter(regear => regear.Status !== "Negado" && regear.Status !== "Finalizado")
                        .map(regear => (
                            <tr key={regear._id}>
                                <td className="idTabela"><strong>{regear.Data}</strong></td>
                                <td className="NameTabela">{regear.Name}</td>
                                <td className="ResponsavelTabela">{regear.Responsavel}</td>
                                <td className="ClassTabela">{regear.Class}</td>
                                <td className={regear.Status}>{regear.Status}</td>
                                <td className="acessarTabela" onClick={() => chamarRegear(regear)}>Acessar</td>
                            </tr>
                        ))}
                </tbody>
            </table> 

            <div className="paginationStaff">
                {[...Array(totalPaginas).keys()].map(num => (
                    <button key={num} onClick={() => mudarPagina(num + 1)} className={paginaAtual === num + 1 ? "active" : ""}>
                        {num + 1}
                    </button>
                ))}
            </div>   
            
                     
        </div>
    );
}

export default TabelaStaff;