import React from 'react'
import './Table.css'

function Table({ countries }) {
    return (
        <div className = "table">
             {countries.map(({country, cases}) => (   //De-structuring country and cases
                <tr>
                    <td>
                        {country}
                    </td>
                    <td>
                        {cases}
                    </td>
                </tr>

            ))}
        </div>
    )
}

export default Table
