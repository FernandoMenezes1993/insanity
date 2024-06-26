import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect  } from 'react';

import { Modal, Loader } from 'rsuite';

import "./LoginStyle.css"
import 'rsuite/dist/rsuite-no-reset.min.css';
const BackURL = import.meta.env.VITE_URL;   

const Login =  () =>{
    //Acordar o back
    const acordarBack = async()=>{
        try {
            const res = await fetch(`${BackURL}/api/acorda`);
            if(!res.ok){
                throw new Error(`Erro na consulta da API acorda`);
            }
            const data = await res.json();
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(()=>{
        acordarBack()
    }, []);

    const navigate = useNavigate();
    const[loading, setLoading] = useState(false);
     

    const [nickname, setNickname] = useState('');
    const [senha, setSenha] = useState('');
    
    const Logar = async ()=>{
        
        const apiCheckPasswod = `${BackURL}/api/checks/user/${nickname}/${senha}`
        try {
            const checksUser = await fetch(apiCheckPasswod);
            if(!checksUser.ok){
                throw new Error(`Erro na busca da API ${apiCheckPasswod}`);
            }
            const res = await checksUser.json()
            if(res.res == 200){
                
                setTimeout(()=>{
                    setLoading(false);
                    navigate(`/insanity?q=${res.token}`);
                }, 1000);
            }
            if(res.res == 502){
                setTimeout(()=>{
                    setLoading(false);
                }, 2000);
                alert("Login ou senha incorreta");
                setNickname("");
                setSenha("");
            }
            if(res.res == 404){
                setTimeout(()=>{
                    setLoading(false);
                }, 2000);
                alert("Conta não cadastrada");
                setNickname("");
                setSenha("");
            }

        } catch (error) {
            console.error(error)
        }
    };
    const Cadastrar = ()=>{
        navigate(`/Cadastro`);
    }; 
    return(
        <div className="Login">
            {loading ? (
                <Loader size="lg" speed="fast" center content={<span style={{ color: 'white' }}>Carregando...</span>}  style={{color: "with"}}/>
            ):(
                <div className='Fomrs'>
                    <p className='Titulo'>Insanity BR</p>                
                    <input type="text" placeholder='Digite seu nome aqui...' className='LoginInput' value={nickname} onChange={e => setNickname(e.target.value)}/>
                    <input type="password" placeholder='Digite sua senha...' className='LoginInput' value={senha} onChange={e => setSenha(e.target.value)}/>
                    <button className='ButtonLogar' onClick={() => { Logar(); setLoading(true); }} >Logar</button>
                    <button className='ButtonCadastrar' onClick={Cadastrar}>Cadastrar</button>
                    <Link to="" className="RecuperarSenha">Esqueci minha senha!</Link>
                </div>
            )}            
        </div>
    )
};

export default Login