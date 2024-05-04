import { Sidenav, Nav, Toggle } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import 'rsuite/dist/rsuite-no-reset.min.css';

function CustomSidenav (){  
    const navigate = useNavigate();  
    const [expanded, setExpanded] = useState(true);
    const [activeKey, setActiveKey] = useState('1');

    const pgPerfil = ()=>{
        navigate(`/insanity`);
    }
    const pgRegear = ()=>{
        navigate(`/regear`);
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
                <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
            </Sidenav>
        </div>       
    )
}

export default CustomSidenav;