import { Sidenav, Nav, Toggle } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import ToolsIcon from '@rsuite/icons/Tools';
import CharacterAuthorizeIcon from '@rsuite/icons/CharacterAuthorize';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import 'rsuite/dist/rsuite-no-reset.min.css';
import "./NavStyle.css";

function CustomSidenav ( { token, cargo } ){  
    const navigate = useNavigate();  
    const [expanded, setExpanded] = useState(true);
    const [activeKey, setActiveKey] = useState('1');

    const pgPerfil = ()=>{
        navigate(`/insanity?q=${token}`);
    }
    const pgRegear = ()=>{
        navigate(`/regear?q=${token}`);
    }
    const pgAllRegears = ()=>{
        navigate(`/staff/regear?q=${token}`);
    }
    return(
        <div style={{ width: 240}}>            
            <Sidenav 
                style={{height: '100vh', overflow: 'hidden'}}
                expanded={expanded} defaultOpenKeys={['3', '4']}>
                <Sidenav.Body>
                    <Nav activeKey={activeKey} onSelect={setActiveKey}>
                        <Nav.Item eventKey="1" icon={<DashboardIcon />} onClick={pgPerfil}>
                            Perfil
                        </Nav.Item>
                        <Nav.Item eventKey="2" icon={<ToolsIcon />} onClick={pgRegear}>
                            Re-gear
                        </Nav.Item>
                        {cargo === "Staff" && (
                            <Nav.Menu eventKey="3" title="Staff" icon={<CharacterAuthorizeIcon />} >
                                <Nav.Item eventKey="3-1">Cargos</Nav.Item>
                                <Nav.Item eventKey="3-2" onClick={pgAllRegears}>Todos Re-gear</Nav.Item>
                                <Nav.Item eventKey="3-3">Procurar Re-gear</Nav.Item>
                            </Nav.Menu>
                        )}                        
                    </Nav>
                </Sidenav.Body>              
            </Sidenav>
        </div>       
    )
}

export default CustomSidenav;