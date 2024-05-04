import { useNavigate } from 'react-router-dom';
import { useState, useEffect  } from 'react';

import { Modal } from 'rsuite';

import "./CadastroStyle.css"
import 'rsuite/dist/rsuite-no-reset.min.css';

/*CHAMADA DAS API*/
const BackURL = import.meta.env.VITE_URL;

const Cadastro = () =>{
    const navigate = useNavigate();
    const [nameVerified, setNameVerified] = useState(1);

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
    const [msgModal, setMsgModal] = useState("");

    const[cssModalBody, setCssModalBody] = useState("");
    const[imgModal, setImgModal] = useState("")

    /*Chamando api com nome dos membros da guilda*/
    const [membrosGuilda, setMembrosGuilda] = useState();

    const getMembrosGuilda = async()=>{
        try {
            const res = await fetch(`${BackURL}/api/playresGuild`);
            if(!res.ok){
                throw new Error(`Erro na consulta da API playresGuild`);
            }
            const data = await res.json();
            setMembrosGuilda(data);
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(()=>{
        getMembrosGuilda()
    }, []);

    const registerUser = async (event) => {
        event.preventDefault();
        /*Verificar se o nickname foi digitado*/
        if(nickname){
            setInputNickname("CadastroInput")
            if(senha){
                setInputSenha("CadastroInput")
                if(confirmarSenha){  
                    setInputConfirmarSenha ("CadastroInput")                 
                    if(senha == confirmarSenha){                        
                        setInputConfirmarSenha ("CadastroInput");
                        setInputSenha("CadastroInput");
                        
                        try {
                            const checksNameRegistered  = await fetch(`${BackURL}/api/checks/name/${nickname}`);
                            if (!checksNameRegistered.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            };
                            const res = await checksNameRegistered.json();
                            const resApi = res.length
                            
                            if(resApi == 1){

                                let membroEncontrado = false;
                                const qntMember = membrosGuilda.length;
                                for (let i = 0; i < qntMember; i++){
                                    if(nickname == membrosGuilda[i].nome){
                                        const newUser ={
                                            Name: nickname,
                                            Senha: senha,
                                            Email: email,
                                            Discordid: discordId
                                        };
                                        try {
                                            const response = await fetch(`${BackURL}/api/user/new`, {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                                body: JSON.stringify(newUser)
                                            });
                                    
                                            if (!response.ok) {
                                                throw new Error(`HTTP error! status: ${response.status}`);
                                            }
                                    
                                            const result = await response.json();

                                            // Alerta de cadsatro realizado
                                            setTitleModal("Cadastrado");                                            
                                            setMsgModal("Cadastro realizado!");
                                            setImgModal('./img/msg/imgModalCompleto.webp');
                                            setCssModalBody("ModalBodyCadastrado");
                                            handleOpen()

                                            setTimeout(voltarHome, 3000);

                                        } catch (error) {
                                            console.error('Error:', error);
                                            alert('Erro ao criar usuário');
                                        }
                                        membroEncontrado = true;
                                        break;
                                    }
                                }
                                if (!membroEncontrado) {
                                    setTitleModal("Erro");                                            
                                    setMsgModal("Você não está na guilda!");
                                    setImgModal('./img/msg/erro.png');
                                    setCssModalBody("ModalBodyError");
                                    handleOpen()

                                    setNickname("")
                                    setSenha("")
                                    setConfirmarSenha("")  
                                    setEmail("")
                                    setDiscordId("")
                                }
                            }else{
                                setTitleModal("Erro");                                            
                                setMsgModal("Você já está cadastrado!");
                                setImgModal('./img/msg/erro.png');
                                setCssModalBody("ModalBodyError");
                                handleOpen()

                                setTimeout(voltarHome, 3000);
                            }
                        } catch (error) {
                            console.error(error)
                        }   
                    }else{
                        setCssModalBody("ModalBodyError")
                        setImgModal('./img/msg/erro.png')
                        setInputSenha("SenhaInputErro")
                        setInputConfirmarSenha('ConfirmarSenhaInputErro')
                        setTitleModal("ERRO")
                        setMsgModal("Senha diferente da confirmação!") 
                        setSenha("")
                        setConfirmarSenha("")          
                        handleOpen()
                    }
                }else{
                    setCssModalBody("ModalBodyError")
                    setImgModal('./img/msg/erro.png')
                    setInputConfirmarSenha('ConfirmarSenhaInputErro')
                    setTitleModal("ERRO")
                    setMsgModal("Digite a confirmação!")            
                    handleOpen()
                }
            }else{
                setCssModalBody("ModalBodyError")
                setImgModal('./img/msg/erro.png')
                setInputSenha("SenhaInputErro")
                setTitleModal("ERRO")
                setMsgModal("Digite uma senha!")            
                handleOpen()
            }            
        }else{
            setCssModalBody("ModalBodyError")
            setImgModal('./img/msg/erro.png')
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
                    <button className='ButtonCadastro' onClick={registerUser}>Cadastrar</button>
                    <button className='ButtonVoltar' onClick={voltarHome}>Voltar</button>
                </div>
            </div>           

            <Modal open={open} onClose={handleClose} className='ModalError' size="300px">
                <Modal.Header>
                    <Modal.Title className='ModalTitle'>{titleModal}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={cssModalBody}>
                    <img src={imgModal} alt="Error" className='ModalBodyImg' />
                    <p className='ModalBodyP'>{msgModal}</p>
                </Modal.Body>            
            </Modal>
        </div>
    )
};

export default Cadastro