import './Sidebar.css'



export default function Sidebar({ChangePage}){
    
    return (
        <div className="sidebar">
            <ul>
                <button className='button' id="charts" onClick={() => ChangePage("charts")}>Charts</button>
                <button className='button' id="profile" onClick={() => ChangePage("profile")}>Profile</button>
            </ul>
        </div>
    )
}