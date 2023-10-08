import logo from '../amazon.png'

const Header = ()=>{
    
    return (
        <nav className='flex content-between justify-between p-3'>
            <div><img className='w-32' src={logo}/></div>
            <div>
                <ul className='flex justify-between content-between'>
                    <li className='mx-4'>Home</li>
                    <li>About</li>
                    <li>Careers</li>
                    <li>Register</li>
                </ul>
            </div>
        </nav>
    )
}


export default Header