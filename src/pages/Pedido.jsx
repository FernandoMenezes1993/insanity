import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect  } from 'react';

import { Modal, Button, Loader } from 'rsuite';
import "./PedidoStyle.css"
import 'rsuite/dist/rsuite-no-reset.min.css';


const Pedido =  () =>{
    const[loading, setLoading] = useState(false);
    /*MODAL Recusado*/
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const [msgStaff, setMsgStaff] = useState('')
    const [bauRegear, setBauRegear] = useState('')

    const BackURL = import.meta.env.VITE_URL;
    const [searchParams]  = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("q");
    const idRegear = searchParams.get("id");
    const [detaRegear, setDetaRegear] = useState([]);
    const [dataToken, setDataToken] = useState('');

    const verificarToken = async()=>{
        setLoading(true);
        try {
            const res = await fetch(`${BackURL}/api/checks/${token}`);
            if(!res.ok){
                throw new Error(`Erro na consulta da API verificarToken`);
            }
            const data = await res.json();
            setDataToken(data)
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
            
            setTimeout(()=>{
                setLoading(false);
            }, 1000);
           
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        verificarToken();
        getDetaRegear();
    }, []);

    const atualizarPagina = ()=>{
        window.location.reload();
    }
    
    const aceitarRegear = async()=>{
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth() + 1; 
        const year = now.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : `${day}`;
        const formattedMonth = month < 10 ? `0${month}` : `${month}`;
        
        const dataAceito = `${formattedDay}/${formattedMonth}/${year}`;
        const attRegear ={
            Responsavel:  dataToken.User,
            Status: "Aceito",
            DataAceito: dataAceito
        }
        try {
            const response = await fetch(`${BackURL}/api/regear/att/${detaRegear._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify(attRegear)
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                atualizarPagina();
        } catch (error) {
            
        }
    }
    const recusarRegear = async()=>{
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth() + 1; 
        const year = now.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : `${day}`;
        const formattedMonth = month < 10 ? `0${month}` : `${month}`;
        
        const DataFinalizado = `${formattedDay}/${formattedMonth}/${year}`;
        const attRegear ={
            Responsavel:  dataToken.User,
            Status: "Negado",
            DataFinalizado: DataFinalizado, 
            MsgStaff: msgStaff
        }        
          
        try {
            
            const response = await fetch(`${BackURL}/api/regear/finalizar/${detaRegear._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify(attRegear)
                });
                window.location.reload()
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }                        
                atualizarPagina();
        } catch (error) {
            
        } 
        
    }
    const finalizarRegearPronto = async()=>{
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth() + 1; 
        const year = now.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : `${day}`;
        const formattedMonth = month < 10 ? `0${month}` : `${month}`;
        
        const DataFinalizado = `${formattedDay}/${formattedMonth}/${year}`;
        const attRegear ={
            Responsavel:  dataToken.User,
            Status: "Finalizado",
            DataFinalizado: DataFinalizado, 
            MsgStaff: bauRegear,
        }
        try {
            const response = await fetch(`${BackURL}/api/regear/finalizar/${detaRegear._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify(attRegear)
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                atualizarPagina();
        } catch (error) {
            console.error(error)
        }
    }

    //Ajuste nas imagens quando clicar
    const [statusCabeca, setStatusCabeca] = useState("cabecaOff")
    const [statusPeito, setStatusPeito] = useState("peitoOff")
    const [statusBota, setStatusBota] = useState("botaOff")
    const [statusMainHand, setStatusMainHand] = useState("mainHandOff")
    const [statusOffHand, setStatusOffHand] = useState("offHandOff")

    const clicoNaCabeca = ()=>{
        if(statusCabeca == 'cabecaOff'){
            setStatusCabeca("cabecaOn")
        }else{
            setStatusCabeca("cabecaOff")
        }
    }
    const clicoNoPeito = ()=>{
        if(statusPeito == 'peitoOff'){
            setStatusPeito("peitoOn")
        }else{
            setStatusPeito("peitoOff")
        }
    }
    const clicoNaBota = ()=>{
        if(statusBota == 'botaOff'){
            setStatusBota("botaOn")
        }else{
            setStatusBota("botaOff")
        }
    }
    const clicoNoMainHand = ()=>{
        if(statusMainHand == 'mainHandOff'){
            setStatusMainHand("mainHandOn")
        }else{
            setStatusMainHand("mainHandOff")
        }
    }
    const clicoNoOffHand = ()=>{
        if(statusOffHand == 'offHandOff'){
            setStatusOffHand("offHandOn")
        }else{
            setStatusOffHand("offHandOff")
        }
    }
    
    return(
        <div className="pgPedido">
            <div className="infogerais">
                <div className="buid">
                    <div className="cabeca">
                        <img src={`https://render.albiononline.com/v1/item/${detaRegear.Cabeca}`} alt="" className={`${statusCabeca}`} onClick={clicoNaCabeca}/>
                    </div>
                    <div className="peitoral">
                        <img src={`https://render.albiononline.com/v1/item/${detaRegear.Peitoral}`} alt="" className={`${statusPeito}`} onClick={clicoNoPeito}/>
                    </div>
                    <div className="Bota">
                        <img src={`https://render.albiononline.com/v1/item/${detaRegear.Bota}`} alt="" className={`${statusBota}`} onClick={clicoNaBota}/>
                    </div>
                    <div className="MainHand">
                        <img src={`https://render.albiononline.com/v1/item/${detaRegear.MainHand}`} alt="" className={`${statusMainHand}`} onClick={clicoNoMainHand}/>
                    </div>
                    <div className="OffHand">
                        <img src={`https://render.albiononline.com/v1/item/${detaRegear.OffHand}`} alt="" className={`${statusOffHand}`} onClick={clicoNoOffHand}/>
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
                {loading ? (
                    <div className="divLoading">
                        <Loader size="lg" center content={<span style={{ color: 'white' }}>Carregando...</span>} />
                    </div>
                ):(
                    <div className={`${dataToken.Cargo}`}>

                        {/*Div que mostra para staff quando o pedido for aceito*/}
                        <div className={`staff-${detaRegear.Status}-Dinamico`}>
                            <div className="contentStaff">
                                <p>Em qual baú o Re-gear está:</p> <input type="text" className="inputBau" value={bauRegear} onChange={e => setBauRegear(e.target.value)}/>
                            </div>
                            <div className="finalizarRegear">
                                <button className="btnFinalizar" onClick={finalizarRegearPronto}>Finalizar</button>
                                <button className="btnFinalizar" onClick={handleOpen}>Recusar</button>
                            </div>
                        </div>

                        {/*Div aparece para Staff quando a pedido estiver pendente*/}
                        <div className={`staff-${detaRegear.Status}`}>                                                        
                            <button className="btnAceitarRegear" onClick={aceitarRegear}>Aceitar</button>
                            <button className="btnRecusarRegear" onClick={handleOpen}>Recusar</button>
                        </div>

                        {/*Div para os membros*/}
                        
                    </div>

                )}
            </div>


            <Modal open={open} onClose={handleClose} size="xs">
                <Modal.Header>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalBody">
                    <textarea className="msgStaff" type="text" placeholder="Deixe sua mensagem aqui..." value={msgStaff} onChange={e => setMsgStaff(e.target.value)} rows={6}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={recusarRegear} appearance="primary">
                        Recusar
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

export default Pedido