import CustomSidenav  from "../../components/Nav/Nav";
import { useSearchParams } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect  } from 'react';

import "./RegearStyle.css"
const Regear = () =>{
    const BackURL = import.meta.env.VITE_URL;
    const navigate = useNavigate();
    const [searchParams]  = useSearchParams();
    const token = searchParams.get("q");

    const [player, setPlayer] = useState([])
    const verificarToken = async()=>{
        try {
            const res = await fetch(`${BackURL}/api/checks/${token}`);
            if(!res.ok){
                throw new Error(`Erro na consulta da API verificarToken`);
            }
            const data = await res.json();
            setPlayer(data);
            console.log(data)
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
    return(
        <div className="containerHome">
            <CustomSidenav token={token}/>
            <div className="conteudoHome">
                <img src="/img/builds/ZvZ.png" alt="" />
                <div className="btnsRegear">
                    <button className="btnSolicitar">solicitar regear</button>
                    <button className="btnPendentes">regear pendentes</button>
                </div>
            </div>
            
        </div> 
    )
};

export default Regear