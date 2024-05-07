import { Sidenav, Nav, Toggle } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import 'rsuite/dist/rsuite-no-reset.min.css';

function CustomSidenav ( { token } ){  
    const navigate = useNavigate();  
    const [expanded, setExpanded] = useState(true);
    const [activeKey, setActiveKey] = useState('1');

    const pgPerfil = ()=>{
        navigate(`/insanity?q=${token}`);
    }
    const pgRegear = ()=>{
        navigate(`/regear?q=${token}`);
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
                        <Nav.Item eventKey="2" icon={<GroupIcon />} onClick={pgRegear}>
                            Regear
                        </Nav.Item>    
                    </Nav>
                </Sidenav.Body>              
            </Sidenav>
        </div>       
    )
}

export default CustomSidenav;