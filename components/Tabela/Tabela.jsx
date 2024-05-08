import React, { useState } from 'react';
import "./TabelaStyle.css";

function Tabela({ solicitações, token }) {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina, setItensPorPagina] = useState(12);

    const chamarRegear = (solicitacao) => {
        const url = `/pedido?q=${token}&id=${solicitacao._id}`;
        window.open(url, '_blank');
    };

    // Cálculo de páginas
    const indexOfLastItem = paginaAtual * itensPorPagina;
    const indexOfFirstItem = indexOfLastItem - itensPorPagina;
    const solicitaçõesAtuais = solicitações.slice(indexOfFirstItem, indexOfLastItem);

    const totalPaginas = Math.ceil(solicitações.length / itensPorPagina);

    const mudarPagina = (numeroPagina) => {
        setPaginaAtual(numeroPagina);
    };

    return (
        <div className="tabelaCss">
            <table>
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
                    {solicitaçõesAtuais.map(solicitacao => (
                        <tr key={solicitacao._id}>
                            <td className="idTabela"><strong>{solicitacao.Data}</strong></td>
                            <td className="NameTabela">{solicitacao.Name}</td>
                            <td className="ResponsavelTabela">{solicitacao.Responsavel}</td>
                            <td className="ClassTabela">{solicitacao.Class}</td>
                            <td className={solicitacao.Status}>{solicitacao.Status}</td>
                            <td className="acessarTabela" onClick={() => chamarRegear(solicitacao)}>Acessar</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                {[...Array(totalPaginas).keys()].map(num => (
                    <button key={num} onClick={() => mudarPagina(num + 1)} className={paginaAtual === num + 1 ? "active" : ""}>
                        {num + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Tabela;