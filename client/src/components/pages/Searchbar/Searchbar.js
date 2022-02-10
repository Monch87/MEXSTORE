import { React } from 'react'
import './Searchbar.css'

export default function Searchbar({ onChance }) {

    const handleInputChange = e => {
        onChance(e.target.value)
    }


    return (
        <div className='search-bar-input' >
            <form action="#">
                <input className='input' style={{ fontFamily: 'Amatic SC, cursive' }} type="text" onChange={handleInputChange} placeholder="Buscador de producto:" />
                <input className='search' type="image" src=" https://res.cloudinary.com/dxslsbznp/image/upload/v1644336159/loupe_pslloh.png" alt="search" />
            </form>
        </div>
    )
}

