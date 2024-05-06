import CustomSidenav  from "../../components/Nav/Nav"

import "./HomeStyle.css"
const Home = () =>{
    return(
        <div className="containerHome">
            <CustomSidenav />
            <div className="conteudoHome">
                <h1 className="titulo">SNagini</h1>
            </div>
            
        </div> 
    )
};

export default Home