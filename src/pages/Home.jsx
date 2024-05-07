import CustomSidenav  from "../../components/Nav/Nav";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect  } from 'react';
import "./HomeStyle.css"


const Home = () =>{
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

    return(
        <div className="containerHome">
            <CustomSidenav token={token}/>
            <div className="conteudoHome">
                <h1 className="titulo">{player.User}</h1>
            </div>
            
        </div> 
    )
};

export default Home