import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { Modal } from 'rsuite';

import "./CadastroStyle.css"
import 'rsuite/dist/rsuite-no-reset.min.css';

const Cadastro = () =>{
    const navigate = useNavigate();

    /*Formatação dos inputs*/
    const [inputNickname, setInputNickname] = useState('CadastroInput')
    const [inputSenha, setInputSenha] = useState('CadastroInput')
    const [inputConfirmarSenha, setInputConfirmarSenha] = useState("CadastroInput")

    /*Pegando os valores digitados*/
    const [nickname, setNickname] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [email, setEmail] = useState('');
    const [discordId, setDiscordId] = useState('');
    
    /*Navegação*/
    const voltarHome= ()=>{
        navigate(`/`)
    }

    /*Criação do modal de alerta*/
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [titleModal, setTitleModal] = useState("");
    const [msgModal, setMsgModal] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        /*Verificar se o nickname foi digitado*/
        if(nickname){
            setInputNickname("CadastroInput")
            if(senha){
                setInputSenha("CadastroInput")
                if(confirmarSenha){  
                    setInputConfirmarSenha ("CadastroInput")                 
                    if(senha == confirmarSenha){                        
                        setInputConfirmarSenha ("CadastroInput")
                        setInputSenha("CadastroInput")
                        /* AQUI IREMOS FAZER O CADASTRO DO CLIENTE */



                    }else{
                        setInputSenha("SenhaInputErro")
                        setInputConfirmarSenha('ConfirmarSenhaInputErro')
                        setTitleModal("ERRO")
                        setMsgModal("Senha diferente da confirmação!") 
                        setSenha("")
                        setConfirmarSenha("")          
                        handleOpen()
                    }
                }else{
                    setInputConfirmarSenha('ConfirmarSenhaInputErro')
                    setTitleModal("ERRO")
                    setMsgModal("Digite a confirmação!")            
                    handleOpen()
                }
            }else{
                setInputSenha("SenhaInputErro")
                setTitleModal("ERRO")
                setMsgModal("Digite uma senha!")            
                handleOpen()
            }            
        }else{
            setInputNickname("NicknameInputErro")
            setTitleModal("ERRO")
            setMsgModal("Digite seu Nickname!")            
            handleOpen()
        }
    };

    return(
        <div className="DivCadastro">
            <div className='FomrsCadastro'>                
                    <h1>Cadastro</h1>

                <div className="BordarForms">
                <p className="txtCadastro">Digite seu Nickname <span className="Obrigatorio">*</span></p>
                <input type="text" placeholder="Digite seu nickname aqui..." value={nickname} onChange={e => setNickname(e.target.value)} className={inputNickname} />

                <p className="txtCadastro">Escolha uma senha <span className="Obrigatorio">*</span></p>
                <input type="password" placeholder="Digite sua senha..." value={senha} onChange={e => setSenha(e.target.value)} className={inputSenha} />

                <p className="txtCadastro">Confirme sua senha <span className="Obrigatorio">*</span></p>
                <input type="password" placeholder="Confirme sua senha..." value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} className={inputConfirmarSenha} />

                <p className="txtCadastro">Digite um E-mail </p>
                <input type="text" placeholder="Digite seu E-mail..." value={email} onChange={e => setEmail(e.target.value)} className="CadastroInput" />

                <p className="txtCadastro">ID do usuário discord</p>
                <input type="text" placeholder="Digite ID do usuário..." value={discordId} onChange={e => setDiscordId(e.target.value)} className="CadastroInput" />

                </div>
                <div className="button-container">
                    <button className='ButtonCadastro' onClick={handleSubmit}>Cadastrar</button>
                    <button className='ButtonVoltar' onClick={voltarHome}>Voltar</button>
                </div>
            </div>

            

            <Modal open={open} onClose={handleClose} className='ModalError' size="300px">
                <Modal.Header>
                    <Modal.Title className='ModalTitle'>{titleModal}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='ModalBody'>
                    <img src="./img/msg/erro.png" alt="Error" className='ModalBodyImg' />
                    <p className='ModalBodyP'>{msgModal}</p>
                </Modal.Body>            
            </Modal>
        </div>
    )
};

export default Cadastro