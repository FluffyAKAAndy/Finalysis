import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

function NavBar() {

    return (
        <>
            <div className="Navbar">
                <Container>
                    <Navbar>   
                        <div className='col-1' style={{borderRight:"solid"}}>
                            <Navbar.Brand style={{color: '#F7EBEC'}}>Finalysis</Navbar.Brand>  
                        </div>
                        <div className="col-10 NavText">
                            <Nav>
                                <Nav.Link href="/home" style={{color: '#F7EBEC'}}>Home</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link href="/assets" style={{color: '#F7EBEC'}}>Assets</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link href="/loans" style={{color: '#F7EBEC'}}>Loans</Nav.Link>
                            </Nav>
                        </div>                  
                        <div className="col-1">
                           <img className='logo' alt="logo" src='/logo192.png'></img>
                        </div>
                    </Navbar>
                </Container>
            </div>
        </>
    )
}
export default NavBar;