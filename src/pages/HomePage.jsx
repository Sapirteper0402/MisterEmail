import { useNavigate } from 'react-router-dom';

export function HomePage() {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/mail/index');
    }

    return (
        <section className="home">
            <h1>Welcome to MisterEmail Project! </h1>
            <p>Discover our powerful tools designed to keep you connected and productive.</p>
            <p>Ready to dive in? Click the button below to enter the Mail Project!</p>
            <button onClick={handleNavigation}>MisterEmail Project</button>
            <p className="createBy">Created with React by Sapir Teper</p>
        </section>
    )
}