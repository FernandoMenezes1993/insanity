import CustomSidenav  from "../../../components/Nav/Nav"

import { useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import TabelaStaff from "../../../components/Tabela/TabelaStaff"
import "./AllregearStyle.css"
const Allregear = () =>{
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
            if(data.res == 502){
                navigate(`/`);
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(()=>{
        verificarToken()
    }, []);

    const [detaRegear, setDetaRegear] = useState([]);
    const getAllRegear = async()=>{
        try {
            const res = await fetch(`${BackURL}/api/get/all/regear/staff`);
            if(!res.ok){
                throw new Error('Erro na consulta da API getAllRegear');
            }
            const data = await res.json();
            setDetaRegear(data);
           
        } catch (error) {
            
        }
    }
    useEffect(() => {
        if (player.User) {
            getAllRegear();
        }
    }, [player])
    return(
        <div className="container">
            <CustomSidenav token={token}  cargo={player.Cargo}/>
            <div className="divContainerStaff">

                <div className="divFiltroStaff">
                    <p>Ola mundo</p>
                </div>
                <div className="divTabelaStaff">
                    <TabelaStaff  regears={detaRegear} token={token}/>
                </div>
            </div>
        </div> 
    )
};

export default Allregear