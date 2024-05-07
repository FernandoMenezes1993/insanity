import CustomSidenav  from "../../components/Nav/Nav";
import Tabela from "../../components/Tabela/Tabela"
import { useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

//Modal
import { Modal, Button, Dropdown } from 'rsuite';

import 'rsuite/dist/rsuite-no-reset.min.css';
import "./RegearStyle.css"
const Regear = () =>{
    const BackURL = import.meta.env.VITE_URL;
    const navigate = useNavigate();
    const [searchParams]  = useSearchParams();
    const token = searchParams.get("q");

    //Modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setSelectedItem('Classe');
        setLinkRegear("")
    };

       
    const handleSolicitar = async()=>{
        const newRegear ={
            Name: player.User,
            Link: linkRegear,
            Class: selectedItem
        };
        if (linkRegear.includes("albiononline.com/killboard/kill/")) {
            try {
                const res = await fetch(`${BackURL}/api/create/regear`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                        body: JSON.stringify(newRegear)
                    });
    
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
            
                    const result = await res.json();

                    if(result == 200){
                        setOpen(false)
                        window.location.reload();
                    }else{
                        console.log("Erro na solicitação");
                        setLinkRegear("")
                        console.log("500");
                    }
            } catch (error) {
                console.log("404");
                setLinkRegear("")
            }
            
        } else {
            console.log("A URL não segue o padrão esperado.");
            alert('Link invalido!');
            setLinkRegear("")
        }
       
    }
    const [selectedItem, setSelectedItem] = useState('Classe');
    const [linkRegear, setLinkRegear] = useState('');
    const handleSelect = (eventKey, event) => {
        setSelectedItem(eventKey);
    };

    const [player, setPlayer] = useState([])
    const verificarToken = async()=>{
        try {
            const res = await fetch(`${BackURL}/api/checks/${token}`);
            if(!res.ok){
                throw new Error(`Erro na consulta da API verificarToken`);
            }
            const data = await res.json();
            setPlayer(data);
            if(data.res == 502){
                console.log("token invalido");
                navigate(`/`);
            }
        } catch (error) {
            console.error(error)
        }
    };
    useEffect(()=>{
        verificarToken()
    }, []);

    const [dataRegear, setDataRegear] = useState([]);
    const getRegear = async()=>{
        try {
            const res = await fetch(`${BackURL}/api/get/regear/${player.User}`)
            if(!res.ok){
                throw new Error(`Erro na consulta da API getRegear`);
            }
            const dataRes = await res.json();
            setDataRegear(dataRes)
        } catch (error) {
            console.log(error)
        }
    }    
    useEffect(() => {
        if (player.User) {
            getRegear();
        }
    }, [player]);
    return(
        <div className="containerHome">
            <CustomSidenav token={token}/>
            <div className="conteudoHome">
                <div className="btnsRegear">
                    <button className="btnSolicitar" onClick={handleOpen}>solicitar re-gear</button>
                </div>

                <Tabela solicitações={dataRegear} token={token}/>
            </div>
            
            
            <Modal open={open} onClose={handleClose} className="modalSolicitarRegear">
                <Modal.Header className="modalRegearHeader">
                    <Modal.Title className="modalRegearTitle">Solicitação de Re-gear</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalRegearBody" size="lg">
                    <p>Olá, {player.User}!</p>
                    <p>Para solicitar seu re-gear, você deve ter o link da sua morte e colocar no campo abaixo.</p>
                    <p>Você pode pegar esse link pelo <a href="https://murderledger.com/" target="_blank" className="urlLink">Murder Ledger</a>, ou direto pelo <a href="https://albiononline.com/killboard" target="_blank" className="urlLink">Killboard</a> do Albion</p>

                    <div className="divInputLink">
                        <input className="inputLink" type="text" placeholder="Coloque o link da morte aqui..." value={linkRegear} onChange={e => setLinkRegear(e.target.value)}/>

                        <div className="divDropdown" onSelect={handleSelect}>
                            <Dropdown title={selectedItem} className="classDropdown">
                                <Dropdown.Item eventKey="Tanc" onSelect={() => setSelectedItem("Tanc")}>Tanc</Dropdown.Item>
                                <Dropdown.Item eventKey="DPS" onSelect={() => setSelectedItem("DPS")}>DPS</Dropdown.Item>
                                <Dropdown.Item eventKey="Suporte" onSelect={() => setSelectedItem("Suporte")}>Suporte</Dropdown.Item>
                                <Dropdown.Item eventKey="Healer" onSelect={() => setSelectedItem("Healer")}>Healer</Dropdown.Item>
                                <Dropdown.Item eventKey="BM" onSelect={() => setSelectedItem("BM")}>BM</Dropdown.Item>
                            </Dropdown>
                        </div>
                    </div>
                    

                    <div className="divAtencao">
                        <p className="pAtencao">ATENÇÃO</p>
                    </div>
                    <p>* Itens errados não teram RE-GEAR</p>
                    <p>* Itens com tier não equivalente ao solicitados não teram RE-GEAR</p>
                </Modal.Body>
                <Modal.Footer className="modalRegearFooter">
                    <Button onClick={handleSolicitar} appearance="primary" className="btnModalSolicitar">
                        Solicitar
                    </Button>
                    <Button onClick={handleClose} appearance="subtle" className="btnModalCancelar">
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
           
        </div> 
    )
};

export default Regear