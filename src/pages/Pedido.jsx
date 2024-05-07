import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect  } from 'react';

const Pedido =  () =>{
    const BackURL = import.meta.env.VITE_URL;
    const [searchParams]  = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("q");
    const idRegear = searchParams.get("id");
    const [detaRegear, setDetaRegear] = useState([]);

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
            setDetaRegear(data)
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        verificarToken();
        getDetaRegear();
    }, []);
    const open = ()=>{
        console.log(detaRegear)
    }
    return(
        <div >
            <button onClick={open}>Testando</button>
            <p>Token {token} </p>
            <p>ID Regear {idRegear}</p>
        </div>
    )
};

export default Pedido