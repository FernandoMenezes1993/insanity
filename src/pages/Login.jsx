import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import "./LoginStyle.css"
const Login = () =>{
    const navigate = useNavigate();

    const Cadastrar = ()=>{
        navigate(`/Cadastro`)
    }
    return(

        <div className="Login">
            <div className='Fomrs'>
                <p className='Titulo'>Insanity BR</p>                
                <input type="text" placeholder='Digite seu nome aqui...' className='LoginInput' />
                <input type="password" placeholder='Digite sua senha...' className='LoginInput' />
                <button className='ButtonLogar' >Logar</button>
                <button className='ButtonCadastrar' onClick={Cadastrar}>Cadastrar</button>
                <Link to="" className="RecuperarSenha">Esqueci minha senha!</Link>             
            </div>
        </div>
    )
};

export default Login