import { IoMdSend } from "react-icons/io";
import { BsStar } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";





export function HomePage() {
    return (
        <section className="home">
            <h1>Welcome to MisterEmail HomePage</h1>
            <IoMdSend />
            <BsStar />
            <BsStarFill style={{ color: '#ffc107' }}/>
        </section>
    )
}