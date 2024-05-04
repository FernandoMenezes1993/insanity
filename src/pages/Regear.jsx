import CustomSidenav  from "../../components/Nav/Nav"

import "./RegearStyle.css"
const Regear = () =>{
    return(
        <div className="containerHome">
            <CustomSidenav />
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