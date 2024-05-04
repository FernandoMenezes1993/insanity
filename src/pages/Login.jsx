import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect  } from 'react';

import { Modal, Loader } from 'rsuite';

import "./LoginStyle.css"
import 'rsuite/dist/rsuite-no-reset.min.css';

const Login =  () =>{
    const navigate = useNavigate();
    const[loading, setLoading] = useState(false);
    const BackURL = import.meta.env.VITE_URL;    

    const [nickname, setNickname] = useState('');
    const [senha, setSenha] = useState('');
    
    const Logar = async ()=>{
        setNickname("");
        setSenha("");

        const apiCheckPasswod = `${BackURL}/api/checks/user/${nickname}/${senha}`
        try {
            const checksUser = await fetch(apiCheckPasswod);
            if(!checksUser.ok){
                throw new Error(`Erro na busca da API ${apiCheckPasswod}`);
            }
            const res = await checksUser.json()
            if(res.res == 200){
                setLoading(true);
                setTimeout(()=>{
                    setLoading(false);
                    navigate(`/insanity?q=${res.token}`);
                }, 2000);
            }
            if(res.res == 502 || res.res == 404){
                console.log("Login ou senha incorreta");
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
                <Loader size="lg" center content="Carregando..." />
            ):(
                <div className='Fomrs'>
                    <p className='Titulo'>Insanity BR</p>                
                    <input type="text" placeholder='Digite seu nome aqui...' className='LoginInput' value={nickname} onChange={e => setNickname(e.target.value)}/>
                    <input type="password" placeholder='Digite sua senha...' className='LoginInput' value={senha} onChange={e => setSenha(e.target.value)}/>
                    <button className='ButtonLogar' onClick={Logar} >Logar</button>
                    <button className='ButtonCadastrar' onClick={Cadastrar}>Cadastrar</button>
                    <Link to="" className="RecuperarSenha">Esqueci minha senha!</Link>             
                </div>
            )}
            
        </div>
    )
};

export default Login