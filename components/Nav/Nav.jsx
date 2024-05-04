import { Sidenav, Nav, Toggle } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';

import React, { useState } from 'react';

import 'rsuite/dist/rsuite-no-reset.min.css';

function CustomSidenav (){    
    const [expanded, setExpanded] = useState(true);
    const [activeKey, setActiveKey] = useState('1');
    return(
        <div style={{ width: 240}}>            
            <Sidenav 
                style={{height: '100vh', overflow: 'hidden'}}
                expanded={expanded} defaultOpenKeys={['3', '4']}>
                <Sidenav.Body>
                    <Nav activeKey={activeKey} onSelect={setActiveKey}>
                        <Nav.Item eventKey="1" icon={<DashboardIcon />}>
                            Perfil
                        </Nav.Item>
                        <Nav.Item eventKey="2" icon={<GroupIcon />}>
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