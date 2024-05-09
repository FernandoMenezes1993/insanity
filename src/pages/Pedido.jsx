import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect  } from 'react';
import { Steps } from 'rsuite';

import "./PedidoStyle.css"
import 'rsuite/dist/rsuite-no-reset.min.css';
const Pedido =  () =>{
    const BackURL = import.meta.env.VITE_URL;
    const [searchParams]  = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("q");
    const idRegear = searchParams.get("id");
    const [detaRegear, setDetaRegear] = useState([]);
    const [contNumero, setContNumero] = useState('');

    const verificarToken = async()=>{
        try {
            const res = await fetch(`${BackURL}/api/checks/${token}`);
            if(!res.ok){
                throw new Error(`Erro na consulta da API verificarToken`);
            }
            const data = await res.json();
            if(data.res == 502){
                navigate(`/`);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const getDetaRegear = async()=>{
        try {
            const res = await fetch(`${BackURL}/api/regear/${idRegear}`);
            if(!res.ok){
                throw new Error('Erro na consulta da API getDetaRegear');
            }
            const data = await res.json();
            setDetaRegear(data);
           
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        verificarToken();
        getDetaRegear();
    }, []);

  
    return(
        <div className="pgPedido">
            <div className="infogerais">
                <div className="buid">
                    <div className="cabeca">
                        <img src={`https://render.albiononline.com/v1/item/${detaRegear.Cabeca}`} alt="" />
                    </div>
                    <div className="peitoral">
                        <img src={`https://render.albiononline.com/v1/item/${detaRegear.Peitoral}`} alt="" />
                    </div>
                    <div className="Bota">
                        <img src={`https://render.albiononline.com/v1/item/${detaRegear.Bota}`} alt="" />
                    </div>
                    <div className="MainHand">
                        <img src={`https://render.albiononline.com/v1/item/${detaRegear.MainHand}`} alt="" />
                    </div>
                    <div className="OffHand">
                        <img src={`https://render.albiononline.com/v1/item/${detaRegear.OffHand}`} alt="" />
                    </div>
                    <div className="Capa">
                        <img src={`https://render.albiononline.com/v1/item/${detaRegear.Capa}`} alt="" />
                    </div>
                    <div className="Bolsa">
                        <img src={`https://render.albiononline.com/v1/item/${detaRegear.Bolsa}`} alt="" />
                    </div>
                </div>
            </div>
            <div className="dadosPedidos">
                <div className="divDados">
                    <p><strong>Solicitante:</strong> {detaRegear.Name}</p>
                    <p><strong>Data solicitada:</strong> {detaRegear.Data}</p>                
                    <p><strong>Classe da buid:</strong> {detaRegear.Class}</p>
                    <p><strong>Status da solicitação:</strong> <span className={`span-${detaRegear.Status}`}>{detaRegear.Status}</span></p>
                    <p><strong>Responsavel:</strong> {detaRegear.Responsavel}</p>
                    <p><strong>ID do re-gear:</strong> {detaRegear._id}</p>
                    <p><strong>Link da morte:</strong> <a href={`${detaRegear.Link}`} target="_blank">Acessar</a></p>
                </div>
                <div className="divProgrecao">
                    
                </div>
            </div>
        </div>
    )
};

export default Pedido