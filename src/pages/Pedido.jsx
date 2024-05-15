import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect  } from 'react';

import { Modal, Button, Placeholder } from 'rsuite';
import "./PedidoStyle.css"
import 'rsuite/dist/rsuite-no-reset.min.css';


const Pedido =  () =>{
    /*MODAL Recusado*/
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setMsgStaffTitulo("Qual o motivo da recusa?")
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    /*MODAL Finalizado*/
    const [openFinalizar, setOpenFinalizar] = useState(false);
    const mostrarModalFinalizar = () => {
        setMsgStaffTitulo("Deixe sua mensagem!");
        setOpenFinalizar(true);
    };
    const fecharModalFinalizar = () => {
        setOpenFinalizar(false);
    };

    const [msgStaffTitulo, setMsgStaffTitulo] = useState("");
    const [msgStaff, setMsgStaff] = useState('')

    const BackURL = import.meta.env.VITE_URL;
    const [searchParams]  = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("q");
    const idRegear = searchParams.get("id");
    const [detaRegear, setDetaRegear] = useState([]);
    const [dataToken, setDataToken] = useState('');

    const verificarToken = async()=>{
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
           
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        verificarToken();
        getDetaRegear();
    }, []);

    
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
                window.location.reload();
        } catch (error) {
            
        }
       
        //console.log(dataToken.User)
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
        
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
        } catch (error) {
            
        }        
        setOpen(false);
        window.location.reload();        
    }
    const finalizarRegear = async()=>{
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
        
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
        } catch (error) {
            
        }        
        setOpen(false);
        window.location.reload();
    }
    
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
                <div className={`${dataToken.Cargo}`}>
                    <div className={`staff-${detaRegear.Status}-Dinamico`}>
                        <div className="contentStaff">

                        </div>
                        <div className="finalizarRegear">
                            <button className="btnFinalizar" onClick={mostrarModalFinalizar}>Finalizar</button>
                        </div>
                    </div>
                    {/*Div some quando o cargo for diferente de Staff*/}
                    <div className={`staff-${detaRegear.Status}`}>
                        {/*Pedido pendente*/}
                        {/*Div some quando o status for diferente de Pendente*/}
                        <button className="btnAceitarRegear" onClick={aceitarRegear}>Aceitar</button>
                        <button className="btnRecusarRegear" onClick={handleOpen}>Recusar</button>
                    </div>
                </div>
            </div>


            <Modal open={open} onClose={fecharModalFinalizar} size="xs">
                <Modal.Header>
                    <Modal.Title>{`${msgStaffTitulo}`}</Modal.Title>
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

            <Modal open={openFinalizar} onClose={fecharModalFinalizar} size="xs">
                <Modal.Header>
                    <Modal.Title>{`${msgStaffTitulo}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalBody">
                    <textarea className="msgStaff" type="text" placeholder="Deixe sua mensagem aqui..." value={msgStaff} onChange={e => setMsgStaff(e.target.value)} rows={6}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={finalizarRegear} appearance="primary">
                        Finalizar
                    </Button>
                    <Button onClick={fecharModalFinalizar} appearance="subtle">
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
           
        </div>
    )
};

export default Pedido